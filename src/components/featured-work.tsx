"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Wrench, Car, Cpu, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./shared";
import { projects } from "@/lib/data";

const projectIcons: Record<string, LucideIcon> = {
  "pp-mechanical": Wrench,
  "speedway-motors": Car,
  "tweak-build-os": Cpu,
  jerseypantry: ShoppingBag,
};

// Accent token sets keep cards visually distinct while staying on-brand.
const accentMap = {
  lime: {
    glow: "rgba(200,255,0,0.10)",
    chip: "border-accent/[0.18] bg-accent/[0.06] text-accent",
    metric: "border-accent/[0.18] bg-accent/[0.05] text-accent",
    dot: "bg-accent",
    iconRing: "border-accent/30 bg-accent/[0.08] text-accent",
  },
  cyan: {
    glow: "rgba(34,211,238,0.10)",
    chip: "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200",
    metric: "border-cyan-300/20 bg-cyan-300/[0.05] text-cyan-200",
    dot: "bg-cyan-300",
    iconRing: "border-cyan-300/30 bg-cyan-300/[0.08] text-cyan-200",
  },
  violet: {
    glow: "rgba(167,139,250,0.10)",
    chip: "border-violet-300/20 bg-violet-300/[0.06] text-violet-200",
    metric: "border-violet-300/20 bg-violet-300/[0.05] text-violet-200",
    dot: "bg-violet-300",
    iconRing: "border-violet-300/30 bg-violet-300/[0.08] text-violet-200",
  },
  amber: {
    glow: "rgba(251,191,36,0.10)",
    chip: "border-amber-300/20 bg-amber-300/[0.06] text-amber-200",
    metric: "border-amber-300/20 bg-amber-300/[0.05] text-amber-200",
    dot: "bg-amber-300",
    iconRing: "border-amber-300/30 bg-amber-300/[0.08] text-amber-200",
  },
} as const;

const featuredSlugs = [
  "pp-mechanical",
  "speedway-motors",
  "tweak-build-os",
  "jerseypantry",
] as const;

const featuredProjects = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-14 sm:py-32">
      {/* Soft accent wash for the whole section */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(200,255,0,0.04),transparent)]" />

      <div className="wrap relative">
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-label">Selected work</span>
              <h2 className="mt-4 font-display text-[clamp(28px,5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Results speak.{" "}
                <span className="text-body">We just ship.</span>
              </h2>
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.7] text-body sm:text-[15px] sm:leading-[1.75]">
                Proof-driven engagements. Real builds, real outcomes, real
                systems behind every project below.
              </p>
            </div>
            <Link
              href="/work"
              className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[12px] font-medium text-white/65 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white sm:inline-flex"
            >
              All case studies <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => {
            const Icon = projectIcons[project.slug] ?? CheckCircle2;
            const accent = accentMap[project.accent ?? "lime"];

            return (
              <Reveal key={project.slug} delay={i * 0.06}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group relative block h-full"
                >
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(60% 50% at 50% 0%, ${accent.glow}, transparent)`,
                    }}
                  />

                  <div
                    className="relative flex h-full flex-col rounded-2xl border border-white/[0.07] p-5 transition-all duration-300 group-hover:border-white/[0.14] sm:p-7"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.008))",
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.03) inset, 0 16px 48px rgba(0,0,0,0.18)",
                    }}
                  >
                    {/* Header row */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border ${accent.iconRing}`}
                      >
                        <Icon size={18} strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-white/[0.18]" />
                          <span className="truncate font-mono text-[10px] uppercase tracking-[0.08em] text-accent/70">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="mt-1.5 font-display text-[20px] font-bold tracking-[-0.01em] text-white sm:text-[22px]">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-[13.5px] leading-[1.7] text-body sm:text-[14px] sm:leading-[1.75]">
                      {project.description}
                    </p>

                    {/* Proof badges */}
                    {project.proofBadges?.length ? (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.proofBadges.map((badge) => (
                          <span
                            key={badge}
                            className={`inline-flex items-center gap-1.5 rounded-full border ${accent.chip} px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.02em]`}
                          >
                            <span
                              className={`h-1 w-1 rounded-full ${accent.dot}`}
                            />
                            {badge}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Metric badge */}
                    {project.metricBadge ? (
                      <div
                        className={`mt-5 inline-flex w-fit items-center gap-2 rounded-xl border ${accent.metric} px-3.5 py-2`}
                      >
                        <CheckCircle2 size={13} strokeWidth={2} />
                        <span className="text-[12px] font-semibold tracking-[-0.005em]">
                          {project.metricBadge}
                        </span>
                      </div>
                    ) : null}

                    {/* Spacer + CTA pinned bottom */}
                    <div className="mt-6 flex-1" />
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-4">
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
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[12.5px] font-medium text-white/70 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white"
            >
              All case studies <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
