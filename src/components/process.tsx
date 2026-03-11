"use client";

import { Shield, Search, FileText, Code2, Rocket } from "lucide-react";
import { Reveal, Tilt } from "./shared";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We get on a call, define the problem, map your goals, and determine if we're the right fit. No pitch deck. Just clarity.",
    icon: Search,
    color: "#8B5CF6",
    detail: "30 min call — free, no commitment",
  },
  {
    num: "02",
    title: "Proposal",
    desc: "Within 72 hours you get a fixed-price proposal. Every feature, milestone, timeline, and dollar is locked before we write a single line of code.",
    icon: FileText,
    color: "#06B6D4",
    detail: "Fixed price — no hourly billing",
  },
  {
    num: "03",
    title: "Build",
    desc: "Weekly sprints with live preview links. You see real progress every 7 days and steer the direction at each checkpoint.",
    icon: Code2,
    color: "#A78BFA",
    detail: "Weekly demos — full transparency",
  },
  {
    num: "04",
    title: "Launch",
    desc: "We deploy to production, run QA, hand over documentation and a full walkthrough. Your code, your IP, your competitive advantage.",
    icon: Rocket,
    color: "#22C55E",
    detail: "30 days post-launch support included",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1/50 to-surface-0" />

      <div className="wrap relative">
        <Reveal>
          <div className="mx-auto mb-16 max-w-[520px] text-center">
            <span className="section-label">How we work</span>
            <h2 className="section-title mt-3">Four steps. Zero mystery.</h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-body">
              A proven process that turns your idea into a shipped product with full transparency at every stage.
            </p>
          </div>
        </Reveal>

        {/* Desktop: horizontal layout */}
        <div className="hidden lg:block">
          {/* Connecting line */}
          <div className="relative mx-auto mb-10 max-w-[900px]">
            <div className="absolute left-[12.5%] right-[12.5%] top-[24px] h-px">
              <div className="h-full w-full bg-gradient-to-r from-v/25 via-cyan/15 to-emerald-400/25" />
            </div>

            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border"
                      style={{
                        borderColor: `${step.color}25`,
                        background: `linear-gradient(135deg, ${step.color}12, ${step.color}04)`,
                      }}>
                      <step.icon size={20} style={{ color: step.color }} />
                    </div>
                    <div className="mb-1.5 font-mono text-[10px] tracking-[0.1em]" style={{ color: step.color }}>
                      Step {step.num}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Detail cards */}
          <div className="mx-auto grid max-w-[960px] grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <Reveal key={`d-${step.num}`} delay={0.3 + i * 0.08}>
                <Tilt>
                  <div className="h-full rounded-[18px] border border-white/[0.05] p-5" style={{ background: `linear-gradient(170deg, ${step.color}05, rgba(14,14,24,0.9))` }}>
                    <p className="mb-3 text-[13px] leading-[1.7] text-body">{step.desc}</p>
                    <div className="flex items-center gap-1.5 rounded-full border px-2.5 py-[3px]" style={{ borderColor: `${step.color}12`, background: `${step.color}04`, boxShadow: `inset 0 0.5px 0 ${step.color}0a` }}>
                      <div className="h-1 w-1 rounded-full" style={{ background: step.color }} />
                      <span className="font-mono text-[9px] tracking-[0.03em]" style={{ color: step.color }}>{step.detail}</span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical cards */}
        <div className="space-y-3 lg:hidden">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative overflow-hidden rounded-[18px] border border-white/[0.05] p-6" style={{ background: `linear-gradient(170deg, ${step.color}05, rgba(14,14,24,0.9))` }}>
                <div className="absolute left-0 right-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${step.color}30, transparent)` }} />
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border" style={{ borderColor: `${step.color}20`, background: `${step.color}08` }}>
                    <step.icon size={18} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.1em]" style={{ color: step.color }}>Step {step.num}</div>
                    <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="mb-3 text-[13px] leading-[1.7] text-body">{step.desc}</p>
                <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px]" style={{ borderColor: `${step.color}12`, background: `${step.color}04`, boxShadow: `inset 0 0.5px 0 ${step.color}0a` }}>
                  <div className="h-1 w-1 rounded-full" style={{ background: step.color }} />
                  <span className="font-mono text-[9px] tracking-[0.03em]" style={{ color: step.color }}>{step.detail}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Guarantee */}
        <Reveal delay={0.5}>
          <div className="mt-14 flex flex-wrap items-center gap-4 rounded-2xl border border-v/[0.12] bg-gradient-to-r from-v/[0.04] to-cyan/[0.02] px-7 py-5">
            <Shield size={18} className="text-v-light" />
            <p className="text-[14px] text-gray-300">
              <strong className="text-white">Our guarantee:</strong> Milestone-based billing. If we don&apos;t deliver the agreed scope, full refund for that milestone. No exceptions.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
