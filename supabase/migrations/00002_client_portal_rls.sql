-- ============================================================
-- Row Level Security Policies
-- TweakAndBuild Client Portal
-- ============================================================

-- Enable RLS on all portal tables
alter table public.profiles          enable row level security;
alter table public.projects          enable row level security;
alter table public.project_members   enable row level security;
alter table public.project_milestones enable row level security;
alter table public.project_updates   enable row level security;
alter table public.project_tasks     enable row level security;
alter table public.project_files     enable row level security;
alter table public.project_approvals enable row level security;

-- ─── Helper: check if user is a member of a project ─────────
-- (used by all child-table policies via EXISTS)

-- ─── Profiles ────────────────────────────────────────────────
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admin/team can read all profiles (for author lookups)
create policy "Admin and team can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'team')
    )
  );

-- Admin can insert profiles (for inviting users)
create policy "Admin can insert profiles"
  on public.profiles for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ─── Projects ────────────────────────────────────────────────
create policy "Members can read their projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = id and pm.user_id = auth.uid()
    )
  );

-- Admin/team can manage projects
create policy "Admin and team can manage projects"
  on public.projects for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'team')
    )
  );

-- ─── Project Members ────────────────────────────────────────
create policy "Members can read memberships for their projects"
  on public.project_members for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
    )
  );

create policy "Admin can manage project members"
  on public.project_members for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ─── Project Milestones ──────────────────────────────────────
create policy "Members can read milestones"
  on public.project_milestones for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
    )
  );

create policy "Admin and team can manage milestones"
  on public.project_milestones for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'team')
    )
  );

-- ─── Project Updates ─────────────────────────────────────────
create policy "Members can read updates"
  on public.project_updates for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
    )
  );

create policy "Admin and team can manage updates"
  on public.project_updates for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'team')
    )
  );

-- ─── Project Tasks ───────────────────────────────────────────
create policy "Members can read tasks"
  on public.project_tasks for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
    )
  );

create policy "Admin and team can manage tasks"
  on public.project_tasks for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'team')
    )
  );

-- ─── Project Files ───────────────────────────────────────────
create policy "Members can read files"
  on public.project_files for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
    )
  );

create policy "Admin and team can manage files"
  on public.project_files for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'team')
    )
  );

-- ─── Project Approvals ──────────────────────────────────────
create policy "Members can read approvals"
  on public.project_approvals for select
  using (
    exists (
      select 1 from public.project_members pm
      where pm.project_id = project_id and pm.user_id = auth.uid()
    )
  );

create policy "Admin and team can manage approvals"
  on public.project_approvals for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'team')
    )
  );
