/**
 * Google Business Profile post generator.
 *
 * Produces weekly draft posts across rotating categories. Stores drafts in
 * Supabase (`gbp_posts` table) so they can be reviewed and published manually.
 * Mirror copy is also produced for Facebook and LinkedIn.
 */

import { callClaude, hasAnthropicKey, MODEL_FAST, safeJsonParse } from "./openclaw/anthropic";
import { COMPANY_BRIEF } from "./openclaw/prompts";
import { GEO_CITIES, GEO_SERVICES, REGION_NAME } from "./geo-pages";

export type GbpCategory =
  | "seo-tip"
  | "website-tip"
  | "ai-automation-tip"
  | "lead-generation-tip"
  | "client-showcase";

export const GBP_CATEGORIES: GbpCategory[] = [
  "seo-tip",
  "website-tip",
  "ai-automation-tip",
  "lead-generation-tip",
  "client-showcase",
];

export const GBP_CATEGORY_LABELS: Record<GbpCategory, string> = {
  "seo-tip": "SEO tip",
  "website-tip": "Website tip",
  "ai-automation-tip": "AI automation tip",
  "lead-generation-tip": "Lead generation tip",
  "client-showcase": "Client showcase",
};

export interface GbpPostDraft {
  category: GbpCategory;
  /** GBP post body (max 1500 chars; 100-300 is the sweet spot) */
  gbp: string;
  /** Facebook post variant (longer form OK) */
  facebook: string;
  /** LinkedIn post variant (professional voice) */
  linkedin: string;
  /** Suggested CTA button: BOOK | LEARN_MORE | SIGN_UP | CALL | ORDER */
  ctaButton: "BOOK" | "LEARN_MORE" | "SIGN_UP" | "CALL" | "ORDER";
  /** Optional CTA URL (relative path to tweakandbuild.com) */
  ctaUrl: string;
  /** Hashtags for FB/LinkedIn (3-6) */
  hashtags: string[];
}

const GBP_SYSTEM = `${COMPANY_BRIEF}

You write Google Business Profile posts plus mirror copy for Facebook and LinkedIn.
The audience is small-business owners across ${REGION_NAME}.

Rules:
- GBP body MUST be 80-300 characters. No emojis. No ALL CAPS. No hashtags.
- Facebook body MUST be 200-600 characters. Conversational, useful, specific.
- LinkedIn body MUST be 300-800 characters. Professional voice, ends with a question or CTA.
- Always lead with concrete value (a tip, a metric, a customer story).
- Reference specific business types (HVAC, dental, restaurant, dealership, etc.) when relevant.
- Never invent client names, reviews, or rankings.
- Never use spammy phrases ("limited time", "act now", "best in the world").
- Hashtags: 3-6 short tags, lowercase, no spaces. Examples: #northjersey #localseo

Output STRICT JSON only:
{
  "gbp": string,
  "facebook": string,
  "linkedin": string,
  "ctaButton": "BOOK" | "LEARN_MORE" | "SIGN_UP" | "CALL" | "ORDER",
  "ctaUrl": string,
  "hashtags": string[]
}`;

function buildGbpUserPrompt(category: GbpCategory, focusCity?: string): string {
  const cityHint = focusCity
    ? `Today's focus city: ${focusCity}. Mention the local business landscape only if it fits naturally.`
    : "No specific city focus. Write for a general North Jersey small-business owner.";

  const categoryBrief: Record<GbpCategory, string> = {
    "seo-tip":
      "Write a useful local-SEO tip. Make it actionable today (e.g. add primary GBP category, fix NAP, build a service-area page). CTA: LEARN_MORE → /seo. CTA copy directs to the SEO hub.",
    "website-tip":
      "Write a useful website tip — conversion, speed, mobile UX, lead capture. Make it specific enough to act on. CTA: LEARN_MORE → /work or /audit.",
    "ai-automation-tip":
      "Write a useful AI automation tip — e.g. lead-intake bots, review responses, scheduling. Show a concrete workflow. CTA: LEARN_MORE → /services/digital-marketing or /seo/paterson/ai-automation.",
    "lead-generation-tip":
      "Write a lead-generation tip — landing pages, call tracking, follow-up. Reference a concrete tactic. CTA: BOOK → /contact.",
    "client-showcase":
      "Write a generic showcase post — describe the *type* of business and the *type* of result (e.g. 'a Bergen County dental practice doubled new patient form fills'). Do NOT name a real client or invent specific metrics; use clearly generic examples. CTA: BOOK → /contact.",
  };

  return `Category: ${GBP_CATEGORY_LABELS[category]}
${cityHint}

Brief:
${categoryBrief[category]}

Output the JSON now.`;
}

