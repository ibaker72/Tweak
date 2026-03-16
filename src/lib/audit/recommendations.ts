import type { AuditResult, FindingItem } from "./types";

const rewriteMap: Record<string, string> = {
  "Missing page title": "Craft a keyword-rich homepage title to improve click-through rates from search results",
  "Missing meta description": "Rewrite homepage metadata to improve search engine click-through rates",
  "No clear call-to-action above the fold": "Restructure homepage hero section for immediate conversion clarity",
  "No visible contact method": "Add prominent contact options so prospects can reach you instantly",
  "No testimonials or reviews visible": "Showcase 3-5 client testimonials to build immediate visitor confidence",
  "No structured data found": "Implement Schema.org markup to earn rich search result snippets",
  "No mobile viewport configuration": "Configure mobile viewport for a professional phone experience",
  "No responsive design indicators found": "Implement responsive design so your site works on every screen size",
  "Most images missing alternative text": "Add descriptive image alt text to boost SEO and accessibility",
  "Site is not using HTTPS": "Migrate to HTTPS to remove browser security warnings and boost search rankings",
  "No lazy loading on images": "Implement image lazy loading to cut initial page load time in half",
  "No compression enabled": "Enable server-side compression to dramatically reduce download times",
  "Very slow response time": "Investigate and resolve server performance bottlenecks to reduce load time",
  "Slow response time": "Optimize server response time to keep visitors engaged",
  "No visible social proof": "Add social proof elements near key conversion points",
  "No physical address found": "Display business location details to strengthen local trust and SEO",
  "Form fields without labels": "Add proper labels to all form fields for accessibility and usability",
  "Large page size": "Audit and reduce page weight for faster load times",
  "No privacy policy link found": "Add privacy policy link to meet compliance requirements and build trust",
  "Too many external scripts": "Consolidate and defer third-party scripts to improve page speed",
  "Weak or missing value proposition": "Clarify your value proposition in the hero section to immediately communicate your offer",
};

function rewriteAsRecommendation(issue: FindingItem): string {
  return rewriteMap[issue.title] || `Address: ${issue.title.toLowerCase()} to improve ${issue.category} performance`;
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

  // Pick top 3-5 for recommendations
  const seen = new Set<string>();
  const recommendations: string[] = [];
  for (const issue of allIssues) {
    const rec = rewriteAsRecommendation(issue);
    if (!seen.has(rec)) {
      seen.add(rec);
      recommendations.push(rec);
    }
    if (recommendations.length >= 5) break;
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
