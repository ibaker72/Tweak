import { runAudit } from "@/lib/audit/aggregate";
import type { AuditResult } from "@/lib/audit/types";

export interface AuditRunResult {
  ok: boolean;
  score: number;
  result?: AuditResult;
  error?: string;
}

export async function auditWebsite(rawUrl: string): Promise<AuditRunResult> {
  let url = rawUrl.trim();
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  url = url.replace(/\/+$/, "");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const startTime = Date.now();
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "TweakAndBuild-OpenClaw/1.0 (https://tweakandbuild.com)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);

    const loadTimeMs = Date.now() - startTime;
    const html = await response.text();
    const pageSize = new TextEncoder().encode(html).length;

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const result = runAudit({
      url,
      html,
      headers,
      statusCode: response.status,
      loadTimeMs,
      pageSize,
    });

    return { ok: true, score: result.overallScore, result };
  } catch (err: unknown) {
    clearTimeout(timeout);
    const message =
      err instanceof Error && err.name === "AbortError"
        ? "Website took too long to respond"
        : err instanceof Error
          ? err.message
          : "Could not reach website";
    return { ok: false, score: 0, error: message };
  }
}
