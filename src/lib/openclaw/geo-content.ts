import { callClaude, safeJsonParse, MODEL_DRAFT } from "./anthropic";
import { GEO_CONTENT_SYSTEM, buildGeoContentUser } from "./prompts";
import { metroSlug, SEED_INDUSTRIES, SEED_METROS } from "./seeds";
import { INDUSTRY_LABELS, type ProspectIndustry } from "./types";

export interface GeoPageContent {
  h1: string;
  lede: string;
  valueProps: Array<{ title: string; body: string }>;
  localProof: string;
  faqs: Array<{ q: string; a: string }>;
  ctaHeadline: string;
}

export function geoSlug(city: string, state: string, industry: ProspectIndustry): string {
  return `${metroSlug(city, state)}-${industry}`;
}

export function allGeoSlugs(): Array<{
  slug: string;
  city: string;
  state: string;
  industry: ProspectIndustry;
}> {
  const out: Array<{ slug: string; city: string; state: string; industry: ProspectIndustry }> = [];
  for (const m of SEED_METROS) {
    for (const ind of SEED_INDUSTRIES) {
      out.push({ slug: geoSlug(m.city, m.state, ind), city: m.city, state: m.state, industry: ind });
    }
  }
  return out;
}

export async function generateGeoContent(
  city: string,
  state: string,
  industry: ProspectIndustry
): Promise<GeoPageContent> {
  const { text } = await callClaude({
    model: MODEL_DRAFT,
    systemCached: GEO_CONTENT_SYSTEM,
    user: buildGeoContentUser(city, state, industry),
    maxTokens: 2000,
    temperature: 0.5,
  });

  const parsed = safeJsonParse<GeoPageContent>(text);
  if (!parsed) {
    throw new Error(`GEO content JSON parse failed: ${text.slice(0, 200)}`);
  }
  return parsed;
}

// Fallback content used when no LLM-generated content is cached yet.
export function fallbackGeoContent(
  city: string,
  state: string,
  industry: ProspectIndustry
): GeoPageContent {
  const label = INDUSTRY_LABELS[industry];
  return {
    h1: `${label} Websites in ${city}, ${state}`,
    lede: `Tweak & Build designs and builds high-converting websites for ${label.toLowerCase()} in ${city} and across ${state}. Fast, modern, lead-focused.`,
    valueProps: [
      { title: "Built for conversion", body: "Every section is engineered to turn visitors into leads or booked calls." },
      { title: "Lightning-fast", body: "90+ Lighthouse scores. No bloated themes, no slow plugins." },
      { title: "SEO + GEO ready", body: "Optimized for Google and for being cited by AI assistants like ChatGPT." },
      { title: "Done in weeks", body: "Most sites launch in 3-6 weeks, not 3-6 months." },
    ],
    localProof: `We work with ${label.toLowerCase()} across the ${city} ${state} metro and surrounding regions. Local market context, real measurable lift.`,
    faqs: [
      {
        q: `How much does a ${label.toLowerCase()} website cost in ${city}?`,
        a: `Most projects fall between $4,500 and $18,000 depending on pages, integrations, and CMS needs. We send a fixed quote within 24 hours.`,
      },
      {
        q: `How long does it take to launch?`,
        a: `Typical timeline is 3-6 weeks from kickoff to launch. Faster paths exist for landing pages or full rebuilds with ready content.`,
      },
      {
        q: `Do you handle SEO for ${city}-area ${label.toLowerCase()}?`,
        a: `Yes. Local schema, Google Business Profile alignment, location pages, and AI-citation-ready content are built in.`,
      },
      {
        q: `What stack do you build on?`,
        a: `Next.js + React + Tailwind on Vercel by default. We also support Webflow and Framer when a client team needs visual editing.`,
      },
      {
        q: `Can you redesign without rebuilding everything?`,
        a: `Yes. We offer a focused "Tweak" engagement when only specific pages or flows need rework.`,
      },
      {
        q: `What happens after launch?`,
        a: `Optional retainer for updates, A/B tests, and ongoing SEO. Or hand-off documentation if you want full ownership.`,
      },
    ],
    ctaHeadline: `Want a free 10-minute teardown of your ${city} site?`,
  };
}
