"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { isValidStripePaymentLink, trackEvent } from "@/lib/analytics";

type TabId = "websites" | "marketing";

type Tier = {
  label: string;
  name: string;
  subtitle: string;
  price: string;
  priceSuffix: string;
  priceSubline?: string;
  cadence: string;
  cadenceAddOn?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  checkoutUrl?: string;
  footnote: string;
  featured?: boolean;
  badgeLabel?: string;
  liveExampleHref?: string;
  monthlyCareNote?: {
    title: string;
    description: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
    checkoutUrl?: string;
  };
};

type TabContent = {
  id: TabId;
  label: string;
  tiers: Tier[];
};

// Only accept fully-qualified Stripe Payment Link URLs (https://buy.stripe.com/...).
// A raw price ID (price_xxx) or any other value resolves to undefined so the card
// falls back to the contact CTA instead of navigating to a broken /price_xxx URL.
function sanitizeStripeLink(raw: string | undefined): string | undefined {
  return isValidStripePaymentLink(raw) ? raw : undefined;
}

const pricingLinks = {
  newBusinessLaunchKit: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_NEW_BUSINESS_LAUNCH_KIT_LINK
  ),
  monthlyWebsiteSeoCare: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_MONTHLY_WEBSITE_SEO_CARE_LINK
  ),
  foundationWebsite: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_FOUNDATION_WEBSITE_LINK
  ),
  growthWebsite: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_GROWTH_WEBSITE_LINK
  ),
  premiumGrowth: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_GROWTH_LINK
  ),
  dealershipWebsite: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_DEALERSHIP_WEBSITE_LINK
  ),
  adsStarter: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_ADS_STARTER_LINK
  ),
  fullFunnelAds: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_FULL_FUNNEL_ADS_LINK
  ),
  growthPartnership: sanitizeStripeLink(
    process.env.NEXT_PUBLIC_STRIPE_GROWTH_PARTNERSHIP_LINK
  ),
} as const;

