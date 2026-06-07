-- ============================================================
-- Migration 009: Portal Phase 3 — Approvals
-- TweakAndBuild Client Portal
-- ============================================================
--
-- Three things happen here:
--
-- 1. NEW COLUMNS on project_approvals so an item can point at the thing
--    being reviewed (file_id refs project_files, or a plain url) and so
--    items have an explicit sort_order separate from created_at.
--
-- 2. NEW TABLE public.approval_decisions — the append-only audit log of
--    client decisions. Each row is a "receipt": who decided what, when,
--    optional comment. The trigger below mirrors the latest decision
--    onto project_approvals (status, approved_by, approved_at) so
--    existing UI keeps working, but approval_decisions is the source of
--    truth. Clients can change their mind by recording a NEW row.
--
-- 3. STRICT RLS ON THE WRITE PATH. The decision write is the only client
--    write in the whole portal. Policies enforce:
--      • SELECT: members of the parent item's project + admin/team.
--      • INSERT: WITH CHECK requires decided_by = auth.uid() AND the
--        caller is a project_member of the parent item's project. The
--        server route also sets decided_by to auth.uid(), but the DB is
--        the real gate — even if the route were bypassed, the DB rejects
--        any insert where decided_by is forged or the item belongs to
--        another tenant.
--      • UPDATE and DELETE: no policy → not permitted (append-only).
--
-- The status-mirror trigger is SECURITY DEFINER (it writes to
-- project_approvals on behalf of the client) with a pinned search_path,
-- same discipline as the existing helpers from Phases 1 and 2.
--
-- ── ONE-LINE EXPLANATION of every policy added/changed below ──
--   project_approvals  (Phase 1) "Members can read approvals"            — UNCHANGED: membership scope, qualified refs
--   project_approvals  (Phase 1) "Admin and team can manage approvals"   — UNCHANGED: full CRUD via is_admin_or_team()
--   approval_decisions       "Members can read decisions"                — SELECT: must be a member of the parent item's project
--   approval_decisions       "Admin and team can read all decisions"     — SELECT: via is_admin_or_team()
--   approval_decisions       "Members can record their own decisions"    — INSERT: decided_by must equal auth.uid() AND caller is a member of the parent item's project
--   approval_decisions       "Admin and team can write decisions"        — INSERT: via is_admin_or_team() (admin can backfill / correct)
--   approval_decisions       "Admin and team can delete decisions"       — DELETE: admin only, for compliance scrubs; clients CANNOT delete

-- ─── 1. Approval item columns ────────────────────────────────
alter table public.project_approvals
  add column if not exists file_id    uuid references public.project_files(id) on delete set null,
  add column if not exists url        text,
  add column if not exists sort_order integer not null default 0;

create index if not exists idx_project_approvals_project_order
  on public.project_approvals(project_id, sort_order, created_at desc);

-- ─── 2. Append-only decisions table ──────────────────────────
create table if not exists public.approval_decisions (
  id                uuid primary key default gen_random_uuid(),
  approval_item_id  uuid not null references public.project_approvals(id) on delete cascade,
  decided_by        uuid not null references public.profiles(id) on delete restrict,
  decision          text not null check (decision in ('approved', 'changes_requested')),
  comment           text,
  created_at        timestamptz not null default now()
);

create index if not exists idx_approval_decisions_item_created
  on public.approval_decisions(approval_item_id, created_at desc);

-- ─── 3. RLS ──────────────────────────────────────────────────
alter table public.approval_decisions enable row level security;

drop policy if exists "Members can read decisions"                 on public.approval_decisions;
drop policy if exists "Admin and team can read all decisions"      on public.approval_decisions;
drop policy if exists "Members can record their own decisions"     on public.approval_decisions;
drop policy if exists "Admin and team can write decisions"         on public.approval_decisions;
drop policy if exists "Admin and team can delete decisions"        on public.approval_decisions;

create policy "Members can read decisions"
  on public.approval_decisions for select
  using (
    exists (
      select 1
      from public.project_approvals ai
      join public.project_members  pm on pm.project_id = ai.project_id
      where ai.id      = public.approval_decisions.approval_item_id
        and pm.user_id = auth.uid()
    )
  );

create policy "Admin and team can read all decisions"
  on public.approval_decisions for select
  using (public.is_admin_or_team());

-- The write gate. WITH CHECK enforces two invariants together:
--   1. decided_by = auth.uid()           — no forging another user's identity
--   2. caller is a project_member of the parent item's project
-- If either fails, the insert is rejected. RLS, not just app code.
create policy "Members can record their own decisions"
  on public.approval_decisions for insert
  with check (
    decided_by = auth.uid()
    and exists (
      select 1
      from public.project_approvals ai
      join public.project_members  pm on pm.project_id = ai.project_id
      where ai.id      = public.approval_decisions.approval_item_id
        and pm.user_id = auth.uid()
    )
  );

create policy "Admin and team can write decisions"
  on public.approval_decisions for insert
  with check (public.is_admin_or_team());

create policy "Admin and team can delete decisions"
  on public.approval_decisions for delete
  using (public.is_admin_or_team());

-- Deliberately no UPDATE policy at all → append-only by design.

-- ─── 4. Status mirror trigger ────────────────────────────────
-- Updating project_approvals from a client session normally fails (no
-- client UPDATE policy on that table). This trigger is SECURITY DEFINER
-- so it can write the mirror columns regardless of who inserted the
-- decision. We pin search_path to '' so the function only sees
-- explicitly-qualified objects — same discipline as is_admin and friends.
create or replace function public.mirror_approval_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  mirrored_status text;
begin
  mirrored_status := new.decision;
  update public.project_approvals
     set status        = mirrored_status,
         response_note = coalesce(new.comment, response_note),
         approved_by   = new.decided_by,
         approved_at   = new.created_at
   where id = new.approval_item_id;
  return new;
end;
$$;

-- Trigger function — must NOT be callable as an RPC. REVOKE on PUBLIC isn't
-- enough on Supabase because anon/authenticated inherit EXECUTE on every
-- public function by default; revoke from them too so the
-- *_security_definer_function_executable advisor stays clean for this fn.
revoke all on function public.mirror_approval_status() from public;
revoke execute on function public.mirror_approval_status() from anon, authenticated;

drop trigger if exists approval_decisions_mirror_status on public.approval_decisions;
create trigger approval_decisions_mirror_status
  after insert on public.approval_decisions
  for each row execute function public.mirror_approval_status();

-- ─── 5. Phase 1 follow-up: pin search_path on set_updated_at ──
-- Carry-over advisor from Phase 1; harmless on its own but we promised
-- to keep helpers consistent.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
