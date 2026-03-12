-- ============================================================
-- Client Portal Schema
-- TweakAndBuild.com
-- ============================================================

-- ─── 1. Profiles ─────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  email      text,
  role       text not null default 'client'
             check (role in ('admin', 'client', 'team')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    'client'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── 2. Projects ─────────────────────────────────────────────
create table if not exists public.projects (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  slug               text unique,
  client_company     text,
  status             text not null default 'planning'
                     check (status in ('planning','design','development','revisions','launch_prep','live')),
  completion_percent integer not null default 0
                     check (completion_percent >= 0 and completion_percent <= 100),
  launch_window      text,
  created_by         uuid references public.profiles(id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ─── 3. Project Members ──────────────────────────────────────
create table if not exists public.project_members (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  member_role text not null default 'client'
              check (member_role in ('owner','client','team')),
  created_at  timestamptz not null default now(),
  unique(project_id, user_id)
);

-- ─── 4. Project Milestones ───────────────────────────────────
create table if not exists public.project_milestones (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  title       text not null,
  status      text not null default 'pending'
              check (status in ('pending','in_progress','completed')),
  sort_order  integer not null default 0,
  due_date    date,
  created_at  timestamptz not null default now()
);

-- ─── 5. Project Updates ──────────────────────────────────────
create table if not exists public.project_updates (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  title       text not null,
  body        text,
  created_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ─── 6. Project Tasks ────────────────────────────────────────
create table if not exists public.project_tasks (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  title       text not null,
  description text,
  task_type   text not null default 'completed'
              check (task_type in ('completed','client_action','launch_check')),
  is_done     boolean not null default false,
  due_date    date,
  created_at  timestamptz not null default now()
);

-- ─── 7. Project Files ────────────────────────────────────────
create table if not exists public.project_files (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  file_name   text not null,
  file_path   text not null,
  file_type   text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ─── 8. Project Approvals ────────────────────────────────────
create table if not exists public.project_approvals (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  title       text not null,
  description text,
  status      text not null default 'pending'
              check (status in ('pending','approved','changes_requested')),
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_at  timestamptz not null default now()
);

-- ─── Indexes ─────────────────────────────────────────────────
create index if not exists idx_project_members_user    on public.project_members(user_id);
create index if not exists idx_project_members_project on public.project_members(project_id);
create index if not exists idx_milestones_project      on public.project_milestones(project_id, sort_order);
create index if not exists idx_updates_project_date    on public.project_updates(project_id, created_at desc);
create index if not exists idx_tasks_project_type      on public.project_tasks(project_id, task_type);
create index if not exists idx_files_project_date      on public.project_files(project_id, created_at desc);
create index if not exists idx_approvals_project       on public.project_approvals(project_id, created_at desc);
create index if not exists idx_projects_status         on public.projects(status);
