import type { AuditResult, FindingItem } from "./types";

const rewriteMap: Record<string, string> = {
  "Missing page title": "Craft a keyword-rich homepage title to improve click-through rates from search results",
  "Missing meta description": "Rewrite homepage metadata to improve search engine click-through rates",
  "No clear call-to-action above the fold": "Restructure homepage hero section for immediate conversion clarity",
  "No visible contact method": "Add prominent contact options so prospects can reach you instantly",
  "No testimonials or reviews visible": "Showcase 3-5 client testimonials to build immediate visitor confidence",
  "No structured data found": "Implement Schema.org markup to earn rich search result snippets",
  "No structured data detected": "Implement Schema.org markup to earn rich search result snippets",
  "No mobile viewport configuration": "Configure mobile viewport for a professional phone experience",
  "No responsive design indicators found": "Implement responsive design so your site works on every screen size",
  "No responsive design indicators detected": "Implement responsive design so your site works on every screen size",
  "Most images missing alternative text": "Add descriptive image alt text to boost SEO and accessibility",
  "Site is not using HTTPS": "Migrate to HTTPS to remove browser security warnings and boost search rankings",
  "No lazy loading on images": "Implement image lazy loading to cut initial page load time in half",
  "No compression enabled": "Enable server-side compression to dramatically reduce download times",
  "Very slow response time": "Investigate and resolve server performance bottlenecks to reduce load time",
  "Slow response time": "Optimize server response time to keep visitors engaged",
  "No visible social proof": "Add social proof elements near key conversion points",
  "No visible social proof detected": "Add social proof elements near key conversion points",
  "No physical address found": "Display business location details to strengthen local trust and SEO",
  "No visible business address detected": "Display business location details to strengthen local trust and SEO",
  "Form fields without labels": "Add proper labels to all form fields for accessibility and usability",
  "Large page size": "Audit and reduce page weight for faster load times",
  "No privacy policy link found": "Add privacy policy link to meet compliance requirements and build trust",
  "Too many external scripts": "Consolidate and defer third-party scripts to improve page speed",
  "Weak or missing value proposition": "Clarify your value proposition in the hero section to immediately communicate your offer",
};

function rewriteAsRecommendation(issue: FindingItem): string {
  return rewriteMap[issue.title] || `Address: ${issue.title.toLowerCase()} to improve ${issue.category} performance`;
}

// ── Theme clustering ──
// Issues that share a root theme get collapsed into one stronger recommendation.
// Each cluster maps keyword patterns → a single curated recommendation string.
const themeClusters: { keywords: string[]; recommendation: string }[] = [
  {
    keywords: ["alt text", "alternative text", "image alt", "descriptive image"],
    recommendation: "Add descriptive alt text to all images — this single fix improves both SEO indexing and accessibility",
  },
  {
    keywords: ["lazy loading", "image dimensions", "images missing explicit dimensions", "images may not scale", "responsive image"],
    recommendation: "Optimize image loading and rendering with lazy loading, explicit dimensions, and responsive sizing",
  },
  {
    keywords: ["meta description", "page title", "structured data", "schema", "metadata"],
    recommendation: "Strengthen search visibility fundamentals — craft compelling title/description tags and add structured data",
  },
  {
    keywords: ["testimonial", "social proof", "reviews", "client"],
    recommendation: "Add client testimonials and social proof to build visitor confidence at key decision points",
  },
  {
    keywords: ["mobile viewport", "responsive design", "fixed-width", "small text"],
    recommendation: "Fix mobile experience gaps so your site works flawlessly on every screen size",
  },
  {
    keywords: ["compression", "page size", "external scripts", "script"],
    recommendation: "Reduce page weight by enabling compression, consolidating scripts, and trimming unnecessary assets",
  },
  {
    keywords: ["contact method", "phone number", "email", "contact form", "address"],
    recommendation: "Make it effortless for prospects to reach you — add prominent contact options and business details",
  },
  {
    keywords: ["privacy policy", "trust badge", "certification", "about page"],
    recommendation: "Strengthen trust signals with a privacy policy link, about page, and relevant credentials",
  },
];

function getThemeKey(issue: FindingItem): string | null {
  const text = (issue.title + " " + issue.description).toLowerCase();
  for (let i = 0; i < themeClusters.length; i++) {
    if (themeClusters[i].keywords.some((kw) => text.includes(kw))) {
      return String(i);
    }
  }
  return null;
}

const categoryLabels: Record<string, string> = {
  performance: "site speed and performance",
  seo: "search engine visibility",
  conversion: "lead generation and conversion",
  trust: "visitor trust and credibility",
  mobile: "mobile user experience",
  accessibility: "site accessibility",
};

const weights: Record<string, number> = {
  performance: 0.2,
  seo: 0.2,
  conversion: 0.2,
  trust: 0.15,
  mobile: 0.15,
  accessibility: 0.1,
};

const severityOrder: Record<string, number> = {
  critical: 0,
  important: 1,
  minor: 2,
  positive: 3,
};

export function generateRecommendations(result: AuditResult): {
  recommendations: string[];
  biggestOpportunity: string;
  fastestWin: string;
} {
  // Collect all issues and sort by severity then category weight
  const allIssues: (FindingItem & { weight: number })[] = [];

  for (const [key, cat] of Object.entries(result.categories)) {
    for (const issue of cat.issues) {
      allIssues.push({ ...issue, weight: weights[key] || 0.1 });
    }
  }

  allIssues.sort((a, b) => {
    const sevDiff = (severityOrder[a.severity] ?? 2) - (severityOrder[b.severity] ?? 2);
    if (sevDiff !== 0) return sevDiff;
    return b.weight - a.weight;
  });

  // Pick top 3-5 recommendations, clustering related issues into one item
  const seenThemes = new Set<string>();
  const seenTexts = new Set<string>();
  const recommendations: string[] = [];

  for (const issue of allIssues) {
    if (recommendations.length >= 5) break;

    const themeKey = getThemeKey(issue);

    if (themeKey !== null) {
      // This issue belongs to a theme cluster — use the cluster recommendation
      if (seenThemes.has(themeKey)) continue; // already represented
      seenThemes.add(themeKey);
      const clusterRec = themeClusters[Number(themeKey)].recommendation;
      if (!seenTexts.has(clusterRec)) {
        seenTexts.add(clusterRec);
        recommendations.push(clusterRec);
      }
    } else {
      // Standalone issue — use the rewrite map
      const rec = rewriteAsRecommendation(issue);
      if (!seenTexts.has(rec)) {
        seenTexts.add(rec);
        recommendations.push(rec);
      }
    }
  }

  // Biggest opportunity = lowest-scoring category
  const catEntries = Object.entries(result.categories) as [string, { score: number }][];
  catEntries.sort((a, b) => a[1].score - b[1].score);
  const lowestCat = catEntries[0];
  const biggestOpportunity = lowestCat
    ? `Your biggest opportunity is improving ${categoryLabels[lowestCat[0]] || lowestCat[0]} — currently your weakest area at ${lowestCat[1].score}/100.`
    : "Focus on addressing the critical issues identified above for the greatest impact.";

  // Fastest win = highest-severity quick-effort item
  const quickItems = allIssues.filter((i) => i.effort === "quick");
  const fastestWin = quickItems.length > 0
    ? rewriteAsRecommendation(quickItems[0])
    : recommendations[0] || "Review the findings above and start with the critical items.";

  return { recommendations, biggestOpportunity, fastestWin };
}
