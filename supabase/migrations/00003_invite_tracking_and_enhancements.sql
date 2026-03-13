-- ============================================================
-- Migration 003: Invite Tracking, File Size, Approval Notes
-- TweakAndBuild.com
-- ============================================================

-- ─── 1. Project Invites ────────────────────────────────────
create table if not exists public.project_invites (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references public.projects(id) on delete cascade,
  email        text not null,
  full_name    text,
  member_role  text not null default 'client'
               check (member_role in ('owner','client','team')),
  status       text not null default 'pending'
               check (status in ('pending','accepted','cancelled')),
  invited_by   uuid references public.profiles(id) on delete set null,
  invited_at   timestamptz not null default now(),
  accepted_at  timestamptz,
  last_sent_at timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

create index if not exists idx_invites_project    on public.project_invites(project_id);
create index if not exists idx_invites_email      on public.project_invites(email);
create index if not exists idx_invites_status     on public.project_invites(status);

-- ─── 2. File Size on project_files ─────────────────────────
alter table public.project_files
  add column if not exists file_size bigint;

-- ─── 3. Approval Response Notes ────────────────────────────
alter table public.project_approvals
  add column if not exists response_note text;

-- ─── 4. RLS for project_invites ────────────────────────────
alter table public.project_invites enable row level security;

-- Admin/team can do everything
create policy "Admin/team full access to invites"
  on public.project_invites
  for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'team')
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'team')
    )
  );

-- Project members can view invites for their projects (read-only)
create policy "Members can view project invites"
  on public.project_invites
  for select
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = project_invites.project_id
        and project_members.user_id = auth.uid()
    )
  );
