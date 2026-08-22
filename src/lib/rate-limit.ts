import type { NextRequest } from "next/server";

/**
 * Fixed-window in-memory rate limiter.
 *
 * Generalised from the inline limiter in src/app/api/subscribe/route.ts so
 * public form endpoints can share one implementation instead of each
 * growing their own copy.
 *
 * Caveat, stated plainly: state lives in the module scope of a single
 * serverless instance. Vercel runs several instances concurrently and
 * recycles them, so the effective limit is "per instance, per warm
 * period" — this raises the cost of casual spam, it does not make abuse
 * impossible. That is the right trade-off here (no new infrastructure,
 * no external dependency); if partner-form spam ever becomes a real
 * problem the fix is a shared store such as Upstash, and only this file
 * needs to change.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Stops the Map growing without bound on a long-lived instance. */
const MAX_TRACKED_KEYS = 10_000;

export interface RateLimitOptions {
  /** Distinct namespace per endpoint so limits don't bleed together. */
  key: string;
  /** Window length in milliseconds. */
  windowMs: number;
  /** Requests permitted per window. */
  max: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Requests still available in the current window. */
  remaining: number;
}

/**
 * Best-effort client IP from proxy headers.
 * Falls back to a constant so a request without headers is still bucketed
 * (conservatively sharing one bucket) rather than bypassing the limit.
 */
export function getClientIp(request: NextRequest | Request): string {
  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

export function checkRateLimit({
  key,
  windowMs,
  max,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const bucketKey = key;
  const entry = buckets.get(bucketKey);

  if (!entry || now > entry.resetAt) {
    if (buckets.size >= MAX_TRACKED_KEYS) pruneExpired(now);
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: max - entry.count };
}

function pruneExpired(now: number) {
  for (const [k, v] of buckets) {
    if (now > v.resetAt) buckets.delete(k);
  }
  // Everything is still live: drop the oldest-expiring entries so the map
  // cannot grow unbounded under a distributed flood.
  if (buckets.size >= MAX_TRACKED_KEYS) {
    const sorted = [...buckets.entries()].sort(
      (a, b) => a[1].resetAt - b[1].resetAt,
    );
    for (const [k] of sorted.slice(0, Math.floor(MAX_TRACKED_KEYS / 2))) {
      buckets.delete(k);
    }
  }
}

/** Test helper — clears all windows. Not used by application code. */
export function __resetRateLimits() {
  buckets.clear();
}
