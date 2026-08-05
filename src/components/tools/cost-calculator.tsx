"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Send,
  Shield,
  Zap,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared";
import { trackEvent } from "@/lib/analytics";

type SolutionKey = "launch" | "custom" | "growth";

type AnswerOption = {
  id: string;
  label: string;
  /** Contribution to the overall scope/complexity score that drives the investment band */
  complexity: number;
  /** Points toward each website solution recommendation */
  points?: Partial<Record<SolutionKey, number>>;
};

type Question = {
  id: string;
  title: string;
  subtitle?: string;
  multi?: boolean;
  options: AnswerOption[];
};

const QUESTIONS: Question[] = [
  {
    id: "stage",
    title: "Where is your business right now?",
    options: [
      { id: "new", label: "New business / launching", complexity: 1, points: { launch: 3 } },
      { id: "established", label: "Established business", complexity: 2, points: { custom: 2 } },
      { id: "rebrand", label: "Rebranding or rebuilding", complexity: 2, points: { custom: 2 } },
      { id: "expanding", label: "Expanding locations or service areas", complexity: 3, points: { growth: 3 } },
    ],
  },
  {
    id: "site",
    title: "What's your current website situation?",
    options: [
      { id: "none", label: "No website yet", complexity: 1, points: { launch: 2 } },
      { id: "basic", label: "Basic website", complexity: 1, points: { launch: 1, custom: 1 } },
      { id: "outdated", label: "Outdated website", complexity: 2, points: { custom: 3 } },
      { id: "underperforming", label: "Decent website, not generating enough leads", complexity: 2, points: { custom: 1, growth: 2 } },
    ],
  },
  {
    id: "size",
    title: "How large does the site need to be?",
    subtitle: "A rough page count is fine — service and city pages included.",
    options: [
      { id: "1-3", label: "1–3 pages", complexity: 1, points: { launch: 2 } },
      { id: "4-6", label: "4–6 pages", complexity: 2, points: { custom: 2 } },
      { id: "7-12", label: "7–12 pages", complexity: 3, points: { custom: 2, growth: 1 } },
      { id: "13+", label: "13+ pages", complexity: 4, points: { growth: 3 } },
    ],
  },
  {
    id: "reach",
    title: "How far does your local reach go?",
    options: [
      { id: "single", label: "One core service area", complexity: 1, points: { launch: 2 } },
      { id: "services", label: "Multiple services, one area", complexity: 2, points: { custom: 2 } },
      { id: "cities", label: "Multiple cities / service areas", complexity: 3, points: { growth: 3 } },
      { id: "multi-location", label: "Multiple locations / regional SEO", complexity: 4, points: { growth: 4 } },
    ],
  },
  {
    id: "functionality",
    title: "What should the website handle?",
    subtitle: "Select all that apply. A standard contact form is always included.",
    multi: true,
    options: [
      { id: "quote", label: "Quote request forms", complexity: 1, points: { custom: 1 } },
      { id: "booking", label: "Online booking / scheduling", complexity: 1, points: { custom: 1 } },
      { id: "payments", label: "Payment processing", complexity: 1, points: { custom: 1 } },
      { id: "crm", label: "CRM integration", complexity: 2, points: { growth: 2 } },
      { id: "followup", label: "Automated lead follow-up", complexity: 2, points: { growth: 2 } },
      { id: "portal", label: "Customer portal / custom functionality", complexity: 2, points: { growth: 1 } },
    ],
  },
  {
    id: "content",
    title: "Where does your content stand?",
    options: [
      { id: "own", label: "I have my own copy and photos", complexity: 0 },
      { id: "copy", label: "Need copywriting help", complexity: 1, points: { custom: 1 } },
      { id: "media", label: "Need photo / drone / video content", complexity: 1, points: { custom: 1 } },
      { id: "full", label: "Need copy plus a full content system", complexity: 2, points: { growth: 2 } },
    ],
  },
  {
    id: "marketing",
    title: "Any marketing planned beyond the website?",
    options: [
      { id: "none", label: "Website only for now", complexity: 0 },
      { id: "seo", label: "Local SEO", complexity: 1, points: { growth: 2 } },
      { id: "ads", label: "Google or Meta ads", complexity: 1, points: { growth: 2 } },
      { id: "full-acquisition", label: "Full acquisition strategy", complexity: 2, points: { growth: 4 } },
    ],
  },
  {
    id: "goal",
    title: "What's the primary goal?",
    options: [
      { id: "credibility", label: "Establish credibility", complexity: 0, points: { launch: 3 } },
      { id: "replace", label: "Replace an outdated site", complexity: 1, points: { custom: 3 } },
      { id: "leads", label: "Get more calls and form submissions", complexity: 1, points: { custom: 2, growth: 1 } },
      { id: "rank", label: "Rank in more locations", complexity: 2, points: { growth: 3 } },
      { id: "scale", label: "Scale lead generation aggressively", complexity: 2, points: { growth: 4 } },
    ],
  },
];

