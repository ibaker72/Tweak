import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, source } = body;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  // TODO: Add LOOPS_API_KEY to Vercel Environment Variables (Settings → Environment Variables) before deploying
  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    console.error("LOOPS_API_KEY environment variable is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: source || "website",
        mailingLists: {
          cmmlscebg1ri40izh2lqg7fxj: true,
        },
      }),
    });

    const data = await response.json();

    // Loops returns success, or an error if contact already exists
    // If contact already exists, that's fine — still a success from the user's perspective
    if (response.ok || data.message?.includes("already")) {
      return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 });
    }

    console.error("Loops API error:", data);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 },
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
