"use client";
import { Rocket, Zap, Globe, Bot, ArrowRight, Check } from "lucide-react";
import { Reveal } from "./shared";

const services = [
  {
    icon: Rocket,
    title: "Web Applications",
    tagline: "Full-stack products that run your business",
    desc: "SaaS dashboards, internal tools, client portals. Auth, payments, real-time data, and the custom logic that makes your product work.",
    tags: ["Next.js", "React", "Tailwind UI", "Supabase", "Stripe"],
  },
  {
    icon: Zap,
    title: "Landing Pages & Funnels",
    tagline: "Pages that turn traffic into revenue",
    desc: "Conversion-engineered from the first pixel. Fast load, sharp messaging, strategic CTAs.",
    tags: ["Tailwind UI", "SEO", "A/B Testing", "Analytics"],
  },
  {
    icon: Globe,
    title: "E-Commerce & Storefronts",
    tagline: "Custom shopping experiences that sell",
    desc: "Headless builds, Shopify, and WooCommerce platforms your team can manage.",
    tags: ["Shopify", "Headless", "Custom Themes"],
  },
  {
    icon: Bot,
    title: "Automation & AI Systems",
    tagline: "Eliminate the work that slows you down",
    desc: "We connect your tools, automate repetitive workflows, and build AI-powered systems that save your team hours every week.",
    tags: ["OpenAI", "n8n", "Custom APIs", "Integrations"],
  },
];

const deliveryTraits = [
  "Mobile-first builds",
  "SEO from day one",
  "Performance optimized",
  "WCAG accessible",
  "Fully documented handoff",
];

export function ServicesNew() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="wrap">
        <Reveal>
          <div className="mb-16 sm:mb-20">
            <span className="section-label">What we build</span>
            <h2 className="mt-5 max-w-[560px] font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
              Four disciplines.{" "}
              <span className="text-body">One team that delivers all of them.</span>
            </h2>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5">
          {services.map((sv, i) => (
            <Reveal key={sv.title} delay={i * 0.06} className="h-full">
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] p-7 transition-all duration-300 hover:border-white/[0.12] lg:p-9"
                style={{
                  background: "rgba(255,255,255,0.012)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                }}
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_right,rgba(200,255,0,0.015),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon + title row */}
                <div className="relative mb-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-accent/15 bg-accent/[0.05]">
                    <sv.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-[19px] font-bold tracking-[-0.02em] text-white">{sv.title}</h3>
                    <p className="mt-1 font-mono text-[10px] text-accent/50">{sv.tagline}</p>
                  </div>
                </div>

                <p className="relative mb-7 flex-1 text-[13px] leading-[1.85] text-body sm:text-[14px]">{sv.desc}</p>

                <div className="relative flex flex-wrap gap-1.5">
                  {sv.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                {/* Hover arrow */}
                <ArrowRight
                  size={14}
                  className="absolute right-7 top-7 text-dim opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100 lg:right-9 lg:top-9"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Delivery strip */}
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
            {deliveryTraits.map((trait) => (
              <span key={trait} className="flex items-center gap-2 text-[12px] text-dim">
                <Check size={10} className="text-accent/50" />
                {trait}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
