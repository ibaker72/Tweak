import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/service";
import { auditWebsite } from "@/lib/openclaw/audit-runner";

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

    const audit = await auditWebsite(prospect.website_url);

    if (!audit.ok) {
      await supabase
        .from("prospects")
        .update({ status: "crawled", crawled_at: new Date().toISOString(), audit_score: 0 })
        .eq("id", prospect.id);

      return NextResponse.json({ error: audit.error, score: 0 }, { status: 200 });
    }

    const { data: updated, error: updateError } = await supabase
      .from("prospects")
      .update({
        status: "crawled",
        audit_score: audit.score,
        audit_result_json: audit.result as unknown as Record<string, unknown>,
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
      score: audit.score,
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
