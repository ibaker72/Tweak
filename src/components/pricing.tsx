"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Clock3, Code2, Gauge, Layers3, Lock, Rocket, Sparkles, TrendingUp, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";

type Offer = {
  id: "rapid-build" | "custom-engineering" | "growth-retainer" | "growth-engine";
  eyebrow: string;
  name: string;
  displayName?: string;
  price: string;
  unit?: string;
  valueProp: string;
  idealFor: string;
  includes: string[];
  billing: string;
  cta: string;
  featured?: boolean;
  accent?: "build" | "growth";
};

const trustItems = [
  { icon: Lock, text: "Fixed pricing where possible" },
  { icon: Layers3, text: "Milestone billing on larger builds" },
  { icon: Code2, text: "Full code ownership" },
  { icon: Clock3, text: "Fast response times" },
];

const buildOffers: Offer[] = [
  {
    id: "custom-engineering",
    eyebrow: "Flagship engagement",
    name: "Custom Engineering",
    price: "$8,000 – $30,000+",
    valueProp: "Strategy, architecture, and full-cycle delivery for complex products.",
    idealFor: "Founders building new platforms, complex MVPs, or major product rebuilds.",
    includes: ["Discovery and technical planning", "Architecture and full-stack build", "QA, launch support, and handoff docs"],
    billing: "Milestone billing: 40% start · 30% midpoint · 30% before launch.",
    cta: "Book a strategy call",
    featured: true,
    accent: "build",
  },
  {
    id: "rapid-build",
    eyebrow: "Fixed-scope implementation",
    name: "Rapid Build",
    price: "$2,500 – $8,000",
    valueProp: "Fast implementation when scope is clear and decisions are ready.",
    idealFor: "Landing pages, marketing sites, and redesigns with approved direction.",
    includes: ["Production-ready frontend and integrations", "Responsive QA and performance pass", "Focused revision rounds by scope"],
    billing: "Paid upfront or 50/50 split, depending on total scope.",
    cta: "Get a fixed quote",
    accent: "build",
  },
];

const growthOffers: Offer[] = [
  {
    id: "growth-engine",
    eyebrow: "Acquisition + conversion",
    name: "Growth Engine",
    price: "$2,000 – $4,500",
    unit: "/month",
    valueProp: "An ongoing growth system built around SEO, funnels, and experimentation.",
    idealFor: "Teams that need more qualified traffic, stronger conversion, and clearer reporting.",
    includes: ["SEO foundation and technical fixes", "Landing page expansion and CRO", "Analytics, experiments, and monthly insights"],
    billing: "Monthly engagement with a 3-month minimum for measurable compounding.",
    cta: "Explore growth options",
    accent: "growth",
  },
  {
    id: "growth-retainer",
    eyebrow: "Product engineering support",
    name: "Growth Retainer",
    displayName: "Engineering Retainer",
    price: "$2,000 – $5,000",
    unit: "/month",
    valueProp: "Dedicated product iteration capacity after launch.",
    idealFor: "Post-launch teams that need dependable engineering velocity each week.",
    includes: ["Feature development and product improvements", "Bug fixes, maintenance, and optimization", "Priority support with weekly shipping cadence"],
    billing: "Monthly billing, no long-term contract. Adjust scope as priorities change.",
    cta: "Start a retainer",
    accent: "build",
  },
];

const outcomes = [
  {
    name: "Create3DParts",
    summary: "Quote workflow compressed from 48 hours to 60 seconds.",
    metric: "Orders up 35% in month one",
    href: "/work/create3dparts",
  },
  {
    name: "LeadsAndSaaS",
    summary: "Multi-tenant platform shipped in under one week.",
    metric: "Lead response dropped to 15 minutes",
    href: "/work/leadsandsaas",
  },
];

