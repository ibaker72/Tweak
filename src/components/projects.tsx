"use client";
import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { Reveal, Tilt } from "./shared";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="work" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1/70 to-surface-0" />

      <div className="wrap relative">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="section-label">Selected Work</span>
              <h2 className="section-title mt-3">Real projects.<br className="hidden sm:block" /> Measurable outcomes.</h2>
            </div>
            <span className="hidden items-center gap-2 font-mono text-[11px] text-dim sm:flex"><MoveRight size={14} /> Scroll to explore</span>
          </div>
        </Reveal>
      </div>

      <div style={{ paddingLeft: "max(28px, calc((100vw - 1200px)/2 + 28px))" }}>
        <div className="project-scroll">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="w-[420px] flex-shrink-0">
              <Tilt className="h-full">
                <Link href={`/work/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-v/[0.12] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.25)]">
                  {/* Top gradient bar */}
                  <div className="h-[3px]" style={{ background: p.live ? "linear-gradient(90deg,#22C55E,#06B6D4,#8B5CF6)" : "linear-gradient(90deg,#8B5CF6,#06B6D4)" }} />

                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-white/[0.04] px-7 pb-5 pt-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">{p.category}</span>
                        {p.live && <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-2.5 py-[3px] font-mono text-[9px] font-medium tracking-[0.06em] text-emerald-400/90" style={{ boxShadow: "inset 0 0.5px 0 rgba(52,211,153,0.08)" }}>LIVE</span>}
                      </div>
                      <h3 className="mt-1.5 font-display text-[22px] font-bold text-white transition-colors group-hover:text-v-light">{p.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-dim">{p.year}</span>
                      <ArrowUpRight size={14} className="text-dim opacity-0 transition-all group-hover:text-v-light group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
                    {/* Problem / Solution / Impact */}
                    <div className="mb-6 flex flex-col gap-3.5">
                      {[
                        { label: "Challenge", text: p.problem, color: "#EF4444" },
                        { label: "Solution", text: p.solutionShort, color: "#06B6D4" },
                        { label: "Impact", text: p.impactShort, color: "#22C55E" },
                      ].map(s => (
                        <div key={s.label}>
                          <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: s.color }}>
                            <div className="h-1.5 w-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}33` }} />
                            {s.label}
                          </div>
                          <p className={`text-[13px] leading-[1.7] ${s.label === "Impact" ? "font-medium text-gray-200" : "text-body"}`}>{s.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Stack */}
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map(t => (
                        <span key={t} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-[3px] font-mono text-[10px] tracking-[0.03em] text-white/35" style={{ boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.04)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
          <div className="w-10 flex-shrink-0" />
        </div>
      </div>

      <div className="wrap mt-8">
        <Reveal delay={0.3}>
          <Link href="/work" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-dim transition-colors hover:text-v-light">
            View all case studies <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
