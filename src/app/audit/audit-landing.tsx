"use client";
import { useState } from "react";
import { Reveal } from "@/components/shared";
import { AuditURLInput } from "@/components/audit/url-input";
import {
  BarChart3,
  Target,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  Shield,
  Search,
  MousePointerClick,
  Smartphone,
  Eye,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BarChart3,
    title: "Score Breakdown",
    description: "6 key scores from Performance to Trust, each explained in plain English.",
  },
  {
    icon: Target,
    title: "Strengths & Weaknesses",
    description: "See exactly what's working and what's costing you leads.",
  },
  {
    icon: Lightbulb,
    title: "Quick Wins & Roadmap",
    description: "Prioritized fixes ranked by effort vs. impact.",
  },
];

const audiences = ["Local businesses", "Service providers", "Agencies & freelancers"];

const auditChecks = [
  { icon: Zap, label: "Performance basics" },
  { icon: Search, label: "SEO fundamentals" },
  { icon: MousePointerClick, label: "Conversion clarity" },
  { icon: Shield, label: "Trust signals" },
  { icon: Smartphone, label: "Mobile readiness" },
  { icon: Eye, label: "Accessibility basics" },
];

const sampleCategories = [
  { label: "Performance", score: 74, color: "text-blue-400", bg: "bg-blue-500/20", stroke: "#60a5fa" },
  { label: "SEO", score: 62, color: "text-blue-400", bg: "bg-blue-500/20", stroke: "#60a5fa" },
  { label: "Conversion", score: 81, color: "text-emerald-400", bg: "bg-emerald-500/20", stroke: "#34d399" },
  { label: "Trust", score: 55, color: "text-amber-400", bg: "bg-amber-500/20", stroke: "#fbbf24" },
  { label: "Mobile", score: 88, color: "text-emerald-400", bg: "bg-emerald-500/20", stroke: "#34d399" },
  { label: "Accessibility", score: 69, color: "text-blue-400", bg: "bg-blue-500/20", stroke: "#60a5fa" },
];

const sampleFindings = [
  { title: "No lazy loading on images", severity: "important" as const, effort: "Quick fix" },
  { title: "Missing meta description", severity: "critical" as const, effort: "Quick fix" },
  { title: "No structured data detected", severity: "important" as const, effort: "Moderate" },
];

const faqs = [
  {
    q: "What does this audit check?",
    a: "We scan your homepage for performance basics, SEO fundamentals, conversion clarity, trust signals, mobile readiness, and accessibility. It's a fast first-pass to surface high-impact opportunities.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. The initial audit is completely free with no account or signup required. You only enter your email if you want to unlock the full detailed report.",
  },
  {
    q: "How accurate is the audit?",
    a: "This is an automated scan of your site's public structure and content signals. It catches the most common issues reliably, but some findings may need manual verification. Think of it as a strong starting point, not a replacement for a full manual review.",
  },
  {
    q: "Will TweakAndBuild contact me?",
    a: "Only if you request it. If you unlock the full report with your email, you'll receive one follow-up with your results. No spam, no sales calls unless you ask.",
  },
  {
    q: "Can you fix the issues found?",
    a: "Yes. After reviewing your audit, you can book a strategy call or request a fix plan. We'll prioritize the changes that will have the biggest impact on your traffic and conversions.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-white pr-4">{q}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-dim transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"}`}
      >
        <p className="text-[14px] leading-[1.7] text-body">{a}</p>
      </div>
    </div>
  );
}

