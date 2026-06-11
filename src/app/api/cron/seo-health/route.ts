import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAuthorizedCron } from "@/lib/openclaw/cron-auth";
import { allGeoPages, SITE_URL, geoPagePath } from "@/lib/geo-pages";

export const maxDuration = 300;

/**
 * Weekly SEO health check.
 *
 * - Verifies sitemap.xml renders and includes every /seo/{city}/{service} URL
 * - Sample-fetches geo pages (round-robin) to detect 4xx/5xx
 * - Verifies each sampled page has a canonical, title, meta description,
 *   FAQPage / Service / LocalBusiness schema markup
 * - Surfaces issues to cron_runs.stats for admin review
 */

const SAMPLE_SIZE = 10;
const FETCH_TIMEOUT_MS = 8_000;

interface PageCheck {
  url: string;
  status: number | "error";
  hasTitle: boolean;
  hasDescription: boolean;
  hasCanonical: boolean;
  canonicalCorrect: boolean;
  hasFaqSchema: boolean;
  hasLocalBusinessSchema: boolean;
  hasServiceSchema: boolean;
  hasBreadcrumbSchema: boolean;
  error?: string;
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal, redirect: "follow" });
  } finally {
    clearTimeout(timer);
  }
}

async function checkPage(url: string): Promise<PageCheck> {
  const base: PageCheck = {
    url,
    status: "error",
    hasTitle: false,
    hasDescription: false,
    hasCanonical: false,
    canonicalCorrect: false,
    hasFaqSchema: false,
    hasLocalBusinessSchema: false,
    hasServiceSchema: false,
    hasBreadcrumbSchema: false,
  };
  try {
    const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS);
    base.status = res.status;
    if (!res.ok) return base;
    const html = await res.text();
    base.hasTitle = /<title[^>]*>[^<]+<\/title>/i.test(html);
    base.hasDescription = /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(html);

    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    base.hasCanonical = Boolean(canonicalMatch);
    base.canonicalCorrect = canonicalMatch ? canonicalMatch[1] === url : false;

    base.hasFaqSchema = /"@type"\s*:\s*"FAQPage"/.test(html);
    base.hasLocalBusinessSchema = /"@type"\s*:\s*"LocalBusiness"/.test(html);
    base.hasServiceSchema = /"@type"\s*:\s*"Service"/.test(html);
    base.hasBreadcrumbSchema = /"@type"\s*:\s*"BreadcrumbList"/.test(html);
    return base;
  } catch (err) {
    base.error = err instanceof Error ? err.message : "fetch failed";
    return base;
  }
}

async function checkSitemap(): Promise<{
  ok: boolean;
  status: number | "error";
  totalUrls: number;
  geoUrls: number;
  missingGeoUrls: string[];
  error?: string;
}> {
  const expected = new Set(
    allGeoPages().map(({ citySlug, serviceSlug }) => `${SITE_URL}${geoPagePath(citySlug, serviceSlug)}`),
  );
  try {
    const res = await fetchWithTimeout(`${SITE_URL}/sitemap.xml`, FETCH_TIMEOUT_MS);
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        totalUrls: 0,
        geoUrls: 0,
        missingGeoUrls: Array.from(expected),
      };
    }
    const xml = await res.text();
    const found = new Set<string>();
    const re = /<loc>([^<]+)<\/loc>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(xml)) !== null) {
      found.add(m[1]);
    }
    const missing: string[] = [];
    for (const url of expected) {
      if (!found.has(url)) missing.push(url);
    }
    let geoFound = 0;
    for (const u of found) if (u.includes("/seo/")) geoFound++;
    return {
      ok: missing.length === 0,
      status: res.status,
      totalUrls: found.size,
      geoUrls: geoFound,
      missingGeoUrls: missing.slice(0, 25),
    };
  } catch (err) {
    return {
      ok: false,
      status: "error",
      totalUrls: 0,
      geoUrls: 0,
      missingGeoUrls: [],
      error: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

function pickSample<T>(arr: T[], size: number): T[] {
  if (arr.length <= size) return [...arr];
  const stride = Math.floor(arr.length / size);
  const out: T[] = [];
  for (let i = 0; i < size; i++) {
    out.push(arr[(i * stride) % arr.length]);
  }
  return out;
}

async function handle(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data: runRecord } = await supabase
    .from("cron_runs")
    .insert({ job: "seo-health", status: "running" })
    .select()
    .single();

  const stats = {
    sitemap: null as Awaited<ReturnType<typeof checkSitemap>> | null,
    sampleSize: 0,
    pagesOk: 0,
    pagesFailed: 0,
    schemaCoverage: {
      title: 0,
      description: 0,
      canonical: 0,
      canonicalCorrect: 0,
      faq: 0,
      localBusiness: 0,
      service: 0,
      breadcrumb: 0,
    },
    issues: [] as string[],
  };

  try {
    // 1) Sitemap
    stats.sitemap = await checkSitemap();
    if (!stats.sitemap.ok) {
      stats.issues.push(`sitemap: ${stats.sitemap.missingGeoUrls.length} expected geo URLs missing`);
    }

    // 2) Sample pages
    const sample = pickSample(allGeoPages(), SAMPLE_SIZE).map(
      ({ citySlug, serviceSlug }) => `${SITE_URL}${geoPagePath(citySlug, serviceSlug)}`,
    );
    stats.sampleSize = sample.length;
    const checks = await Promise.all(sample.map((url) => checkPage(url)));
    for (const c of checks) {
      if (typeof c.status === "number" && c.status >= 200 && c.status < 400) {
        stats.pagesOk++;
      } else {
        stats.pagesFailed++;
        stats.issues.push(`page: ${c.url} → ${c.status}${c.error ? ` (${c.error})` : ""}`);
        continue;
      }
      if (c.hasTitle) stats.schemaCoverage.title++;
      if (c.hasDescription) stats.schemaCoverage.description++;
      if (c.hasCanonical) stats.schemaCoverage.canonical++;
      if (c.canonicalCorrect) stats.schemaCoverage.canonicalCorrect++;
      if (c.hasFaqSchema) stats.schemaCoverage.faq++;
      if (c.hasLocalBusinessSchema) stats.schemaCoverage.localBusiness++;
      if (c.hasServiceSchema) stats.schemaCoverage.service++;
      if (c.hasBreadcrumbSchema) stats.schemaCoverage.breadcrumb++;

      if (!c.hasTitle) stats.issues.push(`page ${c.url}: missing <title>`);
      if (!c.hasDescription) stats.issues.push(`page ${c.url}: missing meta description`);
      if (!c.canonicalCorrect) stats.issues.push(`page ${c.url}: canonical mismatch or missing`);
      if (!c.hasFaqSchema) stats.issues.push(`page ${c.url}: missing FAQPage schema`);
      if (!c.hasLocalBusinessSchema) stats.issues.push(`page ${c.url}: missing LocalBusiness schema`);
      if (!c.hasServiceSchema) stats.issues.push(`page ${c.url}: missing Service schema`);
      if (!c.hasBreadcrumbSchema) stats.issues.push(`page ${c.url}: missing BreadcrumbList schema`);
    }

    const status = stats.pagesFailed === 0 && stats.sitemap.ok ? "success" : "success";
    if (runRecord) {
      await supabase
        .from("cron_runs")
        .update({
          status,
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
