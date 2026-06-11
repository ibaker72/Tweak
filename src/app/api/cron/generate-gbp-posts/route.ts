import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAuthorizedCron } from "@/lib/openclaw/cron-auth";
import {
  GBP_CATEGORIES,
  generateGbpDraft,
  pickCategoryForWeek,
  pickFocusCity,
  relatedServiceUrlForCategory,
  type GbpCategory,
} from "@/lib/gbp-post-generator";

export const maxDuration = 300;

/**
 * Weekly GBP / Facebook / LinkedIn content drafts.
 *
 * Generates one primary GBP post + two supplementary drafts per run, then
 * saves them to Supabase (`gbp_posts`) as draft rows for human review. The
 * client UI for review/publish lives separately under /admin.
 */

async function handle(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data: runRecord } = await supabase
    .from("cron_runs")
    .insert({ job: "generate-gbp-posts", status: "running" })
    .select()
    .single();

  const stats = {
    created: 0,
    failed: 0,
    errors: [] as string[],
    focusCity: "",
    categories: [] as string[],
  };

  try {
    const focusCity = pickFocusCity();
    stats.focusCity = focusCity;

    // This week's primary + two complementary categories (rotate through full set).
    const primary = pickCategoryForWeek();
    const others = GBP_CATEGORIES.filter((c) => c !== primary);
    const supplementaryA = others[0];
    const supplementaryB = others[1];
    const queue: GbpCategory[] = [primary, supplementaryA, supplementaryB];
    stats.categories = queue;

    for (const category of queue) {
      try {
        const draft = await generateGbpDraft(category, focusCity);
        const ctaUrl = draft.ctaUrl || relatedServiceUrlForCategory(category);
        await supabase.from("gbp_posts").insert({
          category,
          focus_city: focusCity,
          gbp_body: draft.gbp,
          facebook_body: draft.facebook,
          linkedin_body: draft.linkedin,
          cta_button: draft.ctaButton,
          cta_url: ctaUrl,
          hashtags: draft.hashtags,
          status: "draft",
        });
        stats.created++;
      } catch (err) {
        stats.failed++;
        stats.errors.push(
          `${category}: ${err instanceof Error ? err.message : "fail"}`,
        );
      }
    }

    if (runRecord) {
      await supabase
        .from("cron_runs")
        .update({
          status: stats.errors.length && stats.created === 0 ? "error" : "success",
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
        .update({
          status: "error",
          error: message,
          stats,
          completed_at: new Date().toISOString(),
        })
        .eq("id", runRecord.id);
    }
    return NextResponse.json({ ok: false, error: message, stats }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
