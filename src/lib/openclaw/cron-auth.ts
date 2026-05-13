import type { NextRequest } from "next/server";

/**
 * Vercel cron requests include `Authorization: Bearer <CRON_SECRET>`.
 * Admin-triggered manual runs from the UI pass the same secret via x-cron-secret.
 */
export function isAuthorizedCron(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;

  const x = request.headers.get("x-cron-secret");
  if (x === secret) return true;

  return false;
}
