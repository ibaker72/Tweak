"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Code2, Clock, Zap, Layers, RefreshCcw, Calculator, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";

interface TrackRef {
  name: string;
  type: string;
  result: string;
  href: string;
}

interface Track {
  label: string;
  name: string;
  range: string;
  rangeUnit: string | null;
  subtext: string;
  description: string;
  tags: string[];
  payment: string;
  cta: string;
  primary: boolean;
  refs: TrackRef[] | null;
  idealFor: string[] | null;
  icon: LucideIcon;
}

const tracks: Track[] = [
  {
    icon: Zap,
    label: "For teams with a design or clear spec",
    name: "Rapid Build",
    range: "$2,500 – $8,000",
    rangeUnit: null,
    subtext: "Fixed rate · Typical turnaround: 1–3 weeks",
    description:
      "You bring the design, wireframes, or a detailed brief. We build it - fast, responsive, and production-ready. Flat rate locked before we start.",
    tags: ["Page count", "CMS integration", "E-commerce", "Third-party integrations", "Revision rounds"],
    payment: "Paid upfront or 50/50 split depending on scope.",
    cta: "Get your fixed quote",
    primary: false,
    refs: null,
    idealFor: ["Marketing sites & landing pages", "Portfolio & brand sites", "Redesigns with existing specs"],
  },
  {
    icon: Layers,
    label: "For founders who need strategy + build",
    name: "Custom Engineering",
    range: "$8,000 – $30,000+",
    rangeUnit: null,
    subtext: "Milestone billing · Typical timeline: 3–8 weeks",
    description:
      "Full-cycle product engineering - from discovery and architecture through development, QA, and launch. We challenge assumptions, optimize for conversion, and deliver a product that performs.",
    tags: ["Product complexity", "Custom features", "API integrations", "AI / automation", "Design from scratch"],
    payment: "Milestone-based: 40% to start · 30% midpoint · 30% before launch.",
    cta: "Book a strategy call",
    primary: true,
    refs: [
      {
        name: "Create3DParts",
        type: "E-Commerce Platform",
        result: "Quote time: 48hrs → 60sec",
        href: "/work/create3dparts",
      },
      {
        name: "LeadsAndSaaS",
        type: "SaaS Platform",
        result: "Shipped in under 1 week",
        href: "/work/leadsandsaas",
      },
    ],
    idealFor: null,
  },
  {
    icon: RefreshCcw,
    label: "For products that need ongoing iteration",
    name: "Growth Retainer",
    range: "$2,000 – $5,000",
    rangeUnit: "/month",
    subtext: "Monthly · Cancel anytime",
    description:
      "Your product launched - now it needs to grow. Ongoing development, feature additions, performance optimization, and priority support on a predictable monthly budget.",
    tags: ["Feature development", "Bug fixes & maintenance", "Performance optimization", "Priority support", "Weekly iterations"],
    payment: "Billed monthly. No long-term contracts.",
    cta: "Explore a retainer",
    primary: false,
    refs: null,
    idealFor: ["Post-launch SaaS products", "E-commerce stores scaling up", "Teams without a full-time dev"],
  },
];

const trustItems = [
  { icon: Lock, text: "Fixed pricing on every engagement" },
  { icon: ShieldCheck, text: "Milestone refund guarantee" },
  { icon: Code2, text: "Full code ownership on delivery" },
  { icon: Clock, text: "Response in under 4 hours" },
];

type PricingTab = "pricing" | "calculator";