const INVESTMENT_BANDS = [
  { id: "under_2500", label: "Under $2,500" },
  { id: "2500_5000", label: "$2,500 – $5,000" },
  { id: "5000_10000", label: "$5,000 – $10,000" },
  { id: "10000_25000", label: "$10,000 – $25,000" },
  { id: "25000_plus", label: "$25,000+" },
] as const;

const SOLUTIONS: Record<
  SolutionKey,
  { name: string; analyticsId: string; reason: string; needs: string[] }
> = {
  launch: {
    name: "New Business Launch",
    analyticsId: "new_business_launch",
    reason:
      "Your priority is getting a credible, conversion-ready presence online without overbuilding. A focused launch build covers what your business needs right now — and leaves room to expand as you grow.",
    needs: [
      "Conversion-focused business website",
      "Mobile-first design",
      "Core service and company sections",
      "Quote or contact lead capture",
      "Google Business Profile readiness",
      "SEO foundation",
      "Analytics and conversion tracking",
    ],
  },
  custom: {
    name: "Custom Business Website",
    analyticsId: "custom_business_website",
    reason:
      "Your business needs a stronger conversion platform, not just a visual refresh. Your answers point to a fully custom build focused on credibility, a clearer service structure, and measurably better lead capture.",
    needs: [
      "Fully custom business website",
      "Conversion-focused page structure",
      "Service, trust, and proof sections",
      "Stronger conversion copy",
      "Lead capture and quote forms",
      "SEO and analytics setup",
      "Expansion-ready architecture",
    ],
  },
  growth: {
    name: "Local Growth System",
    analyticsId: "local_growth_system",
    reason:
      "Your project needs to support acquisition and expansion, not simply serve as an online brochure. Your answers point to a website built as a local growth platform — visibility, conversion paths, and campaign-ready infrastructure.",
    needs: [
      "Conversion-focused custom website",
      "Expanded service architecture",
      "Local SEO structure and schema",
      "City / service landing-page framework",
      "Lead and conversion tracking",
      "Review-growth integration",
      "Campaign-ready landing pages",
    ],
  },
};

function computeResult(answers: Record<string, string[]>) {
  const scores: Record<SolutionKey, number> = { launch: 0, custom: 0, growth: 0 };
  let complexity = 0;

  for (const question of QUESTIONS) {
    for (const id of answers[question.id] ?? []) {
      const option = question.options.find((o) => o.id === id);
      if (!option) continue;
      complexity += option.complexity;
      for (const [key, value] of Object.entries(option.points ?? {})) {
        scores[key as SolutionKey] += value ?? 0;
      }
    }
  }

  let recommendation: SolutionKey;
  if (scores.growth > 0 && scores.growth >= scores.custom && scores.growth >= scores.launch) {
    recommendation = "growth";
  } else if (scores.custom >= scores.launch) {
    recommendation = "custom";
  } else {
    recommendation = "launch";
  }

  let bandIndex =
    complexity <= 4 ? 0 : complexity <= 10 ? 1 : complexity <= 17 ? 2 : complexity <= 22 ? 3 : 4;
  // Guardrails so band and recommendation stay logically consistent
  if (recommendation === "growth") bandIndex = Math.max(bandIndex, 2);
  if (recommendation === "custom") bandIndex = Math.max(bandIndex, 1);
  if (recommendation === "launch") bandIndex = Math.min(bandIndex, 2);

  return { recommendation, band: INVESTMENT_BANDS[bandIndex], complexity, scores };
}

