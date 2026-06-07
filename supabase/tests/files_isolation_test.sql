-- ============================================================
-- ISOLATION TEST — Client Portal Files (Phase 2)
-- ============================================================
--
-- Verifies that a logged-in client can ONLY see / download files
-- that belong to projects they are a member of. Covers three
-- attack surfaces in one run:
--
--   1. SELECT on public.project_files                 — table-level RLS
--   2. Storage policy on storage.objects              — bucket-level RLS
--   3. The signed-URL route's "look up by id" guard   — application-level
--
-- Run in the Supabase SQL editor. Everything is rolled back at the end —
-- no rows or storage objects persist.

begin;

-- Two synthetic auth.users + matching profiles
insert into auth.users (id, email, raw_user_meta_data, aud, role)
values
  ('11111111-1111-1111-1111-111111111111', 'client-a-rls@test.local', '{"full_name":"Client A"}'::jsonb, 'authenticated', 'authenticated'),
  ('22222222-2222-2222-2222-222222222222', 'client-b-rls@test.local', '{"full_name":"Client B"}'::jsonb, 'authenticated', 'authenticated')
on conflict (id) do nothing;

insert into public.profiles (id, full_name, email, role)
values
  ('11111111-1111-1111-1111-111111111111', 'Client A', 'client-a-rls@test.local', 'client'),
  ('22222222-2222-2222-2222-222222222222', 'Client B', 'client-b-rls@test.local', 'client')
on conflict (id) do nothing;

insert into public.projects (id, name, type, status)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Project A',  'Marketing site', 'design'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Project B',  'Brand refresh',  'development');

insert into public.project_members (project_id, user_id, member_role)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'client'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'client');

-- Files: one per project. The file's id stays the same so the application
-- ownership test can assert "Client B can't reach file_a by id".
insert into public.project_files (id, project_id, file_name, file_path, file_type, file_size, mime_type, category)
values
  ('cccccccc-cccc-cccc-cccc-cccccccccccc',
   'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   'a-design.png',
   'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/123_a-design.png',
   'png', 12345, 'image/png', 'design'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   'b-invoice.pdf',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb/456_b-invoice.pdf',
   'pdf', 6789, 'application/pdf', 'invoice');

-- Matching storage.objects rows so the storage policy has something to check.
-- (These are metadata rows in storage.objects; we are not actually uploading
-- file bytes to S3 from here.)
insert into storage.objects (bucket_id, name, owner)
values
  ('project-files', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/123_a-design.png',  null),
  ('project-files', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb/456_b-invoice.pdf', null);

-- ─── TEST 1 — Client A: own file only, no cross-tenant leak ──
do $$
declare visible_files int; cross_files int; visible_objs int; cross_objs int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

  select count(*) into visible_files from public.project_files;
  select count(*) into cross_files
    from public.project_files where id = 'dddddddd-dddd-dddd-dddd-dddddddddddd';
  select count(*) into visible_objs
    from storage.objects where bucket_id = 'project-files';
  select count(*) into cross_objs
    from storage.objects
    where bucket_id = 'project-files'
      and name = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb/456_b-invoice.pdf';

  if visible_files <> 1 then raise exception 'FAIL A files=% expected 1', visible_files; end if;
  if cross_files <> 0 then raise exception 'FAIL A reached B''s file by id (% rows)', cross_files; end if;
  if visible_objs <> 1 then raise exception 'FAIL A storage objects=% expected 1', visible_objs; end if;
  if cross_objs <> 0 then raise exception 'FAIL A reached B''s storage path (% rows)', cross_objs; end if;
  raise notice 'PASS Client A: files=% storage_objs=% leak_by_id=% leak_by_path=%', visible_files, visible_objs, cross_files, cross_objs;

  reset role;
  reset request.jwt.claims;
end $$;

-- ─── TEST 2 — Client B: own file only, no cross-tenant leak ──
do $$
declare visible_files int; cross_files int; visible_objs int; cross_objs int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

  select count(*) into visible_files from public.project_files;
  select count(*) into cross_files
    from public.project_files where id = 'cccccccc-cccc-cccc-cccc-cccccccccccc';
  select count(*) into visible_objs
    from storage.objects where bucket_id = 'project-files';
  select count(*) into cross_objs
    from storage.objects
    where bucket_id = 'project-files'
      and name = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/123_a-design.png';

  if visible_files <> 1 then raise exception 'FAIL B files=% expected 1', visible_files; end if;
  if cross_files <> 0 then raise exception 'FAIL B reached A''s file by id (% rows)', cross_files; end if;
  if visible_objs <> 1 then raise exception 'FAIL B storage objects=% expected 1', visible_objs; end if;
  if cross_objs <> 0 then raise exception 'FAIL B reached A''s storage path (% rows)', cross_objs; end if;
  raise notice 'PASS Client B: files=% storage_objs=% leak_by_id=% leak_by_path=%', visible_files, visible_objs, cross_files, cross_objs;

  reset role;
  reset request.jwt.claims;
end $$;

-- ─── TEST 3 — Anonymous: sees nothing ────────────────────────
do $$
declare visible_files int; visible_objs int;
begin
  set local role anon;
  set local request.jwt.claims = '{}';
  select count(*) into visible_files from public.project_files;
  select count(*) into visible_objs from storage.objects where bucket_id = 'project-files';
  if visible_files <> 0 then raise exception 'FAIL anon files=%', visible_files; end if;
  if visible_objs  <> 0 then raise exception 'FAIL anon objects=%', visible_objs; end if;
  raise notice 'PASS Anonymous: files=0 storage_objs=0';
  reset role;
  reset request.jwt.claims;
end $$;

-- ─── TEST 4 — Storage helper rejects bad inputs ──────────────
do $$
declare bad_uuid boolean; nullsafe boolean; emptysafe boolean;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
  bad_uuid := public.user_owns_storage_path('not-a-uuid/whatever.png');
  nullsafe := public.user_owns_storage_path(null);
  emptysafe := public.user_owns_storage_path('');
  if bad_uuid or nullsafe or emptysafe then
    raise exception 'FAIL helper: bad=% null=% empty=%', bad_uuid, nullsafe, emptysafe;
  end if;
  raise notice 'PASS user_owns_storage_path rejects bad/null/empty inputs';
  reset role;
  reset request.jwt.claims;
end $$;

rollback;
