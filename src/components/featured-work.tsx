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
    // TODO: Replace with Kommison.com screenshots when available
    image: "/proof/create3dparts/dashboard.png",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-label">Selected work</span>
              <h2 className="mt-4 font-display text-[clamp(30px,4.5vw,48px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
                Real projects.<br />Measurable outcomes.
              </h2>
            </div>
            <Link
              href="/work"
              className="group flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.12em] text-dim transition-colors duration-200 hover:text-white sm:self-auto"
            >
              All case studies{" "}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="space-y-5">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] shadow-[0_1px_0_rgba(255,255,255,0.02)_inset] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.025]">
                  <div className="grid gap-0 lg:grid-cols-[1.15fr,0.85fr]">
                    {/* Left: image + project info */}
                    <div className="flex flex-col justify-between">
                      <div className="relative h-56 overflow-hidden border-b border-white/[0.06] sm:h-64">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>

                      <div className="p-8 lg:p-10">
                        <div>
                          <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                              {project.category}
                            </span>
                            <span className="h-0.5 w-0.5 rounded-full bg-dim" />
                            <span className="font-mono text-[10px] text-dim">
                              {project.year}
                            </span>
                            {project.live && (
                              <span
                                className="flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-2.5 py-[3px]"
                                style={{ boxShadow: "inset 0 0.5px 0 rgba(52,211,153,0.08)" }}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                <span className="font-mono text-[9px] font-medium tracking-[0.06em] text-emerald-400/90">
                                  LIVE
                                </span>
                              </span>
                            )}
                            {"inDev" in project && project.inDev && (
                              <span
                                className="flex items-center gap-1.5 rounded-full border border-amber-400/15 bg-amber-400/[0.04] px-2.5 py-[3px]"
                                style={{ boxShadow: "inset 0 0.5px 0 rgba(251,191,36,0.08)" }}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                <span className="font-mono text-[9px] font-medium tracking-[0.06em] text-amber-400/90">
                                  IN DEV
                                </span>
                              </span>
                            )}
                          </div>

                          <h3 className="font-display text-[26px] font-bold tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-accent lg:text-[30px]">
                            {project.title}
                          </h3>

                          <p className="mt-3 max-w-[420px] text-[14px] leading-[1.75] text-body">
                            {project.description}
                          </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-1.5">
                          {project.stack.map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: metrics panel */}
                    <div className="border-t border-white/[0.04] bg-white/[0.01] p-8 lg:border-l lg:border-t-0 lg:p-10">
                      <div className="flex h-full flex-col justify-center gap-7">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                              {m.label}
                            </div>
                            {"before" in m ? (
                              <div className="flex items-baseline gap-2 whitespace-nowrap text-5xl">
                               <span className="text-[14px] text-white/30 line-through">
                                 {m.before}
                               </span>
                               <span className="text-[13px] text-accent/60">
                                 &rarr;
                               </span>
                               <span>
                                 {m.after}
                               </span>
                            </div>
                            ) : (
                              <div className="font-display text-[26px] font-black tracking-[-0.02em] text-accent">
                                {m.value}
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="mt-auto flex items-center gap-2 pt-4 font-mono text-[11px] text-dim opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          View case study <ArrowUpRight size={12} />
                        </div>
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