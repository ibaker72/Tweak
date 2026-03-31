"use client";
import { Reveal } from "./shared";
import { Check } from "lucide-react";

/* Minimal inline SVG icons for each stack tool — monochrome, tinted with brand color */
function NextIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="85" stroke={color} strokeWidth="10" opacity="0.7" />
      <path d="M72 55v70l50-70" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </svg>
  );
}
function ReactIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill={color} opacity="0.9" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.2" opacity="0.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.2" opacity="0.6" transform="rotate(120 12 12)" />
    </svg>
  );
}
function TSIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <text x="12" y="16.5" textAnchor="middle" fill={color} fontSize="11" fontWeight="700" fontFamily="system-ui" opacity="0.9">TS</text>
    </svg>
  );
}
function SupabaseIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M13.5 21.5c-.4.5-1.2.1-1.1-.5l.8-8H5.8c-.8 0-1.2-1-.7-1.6L11 2.5c.4-.5 1.2-.1 1.1.5L11.3 11h7.4c.8 0 1.2 1 .7 1.6L13.5 21.5z" fill={color} opacity="0.7" />
    </svg>
  );
}
function StripeIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M12.5 9c-1.5-.5-3 0-3 1.5s1.2 1.5 2.5 2c1.3.5 2.5 1 2.5 2.5s-1.5 2-3 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}
function OpenAIIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M12 6v6l4 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}
function NodeIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M12 22V12M3 7l9 5 9-5" stroke={color} strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}
function VercelIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L22 20H2L12 3z" fill={color} opacity="0.7" />
    </svg>
  );
}
function ShopifyIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M15 4l1 5 4 1-9 12V12H7l8-8z" fill={color} opacity="0.7" />
    </svg>
  );
}
function TailwindUIIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.35 10.82 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.65 7.18 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.35 16.82 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.65 13.18 9.5 12 7 12z" fill={color} opacity="0.7" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ color: string }>> = {
  "Next.js": NextIcon, React: ReactIcon, TypeScript: TSIcon,
  Supabase: SupabaseIcon, Stripe: StripeIcon, OpenAI: OpenAIIcon,
  "Node.js": NodeIcon, Vercel: VercelIcon, Shopify: ShopifyIcon,
  "Tailwind UI": TailwindUIIcon,
};

const techStack = [
  { name: "Next.js", color: "#fff" },
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "Stripe", color: "#635BFF" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "Node.js", color: "#68A063" },
  { name: "Vercel", color: "#fff" },
  { name: "Shopify", color: "#7AB55C" },
  { name: "Tailwind UI", color: "#38BDF8" },
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
    title: "Founder, Kommison",
    project: "Landing Page + CRM",
    engagement: "3-week build",
    result: "Delivered on scope and budget",
    featured: false,
  },
];

export function TechShowcase() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="wrap">
        <Reveal>
          <div className="mb-12 sm:mb-16">
            <span className="section-label">Why us</span>
            <h2 className="mt-5 max-w-[560px] font-display text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
              Why founders choose us.
            </h2>
            <p className="mt-4 max-w-[460px] text-[15px] leading-[1.75] text-body">
              We&apos;re a small, senior team that treats your product like our own.
            </p>
          </div>
        </Reveal>

        {/* Differentiators - 2x2 grid */}
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06} className="h-full">
              <div
                className="flex h-full gap-4 rounded-2xl border border-white/[0.06] p-7 transition-all duration-300 hover:border-white/[0.12] lg:p-8"
                style={{
                  background: "rgba(255,255,255,0.012)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                }}
              >
                <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.05]">
                  <Check size={14} className="text-accent" />
                </div>
                <div>
                  <h3 className="mb-2 font-display text-[17px] font-bold text-white">{d.title}</h3>
                  <p className="text-[13px] leading-[1.8] text-body sm:text-[14px]">{d.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Testimonials - compact row */}
        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.06 + i * 0.06}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:border-white/[0.12] lg:p-8 ${
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

                <p className={`flex-1 leading-[1.75] ${
                  t.featured
                    ? "text-[16px] font-medium text-white sm:text-[17px]"
                    : "text-[15px] text-gray-300"
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

        {/* Tech stack bar */}
        <Reveal delay={0.3}>
          <div
            className="mt-6 rounded-2xl border border-white/[0.06] p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.012)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
            }}
          >
            <div className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-dim sm:text-left">Our stack</div>
            <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-2.5 sm:justify-start">
              {techStack.map((t) => {
                const Icon = iconMap[t.name];
                return (
                  <div
                    key={t.name}
                    className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.015] px-3.5 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.1]"
                  >
                    {Icon ? <Icon color={t.color} /> : <div className="h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />}
                    <span className="font-mono text-[11px] font-medium text-white/35">{t.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
