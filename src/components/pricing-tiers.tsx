"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Blocks, Check, Cpu, Globe, TrendingUp, Crown } from "lucide-react";
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
    priceNote: "Custom website projects for service businesses.",
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
    priceNote: "Monthly growth support for businesses.",
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
    <li className="flex items-start gap-2 text-[11px] leading-[1.5] text-white/75 sm:text-[12.5px]">
      <Check
        className={cn("mt-[2px] h-3 w-3 shrink-0", featured ? "text-accent" : "text-white/40")}
        strokeWidth={3}
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
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "group relative flex h-full flex-col rounded-2xl border p-4 transition-all duration-300 sm:p-5 lg:min-w-0 lg:p-6",
          tier.featured 
            ? "border-accent/30 bg-white/[0.02] hover:border-accent/50 hover:shadow-[0_4px_20px_-10px_rgba(200,255,0,0.15)]" 
            : "border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_4px_20px_-10px_rgba(255,255,255,0.05)]"
        )}
      >
        {/* Absolute Floating Crown Badge */}
        {tier.badge && (
          <div className="absolute -top-3.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-accent/30 bg-black px-3.5 py-1 shadow-[0_0_15px_rgba(200,255,0,0.2)]">
            <Crown className="h-3 w-3 text-accent" strokeWidth={2.5} />
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.15em] text-accent/90">
              {tier.badge}
            </span>
          </div>
        )}

        {/* Background Effects Wrapper (Contains the rounded corners so the gradients don't spill) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          {tier.featured ? (
            <>
              {/* Crisp top border highlight for featured */}
              <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-70" />
              {/* Centered Spotlight dropping from the badge */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/[0.08] via-transparent to-transparent" />
            </>
          ) : (
            <>
              {/* Subtle silver top border highlight for standard cards */}
              <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-60" />
              {/* Faint ambient spotlight for standard cards */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.025] via-transparent to-transparent transition-colors duration-300 group-hover:from-white/[0.04]" />
            </>
          )}
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-1 flex-col pt-2">
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-lg border shadow-sm transition-colors duration-300",
                tier.featured
                  ? "border-accent/20 bg-accent/[0.05]"
                  : "border-white/[0.1] bg-white/[0.03] group-hover:border-white/[0.15] group-hover:bg-white/[0.06]"
              )}
            >
              <TierIcon
                className={cn("h-3.5 w-3.5", tier.featured ? "text-accent" : "text-white/70 group-hover:text-white/90")}
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50">
              {tier.audience}
            </p>

            <h3 className="mt-1.5 font-display text-[17px] font-bold leading-tight tracking-tight text-white sm:text-[18px]">
              {tier.name}
            </h3>

            <div className="mt-2.5 flex items-baseline gap-1.5">
              <p className="text-[22px] font-extrabold tracking-tight text-white sm:text-[24px]">
                {tier.price}
              </p>
            </div>
            <p className="mt-1 text-[11.5px] font-medium leading-[1.5] text-white/50">
              {tier.priceNote}
            </p>

            <p className="mt-3 max-w-[46ch] text-[12px] leading-[1.6] text-white/70">
              {tier.summary}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-6">
          <ul className="space-y-2.5 border-t border-white/[0.06] pt-5 transition-colors duration-300 group-hover:border-white/[0.08]">
            {tier.features.map((feature) => (
              <TierFeatureItem key={feature} text={feature} featured={tier.featured} />
            ))}
          </ul>

          <div className="mt-5">
            <Link
              href={tier.ctaHref}
              className={cn(
                "inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-bold transition-all duration-200",
                tier.featured 
                  ? "bg-accent text-black hover:bg-accent/90" 
                  : "border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]"
              )}
            >
              {tier.ctaLabel}
              <ArrowRight className="h-3 w-3" />
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
    <section id="pricing" className="relative py-12 sm:py-16">
      <div className="wrap relative z-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-5 text-center sm:mb-8">
              <span className="inline-flex rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-white/60">
                Pricing
              </span>
              <h2 className="mt-2.5 font-display text-[clamp(22px,3.5vw,34px)] font-extrabold leading-[1.1] tracking-tight text-white sm:mt-3">
                Clear offers. <span className="text-white/40">Senior delivery.</span>
              </h2>
              <p className="mx-auto mt-2 max-w-[460px] text-[12px] leading-[1.6] text-white/60 sm:mt-3 sm:text-[13px]">
                Choose the path that fits your business now, then expand as your needs grow.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mb-6 flex flex-col items-center sm:mb-10">
              <div
                role="tablist"
                aria-label="Pricing categories"
                className="inline-flex w-full max-w-sm rounded-full border border-white/[0.08] bg-black/40 p-0.5 shadow-lg backdrop-blur-md sm:w-auto"
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
                        "relative flex-1 overflow-hidden rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-300 sm:flex-none sm:px-4 sm:text-[12px]",
                        isActive ? "text-black" : "text-white/60 hover:text-white/90"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pricing-tab-pill"
                          className="absolute inset-0 z-0 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="mt-3 max-w-[420px] text-center text-[11px] leading-[1.6] text-white/50 sm:mt-5 sm:text-[12px]"
                >
                  {activeTabMeta.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </Reveal>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-2 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2"
            >
              {activeTiers.map((tier, index) => (
                <TierCard key={tier.name} tier={tier} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.12}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:mt-8 sm:gap-2">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 sm:px-3"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(200,255,0,0.4)]" />
                  <span className="text-[10px] font-medium text-white/50 sm:text-[11px]">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mx-auto mt-6 max-w-[500px] rounded-[12px] border border-white/[0.04] bg-white/[0.01] p-4 text-center sm:mt-8 sm:p-5">
              <p className="text-[11px] leading-[1.6] text-white/60 sm:text-[12.5px]">
                Need a website, support, SEO, and upgrades together? We can scope a blended monthly
                engagement around your business.
              </p>

              <Link
                href="/contact"
                className="mt-2.5 inline-flex items-center gap-1.5 text-[12px] font-bold text-accent transition-all hover:gap-2 hover:text-accent/80"
              >
                Talk through your scope
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