const pricingFaqs = [
  {
    q: "What’s the difference between Rapid Build and Custom Engineering?",
    a: "Rapid Build is fixed-scope implementation when you already have direction and assets. Custom Engineering includes discovery, architecture, and full-cycle delivery for higher complexity products.",
  },
  {
    q: "What’s the difference between Engineering Retainer and Growth Engine?",
    a: "Engineering Retainer is product and code velocity: features, fixes, performance, and support. Growth Engine focuses on acquisition and conversion: SEO, landing page expansion, CRO, and growth experiments.",
  },
  {
    q: "How does billing work?",
    a: "Rapid Build is fixed-rate. Custom Engineering uses milestone billing. Retainer and Growth Engine are monthly engagements with clear scopes and reporting.",
  },
  {
    q: "How fast can you start?",
    a: "Rapid Build work typically starts within 48 hours of scope lock. Custom Engineering usually starts within 1–2 weeks after proposal approval.",
  },
  {
    q: "What happens after launch?",
    a: "You can move into Engineering Retainer for product iteration or Growth Engine for traffic and conversion compounding, depending on your immediate priority.",
  },
];

function PricingCard({ offer }: { offer: Offer }) {
  const [firstInclude, ...otherIncludes] = offer.includes;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[22px] border p-6 sm:p-7",
        "transition-all duration-300",
        offer.featured
          ? "border-accent/30 bg-[rgba(200,255,0,0.03)] shadow-[0_0_0_1px_rgba(200,255,0,0.08)_inset,0_14px_42px_rgba(0,0,0,0.25)]"
          : "border-white/[0.08] bg-white/[0.015] shadow-[0_1px_0_rgba(255,255,255,0.02)_inset,0_10px_32px_rgba(0,0,0,0.15)]",
      )}
    >
      {offer.featured && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-14 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.09),transparent_70%)]" />
        </div>
      )}

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/80">{offer.eyebrow}</p>
        <h3 className="mt-3 font-display text-[clamp(24px,3.2vw,30px)] font-bold tracking-[-0.02em] text-white">{offer.displayName ?? offer.name}</h3>

        <div className="mt-5 flex items-end gap-2">
          <span className="font-display text-[clamp(30px,4vw,38px)] font-black leading-none tracking-[-0.04em] text-white">{offer.price}</span>
          {offer.unit && <span className="pb-1 font-mono text-[12px] text-white/45">{offer.unit}</span>}
        </div>

        <p className="mt-3 text-[14px] leading-[1.7] text-body">{offer.valueProp}</p>
      </div>

      <div className="mt-7 space-y-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-white/35">Ideal for</p>
          <p className="mt-2 text-[13px] leading-[1.7] text-white/70">{offer.idealFor}</p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-white/35">What’s included</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/[0.1] bg-white/[0.03] px-2.5 py-[4px] text-[11px] text-white/80">{firstInclude}</span>
            {otherIncludes.map((item) => (
              <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-[4px] text-[11px] text-dim">
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="font-mono text-[11px] leading-[1.65] text-dim">{offer.billing}</p>
      </div>

      <div className="mt-auto pt-8">
        <Link
          href="/contact"
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[13px] font-semibold transition-all duration-200",
            offer.featured
              ? "bg-accent text-surface-0 hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(200,255,0,0.18)]"
              : "border border-white/[0.14] bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-white/[0.22] hover:bg-white/[0.05]",
          )}
        >
          {offer.cta} <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}

