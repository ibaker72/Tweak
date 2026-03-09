"use client";
import { Check } from "lucide-react";
import { Reveal, Tilt } from "./shared";
import { differentiators, techStack } from "@/lib/data";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1/50 to-surface-0" />
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04),transparent_70%)] blur-[60px]" />

      <div className="wrap relative">
        <Reveal>
          <div className="mb-14">
            <span className="section-label">Why us</span>
            <h2 className="section-title mt-3">Not another generic agency.</h2>
            <p className="mt-4 max-w-[520px] text-[15px] leading-[1.75] text-body">
              We&apos;re a small, senior team that treats your product like our own. Here&apos;s what makes working with us different.
            </p>
          </div>
        </Reveal>

        {/* Differentiators grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <Tilt className="h-full">
                <div className="flex h-full gap-4 rounded-[20px] border border-white/[0.06] p-7 transition-all duration-300 hover:border-v/[0.1] shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_20px_40px_-12px_rgba(0,0,0,0.35)]" style={{ background: "linear-gradient(170deg, rgba(14,14,24,0.95), rgba(10,10,18,0.98))" }}>
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-v/[0.2] bg-gradient-to-br from-v/[0.1] to-cyan/[0.04]">
                    <Check size={14} className="text-v-light" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-[17px] font-bold text-white">{d.title}</h3>
                    <p className="text-[14px] leading-[1.75] text-body">{d.desc}</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {/* Founder + Tech stack card */}
        <Reveal delay={0.3}>
          <div className="mx-auto max-w-[720px]">
            <Tilt>
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.06] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_24px_48px_-12px_rgba(0,0,0,0.35)] sm:p-10" style={{ background: "linear-gradient(170deg, rgba(14,14,24,0.95), rgba(10,10,18,0.98))" }}>
                <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-v/[0.2] to-transparent" />

                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-v/[0.2] bg-gradient-to-br from-v/[0.12] to-cyan/[0.06] shadow-[0_0_32px_rgba(139,92,246,0.08)]">
                      <span className="font-display text-2xl font-black text-v-light">IB</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-[16px] leading-[1.85] text-gray-300">
                      <strong className="text-white">Tweak & Build</strong> is led by <strong className="text-white">Iyad Baker</strong>, a product-minded engineer who&apos;s shipped software for startups, e-commerce brands, and funded SaaS companies. Every project gets senior engineering from day one.
                    </p>
                    <p className="mt-3 text-[15px] leading-[1.85] text-body">
                      Our philosophy: <strong className="text-white/90">velocity without compromise.</strong> We move fast, but we don&apos;t cut corners. The code we hand you is production-grade, documented, and built to scale.
                    </p>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mt-8 flex flex-wrap justify-center gap-2 border-t border-white/[0.06] pt-7">
                  {techStack.map((t) => (
                    <div
                      key={t.name}
                      className="flex cursor-default items-center gap-2 rounded-[10px] border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 transition-all duration-300 hover:-translate-y-0.5"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${t.color}33`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${t.color}0a`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: t.color, boxShadow: `0 0 6px ${t.color}33` }} />
                      <span className="font-mono text-[11px] font-medium text-gray-400">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Tilt>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
