import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

async function unsubscribe(email: string, source: string) {
  const lower = email.toLowerCase().trim();
  if (!lower || !lower.includes("@")) return false;
  const supabase = createServiceClient();
  await supabase
    .from("outreach_unsubscribes")
    .upsert({ email: lower, source }, { onConflict: "email" });
  // Stop further sends for any prospect with that email
  await supabase
    .from("prospects")
    .update({ status: "rejected", deal_stage: "lost" })
    .eq("email", lower);
  return true;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") || "";
  await unsubscribe(email, "one_click");

  // Friendly HTML response
  return new NextResponse(
    `<!doctype html><html><head><meta charset=utf-8><title>Unsubscribed</title></head>
<body style="font-family:-apple-system,sans-serif;max-width:480px;margin:80px auto;padding:0 20px;color:#1a1a1a">
<h1 style="font-size:22px">You're unsubscribed</h1>
<p>We won't email ${escapeHtml(email)} again. Sorry for the noise.</p>
<p style="color:#666;font-size:13px">— Ian, Tweak &amp; Build</p>
</body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function POST(request: NextRequest) {
  // One-click unsubscribe per RFC 8058
  let email = "";
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const body = await request.json();
      email = body.email || "";
    } else {
      const form = await request.formData();
      email = String(form.get("email") || "");
      if (!email) {
        const url = new URL(request.url);
        email = url.searchParams.get("email") || "";
      }
    }
  } catch {
    const url = new URL(request.url);
    email = url.searchParams.get("email") || "";
  }
  const ok = await unsubscribe(email, "one_click_post");
  return NextResponse.json({ ok });
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);
}
