"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared";
import { projects } from "@/lib/data";

function SectionHeading({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent/50">{label}</span>
      <span className="h-px flex-1 bg-white/[0.05]" />
      {children}
    </div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  if (!project) return (
    <div className="flex min-h-[60vh] items-center justify-center pt-32 text-center">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Project not found</h1>
        <Link href="/work" className="mt-4 inline-flex items-center gap-2 text-[13px] text-accent/80 transition-colors duration-200 hover:text-accent">
          <ArrowLeft size={14} /> Back to collection
        </Link>
      </div>
    </div>
  );

  const idx = projects.indexOf(project);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <div className="pb-32 pt-36 sm:pt-44">
      <div className="wrap">
        {/* ─── Navigation breadcrumb ─── */}
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <Link href="/work" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-dim transition-colors duration-200 hover:text-white">
              <ArrowLeft size={12} /> Collection
            </Link>
            <span className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
            <span className="font-mono text-[10px] tabular-nums tracking-wider text-white/[0.08]">
              {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        {/* ─── Exhibit header ─── */}
        <Reveal delay={0.04}>
          <div className="mb-12">
            {/* Metadata strip */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/60">{project.category}</span>
              <span className="h-[3px] w-[3px] rounded-full bg-white/[0.12]" />
              <span className="font-mono text-[10px] tabular-nums text-dim">{project.year}</span>
              {project.live && (
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent/80" /></span>
                  <span className="font-mono text-[9px] font-semibold tracking-[0.06em] text-accent/70">LIVE</span>
                </span>
              )}
            </div>

            <h1 className="font-display text-[clamp(36px,6vw,64px)] font-black leading-[1.02] tracking-[-0.045em] text-white">{project.title}</h1>
            <p className="mt-4 max-w-xl text-[17px] leading-[1.65] text-body">{project.tagline}</p>

            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[12px] font-medium text-white/60 transition-all duration-200 hover:border-accent/[0.15] hover:text-accent">
                Visit live site <ExternalLink size={12} />
              </a>
            )}
          </div>
        </Reveal>

        {/* ─── Hero media frame ─── */}
        <Reveal delay={0.08}>
          <div className="relative mb-16 overflow-hidden rounded-[20px] border border-white/[0.06]"
            style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset, 0 24px 80px rgba(0,0,0,0.3)" }}>
            <div className="relative h-[280px] sm:h-[400px] lg:h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-surface-2 via-surface-2 to-surface-3" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[72px] font-black tracking-[-0.04em] text-white/[0.02] sm:text-[96px]">{project.title}</span>
              </div>
              {/* Inner frame */}
              <div className="absolute inset-4 rounded-2xl border border-white/[0.04]" />
            </div>
          </div>
        </Reveal>

        {/* ─── Content grid: main + sidebar ─── */}
        <div className="grid gap-12 lg:grid-cols-[1fr,340px] lg:gap-16">
          {/* ─── Main content ─── */}
          <div className="space-y-14">
            <Reveal delay={0.1}>
              <SectionHeading label="Overview" />
              <p className="text-[14px] leading-[1.85] text-body">{project.description}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <SectionHeading label="The Challenge" />
              <p className="text-[14px] leading-[1.85] text-body">{project.challenge}</p>
            </Reveal>

            <Reveal delay={0.14}>
              <SectionHeading label="Our Approach" />
              <p className="text-[14px] leading-[1.85] text-body">{project.solution}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <SectionHeading label="Results" />
              <div className="mt-2 space-y-3">
                {project.results.map(r => (
                  <div key={r} className="flex items-start gap-3.5 rounded-xl border border-accent/[0.08] bg-accent/[0.025] px-5 py-4">
                    <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-accent/60" />
                    <p className="text-[13px] font-medium leading-[1.6] text-accent/75">{r}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ─── Sidebar: spec panel ─── */}
          <div className="space-y-5 lg:pt-0">
            {/* Impact metric card */}
            <Reveal delay={0.12}>
              <div className="rounded-[18px] border border-accent/[0.1] bg-accent/[0.025] p-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent/40">Key Result</span>
                <p className="mt-2.5 font-display text-[22px] font-bold tracking-[-0.02em] text-accent/90">{project.impact}</p>
              </div>
            </Reveal>

            {/* Tech stack card */}
            <Reveal delay={0.14}>
              <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.015] p-6"
                style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">Tech Stack</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </Reveal>

            {/* CTA card */}
            <Reveal delay={0.18}>
              <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.015] p-6"
                style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
                <h3 className="font-display text-[14px] font-bold text-white">Have a similar challenge?</h3>
                <p className="mt-2 text-[12px] leading-[1.7] text-dim">Let&apos;s talk about building something for your business.</p>
                <Link href="/contact" className="btn-v mt-5 w-full justify-center text-[13px]">
                  Start a project <ArrowRight size={13} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ─── Collection navigation ─── */}
        <Reveal delay={0.2}>
          <div className="mt-24">
            <div className="mb-8 h-px w-full" style={{ background: "linear-gradient(90deg, rgba(200,255,0,0.1), rgba(200,255,0,0.03) 50%, transparent)" }} />
            <div className="grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link href={`/work/${prev.slug}`}
                  className="group flex items-center gap-4 rounded-[18px] border border-white/[0.06] bg-white/[0.015] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.025]"
                  style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
                  <ArrowLeft size={14} className="flex-shrink-0 text-dim transition-transform duration-300 group-hover:-translate-x-1" />
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">Previous</p>
                    <p className="mt-1 truncate font-display text-[14px] font-bold text-white">{prev.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-dim">{prev.category}</p>
                  </div>
                </Link>
              ) : <div />}
              {next && (
                <Link href={`/work/${next.slug}`}
                  className="group flex items-center justify-end gap-4 rounded-[18px] border border-white/[0.06] bg-white/[0.015] p-5 text-right transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.025]"
                  style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">Next</p>
                    <p className="mt-1 truncate font-display text-[14px] font-bold text-white">{next.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-dim">{next.category}</p>
                  </div>
                  <ArrowRight size={14} className="flex-shrink-0 text-dim transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
