import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const source = body.source || "website";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const loopsApiKey = process.env.LOOPS_API_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tweakandbuild.com";

  if (!loopsApiKey) {
    console.error("LOOPS_API_KEY environment variable is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  if (!resendApiKey) {
    console.error("RESEND_API_KEY environment variable is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const checklistUrl = `${baseUrl}/website-launch-checklist.pdf`;

  try {
    // 1) Add to Loops
    const loopsResponse = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loopsApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source,
        mailingLists: {
          cmmlscebg1ri40izh2lqg7fxj: true,
        },
      }),
    });

    const loopsData = await loopsResponse.json().catch(() => ({}));

    const loopsOk =
      loopsResponse.ok || String(loopsData?.message || "").toLowerCase().includes("already");

    if (!loopsOk) {
      console.error("Loops API error:", loopsData);
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 500 }
      );
    }

    // 2) Send checklist email with Resend
    const resendResult = await resend.emails.send({
      from: "Tweak & Build <portal@updates.tweakandbuild.com>",
      to: email,
      subject: "Your Website Launch Checklist",
      replyTo: "hello@tweakandbuild.com",
      html: `
        <div style="font-family: Arial, sans-serif; background:#0b0d12; color:#f5f7fb; padding:32px;">
          <div style="max-width:600px; margin:0 auto; background:#11141b; border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:32px;">
            <p style="margin:0 0 8px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#c8ff1a;">
              Free Guide
            </p>

            <h1 style="margin:0 0 16px; font-size:28px; line-height:1.2; color:#ffffff;">
              Here’s your Website Launch Checklist
            </h1>

            <p style="margin:0 0 20px; font-size:16px; line-height:1.7; color:#c9d0dc;">
              Thanks for grabbing it. Here’s your checklist with 27 things to verify before going live.
            </p>

            <p style="margin:24px 0;">
              <a href="${checklistUrl}" style="display:inline-block; background:#c8ff1a; color:#0b0d12; text-decoration:none; font-weight:700; padding:14px 22px; border-radius:999px;">
                Download the Checklist
              </a>
            </p>

            <p style="margin:24px 0 0; font-size:14px; line-height:1.7; color:#98a2b3;">
              It covers launch-readiness across SEO, performance, accessibility, and security.
            </p>

            <p style="margin:20px 0 0; font-size:14px; color:#ffffff;">
              — Tweak & Build
            </p>
          </div>
        </div>
      `,
    });

    if ((resendResult as any)?.error) {
      console.error("Resend error:", (resendResult as any).error);
      return NextResponse.json(
        { error: "Subscribed, but email delivery failed." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}