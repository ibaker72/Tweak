"use client";

import Link from "next/link";
import { useId, useMemo, useState, useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "websites" | "marketing";

type Tier = {
  label: string;
  name: string;
  subtitle: string;
  price: string;
  priceSuffix: string;
  priceSubline?: string;
  cadence: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  checkoutUrl?: string;
  footnote: string;
  featured?: boolean;
  badgeLabel?: string;
  liveExampleHref?: string;
};

type TabContent = {
  id: TabId;
  label: string;
  tiers: Tier[];
};

const pricingLinks = {
  foundationWebsite: process.env.NEXT_PUBLIC_STRIPE_FOUNDATION_WEBSITE_LINK,
  growthWebsite: process.env.NEXT_PUBLIC_STRIPE_GROWTH_WEBSITE_LINK,
  premiumGrowth: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_GROWTH_LINK,
  dealershipWebsite: process.env.NEXT_PUBLIC_STRIPE_DEALERSHIP_WEBSITE_LINK,
  adsStarter: process.env.NEXT_PUBLIC_STRIPE_ADS_STARTER_LINK,
  fullFunnelAds: process.env.NEXT_PUBLIC_STRIPE_FULL_FUNNEL_ADS_LINK,
  growthPartnership: process.env.NEXT_PUBLIC_STRIPE_GROWTH_PARTNERSHIP_LINK,
} as const;

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
        price: "$3,500",
        priceSuffix: "",
        cadence: "One-time build · support available",
        features: [
          "Custom design, mobile-first",
          "SEO-ready structure & on-page setup",
          "Contact, quote, or booking funnel",
          "Speed & Core Web Vitals optimized",
          "Google & AI search discovery ready",
          "Dealership & local business ready",
        ],
        ctaLabel: "Start a project",
        ctaHref: "/contact?tier=Foundation%20Website",
        checkoutUrl: pricingLinks.foundationWebsite,
        footnote: "Best for new or rebranding businesses",
      },
      {
        label: "Growth",
        name: "Growth Website System",
        subtitle:
          "A full website + lead engine designed to dominate local search.",
        price: "$6,500",
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
        checkoutUrl: pricingLinks.growthWebsite,
        footnote: "Best for businesses ready to dominate local search",
        featured: true,
      },
      {
        label: "Scale",
        name: "Premium Growth Package",
        subtitle:
          "Continuous build + growth retainer. Retainer includes monthly SEO audits, reporting, and priority support.",
        price: "$8,500",
        priceSuffix: "+",
        priceSubline: "+ $800/mo retainer",
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
        checkoutUrl: pricingLinks.premiumGrowth,
        footnote: "Best for multi-location or high-growth businesses",
      },
      {
        label: "Automotive",
        name: "Dealership Website System",
        subtitle:
          "Built for independent dealers who want live inventory, AI SEO, and real leads.",
        price: "$8,500",
        priceSuffix: "",
        cadence: "One-time build · $600/mo maintenance",
        features: [
          "Live inventory sync (CSV / SFTP feed)",
          "AI-generated local SEO city pages",
          "Vehicle detail pages with photos",
          "Lead capture + deal desk integration",
          "Vercel + Supabase infrastructure",
          "Weekly inventory automation",
          "Sitemap + robots.txt automation",
        ],
        ctaLabel: "Book a discovery call",
        ctaHref: "/contact?tier=Dealership%20Website%20System",
        checkoutUrl: pricingLinks.dealershipWebsite,
        footnote: "Best for independent dealerships ready to compete online",
        badgeLabel: "Automotive",
        liveExampleHref: "https://speedwaymotorsllc.com",
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
        price: "$1,500",
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
        checkoutUrl: pricingLinks.adsStarter,
        footnote: "Best paired with a Foundation Website",
      },
      {
        label: "Scale",
        name: "Full-Funnel Ads Management",
        subtitle:
          "Multi-channel paid media with weekly iteration and landing page CRO.",
        price: "$2,500",
        priceSuffix: "/mo",
        cadence: "Monthly retainer · ad spend separate",
        features: [
          "Google Ads (Search, PMax, Display)",
          "Meta Ads (Facebook + Instagram)",
          "Retargeting campaigns across channels",
          "Google Local Services Ads (LSA) setup",
          "Conversion tracking + GA4 / GTM",
          "Landing page & offer optimization",
          "Weekly reporting & creative iteration",
        ],
        ctaLabel: "Run ads with us",
        ctaHref: "/contact?tier=Full-Funnel%20Ads",
        checkoutUrl: pricingLinks.fullFunnelAds,
        footnote: "Best paired with a Growth Website System",
        featured: true,
      },
      {
        label: "Dominate",
        name: "Growth Partnership",
        subtitle:
          "Full-stack growth team: paid, SEO, CRO, and a dedicated strategist.",
        price: "$4,500",
        priceSuffix: "/mo",
        cadence: "Monthly retainer · ad spend separate",
        features: [
          "Everything in Full-Funnel Ads",
          "SEO + AI visibility strategy (GEO)",
          "Dedicated growth strategist",
          "CRO — continuous UX & offer testing",
          "Bi-weekly strategy calls",
          "Bi-weekly performance strategy calls",
          "Priority turnaround on all deliverables",
        ],
        ctaLabel: "Book a strategy call",
        ctaHref: "/contact?tier=Growth%20Partnership",
        checkoutUrl: pricingLinks.growthPartnership,
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
        className="mt-[3px] inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-accent/[0.12]"
      >
        <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
      </span>
      <span className="font-body text-[12.5px] leading-[1.55] text-white/[0.62]">
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
  const hasBadge = isFeatured || !!tier.badgeLabel;

  return (
    <article
      aria-label={`${tier.name} pricing tier`}
      className={cn(
        "pricing-card group relative flex h-full flex-col px-6 pb-6 sm:px-6 sm:pb-7 lg:px-6 lg:pb-8",
        hasBadge ? "pt-8 sm:pt-9 lg:pt-10" : "pt-6 sm:pt-7 lg:pt-8",
        "transition-colors duration-300"
      )}
      style={{
        background: isFeatured ? "var(--pricing-bg-card-mid)" : "var(--pricing-bg-card)",
        border: hasBadge ? "1px solid rgba(200, 255, 0, 0.18)" : undefined,
        animation: `pricing-card-rise 600ms cubic-bezier(0.16,1,0.3,1) both`,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {hasBadge && (
        <div
          className="pointer-events-none absolute left-1/2 z-10"
          style={{ top: 0, transform: "translate(-50%, -50%)" }}
        >
          <span
            className="inline-flex items-center rounded-full border-none px-4 py-[5px] font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{
              background: "var(--pricing-accent)",
              color: "var(--pricing-accent-dark)",
              boxShadow: "0 0 0 3px rgba(200, 255, 0, 0.15)",
            }}
          >
            {tier.badgeLabel ?? "Most popular"}
          </span>
        </div>
      )}

      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
        {tier.label}
      </p>

      <h3 className="mt-3 font-display text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
        {tier.name}
      </h3>

      <p className="mt-1.5 max-w-[34ch] font-body text-[12px] leading-[1.55] text-white/50">
        {tier.subtitle}
      </p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-[38px] font-extrabold leading-none tracking-[-0.03em] text-white">
          {tier.price}
        </span>
        {tier.priceSuffix && (
          <span className="font-body text-[14px] text-white/45">
            {tier.priceSuffix}
          </span>
        )}
      </div>

      {tier.priceSubline && (
        <p className="mt-1 font-body text-[12px] leading-[1.5] text-white/45">
          {tier.priceSubline}
        </p>
      )}

      <p className="mt-2 font-body text-[11px] leading-[1.5] text-white/38">
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

      {tier.liveExampleHref && (
        <div className="mt-4">
          <Link
            href={tier.liveExampleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-body text-[12px] font-medium text-accent transition-opacity duration-200 hover:opacity-80"
          >
            Live example <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}

      <div className="mt-auto pt-7">
        {tier.checkoutUrl ? (
          <a
            href={tier.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Purchase now — ${tier.name}`}
            aria-describedby={`${panelId}-foot-${index}`}
            className={cn(
              "inline-flex w-full items-center justify-center !gap-2 !px-5 !py-3 !text-[12.5px]",
              isFeatured ? "btn-v" : "btn-o"
            )}
          >
            Purchase now <span aria-hidden="true">→</span>
          </a>
        ) : (
          <Link
            href={tier.ctaHref}
            aria-label={`${tier.ctaLabel} — ${tier.name}`}
            aria-describedby={`${panelId}-foot-${index}`}
            className={cn(
              "inline-flex w-full items-center justify-center !gap-2 !px-5 !py-3 !text-[12.5px]",
              isFeatured ? "btn-v" : "btn-o"
            )}
          >
            {tier.ctaLabel} <span aria-hidden="true">→</span>
          </Link>
        )}

        <p
          id={`${panelId}-foot-${index}`}
          className="mt-2.5 text-center font-body text-[11px] leading-[1.5] text-white/30"
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
    <section id="pricing" className="relative pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
      <style>{`
        .pricing-card { transition: background-color 300ms ease, border-color 300ms ease; }
        .pricing-card:hover { background: var(--brand-surface-3) !important; }
        .pricing-tab {
          transition: background-color 200ms ease, color 200ms ease;
        }
        .pricing-tab[aria-selected="false"]:hover {
          color: rgba(255,255,255,0.85);
        }
        .pricing-panel { animation: pricing-panel-fade 150ms ease-out both; }
      `}</style>

      <div className="wrap relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10">
            <span className="section-label">Pricing</span>
            <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,46px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
              Plans for every stage of growth
            </h2>
            <p className="mx-auto mt-3 max-w-[520px] font-body text-[13px] leading-[1.6] text-white/50">
              Pick the website foundation or the marketing engine — or run both
              together for compounding results.
            </p>
          </div>

          <div className="mb-10 flex justify-center sm:mb-12">
            <div
              role="tablist"
              aria-label="Pricing categories"
              className="inline-flex w-full max-w-[360px] rounded-full border border-white/[0.06] bg-white/[0.02] p-1"
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
                    className="pricing-tab relative flex-1 rounded-full px-4 py-2.5 font-body text-[12.5px] font-semibold"
                    style={{
                      color: isActive ? "var(--pricing-accent-dark)" : "rgba(255,255,255,0.55)",
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
              className="overflow-hidden rounded-2xl border border-white/[0.06] pt-7 sm:pt-8"
              style={{ background: "var(--pricing-border-subtle)" }}
            >
              <div
                className={cn(
                  "grid grid-cols-1 gap-px",
                  activePanel.tiers.length === 4
                    ? "md:grid-cols-2 lg:grid-cols-4"
                    : "lg:grid-cols-3"
                )}
              >
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

          <BundleBanner />

          <AddOnsSection />

          <p className="mx-auto mt-12 max-w-[520px] text-center font-body text-[12px] leading-[1.6] text-white/35">
            All projects include direct access to senior engineers, clear scope
            upfront, and full code ownership.
          </p>
        </div>
      </div>
    </section>
  );
}

function BundleBanner() {
  return (
    <div
      className="mt-10 overflow-hidden rounded-2xl border border-white/[0.06] sm:mt-12"
      style={{
        background: "var(--brand-surface-2)",
        borderLeft: "3px solid var(--pricing-accent)",
      }}
    >
      <div className="flex flex-col items-start gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            <Zap aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.25} />
            <span>Bundle &amp; Save</span>
          </div>
          <p className="mt-2 font-display text-[18px] font-extrabold leading-[1.25] tracking-[-0.02em] text-white sm:text-[20px]">
            Combine a website build with ads management and get $500 off your
            first month of ads.
          </p>
          <p className="mt-1.5 font-body text-[12.5px] leading-[1.55] text-white/50">
            Most clients run both — the website converts, the ads drive traffic.
          </p>
        </div>
        <Link
          href="/contact?tier=Bundle"
          className="btn-v inline-flex shrink-0 items-center justify-center !gap-2 !px-5 !py-3 !text-[12.5px]"
        >
          Book a strategy call <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

type AddOn = {
  name: string;
  description: string;
  price: string;
};

const ADD_ONS: AddOn[] = [
  {
    name: "AI Local SEO Page",
    description:
      "Geo-targeted landing page generated and optimized for a specific city.",
    price: "$200 per page",
  },
  {
    name: "Extra Location / Service Page",
    description:
      "Additional service area or offering page, built and SEO-optimized.",
    price: "$300",
  },
  {
    name: "Monthly SEO Maintenance",
    description:
      "Ongoing technical SEO checks, fixes, and content updates.",
    price: "$400/mo",
  },
  {
    name: "GA4 + Conversion Tracking Setup",
    description:
      "Full Google Analytics 4 and conversion event configuration.",
    price: "$350 one-time",
  },
  {
    name: "CRO Audit",
    description:
      "Full conversion rate audit with prioritized recommendations.",
    price: "$500 one-time",
  },
  {
    name: "Dealership Inventory Feed Integration",
    description:
      "Connect any CSV or SFTP inventory feed to an existing site.",
    price: "$1,500",
  },
];

function AddOnsSection() {
  return (
    <div className="mt-12 sm:mt-16">
      <div className="text-center">
        <h3 className="font-display text-[clamp(24px,3.4vw,32px)] font-extrabold leading-[1.15] tracking-[-0.03em] text-white">
          Enhance your project
        </h3>
        <p className="mx-auto mt-2 font-body text-[13px] leading-[1.55] text-white/50">
          Add-ons available with any package
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ADD_ONS.map((addOn) => (
          <div
            key={addOn.name}
            className="flex flex-col rounded-xl border border-white/[0.06] px-5 py-5 transition-colors duration-300 hover:border-white/[0.12]"
            style={{ background: "var(--pricing-bg-card)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-display text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-white">
                {addOn.name}
              </h4>
              <span className="shrink-0 font-mono text-[12px] font-semibold text-accent">
                {addOn.price}
              </span>
            </div>
            <p className="mt-2 font-body text-[12.5px] leading-[1.55] text-white/55">
              {addOn.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
