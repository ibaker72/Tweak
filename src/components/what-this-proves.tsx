"use client";

import { Layers, Workflow, FileText, Repeat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./shared";

type ProofPoint = {
  icon: LucideIcon;
  text: string;
};

const proofPoints: ProofPoint[] = [
  {
    icon: Layers,
    text: "I do not just design websites — I build business systems.",
  },
  {
    icon: Workflow,
    text: "I connect websites to databases, CRMs, forms, automations, and AI workflows.",
  },
  {
    icon: FileText,
    text: "I can document the full process from idea to launch to measurable outcome.",
  },
  {
    icon: Repeat,
    text: "Every project becomes reusable proof for future clients.",
  },
];

export function WhatThisProves() {
  return (
    <section className="relative py-14 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_50%_50%,rgba(200,255,0,0.025),transparent)]" />

      <div className="wrap relative">
        <Reveal>
          <div className="max-w-[680px]">
            <span className="section-label">What this proves</span>
            <h2 className="mt-4 font-display text-[clamp(26px,4.5vw,44px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
              The work behind the work.
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-2">
          {proofPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.text} delay={i * 0.05}>
                <div
                  className="group relative flex h-full items-start gap-4 rounded-2xl border border-white/[0.06] p-5 transition-all duration-300 hover:border-accent/[0.2] sm:p-6"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.008))",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.02) inset",
                  }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.06] text-accent transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(200,255,0,0.15)]">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <p className="text-[14px] font-medium leading-[1.65] text-white/85 sm:text-[15px]">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
