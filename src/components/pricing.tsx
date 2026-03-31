"use client";

import { KeyboardEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";

type PricingTabId = "rapid-build" | "custom-engineering" | "growth-seo";

type PricingTab = {
  id: PricingTabId;
  tabLabel: string;
  eyebrow: string;
  title: string;
  price: string;
  billingModel: string;
  valueProp: string;
  description: string;
  idealFor: string[];
  includes: string[];
  billingNote: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  quickProof?: string;
  continuation?: {
    title: string;
    description: string;
    points: string[];
    billing: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

const pricingTabs: PricingTab[] = [
  {
    id: "rapid-build",
    tabLabel: "Rapid Build",
    eyebrow: "Fixed-scope implementation",
    title: "Rapid Build",
    price: "$2,500–$8,000",
    billingModel: "Fixed scope",
    valueProp: "Fast implementation when scope is clear and decisions are ready.",
    description: "Built for teams that already know what they want and need execution without discovery overhead.",
    idealFor: ["Landing pages", "Marketing sites", "Redesigns with approved direction", "Clearly scoped website work"],
    includes: ["Production-ready frontend implementation", "Responsive QA and polish", "Focused revision rounds by scope", "Launch support as applicable"],
    billingNote: "Paid upfront or structured split depending on scope.",
    ctaLabel: "Get a fixed quote",
    ctaHref: "/contact",
    secondaryCtaLabel: "View shipped work",
    secondaryCtaHref: "/work",
    quickProof: "Typical kickoff: within 48 hours after scope lock.",
  },
  {
    id: "custom-engineering",
    tabLabel: "Custom Engineering",
    eyebrow: "Flagship engagement",
    title: "Custom Engineering",
    price: "$8,000–$30,000+",
    billingModel: "Milestone billing",
    valueProp: "Strategy, architecture, and full-cycle delivery for complex products.",
    description: "Designed for high-leverage builds where product strategy and technical execution need to move together.",
    idealFor: ["New platforms", "Complex MVPs", "Internal tools and portals", "Product rebuilds", "Automation-heavy systems"],
    includes: ["Discovery and technical planning", "Architecture and full-stack implementation", "QA, launch support, and handoff", "Scoped milestones and delivery structure"],
    billingNote: "Example structure: 40% start / 30% midpoint / 30% before launch.",
    ctaLabel: "Book a strategy call",
    ctaHref: "/contact",
    secondaryCtaLabel: "View case studies",
    secondaryCtaHref: "/work",
    quickProof: "Best fit when product decisions and engineering complexity are both high-stakes.",
    continuation: {
      title: "Continue after launch · Engineering Retainer",
      description: "Ongoing support for teams that want dependable weekly shipping velocity.",
      points: ["Feature improvements", "Bug fixes and maintenance", "Performance optimization", "Priority support"],
      billing: "Monthly billing with capacity aligned to roadmap priorities.",
      ctaLabel: "Discuss ongoing support",
      ctaHref: "/contact",
    },
  },
  {
    id: "growth-seo",
    tabLabel: "Growth / SEO",
    eyebrow: "Acquisition + conversion",
    title: "Growth Engine",
    price: "$2,000–$4,500 / month",
    billingModel: "Monthly engagement",
    valueProp: "An ongoing growth system built around SEO, landing pages, and conversion optimization.",
    description: "Focused on post-launch momentum through search visibility, conversion gains, and disciplined experimentation.",
    idealFor: [
      "Businesses needing more qualified traffic",
      "Service businesses targeting stronger organic lead flow",
      "Teams improving conversion performance",
      "Sites ready for SEO expansion and experimentation",
    ],
    includes: ["SEO foundation and technical fixes", "Landing page creation and expansion", "CRO improvements", "Analytics, reporting, and experiment cadence"],
    billingNote: "3-month minimum recommended for measurable compounding.",
    ctaLabel: "Explore growth options",
    ctaHref: "/contact",
    secondaryCtaLabel: "See growth outcomes",
    secondaryCtaHref: "/work",
    quickProof: "Best results come from consistent iteration over consecutive monthly cycles.",
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
    a: "Rapid Build is fixed-scope implementation when direction is already set. Custom Engineering adds discovery, architecture, and deeper product execution for more complex outcomes.",
  },
  {
    q: "What’s included in Growth / SEO?",
    a: "Growth Engine covers SEO foundations, technical SEO fixes, landing page expansion, CRO improvements, and monthly analytics with experiment direction.",
  },
  {
    q: "How does billing work?",
    a: "Rapid Build is fixed-rate by scope. Custom Engineering is milestone-based. Growth Engine and Engineering Retainer run on monthly billing with clear deliverables.",
  },
  {
    q: "What happens after launch?",
    a: "After launch, you can continue with Engineering Retainer for product velocity or Growth Engine for acquisition and conversion momentum.",
  },
  {
    q: "Do you offer ongoing engineering support?",
    a: "Yes. Engineering Retainer is available as a continuation path after Custom Engineering for iterative feature work, maintenance, and priority support.",
  },
];

function PricingTabTrigger({
  tab,
  isActive,
  controls,
  onSelect,
}: {
  tab: PricingTab;
  isActive: boolean;
  controls: string;
  onSelect: () => void;
}) {
  return (
    <button
      id={`pricing-tab-${tab.id}`}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={controls}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
      className={cn(
        "relative min-w-[150px] rounded-xl border px-4 py-2.5 text-left transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/65 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
        isActive
          ? "border-accent/35 bg-accent/[0.10] text-white"
          : "border-white/[0.08] bg-transparent text-white/70 hover:border-white/[0.14] hover:bg-white/[0.03] hover:text-white/90",
      )}
    >
      <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-white/45">Engagement</span>
      <span className="mt-0.5 block text-[13px] font-semibold">{tab.tabLabel}</span>
    </button>
  );
}

function PricingTabs({ tabs, activeTab, onTabChange }: { tabs: PricingTab[]; activeTab: PricingTabId; onTabChange: (tab: PricingTabId) => void }) {
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    if (event.key === "Home") {
      onTabChange(tabs[0].id);
      return;
    }

    if (event.key === "End") {
      onTabChange(tabs[tabs.length - 1].id);
      return;
    }

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + direction + tabs.length) % tabs.length;
    onTabChange(tabs[nextIndex].id);
  };

  return (
    <div
      role="tablist"
      aria-label="Pricing engagement types"
      onKeyDown={onKeyDown}
      className="mx-auto mt-6 flex w-full max-w-[740px] gap-2 overflow-x-auto rounded-2xl border border-white/[0.09] bg-[#0b0d10] p-2"
    >
      {tabs.map((tab) => (
        <PricingTabTrigger
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          controls={`pricing-panel-${tab.id}`}
          onSelect={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  );
}

function PricingTabPanel({ tab }: { tab: PricingTab }) {
  return (
    <article
      id={`pricing-panel-${tab.id}`}
      role="tabpanel"
      aria-labelledby={`pricing-tab-${tab.id}`}
      className={cn(
        "mt-4 rounded-2xl border border-white/[0.09] bg-white/[0.015] p-4 sm:p-5 lg:p-6",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 duration-200",
      )}
    >
      <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/80">{tab.eyebrow}</p>
          <h3 className="mt-2 font-display text-[clamp(26px,3.1vw,36px)] font-bold tracking-[-0.03em] text-white">{tab.title}</h3>
          <p className="mt-2 text-[14px] font-medium text-white/90">{tab.valueProp}</p>
          <p className="mt-2 text-[14px] leading-[1.65] text-body">{tab.description}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-white/45">Ideal for</p>
              <ul className="mt-2 space-y-1.5">
                {tab.idealFor.map((item) => (
                  <li key={item} className="text-[13px] leading-[1.5] text-white/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-white/45">What’s included</p>
              <ul className="mt-2 space-y-1.5">
                {tab.includes.map((item) => (
                  <li key={item} className="inline-flex items-start gap-2 text-[13px] leading-[1.5] text-white/80">
                    <Check size={12} className="mt-0.5 flex-shrink-0 text-accent/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {tab.continuation && (
            <div className="mt-4 rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5 sm:p-4">
              <p className="text-[13px] font-semibold text-white/90">{tab.continuation.title}</p>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-body">{tab.continuation.description}</p>
              <p className="mt-2 text-[12px] leading-[1.5] text-white/70">{tab.continuation.points.join(" · ")}</p>
              <div className="mt-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] text-dim">{tab.continuation.billing}</p>
                <Link href={tab.continuation.ctaHref} className="inline-flex items-center gap-1 text-[12px] font-semibold text-accent/90 hover:text-accent">
                  {tab.continuation.ctaLabel} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-xl border border-white/[0.08] bg-[#090b0d] p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-white/45">Investment</p>
          <p className="mt-2 font-display text-[clamp(27px,3vw,36px)] font-black tracking-[-0.04em] text-white">{tab.price}</p>

          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-white/45">Billing model</dt>
              <dd className="mt-1 text-[13px] text-white/82">{tab.billingModel}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-white/45">Delivery note</dt>
              <dd className="mt-1 text-[13px] leading-[1.55] text-white/82">{tab.billingNote}</dd>
            </div>
            {tab.quickProof && (
              <div>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-white/45">Context</dt>
                <dd className="mt-1 text-[13px] leading-[1.55] text-white/82">{tab.quickProof}</dd>
              </div>
            )}
          </dl>

          <div className="mt-5 space-y-2.5">
            <Link href={tab.ctaHref} className="btn-v w-full justify-center">
              {tab.ctaLabel} <ArrowRight size={13} />
            </Link>
            {tab.secondaryCtaLabel && tab.secondaryCtaHref && (
              <Link href={tab.secondaryCtaHref} className="btn-o w-full justify-center">
                {tab.secondaryCtaLabel}
              </Link>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}

function PricingProofStrip() {
  return (
    <section className="mt-5">
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.01] p-3.5 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/80">Selected outcomes</p>
          <span className="text-[11px] text-white/40">Real shipped work</span>
        </div>
        <div className="grid gap-2.5 md:grid-cols-2">
          {outcomes.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group rounded-lg border border-white/[0.08] bg-white/[0.015] px-3 py-2.5 transition-colors duration-200 hover:border-accent/25 hover:bg-accent/[0.02]"
            >
              <p className="text-[13px] font-semibold text-white">{item.name}</p>
              <p className="mt-0.5 text-[12px] leading-[1.45] text-body">{item.summary}</p>
              <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-accent/80">
                {item.metric} <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingEstimatorMini() {
  return (
    <section className="mt-5">
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.01] p-4 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/80">Estimator</p>
            <p className="mt-1 text-[15px] font-semibold text-white">Need a tighter number? Estimate your project before you commit.</p>
            <p className="mt-1 text-[13px] text-body">Fast calculator for websites, SaaS platforms, and growth-focused builds.</p>
          </div>
          <Link href="/tools/website-cost-calculator" className="btn-o w-full justify-center sm:w-auto">
            Open cost calculator <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PricingFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mt-8 sm:mt-10">
      <div className="mx-auto max-w-[860px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent/80">FAQ</p>
        <h3 className="mt-2 font-display text-[clamp(21px,2.7vw,30px)] font-bold tracking-[-0.025em] text-white">Questions before you commit</h3>

        <div className="mt-4 space-y-2">
          {pricingFaqs.map((item, i) => {
            const isOpen = i === open;

            return (
              <div
                key={item.q}
                className={cn(
                  "overflow-hidden rounded-xl border bg-white/[0.01] transition-colors duration-200",
                  isOpen ? "border-accent/20" : "border-white/[0.08] hover:border-white/[0.14]",
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left sm:px-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-[13px] font-semibold leading-[1.45] text-white sm:text-[14px]">{item.q}</span>
                  <ChevronDown className={cn("h-4 w-4 flex-shrink-0 text-dim transition-transform duration-200", isOpen && "rotate-180 text-accent")} />
                </button>
                <div className="grid transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <p className="overflow-hidden px-4 pb-4 text-[13px] leading-[1.6] text-body sm:px-5">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingFinalCTA() {
  return (
    <section className="mt-8 rounded-2xl border border-accent/20 bg-accent/[0.03] px-5 py-7 text-center sm:mt-10 sm:px-7 sm:py-8">
      <p className="font-display text-[clamp(22px,2.8vw,32px)] font-bold tracking-[-0.03em] text-white">Not sure which engagement fits? Book a strategy call.</p>
      <p className="mx-auto mt-2 max-w-[620px] text-[14px] leading-[1.65] text-body">We’ll align scope, budget, and sequencing so you know exactly what to build first.</p>
      <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
        <Link href="/contact" className="btn-v w-full justify-center sm:w-auto">
          Book strategy call <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}

export function Pricing() {
  const [activeTab, setActiveTab] = useState<PricingTabId>("custom-engineering");

  const currentTab = useMemo(() => pricingTabs.find((tab) => tab.id === activeTab) ?? pricingTabs[1], [activeTab]);

  return (
    <section id="pricing" className="relative py-16 sm:py-20">
      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-[700px] text-center">
            <span className="inline-flex rounded-full border border-white/[0.1] bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
              Pricing
            </span>
            <h2 className="mx-auto mt-4 max-w-[16ch] text-balance font-display text-[clamp(30px,4.4vw,48px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
              Clear pricing for every stage
            </h2>
            <p className="mx-auto mt-3 max-w-[60ch] text-[14px] leading-[1.6] text-body sm:text-[15px]">
              Choose launch work, custom engineering, or monthly growth support. Every option comes with clear scope, fixed pricing where possible, and direct access to the team.
            </p>
            <p className="mx-auto mt-3 max-w-[52ch] text-[12px] leading-[1.55] text-white/58 sm:text-[13px]">
              Most projects start within 5 business days, with clear timing and next steps from day one.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-5 max-w-[1040px] sm:mt-6">
            <PricingTabs tabs={pricingTabs} activeTab={activeTab} onTabChange={setActiveTab} />
            <PricingTabPanel tab={currentTab} />
            <PricingProofStrip />
            <PricingEstimatorMini />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <PricingFAQ />
        </Reveal>

        <Reveal delay={0.16}>
          <PricingFinalCTA />
        </Reveal>
      </div>
    </section>
  );
}