const FALLBACK_DRAFTS: Record<GbpCategory, GbpPostDraft> = {
  "seo-tip": {
    category: "seo-tip",
    gbp: "Local SEO tip: your Google Business Profile categories matter more than your tags. Pick one primary category that exactly matches your top-revenue service, then up to 9 secondary categories. Re-check yours today.",
    facebook:
      "Quick local SEO tip for North Jersey owners: your Google Business Profile primary category is the single biggest ranking lever you have. Pick one that exactly matches your top-revenue service. Then add up to 9 secondary categories for everything else you do. Most businesses we audit are leaving 30-50% of their local visibility on the table because the primary category is too generic. Spend 10 minutes on it today.",
    linkedin:
      "The most common Google Business Profile mistake we see when auditing North Jersey small businesses: the primary category is too generic. \"Restaurant\" instead of \"Italian Restaurant.\" \"Contractor\" instead of \"HVAC Contractor.\" Specificity wins. The primary category is the strongest single ranking lever you have for local search. Match it precisely to your highest-revenue service, then use the 9 secondary slots for everything else. Have you audited yours in the last 90 days?",
    ctaButton: "LEARN_MORE",
    ctaUrl: "/seo",
    hashtags: ["#localseo", "#northjersey", "#smallbusiness", "#googlebusinessprofile"],
  },
  "website-tip": {
    category: "website-tip",
    gbp: "Website tip: your phone number should be tap-to-call on every mobile page. We've seen lead volume jump 20-40% after that single fix. Audit your site on a phone today.",
    facebook:
      "If your business website isn't tap-to-call on mobile, you're losing leads. 70%+ of local searches happen on a phone, and customers expect a single tap to dial — not a copy-and-paste. The fix takes 5 minutes. The lift is often 20-40% on call volume. Try it on your phone today and see what your customers see.",
    linkedin:
      "Spending the afternoon auditing North Jersey small-business websites again, and the same issue keeps showing up: the phone number is text, not a tap-to-call link. On mobile, that's the difference between a one-tap call and a copy-paste-paste-dial sequence that most users abandon. The fix is two lines of code. The lift is consistently 20-40% on call volume. Audit your site on a phone today.",
    ctaButton: "LEARN_MORE",
    ctaUrl: "/audit",
    hashtags: ["#webdesign", "#mobilefriendly", "#smallbusiness", "#northjersey"],
  },
  "ai-automation-tip": {
    category: "ai-automation-tip",
    gbp: "AI automation tip: pipe every website form submission into a Claude or GPT classifier. It tags urgency, sentiment, and intent so your team replies to hot leads first. Setup takes an afternoon.",
    facebook:
      "Most small-business inboxes are a graveyard of unanswered website leads. One simple AI workflow fixes that: pipe every form submission through a Claude or GPT classifier, tag urgency + intent + sentiment, and route hot leads to the top of your inbox. Setup is an afternoon. The ROI shows up in the first week as faster responses on the leads that actually buy.",
    linkedin:
      "Underrated AI automation for North Jersey service businesses: lead triage at the form-submission level. Every website form goes through a Claude or GPT classifier that tags urgency, intent, and sentiment in seconds. Hot leads get routed to the top. Cold leads get a nurture sequence. The owner stops spending 2 hours a day sorting their inbox. Setup is an afternoon and the lift is immediate — measured in faster response times and higher close rates on the leads that actually buy.",
    ctaButton: "LEARN_MORE",
    ctaUrl: "/seo/paterson/ai-automation",
    hashtags: ["#aiautomation", "#smallbusiness", "#leadgen", "#northjersey"],
  },
  "lead-generation-tip": {
    category: "lead-generation-tip",
    gbp: "Lead gen tip: shorten your contact form. Every extra field cuts conversion 5-10%. Most local businesses only need name, phone, service, and timing. Test it this week.",
    facebook:
      "Quickest local lead-gen win we see at North Jersey small businesses: shorten the contact form. Every field after the third cuts conversion 5-10%. Most service businesses really only need name, phone, the service they want, and the timing. Everything else can come in the call. Test a shorter form against your current one for two weeks and watch what happens.",
    linkedin:
      "When we audit local-service websites, the contact form is almost always the biggest conversion leak. Every field past the third costs 5-10% conversion. The mental model: the form's only job is to start a conversation. Get the name, the phone, the service, and the timing. Everything else — budget, address, project details — comes in the call. Test a shorter form against your current one for two weeks and let the data decide.",
    ctaButton: "BOOK",
    ctaUrl: "/contact",
    hashtags: ["#leadgeneration", "#conversion", "#smallbusiness", "#northjersey"],
  },
  "client-showcase": {
    category: "client-showcase",
    gbp: "We helped a Bergen County professional-services client rebuild their site for mobile-first speed and clearer lead capture. New site loads in under 2s and converts more form submissions. Same fix is available for your business.",
    facebook:
      "Recent project: a Bergen County professional-services firm came to us with a 6-second mobile load and a contact page buried two clicks deep. We rebuilt it on Next.js with a single clear lead-capture path, sub-2s mobile load, and proper local SEO structure. Result: more form fills from the same ad spend. Same playbook is available for your North Jersey business.",
    linkedin:
      "Recent build: a Bergen County professional-services firm came to us with a 6-second mobile load and a contact form buried two clicks deep on the home page. We rebuilt on Next.js with: a single clear lead-capture path on every page, sub-2s mobile load, proper LocalBusiness schema, and Google Business Profile alignment. The result was more form fills from the same ad spend within the first 30 days. Most North Jersey small-business sites have the same fixable issues.",
    ctaButton: "BOOK",
    ctaUrl: "/contact",
    hashtags: ["#webdesign", "#caseStudy", "#smallbusiness", "#northjersey"],
  },
};

