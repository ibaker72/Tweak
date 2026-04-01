"use client";
import { UserCheck, DollarSign, Lightbulb, KeyRound, Shield } from "lucide-react";
import { Reveal } from "./shared";

const steps = [
  {
    num: "01",
    title: "Senior-led execution",
    desc: "No revolving door of junior devs. Your project is led by experienced engineers who've shipped real products — not managed from a distance.",
    detail: "Direct access to senior engineers",
    icon: UserCheck,
  },
  {
    num: "02",
    title: "Fixed pricing, always",
    desc: "You get a locked price before we write a single line of code. No hourly billing, no scope creep surprises, no invoices that don't match the quote.",
    detail: "No hourly billing, ever",
    icon: DollarSign,
  },
  {
    num: "03",
    title: "Product thinking built in",
    desc: "We don't just build what you describe. We challenge assumptions, optimize for conversion, and make sure every feature serves a business goal.",
    detail: "Strategy meets engineering",
    icon: Lightbulb,
  },
  {
    num: "04",
    title: "You own everything",
    desc: "100% of the source code, design assets, and documentation transfer to you on final payment. No lock-in, no licensing fees, no hostage situations.",
    detail: "Full IP ownership on delivery",
    icon: KeyRound,
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-12 sm:py-36">
      <div className="wrap">
        {/* Mobile: compact vertical layout */}
        <div className="md:hidden">
          <Reveal>
            <span className="section-label">Why us</span>
            <h2 className="mt-4 font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
              Built different.
            </h2>
            <p className="mt-2 text-[13px] leading-[1.6] text-body">
              Product-focused studio that ships on time, on budget.
            </p>
          </Reveal>

          {/* Guarantee card */}
          <Reveal delay={0.06}>
            <div
              className="mt-5 flex items-start gap-3 rounded-xl border border-accent/[0.12] p-4"
              style={{
                background: "rgba(200,255,0,0.02)",
                boxShadow: "0 1px 0 rgba(200,255,0,0.04) inset",
              }}
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.06]">
                <Shield size={14} className="text-accent" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">Velocity without compromise</div>
                <p className="mt-1 text-[12px] leading-[1.6] text-body">
                  Led by Iyad Baker — senior engineering from day one on every project.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Compact proof cards */}
          <div className="mt-4 space-y-2">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={0.08 + i * 0.04}>
                <details
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.012]"
                  style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
                    <div className="flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-surface-0">
                      <span className="font-mono text-[11px] font-bold text-accent">{step.num}</span>
                    </div>
                    <h3 className="flex-1 font-display text-[15px] font-bold tracking-[-0.01em] text-white">{step.title}</h3>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-[12px] leading-[1.65] text-body">{step.desc}</p>
                    <div className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-accent/[0.10] bg-accent/[0.03] px-3 py-1">
                      <div className="h-1 w-1 rounded-full bg-accent/70" />
                      <span className="font-mono text-[9px] font-medium text-accent/80">{step.detail}</span>
                    </div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Desktop: original layout preserved */}
        <div className="hidden md:grid md:gap-14 lg:grid-cols-[400px,1fr] lg:gap-20">
          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="section-label">Why us</span>
              <h2 className="mt-5 font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Built different.
                <br />
                <span className="text-body">On purpose.</span>
              </h2>
              <p className="mt-5 max-w-[360px] text-[15px] leading-[1.75] text-body">
                We&apos;re not a body shop or a freelancer marketplace. We&apos;re a product-focused studio that ships — on time, on budget, every time.
              </p>
            </Reveal>

            {/* Guarantee */}
            <Reveal delay={0.15}>
              <div
                className="mt-10 flex items-start gap-4 rounded-2xl border border-accent/[0.12] p-6"
                style={{
                  background: "rgba(200,255,0,0.02)",
                  boxShadow: "0 1px 0 rgba(200,255,0,0.04) inset, 0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.06]">
                  <Shield size={16} className="text-accent" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white">Velocity without compromise</div>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-body">
                    Led by Iyad Baker, a product-minded engineer who&apos;s shipped software for startups, e-commerce brands, and funded SaaS companies. Every project gets senior engineering from day one.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: steps */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute bottom-0 left-[23px] top-0 hidden w-px lg:block" style={{ background: "linear-gradient(to bottom, rgba(200,255,0,0.2), rgba(255,255,255,0.04) 80%, transparent)" }} />

            <div className="space-y-5">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.08}>
                  <div
                    className="group relative flex gap-5 rounded-2xl border border-white/[0.06] p-7 transition-all duration-300 hover:border-white/[0.12] lg:gap-6 lg:p-8"
                    style={{
                      background: "rgba(255,255,255,0.012)",
                      boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                    }}
                  >
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
