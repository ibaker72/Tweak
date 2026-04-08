import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const industry = searchParams.get("industry");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");

    const supabase = createServiceClient();

    let query = supabase
      .from("prospects")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (industry && industry !== "all") {
      query = query.eq("industry", industry);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Failed to fetch prospects:", error);
      return NextResponse.json({ error: "Failed to fetch prospects" }, { status: 500 });
    }

    return NextResponse.json({ prospects: data ?? [], total: count ?? 0 });
  } catch (err) {
    console.error("Prospects list error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
