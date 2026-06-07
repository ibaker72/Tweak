-- ============================================================
-- ISOLATION + WRITE-PATH TEST — Client Portal Approvals (Phase 3)
-- ============================================================
--
-- Two synthetic clients, each owning one pending approval_item. Verifies
-- that the only write a client can perform — recording a decision —
-- cannot be abused to:
--   • SELECT another tenant's items or decisions
--   • INSERT a decision targeting another tenant's item
--   • Forge decided_by to be someone other than auth.uid()
--   • UPDATE or DELETE an existing decision (append-only)
-- And confirms the legitimate happy path: a member can record a decision,
-- the trigger mirrors it onto the parent item, and a change-of-mind
-- appends a new row rather than mutating the old one.
--
-- Run in the Supabase SQL editor. BEGIN ... ROLLBACK — nothing persists.

begin;

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
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Project A', 'Marketing site', 'design'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Project B', 'Brand refresh', 'development');

insert into public.project_members (project_id, user_id, member_role)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'client'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'client');

insert into public.project_approvals (id, project_id, title, description, status, sort_order)
values
  ('e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'A: Approve homepage v3',  'A-only', 'pending', 1),
  ('f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'B: Approve logo refresh', 'B-only', 'pending', 1);

-- ─── TEST 1 — B cannot SELECT A's item ──────────────────────
do $$
declare own_items int; cross_items int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
  select count(*) into own_items   from public.project_approvals;
  select count(*) into cross_items from public.project_approvals where id = 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0';
  if own_items   <> 1 then raise exception 'FAIL T1 own=%', own_items; end if;
  if cross_items <> 0 then raise exception 'FAIL T1 cross-leak=%', cross_items; end if;
  raise notice 'PASS T1: B sees own=% leak=%', own_items, cross_items;
  reset role; reset request.jwt.claims;
end $$;

-- ─── TEST 2 — B blocked from inserting on A's item ──────────
do $$
declare insert_ok boolean := false;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
  begin
    insert into public.approval_decisions (approval_item_id, decided_by, decision)
    values ('e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', '22222222-2222-2222-2222-222222222222', 'approved');
    insert_ok := true;
  exception when others then null;
  end;
  if insert_ok then raise exception 'FAIL T2: B inserted on A item'; end if;
  raise notice 'PASS T2: B blocked from inserting on A item';
  reset role; reset request.jwt.claims;
end $$;

-- ─── TEST 3 — B blocked from forging decided_by = A ─────────
do $$
declare insert_ok boolean := false;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
  begin
    insert into public.approval_decisions (approval_item_id, decided_by, decision)
    values ('f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', '11111111-1111-1111-1111-111111111111', 'approved');
    insert_ok := true;
  exception when others then null;
  end;
  if insert_ok then raise exception 'FAIL T3: B forged decided_by=A'; end if;
  raise notice 'PASS T3: B cannot forge decided_by';
  reset role; reset request.jwt.claims;
end $$;

-- ─── TEST 4 — Legitimate decision, trigger mirrors status ──
do $$
declare mirrored_status text; mirrored_at timestamptz; decision_rows int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
  insert into public.approval_decisions (approval_item_id, decided_by, decision, comment)
  values ('e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', '11111111-1111-1111-1111-111111111111', 'approved', 'looks great');
  select status, approved_at into mirrored_status, mirrored_at
    from public.project_approvals where id = 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0';
  select count(*) into decision_rows from public.approval_decisions where approval_item_id = 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0';
  if mirrored_status <> 'approved' then raise exception 'FAIL T4 mirror_status=%', mirrored_status; end if;
  if mirrored_at is null            then raise exception 'FAIL T4 approved_at is null'; end if;
  if decision_rows <> 1             then raise exception 'FAIL T4 rows=%', decision_rows; end if;
  raise notice 'PASS T4: A approve mirrored status=%', mirrored_status;
  reset role; reset request.jwt.claims;
end $$;

-- ─── TEST 5 — Change-of-mind appends, mirror updates ───────
do $$
declare mirrored_status text; decision_rows int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
  insert into public.approval_decisions (approval_item_id, decided_by, decision, comment)
  values ('e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', '11111111-1111-1111-1111-111111111111', 'changes_requested', 'wait, fix the hero');
  select status into mirrored_status from public.project_approvals where id = 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0';
  select count(*) into decision_rows from public.approval_decisions where approval_item_id = 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0';
  if mirrored_status <> 'changes_requested' then raise exception 'FAIL T5 mirror_status=%', mirrored_status; end if;
  if decision_rows <> 2 then raise exception 'FAIL T5 append-only broken, rows=%', decision_rows; end if;
  raise notice 'PASS T5: change-of-mind appended, status=% rows=%', mirrored_status, decision_rows;
  reset role; reset request.jwt.claims;
end $$;

-- ─── TEST 6 — B cannot SELECT A's decision rows ────────────
do $$
declare leak int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
  select count(*) into leak from public.approval_decisions where approval_item_id = 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0';
  if leak <> 0 then raise exception 'FAIL T6 B sees A decisions=%', leak; end if;
  raise notice 'PASS T6: B cannot read A decisions';
  reset role; reset request.jwt.claims;
end $$;

-- ─── TEST 7 — Append-only: A cannot UPDATE or DELETE ───────
do $$
declare update_ok boolean := false; delete_ok boolean := false; rows_affected int;
begin
  set local role authenticated;
  set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
  begin
    update public.approval_decisions set comment = 'rewritten' where approval_item_id = 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0';
    get diagnostics rows_affected = row_count;
    if rows_affected > 0 then update_ok := true; end if;
  exception when others then null;
  end;
  begin
    delete from public.approval_decisions where approval_item_id = 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0';
    get diagnostics rows_affected = row_count;
    if rows_affected > 0 then delete_ok := true; end if;
  exception when others then null;
  end;
  if update_ok then raise exception 'FAIL T7: A updated an existing decision'; end if;
  if delete_ok then raise exception 'FAIL T7: A deleted an existing decision'; end if;
  raise notice 'PASS T7: A cannot mutate or delete existing decisions';
  reset role; reset request.jwt.claims;
end $$;

-- ─── TEST 8 — Anonymous sees nothing ───────────────────────
do $$
declare items int; decs int;
begin
  set local role anon; set local request.jwt.claims = '{}';
  select count(*) into items from public.project_approvals;
  select count(*) into decs  from public.approval_decisions;
  if items <> 0 then raise exception 'FAIL T8 anon items=%', items; end if;
  if decs  <> 0 then raise exception 'FAIL T8 anon decisions=%', decs; end if;
  raise notice 'PASS T8: anon items=0 decisions=0';
  reset role; reset request.jwt.claims;
end $$;

rollback;
