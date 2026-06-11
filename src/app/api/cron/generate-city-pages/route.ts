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
 * Weekly geo refresh: regenerate cached content for city × service landing
 * pages. Pages are populated MAX_PER_RUN at a time so we stay within the
 * Anthropic + Vercel timeout budgets. Pages that already have content are
 * refreshed at most once every REFRESH_DAYS.
 */
const MAX_PER_RUN = 12;
const REFRESH_DAYS = 60;

const GEO_REFRESH_SYSTEM = `You write content for programmatic Local + GEO SEO landing pages.
Each page targets one ${REGION_NAME} city × one specific service.

Constraints:
- Optimize for being CITED by AI assistants (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) and for ranking in classic local search.
- Be specific and verifiable. No fluff like "best-in-class".
- NEVER invent client names, reviews, rankings, or street addresses.
- Reference the city's real landmarks and the county only when natural.
- Tone: direct, confident, low-pressure.

Output STRICT JSON only with this exact shape:
{
  "intro": string (2-3 sentences, references the city naturally, under 360 chars),
  "whyLocal": string (2-3 sentences, references real local business context, under 360 chars),
  "localContext": string (2-3 sentences, references real landmarks and business sectors, under 360 chars),
  "ctaHeadline": string (under 90 chars, references the city)
}`;

function buildGeoUserPrompt(
  cityName: string,
  county: string,
  landmarks: string[],
  context: string[],
  serviceName: string,
  serviceTagline: string,
): string {
  return `City: ${cityName}, ${STATE_CODE} (${county} County)
Landmarks (use sparingly, only when natural): ${landmarks.slice(0, 3).join(", ")}
Local business sectors: ${context.slice(0, 4).join(", ")}

Service: ${serviceName}
Service tagline: ${serviceTagline}

Generate the JSON now.`;
}

async function generateCachedContent(
  citySlug: string,
  serviceSlug: string,
): Promise<CachedGeoContent | null> {
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return null;

  if (!hasAnthropicKey()) {
    // Deterministic fallback that still produces meaningful, unique content.
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
    systemCached: GEO_REFRESH_SYSTEM,
    user: buildGeoUserPrompt(
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

async function handle(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data: runRecord } = await supabase
    .from("cron_runs")
    .insert({ job: "generate-city-pages", status: "running" })
    .select()
    .single();

  const stats = {
    total: 0,
    generated: 0,
    refreshed: 0,
    skipped: 0,
    failed: 0,
    errors: [] as string[],
  };

  try {
    const targets = allGeoPages();
    stats.total = targets.length;

    const { data: existing } = await supabase
      .from("geo_pages")
      .select("slug, generated_at, updated_at");
    const haveMap = new Map<string, { generated_at?: string; updated_at?: string }>();
    for (const row of existing || []) {
      haveMap.set(row.slug, { generated_at: row.generated_at, updated_at: row.updated_at });
    }

    const refreshCutoff = Date.now() - REFRESH_DAYS * 86_400_000;
    const queue: typeof targets = [];
    for (const t of targets) {
      const have = haveMap.get(t.slug);
      if (!have) {
        queue.push(t);
        continue;
      }
      const ts = have.updated_at || have.generated_at;
      if (ts && new Date(ts).getTime() < refreshCutoff) {
        queue.push(t);
      } else {
        stats.skipped++;
      }
    }

    const batch = queue.slice(0, MAX_PER_RUN);

    for (const target of batch) {
      try {
        const content = await generateCachedContent(target.citySlug, target.serviceSlug);
        if (!content) {
          stats.failed++;
          stats.errors.push(`${target.slug}: no content generated`);
          continue;
        }
        const isNew = !haveMap.has(target.slug);
        await supabase.from("geo_pages").upsert(
          {
            city: getCity(target.citySlug)?.name || target.citySlug,
            state: STATE_CODE,
            industry: target.serviceSlug, // column reused as `service` for backwards compatibility
            slug: geoPageSlug(target.citySlug, target.serviceSlug),
            content,
            generated_at: isNew ? new Date().toISOString() : haveMap.get(target.slug)?.generated_at ?? new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "slug" },
        );
        if (isNew) {
          stats.generated++;
        } else {
          stats.refreshed++;
        }
      } catch (err) {
        stats.failed++;
        stats.errors.push(
          `${target.slug}: ${err instanceof Error ? err.message : "fail"}`,
        );
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

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
