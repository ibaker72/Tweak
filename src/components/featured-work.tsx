"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Users, Gamepad2, Car } from "lucide-react";
import { Reveal } from "./shared";

const projects = [
  {
    num: "01",
    title: "Create3DParts.com",
    desc: "Real-time 3D printing quoting engine with instant pricing and Stripe checkout. Replaced a 48-hour manual process with 60-second automated quotes.",
    detail: "Quote time: 48hrs → 60sec",
    icon: ShoppingCart,
    image: "/proof/create3dparts/home.png",
    href: "/work/create3dparts",
  },
  {
    num: "02",
    title: "LeadsAndSaaS",
    desc: "Multi-tenant platform consolidating agent management, asset storage, and lead distribution into one product. Onboarding reduced from 3 days to 4 hours.",
    detail: "Lead response: 4hrs → 15min",
    icon: Users,
    image: "/proof/leadsandsaas/overview.png",
    href: "/work/leadsandsaas",
  },
  {
    num: "03",
    title: "VoltGrid",
    desc: "Arcade-style mobile game designed and built with responsive full-screen gameplay, energetic visual feedback, and a polished, mobile-friendly game experience.",
    detail: "Full-screen mobile gameplay",
    icon: Gamepad2,
    image: "/proof/voltgrid/cover.png",
    href: "/work/voltgrid",
  },
  {
    num: "04",
    title: "SpeedwayMotorsLLC.com",
    desc: "Modern dealership website featuring real-time inventory sync, online financing applications, and lead capture optimized for local SEO.",
    detail: "Online leads: +40%",
    icon: Car,
    image: "/proof/leadsandsaas/agents.png",
    href: "/work/speedwaymotorsllc",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-[400px,1fr] lg:gap-20">
          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="section-label">Selected work</span>
              <h2 className="mt-5 font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Results speak.
                <br />
                <span className="text-body">We just ship.</span>
              </h2>
              <p className="mt-5 max-w-[360px] text-[15px] leading-[1.75] text-body">
                Product engineering engagements focused on measurable business lift, delivered with production-grade precision.
              </p>
            </Reveal>
          </div>

          {/* Right: project cards */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute bottom-0 left-[23px] top-0 hidden w-px lg:block" style={{ background: "linear-gradient(to bottom, rgba(200,255,0,0.2), rgba(255,255,255,0.04) 80%, transparent)" }} />

            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-1 no-scrollbar lg:block lg:space-y-5 lg:overflow-visible lg:pb-0 lg:pr-0">
              {projects.map((project, i) => (
                <Reveal key={project.num} delay={i * 0.08}>
                  <Link href={project.href} className="group block min-w-[85%] snap-start sm:min-w-[70%] lg:min-w-0">
                    <div
                      className="relative rounded-2xl border border-white/[0.06] p-7 transition-all duration-300 hover:border-white/[0.12] lg:p-8"
                      style={{
                        background: "rgba(255,255,255,0.012)",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                      }}
                    >
                      {/* Project image */}
                      <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 600px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="flex gap-5 lg:gap-6">
                        {/* Number badge */}
                        <div className="relative z-10 flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-surface-0">
                          <span className="font-mono text-[13px] font-bold text-accent">{project.num}</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2.5">
                            <h3 className="font-display text-[19px] font-bold tracking-[-0.01em] text-white">{project.title}</h3>
                            <project.icon size={14} className="text-dim/60" />
                          </div>
                          <p className="mt-2.5 text-[13px] leading-[1.85] text-body sm:text-[14px]">{project.desc}</p>
                          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/[0.10] bg-accent/[0.03] px-3.5 py-1.5">
                            <div className="h-1 w-1 rounded-full bg-accent/70" />
                            <span className="font-mono text-[10px] font-medium text-accent/80">{project.detail}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
