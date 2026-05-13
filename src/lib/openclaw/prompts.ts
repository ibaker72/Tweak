import { INDUSTRY_LABELS, type ProspectIndustry } from "./types";

export const COMPANY_BRIEF = `You are writing on behalf of Tweak & Build (tweakandbuild.com), a senior web design + development studio.
- We rebuild conversion-focused websites for local businesses: dealerships, insurance agencies, service businesses (HVAC, plumbing, electrical, cleaning).
- Strengths: speed (90+ Lighthouse), modern stack (Next.js, React, Tailwind), conversion-focused UX, SEO/GEO ready.
- We've delivered measurable lift for clients in these industries; tone is direct, confident, low-pressure, never spammy.
- Outreach is short, specific, and references concrete weaknesses we found on their current site.`;

export const OUTREACH_RULES = `Outreach rules — non-negotiable:
1. Subject line MUST be under 60 chars. No clickbait. No emojis. No ALL CAPS.
2. Email body MUST be under 110 words. Plain text feel. No marketing fluff.
3. Open with one concrete observation about THEIR site — referenced from the audit findings provided. Never generic.
4. Mention ONE specific issue + the business impact (lost leads, slower load, missing trust signal). Quantify when possible.
5. Soft CTA: offer a free 10-minute teardown call or a written report. Never demand.
6. Sign as "Ian @ Tweak & Build". Include this exact P.S. line: "P.S. Reply STOP and I won't email again."
7. Output STRICT JSON only: { "subject": string, "body": string }. No prose around the JSON.`;

export interface OutreachAuditContext {
  businessName: string;
  industry: ProspectIndustry;
  city: string | null;
  state: string | null;
  websiteUrl: string;
  auditScore: number | null;
  topWeaknesses: Array<{ title: string; description: string; severity: string }>;
  biggestOpportunity?: string;
  fastestWin?: string;
}

export function buildInitialOutreachUser(ctx: OutreachAuditContext): string {
  const location = [ctx.city, ctx.state].filter(Boolean).join(", ") || "their area";
  const weaknesses = ctx.topWeaknesses
    .slice(0, 3)
    .map((w, i) => `${i + 1}. ${w.title} — ${w.description}`)
    .join("\n");

  return `Write an initial cold outreach email to a prospect.

Prospect:
- Business: ${ctx.businessName}
- Industry: ${INDUSTRY_LABELS[ctx.industry]}
- Location: ${location}
- Website: ${ctx.websiteUrl}
- Audit score: ${ctx.auditScore ?? "n/a"}/100

Top weaknesses found on their site:
${weaknesses || "- (no specific weaknesses captured)"}

${ctx.biggestOpportunity ? `Biggest opportunity: ${ctx.biggestOpportunity}` : ""}
${ctx.fastestWin ? `Fastest win: ${ctx.fastestWin}` : ""}

Generate the email JSON now.`;
}

export function buildFollowupUser(ctx: OutreachAuditContext, step: 1 | 2): string {
  const note =
    step === 1
      ? "This is follow-up #1 (no reply after 3 days). Keep it shorter. Add ONE more specific observation. Same P.S."
      : "This is follow-up #2 (no reply after 7 more days). 2-3 sentences max. Final touch — gracefully close the loop. Same P.S.";

  const weakness = ctx.topWeaknesses[step] || ctx.topWeaknesses[0];

  return `${note}

Prospect: ${ctx.businessName} (${ctx.websiteUrl}, score ${ctx.auditScore ?? "n/a"}/100)
Reference this weakness: ${weakness ? `${weakness.title} — ${weakness.description}` : "n/a"}

Output JSON only: { "subject": string, "body": string }.`;
}

// ----- GEO landing-page content -----

export const GEO_CONTENT_SYSTEM = `${COMPANY_BRIEF}

You write content for programmatic SEO + GEO (generative engine optimization) landing pages.
- Each page targets one city + one industry (e.g. "Austin TX dealership websites").
- Optimize for being CITED by AI assistants (ChatGPT, Claude, Perplexity, Google AI Overviews) and ranking in classic search.
- Structure content so each section answers a discrete question with a clean, quotable sentence.
- Use specific, verifiable claims. No fluff like "best-in-class" or "cutting-edge".
- Output STRICT JSON only with this exact shape:
{
  "h1": string (under 70 chars),
  "lede": string (1-2 sentences, under 240 chars),
  "valueProps": [{ "title": string, "body": string (60-120 chars) }] (exactly 4),
  "localProof": string (2-3 sentences referencing the city/state generically without inventing client names),
  "faqs": [{ "q": string, "a": string (60-180 chars) }] (exactly 6),
  "ctaHeadline": string (under 70 chars)
}`;

export function buildGeoContentUser(city: string, state: string, industry: ProspectIndustry): string {
  return `Generate landing page content for: ${INDUSTRY_LABELS[industry]} in ${city}, ${state}.

Industry hints:
- dealerships: inventory pages, VIN-level SEO, lead form conversion, trust badges, mobile speed
- insurance: quote forms, license/credentials trust, agent bios, calls vs forms
- service-businesses: emergency CTA, service-area pages, reviews, click-to-call, booking

Audience: business owners + marketing leads. Tone: direct, confident, specific.
FAQ questions should match real searcher intent (e.g. "How much does a ${INDUSTRY_LABELS[industry]} website cost in ${city}?").

Output JSON now.`;
}

// ----- Reply classification -----

export const REPLY_CLASSIFY_SYSTEM = `You classify inbound email replies to a cold outreach sequence.
Output STRICT JSON: { "intent": "interested" | "not_interested" | "unsubscribe" | "out_of_office" | "wrong_person" | "question" | "other", "confidence": number (0-1), "next_action": "schedule_call" | "send_info" | "stop_sequence" | "manual_review" | "ignore", "summary": string (under 140 chars) }`;

export function buildReplyClassifyUser(replyBody: string): string {
  return `Classify this reply (truncate at 2000 chars):\n\n${replyBody.slice(0, 2000)}`;
}
