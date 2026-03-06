"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/shared";
import { projects } from "@/lib/data";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  if (!project) return <div className="flex min-h-[60vh] items-center justify-center pt-32 text-center"><div><h1 className="font-display text-2xl font-bold text-white">Project not found</h1><Link href="/work" className="mt-4 inline-flex items-center gap-2 text-sm text-v-light hover:text-v"><ArrowLeft size={14} /> Back</Link></div></div>;
  const idx = projects.indexOf(project);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <div className="wrap">
        <Reveal><Link href="/work" className="mb-10 inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-white"><ArrowLeft size={14} /> All Case Studies</Link></Reveal>
        <Reveal delay={0.05}>
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-v-light">{project.category}</span>
              <span className="font-mono text-[10px] text-dim">{project.year}</span>
              {project.live && <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">LIVE</span>}
            </div>
            <h1 className="mt-2 font-display text-[clamp(36px,5vw,52px)] font-black leading-[1.1] tracking-[-0.03em] text-white">{project.title}</h1>
            <p className="mt-3 max-w-xl text-xl text-body">{project.tagline}</p>
            {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-v-light transition-colors hover:text-v">Visit live site <ExternalLink size={14} /></a>}
          </div>
        </Reveal>
        <Reveal delay={0.1}><div className="mb-14 flex h-64 items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-surface-2 to-surface-3 sm:h-80 lg:h-[400px]"><span className="font-display text-xl text-white/[0.04]">{project.title}</span></div></Reveal>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <Reveal delay={0.12}><h2 className="font-display text-lg font-bold text-white">Overview</h2><p className="mt-3 leading-[1.8] text-body">{project.description}</p></Reveal>
            <Reveal delay={0.14}><h2 className="font-display text-lg font-bold text-white">The Challenge</h2><p className="mt-3 leading-[1.8] text-body">{project.challenge}</p></Reveal>
            <Reveal delay={0.16}><h2 className="font-display text-lg font-bold text-white">Our Approach</h2><p className="mt-3 leading-[1.8] text-body">{project.solution}</p></Reveal>
            <Reveal delay={0.18}><h2 className="font-display text-lg font-bold text-white">Results</h2>
              <div className="mt-4 space-y-3">{project.results.map(r => <div key={r} className="flex items-start gap-3 rounded-xl border border-v-border bg-v-dim px-5 py-3.5"><CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-v-light" /><p className="text-sm font-medium text-v-light">{r}</p></div>)}</div>
            </Reveal>
          </div>
          <div className="space-y-6">
            <Reveal delay={0.15}><div className="rounded-[20px] border border-white/[0.06] bg-surface-2 p-6"><h3 className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Tech Stack</h3><div className="mt-4 flex flex-wrap gap-2">{project.stack.map(t => <span key={t} className="tag">{t}</span>)}</div></div></Reveal>
            <Reveal delay={0.2}><div className="rounded-[20px] border border-white/[0.06] bg-surface-2 p-6"><h3 className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Have a similar challenge?</h3><p className="mt-2 text-sm text-dim">Let&apos;s talk about building something for your business.</p><Link href="/contact" className="btn-v mt-5 w-full justify-center !text-[13px]">Start a project <ArrowRight size={14} /></Link></div></Reveal>
          </div>
        </div>
        <Reveal delay={0.2}><div className="mt-16 grid gap-4 border-t border-white/[0.06] pt-10 sm:grid-cols-2">
          {prev ? <Link href={`/work/${prev.slug}`} className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-surface-2 p-5 transition-all hover:border-v/[0.15]"><ArrowLeft size={16} className="text-dim transition-transform group-hover:-translate-x-1" /><div><p className="font-mono text-[10px] text-dim">Previous</p><p className="font-display font-medium text-white">{prev.title}</p></div></Link> : <div />}
          {next && <Link href={`/work/${next.slug}`} className="group flex items-center justify-end gap-3 rounded-xl border border-white/[0.06] bg-surface-2 p-5 text-right transition-all hover:border-v/[0.15]"><div><p className="font-mono text-[10px] text-dim">Next</p><p className="font-display font-medium text-white">{next.title}</p></div><ArrowRight size={16} className="text-dim transition-transform group-hover:translate-x-1" /></Link>}
        </div></Reveal>
      </div>
    </div>
  );
}
