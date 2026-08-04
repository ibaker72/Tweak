"use client";

import Link from "next/link";
import {
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type TabId = "websites" | "marketing" | "drone";

type Solution = {
  /** snake_case identifier used in analytics events */
  id: string;
  eyebrow: string;
  name: string;
  description: string;
  /** Small positioning line shown where a price used to sit — used sparingly */
  scopeNote?: string;
  features: string[];
  ctaLabel: string;
  microcopy: string;
  featured?: boolean;
  badgeLabel?: string;
};

type TabFooter = {
  note: string;
  subNote?: string;
  prompt?: string;
  cta?: {
    label: string;
    href: string;
    solutionId: string;
  };
};

type TabContent = {
  id: TabId;
  label: string;
  solutions: Solution[];
  footer: TabFooter;
};

const TABS: TabContent[] = [
  {
    id: "websites",
    label: "Websites",
    solutions: [
      {
        id: "new_business_launch",
        eyebrow: "Launch",
        name: "New Business Launch",
        description:
          "For new businesses that need to look established, get found locally, and start turning visitors into real inquiries.",
        features: [
          "Conversion-focused business website",
          "Mobile-first design",
          "Core service and company sections",
          "Quote or contact lead capture",
          "Google Business Profile readiness",
          "Analytics and conversion tracking",
          "SEO foundation",
          "Launch-ready technical setup",
        ],
        ctaLabel: "Build My Launch Plan",
        microcopy:
          "Best for new businesses building their first serious online presence.",
      },
      {
        id: "custom_business_website",
        eyebrow: "Custom",
        name: "Custom Business Website",
        description:
          "For established businesses that need a stronger website built around credibility, conversion, and measurable growth.",
        features: [
          "Fully custom business website",
          "Conversion-focused page structure",
          "Service, trust, and proof sections",
          "Lead capture and quote forms",
          "Stronger conversion copy",
          "SEO and analytics setup",
          "Mobile performance optimization",
          "Expansion-ready architecture",
        ],
        ctaLabel: "See What We'd Recommend",
        microcopy:
          "Best for established businesses replacing an outdated or underperforming website.",
      },
      {
        id: "local_growth_system",
        eyebrow: "Growth",
        name: "Local Growth System",
        description:
          "For businesses that don't just need a better website — they need a system designed to generate more local visibility, leads, and opportunities.",
        scopeNote: "Custom scoped",
        features: [
          "Everything in Custom Business Website",
          "Multi-location / service-area SEO architecture",
          "City and service landing-page framework",
          "Local SEO structure and schema",
          "Conversion-focused landing pages",
          "Proposal / lead capture flow",
          "Analytics and conversion tracking",
          "Review-growth system integration",
          "Built to support future SEO and paid campaigns",
        ],
        ctaLabel: "Build My Growth Plan",
        microcopy:
          "Best for local service businesses serious about increasing inbound leads.",
        featured: true,
        badgeLabel: "Best Value",
      },
    ],
    footer: {
      note: "Every build is scoped around your goals, market, competition, and required functionality.",
      prompt: "Not sure which direction fits your business?",
      cta: {
        label: "Get a Recommendation",
        href: "/contact",
        solutionId: "website_recommendation",
      },
    },
  },
  {
    id: "marketing",
    label: "Marketing & Ads",
    solutions: [
      {
        id: "search_acquisition",
        eyebrow: "Get Found",
        name: "Search Acquisition",
        description:
          "Capture people already searching for the services you provide.",
        features: [
          "Google Search campaigns",
          "Campaign and keyword strategy",
          "Audience and location targeting",
          "Conversion tracking",
          "Landing-page recommendations",
          "Ad creative and copy direction",
          "Performance reporting",
        ],
        ctaLabel: "Build My Ad Plan",
        microcopy:
          "Best for businesses that want high-intent leads from search.",
      },
      {
        id: "full_funnel_acquisition",
        eyebrow: "Generate Demand",
        name: "Full-Funnel Acquisition",
        description:
          "A multi-channel advertising system designed to create demand, capture intent, and turn more traffic into qualified leads.",
        scopeNote: "Built around your goals",
        features: [
          "Google Ads",
          "Meta Ads",
          "Retargeting",
          "Campaign strategy",
          "GA4 / GTM conversion tracking",
          "Landing-page optimization",
          "Creative testing",
          "Weekly campaign iteration",
        ],
        ctaLabel: "Build My Growth Plan",
        microcopy:
          "Best for businesses ready to grow beyond a single advertising channel.",
        featured: true,
        badgeLabel: "Most Popular",
      },
      {
        id: "growth_partnership",
        eyebrow: "Own Your Market",
        name: "Growth Partnership",
        description:
          "An ongoing growth system combining customer acquisition, organic visibility, conversion optimization, and strategy.",
        features: [
          "Paid acquisition strategy",
          "SEO + AI search visibility strategy",
          "Conversion rate optimization",
          "Landing-page strategy",
          "Performance analysis",
          "Ongoing experimentation",
          "Growth strategy calls",
          "Priority implementation support",
        ],
        ctaLabel: "Talk Growth Strategy",
        microcopy:
          "Best for businesses treating marketing as a serious growth channel.",
      },
    ],
    footer: {
      note: "Your marketing plan is built around your market, margins, competition, sales cycle, and growth target.",
      subNote: "Media spend is separate from management and strategy.",
    },
  },
  {
    id: "drone",
    label: "Drone & Media",
    solutions: [
      {
        id: "business_content_shoot",
        eyebrow: "Content",
        name: "Business Content Shoot",
        description:
          "Professional photo and video content built for your website, Google profile, social media, and advertising.",
        features: [
          "On-site photo session",
          "Short-form video clips",
          "Exterior / business shots",
          "Team, vehicle, or workspace content",
          "Edited website-ready photos",
          "Social-ready content",
        ],
        ctaLabel: "Plan My Content Shoot",
        microcopy: "Ideal for businesses that need a stronger visual presence.",
      },
      {
        id: "drone_website_media",
        eyebrow: "Drone + Web",
        name: "Drone + Website Media",
        description:
          "Premium aerial and ground content designed specifically for websites, advertising, social media, and digital proof.",
        features: [
          "Drone flyover footage",
          "Ground camera footage",
          "Hero video / background clips",
          "Website-ready image set",
          "Google Business Profile media",
          "Social media clips",
          "Content formatted for web use",
        ],
        ctaLabel: "Plan My Shoot",
        microcopy:
          "Pairs naturally with a Custom Business Website or Local Growth System.",
        featured: true,
        badgeLabel: "Best Add-On",
      },
      {
        id: "full_visual_proof_system",
        eyebrow: "Visual Proof",
        name: "Full Visual Proof System",
        description:
          "A complete content system built around trust, proof, projects, people, and the work your business actually performs.",
        features: [
          "Full content capture session",
          "Drone + ground coverage",
          "Before / after project visuals",
          "Client or job-site proof content",
          "Edited short-form video",
          "Website assets",
          "Landing-page proof content",
          "Ongoing content strategy available",
        ],
        ctaLabel: "Build My Content Plan",
        microcopy:
          "Best for businesses where visual proof directly influences buying decisions.",
      },
    ],
    footer: {
      note: "Available as a standalone service or an add-on to any website or marketing engagement.",
    },
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

function SolutionCard({
  solution,
  category,
  index,
}: {
  solution: Solution;
  category: TabId;
  index: number;
}) {
  const isFeatured = !!solution.featured;

  return (
    <article
      aria-label={`${solution.name} solution`}
      className={cn(
        "solution-card relative flex h-full w-full flex-col rounded-2xl border px-6 pb-6 sm:px-6 sm:pb-7",
        isFeatured
          ? "solution-card--featured border-accent/[0.22] pt-9 sm:pt-10"
          : "border-white/[0.07] pt-7 sm:pt-8"
      )}
      style={{
        background: isFeatured
          ? "var(--pricing-bg-card-mid)"
          : "var(--pricing-bg-card)",
        boxShadow: isFeatured ? "0 0 28px rgba(200,255,0,0.05)" : undefined,
        animation: "pricing-card-rise 600ms cubic-bezier(0.16,1,0.3,1) both",
        animationDelay: `${index * 70}ms`,
      }}
    >
      {solution.badgeLabel && (
        <div
          className="pointer-events-none absolute left-1/2 z-10"
          style={{ top: 0, transform: "translate(-50%, -50%)" }}
        >
          <span
            className="inline-flex items-center whitespace-nowrap rounded-full px-4 py-[5px] font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{
              background: "var(--pricing-accent)",
              color: "var(--pricing-accent-dark)",
              boxShadow: "0 0 0 3px rgba(200, 255, 0, 0.15)",
            }}
          >
            {solution.badgeLabel}
          </span>
        </div>
      )}

      <p
        className={cn(
          "font-mono text-[10px] font-semibold uppercase tracking-[0.2em]",
          isFeatured ? "text-accent/80" : "text-white/35"
        )}
      >
        {solution.eyebrow}
      </p>

      <h3 className="mt-3 font-display text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[23px]">
        {solution.name}
      </h3>

      <p className="mt-2.5 font-body text-[13px] leading-[1.6] text-white/[0.55]">
        {solution.description}
      </p>

      {solution.scopeNote && (
        <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          {solution.scopeNote}
        </p>
      )}

      <div
        className="my-5 h-px w-full sm:my-6"
        style={{ background: "var(--pricing-border-subtle)" }}
      />

      <ul className="flex flex-col gap-2.5">
        {solution.features.map((feature) => (
          <FeatureItem key={feature} text={feature} />
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <Link
          href={`/contact?tier=${encodeURIComponent(solution.name)}`}
          aria-label={`${solution.ctaLabel} — ${solution.name}`}
          className={cn(
            "group/cta inline-flex w-full items-center justify-center !gap-2 !px-5 !py-3 !text-[12.5px]",
            isFeatured ? "btn-v" : "btn-o"
          )}
          onClick={() =>
            trackEvent("solution_cta_clicked", {
              category,
              solution: solution.id,
              source: "solutions_section",
            })
          }
        >
          {solution.ctaLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
          >
            →
          </span>
        </Link>

        <p className="mt-3 text-center font-body text-[11px] leading-[1.5] text-white/[0.35]">
          {solution.microcopy}
        </p>
      </div>
    </article>
  );
}

function TabFooterBlock({
  footer,
  category,
}: {
  footer: TabFooter;
  category: TabId;
}) {
  return (
    <div className="mt-10 text-center sm:mt-12">
      <p className="mx-auto max-w-[560px] font-body text-[12.5px] leading-[1.6] text-white/45">
        {footer.note}
      </p>
      {footer.subNote && (
        <p className="mx-auto mt-2 max-w-[560px] font-body text-[11.5px] leading-[1.6] text-white/35">
          {footer.subNote}
        </p>
      )}
      {footer.prompt && (
        <p className="mt-5 font-body text-[13.5px] font-medium text-white/75">
          {footer.prompt}
        </p>
      )}
      {footer.cta && (
        <Link
          href={footer.cta.href}
          className="group/cta mt-3 inline-flex min-h-[44px] items-center gap-1.5 px-3 font-body text-[13px] font-semibold text-accent transition-colors duration-200 hover:text-white"
          onClick={() =>
            trackEvent("solution_cta_clicked", {
              category,
              solution: footer.cta?.solutionId ?? "recommendation",
              source: "solutions_section",
            })
          }
        >
          {footer.cta.label}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
          >
            →
          </span>
        </Link>
      )}
    </div>
  );
}

function StartingPointPanel() {
  return (
    <div
      className="mt-12 overflow-hidden rounded-2xl border border-white/[0.06] sm:mt-16"
      style={{
        background: "var(--brand-surface-2)",
        borderLeft: "3px solid var(--pricing-accent)",
      }}
    >
      <div className="flex flex-col gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[560px]">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Not sure where to start?
          </p>
          <h3 className="mt-2 font-display text-[19px] font-extrabold leading-[1.25] tracking-[-0.02em] text-white sm:text-[22px]">
            Tell us where your business is now. We&apos;ll show you what we&apos;d
            fix first.
          </h3>
          <p className="mt-2 font-body text-[12.5px] leading-[1.6] text-white/50">
            We&apos;ll look at your website, local visibility, competition, and
            customer journey and recommend the highest-impact next step.
          </p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center lg:shrink-0">
          <Link
            href="/audit"
            className="btn-v inline-flex items-center justify-center !gap-2 !px-5 !py-3 !text-[12.5px]"
            onClick={() =>
              trackEvent("solution_cta_clicked", {
                category: "general",
                solution: "free_business_audit",
                source: "solutions_section",
              })
            }
          >
            Get a Free Business Audit <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/contact"
            className="btn-o inline-flex items-center justify-center !gap-2 !px-5 !py-3 !text-[12.5px]"
            onClick={() =>
              trackEvent("solution_cta_clicked", {
                category: "general",
                solution: "start_project",
                source: "solutions_section",
              })
            }
          >
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PricingTiers() {
  const [activeTab, setActiveTab] = useState<TabId>("websites");
  const baseId = useId();
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    websites: null,
    marketing: null,
    drone: null,
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
    <section
      id="pricing"
      aria-label="Solutions"
      className="relative pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28"
    >
      {/* Alias anchor so both /#pricing and /#solutions resolve here */}
      <span id="solutions" aria-hidden="true" className="absolute top-0" />

      <style>{`
        .solution-card {
          transition: transform 200ms ease, background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }
        .solution-card:hover {
          transform: translateY(-3px);
          background: var(--brand-surface-3) !important;
          border-color: rgba(255,255,255,0.14);
        }
        .solution-card--featured:hover {
          border-color: rgba(200,255,0,0.34);
          box-shadow: 0 0 34px rgba(200,255,0,0.09);
        }
        @media (prefers-reduced-motion: reduce) {
          .solution-card { animation: none !important; }
          .solution-card:hover { transform: none; }
        }
        .pricing-tab {
          transition: background-color 200ms ease, color 200ms ease;
        }
        .pricing-tab[aria-selected="false"]:hover {
          color: rgba(255,255,255,0.85);
        }
      `}</style>

      <div className="wrap relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center sm:mb-11">
            <span className="section-label">Ways to work with us</span>
            <h2 className="mt-4 font-display text-[clamp(28px,4.5vw,46px)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white">
              Built Around Your Business.
              <span className="block">Not a Template Package.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[580px] font-body text-[13.5px] leading-[1.65] text-white/55">
              Every business has a different market, competition level, sales
              process, and growth goal. We build the right system around what
              you actually need — from a high-converting website to full
              customer acquisition.
            </p>
            <p className="mx-auto mt-3 max-w-[520px] font-body text-[12.5px] leading-[1.6] text-white/40">
              Choose what you&apos;re trying to accomplish and we&apos;ll
              recommend the right approach.
            </p>
          </div>

          <div className="mb-8 flex justify-center sm:mb-10 lg:mb-12">
            <div
              role="tablist"
              aria-label="Solution categories"
              className="inline-flex w-full max-w-[460px] rounded-full border border-white/[0.06] bg-white/[0.02] p-1"
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
                    className="pricing-tab relative min-w-0 flex-1 rounded-full px-2 py-2.5 font-body text-[11px] font-semibold sm:px-4 sm:text-[12.5px]"
                    style={{
                      color: isActive ? "var(--pricing-accent-dark)" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pricing-tab-active"
                        className="absolute inset-0 -z-0 rounded-full"
                        style={{ background: "var(--pricing-accent)" }}
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
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
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={{ duration: reducedMotion ? 0 : 0.15, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-stretch justify-center gap-5 pt-4 lg:gap-5">
                {activePanel.solutions.map((solution, i) => (
                  <div
                    key={`${activePanel.id}-${solution.id}`}
                    className="flex w-full max-w-[420px] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] lg:max-w-none"
                  >
                    <SolutionCard
                      solution={solution}
                      category={activePanel.id}
                      index={i}
                    />
                  </div>
                ))}
              </div>

              <TabFooterBlock footer={activePanel.footer} category={activePanel.id} />
            </motion.div>
          </AnimatePresence>

          <StartingPointPanel />

          <p className="mx-auto mt-12 max-w-[520px] text-center font-body text-[12px] leading-[1.6] text-white/35">
            All projects include direct access to senior engineers, clear scope
            upfront, and full code ownership.
          </p>
        </div>
      </div>
    </section>
  );
}
