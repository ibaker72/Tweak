import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAuthorizedCron } from "@/lib/openclaw/cron-auth";
import { hasAnthropicKey, callClaude, safeJsonParse, MODEL_DRAFT } from "@/lib/openclaw/anthropic";
import {
  allGeoPages,
  geoPageSlug,
  getCity,
  getService,
  buildIntro,
  buildWhyLocal,
  buildLocalContext,
  buildCtaHeadline,
  REGION_NAME,
  STATE_CODE,
  type CachedGeoContent,
} from "@/lib/geo-pages";

export const maxDuration = 300;

/**
 * Legacy admin-triggered GEO content generator. Kept under the original path
 * so the admin "Generate GEO content" button keeps working, but now delegates
 * to the same content pipeline used by /api/cron/generate-city-pages.
 *
 * Generates a smaller batch per run (admin-trigger pattern).
 */
const MAX_PER_RUN = 6;
const REFRESH_DAYS = 60;

const SYSTEM = `You write content for programmatic Local + GEO SEO landing pages.
Each page targets one ${REGION_NAME} city × one specific service.
Output STRICT JSON only with this shape:
{ "intro": string, "whyLocal": string, "localContext": string, "ctaHeadline": string }`;

function buildUserPrompt(
  cityName: string,
  county: string,
  landmarks: string[],
  ctx: string[],
  serviceName: string,
  serviceTagline: string,
): string {
  return `City: ${cityName}, ${STATE_CODE} (${county} County)
Landmarks: ${landmarks.slice(0, 3).join(", ")}
Sectors: ${ctx.slice(0, 4).join(", ")}
Service: ${serviceName} — ${serviceTagline}

Output JSON now.`;
}

async function generateCached(
  citySlug: string,
  serviceSlug: string,
): Promise<CachedGeoContent | null> {
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return null;

  if (!hasAnthropicKey()) {
    return {
      intro: buildIntro(city, service),
      whyLocal: buildWhyLocal(city, service),
      localContext: buildLocalContext(city),
      ctaHeadline: buildCtaHeadline(city, service),
      generatedAt: new Date().toISOString(),
    };
  }

  const { text } = await callClaude({
    model: MODEL_DRAFT,
    systemCached: SYSTEM,
    user: buildUserPrompt(
      city.name,
      city.county,
      city.landmarks,
      city.businessContext,
      service.name,
      service.metaTagline,
    ),
    maxTokens: 900,
    temperature: 0.45,
  });

  const parsed = safeJsonParse<Omit<CachedGeoContent, "generatedAt">>(text);
  if (!parsed) return null;
  return { ...parsed, generatedAt: new Date().toISOString() };
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data: runRecord } = await supabase
    .from("cron_runs")
    .insert({ job: "geo-generate", status: "running" })
    .select()
    .single();

  const stats = { generated: 0, refreshed: 0, skipped: 0, failed: 0, errors: [] as string[] };

  try {
    const all = allGeoPages();
    const { data: existing } = await supabase
      .from("geo_pages")
      .select("slug, updated_at, generated_at");
    const have = new Map<string, { updated_at?: string; generated_at?: string }>();
    for (const r of existing || []) {
      have.set(r.slug, { updated_at: r.updated_at, generated_at: r.generated_at });
    }

    const cutoff = Date.now() - REFRESH_DAYS * 86_400_000;
    const queue: typeof all = [];
    for (const t of all) {
      const row = have.get(t.slug);
      if (!row) {
        queue.push(t);
        continue;
      }
      const ts = row.updated_at || row.generated_at;
      if (ts && new Date(ts).getTime() < cutoff) queue.push(t);
      else stats.skipped++;
    }

    for (const target of queue.slice(0, MAX_PER_RUN)) {
      try {
        const content = await generateCached(target.citySlug, target.serviceSlug);
        if (!content) {
          stats.failed++;
          stats.errors.push(`${target.slug}: no content`);
          continue;
        }
        const isNew = !have.has(target.slug);
        await supabase.from("geo_pages").upsert(
          {
            city: getCity(target.citySlug)?.name || target.citySlug,
            state: STATE_CODE,
            industry: target.serviceSlug,
            slug: geoPageSlug(target.citySlug, target.serviceSlug),
            content,
            generated_at: isNew
              ? new Date().toISOString()
              : have.get(target.slug)?.generated_at ?? new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "slug" },
        );
        if (isNew) stats.generated++;
        else stats.refreshed++;
      } catch (err) {
        stats.failed++;
        stats.errors.push(`${target.slug}: ${err instanceof Error ? err.message : "fail"}`);
      }
    }

    if (runRecord) {
      await supabase
        .from("cron_runs")
        .update({
          status: stats.errors.length && stats.generated === 0 && stats.refreshed === 0 ? "error" : "success",
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
