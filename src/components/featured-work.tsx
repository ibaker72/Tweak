"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./shared";
import { VisualProofCard } from "./visual-proof/visual-proof-card";
import { visualProofProjects } from "@/lib/visual-proof";

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-14 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(200,255,0,0.04),transparent)]" />

      <div className="wrap relative">
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-label">Visual proof</span>
              <h2 className="mt-4 font-display text-[clamp(28px,5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Real builds.{" "}
                <span className="text-body">Real screens.</span>
              </h2>
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.7] text-body sm:text-[15px] sm:leading-[1.75]">
                Live screenshots, working demos, and the actual pages and flows
                from each project — tap any cover to open the full gallery.
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

        {/* Mobile = horizontal snap-rail · sm+ = stacked grid · lg+ = 3 cols */}
        <div
          className="
            no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto
            -mx-5 px-5 pb-2
            sm:mx-0 sm:mt-14 sm:grid sm:snap-none sm:grid-cols-1
            sm:gap-5 sm:overflow-visible sm:px-0
            lg:grid-cols-3 lg:gap-6
          "
        >
          {visualProofProjects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 0.06}
              className="w-[88vw] max-w-[420px] flex-shrink-0 snap-start sm:w-auto sm:max-w-none sm:flex-shrink"
            >
              <VisualProofCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
