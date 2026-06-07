-- ============================================================
-- Migration 007: Portal Phase 2 — Dashboard fields
-- TweakAndBuild Client Portal
-- ============================================================
--
-- Two things happen in this migration:
--
-- 1. NEW COLUMNS for the phase-2 dashboard:
--      projects.type           — short label (e.g. "Marketing site")
--      projects.live_url       — public URL once shipped (nullable)
--      project_milestones.description    — longer copy under the title
--      project_milestones.completed_at   — when status flipped to completed
--    plus a BEFORE trigger that auto-stamps completed_at on status flip.
--
-- 2. RLS HARDENING. The isolation test (supabase/tests/isolation_test.sql)
--    uncovered three latent bugs in the original 00002 policies that nobody
--    hit because the tables were empty. They are fixed here:
--      a) project_members SELECT policy self-referenced project_members in
--         its USING subquery → infinite recursion the moment a row exists.
--      b) "Admin and team can manage X" policies self-referenced profiles
--         to check the role → same infinite recursion pattern.
--      c) Member SELECT policies used UNQUALIFIED `id` / `project_id` in the
--         EXISTS subquery. Postgres resolves unqualified refs to the INNER
--         alias (project_members), so the condition silently became either
--         "no one sees their own project" or — worse on child tables —
--         "every member sees every tenant's data." That's a cross-tenant
--         data leak waiting for the first second user.
--    All three are fixed below. The isolation test now passes for both
--    clients and for anonymous.
--
-- The brief specifies status enums {discovery|design|build|review|launched}
-- and {pending|in_progress|done}. The existing schema uses {planning|design|
-- development|revisions|launch_prep|live} and {pending|in_progress|completed}
-- — a superset of the brief's terms, already shipped, with indexes and a
-- working dashboard. We KEEP the existing enum values in the DB and map them
-- to the brief's display labels in the UI (see src/app/client-portal/page.tsx
-- and src/components/portal/milestone-timeline.tsx). That preserves the
-- multi-tenant project_members model (richer than a single client_id, and
-- already wired up across admin + portal) while honoring the spec's language.
--
-- ── ONE-LINE EXPLANATION of every policy that gates CLIENT access ──
--   profiles "Users can read own profile"               — auth.uid() = id
--   profiles "Users can update own profile"             — auth.uid() = id (write check too)
--   profiles "Admin and team can read all profiles"     — role lookup via is_admin_or_team()
--   profiles "Admin can insert profiles"                — role lookup via is_admin()
--   projects "Members can read their projects"          — must have a project_members row for this id
--   projects "Admin and team can manage projects"       — full CRUD via is_admin_or_team()
--   project_members "Users can read their own memberships" — user_id = auth.uid() (no recursion)
--   project_members "Admin can manage project members"  — full CRUD via is_admin()
--   project_milestones "Members can read milestones"    — parent project must be one they're a member of
--   project_milestones "Admin and team can manage milestones" — full CRUD via is_admin_or_team()
--   project_updates "Members can read updates"          — same membership check
--   project_updates "Admin and team can manage updates" — full CRUD via is_admin_or_team()
--   project_tasks "Members can read tasks"              — same membership check
--   project_tasks "Admin and team can manage tasks"     — full CRUD via is_admin_or_team()
--   project_files "Members can read files"              — same membership check
--   project_files "Admin and team can manage files"     — full CRUD via is_admin_or_team()
--   project_approvals "Members can read approvals"      — same membership check
--   project_approvals "Admin and team can manage approvals" — full CRUD via is_admin_or_team()
--   project_invites "Members can view project invites"  — same membership check
--   project_invites "Admin/team full access to invites" — full CRUD via is_admin_or_team()
-- Every client-readable row therefore requires an EXISTS over project_members
-- with user_id = auth.uid(). A client cannot SELECT another client's data
-- regardless of how the frontend phrases the query — verified by the
-- isolation test.

-- ─── 1. Projects: type + live_url ────────────────────────────
alter table public.projects
  add column if not exists type     text,
  add column if not exists live_url text;

-- ─── 2. Milestones: description + completed_at ───────────────
alter table public.project_milestones
  add column if not exists description  text,
  add column if not exists completed_at timestamptz;

-- ─── 3. Auto-stamp completed_at when status flips to completed ─
create or replace function public.set_milestone_completed_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'completed' and (old.status is distinct from 'completed') then
    new.completed_at = coalesce(new.completed_at, now());
  elsif new.status <> 'completed' then
    new.completed_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists project_milestones_completed_at on public.project_milestones;
create trigger project_milestones_completed_at
  before insert or update on public.project_milestones
  for each row execute function public.set_milestone_completed_at();

-- ─── 4. Fix infinite recursion in project_members SELECT policy ─
--
-- The original policy in 00002 self-referenced project_members inside its
-- own USING clause:
--   exists (select 1 from project_members pm where pm.project_id = project_id ...)
-- Postgres re-applies the same policy to the inner SELECT, recursing forever.
-- Nobody hit it because the tables were empty.
--
-- Correct intent for clients: a user should see THEIR OWN membership rows,
-- not the memberships of other users on the same project. Replacing with a
-- simple direct check has zero recursion AND keeps the EXISTS checks in
-- every child table (project_milestones, project_files, etc.) correct —
-- those subqueries against project_members will now be transparently
-- filtered to "rows where user_id = auth.uid()", which is exactly the
-- access check we want.
drop policy if exists "Members can read memberships for their projects" on public.project_members;
create policy "Users can read their own memberships"
  on public.project_members for select
  using (user_id = auth.uid());

