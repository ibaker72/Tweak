import type { AuditInput, AuditResult, FindingItem } from "./types";
import { analyzePerformance } from "./performance";
import { analyzeSEO } from "./seo";
import { analyzeConversion } from "./conversion";
import { analyzeTrust } from "./trust";
import { analyzeMobile } from "./mobile";
import { analyzeAccessibility } from "./accessibility";
import { generateSummary } from "./summaries";
import { generateRecommendations } from "./recommendations";

const WEIGHTS = {
  performance: 0.2,
  seo: 0.2,
  conversion: 0.2,
  trust: 0.15,
  mobile: 0.15,
  accessibility: 0.1,
};

export function runAudit(input: AuditInput): AuditResult {
  const url = input.url;
  let domain: string;
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    domain = url;
  }

  // Run all analyzers
  const performance = analyzePerformance(input);
  const seo = analyzeSEO(input);
  const conversion = analyzeConversion(input);
  const trust = analyzeTrust(input);
  const mobile = analyzeMobile(input);
  const accessibility = analyzeAccessibility(input);

  const categories = { performance, seo, conversion, trust, mobile, accessibility };

  // Generate summaries
  for (const [key, cat] of Object.entries(categories)) {
    cat.summary = generateSummary(key, cat);
  }

  // Weighted overall score
  const overallScore = Math.round(
    performance.score * WEIGHTS.performance +
    seo.score * WEIGHTS.seo +
    conversion.score * WEIGHTS.conversion +
    trust.score * WEIGHTS.trust +
    mobile.score * WEIGHTS.mobile +
    accessibility.score * WEIGHTS.accessibility
  );

  // Compile top strengths, weaknesses, quick wins
  const allStrengths: FindingItem[] = [];
  const allIssues: FindingItem[] = [];
  const allQuickWins: FindingItem[] = [];

  for (const cat of Object.values(categories)) {
    allStrengths.push(...cat.strengths);
    allIssues.push(...cat.issues);
    allQuickWins.push(...cat.quickWins);
  }

  // Sort issues by severity
  const severityOrder = { critical: 0, important: 1, minor: 2, positive: 3 };
  allIssues.sort((a, b) => (severityOrder[a.severity] ?? 2) - (severityOrder[b.severity] ?? 2));

  // Partial result for recommendations
  const partialResult: AuditResult = {
    url,
    domain,
    overallScore,
    categories,
    topStrengths: allStrengths,
    topWeaknesses: allIssues,
    quickWins: allQuickWins,
    recommendations: [],
    biggestOpportunity: "",
    fastestWin: "",
    scannedAt: new Date().toISOString(),
  };

  const { recommendations, biggestOpportunity, fastestWin } = generateRecommendations(partialResult);

  return {
    ...partialResult,
    recommendations,
    biggestOpportunity,
    fastestWin,
  };
}
