"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Calendar, ArrowRight, FileText, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/shared";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { tiers } from "@/lib/data";

export default function SuccessPage() {
  const [tierName, setTierName] = useState("Quick Build");
  const [isDev, setIsDev] = useState(false);
  const tierData = tiers.find((t) => t.name === tierName);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTierName(params.get("tier") || "Quick Build");
    setIsDev(params.get("dev") === "true");
  }, []);

  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        {/* Confirmation header */}
        <Reveal>
          <div className="mx-auto max-w-[640px] text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/[0.15] bg-accent/[0.06]" style={{ boxShadow: "0 0 32px rgba(200,255,0,0.08)" }}>
              <CheckCircle size={24} className="text-accent" />
            </div>

            {isDev && (
              <div className="mx-auto mb-4 max-w-fit rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 font-mono text-[11px] text-amber-400">
                Dev mode: no real charge was made
              </div>
            )}

            <h1 className="font-display text-[clamp(28px,5vw,40px)] font-black tracking-[-0.04em] text-white">
              You&apos;re in. Let&apos;s build.
            </h1>
            <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.75] text-body">
              Your <strong className="text-white">{tierName}</strong>
              {tierData && <span className="text-accent/80"> ({tierData.price})</span>} Quick Build has been confirmed. Here&apos;s what happens next.
            </p>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="divider mx-auto mt-10 max-w-[680px]" />

        {/* Next steps */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 grid max-w-[680px] gap-3 sm:grid-cols-3">
            {[
              {
                num: "1",
                icon: Calendar,
                title: "Book your kickoff call",
                desc: "15 min call to align on your design, content, and delivery timeline.",
                active: true,
              },
              {
                num: "2",
                icon: FileText,
                title: "Send us your assets",
                desc: "Figma files, content docs, brand guidelines, or reference links.",
                active: false,
              },
              {
                num: "3",
                icon: MessageSquare,
                title: "We start building",
                desc: `You'll see the first preview within ${tierName === "Single Page" ? "48 hours" : tierName === "Multi Page" ? "3 days" : "5 days"}.`,
                active: false,
              },
            ].map((step) => (
              <div
                key={step.num}
                className="card relative overflow-hidden rounded-2xl p-5"
                style={{
                  borderColor: step.active ? "rgba(200,255,0,0.12)" : undefined,
                  background: step.active ? "linear-gradient(170deg, rgba(200,255,0,0.03), rgba(255,255,255,0.015))" : undefined,
                }}
              >
                {step.active && (
                  <div
                    className="absolute left-0 right-0 top-0 h-px"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.25), transparent)",
                    }}
                  />
                )}
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[10px] border border-accent/[0.12] bg-accent/[0.06]">
                  <step.icon size={14} className={step.active ? "text-accent" : "text-accent/50"} />
                </div>
                <div className="mb-1 font-mono text-[10px] tracking-[0.08em] text-accent/60">
                  Step {step.num}
                </div>
                <h3 className="font-display text-[14px] font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-[12px] leading-[1.65] text-dim">
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
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-[10px] border border-accent/[0.15] bg-accent/[0.06]">
                <Calendar size={16} className="text-accent/70" />
              </div>
              <h2 className="font-display text-[18px] font-bold tracking-[-0.01em] text-white">
                Book your kickoff call
              </h2>
              <p className="mt-1 text-[13px] text-dim">
                A quick 15 min alignment call. We&apos;ll confirm the scope, timeline, and how to send your assets.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06]" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
              <CalendlyEmbed />
            </div>
          </div>
        </Reveal>

        {/* Fallback CTA */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 max-w-[500px] text-center">
            <p className="text-[13px] text-dim">
              Prefer email?{" "}
              <a
                href="mailto:iyadbaker.dev@gmail.com"
                className="text-accent/80 transition-colors duration-200 hover:text-accent"
              >
                iyadbaker.dev@gmail.com
              </a>
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/" className="btn-o justify-center">
                <ArrowRight size={13} className="rotate-180" /> Back to home
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
