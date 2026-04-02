"use client";
import { Reveal } from "./shared";
import { Check } from "lucide-react";

const stackLogos = [
  { name: "Next.js", src: "/stack-logos/nextdotjs.svg" },
  { name: "React", src: "/stack-logos/react.svg" },
  { name: "TypeScript", src: "/stack-logos/typescript.svg" },
  { name: "Supabase", src: "/stack-logos/supabase.svg" },
  { name: "Stripe", src: "/stack-logos/stripe.svg" },
  { name: "Node.js", src: "/stack-logos/nodedotjs.svg" },
  { name: "Vercel", src: "/stack-logos/vercel.svg" },
  { name: "Tailwind CSS", src: "/stack-logos/tailwindcss.svg" },
  { name: "OpenAI", src: "/stack-logos/openai.svg" },
  { name: "Shopify", src: "/stack-logos/shopify.svg" },
];

const differentiators = [
  {
    title: "Senior-led execution",
    desc: "No revolving door of junior devs. Your project is led by experienced engineers who've shipped real products - not managed from a distance.",
  },
  {
    title: "Fixed pricing, always",
    desc: "You get a locked price before we write a line of code. No hourly billing, no scope creep, no surprise invoices.",
  },
  {
    title: "Product thinking built in",
    desc: "We don't just build to spec. We challenge assumptions, optimize for conversion, and make sure every feature serves a business goal.",
  },
  {
    title: "You own everything",
    desc: "100% of the source code, design assets, and documentation transfer to you on final payment. No lock-in. No licensing fees.",
  },
];

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
    result: "Quote time: 48hrs \u2192 60sec",
    featured: false,
  },
  {
    quote: "We'd already burned through two agencies before finding Tweak & Build. They scoped it cleanly, hit every milestone, and we never had to chase for an update.",
    name: "Priya Patel",
    title: "Founder, voltgrid",
    project: "Landing Page + CRM",
    engagement: "3-week build",
    result: "Delivered on scope and budget",
    featured: false,
  },
];

export function TechShowcase() {
  return (
    <section className="relative py-12 sm:py-24">
      <div className="wrap">
        <Reveal>
          <div className="mb-8 sm:mb-16">
            <span className="section-label">Why us</span>
            <h2 className="mt-4 max-w-[560px] font-display text-[clamp(28px,4.5vw,52px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white sm:mt-5">
              Why founders choose us.
            </h2>
            <p className="mt-3 max-w-[460px] text-[13px] leading-[1.65] text-body sm:mt-4 sm:text-[15px] sm:leading-[1.75]">
              We&apos;re a small, senior team that treats your product like our own.
            </p>
          </div>
        </Reveal>

        {/* Differentiators - single column mobile, 2x2 desktop */}
        <div className="grid gap-3 sm:auto-rows-fr sm:grid-cols-2 sm:gap-5">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06} className="h-full">
              <div
                className="flex h-full gap-3 rounded-xl border border-white/[0.06] p-4 transition-all duration-300 hover:border-white/[0.12] sm:gap-4 sm:rounded-2xl sm:p-7 lg:p-8"
                style={{
                  background: "rgba(255,255,255,0.012)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                }}
              >
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.05] sm:h-9 sm:w-9">
                  <Check size={14} className="text-accent" />
                </div>
                <div>
                  <h3 className="mb-1 font-display text-[15px] font-bold text-white sm:mb-2 sm:text-[17px]">{d.title}</h3>
                  <p className="text-[12px] leading-[1.65] text-body sm:text-[14px] sm:leading-[1.8]">{d.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Testimonials - compact row */}
        <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar sm:mt-10 sm:gap-5 lg:grid lg:overflow-visible lg:pb-0 lg:[grid-template-columns:repeat(3,minmax(0,1fr))]">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.06 + i * 0.06}>
              <div
                className={`flex h-full min-w-[84vw] snap-start flex-col rounded-xl border p-5 transition-all duration-300 hover:border-white/[0.12] sm:min-w-[70%] sm:rounded-2xl sm:p-7 lg:min-w-0 lg:p-8 ${
                  t.featured
                    ? "border-accent/[0.10]"
                    : "border-white/[0.06]"
                }`}
                style={{
                  background: t.featured ? "rgba(200,255,0,0.015)" : "rgba(255,255,255,0.012)",
                  boxShadow: t.featured
                    ? "0 1px 0 rgba(200,255,0,0.03) inset"
                    : "0 1px 0 rgba(255,255,255,0.02) inset",
                }}
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-white/50">
                    {t.engagement}
                  </span>
                  <span className={`rounded-full border px-3 py-1 font-mono text-[10px] ${
                    t.featured
                      ? "border-accent/[0.12] bg-accent/[0.05] font-medium text-accent/80"
                      : "border-accent/[0.10] bg-accent/[0.03] text-accent/70"
                  }`}>
                    {t.result}
                  </span>
                </div>

                <p className={`flex-1 leading-[1.7] ${
                  t.featured
                    ? "text-[14px] font-medium text-white sm:text-[17px]"
                    : "text-[13px] text-gray-300 sm:text-[15px]"
                }`}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.05] pt-6">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    t.featured
                      ? "border-accent/15 bg-accent/[0.06]"
                      : "border-white/[0.08] bg-white/[0.02]"
                  }`}>
                    <span className={`font-display text-[11px] font-bold ${
                      t.featured ? "text-accent" : "text-white/50"
                    }`}>
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
    </section>
  );
}
