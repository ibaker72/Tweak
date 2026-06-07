-- ============================================================
-- Migration 008: Portal Phase 2 — Files
-- TweakAndBuild Client Portal
-- ============================================================
--
-- Three things happen here:
--
-- 1. NEW COLUMNS on project_files for the Files tab:
--      category    — caller-set label (design | document | asset | invoice | other)
--      mime_type   — server-recorded Content-Type, used for icon + preview routing
--
-- 2. STORAGE BUCKET LOCKDOWN. The previous storage policies on storage.objects
--    were:
--      SELECT  using (bucket_id = 'project-files')   — any authenticated user
--      INSERT  with check (bucket_id = 'project-files') — any authenticated user
--    That gave every signed-in client read access to every other client's
--    files via supabase.storage.from('project-files').createSignedUrl(path).
--    The API route's ownership check was bypassable because the SDK's signing
--    call goes straight to Supabase Storage and never hits our route.
--
--    The brief is explicit: "A client must NEVER access another client's
--    files ... by guessing a storage path." We now enforce ownership at the
--    storage layer too. Paths in this bucket are written as <project_id>/<...>
--    by the upload route, so we extract the first segment and check
--    membership against project_members. The helper is SECURITY DEFINER to
--    avoid the recursion class of bugs found in Phase 1 (a row-level check
--    on storage.objects that needs to read project_members would otherwise
--    trigger project_members RLS).
--
--    INSERT / UPDATE / DELETE are now admin-or-team only. This phase is
--    read-only for clients per the brief; the upload route runs server-side
--    with the user's session and so will only succeed if that user is
--    admin/team. The client portal removes the upload widget regardless.
--
-- 3. Phase 1 advisory follow-up — pin search_path on set_milestone_completed_at.
--
-- ── ONE-LINE EXPLANATION of every policy added/changed below ──
--   project_files.category, project_files.mime_type             — additive columns, no policy change needed
--   storage.objects "Members can read project files"            — SELECT: SECURITY DEFINER helper checks first path segment is a project the user is a member of
--   storage.objects "Admin and team can write project files"    — INSERT/UPDATE/DELETE: admin/team only via public.is_admin_or_team()
--   (table-level project_files SELECT policy from Phase 1)      — UNCHANGED: still scoped via project_members membership

-- ─── 1. Project files: category + mime_type ──────────────────
alter table public.project_files
  add column if not exists category  text,
  add column if not exists mime_type text;

-- Optional but useful — constrain category to a known set.
-- The check accepts NULL so older rows and "uncategorised" stays valid.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'project_files_category_check'
  ) then
    alter table public.project_files
      add constraint project_files_category_check
      check (category is null or category in ('design','document','asset','invoice','other'));
  end if;
end $$;

create index if not exists idx_project_files_category
  on public.project_files(project_id, category);

-- ─── 2. Storage ownership helper (SECURITY DEFINER) ──────────
--
-- Returns true iff the calling user (auth.uid()) is a member of the project
-- encoded as the first segment of the storage path. SECURITY DEFINER bypasses
-- RLS on project_members for this lookup — the function itself is the gate.
create or replace function public.user_owns_storage_path(path text)
returns boolean
language plpgsql
security definer
stable
set search_path = ''
as $$
declare
  segment text;
  proj_id uuid;
begin
  if auth.uid() is null or path is null or path = '' then
    return false;
  end if;

  segment := split_part(path, '/', 1);
  -- The path's first segment must be a UUID. Anything else is rejected.
  begin
    proj_id := segment::uuid;
  exception when others then
    return false;
  end;

  return exists (
    select 1 from public.project_members pm
    where pm.project_id = proj_id and pm.user_id = auth.uid()
  );
end;
$$;

revoke all on function public.user_owns_storage_path(text) from public;
grant execute on function public.user_owns_storage_path(text)
  to authenticated, service_role;

-- ─── 3. Replace permissive storage policies ──────────────────
-- Drop the legacy permissive policies. Names come from inspection of
-- pg_policies on storage.objects for bucket project-files. Use IF EXISTS so
-- this migration is safe to run against an environment where someone has
-- already renamed them.
drop policy if exists "Authenticated users can read vmqls3_0"   on storage.objects;
drop policy if exists "Authenticated users can upload vmqls3_0" on storage.objects;
drop policy if exists "Members can read project files" on storage.objects;
drop policy if exists "Admin and team can write project files" on storage.objects;
drop policy if exists "Admin and team can update project files" on storage.objects;
drop policy if exists "Admin and team can delete project files" on storage.objects;

create policy "Members can read project files"
  on storage.objects for select
  using (
    bucket_id = 'project-files'
    and (public.user_owns_storage_path(name) or public.is_admin_or_team())
  );

create policy "Admin and team can write project files"
  on storage.objects for insert
  with check (
    bucket_id = 'project-files'
    and public.is_admin_or_team()
  );

create policy "Admin and team can update project files"
  on storage.objects for update
  using (
    bucket_id = 'project-files'
    and public.is_admin_or_team()
  )
  with check (
    bucket_id = 'project-files'
    and public.is_admin_or_team()
  );

create policy "Admin and team can delete project files"
  on storage.objects for delete
  using (
    bucket_id = 'project-files'
    and public.is_admin_or_team()
  );

-- ─── 4. Phase 1 follow-up: pin search_path on completed_at trigger ─
create or replace function public.set_milestone_completed_at()
returns trigger
language plpgsql
set search_path = ''
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
