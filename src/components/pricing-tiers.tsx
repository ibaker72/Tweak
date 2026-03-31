"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Blocks, Check, Cpu, Globe, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";
import type { LucideIcon } from "lucide-react";

type PricingTabId = "business" | "product";

type PricingTab = {
  id: PricingTabId;
  label: string;
  description: string;
};

type StudioTier = {
  tab: PricingTabId;
  name: string;
  audience: string;
  price: string;
  priceNote: string;
  summary: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
  icon: LucideIcon;
};

const pricingTabs: PricingTab[] = [
  {
    id: "business",
    label: "Business Websites & Growth",
    description:
      "For dealerships, restaurants, insurance agencies, and service businesses that need a better website and ongoing support.",
  },
  {
    id: "product",
    label: "Software & Custom Builds",
    description:
      "For startups and teams that need portals, dashboards, internal tools, SaaS products, or deeper custom systems.",
  },
];

const studioPricingTiers: StudioTier[] = [
  {
    tab: "business",
    name: "Business Websites & WaaS",
    audience: "For local businesses and service brands",
    price: "From $2,500",
    priceNote: "Or support retainers from $1,500/mo",
    summary:
      "High-end websites with updates, maintenance, SEO foundations, and ongoing support.",
    features: [
      "Custom website design",
      "Mobile-first build",
      "Ongoing edits and support",
      "Maintenance and updates",
      "SEO foundation",
    ],
    ctaLabel: "Start a Website Project",
    ctaHref: "/contact?tier=Business%20Websites%20%26%20WaaS",
    featured: true,
    badge: "Most Popular",
    icon: Globe,
  },
  {
    tab: "business",
    name: "SEO & Growth",
    audience: "For businesses that want more traffic and better conversion",
    price: "From $3,000/mo",
    priceNote: "Monthly growth engagement",
    summary:
      "Technical SEO, content direction, site improvements, and ongoing growth support.",
    features: [
      "Technical SEO audits",
      "On-page improvements",
      "Content strategy",
      "Conversion improvements",
      "Performance and UX fixes",
    ],
    ctaLabel: "Scale with SEO",
    ctaHref: "/contact?tier=SEO%20%26%20Growth",
    icon: TrendingUp,
  },
  {
    tab: "product",
    name: "Custom Engineering",
    audience: "For larger builds, deeper integrations, and AI workflows",
    price: "From $25,000",
    priceNote: "Custom scoped engagement",
    summary:
      "Senior-led engineering for teams that need deep technical execution and clear delivery.",
    features: [
      "Complex web applications",
      "Custom APIs and integrations",
      "AI and automation systems",
      "Infrastructure planning",
      "100% code ownership",
    ],
    ctaLabel: "Discuss Custom Engineering",
    ctaHref: "/contact?tier=Custom%20Engineering",
    featured: true,
    badge: "Recommended",
    icon: Cpu,
  },
  {
    tab: "product",
    name: "SaaS & Internal Tools",
    audience: "For startups and teams building real software products",
    price: "From $10,000",
    priceNote: "Fixed-scope product builds",
    summary:
      "Full-stack product development for portals, dashboards, internal tools, and MVPs.",
    features: [
      "MVP and SaaS builds",
      "Client or admin portals",
      "Auth and payments",
      "Database architecture",
      "Production-ready foundations",
    ],
    ctaLabel: "Book a Strategy Call",
    ctaHref: "/contact?tier=SaaS%20%26%20Internal%20Tools",
    icon: Blocks,
  },
];

const trustPoints = [
  "Direct with senior engineer",
  "Clear scope upfront",
  "Code ownership included",
  "Fast onboarding",
];

function TierFeatureItem({ text, featured }: { text: string; featured?: boolean }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
      <Check
        className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-lime-300" : "text-zinc-500")}
        strokeWidth={2.4}
      />
      <span>{text}</span>
    </li>
  );
}

