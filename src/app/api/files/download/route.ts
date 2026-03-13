import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "project-files";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Check profile role — admin/team can download any file
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin" || profile?.role === "team";

  // If not admin, verify user is a member of the project this file belongs to
  if (!isAdmin) {
    // Extract project_id from file path (format: project_id/timestamp_filename)
    const projectId = filePath.split("/")[0];
    if (!projectId) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const { data: membership } = await supabase
      .from("project_members")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", user.id)
      .single();

    if (!membership) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }
  }

  // Generate signed URL (60 min expiry)
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 3600);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: error?.message ?? "Failed to generate URL" }, { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
