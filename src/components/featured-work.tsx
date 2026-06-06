"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Car,
  Cpu,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./shared";
import { projects, type Project } from "@/lib/data";

const projectIcons: Record<string, LucideIcon> = {
  "pp-mechanical": Wrench,
  "speedway-motors": Car,
  "tweak-build-os": Cpu,
  jerseypantry: ShoppingBag,
};

type AccentTokens = {
  glow: string;
  glowStrong: string;
  chip: string;
  metric: string;
  dot: string;
  iconRing: string;
  placeholder: string;
};

const accentMap: Record<NonNullable<Project["accent"]>, AccentTokens> = {
  lime: {
    glow: "rgba(200,255,0,0.10)",
    glowStrong: "rgba(200,255,0,0.6)",
    chip: "border-accent/[0.18] bg-accent/[0.06] text-accent",
    metric: "border-accent/[0.18] bg-accent/[0.05] text-accent",
    dot: "bg-accent",
    iconRing: "border-accent/30 bg-accent/[0.08] text-accent",
    placeholder:
      "radial-gradient(80% 60% at 30% 25%, rgba(200,255,0,0.28), transparent), radial-gradient(60% 80% at 90% 90%, rgba(200,255,0,0.10), transparent), linear-gradient(135deg, rgba(40,55,5,0.55), rgba(8,12,2,0.85))",
  },
  cyan: {
    glow: "rgba(34,211,238,0.10)",
    glowStrong: "rgba(34,211,238,0.55)",
    chip: "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200",
    metric: "border-cyan-300/20 bg-cyan-300/[0.05] text-cyan-200",
    dot: "bg-cyan-300",
    iconRing: "border-cyan-300/30 bg-cyan-300/[0.08] text-cyan-200",
    placeholder:
      "radial-gradient(80% 60% at 30% 25%, rgba(34,211,238,0.25), transparent), radial-gradient(60% 80% at 90% 90%, rgba(34,211,238,0.10), transparent), linear-gradient(135deg, rgba(8,30,40,0.6), rgba(4,8,12,0.9))",
  },
  violet: {
    glow: "rgba(167,139,250,0.10)",
    glowStrong: "rgba(167,139,250,0.55)",
    chip: "border-violet-300/20 bg-violet-300/[0.06] text-violet-200",
    metric: "border-violet-300/20 bg-violet-300/[0.05] text-violet-200",
    dot: "bg-violet-300",
    iconRing: "border-violet-300/30 bg-violet-300/[0.08] text-violet-200",
    placeholder:
      "radial-gradient(80% 60% at 30% 25%, rgba(167,139,250,0.28), transparent), radial-gradient(60% 80% at 90% 90%, rgba(167,139,250,0.10), transparent), linear-gradient(135deg, rgba(25,18,45,0.6), rgba(8,5,15,0.9))",
  },
  amber: {
    glow: "rgba(251,191,36,0.10)",
    glowStrong: "rgba(251,191,36,0.55)",
    chip: "border-amber-300/20 bg-amber-300/[0.06] text-amber-200",
    metric: "border-amber-300/20 bg-amber-300/[0.05] text-amber-200",
    dot: "bg-amber-300",
    iconRing: "border-amber-300/30 bg-amber-300/[0.08] text-amber-200",
    placeholder:
      "radial-gradient(80% 60% at 30% 25%, rgba(251,191,36,0.25), transparent), radial-gradient(60% 80% at 90% 90%, rgba(251,191,36,0.10), transparent), linear-gradient(135deg, rgba(40,28,5,0.6), rgba(12,8,2,0.9))",
  },
};

const featuredSlugs = [
  "pp-mechanical",
  "speedway-motors",
  "tweak-build-os",
  "jerseypantry",
] as const;

const featuredProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FeaturedWork() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getCardStride = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return 0;
    const cards = container.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length === 0) return container.clientWidth;
    if (cards.length === 1) return cards[0].offsetWidth;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }, []);

  const updateState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const stride = getCardStride();
    if (stride === 0) return;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const idx = Math.min(
      featuredProjects.length - 1,
      Math.max(0, Math.round(scrollLeft / stride)),
    );
    setActiveIndex(idx);
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < maxScroll - 4);
  }, [getCardStride]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateState();
      });
    };
    const onResize = () => updateState();
    updateState();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updateState]);

  const scrollByCards = useCallback(
    (direction: 1 | -1) => {
      const container = scrollRef.current;
      if (!container) return;
      const stride = getCardStride();
      container.scrollBy({
        left: stride * direction,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [getCardStride],
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const stride = getCardStride();
      container.scrollTo({
        left: stride * index,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [getCardStride],
  );

  return (
    <section id="work" className="relative py-14 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(200,255,0,0.04),transparent)]" />

      <div className="wrap relative">
        <Reveal>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[640px]">
              <span className="section-label">Selected work</span>
              <h2 className="mt-4 font-display text-[clamp(28px,5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Proof that looks as good as{" "}
                <span className="gradient-text">it works.</span>
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-body sm:text-[15px] sm:leading-[1.75]">
                Real websites, automations, inventory systems, and AI
                workflows built for businesses that need more than a basic
                online presence.
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <CarouselArrow
                direction="prev"
                disabled={!canPrev}
                onClick={() => scrollByCards(-1)}
              />
              <CarouselArrow
                direction="next"
                disabled={!canNext}
                onClick={() => scrollByCards(1)}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mt-9 sm:mt-12">
            <div
              ref={scrollRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Selected work showcase"
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:gap-5 sm:px-8"
              style={{ scrollPaddingLeft: "20px" }}
            >
              {featuredProjects.map((project, i) => (
                <FeaturedCard
                  key={project.slug}
                  project={project}
                  index={i}
                />
              ))}
            </div>

            {/* Right-edge fade only on desktop — signals "more to see" */}
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-surface-0 to-transparent sm:block" />
          </div>
        </Reveal>

        <div className="mt-7 flex flex-col items-center gap-4 sm:mt-9 sm:flex-row sm:justify-center sm:gap-6">
          <div
            role="tablist"
            aria-label="Slide indicators"
            className="flex items-center gap-2"
          >
            {featuredProjects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                role="tab"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}: ${project.title}`}
                aria-selected={i === activeIndex}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-7 bg-accent shadow-[0_0_10px_rgba(200,255,0,0.45)]"
                    : "w-1.5 bg-white/[0.16] hover:bg-white/30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <CarouselArrow
              direction="prev"
              disabled={!canPrev}
              onClick={() => scrollByCards(-1)}
            />
            <CarouselArrow
              direction="next"
              disabled={!canNext}
              onClick={() => scrollByCards(1)}
            />
          </div>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col items-center text-center sm:mt-14">
            <Link
              href="/work"
              className="btn-v px-7 py-3 text-[13.5px] sm:px-8 sm:py-3.5 sm:text-[14px]"
            >
              View all case studies <ArrowRight size={14} />
            </Link>
            <p className="mt-4 max-w-[480px] text-[12.5px] leading-[1.7] text-body">
              Every project is built to become proof: screenshots, systems,
              automations, and measurable business outcomes.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type CarouselArrowProps = {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
};

function CarouselArrow({ direction, disabled, onClick }: CarouselArrowProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.22] hover:bg-white/[0.05] hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon size={16} strokeWidth={2} />
    </button>
  );
}

function FeaturedCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const Icon = projectIcons[project.slug] ?? CheckCircle2;
  const accent = accentMap[project.accent ?? "lime"];

  return (
    <div
      data-card
      className="group relative w-[82vw] max-w-[340px] shrink-0 snap-start sm:w-[420px] sm:max-w-none lg:w-[400px]"
    >
      <Link
        href={`/work/${project.slug}`}
        className="relative flex h-full flex-col"
      >
        {/* Hover halo */}
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
          {/* TODO: replace this gradient placeholder block with a real
              screenshot when assets land at /public/proof/<slug>/cover.png —
              swap in <ProjectPrimaryMedia /> or <Image fill /> and keep the
              corner LIVE pill + bottom accent line. */}
          <div
            className="relative aspect-[16/10] w-full overflow-hidden"
            style={{ background: accent.placeholder }}
          >
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <span className="text-center font-display text-[28px] font-black tracking-[-0.03em] text-white/[0.07] sm:text-[34px]">
                {project.title}
              </span>
            </div>

            {project.live && (
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-accent">
                  Live build
                </span>
              </div>
            )}

            <div
              className="absolute inset-x-0 bottom-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent.glowStrong}, transparent)`,
              }}
            />
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-start gap-3.5">
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${accent.iconRing}`}
              >
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/[0.18]" />
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.08em] text-accent/70">
                    {project.category}
                  </span>
                </div>
                <h3 className="mt-1 font-display text-[18px] font-bold tracking-[-0.01em] text-white sm:text-[19px]">
                  {project.title}
                </h3>
              </div>
            </div>

            <p className="mt-3.5 line-clamp-3 text-[13px] leading-[1.65] text-body sm:text-[13.5px]">
              {project.description}
            </p>

            {project.proofBadges?.length ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.proofBadges.map((badge) => (
                  <span
                    key={badge}
                    className={`inline-flex items-center gap-1.5 rounded-full border ${accent.chip} px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.02em]`}
                  >
                    <span className={`h-1 w-1 rounded-full ${accent.dot}`} />
                    {badge}
                  </span>
                ))}
              </div>
            ) : null}

            {project.metricBadge ? (
              <div
                className={`mt-4 inline-flex w-fit items-center gap-2 rounded-xl border ${accent.metric} px-3 py-1.5`}
              >
                <CheckCircle2 size={12} strokeWidth={2} />
                <span className="text-[11.5px] font-semibold tracking-[-0.005em]">
                  {project.metricBadge}
                </span>
              </div>
            ) : null}

            <div className="flex-1" />

            <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                Case study
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/85 transition-colors duration-200 group-hover:text-accent">
                View Case Study
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
