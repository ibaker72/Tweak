"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  Linkedin,
  AlertTriangle,
} from "lucide-react";
import { AuditLoadingState } from "@/components/audit/loading-state";
import { AuditScoreGauge } from "@/components/audit/score-gauge";
import { AuditCategoryCard } from "@/components/audit/category-card";
import { AuditFindingItem, AuditQuickWinItem } from "@/components/audit/finding-item";
import { AuditEmailGate } from "@/components/audit/email-gate";
import { AuditCTABlock } from "@/components/audit/cta-block";
import { AuditRecommendation } from "@/components/audit/recommendation";

interface AuditData {
  id: string;
  url: string;
  status: string;
  error_message?: string;
  result?: {
    overallScore: number;
    categories: Record<
      string,
      {
        score: number;
        label: string;
        summary: string;
        strengths: Array<{ title: string; description: string; severity: string; effort?: string; category: string }>;
        issues: Array<{ title: string; description: string; severity: string; effort?: string; category: string }>;
        quickWins: Array<{ title: string; description: string; severity: string; effort?: string; category: string }>;
      }
    >;
    strengths: Array<{ title: string; description: string; severity: string; effort?: string; category: string }>;
    issues: Array<{ title: string; description: string; severity: string; effort?: string; category: string }>;
    quickWins: Array<{ title: string; description: string; severity: string; effort?: string; category: string }>;
    recommendations: string[];
    biggestOpportunity: string;
    fastestWin: string;
    domain?: string;
    scannedAt?: string;
  };
}

const categoryOrder = ["performance", "seo", "conversion", "trust", "mobile", "accessibility"];

