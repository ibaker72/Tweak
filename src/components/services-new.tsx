"use client";
import { Rocket, Zap, Globe, Bot, Cpu } from "lucide-react";
import { Reveal } from "./shared";

const steps = [
  {
    num: "01",
    title: "Web Applications",
    desc: "SaaS dashboards, internal tools, client portals. Auth, payments, real-time data, and the custom logic that makes your product work.",
    detail: "Next.js · React · Supabase · Stripe",
    icon: Rocket,
  },
  {
    num: "02",
    title: "Landing Pages & Funnels",
    desc: "Conversion-engineered from the first pixel. Fast load, sharp messaging, strategic CTAs. Built to make your ad spend work harder.",
    detail: "Tailwind UI · SEO · A/B Testing",
    icon: Zap,
  },
  {
    num: "03",
    title: "E-Commerce & Storefronts",
    desc: "Headless builds, custom Shopify themes, and WooCommerce platforms. Sites your team can manage without filing a support ticket.",
    detail: "Shopify · Headless · Custom Themes",
    icon: Globe,
  },
  {
    num: "04",
    title: "Automation & AI Systems",
    desc: "We connect your tools, automate repetitive workflows, and build AI-powered systems that save your team real hours every week.",
    detail: "OpenAI · n8n · Custom APIs",
    icon: Bot,
  },
];

export function ServicesNew() {
  return (
    <section id="services" className="relative py-20 sm:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[400px,1fr] lg:gap-20">
          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="section-label">What we build</span>
              <h2 className="mt-5 font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                End to end.
                <br />
                <span className="text-body">Pixel to deploy.</span>
              </h2>
              <p className="mt-4 max-w-[360px] text-[14px] leading-[1.7] text-body sm:mt-5 sm:text-[15px] sm:leading-[1.75]">
                Four disciplines. One team that delivers all of them. From product strategy to production deployment, we handle the full stack.
              </p>
            </Reveal>

            {/* Callout card */}
            <Reveal delay={0.15}>
              <div
                className="mt-6 flex items-start gap-4 rounded-2xl border border-accent/[0.12] p-5 sm:mt-10 sm:p-6"
                style={{
                  background: "rgba(200,255,0,0.02)",
                  boxShadow: "0 1px 0 rgba(200,255,0,0.04) inset, 0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.06]">
                  <Cpu size={16} className="text-accent" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white">Full-stack delivery standard</div>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-body">
                    Mobile-first, SEO-ready, performance optimized, WCAG accessible, and fully documented on every build. No exceptions.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: service cards */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute bottom-0 left-[23px] top-0 hidden w-px lg:block" style={{ background: "linear-gradient(to bottom, rgba(200,255,0,0.2), rgba(255,255,255,0.04) 80%, transparent)" }} />

            <div className="mobile-rail md:hidden">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.08}>
                  <article
                    className="mobile-rail-card rounded-2xl border border-white/[0.06] bg-white/[0.012] p-5"
                    style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative z-10 flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-surface-0">
                        <span className="font-mono text-[12px] font-bold text-accent">{step.num}</span>
                      </div>
                      <h3 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">{step.title}</h3>
                    </div>
                    <p className="mt-3 max-h-[3.6rem] overflow-hidden text-[13px] leading-[1.7] text-body">{step.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/[0.10] bg-accent/[0.03] px-3.5 py-1.5">
                      <div className="h-1 w-1 rounded-full bg-accent/70" />
                      <span className="font-mono text-[10px] font-medium text-accent/80">{step.detail}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="hidden space-y-5 md:block">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.08}>
                  <div
                    className="group relative flex gap-5 rounded-2xl border border-white/[0.06] p-7 transition-all duration-300 hover:border-white/[0.12] lg:gap-6 lg:p-8"
                    style={{
                      background: "rgba(255,255,255,0.012)",
                      boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                    }}
                  >
                    {/* Number badge */}
                    <div className="relative z-10 flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-surface-0">
                      <span className="font-mono text-[13px] font-bold text-accent">{step.num}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-[19px] font-bold tracking-[-0.01em] text-white">{step.title}</h3>
                        <step.icon size={14} className="text-dim/60" />
                      </div>
                      <p className="mt-2.5 text-[13px] leading-[1.85] text-body sm:text-[14px]">{step.desc}</p>
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/[0.10] bg-accent/[0.03] px-3.5 py-1.5">
                        <div className="h-1 w-1 rounded-full bg-accent/70" />
                        <span className="font-mono text-[10px] font-medium text-accent/80">{step.detail}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
