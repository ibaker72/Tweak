import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/service";
import { runAudit } from "@/lib/audit/aggregate";

const schema = z.object({
  url: z.string().min(1, "URL is required"),
  email: z.string().email().optional(),
  businessName: z.string().optional(),
});

function normalizeUrl(raw: string): string {
  let url = raw.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  // Strip trailing slash
  url = url.replace(/\/+$/, "");
  return url;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const url = normalizeUrl(parsed.data.url);
    const domain = extractDomain(url);

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Please enter a valid URL" }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Insert audit request
    const { data: auditRequest, error: insertError } = await supabase
      .from("audit_requests")
      .insert({
        url,
        normalized_domain: domain,
        email: parsed.data.email || null,
        business_name: parsed.data.businessName || null,
        status: "scanning",
      })
      .select("id")
      .single();

    if (insertError || !auditRequest) {
      console.error("Failed to create audit request:", insertError);
      return NextResponse.json({ error: "Failed to start audit" }, { status: 500 });
    }

    const auditId = auditRequest.id;

    try {
      // Fetch the URL
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const startTime = Date.now();
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "TweakAndBuild-Audit/1.0 (https://tweakandbuild.com)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        redirect: "follow",
      });
      clearTimeout(timeout);

      const loadTimeMs = Date.now() - startTime;
      const html = await response.text();
      const pageSize = new TextEncoder().encode(html).length;

      // Collect headers
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      // Run audit
      const result = runAudit({
        url,
        html,
        headers,
        statusCode: response.status,
        loadTimeMs,
        pageSize,
      });

      // Save results
      const { error: resultError } = await supabase.from("audit_results").insert({
        audit_request_id: auditId,
        overall_score: result.overallScore,
        performance_score: result.categories.performance.score,
        seo_score: result.categories.seo.score,
        conversion_score: result.categories.conversion.score,
        trust_score: result.categories.trust.score,
        mobile_score: result.categories.mobile.score,
        accessibility_score: result.categories.accessibility.score,
        categories_json: result.categories,
        strengths_json: result.topStrengths,
        issues_json: result.topWeaknesses,
        quick_wins_json: result.quickWins,
        recommendations_json: result.recommendations,
        biggest_opportunity: result.biggestOpportunity,
        fastest_win: result.fastestWin,
        raw_meta_json: {
          url: result.url,
          domain: result.domain,
          scannedAt: result.scannedAt,
          statusCode: response.status,
          loadTimeMs,
          pageSize,
        },
      });

      if (resultError) {
        console.error("Failed to save audit results:", resultError);
      }

      // Update status
      await supabase
        .from("audit_requests")
        .update({ status: "complete" })
        .eq("id", auditId);

      return NextResponse.json({ id: auditId });
    } catch (fetchError: unknown) {
      const message =
        fetchError instanceof Error && fetchError.name === "AbortError"
          ? "The website took too long to respond. Please check the URL and try again."
          : fetchError instanceof Error
            ? `We couldn't reach that website: ${fetchError.message}`
            : "We couldn't reach that website. Please check the URL and try again.";

      await supabase
        .from("audit_requests")
        .update({ status: "error", error_message: message })
        .eq("id", auditId);

      return NextResponse.json({ id: auditId, error: message }, { status: 200 });
    }
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
