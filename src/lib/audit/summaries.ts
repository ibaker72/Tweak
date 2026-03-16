import type { CategoryResult } from "./types";

const templates: Record<string, Record<string, string>> = {
  performance: {
    great: "Your performance fundamentals look strong based on the signals we scanned, with only minor opportunities to tighten things up.",
    good: "Solid performance foundation, but there are clear opportunities to make your site load faster for visitors.",
    okay: "Performance needs attention — several fixable issues are likely making visitors wait too long.",
    poor: "Significant performance gaps are likely causing visitors to leave before your page even finishes loading.",
  },
  seo: {
    great: "Your SEO fundamentals look strong based on the page we scanned, with only minor optimizations remaining.",
    good: "Solid SEO foundation, but some clear opportunities could improve your search visibility further.",
    okay: "SEO needs attention — several fixable gaps are likely costing you search visibility and organic traffic.",
    poor: "Significant SEO gaps are likely keeping your site from reaching potential customers through search.",
  },
  conversion: {
    great: "Your page shows strong conversion readiness based on the elements we detected — just minor tweaks could push results further.",
    good: "Good conversion foundations, but clear opportunities exist to turn more of your traffic into actual inquiries.",
    okay: "Conversion readiness needs attention — your page likely isn't capturing all the leads it could be.",
    poor: "Significant conversion gaps are likely causing most of your visitors to leave without taking any action.",
  },
  trust: {
    great: "Your site shows strong trust signals based on what we scanned — just small additions could strengthen it further.",
    good: "Good trust signals in place, but adding a few more would help visitors feel even more confident reaching out.",
    okay: "Trust-building needs attention — visitors may hesitate to reach out without stronger credibility signals.",
    poor: "Significant trust gaps are likely making visitors question whether they can rely on your business.",
  },
  mobile: {
    great: "Your mobile fundamentals look strong based on the page signals we scanned, with only minor opportunities to tighten things up.",
    good: "Solid mobile foundation, but some improvements would make the experience smoother on smaller screens.",
    okay: "Mobile experience needs attention — visitors on phones are likely hitting friction that hurts engagement.",
    poor: "Significant mobile issues are likely driving away the majority of visitors who browse on their phones.",
  },
  accessibility: {
    great: "Your site is well-structured for accessibility based on our automated checks — just minor improvements to reach even more visitors.",
    good: "Solid accessibility foundations, but addressing a few gaps would make your site more inclusive.",
    okay: "Accessibility needs attention — some visitors may struggle to use your site effectively.",
    poor: "Significant accessibility barriers are likely preventing some visitors from using your site at all.",
  },
};

function getTier(score: number): string {
  if (score >= 80) return "great";
  if (score >= 60) return "good";
  if (score >= 40) return "okay";
  return "poor";
}

export function generateSummary(category: string, result: CategoryResult): string {
  const tier = getTier(result.score);
  const categoryTemplates = templates[category] || templates["performance"];
  let summary = categoryTemplates[tier] || categoryTemplates["okay"];

  // Add specificity from top issue if available
  if (result.issues.length > 0 && tier !== "great") {
    const topIssue = result.issues[0];
    summary += ` Top priority: ${topIssue.title.toLowerCase()}.`;
  }

  return summary;
}