function PricingGroup({ title, offers, delay = 0 }: { title: string; offers: Offer[]; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <section className="mt-12 sm:mt-16">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-[13px] font-medium tracking-[0.02em] text-white/78 sm:text-[14px]">{title}</p>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent sm:ml-6 sm:block" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {offers.map((offer, index) => (
            <Reveal key={offer.id} delay={delay + 0.04 * (index + 1)}>
              <PricingCard offer={offer} />
            </Reveal>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function PricingFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="mt-16 sm:mt-20">
      <Reveal>
        <div className="mx-auto max-w-[880px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent/80">FAQ</p>
          <h3 className="mt-3 font-display text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.03em] text-white">Questions before you commit</h3>
          <div className="mt-6 space-y-2.5">
            {pricingFaqs.map((item, i) => {
              const isOpen = i === open;

              return (
                <div
                  key={item.q}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-white/[0.012] transition-colors duration-200",
                    isOpen ? "border-accent/20" : "border-white/[0.07] hover:border-white/[0.12]",
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6 sm:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[14px] font-semibold leading-[1.5] text-white sm:text-[15px]">{item.q}</span>
                    <ChevronDown className={cn("h-4 w-4 flex-shrink-0 text-dim transition-transform duration-250", isOpen && "rotate-180 text-accent")} />
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <p className="overflow-hidden px-5 pb-5 text-[14px] leading-[1.75] text-body sm:px-6">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <span className="section-label">Investment</span>
            <h2 className="mt-6 font-display text-[clamp(32px,5vw,58px)] font-extrabold leading-[1.03] tracking-[-0.045em] text-white">
              Choose the engagement that fits your stage
            </h2>
            <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.75] text-body sm:text-[16px]">
              From fixed-scope launches to ongoing engineering and growth, every engagement is structured for clarity, speed, and measurable outcomes.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-8 grid max-w-[980px] gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.012] p-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.015] px-3 py-2">
                <item.icon size={13} className="text-accent/60" />
                <span className="text-[12px] text-white/70">{item.text}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <PricingGroup title="For launches, redesigns, and new products" offers={buildOffers} delay={0.08} />
        <PricingGroup title="For post-launch optimization and ongoing momentum" offers={growthOffers} delay={0.14} />

        <Reveal delay={0.2}>
          <section className="mt-14 sm:mt-18">
            <div className="rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-7 sm:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-[620px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent/80">Estimator</p>
                  <h3 className="mt-3 font-display text-[clamp(24px,3.2vw,34px)] font-bold tracking-[-0.03em] text-white">Need a tighter number? Estimate your project before you commit.</h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-body sm:text-[15px]">
                    Use the calculator to get an instant range for websites, product builds, e-commerce, and SaaS work. It’s fast, practical, and designed to help you plan.
                  </p>
                </div>
                <Link href="/tools/website-cost-calculator" className="btn-v w-full justify-center md:w-auto">
                  Open cost calculator <ArrowRight size={13} />
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "60-second estimate",
                  "No long form",
                  "Websites, SaaS, e-commerce",
                ].map((chip) => (
                  <span key={chip} className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-[3px] text-[10px] text-dim">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.24}>
          <section className="mt-10">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.012] p-6 sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent/80">Selected outcomes</p>
                <span className="text-[11px] text-white/40">Real shipped work</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {outcomes.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group rounded-xl border border-white/[0.08] bg-white/[0.015] px-4 py-3 transition-all duration-200 hover:border-accent/20 hover:bg-accent/[0.02]"
                  >
                    <p className="text-[14px] font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-[13px] leading-[1.6] text-body">{item.summary}</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-accent/80">{item.metric} <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" /></p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.28}>
          <section className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.01] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles size={13} className="text-accent/70" />
              <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent/80">How engagements work</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { step: "01", title: "Strategy / scope", icon: Rocket },
                { step: "02", title: "Proposal / pricing", icon: Gauge },
                { step: "03", title: "Build / iterate / grow", icon: Wrench },
              ].map((item) => (
                <div key={item.step} className="rounded-xl border border-white/[0.06] bg-white/[0.015] px-4 py-4">
                  <div className="flex items-center gap-2">
                    <item.icon size={13} className="text-accent/70" />
                    <span className="font-mono text-[10px] text-dim">STEP {item.step}</span>
                  </div>
                  <p className="mt-2 text-[14px] font-medium text-white/85">{item.title}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <PricingFAQ />

        <Reveal delay={0.32}>
          <section className="mt-14 rounded-2xl border border-accent/20 bg-accent/[0.03] px-6 py-9 text-center sm:mt-16 sm:px-8">
            <p className="font-display text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.03em] text-white">Not sure which engagement fits? Book a strategy call.</p>
            <p className="mx-auto mt-3 max-w-[640px] text-[14px] leading-[1.75] text-body sm:text-[15px]">We’ll align scope, budget, and sequencing so you know exactly what to build first.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-v w-full justify-center sm:w-auto">Book strategy call <ArrowRight size={13} /></Link>
              <Link href="/work" className="btn-o w-full justify-center sm:w-auto">View case studies</Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/55">
              <span className="inline-flex items-center gap-1.5"><Check size={12} className="text-accent/70" /> Senior engineers only</span>
              <span className="inline-flex items-center gap-1.5"><Check size={12} className="text-accent/70" /> Clear milestones</span>
              <span className="inline-flex items-center gap-1.5"><Check size={12} className="text-accent/70" /> Full ownership</span>
            </div>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
