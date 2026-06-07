"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./shared";
import { ProjectRail } from "./project-rail";
import { featuredProjects } from "@/lib/featured-projects";

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
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[12px] font-medium text-white/65 transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white"
            >
              View all work <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 sm:mt-14">
            <ProjectRail projects={featuredProjects} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
