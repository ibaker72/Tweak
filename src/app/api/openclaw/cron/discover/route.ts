import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { searchGooglePlaces, parseCityState } from "@/lib/openclaw/search";
import { auditWebsite } from "@/lib/openclaw/audit-runner";
import { discoverEmail } from "@/lib/openclaw/email-discovery";
import { SEED_METROS, SEED_INDUSTRIES, formatMetro } from "@/lib/openclaw/seeds";
import { isAuthorizedCron } from "@/lib/openclaw/cron-auth";
import type { ProspectIndustry } from "@/lib/openclaw/types";

export const maxDuration = 300;

// Hard caps so a single cron run is bounded.
const MAX_SEARCHES_PER_RUN = 6;
const MAX_AUDITS_PER_RUN = 12;

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_PLACES_API_KEY not configured" }, { status: 500 });
  }

  const supabase = createServiceClient();
  const { data: runRecord } = await supabase
    .from("cron_runs")
    .insert({ job: "discover", status: "running" })
    .select()
    .single();

  const stats = {
    searches: 0,
    inserted: 0,
    skipped: 0,
    audited: 0,
    emails_found: 0,
    errors: [] as string[],
  };

  try {
    // Pick search slots: rotate based on day-of-year so we cover the full grid over time
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
    );
    const allPairs: Array<{ city: string; state: string; industry: ProspectIndustry }> = [];
    for (const metro of SEED_METROS) {
      for (const industry of SEED_INDUSTRIES) {
        allPairs.push({ ...metro, industry });
      }
    }
    const startIdx = (dayOfYear * MAX_SEARCHES_PER_RUN) % allPairs.length;
    const todayPairs = allPairs.slice(startIdx, startIdx + MAX_SEARCHES_PER_RUN);
    if (todayPairs.length < MAX_SEARCHES_PER_RUN) {
      todayPairs.push(...allPairs.slice(0, MAX_SEARCHES_PER_RUN - todayPairs.length));
    }

    for (const pair of todayPairs) {
      const location = formatMetro(pair);
      try {
        const places = await searchGooglePlaces(
          { query: "", location, industry: pair.industry },
          apiKey
        );
        stats.searches++;

        for (const place of places) {
          const { city, state } = parseCityState(place.formatted_address);

          const { data: existing } = await supabase
            .from("prospects")
            .select("id")
            .eq("google_place_id", place.place_id)
            .maybeSingle();

          if (existing) {
            stats.skipped++;
            continue;
          }

          const { data: inserted } = await supabase
            .from("prospects")
            .insert({
              business_name: place.name,
              industry: pair.industry,
              address: place.formatted_address,
              city,
              state,
              phone: place.formatted_phone_number || null,
              website_url: place.website || null,
              google_place_id: place.place_id,
              google_rating: place.rating || null,
              google_review_count: place.user_ratings_total || null,
              search_query: `auto:${location}`,
              status: "new",
              auto_enrolled: true,
            })
            .select()
            .single();

          if (!inserted) continue;
          stats.inserted++;
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "search failed";
        stats.errors.push(`${location}/${pair.industry}: ${msg}`);
      }
    }

    // Audit new prospects with a website that haven't been crawled
    const { data: toAudit } = await supabase
      .from("prospects")
      .select("id, website_url, email")
      .eq("status", "new")
      .not("website_url", "is", null)
      .limit(MAX_AUDITS_PER_RUN);

    for (const p of toAudit || []) {
      if (!p.website_url) continue;
      try {
        const audit = await auditWebsite(p.website_url);
        const update: Record<string, unknown> = {
          status: "crawled",
          crawled_at: new Date().toISOString(),
          audit_score: audit.score,
        };
        if (audit.ok && audit.result) {
          update.audit_result_json = audit.result;
        }

        // Email discovery (skip if already have one)
        if (!p.email) {
          const discovery = await discoverEmail(p.website_url);
          if (discovery.email) {
            update.email = discovery.email;
            stats.emails_found++;
          }
        }

        await supabase.from("prospects").update(update).eq("id", p.id);
        stats.audited++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "audit failed";
        stats.errors.push(`audit ${p.id}: ${msg}`);
      }
    }

    if (runRecord) {
      await supabase
        .from("cron_runs")
        .update({
          status: stats.errors.length ? "error" : "success",
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
