import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

  const subscriber = {
    email,
    source: source || "unknown",
    subscribedAt: new Date().toISOString(),
  };

  // TODO: Replace with Mailchimp, ConvertKit, or Resend integration
  // For now, store in a local JSON file
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "subscribers.json");

  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let subscribers: typeof subscriber[] = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      subscribers = JSON.parse(raw);
    }

    // Check for duplicate
    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 });
    }

    subscribers.push(subscriber);
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
  } catch (err) {
    console.error("Failed to save subscriber:", err);
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }

  return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 });
}
