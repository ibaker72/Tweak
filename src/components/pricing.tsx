"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";

type PricingTabId = "business-growth" | "software-builds";

type PricingPlan = {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
};

type PricingTab = {
  id: PricingTabId;
  label: string;
  eyebrow: string;
  title: string;
  blurb: string;
  plans: PricingPlan[];
};

const pricingTabs: PricingTab[] = [
  {
    id: "business-growth",
    label: "Business Websites & Growth",
    eyebrow: "For service businesses & local brands",
    title: "Launch a high-converting digital growth engine",
    blurb:
      "Built for businesses that need a premium website, clear positioning, and ongoing lead generation support.",
    plans: [
      {
        name: "Business Websites & WaaS",
        price: "From $2,500",
        description:
          "Premium conversion-focused websites designed to rank, convert, and be easy to update as your business grows.",
        ctaLabel: "Start your website project",
        ctaHref: "/contact",
        highlight: true,
        badge: "Most Popular",
        features: [
          "Custom UX/UI design in your brand style",
          "Fast, SEO-ready Next.js development",
          "Conversion-focused copy structure",
          "Analytics, tracking, and lead capture setup",
          "Launch support + post-launch refinement",
        ],
      },
      {
        name: "SEO & Growth",
        price: "From $3,000",
        cadence: "/mo",
        description:
          "A monthly growth system for businesses ready to scale qualified traffic and increase conversion rate.",
        ctaLabel: "Scale with growth retainer",
        ctaHref: "/contact",
        features: [
          "Technical SEO fixes and architecture",
          "Landing page production and testing",
          "Content + keyword expansion strategy",
          "CRO experiments and monthly reporting",
          "Roadmap prioritization with clear KPIs",
        ],
      },
    ],
  },
  {
    id: "software-builds",
    label: "Software & Custom Builds",
    eyebrow: "For startups & ambitious teams",
    title: "Ship reliable software with senior product engineering",
    blurb:
      "For founders and teams building SaaS, internal tools, and custom platforms that need speed with product quality.",
    plans: [
      {
        name: "MVP & Product Builds",
        price: "From $8,000",
        description:
          "End-to-end product execution from architecture to polished frontend and production release.",
        ctaLabel: "Plan your build",
        ctaHref: "/contact",
        highlight: true,
        badge: "Most Popular",
        features: [
          "Product strategy + technical discovery",
          "Full-stack implementation with scalable foundations",
          "Design system, dashboard, and core flows",
          "QA, launch, and deployment setup",
          "Hand-off docs + team enablement",
        ],
      },
      {
        name: "Ongoing Engineering",
        price: "From $4,500",
        cadence: "/mo",
        description:
          "Dedicated monthly capacity for feature velocity, maintenance, and performance optimization.",
        ctaLabel: "Discuss monthly support",
        ctaHref: "/contact",
        features: [
          "Priority feature shipping cycles",
          "Tech debt cleanup and refactors",
          "Performance and reliability improvements",
          "Rapid bug triage and resolution",
          "Weekly async updates + roadmap alignment",
        ],
      },
    ],
  },
];

function CheckIcon() {
  return (
    <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#ccff00]/15 ring-1 ring-[#ccff00]/40 shadow-[0_0_12px_rgba(204,255,0,0.35)]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 text-[#ccff00]" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export function Pricing() {
  const [activeTab, setActiveTab] = useState<PricingTabId>("business-growth");

  const currentTab = useMemo(() => pricingTabs.find((tab) => tab.id === activeTab) ?? pricingTabs[0], [activeTab]);

  return (
    <section id="pricing" className="bg-zinc-950 py-16 sm:py-20">
      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-300">
              Pricing
            </span>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Premium execution. Clear investment.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
              Choose the engagement that matches your stage. Every plan is designed to ship fast, look world-class, and drive measurable growth.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-8 max-w-5xl">
            <div className="mx-auto flex w-full max-w-2xl rounded-full bg-zinc-800/50 p-1 ring-1 ring-white/5">
              <div className="relative grid w-full grid-cols-2 gap-1">
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-y-0 w-[calc(50%-2px)] rounded-full bg-zinc-700/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                    activeTab === "business-growth" ? "left-0" : "left-1/2",
                  )}
                />
                {pricingTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative z-10 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
                        isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200",
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="mx-auto inline-flex items-center rounded-md border border-[#ccff00]/30 bg-[#ccff00]/10 px-3 py-1 text-[11px] tracking-tight text-[#ccff00]">{currentTab.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{currentTab.title}</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">{currentTab.blurb}</p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-stretch">
              {currentTab.plans.map((plan) => {
                const isPopular = Boolean(plan.highlight);

                return (
                  <article
                    key={plan.name}
                    className={cn(
                      "relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/70 to-zinc-900/40 p-6 backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-white/20",
                      isPopular
                        ? "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                        : "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
                    )}
                  >
                    {isPopular && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-[#ccff00]/10 blur-3xl"
                      />
                    )}
                    {plan.badge && (
                      <span className="absolute right-5 top-5 rounded-md border border-[#ccff00]/30 bg-[#ccff00]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ccff00]">
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      <p className="text-sm font-medium text-zinc-200">{plan.name}</p>
                      <div className="mt-4 flex items-end gap-1">
                        <p className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl">{plan.price}</p>
                        {plan.cadence && <p className="pb-1 text-sm text-zinc-400">{plan.cadence}</p>}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-zinc-400">{plan.description}</p>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-zinc-400">
                          <CheckIcon />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-2">
                      <Link
                        href={plan.ctaHref}
                        className={cn(
                          "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                          isPopular
                            ? "bg-[#ccff00] text-zinc-950 hover:bg-[#d8ff33] hover:shadow-[0_0_15px_rgba(204,255,0,0.4)]"
                            : "border border-zinc-700 bg-transparent text-zinc-100 hover:border-[#ccff00]/60 hover:bg-[#ccff00] hover:text-zinc-950 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)]",
                        )}
                      >
                        {plan.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
