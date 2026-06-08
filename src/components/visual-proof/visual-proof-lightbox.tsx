"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { MediaTile } from "./media-tile";
import type { VisualProofProject } from "@/lib/visual-proof";

type Props = {
  project: VisualProofProject;
  initialIndex: number;
  onClose: () => void;
};

export function VisualProofLightbox({ project, initialIndex, onClose }: Props) {
  const total = project.media.length;
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(0, total - 1))
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const goNext = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [goNext, goPrev, onClose]);

  // Keep the active thumbnail in view as user navigates.
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const active = strip.querySelector<HTMLElement>(
      `[data-thumb-index="${index}"]`
    );
    if (!active) return;
    active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  const current = project.media[index];

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-white/55">
            {project.category}
          </span>
          <span className="truncate font-display text-[14px] font-bold text-white sm:text-[15px]">
            {project.title}
            {current.label ? (
              <span className="ml-2 font-mono text-[11px] font-normal text-white/55">
                · {current.label}
              </span>
            ) : null}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-white/55">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/85 transition-all hover:border-white/[0.22] hover:bg-white/[0.08] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Prev / Next */}
      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous media"
            className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/85 transition-all hover:border-white/[0.22] hover:bg-white/[0.08] hover:text-white sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next media"
            className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/85 transition-all hover:border-white/[0.22] hover:bg-white/[0.08] hover:text-white sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight size={18} />
          </button>
        </>
      ) : null}

      {/* Media stage */}
      <div
        className="relative mx-auto flex h-[78vh] max-h-[820px] w-[min(94vw,1280px)] items-center justify-center px-2 sm:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <MediaTile
          key={current.src}
          src={current.src}
          alt={`${project.title} — ${current.label ?? `slide ${index + 1}`}`}
          fit="contain"
          className="h-full w-full"
          sizes="(max-width: 1024px) 92vw, 1200px"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {total > 1 ? (
        <div
          className="absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-2 sm:px-6 sm:pb-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={thumbStripRef}
            className="no-scrollbar mx-auto flex max-w-[1200px] gap-2 overflow-x-auto"
          >
            {project.media.map((m, i) => {
              const isActive = i === index;
              return (
                <button
                  key={m.src}
                  type="button"
                  data-thumb-index={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${m.label ?? `slide ${i + 1}`}`}
                  aria-current={isActive}
                  className={`relative aspect-[16/10] w-[78px] flex-shrink-0 overflow-hidden rounded-md border transition-all sm:w-[92px] ${
                    isActive
                      ? "border-accent/65 opacity-100 ring-1 ring-accent/40"
                      : "border-white/[0.08] opacity-60 hover:border-white/[0.22] hover:opacity-100"
                  }`}
                >
                  <MediaTile
                    src={m.src}
                    alt={`${project.title} thumbnail ${i + 1}`}
                    className="absolute inset-0 h-full w-full"
                    sizes="100px"
                    videoBehavior="first-frame"
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
