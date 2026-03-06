"use client";
import { Rocket, Zap, Globe, Bot } from "lucide-react";
import { Reveal, Tilt } from "./shared";
import { services } from "@/lib/data";

const iconMap = { Rocket, Zap, Globe, Bot };

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1/60 to-surface-0" />
      <div className="wrap relative">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-v-light">Capabilities</span>
          <h2 className="mt-2 font-display text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">What we build</h2>
          <p className="mt-3 max-w-[440px] text-[15px] leading-[1.7] text-body">A focused set of services delivered by senior engineers. No bloat, no handoffs.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {services.map((sv, i) => {
            const Icon = iconMap[sv.icon];
            return (
              <Reveal key={sv.title} delay={i * 0.06}>
                <Tilt className="h-full">
                  <div className={`relative h-full overflow-hidden rounded-[20px] border border-white/[0.05] bg-gradient-to-br ${sv.gradient} p-8`}>
                    <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-v/[0.2] to-transparent" />
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] border border-v/[0.2] bg-gradient-to-br from-v/[0.1] to-cyan/[0.04] shadow-[0_0_24px_rgba(139,92,246,0.08)]">
                      <Icon size={20} className="text-v-light" />
                    </div>
                    <h3 className="mb-2 font-display text-[22px] font-bold tracking-[-0.01em] text-white">{sv.title}</h3>
                    <p className="mb-5 text-sm leading-[1.75] text-body">{sv.desc}</p>
                    <div className="flex flex-wrap gap-1.5">{sv.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
