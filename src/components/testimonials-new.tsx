"use client";
import { Reveal } from "./shared";

const testimonials = [
  {
    quote: "We needed a working platform for an investor demo and they delivered in under a week. It looked and felt like something that had been in development for months.",
    name: "David Morales",
    title: "CTO, LeadsAndSaaS",
    project: "SaaS Platform",
    engagement: "Sub-1-week build",
    result: "Demo-ready for investor meeting",
    featured: true,
  },
  {
    quote: "Our old quoting process was 48 hours of back-and-forth emails. Now customers get pricing in 60 seconds and check out on the spot. Orders jumped 35% the first month.",
    name: "Ryan Torres",
    title: "Founder, Create3DParts",
    project: "E-Commerce Platform",
    engagement: "Fixed-price",
    result: "Quote time: 48hrs → 60sec",
    featured: false,
  },
  {
    quote: "We'd already burned through two agencies before finding Tweak & Build. They scoped it cleanly, hit every milestone, and we never had to chase for an update.",
    name: "Priya Patel",
    title: "Founder, Kommison",
    project: "Landing Page + CRM",
    engagement: "3-week build",
    result: "Delivered on scope and budget",
    featured: false,
  },
];

export function TestimonialsNew() {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section className="relative py-28 sm:py-36">
      <div className="wrap">
        <Reveal>
          <div className="mb-16 sm:mb-20">
            <span className="section-label">Client proof</span>
            <h2 className="mt-5 font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
              What clients say.
            </h2>
            <p className="mt-4 max-w-[400px] text-[15px] leading-[1.7] text-body">
              Real results from real founders. Not curated. Not rewritten.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.15fr,1fr]">
          {/* Featured testimonial - large editorial quote */}
          <Reveal delay={0.06}>
            <div
              className="flex h-full flex-col justify-between rounded-2xl border border-accent/[0.10] p-8 lg:p-10"
              style={{
                background: "rgba(200,255,0,0.015)",
                boxShadow: "0 1px 0 rgba(200,255,0,0.03) inset, 0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <div className="mb-7 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-white/50">
                    {featured.engagement}
                  </span>
                  <span className="rounded-full border border-accent/[0.12] bg-accent/[0.05] px-3 py-1 font-mono text-[10px] font-medium text-accent/80">
                    {featured.result}
                  </span>
                </div>

                {/* Large quote mark */}
                <div className="mb-4 font-display text-[48px] leading-none text-accent/15">&ldquo;</div>

                <p className="text-[20px] font-medium leading-[1.65] text-white sm:text-[22px] lg:text-[24px]">
                  {featured.quote}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4 border-t border-white/[0.06] pt-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/15 bg-accent/[0.06]">
                  <span className="font-display text-[13px] font-bold text-accent">
                    {featured.name.split(" ").map((n: string) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-display text-[15px] font-bold text-white">{featured.name}</p>
                  <p className="font-mono text-[11px] text-dim">{featured.title}</p>
                </div>
                <span className="ml-auto hidden rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-dim sm:inline-block">
                  {featured.project}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Supporting testimonials */}
          <div className="flex flex-col gap-5">
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={0.12 + i * 0.08}>
                <div
                  className="flex h-full flex-col rounded-2xl border border-white/[0.06] p-7 transition-all duration-300 hover:border-white/[0.12] lg:p-8"
                  style={{
                    background: "rgba(255,255,255,0.012)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                  }}
                >
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-white/50">
                      {t.engagement}
                    </span>
                    <span className="rounded-full border border-accent/[0.10] bg-accent/[0.03] px-3 py-1 font-mono text-[10px] text-accent/70">
                      {t.result}
                    </span>
                  </div>

                  <p className="flex-1 text-[15px] leading-[1.75] text-gray-300 sm:text-[16px]">&ldquo;{t.quote}&rdquo;</p>

                  <div className="mt-6 flex items-center gap-3 border-t border-white/[0.05] pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
                      <span className="font-display text-[11px] font-bold text-white/50">
                        {t.name.split(" ").map((n: string) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-[14px] font-bold text-white">{t.name}</p>
                      <p className="font-mono text-[10px] text-dim">{t.title}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
