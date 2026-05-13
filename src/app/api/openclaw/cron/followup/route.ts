import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAuthorizedCron } from "@/lib/openclaw/cron-auth";
import { hasAnthropicKey } from "@/lib/openclaw/anthropic";
import {
  draftFollowupEmail,
  prospectToContext,
  sendOutreachEmail,
} from "@/lib/openclaw/outreach";
import type { Prospect } from "@/lib/openclaw/types";

export const maxDuration = 300;

const MAX_SENDS_PER_RUN = 10;
const FOLLOWUP_1_DELAY_DAYS = 3;
const FOLLOWUP_2_DELAY_DAYS = 7;

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAnthropicKey()) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  const supabase = createServiceClient();
  const { data: runRecord } = await supabase
    .from("cron_runs")
    .insert({ job: "followup", status: "running" })
    .select()
    .single();

  const stats = {
    candidates: 0,
    sent: 0,
    failed: 0,
    errors: [] as string[],
  };

  try {
    const now = Date.now();
    const cutoff1 = new Date(now - FOLLOWUP_1_DELAY_DAYS * 86_400_000).toISOString();
    const cutoff2 = new Date(now - FOLLOWUP_2_DELAY_DAYS * 86_400_000).toISOString();

    // Followup 1: contacted, 1 outreach, last_outreach > 3d ago, no reply
    const { data: f1 } = await supabase
      .from("prospects")
      .select("*")
      .eq("deal_stage", "engaged")
      .eq("outreach_count", 1)
      .lt("last_outreach_at", cutoff1)
      .limit(MAX_SENDS_PER_RUN);

    // Followup 2: 2 outreach, last > 7d
    const { data: f2 } = await supabase
      .from("prospects")
      .select("*")
      .eq("deal_stage", "engaged")
      .eq("outreach_count", 2)
      .lt("last_outreach_at", cutoff2)
      .limit(MAX_SENDS_PER_RUN);

    const batch: Array<{ p: Prospect; step: 1 | 2 }> = [
      ...((f1 as Prospect[] | null) || []).map((p) => ({ p, step: 1 as const })),
      ...((f2 as Prospect[] | null) || []).map((p) => ({ p, step: 2 as const })),
    ].slice(0, MAX_SENDS_PER_RUN);

    stats.candidates = batch.length;

    for (const { p, step } of batch) {
      if (!p.email) continue;

      const { data: unsub } = await supabase
        .from("outreach_unsubscribes")
        .select("email")
        .eq("email", p.email.toLowerCase())
        .maybeSingle();
      if (unsub) continue;

      const ctx = prospectToContext(p);
      if (!ctx) continue;

      try {
        const draft = await draftFollowupEmail(ctx, step);

        const { data: row } = await supabase
          .from("outreach")
          .insert({
            prospect_id: p.id,
            sequence_step: step + 1,
            kind: step === 1 ? "email_followup_1" : "email_followup_2",
            to_email: p.email,
            subject: draft.subject,
            body_text: draft.body,
            status: "queued",
          })
          .select()
          .single();

        const send = await sendOutreachEmail({
          to: p.email,
          subject: draft.subject,
          body: draft.body,
        });

        if (!send.ok) {
          stats.failed++;
          stats.errors.push(`${p.business_name}: ${send.error}`);
          if (row) {
            await supabase
              .from("outreach")
              .update({ status: "failed", error: send.error })
              .eq("id", row.id);
          }
          continue;
        }

        stats.sent++;
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
            outreach_count: (p.outreach_count ?? 0) + 1,
            last_outreach_at: nowIso,
          })
          .eq("id", p.id);
      } catch (err) {
        stats.failed++;
        stats.errors.push(`${p.business_name}: ${err instanceof Error ? err.message : "unknown"}`);
      }
    }

    if (runRecord) {
      await supabase
        .from("cron_runs")
        .update({
          status: stats.errors.length && stats.sent === 0 ? "error" : "success",
          stats,
          completed_at: new Date().toISOString(),
        })
        .eq("id", runRecord.id);
    }

    return NextResponse.json({ ok: true, stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cron failed";
    if (runRecord) {
      await supabase
        .from("cron_runs")
        .update({ status: "error", error: message, stats, completed_at: new Date().toISOString() })
        .eq("id", runRecord.id);
    }
    return NextResponse.json({ ok: false, error: message, stats }, { status: 500 });
  }
}
