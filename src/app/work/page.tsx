"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared";
import { projects } from "@/lib/data";

export default function WorkPage() {
  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        <Reveal>
          <span className="section-label">Case Studies</span>
          <h1 className="mt-5 font-display text-[clamp(32px,5vw,52px)] font-black leading-[1.05] tracking-[-0.04em] text-white">Our Work</h1>
          <p className="mt-4 max-w-lg text-[15px] leading-[1.75] text-body">Real projects for real businesses. Every engagement scoped to solve a specific problem and deliver measurable results.</p>
        </Reveal>

        <div className="divider mt-10" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/work/${p.slug}`} className="card group flex h-full flex-col">
                <div className="h-[2px] rounded-t-2xl" style={{ background: p.live ? "linear-gradient(90deg, rgba(200,255,0,0.5), rgba(200,255,0,0.2), transparent)" : "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-surface-2 to-surface-3 sm:h-56">
                  <div className="flex h-full items-center justify-center"><span className="font-display text-lg font-bold text-white/[0.04]">{p.title}</span></div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">{p.category}</span>
                    {p.live && <span className="rounded-md border border-accent/[0.2] bg-accent/[0.06] px-2 py-0.5 text-[9px] font-bold text-accent">LIVE</span>}
                    {!p.live && p.slug === "kommison" && <span className="rounded-md border border-amber-400/[0.2] bg-amber-400/[0.06] px-2 py-0.5 text-[9px] font-bold text-amber-400">IN DEV</span>}
                  </div>
                  <h2 className="mt-1.5 font-display text-[18px] font-bold text-white transition-colors duration-200 group-hover:text-accent">{p.title}</h2>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-body">{p.tagline}</p>
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-accent/[0.1] bg-accent/[0.04] px-3.5 py-2.5">
                    <span className="text-accent/60">→</span>
                    <span className="text-[13px] font-semibold text-accent/80">{p.impact}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