const TABS: TabContent[] = [
  {
    id: "websites",
    label: "Websites",
    tiers: [
      {
        label: "New business",
        name: "New Business Launch Kit",
        subtitle:
          "For newly formed businesses that need to look real fast. A lean starter presence — not a full custom multi-page growth system.",
        price: "$2,500",
        priceSuffix: "",
        cadence: "One-time launch setup",
        cadenceAddOn: "Optional care plan available: +$297/mo",
        features: [
          "Lean mobile-first starter site",
          "Core offer and message sections",
          "Contact form or quote request form",
          "Basic SEO foundation",
          "Google Business Profile readiness",
          "Analytics & form tracking",
          "Fast launch structure",
        ],
        ctaLabel: "Request a build estimate",
        ctaHref: "/contact?tier=New%20Business%20Launch%20Kit",
        checkoutUrl: pricingLinks.newBusinessLaunchKit,
        footnote: "Best for new LLCs, solo operators, and brand-new businesses",
        monthlyCareNote: {
          title: "Monthly care available",
          description:
            "Protects uptime, edits, monitoring, and technical fixes. Includes basic SEO checks, GBP support, analytics checks, and priority support.",
        },
        secondaryCta: {
          label: "Ask about monthly care",
          href: "/contact?tier=Monthly%20Website%20SEO%20Care%20Plan",
          checkoutUrl: pricingLinks.monthlyWebsiteSeoCare,
        },
      },
      {
        label: "Custom",
        name: "Foundation Website",
        subtitle:
          "For established businesses that need a full custom website built to convert — not a starter landing page.",
        price: "$3,500",
        priceSuffix: "",
        cadence: "One-time build · support available",
        features: [
          "Custom business website (not a starter page)",
          "3–5 core pages or equivalent sections",
          "Conversion-focused layout & service structure",
          "Service, trust, and proof sections",
          "Lead capture forms",
          "SEO basics and analytics setup",
          "Mobile-first performance",
        ],
        ctaLabel: "Start a project",
        ctaHref: "/contact?tier=Foundation%20Website",
        checkoutUrl: pricingLinks.foundationWebsite,
        footnote: "Best for established businesses upgrading their web presence",
      },
      {
        label: "Growth",
        name: "Growth Website System",
        subtitle:
          "For local service businesses that want a website plus a local lead engine — built to convert more visitors into inquiries.",
        price: "$6,500",
        priceSuffix: "",
        cadence: "One-time build · expansion-ready structure",
        features: [
          "Everything in Foundation",
          "Multi-location or service-area SEO structure",
          "City / service page framework",
          "Stronger conversion copy throughout",
          "Local SEO architecture & schema markup",
          "Proposal / lead capture flow",
          "Analytics and tracking readiness",
          "Built to support ongoing growth campaigns",
        ],
        ctaLabel: "Discuss the right package",
        ctaHref: "/contact?tier=Growth%20Website%20System",
        checkoutUrl: pricingLinks.growthWebsite,
        footnote: "Best for serious local businesses ready to grow",
        featured: true,
        badgeLabel: "Best Value",
      },
      {
        label: "Scale",
        name: "Premium Growth Package",
        subtitle:
          "A full Growth Website System paired with a monthly growth retainer for SEO, content, and continuous improvement.",
        price: "$8,500",
        priceSuffix: "+",
        priceSubline: "+ $800/mo growth retainer",
        cadence: "One-time build + ongoing growth retainer",
        features: [
          "Everything in Growth Website System",
          "Ongoing technical SEO audits & fixes",
          "Search + AI visibility strategy (GEO)",
          "Conversion & UX continuous improvements",
          "Monthly reporting & strategic iteration",
          "Priority support & dedicated account lead",
        ],
        ctaLabel: "Book a strategy call",
        ctaHref: "/contact?tier=Premium%20Growth%20Package",
        checkoutUrl: pricingLinks.premiumGrowth,
        footnote: "Best for multi-location or high-growth businesses",
      },
      {
        label: "Automotive",
        name: "Dealership Website System",
        subtitle:
          "For dealerships that need real inventory infrastructure — not a basic brochure site with a feed bolted on.",
        price: "$8,500",
        priceSuffix: "+",
        cadence: "One-time build · $600/mo dealership retainer",
        cadenceAddOn:
          "Retainer covers feed monitoring, inventory sync checks, website support, and ongoing improvements.",
        features: [
          "Inventory-ready dealership website",
          "Vehicle listing pages with search & filtering",
          "Vehicle detail pages (VDPs) with photos",
          "CSV / SFTP or inventory feed integration",
          "Supabase / database-backed inventory architecture",
          "Featured inventory sections",
          "SEO-ready vehicle and location structure",
          "Built for live inventory operations, not static pages",
        ],
        ctaLabel: "Book a strategy call",
        ctaHref: "/contact?tier=Dealership%20Website%20System",
        checkoutUrl: pricingLinks.dealershipWebsite,
        footnote:
          "A full dealership system — not replicable by adding a feed to a standard website.",
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
  const secondaryCta = tier.secondaryCta;
  const monthlyCareNote = tier.monthlyCareNote;
  const primaryCtaIsFilled = isFeatured || !!secondaryCta;
  const primaryCtaLabel = tier.checkoutUrl ? "Purchase Now" : tier.ctaLabel;
  const primaryCtaClassName = cn(
    "inline-flex w-full items-center justify-center !gap-2 !px-5 !py-3 !text-[12.5px]",
    primaryCtaIsFilled ? "btn-v" : "btn-o"
  );

  return (
    <article
      aria-label={`${tier.name} pricing tier`}
      className={cn(
        "pricing-card group relative flex h-full flex-col px-6 pb-6 sm:px-6 sm:pb-7 lg:px-6 lg:pb-8",
        hasBadge ? "pt-8 sm:pt-9 lg:pt-10" : "pt-6 sm:pt-7 lg:pt-8",
        "transition-colors duration-300"
      )}
      style={{
        background: isFeatured
          ? "var(--pricing-bg-card-mid)"
          : "var(--pricing-bg-card)",
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

      {tier.cadenceAddOn && (
        <p className="mt-1 font-body text-[11px] leading-[1.5] text-white/45">
          {tier.cadenceAddOn}
        </p>
      )}

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
        {monthlyCareNote && (
          <div className="mb-5 border-t border-white/[0.05] pt-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/85">
              {monthlyCareNote.title}
            </p>
            <p className="mt-1.5 font-body text-[11.5px] leading-[1.55] text-white/50">
              {monthlyCareNote.description}
            </p>
          </div>
        )}

        {tier.checkoutUrl ? (
          <a
            href={tier.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${primaryCtaLabel} — ${tier.name}`}
            aria-describedby={`${panelId}-foot-${index}`}
            className={primaryCtaClassName}
            onClick={() =>
              trackEvent("pricing_button_click", {
                tier: tier.name,
                destination: "stripe_checkout",
              })
            }
          >
            {primaryCtaLabel} <span aria-hidden="true">→</span>
          </a>
        ) : (
          <Link
            href={tier.ctaHref}
            aria-label={`${primaryCtaLabel} — ${tier.name}`}
            aria-describedby={`${panelId}-foot-${index}`}
            className={primaryCtaClassName}
            onClick={() =>
              trackEvent("pricing_button_click", {
                tier: tier.name,
                destination: "contact",
              })
            }
          >
            {primaryCtaLabel} <span aria-hidden="true">→</span>
          </Link>
        )}

        {secondaryCta &&
          (secondaryCta.checkoutUrl ? (
            <a
              href={secondaryCta.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Purchase Now — ${tier.name}`}
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 font-body text-[11.5px] font-medium text-white/55 transition-colors duration-200 hover:text-accent"
              onClick={() =>
                trackEvent("pricing_button_click", {
                  tier: tier.name,
                  destination: "stripe_checkout",
                  secondary: true,
                })
              }
            >
              Purchase Now <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link
              href={secondaryCta.href}
              aria-label={`${secondaryCta.label} — ${tier.name}`}
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 font-body text-[11.5px] font-medium text-white/55 transition-colors duration-200 hover:text-accent"
              onClick={() =>
                trackEvent("pricing_button_click", {
                  tier: tier.name,
                  destination: "contact",
                  secondary: true,
                })
              }
            >
              {secondaryCta.label} <span aria-hidden="true">→</span>
            </Link>
          ))}

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

function PricingCarousel({
  tiers,
  panelId,
}: {
  tiers: Tier[];
  panelId: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const updateState = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < max - 2);

    const cards = el.querySelectorAll<HTMLElement>("[data-pricing-card]");
    if (cards.length === 0) return;
    const scrollLeft = el.scrollLeft;
    let bestIdx = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    setActiveIndex(bestIdx);
  }, []);

  useEffect(() => {
    updateState();
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => updateState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const el = railRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-pricing-card]");
      const cardWidth = card?.offsetWidth ?? el.clientWidth * 0.85;
      el.scrollBy({
        left: dir * (cardWidth + 1),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion]
  );

  const scrollToIndex = useCallback(
    (idx: number) => {
      const el = railRef.current;
      if (!el) return;
      const cards = el.querySelectorAll<HTMLElement>("[data-pricing-card]");
      const target = cards[idx];
      if (!target) return;
      el.scrollTo({
        left: target.offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion]
  );

  const onRailKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  const canScroll = canScrollLeft || canScrollRight;

  return (
    <div>
      {/* Mobile + tablet controls: prev arrow · dot indicators · next arrow, above the rail */}
      <div className="mb-3 flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          aria-label="Previous pricing tiers"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/70 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02]"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="flex flex-1 items-center justify-center gap-1.5">
          {tiers.map((tier, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={`dot-${panelId}-${tier.name}`}
                type="button"
                aria-label={`Go to ${tier.name}`}
                aria-current={isActive}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  isActive ? "w-6 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
              />
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Next pricing tiers"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/70 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02]"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Desktop arrow controls, top-right */}
      <div
        className={cn(
          "mb-3 hidden justify-end gap-2 lg:flex",
          !canScroll && "lg:hidden"
        )}
      >
        <button
          type="button"
          aria-label="Previous pricing tiers"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/70 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02]"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label="Next pricing tiers"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/70 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02]"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Bordered wrapper + scroll rail */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.06]"
        style={{ background: "var(--pricing-border-subtle)" }}
      >
        {/* Edge fade — left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--brand-surface-3)] to-transparent transition-opacity duration-200"
          style={{ opacity: canScrollLeft ? 1 : 0 }}
        />
        {/* Edge fade — right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--brand-surface-3)] to-transparent transition-opacity duration-200"
          style={{ opacity: canScrollRight ? 1 : 0 }}
        />

        <div
          ref={railRef}
          role="region"
          aria-label="Pricing tiers — horizontal scroll"
          tabIndex={0}
          onKeyDown={onRailKeyDown}
          className="no-scrollbar flex snap-x snap-mandatory gap-px overflow-x-auto px-4 pb-3 pt-10 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:px-6"
          style={{
            scrollBehavior: reducedMotion ? "auto" : "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {tiers.map((tier, i) => (
            <div
              key={`${panelId}-${tier.name}`}
              data-pricing-card
              className="flex shrink-0 snap-start flex-col w-[85vw] max-w-[340px] md:w-[clamp(280px,46vw,360px)] lg:w-[clamp(280px,30vw,360px)]"
            >
              <PricingCard tier={tier} index={i} panelId={panelId} />
            </div>
          ))}
          {/* Tail spacer so the last card's right edge can snap-start fully */}
          <div className="shrink-0" aria-hidden="true" style={{ width: 1 }} />
        </div>
      </div>
    </div>
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

          <div className="mb-6 flex justify-center sm:mb-10 lg:mb-12">
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
            >
              <PricingCarousel
                tiers={activePanel.tiers}
                panelId={`${baseId}-panel-${activePanel.id}`}
              />
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
          onClick={() =>
            trackEvent("book_call_click", { source: "pricing_bundle_banner" })
          }
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
    name: "Programmatic Local SEO Page",
    description:
      "AI-assisted city or service page using an approved layout and SEO structure. Best for scalable local expansion.",
    price: "$200 per page",
  },
  {
    name: "Custom Location or Service Page",
    description:
      "Individually written and structured page for priority cities, services, or campaigns that need stronger copy, proof, FAQs, and conversion sections.",
    price: "from $300",
  },
  {
    name: "Monthly SEO Maintenance",
    description:
      "Ongoing technical SEO checks, fixes, and content updates to keep the site improving month over month.",
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
    name: "Inventory Feed Integration",
    description:
      "Retrofit / add-on for qualifying existing sites. Includes feed connection work only. Does not include the full dealership UX, VDP system, filtering experience, SEO architecture, or ongoing feed monitoring included in the Dealership Website System.",
    price: "from $1,500",
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
