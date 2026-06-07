"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "./project-card";
import type { FeaturedProject } from "@/lib/featured-projects";

type Props = { projects: FeaturedProject[] };

export function ProjectRail({ projects }: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Pointer drag state
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const updateProgress = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0;
    setProgress(p);
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < max - 2);
  }, []);

  useEffect(() => {
    updateProgress();
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => updateProgress();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const el = railRef.current;
      if (!el) return;
      // Find the next snap card width by measuring the first child.
      const firstChild = el.querySelector<HTMLElement>("[data-rail-card]");
      const cardWidth = firstChild?.offsetWidth ?? el.clientWidth * 0.85;
      const gap = 20; // matches gap-5
      el.scrollBy({
        left: dir * (cardWidth + gap),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion]
  );

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  // Pointer drag to scroll
  const onPointerDown = (e: React.PointerEvent) => {
    // Skip mouse-button-other-than-left and touch (native swipe handles touch).
    if (e.pointerType === "touch") return;
    const el = railRef.current;
    if (!el) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = dragState.current;
    if (!s.dragging) return;
    const el = railRef.current;
    if (!el) return;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 4) s.moved = true;
    el.scrollLeft = s.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const s = dragState.current;
    if (!s.dragging) return;
    s.dragging = false;
    const el = railRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  };

  // Suppress click-through after a drag so links don't open.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };

  return (
    <div className="relative">
      {/* Desktop arrow controls */}
      <div className="pointer-events-none absolute -top-14 right-0 hidden gap-2 sm:flex">
        <button
          type="button"
          aria-label="Scroll to previous project"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/70 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02]"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label="Scroll to next project"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/70 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02]"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div
        ref={railRef}
        role="region"
        aria-label="Selected work — horizontal scroll"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-0 sm:-mx-8 sm:px-8"
        style={{
          scrollBehavior: reducedMotion ? "auto" : "smooth",
          cursor: "grab",
          touchAction: "pan-x pan-y",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {projects.map((project) => (
          <div
            key={project.slug}
            data-rail-card
            // Mobile: 85vw (capped) so the next card peeks on phones.
            // Desktop: clamp(320px, 30vw, 440px) so ~2.5+ cards are visible.
            className="w-[85vw] max-w-[420px] shrink-0 snap-start sm:w-[clamp(320px,30vw,440px)] sm:max-w-none"
          >
            <ProjectCard project={project} />
          </div>
        ))}
        {/* Tail spacer so the last card can fully snap-start on desktop */}
        <div className="shrink-0" aria-hidden style={{ width: "1px" }} />
      </div>

      {/* Progress indicator */}
      <div className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full rounded-full bg-accent/70 transition-[width] duration-200"
          style={{ width: `${Math.max(8, progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
