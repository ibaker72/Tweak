import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/portal/queries";

const VALID_JOBS = ["discover", "outreach", "followup", "geo-generate"] as const;
type Job = (typeof VALID_JOBS)[number];

function isValidJob(value: string): value is Job {
  return (VALID_JOBS as readonly string[]).includes(value);
}

interface RouteParams {
  params: Promise<{ job: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { job } = await params;
  if (!isValidJob(job)) {
    return NextResponse.json({ error: "Unknown job" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await getProfile();
  if (!profile || (profile.role !== "admin" && profile.role !== "team")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/openclaw/cron/${job}`, {
    method: "GET",
    headers: { authorization: `Bearer ${secret}` },
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
