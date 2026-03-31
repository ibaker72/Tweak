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
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
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
            <div className="mx-auto flex w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/70 p-1.5">
              <div className="relative grid w-full grid-cols-2 gap-1">
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-y-0 w-[calc(50%-2px)] rounded-xl bg-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300",
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
                        "relative z-10 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",
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
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lime-400/80">{currentTab.eyebrow}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{currentTab.title}</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">{currentTab.blurb}</p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {currentTab.plans.map((plan) => {
                const isPopular = Boolean(plan.highlight);

                return (
                  <article
                    key={plan.name}
                    className={cn(
                      "relative flex h-full flex-col rounded-2xl border bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1",
                      isPopular
                        ? "border-lime-400/70 shadow-[0_0_0_1px_rgba(163,230,53,0.35),0_0_40px_-10px_rgba(163,230,53,0.35)] hover:border-lime-300"
                        : "border-zinc-800 hover:border-zinc-600",
                    )}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 right-5 rounded-full border border-lime-300/40 bg-lime-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-lime-300">
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      <p className="text-sm font-medium text-zinc-200">{plan.name}</p>
                      <div className="mt-4 flex items-end gap-1">
                        <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{plan.price}</p>
                        {plan.cadence && <p className="pb-1 text-sm text-zinc-400">{plan.cadence}</p>}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-zinc-400">{plan.description}</p>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
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
                            ? "bg-lime-400 text-zinc-950 hover:bg-lime-300"
                            : "border border-zinc-700 bg-transparent text-zinc-100 hover:border-lime-400/60 hover:bg-lime-400 hover:text-zinc-950",
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
