import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

interface ResendEvent {
  type: string;
  created_at?: string;
  data?: {
    email_id?: string;
    to?: string[];
  };
}

const EVENT_TO_STATUS: Record<string, { status: string; timestampCol?: string }> = {
  "email.sent": { status: "sent", timestampCol: "sent_at" },
  "email.delivered": { status: "sent" },
  "email.opened": { status: "opened", timestampCol: "opened_at" },
  "email.clicked": { status: "clicked", timestampCol: "clicked_at" },
  "email.bounced": { status: "bounced" },
  "email.complained": { status: "complained" },
};

export async function POST(request: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (secret) {
    const provided = request.headers.get("x-webhook-secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let event: ResendEvent;
  try {
    event = (await request.json()) as ResendEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const emailId = event.data?.email_id;
  const mapping = EVENT_TO_STATUS[event.type];
  if (!emailId || !mapping) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const supabase = createServiceClient();
  const update: Record<string, unknown> = { status: mapping.status };
  if (mapping.timestampCol) {
    update[mapping.timestampCol] = event.created_at || new Date().toISOString();
  }

  await supabase.from("outreach").update(update).eq("resend_id", emailId);

  // If bounced/complained, also stop the prospect
  if (event.type === "email.bounced" || event.type === "email.complained") {
    const { data: row } = await supabase
      .from("outreach")
      .select("prospect_id, to_email")
      .eq("resend_id", emailId)
      .maybeSingle();
    if (row) {
      await supabase
        .from("prospects")
        .update({ status: "rejected", deal_stage: "lost" })
        .eq("id", row.prospect_id);
      if (event.type === "email.complained" && row.to_email) {
        await supabase
          .from("outreach_unsubscribes")
          .upsert({ email: row.to_email.toLowerCase(), source: "complaint" });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
