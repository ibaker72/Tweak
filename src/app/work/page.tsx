"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared";
import { projects } from "@/lib/data";

export default function WorkPage() {
  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <div className="wrap">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-v-light">Case Studies</span>
          <h1 className="mt-2 font-display text-[clamp(36px,5vw,52px)] font-black leading-[1.1] tracking-[-0.03em] text-white">Our Work</h1>
          <p className="mt-4 max-w-lg text-lg text-body">Real projects for real businesses. Every engagement scoped to solve a specific problem and deliver measurable results.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/work/${p.slug}`} className="card group flex h-full flex-col">
                <div className="h-[3px] rounded-t-[20px]" style={{ background: p.live ? "linear-gradient(90deg,#22C55E,#06B6D4,#8B5CF6)" : "linear-gradient(90deg,#8B5CF6,#06B6D4)" }} />
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-surface-2 to-surface-3 sm:h-56">
                  <div className="flex h-full items-center justify-center"><span className="font-display text-lg font-bold text-white/[0.04]">{p.title}</span></div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">{p.category}</span>
                    {p.live && <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">LIVE</span>}
                  </div>
                  <h2 className="mt-1 font-display text-xl font-bold text-white transition-colors group-hover:text-v-light">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{p.tagline}</p>
                  <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-v-border bg-v-dim px-3.5 py-2.5">
                    <ArrowUpRight size={13} className="text-v-light" /><span className="text-[13px] font-semibold text-v-light">{p.impact}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.slice(0, 4).map(t => <span key={t} className="rounded-md border border-white/[0.04] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] text-dim">{t}</span>)}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
