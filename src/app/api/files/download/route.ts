import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "project-files";
const SIGNED_URL_TTL_SECONDS = 60; // short-lived; brief calls for "short-lived signed URLs"

// Image MIME types we'll allow inline preview for. Anything else is forced to
// download via Content-Disposition.
const PREVIEWABLE_PREFIXES = ["image/"];

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("id");
  const inline = searchParams.get("inline") === "1";

  if (!fileId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Trust the DB. The select runs under RLS — if the user doesn't own the
  // file's project, this returns nothing and we 404. We do NOT take the
  // storage path from the URL; we look it up by id and derive everything
  // server-side.
  const { data: file, error: fileError } = await supabase
    .from("project_files")
    .select("id, project_id, file_path, file_name, mime_type")
    .eq("id", fileId)
    .maybeSingle();

  if (fileError) {
    return NextResponse.json({ error: fileError.message }, { status: 500 });
  }
  if (!file) {
    // Could be "doesn't exist" or "RLS blocked it". Same response either way —
    // never reveal which.
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isPreviewable =
    inline &&
    !!file.mime_type &&
    PREVIEWABLE_PREFIXES.some((p) => file.mime_type!.startsWith(p));

  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(file.file_path, SIGNED_URL_TTL_SECONDS, {
      download: isPreviewable ? false : file.file_name,
    });

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: signError?.message ?? "Failed to generate URL" },
      { status: 500 },
    );
  }

  if (inline) {
    return NextResponse.json({ url: signed.signedUrl });
  }
  return NextResponse.redirect(signed.signedUrl);
}