function TierCard({ tier, index }: { tier: StudioTier; index: number }) {
  const TierIcon = tier.icon;

  return (
    <Reveal delay={index * 0.05}>
      <motion.article
        aria-label={`${tier.name} pricing`}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[24px] border p-6 md:p-7",
          "bg-white/[0.02] transition-all duration-300 hover:-translate-y-1",
          tier.featured
            ? "border-lime-400/25 bg-[linear-gradient(180deg,rgba(163,230,53,0.08),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(163,230,53,0.04),0_20px_60px_rgba(163,230,53,0.06)]"
            : "border-white/10 hover:border-white/16"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-px",
              tier.featured ? "bg-lime-300/45" : "bg-white/10"
            )}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_42%)]" />
          {tier.featured && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(163,230,53,0.09),transparent_38%)]" />
          )}
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <span
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-2xl border",
                tier.featured
                  ? "border-lime-300/20 bg-lime-300/10"
                  : "border-white/10 bg-white/[0.04]"
              )}
            >
              <TierIcon
                className={cn("h-5 w-5", tier.featured ? "text-lime-300" : "text-white")}
                strokeWidth={2}
              />
            </span>

            {tier.badge && (
              <span className="inline-flex rounded-full border border-lime-400/25 bg-lime-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-lime-200">
                {tier.badge}
              </span>
            )}
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {tier.audience}
            </p>

            <h3 className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[32px]">
              {tier.name}
            </h3>

            <div className="mt-5">
              <p className="text-4xl font-semibold tracking-tight text-white sm:text-[46px]">
                {tier.price}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{tier.priceNote}</p>
            </div>

            <p className="mt-5 max-w-[44ch] text-sm leading-7 text-zinc-400">
              {tier.summary}
            </p>
          </div>

          <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
            {tier.features.map((feature) => (
              <TierFeatureItem key={feature} text={feature} featured={tier.featured} />
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <Link
              href={tier.ctaHref}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
                tier.featured
                  ? "bg-lime-400 text-zinc-950 hover:bg-lime-300 focus-visible:ring-lime-300/60"
                  : "border border-white/12 bg-transparent text-white hover:border-white/20 hover:bg-white/[0.04] focus-visible:ring-white/40"
              )}
            >
              {tier.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function PricingTiers() {
  const [activeTab, setActiveTab] = useState<PricingTabId>("business");

  const activeTabMeta = useMemo(
    () => pricingTabs.find((tab) => tab.id === activeTab) ?? pricingTabs[0],
    [activeTab]
  );

  const activeTiers = useMemo(
    () => studioPricingTiers.filter((tier) => tier.tab === activeTab),
    [activeTab]
  );

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#0a0a0a] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(163,230,53,0.07),transparent_30%),radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.05),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.012),transparent)]" />

      <div className="wrap relative">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-300">
                Pricing
              </span>

              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Clear offers. Senior delivery.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Choose the path that fits your business now, then expand as your needs grow.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mx-auto mt-10 max-w-4xl">
              <div
                role="tablist"
                aria-label="Pricing categories"
                className="grid grid-cols-1 gap-2 rounded-[22px] border border-white/10 bg-white/[0.03] p-2 backdrop-blur-md sm:grid-cols-2"
              >
                {pricingTabs.map((tab) => {
                  const isActive = tab.id === activeTab;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-pressed={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative overflow-hidden rounded-[18px] px-5 py-3.5 text-left transition-all duration-200",
                        isActive ? "text-zinc-950" : "text-zinc-300 hover:text-white"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pricing-tab-pill"
                          className="absolute inset-0 rounded-[18px] bg-lime-400"
                          transition={{ type: "spring", stiffness: 280, damping: 30 }}
                        />
                      )}

                      <span className="relative z-10 block text-sm font-semibold tracking-tight">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeTabMeta.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-zinc-500 sm:text-[15px]"
                >
                  {activeTabMeta.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </Reveal>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-2"
            >
              {activeTiers.map((tier, index) => (
                <TierCard key={tier.name} tier={tier} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.12}>
            <div className="mx-auto mt-7 grid max-w-5xl grid-cols-1 gap-3 rounded-[22px] border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-2 lg:grid-cols-4">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-lime-300" />
                  <span className="text-sm text-zinc-300">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mx-auto mt-7 max-w-2xl text-center">
              <p className="text-sm leading-relaxed text-zinc-500 sm:text-base">
                Need a website, support, SEO, and upgrades together? We can scope a blended monthly
                engagement around your business.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-lime-300 transition hover:text-lime-200"
              >
                Talk through your scope
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}