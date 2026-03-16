import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServiceClient();

    const { data: auditRequest, error: reqError } = await supabase
      .from("audit_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (reqError || !auditRequest) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 });
    }

    if (auditRequest.status !== "complete") {
      return NextResponse.json({
        id: auditRequest.id,
        url: auditRequest.url,
        status: auditRequest.status,
        error_message: auditRequest.error_message,
      });
    }

    const { data: auditResult, error: resError } = await supabase
      .from("audit_results")
      .select("*")
      .eq("audit_request_id", id)
      .single();

    if (resError || !auditResult) {
      return NextResponse.json({
        id: auditRequest.id,
        url: auditRequest.url,
        status: "error",
        error_message: "Results not found",
      });
    }

    return NextResponse.json({
      id: auditRequest.id,
      url: auditRequest.url,
      status: auditRequest.status,
      result: {
        overallScore: auditResult.overall_score,
        categories: auditResult.categories_json,
        strengths: auditResult.strengths_json,
        issues: auditResult.issues_json,
        quickWins: auditResult.quick_wins_json,
        recommendations: auditResult.recommendations_json,
        biggestOpportunity: auditResult.biggest_opportunity,
        fastestWin: auditResult.fastest_win,
        domain: auditResult.raw_meta_json?.domain,
        scannedAt: auditResult.created_at,
      },
    });
  } catch (error) {
    console.error("Audit fetch error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
