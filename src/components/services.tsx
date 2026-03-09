"use client";
import { Rocket, Zap, Globe, Bot, ArrowRight, Check } from "lucide-react";
import { Reveal, Tilt } from "./shared";
import { services, deliveryTraits } from "@/lib/data";

const iconMap = { Rocket, Zap, Globe, Bot };

export function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1/60 to-surface-0" />
      <div className="wrap relative">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="section-label">What we build</span>
              <h2 className="section-title mt-3">Four things we do.<br className="hidden sm:block" /> All of them well.</h2>
            </div>
            <p className="max-w-[380px] text-[15px] leading-[1.75] text-body">
              A focused set of services delivered by senior engineers. No bloat, no juniors, no handoffs to offshore teams.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((sv, i) => {
            const Icon = iconMap[sv.icon];
            return (
              <Reveal key={sv.title} delay={i * 0.06}>
                <Tilt className="h-full">
                  <div className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.06] bg-gradient-to-br ${sv.gradient} p-8 transition-all duration-300 hover:border-v/[0.12]`}
                    style={{ boxShadow: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 20px 40px -12px rgba(0,0,0,0.35)" }}>
                    <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-v/[0.12] to-transparent" />

                    <div className="mb-5 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-v/[0.2] bg-gradient-to-br from-v/[0.1] to-cyan/[0.04] shadow-[0_0_24px_rgba(139,92,246,0.06)]">
                        <Icon size={20} className="text-v-light" />
                      </div>
                      <ArrowRight size={16} className="mt-1 text-dim opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-v-light group-hover:opacity-100" />
                    </div>

                    <h3 className="mb-1 font-display text-[22px] font-bold tracking-[-0.01em] text-white">{sv.title}</h3>
                    <p className="mb-1.5 font-mono text-[11px] text-cyan">{sv.tagline}</p>
                    <p className="mb-6 flex-1 text-sm leading-[1.75] text-body">{sv.desc}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {sv.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>

        {/* Delivery trust strip */}
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
            {deliveryTraits.map((trait, i) => (
              <span key={trait} className="flex items-center gap-2 text-[12px] text-dim">
                {i > 0 && <span className="hidden text-white/[0.08] sm:inline">&middot;</span>}
                <Check size={11} className="text-cyan/50" />
                {trait}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
