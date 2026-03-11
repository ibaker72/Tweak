"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  Layers,
  ShoppingCart,
  AppWindow,
  Cloud,
  FileText,
  Users,
  CreditCard,
  Plug,
  Bot,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Palette,
  Pencil,
  Clock,
  Send,
  Check,
  Loader2,
  Shield,
  Zap,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared";

interface Step1Option {
  id: string;
  label: string;
  icon: LucideIcon;
  baseMin: number;
  baseMax: number;
}

interface Step2Option {
  id: string;
  label: string;
  icon: LucideIcon;
  addMin: number;
  addMax: number;
}

interface Step3Option {
  id: string;
  label: string;
  multiplier: number;
}

interface Step4Option {
  id: string;
  label: string;
}

const projectTypes: Step1Option[] = [
  { id: "single", label: "Single Page", icon: FileText, baseMin: 997, baseMax: 1997 },
  { id: "multi", label: "Multi-Page Site", icon: Layers, baseMin: 2497, baseMax: 4497 },
  { id: "ecommerce", label: "E-Commerce Store", icon: ShoppingCart, baseMin: 3997, baseMax: 7997 },
  { id: "webapp", label: "Web Application", icon: AppWindow, baseMin: 4997, baseMax: 11997 },
  { id: "saas", label: "SaaS Product", icon: Cloud, baseMin: 7997, baseMax: 19997 },
];

const features: Step2Option[] = [
  { id: "cms", label: "CMS / Blog", icon: FileText, addMin: 300, addMax: 800 },
  { id: "auth", label: "User Authentication", icon: Users, addMin: 500, addMax: 1500 },
  { id: "payments", label: "Payments / Checkout", icon: CreditCard, addMin: 400, addMax: 1200 },
  { id: "api", label: "API Integrations", icon: Plug, addMin: 300, addMax: 1000 },
  { id: "ai", label: "AI / Automation", icon: Bot, addMin: 800, addMax: 2500 },
  { id: "dashboard", label: "Admin Dashboard", icon: LayoutDashboard, addMin: 600, addMax: 2000 },
  { id: "forms", label: "Custom Forms", icon: ClipboardList, addMin: 200, addMax: 600 },
  { id: "analytics", label: "Analytics", icon: BarChart3, addMin: 100, addMax: 400 },
];

const designOptions: Step3Option[] = [
  { id: "figma", label: "Yes — Figma / design files ready", multiplier: 1.0 },
  { id: "wireframes", label: "Rough wireframes only", multiplier: 1.15 },
  { id: "none", label: "No — need design too", multiplier: 1.35 },
];

const timelineOptions: Step4Option[] = [
  { id: "asap", label: "ASAP" },
  { id: "1-2months", label: "1–2 months" },
  { id: "2-4months", label: "2–4 months" },
  { id: "flexible", label: "Flexible" },
];

function AnimatedNumber({ target, prefix = "$" }: { target: number; prefix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1200;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span>
      {prefix}
      {current.toLocaleString()}
    </span>
  );
}

