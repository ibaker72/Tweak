"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, ArrowRight, FileText, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/shared";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { tiers } from "@/lib/data";

export default function SuccessPage() {
  const params = useSearchParams();
  const tierName = params.get("tier") || "Quick Build";
  const isDev = params.get("dev") === "true";
  const tierData = tiers.find((t) => t.name === tierName);

  return (
    <div className="pb-20 pt-28 sm:pt-32">
      <div className="wrap">
        {/* Confirmation header */}
        <Reveal>
          <div className="mx-auto max-w-[640px] text-center">
            {/* Success icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 shadow-[0_0_32px_rgba(34,197,94,0.1)]">
              <CheckCircle size={28} className="text-emerald-400" />
            </div>

            {isDev && (
              <div className="mx-auto mb-4 max-w-fit rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2 font-mono text-[11px] text-amber-400">
                Dev mode: no real charge was made
              </div>
            )}

            <h1 className="font-display text-[clamp(28px,5vw,40px)] font-black tracking-tight text-white">
              You&apos;re in. Let&apos;s build.
            </h1>
            <p className="mx-auto mt-3 max-w-[440px] text-[16px] leading-[1.8] text-body">
              Your <strong className="text-white">{tierName}</strong>
              {tierData && <span className="text-v-light"> ({tierData.price})</span>} Quick Build has been confirmed. Here&apos;s what happens next.
            </p>
          </div>
        </Reveal>

        {/* Next steps */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-[680px] gap-4 sm:grid-cols-3">
            {[
              {
                num: "1",
                icon: Calendar,
                title: "Book your kickoff call",
                desc: "15 min call to align on your design, content, and delivery timeline.",
                color: "#8B5CF6",
                active: true,
              },
              {
                num: "2",
                icon: FileText,
                title: "Send us your assets",
                desc: "Figma files, content docs, brand guidelines, or reference links.",
                color: "#06B6D4",
                active: false,
              },
              {
                num: "3",
                icon: MessageSquare,
                title: "We start building",
                desc: `You'll see the first preview within ${tierName === "Single Page" ? "48 hours" : tierName === "Multi Page" ? "3 days" : "5 days"}.`,
                color: "#22C55E",
                active: false,
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative overflow-hidden rounded-[16px] border p-5"
                style={{
                  borderColor: step.active
                    ? `${step.color}33`
                    : "rgba(255,255,255,0.05)",
                  background: step.active
                    ? `linear-gradient(170deg, ${step.color}08, rgba(17,17,25,0.6))`
                    : "rgba(17,17,25,0.4)",
                }}
              >
                {step.active && (
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${step.color}55, transparent)`,
                    }}
                  />
                )}
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] border"
                  style={{
                    borderColor: `${step.color}25`,
                    background: `${step.color}10`,
                  }}
                >
                  <step.icon size={16} style={{ color: step.color }} />
                </div>
                <div className="mb-1 font-mono text-[10px] tracking-[0.08em]" style={{ color: step.color }}>
                  Step {step.num}
                </div>
                <h3 className="font-display text-[15px] font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-[13px] leading-[1.6] text-dim">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Calendly embed for kickoff */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-[700px]">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-v/[0.2] bg-v/[0.08]">
                <Calendar size={18} className="text-v-light" />
              </div>
              <h2 className="font-display text-xl font-bold text-white">
                Book your kickoff call
              </h2>
              <p className="mt-1 text-sm text-dim">
                A quick 15 min alignment call. We&apos;ll confirm the scope, timeline, and how to send your assets.
              </p>
            </div>
            <CalendlyEmbed />
          </div>
        </Reveal>

        {/* Fallback CTA */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 max-w-[500px] text-center">
            <p className="text-sm text-dim">
              Prefer email?{" "}
              <a
                href="mailto:iyadbaker.dev@gmail.com"
                className="text-v-light transition-colors hover:text-v"
              >
                iyadbaker.dev@gmail.com
              </a>
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="btn-o justify-center text-[13px]"
              >
                Back to home
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