/**
 * Generate a single GBP post draft. Falls back to a curated default when no
 * Anthropic key is configured, so the cron job stays robust.
 */
export async function generateGbpDraft(
  category: GbpCategory,
  focusCity?: string,
): Promise<GbpPostDraft> {
  if (!hasAnthropicKey()) {
    return FALLBACK_DRAFTS[category];
  }

  try {
    const { text } = await callClaude({
      model: MODEL_FAST,
      systemCached: GBP_SYSTEM,
      user: buildGbpUserPrompt(category, focusCity),
      maxTokens: 800,
      temperature: 0.7,
    });
    const parsed = safeJsonParse<Omit<GbpPostDraft, "category">>(text);
    if (parsed && parsed.gbp && parsed.facebook && parsed.linkedin) {
      return { category, ...parsed };
    }
  } catch (err) {
    // Fall through to fallback
    console.error("[gbp-post-generator] LLM failed:", err);
  }
  return FALLBACK_DRAFTS[category];
}

/** Pick a city to feature this week (deterministic by ISO week). */
export function pickFocusCity(now: Date = new Date()): string {
  const start = new Date(now.getUTCFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  const week = Math.ceil((days + start.getUTCDay() + 1) / 7);
  return GEO_CITIES[week % GEO_CITIES.length].name;
}

/** Pick this week's category in a round-robin so all categories rotate. */
export function pickCategoryForWeek(now: Date = new Date()): GbpCategory {
  const start = new Date(now.getUTCFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  const week = Math.ceil((days + start.getUTCDay() + 1) / 7);
  return GBP_CATEGORIES[week % GBP_CATEGORIES.length];
}

/** Pick the top related service for this week's focus city (for the CTA URL). */
export function relatedServiceUrlForCategory(category: GbpCategory): string {
  switch (category) {
    case "seo-tip":
      return "/seo/paterson/local-seo";
    case "website-tip":
      return "/seo/paterson/web-design";
    case "ai-automation-tip":
      return "/seo/paterson/ai-automation";
    case "lead-generation-tip":
      return "/seo/paterson/lead-generation";
    case "client-showcase":
      return "/work";
  }
}

/** Total number of services × categories pairings (for analytics). */
export function expansionMatrixSize(): number {
  return GEO_CITIES.length * GEO_SERVICES.length;
}
