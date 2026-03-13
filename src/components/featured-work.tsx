"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./shared";

const featuredProjects = [
  {
    slug: "create3dparts",
    title: "Create3DParts.com",
    category: "E-Commerce Platform",
    description: "Real-time 3D printing quoting engine with instant pricing and Stripe checkout. Replaced a 48-hour manual process.",
    metrics: [
      { label: "Quote time", before: "48 hrs", after: "60 sec" },
      { label: "Orders", value: "+35% month one" },
    ],
    stack: ["Next.js", "TypeScript", "Stripe", "AWS S3"],
    accent: "#C8FF00",
    year: "2025",
    live: true,
    image: "/proof/create3dparts/home.png",
  },
  {
    slug: "leadsandsaas",
    title: "LeadsAndSaaS",
    category: "SaaS Platform",
    description: "Multi-tenant platform consolidating agent management, asset storage, and lead distribution into one product.",
    metrics: [
      { label: "Lead response", before: "4 hrs", after: "15 min" },
      { label: "Onboarding", before: "3 days", after: "4 hours" },
    ],
    stack: ["Next.js", "Supabase", "OpenAI", "Vercel"],
    accent: "#8B5CF6",
    year: "2025",
    live: true,
    image: "/proof/leadsandsaas/overview.png",
  },
  {
    slug: "kommison",
    title: "Kommison.com",
    category: "Affiliate & Commission Platform",
    description: "Affiliate and commission management platform with real-time tracking, automated payouts, and multi-tier campaign analytics.",
    metrics: [
      { label: "Status", value: "In development" },
      { label: "Payout automation", value: "Real-time" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe Connect"],
    accent: "#06B6D4",
    year: "2025",
    live: false,
    inDev: true,
    image: "/proof/create3dparts/dashboard.png",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="wrap">
        <Reveal>
          <div className="mb-16 flex flex-col gap-4 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-label">Selected work</span>
              <h2 className="mt-5 font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Real projects.<br />Measurable outcomes.
              </h2>
              <p className="mt-4 max-w-[420px] text-[15px] leading-[1.7] text-body">
                Every build is measured by business impact, not just code quality.
              </p>
            </div>
            <Link
              href="/work"
              className="group flex items-center gap-2 self-start rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-dim transition-all duration-200 hover:border-white/[0.12] hover:text-white sm:self-auto"
            >
              All case studies{" "}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="space-y-6 sm:space-y-8">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <Link href={`/work/${project.slug}`} className="group block">
                <div
                  className="overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500 hover:border-white/[0.14] sm:rounded-3xl"
                  style={{
                    background: "rgba(255,255,255,0.012)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset, 0 8px 32px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Image section - larger and more dramatic */}
                  <div className="relative h-64 overflow-hidden sm:h-80 lg:h-[380px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-0 via-surface-0/40 to-transparent" />

                    {/* Floating badges on image */}
                    <div className="absolute right-5 top-5 flex items-center gap-2 sm:right-7 sm:top-7">
                      {project.live && (
                        <span
                          className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-surface-0/80 px-3 py-[5px] backdrop-blur-sm"
                          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="font-mono text-[9px] font-medium tracking-[0.06em] text-emerald-400/90">LIVE</span>
                        </span>
                      )}
                      {"inDev" in project && project.inDev && (
                        <span
                          className="flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-surface-0/80 px-3 py-[5px] backdrop-blur-sm"
                          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          <span className="font-mono text-[9px] font-medium tracking-[0.06em] text-amber-400/90">IN DEV</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content below image */}
                  <div className="grid gap-0 lg:grid-cols-[1.2fr,0.8fr]">
                    <div className="p-7 sm:p-9 lg:p-10">
                      <div className="mb-4 flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                          {project.category}
                        </span>
                        <span className="h-0.5 w-0.5 rounded-full bg-dim" />
                        <span className="font-mono text-[10px] text-dim">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="font-display text-[28px] font-bold tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-accent sm:text-[32px] lg:text-[36px]">
                        {project.title}
                      </h3>

                      <p className="mt-3 max-w-[460px] text-[14px] leading-[1.75] text-body sm:text-[15px]">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-1.5 sm:mt-8">
                        {project.stack.map((t) => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-dim opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100 sm:mt-8">
                        View case study <ArrowUpRight size={12} />
                      </div>
                    </div>

                    {/* Right: metrics panel */}
                    <div className="border-t border-white/[0.04] bg-white/[0.008] p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
                      <div className="flex h-full flex-col justify-center gap-8 lg:gap-10">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                              {m.label}
                            </div>
                            {"before" in m ? (
                              <div className="flex items-baseline gap-2.5 whitespace-nowrap">
                                <span className="text-[14px] text-white/25 line-through">
                                  {m.before}
                                </span>
                                <span className="text-[13px] text-accent/40">
                                  &rarr;
                                </span>
                                <span className="font-display text-[30px] font-black tracking-[-0.02em] text-accent sm:text-[34px]">
                                  {m.after}
                                </span>
                              </div>
                            ) : (
                              <div className="font-display text-[28px] font-black tracking-[-0.02em] text-accent sm:text-[32px]">
                                {m.value}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
