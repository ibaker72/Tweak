"use client";

import Link from "next/link";
import { ShoppingCart, Users, Gamepad2 } from "lucide-react";
import { Reveal } from "./shared";
import { projects } from "@/lib/data";
import { ProjectPrimaryMedia } from "@/components/project-primary-media";

const projectIcons = {
  create3dparts: ShoppingCart,
  leadsandsaas: Users,
  voltgrid: Gamepad2,
} as const;

const featuredProjects = ["create3dparts", "leadsandsaas", "voltgrid"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-12 sm:py-36">
      <div className="wrap">
        <div className="lg:hidden">
          <Reveal>
            <span className="section-label">Selected work</span>
            <h2 className="mt-4 font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
              Results speak.
            </h2>
            <p className="mt-2 text-[13px] leading-[1.6] text-body">
              Engagements focused on measurable business lift.
            </p>
          </Reveal>

          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
            {featuredProjects.map((project, i) => {
              const Icon =
                projectIcons[project.slug as keyof typeof projectIcons];

              return (
                <Reveal key={project.slug} delay={i * 0.06}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group block w-[86vw] max-w-[340px] shrink-0 snap-start"
                  >
                    <div
                      className="relative h-full rounded-2xl border border-white/[0.06] p-4"
                      style={{
                        background: "rgba(255,255,255,0.012)",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                      }}
                    >
                      <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                        <ProjectPrimaryMedia
                          project={project}
                          sizes="86vw"
                          className="relative h-full w-full"
                          imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          videoClassName="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-surface-0">
                          <span className="font-mono text-[11px] font-bold text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="font-display text-[16px] font-bold tracking-[-0.01em] text-white">
                          {project.title}
                        </h3>
                        {Icon ? (
                          <Icon size={13} className="text-dim/60" />
                        ) : null}
                      </div>
                      <p className="mt-2 line-clamp-2 text-[12px] leading-[1.6] text-body">
                        {project.solutionShort}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent/[0.10] bg-accent/[0.03] px-3 py-1">
                        <div className="h-1 w-1 rounded-full bg-accent/70" />
                        <span className="font-mono text-[9px] font-medium text-accent/80">
                          {project.impact}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-[400px,1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="section-label">Selected work</span>
              <h2 className="mt-5 font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Results speak.
                <br />
                <span className="text-body">We just ship.</span>
              </h2>
              <p className="mt-4 max-w-[360px] text-[14px] leading-[1.7] text-body sm:mt-5 sm:text-[15px] sm:leading-[1.75]">
                Product engineering engagements focused on measurable business
                lift, delivered with production-grade precision.
              </p>
            </Reveal>
          </div>

          <div className="relative">
            <div
              className="absolute bottom-0 left-[23px] top-0 hidden w-px lg:block"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(200,255,0,0.2), rgba(255,255,255,0.04) 80%, transparent)",
              }}
            />

            <div className="space-y-5">
              {featuredProjects.map((project, i) => {
                const Icon =
                  projectIcons[project.slug as keyof typeof projectIcons];

                return (
                  <Reveal key={project.slug} delay={i * 0.08}>
                    <Link
                      href={`/work/${project.slug}`}
                      className="group block"
                    >
                      <div
                        className="relative h-full rounded-2xl border border-white/[0.06] p-8 transition-all duration-300 hover:border-white/[0.12]"
                        style={{
                          background: "rgba(255,255,255,0.012)",
                          boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                        }}
                      >
                        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
                          <ProjectPrimaryMedia
                            project={project}
                            sizes="600px"
                            className="relative h-full w-full"
                            imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                            videoClassName="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>

                        <div className="flex gap-6">
                          <div className="relative z-10 flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-surface-0">
                            <span className="font-mono text-[13px] font-bold text-accent">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2.5">
                              <h3 className="font-display text-[19px] font-bold tracking-[-0.01em] text-white">
                                {project.title}
                              </h3>
                              {Icon ? (
                                <Icon size={14} className="text-dim/60" />
                              ) : null}
                            </div>
                            <p className="mt-2.5 text-[14px] leading-[1.8] text-body">
                              {project.solutionShort}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/[0.10] bg-accent/[0.03] px-3.5 py-1.5">
                              <div className="h-1 w-1 rounded-full bg-accent/70" />
                              <span className="font-mono text-[10px] font-medium text-accent/80">
                                {project.impact}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
