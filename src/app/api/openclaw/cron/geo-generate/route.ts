import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAuthorizedCron } from "@/lib/openclaw/cron-auth";
import { hasAnthropicKey } from "@/lib/openclaw/anthropic";
import { allGeoSlugs, generateGeoContent, geoSlug } from "@/lib/openclaw/geo-content";

export const maxDuration = 300;

// Generate a few pages per run so we stay within budgets.
const MAX_PER_RUN = 6;

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
    .insert({ job: "geo-generate", status: "running" })
    .select()
    .single();

  const stats = { generated: 0, skipped: 0, failed: 0, errors: [] as string[] };

  try {
    const all = allGeoSlugs();
    const { data: existing } = await supabase.from("geo_pages").select("slug");
    const have = new Set((existing || []).map((r) => r.slug));

    const missing = all.filter((p) => !have.has(p.slug)).slice(0, MAX_PER_RUN);

    for (const target of missing) {
      try {
        const content = await generateGeoContent(target.city, target.state, target.industry);
        await supabase.from("geo_pages").upsert(
          {
            city: target.city,
            state: target.state,
            industry: target.industry,
            slug: geoSlug(target.city, target.state, target.industry),
            content,
            generated_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "slug" }
        );
        stats.generated++;
      } catch (err) {
        stats.failed++;
        stats.errors.push(`${target.slug}: ${err instanceof Error ? err.message : "fail"}`);
      }
    }

    if (runRecord) {
      await supabase
        .from("cron_runs")
        .update({
          status: stats.errors.length && stats.generated === 0 ? "error" : "success",
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
