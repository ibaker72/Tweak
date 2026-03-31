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
    name: "Business Websites & Support",
    audience: "For service businesses",
    price: "Starting at $2,500",
    priceNote: "Custom website projects for service businesses that need a stronger online presence.",
    summary:
      "For dealerships, restaurants, insurance agencies, and service businesses that need a better website and optional ongoing support.",
    features: [
      "Custom website design",
      "Mobile-first build",
      "SEO foundation",
      "Speed and performance setup",
      "Ongoing edits and support available",
    ],
    ctaLabel: "Start a Website Project",
    ctaHref: "/contact?tier=Business%20Websites%20%26%20Support",
    featured: true,
    badge: "Most Popular",
    icon: Globe,
  },
  {
    tab: "business",
    name: "SEO & Growth Retainer",
    audience: "For growth-focused teams",
    price: "Starting at $1,500/mo",
    priceNote: "Monthly growth support for businesses that want more traffic and better conversion.",
    summary:
      "For businesses that already have a site and want ongoing SEO, content planning, and conversion improvements.",
    features: [
      "Technical SEO audits",
      "On-page improvements",
      "Search-driven content roadmap",
      "Local SEO support",
      "Conversion and UX improvements",
    ],
    ctaLabel: "Scale with SEO",
    ctaHref: "/contact?tier=SEO%20%26%20Growth%20Retainer",
    icon: TrendingUp,
  },
  {
    tab: "product",
    name: "Custom Engineering",
    audience: "For advanced technical builds",
    price: "Starting at $8,000",
    priceNote: "Custom scoped project",
    summary:
      "For teams that need advanced software, integrations, automation, or internal systems built properly.",
    features: [
      "Custom full-stack systems",
      "Custom APIs and integrations",
      "AI and automation workflows",
      "Infrastructure planning",
      "Senior-led delivery",
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
    audience: "For product teams and startups",
    price: "Starting at $5,000",
    priceNote: "Fixed-scope product builds",
    summary:
      "For startups and teams building MVPs, dashboards, portals, and internal software.",
    features: [
      "MVP and SaaS builds",
      "Client or admin portals",
      "Auth and payments",
      "Database architecture",
      "Scalable V1 architecture",
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
    <li className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-body sm:text-[13.5px]">
      <Check
        className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", featured ? "text-accent" : "text-dim")}
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
          "group relative flex h-full flex-col rounded-2xl border p-5 transition-all duration-300 hover:border-white/[0.12] sm:p-6 lg:p-6",
          tier.featured ? "border-accent/[0.15]" : "border-white/[0.06]"
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

          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{tier.audience}</p>

            <h3 className="mt-2.5 font-display text-[21px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[23px]">
              {tier.name}
            </h3>

            <div className="mt-3">
              <p className="text-[30px] font-bold tracking-tight text-white sm:text-[34px]">{tier.price}</p>
              <p className="mt-1.5 text-[12.5px] leading-[1.55] text-body sm:text-[13px]">{tier.priceNote}</p>
            </div>

            <p className="mt-3.5 max-w-[48ch] text-[13px] leading-[1.65] text-body sm:text-[13.5px]">{tier.summary}</p>
          </div>

          <ul className="mt-4 space-y-2 border-t border-white/[0.05] pt-4">
            {tier.features.map((feature) => (
              <TierFeatureItem key={feature} text={feature} featured={tier.featured} />
            ))}
          </ul>

          <div className="mt-5">
            <Link
              href={tier.ctaHref}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 sm:text-[13.5px]",
                tier.featured ? "btn-v justify-center" : "btn-o justify-center"
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
    <section id="pricing" className="relative py-14 sm:py-18">
      <div className="wrap">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-8 sm:mb-10">
              <span className="section-label">Pricing</span>
              <h2 className="mt-3.5 font-display text-[clamp(31px,4.1vw,48px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
                Clear offers. Senior delivery.
              </h2>
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.65] text-body sm:text-[14.5px]">
                Choose the path that fits your business now, then expand as your needs grow.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mb-7 sm:mb-8">
              <div
                role="tablist"
                aria-label="Pricing categories"
                className="inline-flex rounded-xl border border-white/[0.06] bg-white/[0.015] p-1"
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
                        "relative overflow-hidden rounded-lg px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-[13px]",
                        isActive ? "text-surface-0" : "text-dim hover:text-white/70"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pricing-tab-pill"
                          className="absolute inset-0 rounded-lg bg-accent"
                          transition={{ type: "spring", stiffness: 280, damping: 30 }}
                        />
                      )}

                      <span className="relative z-10 block">{tab.label}</span>
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
                  className="mt-2.5 max-w-[640px] text-[12.5px] leading-[1.55] text-body sm:text-[13px]"
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
              className="grid grid-cols-1 gap-4 lg:grid-cols-2"
            >
              {activeTiers.map((tier, index) => (
                <TierCard key={tier.name} tier={tier} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.12}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.015] px-3.5 py-1.5"
                  style={{ boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.04)" }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-[12px] font-medium text-white/45">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-5 max-w-[620px]">
              <p className="text-[13.5px] leading-[1.65] text-body">
                Need a website, support, SEO, and upgrades together? We can scope a blended monthly
                engagement around your business.
              </p>

              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-accent transition hover:text-accent/80"
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
