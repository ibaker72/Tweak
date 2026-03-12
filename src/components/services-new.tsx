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
    size: "large",
  },
  {
    icon: Zap,
    title: "Landing Pages & Funnels",
    tagline: "Pages that turn traffic into revenue",
    desc: "Conversion-engineered from the first pixel. Fast load, sharp messaging, strategic CTAs.",
    tags: ["Tailwind UI", "SEO", "A/B Testing", "Analytics"],
    size: "small",
  },
  {
    icon: Globe,
    title: "E-Commerce & Storefronts",
    tagline: "Custom shopping experiences that sell",
    desc: "Headless builds, Shopify, and WooCommerce platforms your team can manage.",
    tags: ["Shopify", "Headless", "Custom Themes"],
    size: "small",
  },
  {
    icon: Bot,
    title: "Automation & AI Systems",
    tagline: "Eliminate the work that slows you down",
    desc: "We connect your tools, automate repetitive workflows, and build AI-powered systems that save your team hours every week.",
    tags: ["OpenAI", "n8n", "Custom APIs", "Integrations"],
    size: "large",
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
    <section id="services" className="relative py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <div className="mb-14">
            <span className="section-label">What we build</span>
            <h2 className="mt-4 max-w-[540px] font-display text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
              Four disciplines.{" "}
              <span className="text-body">One team that delivers all of them.</span>
            </h2>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
          {services.map((sv, i) => (
            <Reveal key={sv.title} delay={i * 0.06} className="h-full">
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 shadow-[0_1px_0_rgba(255,255,255,0.02)_inset] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.025] lg:p-8"
              >
                {/* Icon + title row */}
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-accent/20 bg-accent/[0.06]">
                    <sv.icon size={17} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white">{sv.title}</h3>
                    <p className="mt-0.5 font-mono text-[10px] text-accent/60">{sv.tagline}</p>
                  </div>
                </div>

                <p className="mb-6 flex-1 text-[13px] leading-[1.8] text-body">{sv.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {sv.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                {/* Hover arrow */}
                <ArrowRight
                  size={14}
                  className="absolute right-7 top-7 text-dim opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Delivery strip */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 sm:gap-x-10">
            {deliveryTraits.map((trait) => (
              <span key={trait} className="flex items-center gap-2 text-[11px] text-dim">
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