export function Pricing() {
  const [activeTab, setActiveTab] = useState<PricingTab>("pricing");

  return (
    <section id="pricing" className="relative py-28 sm:py-36">
      <div className="wrap">
        {/* Section heading */}
        <Reveal>
          <div className="mx-auto mb-10 max-w-[600px] text-center">
            <span className="section-label">Pricing</span>
            <h2 className="mt-5 font-display text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
              Investment
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-body sm:text-[16px]">
              Transparent pricing for every stage. Fixed quotes, milestone billing, and a refund guarantee on every engagement.
            </p>
          </div>
        </Reveal>

        {/* Segmented pill toggle */}
        <Reveal delay={0.06}>
          <div className="mx-auto mb-12 flex justify-center">
            <div
              className="inline-flex rounded-full border border-white/[0.06] bg-white/[0.015] p-[3px]"
              role="tablist"
              aria-label="Pricing view toggle"
              style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.25), 0 0.5px 0 rgba(255,255,255,0.03)" }}
            >
              <button
                suppressHydrationWarning
                role="tab"
                aria-selected={activeTab === "pricing"}
                aria-controls="pricing-panel"
                onClick={() => setActiveTab("pricing")}
                className={cn(
                  "relative rounded-full px-5 py-[7px] font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-all duration-200 sm:px-6 sm:py-2 sm:text-[11px]",
                  activeTab === "pricing"
                    ? "bg-accent text-surface-0"
                    : "text-white/35 hover:text-white/55",
                )}
                style={activeTab === "pricing" ? { boxShadow: "0 1px 3px rgba(0,0,0,0.2), inset 0 0.5px 0 rgba(255,255,255,0.15)" } : undefined}
              >
                Pricing
              </button>
              <button
                suppressHydrationWarning
                role="tab"
                aria-selected={activeTab === "calculator"}
                aria-controls="calculator-panel"
                onClick={() => setActiveTab("calculator")}
                className={cn(
                  "relative rounded-full px-5 py-[7px] font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-all duration-200 sm:px-6 sm:py-2 sm:text-[11px]",
                  activeTab === "calculator"
                    ? "bg-accent text-surface-0"
                    : "text-white/35 hover:text-white/55",
                )}
                style={activeTab === "calculator" ? { boxShadow: "0 1px 3px rgba(0,0,0,0.2), inset 0 0.5px 0 rgba(255,255,255,0.15)" } : undefined}
              >
                Cost Calculator
              </button>
            </div>
          </div>
        </Reveal>

        {/* Shared content area */}
        <div className="relative">
          {/* ── PRICING VIEW ── */}
          <div
            id="pricing-panel"
            role="tabpanel"
            aria-labelledby="pricing-tab"
            className={cn(
              "transition-all duration-300",
              activeTab === "pricing"
                ? "opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0",
            )}
          >
            {/* Three-track cards */}
            <div className="mx-auto grid max-w-[1100px] items-stretch gap-5 md:grid-cols-3 md:gap-6">
              {tracks.map((track, i) => (
                <Reveal key={track.name} delay={0.06 + i * 0.06}>
                  <div
                    className={cn(
                      "group relative flex h-full flex-col overflow-visible rounded-[20px] border-[1.5px] transition-all duration-300",
                      track.primary
                        ? "border-accent/40 hover:border-accent/55"
                        : "border-white/[0.08] hover:border-white/[0.16]",
                    )}
                    style={{
                      background: track.primary ? "rgba(200,255,0,0.015)" : "rgba(255,255,255,0.012)",
                      boxShadow: track.primary
                        ? "0 0 40px rgba(200,255,0,0.04), 0 0 0 1px rgba(200,255,0,0.02) inset, 0 16px 48px rgba(0,0,0,0.12)"
                        : "0 1px 0 rgba(255,255,255,0.02) inset, 0 8px 32px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Subtle gradient glow for Custom Engineering card */}
                    {track.primary && (
                      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
                        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.03)_0%,transparent_70%)]" />
                      </div>
                    )}
                    {/* Top accent line */}
                    <div
                      className={cn(
                        "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
                        track.primary ? "via-accent/50" : "via-white/[0.08]",
                      )}
                    />

                    {/* "Most projects" badge */}
                    {track.primary && (
                      <div className="absolute -top-[13px] left-1/2 z-10 -translate-x-1/2">
                        <span
                          className="whitespace-nowrap rounded-full border border-accent/25 bg-[#0a0a12] px-4 py-[5px] font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-accent/80"
                          style={{ boxShadow: "inset 0 0.5px 0 rgba(200,255,0,0.1), 0 2px 6px rgba(0,0,0,0.35)" }}
                        >
                          Most projects
                        </span>
                      </div>
                    )}

                    {/* Card content */}
                    <div className={cn(
                      "flex flex-1 flex-col px-7 pb-7",
                      track.primary ? "pt-10" : "pt-7",
                    )}>
                      {/* Icon */}
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02]">
                        <track.icon className="h-5 w-5 text-white/30" strokeWidth={1.5} />
                      </div>

                      {/* Label */}
                      <span className="font-mono text-[10px] tracking-[0.04em] text-dim">
                        {track.label}
                      </span>

                      {/* Track name */}
                      <div className="mt-2">
                        <h3 className="font-display text-[21px] font-bold text-white">
                          {track.name}
                        </h3>
                      </div>

                      {/* Price range */}
                      <div className="mt-5 flex items-baseline">
                        <span className="whitespace-nowrap font-display text-[clamp(24px,3.2vw,32px)] font-black leading-none tracking-[-0.03em] text-white">
                          {track.range}
                        </span>
                        {track.rangeUnit && (
                          <span className="ml-1.5 text-[clamp(12px,1.5vw,15px)] font-medium text-white/30">
                            {track.rangeUnit}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 font-mono text-[11px] text-dim">{track.subtext}</p>

                      {/* Description */}
                      <p className="mt-5 text-[13px] leading-[1.75] text-body">{track.description}</p>

                      {/* Scope tags */}
                      <div className="mt-6">
                        <span className="mb-2.5 block font-mono text-[9px] uppercase tracking-[0.1em] text-white/20">
                          {track.name === "Growth Retainer" ? "Typically includes" : "What determines your price"}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {track.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-[3px] text-[10px] text-dim"
                              style={{ boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.04)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Payment note */}
                      <p className="mt-4 font-mono text-[10px] leading-[1.6] text-dim">
                        {track.payment}
                      </p>

                      {/* Mini case study refs (Custom Engineering only) */}
                      {track.refs && (
                        <div className="mt-5 space-y-2">
                          {track.refs.map((ref) => (
                            <Link
                              key={ref.name}
                              href={ref.href}
                              className="group/ref flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 transition-all hover:border-accent/[0.15] hover:bg-accent/[0.02]"
                            >
                              <div className="min-w-0">
                                <span className="block text-[12px] font-semibold text-white">
                                  {ref.name}
                                  <span className="ml-1.5 font-normal text-dim">— {ref.type}</span>
                                </span>
                                <span className="block font-mono text-[10px] text-accent/60">
                                  {ref.result}
                                </span>
                              </div>
                              <ArrowRight
                                size={11}
                                className="ml-2 flex-shrink-0 text-dim transition-all group-hover/ref:translate-x-0.5 group-hover/ref:text-accent"
                              />
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Ideal for section */}
                      {track.idealFor && (
                        <div className="mt-5">
                          <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.1em] text-white/20">
                            Ideal for
                          </span>
                          <div className="space-y-1.5">
                            {track.idealFor.map((item) => (
                              <p key={item} className="text-[12px] leading-[1.5] text-dim">
                                {item}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-auto pt-7">
                        <Link
                          href="/contact"
                          className={cn(
                            "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[13px] font-bold transition-all duration-200",
                            track.primary
                              ? "bg-accent text-surface-0 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_0_0_1px_rgba(200,255,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,255,0,0.2)]"
                              : "border border-white/[0.12] bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-white/[0.2] hover:bg-white/[0.06]",
                          )}
                        >
                          {track.cta} <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Trust strip */}
            <Reveal delay={0.25}>
              <div className="mx-auto mt-16 flex max-w-[900px] flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mt-20">
                {trustItems.map((item) => (
                  <span key={item.text} className="flex items-center gap-2 text-[12px] text-dim">
                    <item.icon size={13} className="text-accent/50" />
                    {item.text}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── CALCULATOR VIEW ── */}
          <div
            id="calculator-panel"
            role="tabpanel"
            aria-labelledby="calculator-tab"
            className={cn(
              "transition-all duration-300",
              activeTab === "calculator"
                ? "opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0",
            )}
          >
            <div className="mx-auto max-w-[640px]">
              <div
                className="relative overflow-hidden rounded-2xl border-[1.5px] border-white/[0.08] px-8 py-10 text-center sm:rounded-3xl sm:px-12 sm:py-12"
                style={{
                  background: "rgba(255,255,255,0.012)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset, 0 8px 32px rgba(0,0,0,0.1)",
                }}
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                {/* Pill label */}
                <span className="section-label">
                  <Calculator size={12} className="text-accent/70" />
                  Cost Calculator
                </span>

                {/* Heading */}
                <h3 className="mt-6 font-display text-[clamp(22px,3vw,28px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
                  Estimate your project before you commit.
                </h3>

                {/* Supporting copy */}
                <p className="mx-auto mt-4 max-w-[440px] text-[14px] leading-[1.7] text-body sm:text-[15px]">
                  Answer a few quick questions to get an instant price range for your website, web app, e&#8209;commerce store, or SaaS product.
                </p>

                {/* Micro-feature chips */}
                <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2">
                  {["60-second estimate", "Instant price range", "Websites, apps, SaaS"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-[3px] font-mono text-[10px] tracking-[0.03em] text-white/35"
                      style={{ boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.04)" }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href="/tools/website-cost-calculator"
                    className="btn-v inline-flex"
                  >
                    Open Cost Calculator <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Reassurance */}
                <p className="mt-5 font-mono text-[10px] tracking-[0.04em] text-dim">
                  Instant estimate. No long form required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
