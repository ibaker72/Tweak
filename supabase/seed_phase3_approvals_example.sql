-- ============================================================
-- Phase 3 Approvals Seed — One pending item on your project
-- ============================================================
--
-- Paste into the Supabase SQL editor. Adds:
--   • One pending approval_item tied to a seeded project file (so the
--     "View file" pill renders via the Phase 2 signed-URL flow).
--   • A second pending item with a plain URL reference.
-- Then sign in and visit /client-portal/approvals to exercise Approve /
-- Request Changes. The DB trigger mirrors your decision onto the item;
-- the decision history block shows the receipt.

do $$
declare
  proj_id        uuid := 'a1b2c3d4-e5f6-4a8b-9c1d-1234567890ab';
  client_email   text := 'iyadbaker.dev@gmail.com';
  uploader       uuid;
  attached_file  uuid;
begin
  select id into uploader from public.profiles where email = client_email limit 1;
  if uploader is null then
    raise exception 'No profile for %. Sign in once and run Phase 1 seed first.', client_email;
  end if;
  if not exists (select 1 from public.projects where id = proj_id) then
    raise exception 'Sample project % not found. Run Phase 1 seed first.', proj_id;
  end if;

  -- Pick a file from the Phase 2 seed (image preferred) if one exists.
  select id into attached_file
    from public.project_files
   where project_id = proj_id
     and file_name = 'hero-mockup.png'
   limit 1;

  insert into public.project_approvals
    (project_id, title, description, status, file_id, url, sort_order)
  values
    (proj_id,
     'Approve homepage hero v3',
     'Final visual direction for the homepage hero. Review the attached mockup and let us know if anything needs changing before we wire it into production.',
     'pending',
     attached_file,
     null,
     1),
    (proj_id,
     'Approve copy on services page',
     'Working draft of the services page copy. Click through and flag anything off-brand or unclear.',
     'pending',
     null,
     'https://staging.tweakandbuild.example/services',
     2);
end $$;