-- ─── 5. Fix recursion in all role-lookup policies ────────────
--
-- "Admin and team can read all profiles" (and the analogous policies on
-- projects / milestones / tasks / files / approvals / invites) do:
--   exists (select 1 from profiles where id = auth.uid() and role in ('admin','team'))
-- That subquery triggers profiles' RLS, which itself includes the same
-- subquery, recursing forever. We extract the role check into a SECURITY
-- DEFINER function so the lookup runs as the function owner and bypasses
-- RLS on profiles. The function is STABLE so it caches within a statement.
create or replace function public.is_admin_or_team()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'team')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin_or_team() from public;
revoke all on function public.is_admin()        from public;
grant execute on function public.is_admin_or_team() to authenticated, service_role;
grant execute on function public.is_admin()        to authenticated, service_role;

-- Replace every policy that previously inlined the recursive role check.
drop policy if exists "Admin and team can read all profiles" on public.profiles;
create policy "Admin and team can read all profiles"
  on public.profiles for select using (public.is_admin_or_team());

drop policy if exists "Admin can insert profiles" on public.profiles;
create policy "Admin can insert profiles"
  on public.profiles for insert with check (public.is_admin());

drop policy if exists "Admin and team can manage projects" on public.projects;
create policy "Admin and team can manage projects"
  on public.projects for all
  using (public.is_admin_or_team())
  with check (public.is_admin_or_team());

drop policy if exists "Admin can manage project members" on public.project_members;
create policy "Admin can manage project members"
  on public.project_members for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin and team can manage milestones" on public.project_milestones;
create policy "Admin and team can manage milestones"
  on public.project_milestones for all
  using (public.is_admin_or_team())
  with check (public.is_admin_or_team());

drop policy if exists "Admin and team can manage updates" on public.project_updates;
create policy "Admin and team can manage updates"
  on public.project_updates for all
  using (public.is_admin_or_team())
  with check (public.is_admin_or_team());

drop policy if exists "Admin and team can manage tasks" on public.project_tasks;
create policy "Admin and team can manage tasks"
  on public.project_tasks for all
  using (public.is_admin_or_team())
  with check (public.is_admin_or_team());

drop policy if exists "Admin and team can manage files" on public.project_files;
create policy "Admin and team can manage files"
  on public.project_files for all
  using (public.is_admin_or_team())
  with check (public.is_admin_or_team());

drop policy if exists "Admin and team can manage approvals" on public.project_approvals;
create policy "Admin and team can manage approvals"
  on public.project_approvals for all
  using (public.is_admin_or_team())
  with check (public.is_admin_or_team());

drop policy if exists "Admin/team full access to invites" on public.project_invites;
create policy "Admin/team full access to invites"
  on public.project_invites for all
  using (public.is_admin_or_team())
  with check (public.is_admin_or_team());

-- ─── 6. Fix unqualified column refs in member-scoped SELECT policies ─
--
-- CRITICAL. The existing policies wrote conditions like:
--   exists (select 1 from project_members pm where pm.project_id = project_id ...)
-- Inside the EXISTS subquery, unqualified `project_id` resolves to the inner
-- alias (pm.project_id), not to the protected table's column. The condition
-- collapses to `pm.project_id = pm.project_id and pm.user_id = auth.uid()` —
-- i.e. "any user with ANY project_members row sees ALL rows of the protected
-- table." That's a cross-tenant data leak. The projects policy had the same
-- problem with `id` (project_members has its own `id` column — the PK).
-- Every member-scoped SELECT policy below is replaced with the same shape
-- but with explicit qualification.

drop policy if exists "Members can read their projects" on public.projects;
create policy "Members can read their projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = public.projects.id
        and pm.user_id    = auth.uid()
    )
  );

drop policy if exists "Members can read milestones" on public.project_milestones;
create policy "Members can read milestones"
  on public.project_milestones for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = public.project_milestones.project_id
        and pm.user_id    = auth.uid()
    )
  );

drop policy if exists "Members can read updates" on public.project_updates;
create policy "Members can read updates"
  on public.project_updates for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = public.project_updates.project_id
        and pm.user_id    = auth.uid()
    )
  );

drop policy if exists "Members can read tasks" on public.project_tasks;
create policy "Members can read tasks"
  on public.project_tasks for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = public.project_tasks.project_id
        and pm.user_id    = auth.uid()
    )
  );

drop policy if exists "Members can read files" on public.project_files;
create policy "Members can read files"
  on public.project_files for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = public.project_files.project_id
        and pm.user_id    = auth.uid()
    )
  );

drop policy if exists "Members can read approvals" on public.project_approvals;
create policy "Members can read approvals"
  on public.project_approvals for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = public.project_approvals.project_id
        and pm.user_id    = auth.uid()
    )
  );

drop policy if exists "Members can view project invites" on public.project_invites;
create policy "Members can view project invites"
  on public.project_invites for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = public.project_invites.project_id
        and pm.user_id    = auth.uid()
    )
  );