export function AuditLanding() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(200,255,0,0.04),transparent)]" />
        <div className="wrap page-header pb-16 text-center sm:pb-20">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/[0.05] px-4 py-1.5">
              <span className="text-accent text-[13px]">✦</span>
              <span className="font-mono text-[11px] text-accent/80">
                Free instant audit · No signup required
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-[clamp(36px,8vw,72px)] font-black leading-[0.95] tracking-[-0.045em] text-white">
              Instant Website
              <br />
              <span className="gradient-text">Audit</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[540px] text-[16px] leading-[1.7] text-body sm:text-[17px]">
              Get a fast, plain-English breakdown of your site&apos;s performance, SEO, trust signals, and conversion readiness.
            </p>
            <p className="mx-auto mt-2 max-w-[480px] text-[14px] leading-[1.7] text-dim">
              See what&apos;s working, what&apos;s hurting conversions, and what to fix first.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <AuditURLInput />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="relative py-20 sm:py-28">
        <div className="wrap">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="section-label">What you&apos;ll get</span>
              <h2 className="mt-5 section-title">
                A clear picture of your site&apos;s <span className="gradient-text">strengths and gaps</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="card p-7 text-center h-full">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                    <f.icon size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display text-[16px] font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-body">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What This Audit Checks — Trust / Methodology */}
      <section className="relative py-16 sm:py-20">
        <div className="wrap">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-10">
              <h3 className="mb-6 text-center font-display text-lg font-bold text-white">
                What this audit checks
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {auditChecks.map((c) => (
                  <div key={c.label} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] px-4 py-3">
                    <c.icon size={15} className="flex-shrink-0 text-accent/70" />
                    <span className="text-[13px] text-body">{c.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-[13px] leading-[1.7] text-dim">
                This is a fast first-pass audit designed to highlight high-impact opportunities — not a full manual review.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sample Audit Preview */}
      <section className="relative py-16 sm:py-24">
        <div className="wrap">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="section-label">Sample report</span>
              <h2 className="mt-5 section-title">
                Here&apos;s what your report <span className="gradient-text">looks like</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              {/* Sample score header */}
              <div className="border-b border-white/[0.06] p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                  <div>
                    <p className="text-[12px] text-dim">Website Audit for:</p>
                    <p className="mt-1 font-mono text-[15px] font-semibold text-white/60">example.com</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-4xl font-bold text-blue-400">71</span>
                    <span className="text-[12px] text-dim">/100</span>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-[11px] text-dim">Priority Issues</p>
                    <p className="mt-0.5 font-mono text-lg font-semibold text-amber-400">5</p>
                  </div>
                </div>
              </div>

              {/* Sample category scores */}
              <div className="grid grid-cols-2 gap-px bg-white/[0.04] sm:grid-cols-3">
                {sampleCategories.map((c) => (
                  <div key={c.label} className="bg-surface-0 p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-body">{c.label}</span>
                      <span className={`font-mono text-lg font-bold ${c.color}`}>{c.score}</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full"
                        style={{ background: c.stroke, width: `${c.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample findings preview */}
              <div className="border-t border-white/[0.06] p-6 sm:p-8">
                <p className="mb-4 text-[13px] font-semibold text-white">Sample findings:</p>
                <div className="space-y-2">
                  {sampleFindings.map((f) => (
                    <div key={f.title} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-4 py-3">
                      <span className="text-[13px] text-body">{f.title}</span>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${f.severity === "critical" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>
                          {f.severity === "critical" ? "Critical" : "Important"}
                        </span>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                          {f.effort}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-white/[0.02] py-3">
                  <span className="text-[12px] text-dim">+ quick wins, recommendations, and priority roadmap</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who It's For */}
      <section className="relative py-16 sm:py-24">
        <div className="wrap text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,4vw,36px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              Built for business owners, not developers.
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {audiences.map((a) => (
                <span key={a} className="tag !text-[12px] !px-4 !py-1.5">{a}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 sm:py-24">
        <div className="wrap">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-center font-display text-[clamp(24px,4vw,32px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                Common Questions
              </h2>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 sm:px-8">
                {faqs.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust / Authority */}
      <section className="relative pb-24 sm:pb-32">
        <div className="wrap text-center">
          <Reveal>
            <div className="mx-auto max-w-lg">
              <p className="text-[15px] leading-[1.7] text-body">
                Built by <span className="font-semibold text-white">TweakAndBuild</span> — a studio focused on performance, SEO, and conversion-ready websites.
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-accent/70 hover:text-accent transition-colors"
              >
                Learn what we do <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
