import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getProfile } from "@/lib/portal/queries";
import {
  draftInitialEmail,
  prospectToContext,
  sendOutreachEmail,
} from "@/lib/openclaw/outreach";
import type { Prospect } from "@/lib/openclaw/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const profile = await getProfile();
  if (!profile || (profile.role !== "admin" && profile.role !== "team")) return null;
  return user;
}

export async function GET(_: NextRequest, { params }: RouteParams) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("outreach")
    .select("*")
    .eq("prospect_id", id)
    .order("created_at", { ascending: false });
  return NextResponse.json({ outreach: data || [] });
}

const postSchema = z.object({
  action: z.enum(["draft", "send_draft"]),
  send: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest, { params }: RouteParams) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data: prospect } = await supabase
    .from("prospects")
    .select("*")
    .eq("id", id)
    .single();
  if (!prospect) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const ctx = prospectToContext(prospect as Prospect);
  if (!ctx) {
    return NextResponse.json({ error: "Prospect missing website URL" }, { status: 422 });
  }

  let draft;
  try {
    draft = await draftInitialEmail(ctx);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Draft failed" },
      { status: 502 }
    );
  }

  if (!parsed.data.send) {
    // Just save the draft
    const { data: row } = await supabase
      .from("outreach")
      .insert({
        prospect_id: id,
        sequence_step: (prospect.outreach_count ?? 0) + 1,
        kind: "manual_email",
        to_email: prospect.email,
        subject: draft.subject,
        body_text: draft.body,
        status: "queued",
      })
      .select()
      .single();
    return NextResponse.json({ ok: true, draft, outreach: row });
  }

  // Send
  if (!prospect.email) {
    return NextResponse.json({ error: "Prospect has no email" }, { status: 422 });
  }

  const { data: row } = await supabase
    .from("outreach")
    .insert({
      prospect_id: id,
      sequence_step: (prospect.outreach_count ?? 0) + 1,
      kind: "manual_email",
      to_email: prospect.email,
      subject: draft.subject,
      body_text: draft.body,
      status: "queued",
    })
    .select()
    .single();

  const send = await sendOutreachEmail({
    to: prospect.email,
    subject: draft.subject,
    body: draft.body,
  });

  if (!send.ok) {
    if (row) {
      await supabase
        .from("outreach")
        .update({ status: "failed", error: send.error })
        .eq("id", row.id);
    }
    return NextResponse.json({ error: send.error || "Send failed" }, { status: 502 });
  }

  const nowIso = new Date().toISOString();
  if (row) {
    await supabase
      .from("outreach")
      .update({ status: "sent", sent_at: nowIso, resend_id: send.id })
      .eq("id", row.id);
  }

  await supabase
    .from("prospects")
    .update({
      status: "contacted",
      deal_stage: prospect.deal_stage === "lead" ? "engaged" : prospect.deal_stage,
      outreach_count: (prospect.outreach_count ?? 0) + 1,
      last_outreach_at: nowIso,
      contacted_at: prospect.contacted_at || nowIso,
    })
    .eq("id", id);

  return NextResponse.json({ ok: true, draft, sent: true });
}
