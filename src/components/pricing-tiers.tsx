"use client";

import Link from "next/link";
import { useId, useMemo, useState, useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "websites" | "marketing";

type Tier = {
  label: string;
  name: string;
  subtitle: string;
  price: string;
  priceSuffix: string;
  cadence: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  footnote: string;
  featured?: boolean;
};

type TabContent = {
  id: TabId;
  label: string;
  tiers: Tier[];
};

const TABS: TabContent[] = [
  {
    id: "websites",
    label: "Websites",
    tiers: [
      {
        label: "Starter",
        name: "Foundation Website",
        subtitle:
          "A fast, credible website built to convert visitors into real enquiries.",
        price: "$2,500",
        priceSuffix: "",
        cadence: "One-time build · support available",
        features: [
          "Custom design, mobile-first",
          "SEO-ready structure & on-page setup",
          "Contact, quote, or booking funnel",
          "Speed & Core Web Vitals optimized",
          "Google & AI search discovery ready",
        ],
        ctaLabel: "Start a project",
        ctaHref: "/contact?tier=Foundation%20Website",
        footnote: "Best for new or rebranding businesses",
      },
      {
        label: "Growth",
        name: "Growth Website System",
        subtitle:
          "A full website + lead engine designed to dominate local search.",
        price: "$4,500",
        priceSuffix: "",
        cadence: "One-time build · expansion-ready structure",
        features: [
          "Everything in Foundation",
          "Location + service landing page system",
          "Local SEO & advanced schema markup",
          "GEO foundation for AI-driven search",
          "Lead capture & conversion flow planning",
          "Multi-service or multi-city ready",
        ],
        ctaLabel: "Build my growth system",
        ctaHref: "/contact?tier=Growth%20Website%20System",
        footnote: "Best for businesses ready to dominate local search",
        featured: true,
      },
      {
        label: "Scale",
        name: "Premium Growth Package",
        subtitle:
          "Continuous build + growth retainer for multi-location operators.",
        price: "$6,500",
        priceSuffix: "+",
        cadence: "One-time build + retained monthly growth",
        features: [
          "Everything in Growth System",
          "Ongoing technical SEO audits & fixes",
          "Search + AI visibility strategy (GEO)",
          "Conversion & UX continuous improvements",
          "Monthly reporting & strategic iteration",
          "Priority support & dedicated account lead",
        ],
        ctaLabel: "Let's talk scale",
        ctaHref: "/contact?tier=Premium%20Growth%20Package",
        footnote: "Best for multi-location or high-growth businesses",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing & Ads",
    tiers: [
      {
        label: "Starter",
        name: "Ads Starter",
        subtitle:
          "One channel, dialed in. Tracking, creative, and reporting handled.",
        price: "$1,200",
        priceSuffix: "/mo",
        cadence: "Monthly retainer · ad spend separate",
        features: [
          "One ad channel (Google or Meta)",
          "Campaign setup & audience targeting",
          "Conversion tracking + GA4 setup",
          "Monthly performance report",
          "Ad creative direction & copy",
        ],
        ctaLabel: "Get started",
        ctaHref: "/contact?tier=Ads%20Starter",
        footnote: "Best paired with a Foundation Website",
      },
      {
        label: "Scale",
        name: "Full-Funnel Ads Management",
        subtitle:
          "Multi-channel paid media with weekly iteration and landing page CRO.",
        price: "$1,800",
        priceSuffix: "/mo",
        cadence: "Monthly retainer · ad spend separate",
        features: [
          "Google Ads (Search, PMax, Display)",
          "Meta Ads (Facebook + Instagram)",
          "LinkedIn Ads for B2B targeting",
          "Conversion tracking + GA4 / GTM",
          "Landing page & offer optimization",
          "Weekly reporting & creative iteration",
        ],
        ctaLabel: "Run ads with us",
        ctaHref: "/contact?tier=Full-Funnel%20Ads",
        footnote: "Best paired with a Growth Website System",
        featured: true,
      },
      {
        label: "Dominate",
        name: "Growth Partnership",
        subtitle:
          "Full-stack growth team: paid, SEO, CRO, and a dedicated strategist.",
        price: "$3,200",
        priceSuffix: "/mo",
        cadence: "Monthly retainer · ad spend separate",
        features: [
          "Everything in Full-Funnel Ads",
          "SEO + AI visibility strategy (GEO)",
          "Dedicated growth strategist",
          "CRO — continuous UX & offer testing",
          "Bi-weekly strategy calls",
          "Priority turnaround on all deliverables",
        ],
        ctaLabel: "Book a strategy call",
        ctaHref: "/contact?tier=Growth%20Partnership",
        footnote: "Best for serious growth investment",
      },
    ],
  },
];

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden="true"
        className="mt-[3px] inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
        style={{ background: "rgba(200, 242, 58, 0.12)" }}
      >
        <Check
          className="h-2.5 w-2.5"
          strokeWidth={3}
          style={{ color: "var(--pricing-accent)" }}
        />
      </span>
      <span
        className="text-[12.5px] leading-[1.55]"
        style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {text}
      </span>
    </li>
  );
}

function PricingCard({
  tier,
  index,
  panelId,
}: {
  tier: Tier;
  index: number;
  panelId: string;
}) {
  const isFeatured = !!tier.featured;

  return (
    <article
      aria-label={`${tier.name} pricing tier`}
      className={cn(
        "pricing-card group relative flex h-full flex-col p-6 sm:p-7 lg:p-8",
        "transition-colors duration-300"
      )}
      style={{
        background: isFeatured ? "var(--pricing-bg-card-mid)" : "var(--pricing-bg-card)",
        animation: `pricing-card-rise 600ms cubic-bezier(0.16,1,0.3,1) both`,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {isFeatured && (
        <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{
              background: "var(--pricing-accent)",
              color: "var(--pricing-accent-dark)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Most popular
          </span>
        </div>
      )}

      <p
        className="text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "#444", fontFamily: "'DM Sans', sans-serif" }}
      >
        {tier.label}
      </p>

      <h3
        className="mt-3 text-[22px] leading-[1.15]"
        style={{
          color: "#fff",
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
        }}
      >
        {tier.name}
      </h3>

      <p
        className="mt-1.5 max-w-[34ch] text-[12px] leading-[1.55]"
        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {tier.subtitle}
      </p>

      <div className="mt-5 flex items-baseline gap-1">
        <span
          className="text-[38px] leading-none"
          style={{
            color: "#fff",
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
          }}
        >
          {tier.price}
        </span>
        {tier.priceSuffix && (
          <span
            className="text-[14px]"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {tier.priceSuffix}
          </span>
        )}
      </div>

      <p
        className="mt-2 text-[11px] leading-[1.5]"
        style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {tier.cadence}
      </p>

      <div
        className="my-6 h-px w-full"
        style={{ background: "var(--pricing-border-subtle)" }}
      />

      <ul className="flex flex-col gap-2.5">
        {tier.features.map((feature) => (
          <FeatureItem key={feature} text={feature} />
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <Link
          href={tier.ctaHref}
          aria-label={`${tier.ctaLabel} — ${tier.name}`}
          aria-describedby={`${panelId}-foot-${index}`}
          className={cn(
            "pricing-cta inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[12.5px] font-semibold transition-all duration-200",
            isFeatured ? "pricing-cta--solid" : "pricing-cta--outline"
          )}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {tier.ctaLabel} <span aria-hidden="true" className="ml-1.5">→</span>
        </Link>

        <p
          id={`${panelId}-foot-${index}`}
          className="mt-3 text-center text-[11px] leading-[1.5]"
          style={{ color: "rgba(255,255,255,0.32)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {tier.footnote}
        </p>
      </div>
    </article>
  );
}

export function PricingTiers() {
  const [activeTab, setActiveTab] = useState<TabId>("websites");
  const baseId = useId();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    websites: null,
    marketing: null,
  });

  const activePanel = useMemo(
    () => TABS.find((t) => t.id === activeTab) ?? TABS[0],
    [activeTab]
  );

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const idx = TABS.findIndex((t) => t.id === activeTab);
    let nextIdx = idx;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % TABS.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = TABS.length - 1;
    const nextTab = TABS[nextIdx];
    setActiveTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  return (
    <section id="pricing" className="relative py-16 sm:py-20 lg:py-24">
      <style>{`
        .pricing-card { transition: background-color 300ms ease; }
        .pricing-card:hover { background: #181818 !important; }
        .pricing-cta--solid {
          background: var(--pricing-accent);
          color: var(--pricing-accent-dark);
        }
        .pricing-cta--solid:hover { background: var(--pricing-accent-hover); }
        .pricing-cta--outline {
          background: transparent;
          color: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.14);
        }
        .pricing-cta--outline:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.32);
          background: rgba(255,255,255,0.03);
        }
        .pricing-panel { animation: pricing-panel-fade 150ms ease-out both; }
      `}</style>

      <div className="wrap relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10">
            <span
              className="inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: "var(--pricing-border-subtle)",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Pricing
            </span>
            <h2
              className="mt-4 text-[clamp(28px,4.2vw,42px)] leading-[1.1]"
              style={{
                color: "#fff",
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
              }}
            >
              Plans for every stage of growth
            </h2>
            <p
              className="mx-auto mt-3 max-w-[520px] text-[13px] leading-[1.6]"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Pick the website foundation or the marketing engine — or run both
              together for compounding results.
            </p>
          </div>

          <div className="mb-10 flex justify-center sm:mb-12">
            <div
              role="tablist"
              aria-label="Pricing categories"
              className="inline-flex w-full max-w-[360px] rounded-full p-1"
              style={{ background: "#161616" }}
            >
              {TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                const panelId = `${baseId}-panel-${tab.id}`;
                const tabId = `${baseId}-tab-${tab.id}`;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[tab.id] = el;
                    }}
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={onTabKeyDown}
                    suppressHydrationWarning
                    className={cn(
                      "relative flex-1 rounded-full px-4 py-2.5 text-[12.5px] font-semibold transition-colors duration-200"
                    )}
                    style={{
                      color: isActive ? "var(--pricing-accent-dark)" : "rgba(255,255,255,0.55)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pricing-tab-active"
                        className="absolute inset-0 -z-0 rounded-full"
                        style={{ background: "var(--pricing-accent)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePanel.id}
              id={`${baseId}-panel-${activePanel.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${activePanel.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl"
              style={{ background: "var(--pricing-border-subtle)" }}
            >
              <div className="grid grid-cols-1 gap-px lg:grid-cols-3">
                {activePanel.tiers.map((tier, i) => (
                  <PricingCard
                    key={`${activePanel.id}-${tier.name}`}
                    tier={tier}
                    index={i}
                    panelId={`${baseId}-panel-${activePanel.id}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <p
            className="mx-auto mt-8 max-w-[520px] text-center text-[12px] leading-[1.6] sm:mt-10"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            All projects include direct access to senior engineers, clear scope
            upfront, and full code ownership.
          </p>
        </div>
      </div>
    </section>
  );
}