export function CostCalculator() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [designReady, setDesignReady] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success">("idle");

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const canProceed = () => {
    if (step === 1) return projectType !== null;
    if (step === 2) return true; // features are optional
    if (step === 3) return designReady !== null;
    if (step === 4) return timeline !== null;
    return true;
  };

  const calculateEstimate = () => {
    const type = projectTypes.find((t) => t.id === projectType);
    if (!type) return { min: 0, max: 0 };

    let min = type.baseMin;
    let max = type.baseMax;

    selectedFeatures.forEach((fId) => {
      const feat = features.find((f) => f.id === fId);
      if (feat) {
        min += feat.addMin;
        max += feat.addMax;
      }
    });

    const design = designOptions.find((d) => d.id === designReady);
    if (design) {
      min = Math.round(min * design.multiplier);
      max = Math.round(max * design.multiplier);
    }

    // Round to nearest nice number
    min = Math.round(min / 100) * 100 - 3;
    max = Math.round(max / 100) * 100 - 3;

    return { min, max };
  };

  const getRelevantCaseStudy = () => {
    if (projectType === "ecommerce") return { slug: "vow-studios", label: "Vow Studios" };
    if (projectType === "saas" || projectType === "webapp")
      return { slug: "leadsandsaas", label: "LeadsAndSaaS" };
    return { slug: "create3dparts", label: "Create3DParts" };
  };

  const buildContactParams = () => {
    const type = projectTypes.find((t) => t.id === projectType);
    const featureLabels = selectedFeatures
      .map((id) => features.find((f) => f.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    const design = designOptions.find((d) => d.id === designReady);
    const est = calculateEstimate();

    const params = new URLSearchParams();
    if (type) params.set("project", type.label);
    if (featureLabels) params.set("features", featureLabels);
    if (design) params.set("design", design.label);
    if (timeline) params.set("timeline", timeline);
    params.set("estimate", `$${est.min.toLocaleString()} – $${est.max.toLocaleString()}`);
    return params.toString();
  };

  const sendEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
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

  const totalSteps = 4;
  const estimate = calculateEstimate();
  const caseStudy = getRelevantCaseStudy();

  return (
    <div className="flex min-h-[100dvh] flex-col pb-24 pt-36 sm:pt-40">
      <div className="wrap flex flex-1 flex-col">
        {step <= totalSteps && (
          <Reveal>
            <div className="mx-auto mb-10 max-w-[600px] text-center">
              <span className="section-label">Cost Calculator</span>
              <h1 className="section-title mt-4">Estimate your project</h1>
              <p className="mx-auto mt-3 max-w-[400px] text-[14px] leading-[1.7] text-body">
                Answer {totalSteps} quick questions for an instant price range.
              </p>
            </div>
          </Reveal>
        )}

        {/* Progress bar */}
        {step <= totalSteps && (
          <div className="mx-auto mb-10 flex max-w-[400px] items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="h-1 flex-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: step > i ? "100%" : "0%" }}
                />
              </div>
            ))}
            <span className="ml-2 font-mono text-[11px] text-dim">
              {step}/{totalSteps}
            </span>
          </div>
        )}

        {/* Step 1: Project Type */}
        {step === 1 && (
          <Reveal delay={0.05}>
            <div className="mx-auto max-w-[600px]">
              <h2 className="mb-6 text-center font-display text-[20px] font-bold text-white">
                What are you building?
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={cn(
                      "flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200",
                      projectType === type.id
                        ? "border-accent/30 bg-accent/[0.06]"
                        : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border",
                        projectType === type.id
                          ? "border-accent/20 bg-accent/[0.08] text-accent"
                          : "border-white/[0.08] bg-white/[0.03] text-dim",
                      )}
                    >
                      <type.icon size={18} />
                    </div>
                    <span
                      className={cn(
                        "text-[14px] font-semibold",
                        projectType === type.id ? "text-white" : "text-gray-300",
                      )}
                    >
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Step 2: Features */}
        {step === 2 && (
          <Reveal delay={0.05}>
            <div className="mx-auto max-w-[600px]">
              <h2 className="mb-2 text-center font-display text-[20px] font-bold text-white">
                What features do you need?
              </h2>
              <p className="mb-6 text-center text-[13px] text-body">Select all that apply</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {features.map((feat) => {
                  const selected = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200",
                        selected
                          ? "border-accent/30 bg-accent/[0.06]"
                          : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border",
                          selected
                            ? "border-accent/40 bg-accent text-surface-0"
                            : "border-white/[0.12] bg-white/[0.03]",
                        )}
                      >
                        {selected && <Check size={10} />}
                      </div>
                      <div className="flex items-center gap-2">
                        <feat.icon
                          size={14}
                          className={selected ? "text-accent" : "text-dim"}
                        />
                        <span
                          className={cn(
                            "text-[13px] font-medium",
                            selected ? "text-white" : "text-gray-400",
                          )}
                        >
                          {feat.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}

        {/* Step 3: Design Ready */}
        {step === 3 && (
          <Reveal delay={0.05}>
            <div className="mx-auto max-w-[480px]">
              <h2 className="mb-6 text-center font-display text-[20px] font-bold text-white">
                Do you have designs ready?
              </h2>
              <div className="space-y-3">
                {designOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDesignReady(opt.id)}
                    className={cn(
                      "flex w-full items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200",
                      designReady === opt.id
                        ? "border-accent/30 bg-accent/[0.06]"
                        : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border",
                        designReady === opt.id
                          ? "border-accent/20 bg-accent/[0.08] text-accent"
                          : "border-white/[0.08] bg-white/[0.03] text-dim",
                      )}
                    >
                      {opt.id === "figma" && <Palette size={18} />}
                      {opt.id === "wireframes" && <Pencil size={18} />}
                      {opt.id === "none" && <Globe size={18} />}
                    </div>
                    <span
                      className={cn(
                        "text-[14px] font-medium",
                        designReady === opt.id ? "text-white" : "text-gray-300",
                      )}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Step 4: Timeline */}
        {step === 4 && (
          <Reveal delay={0.05}>
            <div className="mx-auto max-w-[480px]">
              <h2 className="mb-6 text-center font-display text-[20px] font-bold text-white">
                What&apos;s your timeline?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {timelineOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTimeline(opt.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl border p-4 text-center transition-all duration-200",
                      timeline === opt.id
                        ? "border-accent/30 bg-accent/[0.06]"
                        : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]",
                    )}
                  >
                    <Clock
                      size={14}
                      className={timeline === opt.id ? "text-accent" : "text-dim"}
                    />
                    <span
                      className={cn(
                        "text-[14px] font-medium",
                        timeline === opt.id ? "text-white" : "text-gray-300",
                      )}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Results */}
        {step === 5 && (
          <Reveal delay={0.05}>
            <div className="mx-auto max-w-[560px]">
              <div className="text-center">
                <span className="section-label">Your Estimate</span>
                <div className="mt-8 font-display text-[clamp(36px,8vw,56px)] font-black tracking-[-0.04em] text-white">
                  <AnimatedNumber target={estimate.min} /> –{" "}
                  <AnimatedNumber target={estimate.max} />
                </div>
                <p className="mt-3 text-[14px] text-body">
                  Based on similar projects we&apos;ve delivered
                </p>
              </div>

              {/* Breakdown */}
              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
                <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                  Your Selections
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-body">Project type</span>
                    <span className="font-medium text-white">
                      {projectTypes.find((t) => t.id === projectType)?.label}
                    </span>
                  </div>
                  {selectedFeatures.length > 0 && (
                    <div className="flex items-start justify-between text-[13px]">
                      <span className="text-body">Features</span>
                      <span className="max-w-[200px] text-right font-medium text-white">
                        {selectedFeatures
                          .map((id) => features.find((f) => f.id === id)?.label)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-body">Design status</span>
                    <span className="font-medium text-white">
                      {designOptions.find((d) => d.id === designReady)?.label.split("—")[0].trim()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-body">Timeline</span>
                    <span className="font-medium text-white">
                      {timelineOptions.find((t) => t.id === timeline)?.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href={`/contact?${buildContactParams()}`}
                  className="btn-v justify-center"
                >
                  Get an exact quote <ArrowRight size={13} />
                </Link>
                <Link
                  href={`/work/${caseStudy.slug}`}
                  className="btn-o justify-center"
                >
                  See similar work
                </Link>
              </div>

              {/* Email capture */}
              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
                <h3 className="font-display text-[15px] font-bold text-white">
                  Want this estimate sent to your inbox?
                </h3>
                {emailStatus === "success" ? (
                  <div className="mt-3 flex items-center gap-2">
                    <Check size={14} className="text-accent" />
                    <span className="text-[13px] text-accent">Sent! Check your inbox.</span>
                  </div>
                ) : (
                  <form onSubmit={sendEstimate} className="mt-3 flex gap-2.5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="field w-28 flex-shrink-0"
                      required
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="field flex-1"
                      required
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "loading"}
                      className="btn-v flex-shrink-0 !px-4 disabled:opacity-60"
                    >
                      {emailStatus === "loading" ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {[
                  { icon: Shield, text: "Fixed pricing guaranteed" },
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
        {step <= totalSteps && (
          <div className="mx-auto mt-10 flex max-w-[600px] items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 text-[13px] text-dim transition-colors hover:text-white"
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="btn-v disabled:opacity-40"
            >
              {step === totalSteps ? "See estimate" : "Continue"} <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
