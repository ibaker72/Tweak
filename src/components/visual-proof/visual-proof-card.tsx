"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Maximize2 } from "lucide-react";
import { MediaTile } from "./media-tile";
import { VisualProofLightbox } from "./visual-proof-lightbox";
import type {
  VisualProofAccent,
  VisualProofProject,
} from "@/lib/visual-proof";

const accentTokens: Record<
  VisualProofAccent,
  {
    glow: string;
    tag: string;
    catLabel: string;
    dot: string;
    check: string;
  }
> = {
  lime: {
    glow: "rgba(200,255,0,0.10)",
    tag: "border-accent/[0.18] bg-accent/[0.06] text-accent",
    catLabel: "text-accent/75",
    dot: "bg-accent",
    check: "text-accent",
  },
  cyan: {
    glow: "rgba(34,211,238,0.10)",
    tag: "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200",
    catLabel: "text-cyan-300/80",
    dot: "bg-cyan-300",
    check: "text-cyan-300",
  },
  violet: {
    glow: "rgba(167,139,250,0.10)",
    tag: "border-violet-300/20 bg-violet-300/[0.06] text-violet-200",
    catLabel: "text-violet-300/80",
    dot: "bg-violet-300",
    check: "text-violet-300",
  },
  amber: {
    glow: "rgba(251,191,36,0.10)",
    tag: "border-amber-300/20 bg-amber-300/[0.06] text-amber-200",
    catLabel: "text-amber-300/80",
    dot: "bg-amber-300",
    check: "text-amber-300",
  },
};

type Props = { project: VisualProofProject };

export function VisualProofCard({ project }: Props) {
  const accent = accentTokens[project.accent];
  const wrapRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cover = project.media[0];

  return (
    <article ref={wrapRef} className="group relative h-full">
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 50% at 50% 0%, ${accent.glow}, transparent)`,
        }}
      />

      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-300 group-hover:border-white/[0.16]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.008))",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.03) inset, 0 16px 48px rgba(0,0,0,0.18)",
        }}
      >
        {/* Cover */}
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          aria-label={`Open ${project.title} gallery`}
          className="group/cover relative block aspect-[16/7.5] w-full overflow-hidden bg-surface-2"
        >
          <MediaTile
            src={cover.src}
            alt={`${project.title} — ${cover.label ?? "cover"}`}
            className="absolute inset-0 h-full w-full"
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
            active={inView}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-black/45 px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.08em] text-white/85 backdrop-blur transition-colors group-hover/cover:bg-black/65">
            <Maximize2 size={11} />
            View gallery
          </span>
        </button>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-6">
          <div>
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.08em] ${accent.catLabel}`}
            >
              {project.category}
            </span>
            <h3 className="mt-1 font-display text-[20px] font-bold tracking-[-0.01em] text-white sm:text-[22px]">
              {project.title}
            </h3>
          </div>

          <p className="text-[13px] leading-[1.7] text-body sm:text-[13.5px]">
            {project.description}
          </p>

          {project.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 rounded-full border ${accent.tag} px-2 py-[3px] font-mono text-[9.5px] font-medium tracking-[0.02em]`}
                >
                  <span className={`h-[3px] w-[3px] rounded-full ${accent.dot}`} />
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {project.outcomes.length > 0 ? (
            <ul className="grid gap-1.5">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-2 text-[12.5px] leading-[1.55] text-white/80"
                >
                  <CheckCircle2
                    size={13}
                    strokeWidth={2}
                    className={`mt-[2px] flex-shrink-0 ${accent.check}`}
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Gallery thumbnails */}
          <div className="mt-1">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                Gallery · {project.media.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/55 transition-colors hover:text-white/80"
              >
                Open all
              </button>
            </div>
            <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1">
              {project.media.map((m, i) => (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Open ${project.title} — ${m.label ?? `slide ${i + 1}`}`}
                  className="relative aspect-[16/7.5] w-[86px] flex-shrink-0 snap-start overflow-hidden rounded-md border border-white/[0.07] bg-surface-2 transition-all hover:border-white/[0.22] hover:opacity-100 sm:w-[96px]"
                >
                  <MediaTile
                    src={m.src}
                    alt={`${project.title} thumbnail ${i + 1}`}
                    className="absolute inset-0 h-full w-full"
                    sizes="100px"
                    videoBehavior="first-frame"
                  />
                </button>
              ))}
            </div>
          </div>

          {(project.liveUrl || project.caseStudyHref) && (
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.05] pt-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-dim transition-colors hover:text-white/70"
                >
                  Live <ExternalLink size={10} strokeWidth={1.75} />
                </a>
              ) : (
                <span />
              )}
              {project.caseStudyHref ? (
                <Link
                  href={project.caseStudyHref}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/85 transition-colors duration-200 group-hover:text-accent"
                >
                  View case study
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <VisualProofLightbox
          project={project}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </article>
  );
}
