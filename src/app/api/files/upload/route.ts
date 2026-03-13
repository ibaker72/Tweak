import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 50 * 1024 * 1024; // 50MB
const BUCKET = "project-files";

export async function POST(request: Request) {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Role check — admin/team only
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "team")) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const projectId = formData.get("project_id") as string | null;

  if (!file || !projectId) {
    return NextResponse.json({ error: "File and project_id required" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 });
  }

  // Build storage path: project_id/timestamp_filename
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `${projectId}/${Date.now()}_${safeName}`;

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Insert metadata row
  const { error: dbError } = await supabase.from("project_files").insert({
    project_id: projectId,
    file_name: file.name,
    file_path: storagePath,
    file_type: ext || null,
    uploaded_by: user.id,
  });

  if (dbError) {
    // Cleanup storage if DB insert fails
    await supabase.storage.from(BUCKET).remove([storagePath]);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, path: storagePath });
}
