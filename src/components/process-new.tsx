"use client";
import { Search, FileText, Code2, Rocket, Shield } from "lucide-react";
import { Reveal } from "./shared";

const steps = [
  {
    num: "01",
    title: "Discovery call",
    desc: "30-minute call to define the problem, map your goals, and determine fit. No pitch deck. Just clarity.",
    detail: "Free — no commitment",
    icon: Search,
  },
  {
    num: "02",
    title: "Fixed-price proposal",
    desc: "Within 72 hours you get a locked proposal. Every feature, milestone, timeline, and dollar agreed before we write a line of code.",
    detail: "No hourly billing, ever",
    icon: FileText,
  },
  {
    num: "03",
    title: "Weekly sprints",
    desc: "Live preview links every 7 days. You see real progress and steer the direction at each checkpoint. No surprises at the end.",
    detail: "Full transparency",
    icon: Code2,
  },
  {
    num: "04",
    title: "Launch & handoff",
    desc: "We deploy to production, run QA, hand over documentation, credentials, and full source code. Your code, your IP, your advantage.",
    detail: "30 days post-launch support",
    icon: Rocket,
  },
];

export function ProcessNew() {
  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-[400px,1fr] lg:gap-20">
          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="section-label">How we work</span>
              <h2 className="mt-5 font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Four steps.
                <br />
                <span className="text-body">Zero mystery.</span>
              </h2>
              <p className="mt-5 max-w-[360px] text-[15px] leading-[1.75] text-body">
                A proven process that turns your idea into a shipped product. Fixed pricing,
                weekly demos, and full transparency at every stage.
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
                  <div className="text-[14px] font-bold text-white">Milestone-based billing guarantee</div>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-body">
                    If we don&apos;t deliver the agreed scope for a milestone, full refund for that milestone. No exceptions.
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
                    {/* Step number */}
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
