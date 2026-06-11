"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Wrench, Car, Cpu, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared";
import { ProofVault } from "@/components/proof-vault";
import { WhatThisProves } from "@/components/what-this-proves";
import { ProofCTA } from "@/components/proof-cta";
import { projects } from "@/lib/data";

const projectIcons: Record<string, LucideIcon> = {
  "pp-mechanical": Wrench,
  "speedway-motors": Car,
  "tweak-build-os": Cpu,
  jerseypantry: ShoppingBag,
};

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
  "tweak-build-os",
  "speedway-motors",
  "pp-mechanical",
  "jerseypantry",
] as const;

const featuredFirst = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

const remainder = projects.filter(
  (p) => !featuredSlugs.includes(p.slug as (typeof featuredSlugs)[number])
);

const orderedProjects = [...featuredFirst, ...remainder];

const statusMeta: Record<
  Exclude<NonNullable<(typeof projects)[number]["status"]>, "live">,
  { badge: string; cta: string }
> = {
  "coming-soon": { badge: "Coming Soon", cta: "Coming Soon" },
  concept: { badge: "Concept", cta: "Concept Build" },
};

export default function WorkPage() {
  return (
    <div className="pb-8 pt-36 sm:pt-40">
      {/* Page header */}
      <section className="relative pb-10 sm:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(200,255,0,0.04),transparent)]" />
        <div className="wrap relative">
          <Reveal>
            <span className="section-label">Case Studies</span>
            <h1 className="mt-5 font-display text-[clamp(32px,5vw,52px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              Our Work
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-[1.75] text-body">
              Real projects for real businesses. Every engagement scoped to
              solve a specific problem and deliver measurable results.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Projects grid */}
      <section className="relative py-10 sm:py-16">
        <div className="wrap relative">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {orderedProjects.map((project, i) => {
              const Icon = projectIcons[project.slug] ?? CheckCircle2;
              const accent = accentMap[project.accent ?? "lime"];
              const meta =
                project.status === "coming-soon" ||
                project.status === "concept"
                  ? statusMeta[project.status]
                  : null;
              const upcoming = meta !== null;

              const cardBody = (
                <>
                  {!upcoming ? (
                    <div
                      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(60% 50% at 50% 0%, ${accent.glow}, transparent)`,
                      }}
                    />
                  ) : null}
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border border-white/[0.07] p-5 transition-all duration-300 sm:p-7 ${
                      upcoming ? "" : "group-hover:border-white/[0.14]"
                    }`}
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.008))",
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.03) inset, 0 16px 48px rgba(0,0,0,0.18)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border ${accent.iconRing}`}
                      >
                        <Icon size={18} strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-white/[0.18]" />
                          <span className="truncate font-mono text-[10px] uppercase tracking-[0.08em] text-accent/70">
                            {project.category}
                          </span>
                          {meta ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-white/65">
                              <span className="h-1 w-1 rounded-full bg-white/40" />
                              {meta.badge}
                            </span>
                          ) : null}
                        </div>
                        <h2 className="mt-1.5 font-display text-[20px] font-bold tracking-[-0.01em] text-white sm:text-[22px]">
                          {project.title}
                        </h2>
                      </div>
                    </div>

                    <p className="mt-4 text-[13.5px] leading-[1.7] text-body sm:text-[14px] sm:leading-[1.75]">
                      {project.description}
                    </p>

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

                    <div className="mt-6 flex-1" />
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                        {upcoming ? "Showcase" : "Case study"}
                      </span>
                      {meta ? (
                        <span
                          aria-disabled="true"
                          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/55"
                        >
                          {meta.cta}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/85 transition-colors duration-200 group-hover:text-accent">
                          View Case Study
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );

              return (
                <Reveal key={project.slug} delay={i * 0.05}>
                  {upcoming ? (
                    <div
                      aria-label={`${project.title} — ${meta?.badge ?? "Upcoming"}`}
                      className="relative block h-full cursor-default"
                    >
                      {cardBody}
                    </div>
                  ) : (
                    <Link
                      href={`/work/${project.slug}`}
                      className="group relative block h-full"
                    >
                      {cardBody}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProofVault />
      <WhatThisProves />
      <ProofCTA />
    </div>
  );
}
