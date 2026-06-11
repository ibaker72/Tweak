import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/service";
import { isAuthorizedCron } from "@/lib/openclaw/cron-auth";
import { allGeoPages, SITE_URL, geoPagePath } from "@/lib/geo-pages";

export const maxDuration = 300;

const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

/**
 * Weekly sitemap refresh + search engine ping.
 *
 * - Revalidates every /seo/{city}/{service} page so they re-render.
 * - Revalidates the sitemap.
 * - Pings Google and Bing.
 *
 * Note: Google and Bing have both deprecated their classic sitemap ping
 * endpoints — Google sunset its ping in 2023 and Bing in 2022. The pings
 * here are best-effort and tolerated as a 404; the real signal is the
 * revalidated sitemap + on-page lastmod timestamps.
 */

async function pingUrl(url: string): Promise<{ url: string; status: number | "error"; error?: string }> {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    return { url, status: res.status };
  } catch (err) {
    return { url, status: "error", error: err instanceof Error ? err.message : "unknown" };
  }
}

async function handle(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data: runRecord } = await supabase
    .from("cron_runs")
    .insert({ job: "ping-search-engines", status: "running" })
    .select()
    .single();

  const stats = {
    revalidatedPaths: 0,
    pings: [] as Array<{ url: string; status: number | "error"; error?: string }>,
    sitemapEntries: 0,
  };

  try {
    // 1) Revalidate the sitemap + root SEO hub + every geo page.
    const allPaths = ["/", "/sitemap.xml", "/seo"];
    for (const { citySlug, serviceSlug } of allGeoPages()) {
      allPaths.push(geoPagePath(citySlug, serviceSlug));
    }
    stats.sitemapEntries = allPaths.length;
    for (const p of allPaths) {
      try {
        revalidatePath(p);
        stats.revalidatedPaths++;
      } catch {
        // ignore single-path failures
      }
    }

    // 2) Ping search engines. Both endpoints are deprecated; we hit them
    //    anyway so any future re-enablement picks us up automatically.
    const pingTargets = [
      `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    ];
    for (const target of pingTargets) {
      stats.pings.push(await pingUrl(target));
    }

    if (runRecord) {
      await supabase
        .from("cron_runs")
        .update({
          status: "success",
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
