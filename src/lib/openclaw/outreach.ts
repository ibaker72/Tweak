import { callClaude, safeJsonParse, MODEL_DRAFT } from "./anthropic";
import {
  COMPANY_BRIEF,
  OUTREACH_RULES,
  buildInitialOutreachUser,
  buildFollowupUser,
  type OutreachAuditContext,
} from "./prompts";
import type { Prospect } from "./types";
import type { AuditResult, FindingItem } from "@/lib/audit/types";

const SITE_URL = "https://www.tweakandbuild.com";
const FROM_ADDRESS = "Ian @ Tweak & Build <ian@tweakandbuild.com>";
const REPLY_TO = "ian@tweakandbuild.com";

export interface DraftedEmail {
  subject: string;
  body: string;
}

export function prospectToContext(p: Prospect): OutreachAuditContext | null {
  if (!p.website_url) return null;
  const audit = p.audit_result_json as Partial<AuditResult> | null;
  const weaknesses: FindingItem[] = (audit?.topWeaknesses as FindingItem[]) || [];
  return {
    businessName: p.business_name,
    industry: p.industry,
    city: p.city,
    state: p.state,
    websiteUrl: p.website_url,
    auditScore: p.audit_score,
    topWeaknesses: weaknesses.slice(0, 3).map((w) => ({
      title: w.title,
      description: w.description,
      severity: w.severity,
    })),
    biggestOpportunity: audit?.biggestOpportunity,
    fastestWin: audit?.fastestWin,
  };
}

export async function draftInitialEmail(ctx: OutreachAuditContext): Promise<DraftedEmail> {
  return draftWithPrompt(buildInitialOutreachUser(ctx));
}

export async function draftFollowupEmail(
  ctx: OutreachAuditContext,
  step: 1 | 2
): Promise<DraftedEmail> {
  return draftWithPrompt(buildFollowupUser(ctx, step));
}

async function draftWithPrompt(userPrompt: string): Promise<DraftedEmail> {
  const { text } = await callClaude({
    model: MODEL_DRAFT,
    systemCached: `${COMPANY_BRIEF}\n\n${OUTREACH_RULES}`,
    user: userPrompt,
    maxTokens: 600,
    temperature: 0.6,
  });

  const parsed = safeJsonParse<{ subject?: string; body?: string }>(text);
  if (!parsed || !parsed.subject || !parsed.body) {
    throw new Error(`Claude returned invalid email JSON: ${text.slice(0, 200)}`);
  }
  return { subject: parsed.subject.trim(), body: parsed.body.trim() };
}

export function renderEmailHtml(body: string, prospectEmail: string): string {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px;line-height:1.55;color:#1a1a1a">${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
    .join("");
  const unsubUrl = `${SITE_URL}/api/openclaw/unsubscribe?email=${encodeURIComponent(prospectEmail)}`;
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fff;color:#1a1a1a">
<div style="max-width:560px;margin:0 auto;padding:24px 8px;font-size:15px">
${paragraphs}
<div style="margin-top:32px;padding-top:16px;border-top:1px solid #eee;font-size:11px;color:#888">
Tweak &amp; Build · Web design + dev for local business<br/>
<a href="${unsubUrl}" style="color:#888">Unsubscribe</a>
</div>
</div></body></html>`;
}

export function renderEmailText(body: string, prospectEmail: string): string {
  const unsubUrl = `${SITE_URL}/api/openclaw/unsubscribe?email=${encodeURIComponent(prospectEmail)}`;
  return `${body}\n\n--\nTweak & Build\nUnsubscribe: ${unsubUrl}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface SendResult {
  ok: boolean;
  id?: string;
  error?: string;
}

export async function sendOutreachEmail(opts: {
  to: string;
  subject: string;
  body: string;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "re_xxxxxxxxxxxx") {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);

    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      replyTo: REPLY_TO,
      to: [opts.to],
      subject: opts.subject,
      html: renderEmailHtml(opts.body, opts.to),
      text: renderEmailText(opts.body, opts.to),
      headers: {
        "List-Unsubscribe": `<${SITE_URL}/api/openclaw/unsubscribe?email=${encodeURIComponent(opts.to)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    if (result.error) {
      return { ok: false, error: result.error.message };
    }
    return { ok: true, id: result.data?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "send failed" };
  }
}
