import type { AuditInput, AuditResult, CategoryResult, FindingItem } from "./types";
import { analyzePerformance } from "./performance";
import { analyzeSEO } from "./seo";
import { analyzeConversion, type ConversionContext } from "./conversion";
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

/**
 * Apply ceiling logic so scores feel more calibrated and believable.
 * Target distribution: 50-65 average, 66-79 solid, 80-89 strong, 90+ rare.
 */
function calibrateScore(cat: CategoryResult): number {
  const criticalCount = cat.issues.filter((i) => i.severity === "critical").length;
  const importantCount = cat.issues.filter((i) => i.severity === "important").length;
  const minorCount = cat.issues.filter((i) => i.severity === "minor").length;
  const totalIssues = cat.issues.length;

  let score = cat.score;

  // If any critical issue exists, cap around high 70s
  if (criticalCount > 0) {
    score = Math.min(score, 78);
    // Multiple critical issues push it lower
    if (criticalCount >= 2) score = Math.min(score, 68);
  }

  // If multiple important issues, soft cap around 88
  if (importantCount >= 2) {
    score = Math.min(score, 88);
  }

  // If any issue at all, soft cap at 95 — perfect scores should be extremely rare
  if (totalIssues > 0) {
    score = Math.min(score, 95);
  }

  // Additional calibration: many minor issues still indicate room to improve
  if (minorCount >= 3) {
    score = Math.min(score, 90);
  }

  return Math.max(0, score);
}

export function runAudit(input: AuditInput): AuditResult {
  const url = input.url;
  let domain: string;
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    domain = url;
  }

  // Run non-conversion analyzers first so we can feed context into conversion
  const performance = analyzePerformance(input);
  const seo = analyzeSEO(input);
  const trust = analyzeTrust(input);
  const mobile = analyzeMobile(input);
  const accessibility = analyzeAccessibility(input);

  // Count priority issues (critical + important) across other categories
  const otherCats = [performance, seo, trust, mobile, accessibility];
  const totalPriorityIssues = otherCats.reduce(
    (sum, c) => sum + c.issues.filter((i) => i.severity === "critical" || i.severity === "important").length,
    0
  );

  // Run conversion with cross-category context for grounded scoring
  const conversionCtx: ConversionContext = {
    trustScore: trust.score,
    seoScore: seo.score,
    totalPriorityIssues,
  };
  const conversion = analyzeConversion(input, conversionCtx);

  const categories = { performance, seo, conversion, trust, mobile, accessibility };

  // Apply score calibration so results feel more grounded
  for (const cat of Object.values(categories)) {
    cat.score = calibrateScore(cat);
  }

  // Generate summaries (after calibration so tier is correct)
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
