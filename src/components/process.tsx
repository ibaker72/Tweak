"use client";

import { Shield, Search, FileText, Code2, Rocket, ArrowRight, CheckCircle } from "lucide-react";
import { Reveal, Tilt } from "./shared";

const steps = [
  {
    num: "01",
    title: "Discovery",
    subtitle: "Understand goals and architecture",
    desc: "We get on a call, define the problem, map your goals, and determine if we're the right fit. No pitch, no deck. Just clarity.",
    icon: Search,
    color: "#8B5CF6",
    visual: (
      <div className="mt-4 flex items-center gap-2">
        {["Goals", "Stack", "Timeline"].map((l, i) => (
          <div key={l} className="flex items-center gap-1.5 rounded-lg border border-v/[0.12] bg-v/[0.04] px-2.5 py-1"
            style={{ animationDelay: `${i * 0.15}s` }}>
            <CheckCircle size={10} className="text-v-light" />
            <span className="font-mono text-[10px] text-v-light">{l}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "02",
    title: "Plan",
    subtitle: "Define features, stack, and timeline",
    desc: "Within 72 hours you get a fixed-price proposal. Every feature, milestone, timeline, and dollar is locked before we write a single line of code.",
    icon: FileText,
    color: "#06B6D4",
    visual: (
      <div className="mt-4 space-y-1.5">
        {[{ w: "100%", l: "Scope document" }, { w: "75%", l: "Technical spec" }, { w: "50%", l: "Timeline" }].map(b => (
          <div key={b.l} className="flex items-center gap-2">
            <div className="h-[6px] rounded-full bg-gradient-to-r from-cyan/40 to-cyan/10" style={{ width: b.w }} />
            <span className="whitespace-nowrap font-mono text-[9px] text-dim">{b.l}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Build",
    subtitle: "Weekly demos and iterative sprints",
    desc: "Our team works in weekly sprints with live preview links. You see real progress every 7 days and can steer the direction at each checkpoint.",
    icon: Code2,
    color: "#A78BFA",
    visual: (
      <div className="mt-4 flex gap-1.5">
        {["W1", "W2", "W3", "W4", "W5", "W6"].map((w, i) => (
          <div key={w} className="flex flex-1 flex-col items-center gap-1">
            <div className="h-8 w-full rounded-md transition-all" style={{
              background: i < 4
                ? `linear-gradient(180deg, rgba(167,139,250,${0.15 + i * 0.1}), rgba(167,139,250,0.03))`
                : "rgba(255,255,255,0.02)",
              border: i < 4 ? "1px solid rgba(167,139,250,0.15)" : "1px solid rgba(255,255,255,0.04)",
            }} />
            <span className="font-mono text-[8px] text-dim">{w}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "04",
    title: "Launch",
    subtitle: "Deployment and post-launch support",
    desc: "We deploy to production, run QA, hand over full documentation and a walkthrough. Your code, your IP, your competitive advantage.",
    icon: Rocket,
    color: "#22C55E",
    visual: (
      <div className="mt-4 flex items-center gap-3">
        {[{ l: "Deploy", done: true }, { l: "QA", done: true }, { l: "Handoff", done: true }, { l: "Support", done: false }].map(s => (
          <div key={s.l} className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${s.done ? "bg-emerald-400 shadow-[0_0_6px_rgba(34,197,94,0.4)]" : "border border-white/[0.15] bg-transparent"}`} />
            <span className="font-mono text-[10px] text-dim">{s.l}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-28">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1/50 to-surface-0" />

      <div className="wrap relative">
        <Reveal>
          <div className="mx-auto mb-16 max-w-[520px] text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-cyan">How we work</span>
            <h2 className="mt-2 font-display text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
              Four steps. Zero mystery.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-body">
              A repeatable process that turns your idea into a shipped product with full transparency at every stage.
            </p>
          </div>
        </Reveal>

        {/* Desktop: horizontal connected timeline */}
        <div className="hidden lg:block">
          {/* Connecting line */}
          <div className="relative mx-auto mb-12 max-w-[900px]">
            <div className="absolute left-[12.5%] right-[12.5%] top-[28px] h-[2px]">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-v/30 via-cyan/20 to-emerald-400/30" />
              {/* Animated glow on the line */}
              <div className="absolute inset-y-0 left-0 h-full w-1/3 animate-[shimmer_3s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-v/40 to-transparent" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    {/* Icon node */}
                    <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-[0_0_24px_rgba(0,0,0,0.3)]"
                      style={{
                        borderColor: `${step.color}30`,
                        background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                        boxShadow: `0 0 32px ${step.color}10`,
                      }}>
                      <step.icon size={22} style={{ color: step.color }} />
                      {/* Pulse ring */}
                      <div className="absolute inset-0 animate-[pingSlowly_3s_ease-in-out_infinite] rounded-2xl border" style={{ borderColor: `${step.color}15` }} />
                    </div>

                    {/* Step number */}
                    <div className="mb-2 font-mono text-[11px] tracking-[0.1em]" style={{ color: step.color }}>
                      Step {step.num}
                    </div>
                    <h3 className="mb-1 font-display text-xl font-bold text-white">{step.title}</h3>
                    <p className="mb-1 text-[12px] font-medium text-gray-400">{step.subtitle}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Detail cards below */}
          <div className="mx-auto grid max-w-[960px] grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <Reveal key={`detail-${step.num}`} delay={0.3 + i * 0.08}>
                <Tilt>
                  <div className="h-full rounded-[18px] border border-white/[0.05] p-5" style={{ background: `linear-gradient(170deg, ${step.color}06, rgba(17,17,25,0.8))` }}>
                    <p className="text-[13px] leading-[1.7] text-body">{step.desc}</p>
                    {step.visual}
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical cards */}
        <div className="space-y-4 lg:hidden">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative overflow-hidden rounded-[18px] border border-white/[0.05] p-6" style={{ background: `linear-gradient(170deg, ${step.color}06, rgba(17,17,25,0.8))` }}>
                {/* Top accent */}
                <div className="absolute left-0 right-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${step.color}44, transparent)` }} />
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border" style={{ borderColor: `${step.color}25`, background: `${step.color}10` }}>
                    <step.icon size={20} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.1em]" style={{ color: step.color }}>Step {step.num}</div>
                    <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="text-[13px] leading-[1.7] text-body">{step.desc}</p>
                {step.visual}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Guarantee */}
        <Reveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl border border-v/[0.15] bg-gradient-to-r from-v/[0.04] to-cyan/[0.02] px-6 py-4">
            <Shield size={18} className="text-v-light" />
            <p className="text-sm text-gray-300">
              <strong className="text-white">Our guarantee:</strong> Milestone-based billing. If we don&apos;t deliver the agreed scope, full refund. No exceptions.
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}
        @keyframes pingSlowly{0%,100%{transform:scale(1);opacity:0.4}50%{transform:scale(1.15);opacity:0}}
      `}</style>
    </section>
  );
}
