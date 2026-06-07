-- ============================================================
-- Phase 2 Files Seed — Attach a test file to your project
-- ============================================================
--
-- Quick way to see the Files tab populated WITHOUT actually uploading a real
-- file. Inserts a fake project_files row tied to the Phase-1 sample project.
-- The download/preview won't work for this row because the storage object
-- doesn't exist — that's expected. To get a real preview / download, follow
-- the real upload flow below the seed.
--
-- 1. Sign in once so your profile exists (run Phase 1's seed first if you
--    haven't already — supabase/seed_phase2_example.sql).
-- 2. Paste this in the Supabase SQL editor.

do $$
declare
  proj_id      uuid := 'a1b2c3d4-e5f6-4a8b-9c1d-1234567890ab';
  client_email text := 'iyadbaker.dev@gmail.com';
  uploader     uuid;
begin
  select id into uploader from public.profiles where email = client_email limit 1;
  if uploader is null then
    raise exception 'No profile for %. Run Phase 1 seed first.', client_email;
  end if;
  if not exists (select 1 from public.projects where id = proj_id) then
    raise exception 'Sample project % not found. Run Phase 1 seed first.', proj_id;
  end if;

  insert into public.project_files (
    project_id, file_name, file_path, file_type, file_size, mime_type, category, uploaded_by
  ) values
    (proj_id, 'brand-guidelines.pdf',
     proj_id || '/seed_brand-guidelines.pdf',
     'pdf', 482 * 1024, 'application/pdf', 'document', uploader),
    (proj_id, 'hero-mockup.png',
     proj_id || '/seed_hero-mockup.png',
     'png', 1.2 * 1024 * 1024, 'image/png', 'design', uploader),
    (proj_id, 'launch-checklist.docx',
     proj_id || '/seed_launch-checklist.docx',
     'docx', 28 * 1024,
     'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
     'document', uploader),
    (proj_id, 'invoice-001.pdf',
     proj_id || '/seed_invoice-001.pdf',
     'pdf', 95 * 1024, 'application/pdf', 'invoice', uploader);
end $$;

-- ── REAL upload flow (no client portal upload this phase) ───────────────
-- Phase 2 is read-only for clients. To share a real file with a client:
--
-- 1. Supabase Dashboard → Storage → project-files bucket.
-- 2. Open the folder named <project_id> (create it if missing — use the
--    project's UUID as the folder name; this is what the storage RLS policy
--    matches on).
-- 3. Upload the file there.
-- 4. INSERT a row into public.project_files with the matching file_path,
--    e.g.:
--
--    insert into public.project_files
--      (project_id, file_name, file_path, file_type, file_size, mime_type, category, uploaded_by)
--    values
--      ('<project-uuid>',
--       'design-v2.png',
--       '<project-uuid>/design-v2.png',     -- must start with project_id/
--       'png',
--       1234567,
--       'image/png',
--       'design',
--       '<your-profile-uuid>');
--
-- The client will see it instantly. Download + image preview work through
-- /api/files/download, which auths the request and signs a 60s URL.
