"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";
import {
  pricingCategories,
  pricingTiers,
  type PricingCategory,
  type PricingCategoryId,
  type PricingTier,
} from "@/lib/pricing-data";

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const isPopular = tier.popular;

  return (
    <Reveal delay={index * 0.08}>
      <article
        aria-label={`${tier.name} pricing`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-7",
          "transition-all duration-300 ease-out will-change-transform",
          "hover:-translate-y-1 hover:border-white/20",
          isPopular
            ? "border-accent/30 bg-[linear-gradient(170deg,rgba(200,255,0,0.08),rgba(255,255,255,0.02)_38%,rgba(255,255,255,0.01)_100%)] shadow-[0_20px_70px_rgba(200,255,0,0.05)]"
            : "border-white/10 bg-[linear-gradient(170deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015)_45%,rgba(255,255,255,0.01)_100%)]",
        )}
      >
        {isPopular && (
          <span className="absolute right-5 top-5 rounded-full border border-accent/35 bg-accent/8 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
            Most Popular
          </span>
        )}

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">{tier.kicker}</p>
        <h3 className="mt-3 max-w-[18ch] text-balance font-display text-[27px] font-semibold leading-[1.12] text-white">
          {tier.name}
        </h3>

        <div className="mt-5 flex items-end gap-1.5">
          <span className="font-display text-[40px] font-semibold leading-none tracking-tight text-white">{tier.price}</span>
          {tier.priceSuffix && <span className="pb-1 text-sm text-white/70">{tier.priceSuffix}</span>}
        </div>

        <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-white/72">{tier.summary}</p>

        <ul className="mt-6 flex-1 space-y-3.5 border-t border-white/10 pt-6">
          {tier.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/76">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.2} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-7 grid gap-2.5 border-t border-white/10 pt-5 text-[12px] text-white/68 sm:grid-cols-3 sm:gap-2">
          {tier.meta.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 sm:min-h-[68px]"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.11em] text-white/45">{item.label}</dt>
              <dd className="mt-1 text-[12px] leading-snug text-white/80">{item.value}</dd>
            </div>
          ))}
        </dl>

        <Link
          href={tier.ctaHref}
          className={cn(
            "mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]",
            isPopular
              ? "bg-accent text-surface-0 hover:bg-accent/90"
              : "border border-white/15 bg-white/[0.03] text-white hover:border-white/25 hover:bg-white/[0.06]",
          )}
        >
          {tier.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>
    </Reveal>
  );
}

function PricingTabs({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: PricingCategory[];
  activeTab: PricingCategoryId;
  onTabChange: (tab: PricingCategoryId) => void;
}) {

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    if (event.key === "Home") {
      onTabChange(categories[0].id);
      return;
    }

    if (event.key === "End") {
      onTabChange(categories[categories.length - 1].id);
      return;
    }

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + categories.length) % categories.length;
    onTabChange(categories[nextIndex].id);
  };

  return (
    <div
      role="tablist"
      aria-label="Pricing categories"
      className="grid w-full grid-cols-1 gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:grid-cols-3"
    >
      {categories.map((category, index) => {
        const isActive = activeTab === category.id;

        return (
          <button
            key={category.id}
            id={`pricing-tab-${category.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`pricing-panel-${category.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(category.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "rounded-xl px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
              isActive
                ? "bg-accent/12 text-white shadow-[inset_0_0_0_1px_rgba(200,255,0,0.35)]"
                : "text-white/65 hover:bg-white/[0.035] hover:text-white/85",
            )}
          >
            <p className="text-[14px] font-semibold leading-none">{category.label}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-white/55">{category.description}</p>
          </button>
        );
      })}
    </div>
  );
}

export function PricingTiers() {
  const [activeCategory, setActiveCategory] = useState<PricingCategoryId>("launch");

  const visibleTiers = useMemo(
    () => pricingTiers.filter((tier) => tier.categoryId === activeCategory),
    [activeCategory],
  );

  const isSingleCardLayout = visibleTiers.length === 1;

  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_28%,rgba(200,255,0,0.08),transparent_45%)]" />

      <div className="wrap relative">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                Pricing
                <span className="h-1 w-1 rounded-full bg-accent/80" />
                Senior delivery. Clear scope.
              </span>

              <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[36px] font-semibold leading-[1.08] text-white sm:text-[44px] lg:text-[54px]">
                Pricing.
              </h2>

              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                Choose the engagement style that matches your stage. Every project includes upfront scope,
                delivery cadence, and direct access to senior engineering.
              </p>

              <p className="mt-4 text-[13px] font-medium text-white/55">
                Typical onboarding starts within 5 business days after scope alignment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10">
              <PricingTabs
                categories={pricingCategories}
                activeTab={activeCategory}
                onTabChange={setActiveCategory}
              />
            </div>
          </Reveal>

          <div
            id={`pricing-panel-${activeCategory}`}
            role="tabpanel"
            aria-labelledby={`pricing-tab-${activeCategory}`}
            className="mt-8"
          >
            <div
              className={cn(
                "grid gap-4 sm:gap-5 lg:gap-6",
                isSingleCardLayout
                  ? "grid-cols-1 lg:grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2",
              )}
            >
              {visibleTiers.map((tier, index) => (
                <PricingCard key={tier.id} tier={tier} index={index} />
              ))}
            </div>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.02] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-[15px] text-white/72">Need something custom?</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  Let&apos;s talk
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <span className="hidden h-4 w-px bg-white/15 sm:block" />
                <Link
                  href="/tools/cost-calculator"
                  className="group inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  Try our cost calculator
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
