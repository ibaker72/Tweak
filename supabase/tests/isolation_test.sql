-- ============================================================
-- ISOLATION TEST — Client Portal RLS
-- ============================================================
--
-- Goal: prove that a logged-in client can ONLY read rows that belong
-- to projects they are a member of, even if the frontend query is
-- tampered with. Run as a superuser (Supabase SQL editor is fine).
--
-- This script:
--   1. Creates two synthetic auth users (Client A, Client B)
--   2. Gives each a project + 2 milestones
--   3. Simulates each user's session via set_config('request.jwt.claims'…)
--      and runs SELECTs that target BOTH projects
--   4. Asserts each user sees only their own row, and gets zero rows
--      when explicitly querying the other user's project_id
--
-- After the script finishes, all test rows are rolled back. Nothing is
-- persisted. Run inside the Supabase SQL editor (the editor connects as
-- the postgres role, which can bypass RLS — we override that per-block
-- with `set local role authenticated;`).

begin;

-- Two synthetic auth.users + matching profiles
insert into auth.users (id, email, raw_user_meta_data, aud, role)
values
  ('11111111-1111-1111-1111-111111111111', 'client-a-rls@test.local', '{"full_name":"Client A"}'::jsonb, 'authenticated', 'authenticated'),
  ('22222222-2222-2222-2222-222222222222', 'client-b-rls@test.local', '{"full_name":"Client B"}'::jsonb, 'authenticated', 'authenticated')
on conflict (id) do nothing;

-- Profiles trigger should fire from the insert above, but force-insert in case it didn't
insert into public.profiles (id, full_name, email, role)
values
  ('11111111-1111-1111-1111-111111111111', 'Client A', 'client-a-rls@test.local', 'client'),
  ('22222222-2222-2222-2222-222222222222', 'Client B', 'client-b-rls@test.local', 'client')
on conflict (id) do nothing;

-- Each client gets their own project + membership + 2 milestones
insert into public.projects (id, name, type, status)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Project A',  'Marketing site', 'design'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Project B',  'Brand refresh',  'development');

insert into public.project_members (project_id, user_id, member_role)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'client'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'client');

insert into public.project_milestones (project_id, title, status, sort_order, description)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'A: Kickoff',  'completed',   1, 'A-only milestone'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'A: Design',   'in_progress', 2, null),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'B: Kickoff',  'completed',   1, 'B-only milestone'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'B: Build',    'in_progress', 2, null);

-- ─── TEST 1 — Client A sees only Project A ───────────────────
do $$
declare visible_projects int; visible_milestones int; cross_milestones int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

  select count(*) into visible_projects from public.projects;
  select count(*) into visible_milestones from public.project_milestones;
  select count(*) into cross_milestones
    from public.project_milestones
    where project_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

  if visible_projects <> 1 then
    raise exception 'FAIL: Client A sees % projects (expected 1)', visible_projects;
  end if;
  if visible_milestones <> 2 then
    raise exception 'FAIL: Client A sees % milestones (expected 2)', visible_milestones;
  end if;
  if cross_milestones <> 0 then
    raise exception 'FAIL: Client A can read Client B''s milestones (% rows)', cross_milestones;
  end if;
  raise notice 'PASS: Client A — own projects: %, own milestones: %, cross-tenant leaks: %', visible_projects, visible_milestones, cross_milestones;
  reset role;
  reset request.jwt.claims;
end $$;

-- ─── TEST 2 — Client B sees only Project B ───────────────────
do $$
declare visible_projects int; visible_milestones int; cross_milestones int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

  select count(*) into visible_projects from public.projects;
  select count(*) into visible_milestones from public.project_milestones;
  select count(*) into cross_milestones
    from public.project_milestones
    where project_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

  if visible_projects <> 1 then
    raise exception 'FAIL: Client B sees % projects (expected 1)', visible_projects;
  end if;
  if visible_milestones <> 2 then
    raise exception 'FAIL: Client B sees % milestones (expected 2)', visible_milestones;
  end if;
  if cross_milestones <> 0 then
    raise exception 'FAIL: Client B can read Client A''s milestones (% rows)', cross_milestones;
  end if;
  raise notice 'PASS: Client B — own projects: %, own milestones: %, cross-tenant leaks: %', visible_projects, visible_milestones, cross_milestones;
  reset role;
  reset request.jwt.claims;
end $$;

-- ─── TEST 3 — Anonymous (no JWT) sees nothing ────────────────
do $$
declare visible_projects int; visible_milestones int;
begin
  set local role anon;
  set local request.jwt.claims = '{}';
  select count(*) into visible_projects from public.projects;
  select count(*) into visible_milestones from public.project_milestones;
  if visible_projects <> 0 or visible_milestones <> 0 then
    raise exception 'FAIL: Anonymous can read projects=% milestones=%', visible_projects, visible_milestones;
  end if;
  raise notice 'PASS: Anonymous — projects: 0, milestones: 0';
  reset role;
  reset request.jwt.claims;
end $$;

-- Roll everything back; this is a test, not a seed.
rollback;
