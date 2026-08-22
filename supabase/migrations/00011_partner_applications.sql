-- ============================================================
-- Migration 011: Partner Applications
-- TweakAndBuild Partner Program
-- ============================================================
--
-- Before this migration the public Partner Application form
-- (/partners#apply → POST /api/partner-apply) had NO database
-- persistence at all. Answers existed only inside a Resend
-- notification email and a console.log line, so a Resend outage
-- or a log rotation permanently destroyed the application.
--
-- This table makes Supabase the source of truth. The API route
-- inserts here FIRST and only then attempts Loops / email; those
-- integrations can now fail without costing us an application.
--
-- ── DESIGN NOTES ──
--
-- • email is plain `text`, not citext. This repo enables no
--   Postgres extensions anywhere, and the app layer already
--   normalises addresses to lowercase (see the Zod schema in
--   src/lib/partners/schema.ts, and the existing
--   openclaw/unsubscribe route). A lower(email) functional index
--   gives us case-insensitive lookups without taking on an
--   extension and the security-advisor noise that comes with
--   placing one in the public schema.
--
-- • status / estimated_referrals use CHECK constraints rather
--   than Postgres enums — matching prospects.status (00005) and
--   project_approvals.decision (00009). CHECK constraints are
--   far cheaper to extend later than an enum type.
--
-- • updated_at is maintained by the existing public.set_updated_at()
--   trigger function from 00001 (search_path pinned in 00009).
--   No new helper function is introduced.
--
-- ── ONE-LINE EXPLANATION of every policy added below ──
--   partner_applications "Admin and team can read applications"   — SELECT: via is_admin_or_team()
--   partner_applications "Admin and team can update applications" — UPDATE: via is_admin_or_team() (status + internal_notes triage)
--   partner_applications "Admin can delete applications"          — DELETE: via is_admin() only, for GDPR erasure requests
--
-- Deliberately NO insert policy. Applications arrive exclusively
-- through the server route using the service-role client, which
-- bypasses RLS. anon and authenticated therefore cannot INSERT,
-- SELECT, UPDATE or DELETE a single row — this is private business
-- data containing applicant PII and it is never public-readable.

-- ─── 1. Table ────────────────────────────────────────────────
create table if not exists public.partner_applications (
  id                  uuid primary key default gen_random_uuid(),

  full_name           text not null,
  email               text not null,

  company             text,
  website             text,

  description         text not null,
  how_you_meet        text not null,

  estimated_referrals text not null
    check (estimated_referrals in ('1-2', '3-5', '5-10', '10+')),

  status              text not null default 'new'
    check (status in ('new', 'reviewing', 'contacted', 'approved', 'rejected')),

  internal_notes      text,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ─── 2. Indexes ──────────────────────────────────────────────
-- Functional index: the app always looks applicants up by a
-- lowercased address, so this is the one that actually gets used.
create index if not exists idx_partner_applications_email
  on public.partner_applications (lower(email));

create index if not exists idx_partner_applications_status
  on public.partner_applications (status);

-- The admin list view is "newest first", optionally filtered by
-- status — this composite serves both the unfiltered and the
-- filtered ordering.
create index if not exists idx_partner_applications_status_created
  on public.partner_applications (status, created_at desc);

create index if not exists idx_partner_applications_created
  on public.partner_applications (created_at desc);

-- ─── 3. updated_at trigger ───────────────────────────────────
drop trigger if exists partner_applications_set_updated_at
  on public.partner_applications;

create trigger partner_applications_set_updated_at
  before update on public.partner_applications
  for each row execute function public.set_updated_at();

-- ─── 4. RLS ──────────────────────────────────────────────────
alter table public.partner_applications enable row level security;

drop policy if exists "Admin and team can read applications"   on public.partner_applications;
drop policy if exists "Admin and team can update applications" on public.partner_applications;
drop policy if exists "Admin can delete applications"          on public.partner_applications;

create policy "Admin and team can read applications"
  on public.partner_applications for select
  using (public.is_admin_or_team());

create policy "Admin and team can update applications"
  on public.partner_applications for update
  using (public.is_admin_or_team())
  with check (public.is_admin_or_team());

-- Erasure requests only. Team members triage; they do not destroy.
create policy "Admin can delete applications"
  on public.partner_applications for delete
  using (public.is_admin());

-- No INSERT policy by design → writes come from the service-role
-- client in src/app/api/partner-apply/route.ts only.
