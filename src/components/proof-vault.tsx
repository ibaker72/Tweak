"use client";

import Link from "next/link";
import { ArrowRight, Camera, Play, MessageSquare, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./shared";

type ProofCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  cta: { label: string; href: string };
  comingSoon: boolean;
};

// TODO: when /proof routes are built, flip `comingSoon` to false and point
// `href` at the real category page. Until then, every CTA anchors back to
// this vault so nothing 404s.
const categories: ProofCategory[] = [
  {
    title: "Website Transformations",
    description:
      "Before-and-after screenshots showing how client websites improved visually and structurally.",
    icon: Camera,
    cta: { label: "Coming soon", href: "#proof-vault" },
    comingSoon: true,
  },
  {
    title: "Automation Demos",
    description:
      "Short videos showing lead capture, inventory syncs, CRM updates, notifications, and AI workflows running live.",
    icon: Play,
    cta: { label: "Coming soon", href: "#proof-vault" },
    comingSoon: true,
  },
  {
    title: "Client Results",
    description:
      "Screenshots of client feedback, approvals, leads, bookings, and business wins.",
    icon: MessageSquare,
    cta: { label: "Coming soon", href: "#proof-vault" },
    comingSoon: true,
  },
  {
    title: "System Proof",
    description:
      "Dashboards, databases, cron jobs, Supabase tables, Vercel logs, forms, and live workflow receipts.",
    icon: Database,
    cta: { label: "Coming soon", href: "#proof-vault" },
    comingSoon: true,
  },
];

export function ProofVault() {
  return (
    <section
      id="proof-vault"
      className="relative scroll-mt-28 py-14 sm:py-32"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(200,255,0,0.03),transparent)]" />

      <div className="wrap relative">
        <Reveal>
          <div className="max-w-[680px]">
            <span className="section-label">Proof Vault</span>
            <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
              Receipts, not promises.
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-body sm:text-[15px] sm:leading-[1.75]">
              Screenshots, demos, automations, client messages, and live system
              proof from real builds.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2">
          {categories.map((category, i) => {
            const Icon = category.icon;
            const isAnchor = category.cta.href.startsWith("#");

            return (
              <Reveal key={category.title} delay={i * 0.06}>
                <div
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] p-5 transition-all duration-300 hover:border-white/[0.14] sm:p-6"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.008))",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.02) inset, 0 12px 32px rgba(0,0,0,0.16)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(50% 50% at 50% 0%, rgba(200,255,0,0.08), transparent)",
                    }}
                  />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.06] text-accent">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white sm:text-[18px]">
                          {category.title}
                        </h3>
                        {category.comingSoon && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-amber-300/[0.05] px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-amber-200">
                            <span className="h-1 w-1 rounded-full bg-amber-300" />
                            Coming soon
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[13px] leading-[1.7] text-body sm:text-[13.5px]">
                        {category.description}
                      </p>

                      {/* TODO: upload first set of proof assets (screenshots/videos)
                          into /public/proof-vault/<category-slug>/ and surface
                          them here as a thumbnail strip. */}

                      {isAnchor ? (
                        <a
                          href={category.cta.href}
                          aria-disabled={category.comingSoon}
                          className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/70 transition-colors duration-200 hover:text-accent"
                        >
                          {category.cta.label}
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </a>
                      ) : (
                        <Link
                          href={category.cta.href}
                          className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/85 transition-colors duration-200 hover:text-accent"
                        >
                          {category.cta.label}
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
