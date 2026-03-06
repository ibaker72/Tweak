"use client";
import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { Reveal, Tilt } from "./shared";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="work" className="bg-gradient-to-b from-surface-0 via-surface-1 to-surface-0 py-24 sm:py-28">
      <div className="wrap">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-v-light">Case Studies</span>
              <h2 className="mt-2 font-display text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">Work that moved the needle</h2>
            </div>
            <span className="hidden items-center gap-2 font-mono text-[11px] text-dim sm:flex"><MoveRight size={14} /> Scroll</span>
          </div>
        </Reveal>
      </div>
      <div style={{ paddingLeft: "max(28px, calc((100vw - 1200px)/2 + 28px))" }}>
        <div className="project-scroll">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="w-[400px] flex-shrink-0">
              <Tilt className="h-full">
                <Link href={`/work/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-v/[0.08] transition-all duration-300 hover:border-v/[0.15] hover:-translate-y-1" style={{ background: "linear-gradient(170deg, #0C0C14, #111119)" }}>
                  <div className="h-[3px] rounded-t-[20px]" style={{ background: p.live ? "linear-gradient(90deg,#22C55E,#06B6D4,#8B5CF6)" : "linear-gradient(90deg,#8B5CF6,#06B6D4)" }} />
                  <div className="flex items-start justify-between border-b border-white/[0.04] px-6 pb-4 pt-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">{p.category}</span>
                        {p.live && <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">LIVE</span>}
                      </div>
                      <h3 className="mt-1 font-display text-[21px] font-bold text-white transition-colors group-hover:text-v-light">{p.title}</h3>
                    </div>
                    <span className="font-mono text-[11px] text-dim">{p.year}</span>
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                    <div className="mb-5 flex flex-col gap-3">
                      {[{ label: "Problem", text: p.problem, color: "#EF4444" }, { label: "Solution", text: p.solutionShort, color: "#06B6D4" }, { label: "Impact", text: p.impactShort, color: "#22C55E" }].map(s => (
                        <div key={s.label}>
                          <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: s.color }}>
                            <div className="h-1.5 w-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}44` }} />
                            {s.label}
                          </div>
                          <p className={`text-[13px] leading-[1.65] ${s.label === "Impact" ? "font-medium text-gray-200" : "text-body"}`}>{s.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-1.5">{p.stack.slice(0, 3).map(t => <span key={t} className="rounded-md border border-white/[0.04] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] text-dim">{t}</span>)}</div>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
          <div className="w-10 flex-shrink-0" />
        </div>
      </div>
      <div className="wrap mt-6">
        <Reveal delay={0.3}>
          <Link href="/work" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-dim transition-colors hover:text-v">
            View all case studies <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
