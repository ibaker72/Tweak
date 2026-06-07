-- ============================================================
-- Phase 2 Seed — One project + milestones for your account
-- ============================================================
--
-- Paste-and-run in the Supabase SQL editor. Looks up your auth user
-- by email (default: iyadbaker.dev@gmail.com — change the literal
-- below if needed), then creates one project + four milestones
-- and adds you as the project's client member.
--
-- Safe to re-run: uses ON CONFLICT to avoid duplicates and a fixed
-- project UUID so milestone inserts don't multiply.

do $$
declare
  my_user_id    uuid;
  proj_id       uuid := 'a1b2c3d4-e5f6-4a8b-9c1d-1234567890ab';
  client_email  text := 'iyadbaker.dev@gmail.com';
begin
  select id into my_user_id from public.profiles where email = client_email limit 1;
  if my_user_id is null then
    raise exception 'No profile found for %. Sign in once so the profile is auto-created, then re-run.', client_email;
  end if;

  -- Project
  insert into public.projects (id, name, type, status, completion_percent, live_url, client_company, launch_window)
  values (
    proj_id,
    'Acme Co. Marketing Site',
    'Marketing site',          -- projects.type
    'development',             -- maps to "Build" in UI
    45,                        -- progress ring
    null,                      -- set a real URL once live
    'Acme Co.',
    'Q3 2026'
  )
  on conflict (id) do update set
    name = excluded.name,
    type = excluded.type,
    status = excluded.status,
    completion_percent = excluded.completion_percent,
    client_company = excluded.client_company,
    launch_window = excluded.launch_window;

  -- Membership (you, as client)
  insert into public.project_members (project_id, user_id, member_role)
  values (proj_id, my_user_id, 'client')
  on conflict (project_id, user_id) do nothing;

  -- Wipe existing milestones for this project so re-runs stay clean
  delete from public.project_milestones where project_id = proj_id;

  -- Milestones — covers all three states the UI renders
  insert into public.project_milestones (project_id, title, description, status, sort_order, due_date)
  values
    (proj_id, 'Discovery & brand workshop',
     'Brand interview, audience mapping, success criteria locked in.',
     'completed',   1, current_date - 21),
    (proj_id, 'Design system + key pages',
     'Hero, services, case study, contact — desktop + mobile mocks.',
     'completed',   2, current_date - 7),
    (proj_id, 'Build & integrations',
     'Next.js build, CMS wiring, analytics, Stripe checkout.',
     'in_progress', 3, current_date + 10),
    (proj_id, 'Client review round',
     'Walkthrough + revision pass on staging.',
     'pending',     4, current_date + 21),
    (proj_id, 'Launch & DNS cutover',
     'Final QA, DNS cutover, post-launch monitoring.',
     'pending',     5, current_date + 35);
end $$;

-- After running, refresh /client-portal to see the populated dashboard.
