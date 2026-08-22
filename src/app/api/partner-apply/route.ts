import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  sendNotification,
  escapeHtml,
  escapeHtmlMultiline,
} from "@/lib/email/notifications";
import {
  partnerApplicationSchema,
  splitName,
  type PartnerApplicationInput,
} from "@/lib/partners/schema";
import { HONEYPOT_FIELD } from "@/lib/partners/types";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Partner Program application intake.
 *
 * ── ORDERING IS THE WHOLE POINT OF THIS FILE ──
 *
 * The previous implementation sent a Resend email, then created a Loops
 * contact, then console.logged the answers, and never touched the
 * database. A Resend outage threw before Loops ran, the request 500'd,
 * and the application was gone for good.
 *
 * Now: validate → INSERT → (Loops, internal email, confirmation email).
 * Supabase is the source of truth. Once the row exists the applicant is
 * told the submission succeeded, because it did — every downstream
 * integration is best-effort and individually isolated, so none of them
 * can lose an application or turn a saved application into an error.
 *
 * ── LOGGING POLICY ──
 * No applicant PII is ever logged: no name, email, company, website, or
 * free-text answers. Operational lines carry the row UUID only, which is
 * enough to find the record in the admin console.
 */

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://tweakandbuild.com";
}

/* ─── Best-effort integration: Loops ─── */

async function syncToLoops(
  application: PartnerApplicationInput,
  applicationId: string,
): Promise<void> {
  const loopsKey = process.env.LOOPS_API_KEY;
  if (!loopsKey) return;

  const { firstName, lastName } = splitName(application.name);

  try {
    const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loopsKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: application.email,
        firstName,
        lastName,
        source: "partner-application",
        userGroup: "partner-applicant",
        company: application.company ?? "",
        website: application.website ?? "",
      }),
    });

    if (!response.ok) {
      // A duplicate contact is an expected, benign outcome — someone who
      // applies twice, or who already subscribed to the newsletter.
      const payload = await response.json().catch(() => ({}) as { message?: string });
      const message = String(payload?.message ?? "").toLowerCase();
      if (message.includes("already")) return;

      console.error(
        `partner Loops sync failed (${response.status}) for application ${applicationId}`,
      );
    }
  } catch {
    console.error(`partner Loops sync failed for application ${applicationId}`);
  }
}

/* ─── Best-effort integration: internal notification ─── */

async function sendInternalNotification(
  application: PartnerApplicationInput,
  applicationId: string,
  submittedAt: string,
): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL || "hello@tweakandbuild.com";

  // Every applicant-controlled value below is escaped. Nothing reaches
  // the HTML raw.
  const rows: [string, string][] = [
    ["Name", escapeHtml(application.name)],
    ["Email", escapeHtml(application.email)],
    ["Company", application.company ? escapeHtml(application.company) : "—"],
    [
      "Website / LinkedIn",
      application.website
        ? `<a href="${escapeHtml(application.website)}" style="color:#C8FF00">${escapeHtml(application.website)}</a>`
        : "—",
    ],
    ["What they do", escapeHtmlMultiline(application.description)],
    ["How they meet clients", escapeHtmlMultiline(application.howYouMeet)],
    ["Est. referrals / quarter", escapeHtml(application.estimatedReferrals)],
    [
      "Submitted",
      escapeHtml(
        new Date(submittedAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "America/New_York",
        }) + " ET",
      ),
    ],
    ["Application ID", escapeHtml(applicationId)],
  ];

  const body = `
    <table style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr>
               <td style="padding:8px 0;color:#666;width:150px;vertical-align:top;font-size:13px">${label}</td>
               <td style="padding:8px 0;color:#a0a0a0;font-size:13px">${value}</td>
             </tr>`,
        )
        .join("")}
    </table>`;

  try {
    await sendNotification({
      to,
      replyTo: application.email,
      subject: `Partner application — ${application.name}`,
      heading: "New partner application",
      body,
      ctaLabel: "Review application",
      ctaUrl: `${siteUrl()}/admin/partners/${applicationId}`,
    });
  } catch {
    console.error(
      `partner internal notification failed for application ${applicationId}`,
    );
  }
}

/* ─── Best-effort integration: applicant confirmation ─── */

async function sendApplicantConfirmation(
  application: PartnerApplicationInput,
  applicationId: string,
): Promise<void> {
  const { firstName } = splitName(application.name);

  const body = `
    <p style="margin:0 0 14px">Hi ${escapeHtml(firstName || "there")},</p>
    <p style="margin:0 0 14px">
      Thanks for applying to the Tweak &amp; Build Partner Program — we've
      received your application and it's now in the review queue.
    </p>
    <p style="margin:0 0 14px">
      We review every application personally and aim to get back to you
      within about 48 hours. If you're approved we'll follow up with your
      referral link and partner kit.
    </p>
    <p style="margin:0 0 14px">
      There's nothing you need to do in the meantime — just reply to this
      email if you'd like to add anything to your application.
    </p>
    <p style="margin:0">— The Tweak &amp; Build team</p>`;

  try {
    await sendNotification({
      to: application.email,
      replyTo: process.env.CONTACT_TO_EMAIL || "hello@tweakandbuild.com",
      subject: "We received your Tweak & Build Partner application",
      heading: "Application received",
      body,
    });
  } catch {
    console.error(
      `partner confirmation email failed for application ${applicationId}`,
    );
  }
}

/* ─── Route ─── */

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit({
    key: `partner-apply:${ip}`,
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
  });

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }

  // Honeypot, checked before validation so a filled trap never surfaces
  // as a field error that would tell a bot the field exists. Bots get the
  // same shape of response a real submission gets — nothing is written.
  const honeypot = (raw as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.warn("partner application rejected: honeypot");
    return NextResponse.json({ success: true });
  }

  const parsed = partnerApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    // Surface the first message and the field it belongs to so the form
    // can highlight it. Zod messages here are our own copy — no internal
    // paths, stack traces, or schema internals leak to the client.
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: issue?.message || "Please check your answers and try again.",
        field: issue?.path?.[0] ? String(issue.path[0]) : undefined,
      },
      { status: 400 },
    );
  }

  const application = parsed.data;

  /* 1. Durable write — the source of truth. Everything else is optional. */
  let applicationId: string;
  let submittedAt: string;
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("partner_applications")
      .insert({
        full_name: application.name,
        email: application.email,
        company: application.company,
        website: application.website,
        description: application.description,
        how_you_meet: application.howYouMeet,
        estimated_referrals: application.estimatedReferrals,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (error || !data) {
      console.error("partner application insert failed:", error?.message);
      return NextResponse.json(
        {
          error:
            "We couldn't save your application. Please try again in a moment.",
        },
        { status: 500 },
      );
    }

    applicationId = data.id as string;
    submittedAt = (data.created_at as string) ?? new Date().toISOString();
  } catch (err) {
    // Thrown by createServiceClient when env vars are missing, or by a
    // network failure reaching Supabase. Same contract: nothing saved,
    // so the applicant must be told it failed.
    console.error(
      "partner application insert threw:",
      err instanceof Error ? err.message : "unknown error",
    );
    return NextResponse.json(
      { error: "We couldn't save your application. Please try again in a moment." },
      { status: 500 },
    );
  }

  console.log(`partner application saved ${applicationId}`);

  /* 2. The application is durable. From here nothing may fail the request. */
  await syncToLoops(application, applicationId);
  await sendInternalNotification(application, applicationId, submittedAt);
  await sendApplicantConfirmation(application, applicationId);

  return NextResponse.json({ success: true, id: applicationId });
}
