import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/service";
import { runAudit } from "@/lib/audit/aggregate";

const schema = z.object({
  prospectId: z.string().uuid("Invalid prospect ID"),
});

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

    const supabase = createServiceClient();

    // Fetch the prospect
    const { data: prospect, error: fetchError } = await supabase
      .from("prospects")
      .select("id, website_url, business_name")
      .eq("id", parsed.data.prospectId)
      .single();

    if (fetchError || !prospect) {
      return NextResponse.json({ error: "Prospect not found" }, { status: 404 });
    }

    if (!prospect.website_url) {
      return NextResponse.json(
        { error: "This prospect has no website URL to audit" },
        { status: 422 }
      );
    }

    // Normalize URL
    let url = prospect.website_url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    url = url.replace(/\/+$/, "");

    // Fetch the website
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let auditResult;
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

      auditResult = runAudit({
        url,
        html,
        headers,
        statusCode: response.status,
        loadTimeMs,
        pageSize,
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeout);
      const message =
        fetchError instanceof Error && fetchError.name === "AbortError"
          ? "Website took too long to respond"
          : fetchError instanceof Error
            ? fetchError.message
            : "Could not reach website";

      await supabase
        .from("prospects")
        .update({ status: "crawled", crawled_at: new Date().toISOString(), audit_score: 0 })
        .eq("id", prospect.id);

      return NextResponse.json({ error: message, score: 0 }, { status: 200 });
    }

    // Save audit results to prospect
    const { data: updated, error: updateError } = await supabase
      .from("prospects")
      .update({
        status: "crawled",
        audit_score: auditResult.overallScore,
        audit_result_json: auditResult as unknown as Record<string, unknown>,
        crawled_at: new Date().toISOString(),
      })
      .eq("id", prospect.id)
      .select()
      .single();

    if (updateError) {
      console.error("Failed to update prospect audit:", updateError);
      return NextResponse.json({ error: "Failed to save audit results" }, { status: 500 });
    }

    return NextResponse.json({
      score: auditResult.overallScore,
      prospect: updated,
    });
  } catch (err) {
    console.error("OpenClaw crawl error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
