import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAuthorizedCron } from "@/lib/openclaw/cron-auth";
import { hasAnthropicKey } from "@/lib/openclaw/anthropic";
import {
  draftInitialEmail,
  prospectToContext,
  sendOutreachEmail,
} from "@/lib/openclaw/outreach";
import type { Prospect } from "@/lib/openclaw/types";

export const maxDuration = 300;

// Rate limit for sender reputation
const MAX_SENDS_PER_RUN = 10;
const MIN_AUDIT_SCORE = 0;
const MAX_AUDIT_SCORE = 79; // Sites below 80 have room to improve = good prospects

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
    .insert({ job: "outreach", status: "running" })
    .select()
    .single();

  const stats = {
    candidates: 0,
    drafted: 0,
    sent: 0,
    skipped_unsubscribed: 0,
    failed: 0,
    errors: [] as string[],
  };

  try {
    const { data: candidates } = await supabase
      .from("prospects")
      .select("*")
      .eq("status", "crawled")
      .not("email", "is", null)
      .not("website_url", "is", null)
      .gte("audit_score", MIN_AUDIT_SCORE)
      .lte("audit_score", MAX_AUDIT_SCORE)
      .eq("outreach_count", 0)
      .order("audit_score", { ascending: true })
      .limit(MAX_SENDS_PER_RUN * 2);

    stats.candidates = candidates?.length ?? 0;

    for (const p of (candidates as Prospect[] | null) || []) {
      if (stats.sent >= MAX_SENDS_PER_RUN) break;
      if (!p.email) continue;

      // Check unsubscribe list
      const { data: unsub } = await supabase
        .from("outreach_unsubscribes")
        .select("email")
        .eq("email", p.email.toLowerCase())
        .maybeSingle();
      if (unsub) {
        stats.skipped_unsubscribed++;
        await supabase.from("prospects").update({ status: "rejected" }).eq("id", p.id);
        continue;
      }

      const ctx = prospectToContext(p);
      if (!ctx) continue;

      try {
        const draft = await draftInitialEmail(ctx);
        stats.drafted++;

        const { data: outreachRow } = await supabase
          .from("outreach")
          .insert({
            prospect_id: p.id,
            sequence_step: 1,
            kind: "email_initial",
            to_email: p.email,
            subject: draft.subject,
            body_text: draft.body,
            status: "queued",
          })
          .select()
          .single();

        const sendResult = await sendOutreachEmail({
          to: p.email,
          subject: draft.subject,
          body: draft.body,
        });

        if (!sendResult.ok) {
          stats.failed++;
          stats.errors.push(`${p.business_name}: ${sendResult.error}`);
          if (outreachRow) {
            await supabase
              .from("outreach")
              .update({ status: "failed", error: sendResult.error })
              .eq("id", outreachRow.id);
          }
          continue;
        }

        stats.sent++;
        const nowIso = new Date().toISOString();
        if (outreachRow) {
          await supabase
            .from("outreach")
            .update({ status: "sent", sent_at: nowIso, resend_id: sendResult.id })
            .eq("id", outreachRow.id);
        }

        await supabase
          .from("prospects")
          .update({
            status: "contacted",
            deal_stage: "engaged",
            outreach_count: (p.outreach_count ?? 0) + 1,
            last_outreach_at: nowIso,
            contacted_at: p.contacted_at || nowIso,
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