export function AuditReport({ id }: { id: string }) {
  const [data, setData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [gateOpen, setGateOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchAudit = useCallback(async () => {
    try {
      const res = await fetch(`/api/audit/${id}`);
      const json = await res.json();
      setData(json);

      if (json.status === "complete" || json.status === "error") {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Check localStorage for unlocked state
    if (typeof window !== "undefined") {
      const flag = localStorage.getItem(`audit_unlocked_${id}`);
      if (flag) setUnlocked(true);
    }

    fetchAudit();
  }, [id, fetchAudit]);

  // Polling while loading
  useEffect(() => {
    if (!loading) return;
    const t = setInterval(fetchAudit, 2000);
    return () => clearInterval(t);
  }, [loading, fetchAudit]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Loading state
  if (loading || !data || (data.status !== "complete" && data.status !== "error")) {
    return <AuditLoadingState url={data?.url} />;
  }

  // Error state
  if (data.status === "error") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <AlertCircle size={28} className="text-red-400" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white">Audit Failed</h1>
        <p className="mt-3 max-w-md text-[15px] text-body">
          {data.error_message || "We couldn't complete the audit. Please check the URL and try again."}
        </p>
        <Link href="/audit" className="btn-v mt-8">
          <RotateCcw size={14} />
          Try Again
        </Link>
      </div>
    );
  }

  const result = data.result;
  if (!result) return null;

  const { categories, strengths, issues, quickWins } = result;
  const domain = result.domain || new URL(data.url).hostname;
  const scannedDate = result.scannedAt ? new Date(result.scannedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

  // Issue counts for top-level context
  const priorityIssueCount = issues.filter((i) => i.severity === "critical" || i.severity === "important").length;
  const quickWinCount = quickWins.length;

  // Gated content logic
  const PUBLIC_SHOW = 3;
  const PUBLIC_QUICKWINS = 2;

  const visibleStrengths = unlocked ? strengths : strengths.slice(0, PUBLIC_SHOW);
  const gatedStrengths = !unlocked && strengths.length > PUBLIC_SHOW ? strengths.slice(PUBLIC_SHOW) : [];

  const visibleIssues = unlocked ? issues : issues.slice(0, PUBLIC_SHOW);
  const gatedIssues = !unlocked && issues.length > PUBLIC_SHOW ? issues.slice(PUBLIC_SHOW) : [];

  const totalGated = (strengths.length - PUBLIC_SHOW) + (issues.length - PUBLIC_SHOW);

  // Quick wins grouped by effort
  const fastFixes = quickWins.filter((q) => q.effort === "quick");
  const highImpact = quickWins.filter((q) => q.effort === "moderate");
  const strategic = quickWins.filter((q) => q.effort === "strategic");

  return (
    <div className="wrap pb-20 pt-32 sm:pt-36">
      {/* A) Top Summary Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card-premium mb-10"
      >
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-[13px] text-dim">Website Audit for:</p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">{domain}</p>
            {/* Issue count indicators */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {priorityIssueCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-medium text-amber-400">
                  <AlertTriangle size={11} />
                  {priorityIssueCount} priority {priorityIssueCount === 1 ? "issue" : "issues"}
                </span>
              )}
              {quickWinCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-400">
                  ⚡ {quickWinCount} quick {quickWinCount === 1 ? "win" : "wins"}
                </span>
              )}
            </div>
          </div>

          <AuditScoreGauge score={result.overallScore} size={160} />

          <div className="space-y-3 text-center lg:text-right">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-dim">Biggest Opportunity</p>
              <p className="mt-1 max-w-xs text-[13px] text-body">{result.biggestOpportunity}</p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-dim">Fastest Win</p>
              <p className="mt-1 max-w-xs text-[13px] text-body">{result.fastestWin}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {scannedDate && <span className="text-[11px] text-dim">Scanned {scannedDate}</span>}
            {scannedDate && <span className="hidden h-3 w-px bg-white/[0.06] sm:inline-block" />}
            <span className="text-[11px] text-dim">
              Powered by <span className="text-accent/60">TweakAndBuild</span>
            </span>
          </div>
          {/* Methodology note */}
          <p className="mt-3 text-center text-[11px] leading-[1.6] text-dim/70">
            This audit is based on automated checks of your site&apos;s public structure, content signals, and technical fundamentals. Some findings may benefit from manual review.
          </p>
        </div>
      </motion.section>

      {/* B) Category Score Cards */}
      <section className="mb-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryOrder.map((key, i) => {
            const cat = categories[key];
            if (!cat) return null;
            return (
              <AuditCategoryCard
                key={key}
                category={key}
                label={cat.label}
                score={cat.score}
                summary={cat.summary}
                index={i}
              />
            );
          })}
        </div>
      </section>

      {/* C) Strengths */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-xl font-bold text-white sm:text-2xl">
          What&apos;s Working Well
        </h2>
        <div className="space-y-3">
          {visibleStrengths.map((s, i) => (
            <AuditFindingItem
              key={i}
              title={s.title}
              description={s.description}
              severity="positive"
            />
          ))}
          {gatedStrengths.length > 0 && (
            <div className="relative">
              {gatedStrengths.slice(0, 2).map((s, i) => (
                <AuditFindingItem
                  key={`gated-${i}`}
                  title={s.title}
                  description={s.description}
                  severity="positive"
                  blurred
                  onClickBlurred={() => setGateOpen(true)}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setGateOpen(true)}
                  className="btn-v z-10"
                >
                  Unlock Full Report
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* D) Weaknesses */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-xl font-bold text-white sm:text-2xl">
          What Needs Attention
        </h2>
        <div className="space-y-3">
          {visibleIssues.map((s, i) => (
            <AuditFindingItem
              key={i}
              title={s.title}
              description={s.description}
              severity={s.severity as "critical" | "important" | "minor"}
              effort={s.effort as "quick" | "moderate" | "strategic" | undefined}
            />
          ))}
          {gatedIssues.length > 0 && (
            <div className="relative">
              {gatedIssues.slice(0, 2).map((s, i) => (
                <AuditFindingItem
                  key={`gated-${i}`}
                  title={s.title}
                  description={s.description}
                  severity={s.severity as "critical" | "important" | "minor"}
                  blurred
                  onClickBlurred={() => setGateOpen(true)}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setGateOpen(true)}
                  className="btn-v z-10"
                >
                  Unlock Full Report
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* E) Quick Wins */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-xl font-bold text-white sm:text-2xl">
          Your Quick Wins
        </h2>

        {fastFixes.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-emerald-400">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 text-[10px] font-bold">⚡</span>
              Fast Fixes (under 1 hour)
            </h3>
            <div className="space-y-3">
              {(unlocked ? fastFixes : fastFixes.slice(0, PUBLIC_QUICKWINS)).map((q, i) => (
                <AuditQuickWinItem key={i} title={q.title} description={q.description} effort={q.effort} />
              ))}
              {!unlocked && fastFixes.length > PUBLIC_QUICKWINS && (
                <button onClick={() => setGateOpen(true)} className="text-[13px] text-accent/70 hover:text-accent transition-colors">
                  + {fastFixes.length - PUBLIC_QUICKWINS} more — unlock full report
                </button>
              )}
            </div>
          </div>
        )}

        {highImpact.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-amber-400">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/20 text-[10px] font-bold">🎯</span>
              High-Impact Fixes (1-4 hours)
            </h3>
            <div className="space-y-3">
              {(unlocked ? highImpact : highImpact.slice(0, PUBLIC_QUICKWINS)).map((q, i) => (
                <AuditQuickWinItem key={i} title={q.title} description={q.description} effort={q.effort} />
              ))}
              {!unlocked && highImpact.length > PUBLIC_QUICKWINS && (
                <button onClick={() => setGateOpen(true)} className="text-[13px] text-accent/70 hover:text-accent transition-colors">
                  + {highImpact.length - PUBLIC_QUICKWINS} more — unlock full report
                </button>
              )}
            </div>
          </div>
        )}

        {strategic.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-blue-400">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/20 text-[10px] font-bold">🚀</span>
              Strategic Upgrades (project-level)
            </h3>
            <div className="space-y-3">
              {(unlocked ? strategic : strategic.slice(0, PUBLIC_QUICKWINS)).map((q, i) => (
                <AuditQuickWinItem key={i} title={q.title} description={q.description} effort={q.effort} />
              ))}
              {!unlocked && strategic.length > PUBLIC_QUICKWINS && (
                <button onClick={() => setGateOpen(true)} className="text-[13px] text-accent/70 hover:text-accent transition-colors">
                  + {strategic.length - PUBLIC_QUICKWINS} more — unlock full report
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* F) TweakAndBuild Recommendation */}
      {result.recommendations.length > 0 && (
        <section className="mb-14">
          <AuditRecommendation
            recommendations={result.recommendations}
            biggestOpportunity={result.biggestOpportunity}
          />
        </section>
      )}

      {/* G) CTA Block */}
      <section className="mb-14">
        <AuditCTABlock auditId={id} />
      </section>

      {/* I) Bottom Actions */}
      <section className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/audit" className="btn-o">
          <RotateCcw size={14} />
          Run Another Audit
        </Link>
        <button onClick={copyLink} className="btn-o">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Link to This Report"}
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-o"
        >
          <Linkedin size={14} />
          Share on LinkedIn
        </a>
      </section>

      {/* Email Gate Dialog */}
      <AuditEmailGate
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        auditId={id}
        onSuccess={() => setUnlocked(true)}
      />
    </div>
  );
}
