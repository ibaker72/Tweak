-- ============================================================
-- Seed Data for Client Portal Development
-- TweakAndBuild.com
-- ============================================================
-- NOTE: To use this seed, first create a user via Supabase Auth
-- (e.g. via the dashboard or magic link). Then replace the
-- placeholder UUID below with that user's auth.users.id.
--
-- The trigger on auth.users will auto-create the profile row,
-- so you only need to UPDATE the profile and INSERT the rest.
-- ============================================================

-- Replace this with the real auth user id after creating a test user
-- Example: do $$ declare demo_user uuid := 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

do $$
declare
  demo_user    uuid;
  demo_project uuid := gen_random_uuid();
begin
  -- Look up the first client profile (created by the auth trigger)
  select id into demo_user from public.profiles where role = 'client' limit 1;

  if demo_user is null then
    raise notice 'No client profile found. Create a user via Supabase Auth first, then re-run this seed.';
    return;
  end if;

  -- Update profile
  update public.profiles
  set full_name = 'Alex Rivera', email = 'alex@demo-client.com'
  where id = demo_user;

  -- Create demo project
  insert into public.projects (id, name, slug, client_company, status, completion_percent, launch_window, created_by)
  values (
    demo_project,
    'Brand Refresh & Website Rebuild',
    'brand-refresh-2026',
    'Rivera Ventures',
    'development',
    62,
    'Q2 2026',
    demo_user
  );

  -- Link user as client member
  insert into public.project_members (project_id, user_id, member_role)
  values (demo_project, demo_user, 'client');

  -- Milestones
  insert into public.project_milestones (project_id, title, status, sort_order, due_date) values
    (demo_project, 'Discovery & Strategy',    'completed',   1, '2026-01-15'),
    (demo_project, 'Brand Identity Design',   'completed',   2, '2026-02-01'),
    (demo_project, 'Wireframes & UX',         'completed',   3, '2026-02-15'),
    (demo_project, 'Visual Design',           'completed',   4, '2026-03-01'),
    (demo_project, 'Frontend Development',    'in_progress', 5, '2026-03-20'),
    (demo_project, 'Backend & Integrations',  'in_progress', 6, '2026-04-01'),
    (demo_project, 'QA & Testing',            'pending',     7, '2026-04-10'),
    (demo_project, 'Launch & Handoff',        'pending',     8, '2026-04-20');

  -- Updates
  insert into public.project_updates (project_id, title, body, created_by, created_at) values
    (demo_project, 'Homepage hero section complete',
     'The homepage hero is built with the new brand direction. Animations and responsive layout are polished.',
     demo_user, now() - interval '2 days'),
    (demo_project, 'Design system finalized',
     'All design tokens, component library, and brand guidelines are locked in. Development is using the system consistently.',
     demo_user, now() - interval '5 days'),
    (demo_project, 'Services section in review',
     'The services section layout is ready for your review. Please check the copy and let us know if the positioning feels right.',
     demo_user, now() - interval '1 day');

  -- Completed tasks
  insert into public.project_tasks (project_id, title, description, task_type, is_done, due_date) values
    (demo_project, 'Logo refinements approved',       'Final logo files delivered in all formats.',     'completed', true,  '2026-02-01'),
    (demo_project, 'Color palette finalized',         'Primary, secondary, and accent colors locked.',  'completed', true,  '2026-02-05'),
    (demo_project, 'Typography system selected',      'Outfit + Inter Tight pairing confirmed.',        'completed', true,  '2026-02-08'),
    (demo_project, 'Wireframes signed off',           'All page wireframes approved by client.',        'completed', true,  '2026-02-15'),
    (demo_project, 'Homepage design approved',        'Full homepage comp approved.',                   'completed', true,  '2026-03-01');

  -- Client action items
  insert into public.project_tasks (project_id, title, description, task_type, is_done, due_date) values
    (demo_project, 'Review services page copy',       'Please review and approve the copy for the services section.',     'client_action', false, '2026-03-15'),
    (demo_project, 'Provide team headshots',          'We need headshots for the About page. 800x800px minimum.',         'client_action', false, '2026-03-18'),
    (demo_project, 'Confirm social media links',      'Please share all social profiles to link in the footer.',          'client_action', true,  '2026-03-10');

  -- Launch checks
  insert into public.project_tasks (project_id, title, description, task_type, is_done, due_date) values
    (demo_project, 'SSL certificate configured',      'HTTPS enabled across all pages.',                   'launch_check', true,  null),
    (demo_project, 'Analytics installed',             'Google Analytics 4 and conversion tracking.',        'launch_check', true,  null),
    (demo_project, 'SEO meta tags complete',          'Title, description, OG tags for all pages.',         'launch_check', false, null),
    (demo_project, 'Performance audit passed',        'Lighthouse score >90 on all key pages.',             'launch_check', false, null),
    (demo_project, 'Cross-browser testing done',      'Chrome, Firefox, Safari, Edge verified.',            'launch_check', false, null),
    (demo_project, 'Mobile responsive verified',      'Tested on iOS and Android devices.',                 'launch_check', false, null),
    (demo_project, 'Domain DNS configured',           'DNS records pointing to production.',                'launch_check', false, null),
    (demo_project, 'Client final sign-off',           'Written approval to go live.',                       'launch_check', false, null);

  -- Files
  insert into public.project_files (project_id, file_name, file_path, file_type, uploaded_by, created_at) values
    (demo_project, 'Brand Guidelines v2.pdf',     '/projects/brand-refresh-2026/brand-guidelines-v2.pdf',  'pdf',  demo_user, now() - interval '10 days'),
    (demo_project, 'Logo Package.zip',            '/projects/brand-refresh-2026/logo-package.zip',         'zip',  demo_user, now() - interval '9 days'),
    (demo_project, 'Homepage Mockup.fig',         '/projects/brand-refresh-2026/homepage-mockup.fig',      'fig',  demo_user, now() - interval '7 days'),
    (demo_project, 'Sitemap.pdf',                 '/projects/brand-refresh-2026/sitemap.pdf',              'pdf',  demo_user, now() - interval '12 days'),
    (demo_project, 'Content Brief.docx',          '/projects/brand-refresh-2026/content-brief.docx',       'docx', demo_user, now() - interval '14 days');

  -- Approvals
  insert into public.project_approvals (project_id, title, description, status, approved_by, approved_at, created_at) values
    (demo_project, 'Brand Identity Direction',
     'Approval of the final brand identity including logo, colors, and typography system.',
     'approved', demo_user, now() - interval '20 days', now() - interval '22 days'),
    (demo_project, 'Homepage Design Comp',
     'Review and approval of the full homepage visual design before development begins.',
     'approved', demo_user, now() - interval '8 days', now() - interval '10 days'),
    (demo_project, 'Services Page Layout',
     'Review the services page layout and content hierarchy. Provide feedback or approve to proceed.',
     'pending', null, null, now() - interval '1 day'),
    (demo_project, 'About Page Copy',
     'Final copy for the about page needs review. Please confirm the team bios and company story.',
     'changes_requested', null, null, now() - interval '3 days');

end $$;
