"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { MediaFallback } from "../media-fallback";

type Props = {
  sources: string[];
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const FADE_MS = 600;
const DESKTOP_INTERVAL_MS = 3500;
const MOBILE_INTERVAL_MS = 5000;
const MAX_FRAMES = 5;
const VIEW_THRESHOLD = 0.6;

export function ProofSlideshow({
  sources,
  alt,
  className = "",
  sizes,
  priority = false,
}: Props) {
  const framesKey = sources.slice(0, MAX_FRAMES).join("\n");
  const frames = useMemo(
    () => sources.slice(0, MAX_FRAMES),
    // framesKey already captures content identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [framesKey]
  );
  const total = frames.length;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [hovering, setHovering] = useState(false);
  // Track failures by src so a changed source set never carries stale state.
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(() => new Set());

  const markFailed = (src: string) =>
    setFailedSrcs((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    setReduced(rmQuery.matches);
    setHasHover(hoverQuery.matches);
    const onRM = (e: MediaQueryListEvent) => setReduced(e.matches);
    const onHover = (e: MediaQueryListEvent) => setHasHover(e.matches);
    rmQuery.addEventListener("change", onRM);
    hoverQuery.addEventListener("change", onHover);
    return () => {
      rmQuery.removeEventListener("change", onRM);
      hoverQuery.removeEventListener("change", onHover);
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || total <= 1) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= VIEW_THRESHOLD),
      { threshold: [0, VIEW_THRESHOLD, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [total]);

  // Off-screen cards reset to the first frame.
  useEffect(() => {
    if (!inView) setCurrent(0);
  }, [inView]);

  // Preload + decode the next frame, then advance.
  useEffect(() => {
    if (total <= 1 || reduced || !inView) return;
    if (hasHover && hovering) return;

    const interval = hasHover ? DESKTOP_INTERVAL_MS : MOBILE_INTERVAL_MS;
    let cancelled = false;

    const timer = window.setTimeout(async () => {
      const nextIdx = (current + 1) % total;
      try {
        const preloader = new window.Image();
        preloader.src = frames[nextIdx];
        await preloader.decode();
      } catch {
        // ignore decode failures and advance anyway
      }
      if (!cancelled) setCurrent(nextIdx);
    }, interval);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [current, total, reduced, inView, hasHover, hovering, frames]);

  if (total === 0) return null;

  if (total === 1) {
    return (
      <div className={className}>
        {/* Placeholder sits behind so a broken/missing frame degrades cleanly. */}
        <MediaFallback />
        <Image
          src={frames[0]}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-opacity"
          style={{ opacity: failedSrcs.has(frames[0]) ? 0 : 1 }}
          onError={() => markFailed(frames[0])}
        />
      </div>
    );
  }

  const visibleIndex = reduced ? 0 : current;

  return (
    <div
      ref={wrapRef}
      className={className}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Placeholder sits behind every frame so broken images never show an icon. */}
      <MediaFallback />
      {frames.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          onError={() => markFailed(src)}
          fill
          sizes={sizes}
          priority={priority && i === 0}
          className="object-cover transition-opacity ease-out"
          style={{
            transitionDuration: `${FADE_MS}ms`,
            opacity: i === visibleIndex && !failedSrcs.has(src) ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
