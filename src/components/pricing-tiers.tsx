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
    <li className="flex items-start gap-3 text-[13px] leading-relaxed text-body sm:text-[14px]">
      <Check
        className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-accent" : "text-dim")}
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
          "group relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:border-white/[0.12] lg:p-8",
          tier.featured
            ? "border-accent/[0.15]"
            : "border-white/[0.06]"
        )}
        style={{
          background: tier.featured ? "rgba(200,255,0,0.015)" : "rgba(255,255,255,0.012)",
          boxShadow: tier.featured
            ? "0 1px 0 rgba(200,255,0,0.03) inset"
            : "0 1px 0 rgba(255,255,255,0.02) inset",
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <span
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg border",
                tier.featured
                  ? "border-accent/15 bg-accent/[0.05]"
                  : "border-white/[0.08] bg-white/[0.03]"
              )}
            >
              <TierIcon
                className={cn("h-4 w-4", tier.featured ? "text-accent" : "text-white/60")}
                strokeWidth={2}
              />
            </span>

            {tier.badge && (
              <span className="inline-flex rounded-full border border-accent/[0.15] bg-accent/[0.06] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-accent/80">
                {tier.badge}
              </span>
            )}
          </div>

          <div className="mt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
              {tier.audience}
            </p>

            <h3 className="mt-3 font-display text-[22px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[24px]">
              {tier.name}
            </h3>

            <div className="mt-4">
              <p className="text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
                {tier.price}
              </p>
              <p className="mt-1.5 text-[13px] text-body">{tier.priceNote}</p>
            </div>

            <p className="mt-4 max-w-[44ch] text-[13px] leading-[1.75] text-body sm:text-[14px]">
              {tier.summary}
            </p>
          </div>

          <ul className="mt-5 space-y-2.5 border-t border-white/[0.05] pt-5">
            {tier.features.map((feature) => (
              <TierFeatureItem key={feature} text={feature} featured={tier.featured} />
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <Link
              href={tier.ctaHref}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold transition-all duration-200 sm:text-[14px]",
                tier.featured
                  ? "btn-v justify-center"
                  : "btn-o justify-center"
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
      className="relative py-20 sm:py-24"
    >
      <div className="wrap">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 sm:mb-16">
              <span className="section-label">Pricing</span>
              <h2 className="mt-5 font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Clear offers. Senior delivery.
              </h2>
              <p className="mt-4 max-w-[500px] text-[15px] leading-[1.75] text-body">
                Choose the path that fits your business now, then expand as your needs grow.
              </p>
            </div>
          </Reveal>

          {/* Tab switcher — minimal pill toggle */}
          <Reveal delay={0.06}>
            <div className="mb-10">
              <div
                role="tablist"
                aria-label="Pricing categories"
                className="inline-flex rounded-full border border-white/[0.06] bg-white/[0.015] p-1"
              >
                {pricingTabs.map((tab) => {
                  const isActive = tab.id === activeTab;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      suppressHydrationWarning
                      role="tab"
                      aria-selected={isActive}
                      aria-pressed={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative overflow-hidden rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-200",
                        isActive ? "text-surface-0" : "text-dim hover:text-white/70"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pricing-tab-pill"
                          className="absolute inset-0 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 280, damping: 30 }}
                        />
                      )}

                      <span className="relative z-10 block">
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
                  className="mt-3 max-w-[600px] text-[13px] leading-relaxed text-body sm:text-[14px]"
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
              className="grid grid-cols-1 gap-5 lg:grid-cols-2"
            >
              {activeTiers.map((tier, index) => (
                <TierCard key={tier.name} tier={tier} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.12}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.015] px-4 py-2"
                  style={{ boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.04)" }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-[12px] font-medium text-white/45">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 max-w-[600px]">
              <p className="text-[14px] leading-[1.75] text-body">
                Need a website, support, SEO, and upgrades together? We can scope a blended monthly
                engagement around your business.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-accent transition hover:text-accent/80"
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
