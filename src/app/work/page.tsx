"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Dot } from "lucide-react";
import { Reveal } from "@/components/shared";
import { projects } from "@/lib/data";

function ExhibitCard({ project, index, featured = false }: { project: typeof projects[0]; index: number; featured?: boolean }) {
  return (
    <Reveal delay={index * 0.06}>
      <Link href={`/work/${project.slug}`} className="group block">
        <article className={`relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.015] transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.025] ${featured ? "" : ""}`}
          style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset, 0 0 0 1px rgba(255,255,255,0.02) inset" }}>

          {/* Media frame */}
          <div className={`relative overflow-hidden ${featured ? "h-[280px] sm:h-[360px] lg:h-[420px]" : "h-[220px] sm:h-[260px]"}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-surface-2 via-surface-2 to-surface-3" />
            {/* Exhibit lighting — subtle top-down gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
            {/* Ghost title for empty state */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`font-display font-black tracking-[-0.04em] text-white/[0.025] ${featured ? "text-[64px] sm:text-[80px]" : "text-[40px] sm:text-[48px]"}`}>{project.title}</span>
            </div>
            {/* Inner frame border */}
            <div className="absolute inset-3 rounded-2xl border border-white/[0.04]" />
            {/* Collection number */}
            <div className="absolute bottom-5 right-5 font-mono text-[10px] tabular-nums tracking-wider text-white/[0.08]">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Placard */}
          <div className="border-t border-white/[0.05] p-6 sm:p-7">
            {/* Metadata row */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">{project.category}</span>
              <span className="h-[3px] w-[3px] rounded-full bg-white/[0.12]" />
              <span className="font-mono text-[10px] tabular-nums text-dim">{project.year}</span>
              {project.live && (
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent/80" /></span>
                  <span className="font-mono text-[9px] font-semibold tracking-[0.06em] text-accent/70">LIVE</span>
                </span>
              )}
            </div>

            {/* Title + tagline */}
            <h2 className={`mt-3 font-display font-bold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-accent ${featured ? "text-[22px] sm:text-[26px]" : "text-[18px] sm:text-[20px]"}`}>{project.title}</h2>
            <p className="mt-2 text-[13px] leading-[1.7] text-body line-clamp-2">{project.tagline}</p>

            {/* Impact specimen label */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 rounded-xl border border-accent/[0.08] bg-accent/[0.03] px-4 py-2.5">
                <span className="font-mono text-[11px] font-medium text-accent/70">{project.impact}</span>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-dim opacity-0 transition-all duration-300 group-hover:opacity-100">
                View <ArrowUpRight size={11} />
              </span>
            </div>

            {/* Stack tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.slice(0, featured ? 5 : 4).map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

export default function WorkPage() {
  const hero = projects[0]; // Featured exhibit
  const rest = projects.slice(1);

  return (
    <div className="pb-32 pt-36 sm:pt-44">
      <div className="wrap">
        {/* ─── Gallery entrance ─── */}
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="section-label">Case Studies</span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
            <span className="font-mono text-[11px] tabular-nums tracking-wider text-dim">
              {String(projects.length).padStart(2, "0")} projects
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <h1 className="font-display text-[clamp(36px,6vw,64px)] font-black leading-[1.02] tracking-[-0.045em] text-white">
            Selected Work
          </h1>
          <p className="mt-5 max-w-[520px] text-[15px] leading-[1.8] text-body">
            Each project scoped to solve a specific problem and deliver measurable results. Real engineering for real businesses.
          </p>
        </Reveal>

        {/* ─── Gallery rail ─── */}
        <div className="mb-14 mt-12 h-px w-full" style={{ background: "linear-gradient(90deg, rgba(200,255,0,0.15), rgba(200,255,0,0.04) 50%, transparent)" }} />

        {/* ─── Featured exhibit ─── */}
        <ExhibitCard project={hero} index={0} featured />

        {/* ─── Collection grid ─── */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((p, i) => (
            <ExhibitCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>

        {/* ─── Gallery footer ─── */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-center text-center">
            <div className="h-px w-16 bg-white/[0.06]" />
            <p className="mt-8 max-w-sm text-[14px] leading-[1.7] text-body">
              Have a project that deserves this level of execution?
            </p>
            <Link href="/contact" className="btn-v mt-6">
              Start a project <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
