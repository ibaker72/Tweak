"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/shared";
import { projects } from "@/lib/data";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project)
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-32 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Project not found
          </h1>
          <Link
            href="/work"
            className="mt-4 inline-flex items-center gap-2 text-[13px] text-accent/80 transition-colors duration-200 hover:text-accent"
          >
            <ArrowLeft size={14} /> Back
          </Link>
        </div>
      </div>
    );

  const idx = projects.indexOf(project);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        <Reveal>
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-2 text-[13px] text-dim transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={13} /> All Case Studies
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent/70">
                {project.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/[0.15]" />
              <span className="font-mono text-[10px] text-dim">
                {project.year}
              </span>
              {project.live && (
                <span className="rounded-md border border-accent/[0.2] bg-accent/[0.06] px-2 py-0.5 text-[9px] font-bold text-accent">
                  LIVE
                </span>
              )}
              {!project.live && (
                <span className="rounded-md border border-amber-400/[0.2] bg-amber-400/[0.06] px-2 py-0.5 text-[9px] font-bold text-amber-400">
                  IN DEV
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-[clamp(32px,5vw,52px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              {project.title}
            </h1>

            <p className="mt-3 max-w-xl text-[17px] leading-[1.6] text-body">
              {project.tagline}
            </p>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[13px] text-accent/80 transition-colors duration-200 hover:text-accent"
              >
                Visit live site <ExternalLink size={13} />
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-14 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-surface-2 to-surface-3">
            {project.image ? (
              <div className="relative h-48 sm:h-72 lg:h-[420px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center sm:h-80 lg:h-[400px]">
                <span className="font-display text-xl text-white/[0.04]">
                  {project.title}
                </span>
              </div>
            )}
          </div>
        </Reveal>

        {project.gallery?.length ? (
  <Reveal delay={0.12}>
    <div className="mb-14">
      <h2 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
        Screenshots
      </h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-5">
        {project.gallery.map((src, i) => (
          <div
            key={src}
            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                fill
                className="object-contain object-center bg-black p-2 sm:p-3"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
) : null}

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <Reveal delay={0.14}>
              <h2 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                Overview
              </h2>
              <p className="mt-3 text-[14px] leading-[1.8] text-body">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <h2 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                The Challenge
              </h2>
              <p className="mt-3 text-[14px] leading-[1.8] text-body">
                {project.challenge}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <h2 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                Our Approach
              </h2>
              <p className="mt-3 text-[14px] leading-[1.8] text-body">
                {project.solution}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                Results
              </h2>
              <div className="mt-4 space-y-2.5">
                {project.results.map((r) => (
                  <div
                    key={r}
                    className="flex items-start gap-3 rounded-xl border border-accent/[0.1] bg-accent/[0.04] px-5 py-3.5"
                  >
                    <CheckCircle
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-accent/70"
                    />
                    <p className="text-[13px] font-medium text-accent/80">{r}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-5">
            <Reveal delay={0.15}>
              <div className="card rounded-2xl p-6">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                  Tech Stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card rounded-2xl p-6">
                <h3 className="font-display text-[14px] font-bold text-white">
                  Have a similar challenge?
                </h3>
                <p className="mt-2 text-[12px] leading-[1.7] text-dim">
                  Let&apos;s talk about building something for your business.
                </p>
                <Link href="/contact" className="btn-v mt-5 w-full justify-center">
                  Start a project <ArrowRight size={13} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.22}>
          <div className="divider mt-16" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="card group flex items-center gap-3 rounded-2xl p-5 transition-all duration-200 hover:border-accent/[0.12]"
              >
                <ArrowLeft
                  size={14}
                  className="text-dim transition-transform duration-200 group-hover:-translate-x-1"
                />
                <div>
                  <p className="font-mono text-[10px] text-dim">Previous</p>
                  <p className="font-display text-[14px] font-bold text-white">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                href={`/work/${next.slug}`}
                className="card group flex items-center justify-end gap-3 rounded-2xl p-5 text-right transition-all duration-200 hover:border-accent/[0.12]"
              >
                <div>
                  <p className="font-mono text-[10px] text-dim">Next</p>
                  <p className="font-display text-[14px] font-bold text-white">
                    {next.title}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-dim transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}