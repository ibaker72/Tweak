export interface AuditInput {
  url: string;
  html: string;
  headers: Record<string, string>;
  statusCode: number;
  loadTimeMs: number;
  pageSize: number;
}

export interface CategoryResult {
  score: number;
  label: string;
  summary: string;
  strengths: FindingItem[];
  issues: FindingItem[];
  quickWins: FindingItem[];
}

export interface FindingItem {
  title: string;
  description: string;
  severity: "critical" | "important" | "minor" | "positive";
  effort?: "quick" | "moderate" | "strategic";
  category: string;
}

export interface AuditResult {
  url: string;
  domain: string;
  overallScore: number;
  categories: {
    performance: CategoryResult;
    seo: CategoryResult;
    conversion: CategoryResult;
    trust: CategoryResult;
    mobile: CategoryResult;
    accessibility: CategoryResult;
  };
  topStrengths: FindingItem[];
  topWeaknesses: FindingItem[];
  quickWins: FindingItem[];
  recommendations: string[];
  biggestOpportunity: string;
  fastestWin: string;
  scannedAt: string;
}