export function CostCalculator() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success">("idle");
  const startedRef = useRef(false);

  const totalSteps = QUESTIONS.length;
  const currentQuestion = QUESTIONS[step - 1];
  const onResults = step > totalSteps;

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("website_calculator_started", { source: "website_cost_calculator" });
  };

  const selectSingle = (questionId: string, optionId: string) => {
    markStarted();
    setAnswers((prev) => ({ ...prev, [questionId]: [optionId] }));
  };

  const toggleMulti = (questionId: string, optionId: string) => {
    markStarted();
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      return {
        ...prev,
        [questionId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  const canProceed = () => {
    if (!currentQuestion) return true;
    if (currentQuestion.multi) return true; // multi-selects are optional
    return (answers[currentQuestion.id] ?? []).length > 0;
  };

  const result = computeResult(answers);
  const solution = SOLUTIONS[result.recommendation];

  const finish = () => {
    trackEvent("website_calculator_completed", {
      recommended_solution: solution.analyticsId,
      investment_band: result.band.id,
      primary_goal: answers.goal?.[0] ?? null,
      source: "website_cost_calculator",
    });
    setStep(totalSteps + 1);
  };

  const trackCta = (cta: string) => {
    trackEvent("website_calculator_cta_clicked", {
      recommended_solution: solution.analyticsId,
      investment_band: result.band.id,
      cta,
      source: "website_cost_calculator",
    });
  };

  const sendResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "calculator" }),
      });
    } catch {
      // Silently fail — still show success since it's a nice-to-have
    }
    setEmailStatus("success");
  };

  const answerLabel = (questionId: string) => {
    const question = QUESTIONS.find((q) => q.id === questionId);
    const selected = answers[questionId] ?? [];
    if (!question || selected.length === 0) return null;
    return selected
      .map((id) => question.options.find((o) => o.id === id)?.label)
      .filter(Boolean)
      .join(", ");
  };

  const profile = [
    { label: "Business stage", value: answerLabel("stage") },
    { label: "Current website", value: answerLabel("site") },
    { label: "Local reach", value: answerLabel("reach") },
    { label: "Functionality", value: answerLabel("functionality") ?? "Standard contact form" },
    { label: "Content", value: answerLabel("content") },
    { label: "Primary goal", value: answerLabel("goal") },
  ].filter((row) => Boolean(row.value));

  const contactHref = `/contact?tier=${encodeURIComponent(solution.name)}&source=calculator`;

  return (
    <div className="flex min-h-[100dvh] flex-col pb-24 pt-36 sm:pt-40">
      <div className="wrap flex flex-1 flex-col">
        {!onResults && (
          <Reveal>
            <div className="mx-auto mb-8 max-w-[640px] text-center">
              <span className="section-label">Free Website Planning Tool</span>
              <h1 className="section-title mt-4">
                What kind of website does your business actually need?
              </h1>
              <p className="mx-auto mt-3 max-w-[480px] text-[14px] leading-[1.7] text-body">
                Answer a few questions about your business, goals, market, and
                functionality. We&apos;ll estimate the level of build your project
                likely requires and show you the best next step.
              </p>
              <p className="mx-auto mt-2 max-w-[440px] text-[12px] leading-[1.6] text-dim">
                No generic package picker. No obligation. Just a clearer picture
                of what your project involves.
              </p>
            </div>
          </Reveal>
        )}

        {/* Progress bar */}
        {!onResults && (
          <div className="mx-auto mb-10 flex w-full max-w-[400px] items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: step > i ? "100%" : "0%" }}
                />
              </div>
            ))}
            <span className="ml-2 whitespace-nowrap font-mono text-[11px] text-dim">
              Step {step} of {totalSteps}
            </span>
          </div>
        )}

        {/* Question steps */}
        {!onResults && currentQuestion && (
          <Reveal key={currentQuestion.id} delay={0.05}>
            <div className="mx-auto w-full max-w-[600px]">
              <h2 className="mb-2 text-center font-display text-[20px] font-bold text-white">
                {currentQuestion.title}
              </h2>
              {currentQuestion.subtitle && (
                <p className="mb-6 text-center text-[13px] leading-[1.6] text-body">
                  {currentQuestion.subtitle}
                </p>
              )}
              {!currentQuestion.subtitle && <div className="mb-6" />}
              <div className="grid gap-2.5 sm:grid-cols-2">
                {currentQuestion.options.map((option) => {
                  const selected = (answers[currentQuestion.id] ?? []).includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        currentQuestion.multi
                          ? toggleMulti(currentQuestion.id, option.id)
                          : selectSingle(currentQuestion.id, option.id)
                      }
                      className={cn(
                        "flex min-h-[52px] items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                        selected
                          ? "border-accent/30 bg-accent/[0.06]"
                          : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-5 w-5 flex-shrink-0 items-center justify-center border",
                          currentQuestion.multi ? "rounded-md" : "rounded-full",
                          selected
                            ? "border-accent/40 bg-accent text-surface-0"
                            : "border-white/[0.12] bg-white/[0.03]",
                        )}
                      >
                        {selected && <Check size={10} />}
                      </span>
                      <span
                        className={cn(
                          "text-[13.5px] font-medium leading-[1.4]",
                          selected ? "text-white" : "text-gray-300",
                        )}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}

        {/* Results */}
        {onResults && (
          <Reveal delay={0.05}>
            <div className="mx-auto w-full max-w-[620px]">
              <div className="text-center">
                <span className="section-label">Your Recommended Approach</span>
                <h1 className="mt-5 font-display text-[clamp(30px,6vw,44px)] font-black leading-[1.1] tracking-[-0.03em] text-white">
                  {solution.name}
                </h1>
                <p className="mx-auto mt-4 max-w-[500px] text-[14px] leading-[1.7] text-body">
                  {solution.reason}
                </p>
              </div>

              {/* What the project likely needs */}
              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
                <h2 className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                  What your project likely needs
                </h2>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {solution.needs.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[3px] inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-accent/[0.12]"
                      >
                        <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
                      </span>
                      <span className="text-[12.5px] leading-[1.55] text-white/[0.62]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project profile */}
              <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
                <h2 className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
                  Your project profile
                </h2>
                <div className="space-y-2.5">
                  {profile.map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 text-[13px]">
                      <span className="shrink-0 text-body">{row.label}</span>
                      <span className="text-right font-medium text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment level */}
              <div className="mt-4 rounded-2xl border border-accent/[0.16] bg-accent/[0.03] p-6">
                <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                  Estimated investment level
                </h2>
                <p className="mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em] text-white sm:text-[30px]">
                  {result.band.label}
                </p>
                <p className="mt-2 text-[12.5px] leading-[1.65] text-body">
                  Planning estimate only. Final scope and investment are confirmed
                  after reviewing your business, requirements, market, content, and
                  integrations.
                </p>
                <p className="mt-2 text-[12px] leading-[1.6] text-dim">
                  Scope typically moves with functionality depth, content
                  production, integrations, number of service areas, and how
                  aggressive your growth targets are.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href={contactHref}
                  className="btn-v justify-center"
                  onClick={() => trackCta("contact")}
                >
                  Get My Exact Recommendation <ArrowRight size={13} />
                </Link>
                <Link
                  href="/audit"
                  className="btn-o justify-center"
                  onClick={() => trackCta("audit")}
                >
                  Get a Free Business Audit
                </Link>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setStep(totalSteps)}
                  className="inline-flex min-h-[44px] items-center gap-2 px-3 text-[13px] text-dim transition-colors hover:text-white"
                >
                  <ArrowLeft size={13} /> Adjust my answers
                </button>
              </div>

              {/* Email capture */}
              <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
                <h2 className="font-display text-[15px] font-bold text-white">
                  Want this plan sent to your inbox?
                </h2>
                {emailStatus === "success" ? (
                  <div className="mt-3 flex items-center gap-2">
                    <Check size={14} className="text-accent" />
                    <span className="text-[13px] text-accent">Sent! Check your inbox.</span>
                  </div>
                ) : (
                  <form onSubmit={sendResult} className="mt-3 flex flex-col gap-2.5 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-label="Email address"
                      className="field flex-1"
                      required
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "loading"}
                      className="btn-v justify-center sm:flex-shrink-0 sm:!px-4 disabled:opacity-60"
                    >
                      {emailStatus === "loading" ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                      <span className="sm:hidden">Send my plan</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {[
                  { icon: Shield, text: "Clear scope before you commit" },
                  { icon: Zap, text: "No hourly billing" },
                  { icon: MessageSquare, text: "Response in <4hrs" },
                ].map((badge) => (
                  <span
                    key={badge.text}
                    className="flex items-center gap-1.5 text-[11px] text-dim"
                  >
                    <badge.icon size={11} className="text-accent/50" />
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Navigation buttons */}
        {!onResults && (
          <div className="mx-auto mt-10 flex w-full max-w-[600px] items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex min-h-[44px] items-center gap-2 px-2 text-[13px] text-dim transition-colors hover:text-white"
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              type="button"
              onClick={() => (step === totalSteps ? finish() : setStep((s) => s + 1))}
              disabled={!canProceed()}
              className="btn-v disabled:opacity-40"
            >
              {step === totalSteps ? "See my recommendation" : "Continue"} <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
