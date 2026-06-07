"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import type { FeaturedProject } from "@/lib/featured-projects";

const accentMap = {
  lime: {
    glow: "rgba(200,255,0,0.10)",
    chip: "border-accent/[0.18] bg-accent/[0.06] text-accent",
    outcome: "border-accent/[0.22] bg-accent/[0.07] text-accent",
    catLabel: "text-accent/70",
    dot: "bg-accent",
  },
  cyan: {
    glow: "rgba(34,211,238,0.10)",
    chip: "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200",
    outcome: "border-cyan-300/25 bg-cyan-300/[0.07] text-cyan-200",
    catLabel: "text-cyan-300/75",
    dot: "bg-cyan-300",
  },
  violet: {
    glow: "rgba(167,139,250,0.10)",
    chip: "border-violet-300/20 bg-violet-300/[0.06] text-violet-200",
    outcome: "border-violet-300/25 bg-violet-300/[0.07] text-violet-200",
    catLabel: "text-violet-300/75",
    dot: "bg-violet-300",
  },
  amber: {
    glow: "rgba(251,191,36,0.10)",
    chip: "border-amber-300/20 bg-amber-300/[0.06] text-amber-200",
    outcome: "border-amber-300/25 bg-amber-300/[0.07] text-amber-200",
    catLabel: "text-amber-300/75",
    dot: "bg-amber-300",
  },
} as const;

type Props = { project: FeaturedProject };

// Gradient fallback shown until/unless a real image/video lives at the
// configured path. Keeps cards looking finished even with no asset.
function MediaFallback({ title, accent }: { title: string; accent: keyof typeof accentMap }) {
  const colors: Record<keyof typeof accentMap, string> = {
    lime: "linear-gradient(135deg, rgba(200,255,0,0.18), rgba(200,255,0,0.04) 60%, rgba(20,30,0,0.6))",
    cyan: "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(34,211,238,0.04) 60%, rgba(0,18,30,0.6))",
    violet: "linear-gradient(135deg, rgba(167,139,250,0.18), rgba(167,139,250,0.04) 60%, rgba(20,8,40,0.6))",
    amber: "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(251,191,36,0.04) 60%, rgba(35,22,0,0.6))",
  };
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: colors[accent] }}
    >
      <span className="font-display text-[clamp(20px,3vw,32px)] font-extrabold tracking-[-0.03em] text-white/[0.08]">
        {title}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: Props) {
  const accent = accentMap[project.accent ?? "lime"];
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [inView, setInView] = useState(false);

  // Play video only when the card is in view. Pause when it leaves.
  useEffect(() => {
    if (project.mediaType !== "video") return;
    const el = wrapRef.current;
    if (!el) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [project.mediaType]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <article
      ref={wrapRef}
      className="group relative h-full"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 50% at 50% 0%, ${accent.glow}, transparent)`,
        }}
      />

      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-300 group-hover:border-white/[0.14]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.008))",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.03) inset, 0 16px 48px rgba(0,0,0,0.18)",
        }}
      >
        {/* MEDIA — 16:10 (tighter than 16:9 so it doesn't dominate the card) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
          <MediaFallback title={project.title} accent={project.accent ?? "lime"} />

          {!mediaFailed && project.mediaType === "video" ? (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.poster}
              aria-label={`${project.title} demo`}
              className="relative h-full w-full object-cover"
              onError={() => setMediaFailed(true)}
            >
              <source src={project.media} type="video/mp4" />
            </video>
          ) : !mediaFailed && project.mediaType === "image" ? (
            <Image
              src={project.media}
              alt={`${project.title} screenshot`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 85vw, 30vw"
              className="relative object-cover"
              onError={() => setMediaFailed(true)}
            />
          ) : null}

          {/* Subtle gradient overlay at bottom of media */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Index + category */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
              {project.index}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/[0.18]" />
            <span
              className={`truncate font-mono text-[9.5px] uppercase tracking-[0.08em] ${accent.catLabel}`}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-1.5 font-display text-[17px] font-bold tracking-[-0.01em] text-white sm:text-[18px]">
            {project.title}
          </h3>

          {/* Description — clamped to 2 lines */}
          <p className="mt-2 line-clamp-2 text-[12.5px] leading-[1.6] text-body sm:text-[13px]">
            {project.description}
          </p>

          {/* Tag pills */}
          {project.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 rounded-full border ${accent.chip} px-2 py-[3px] font-mono text-[9.5px] font-medium tracking-[0.02em]`}
                >
                  <span className={`h-[3px] w-[3px] rounded-full ${accent.dot}`} />
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {/* Outcome pill */}
          {project.outcome ? (
            <div
              className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg border ${accent.outcome} px-2.5 py-1.5`}
            >
              <CheckCircle2 size={12} strokeWidth={2} />
              <span className="text-[11.5px] font-semibold tracking-[-0.005em]">
                {project.outcome}
              </span>
            </div>
          ) : null}

          {/* Spacer */}
          <div className="mt-3 flex-1" />

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.05] pt-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-dim transition-colors hover:text-white/70"
            >
              Live <ExternalLink size={10} strokeWidth={1.75} />
            </a>
            <Link
              href={project.caseStudyHref}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/85 transition-colors duration-200 group-hover:text-accent"
            >
              View Case Study
              <ArrowRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
