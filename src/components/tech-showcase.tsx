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

const iconMap: Record<string, React.ComponentType<{ color: string }>> = {
  "Next.js": NextIcon, React: ReactIcon, TypeScript: TSIcon,
  Supabase: SupabaseIcon, Stripe: StripeIcon, OpenAI: OpenAIIcon,
  "Node.js": NodeIcon, Vercel: VercelIcon, Shopify: ShopifyIcon,
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
];

const differentiators = [
  {
    title: "Senior-led execution",
    desc: "No revolving door of junior devs. Your project is led by experienced engineers who've shipped real products — not managed from a distance.",
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

export function TechShowcase() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <div className="mb-14">
            <span className="section-label">Why us</span>
            <h2 className="mt-4 max-w-[480px] font-display text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
              Not another generic agency.
            </h2>
            <p className="mt-4 max-w-[460px] text-[15px] leading-[1.75] text-body">
              We&apos;re a small, senior team that treats your product like our own.
            </p>
          </div>
        </Reveal>

        {/* Differentiators - 2x2 grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 shadow-[0_1px_0_rgba(255,255,255,0.02)_inset] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.025]">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] border border-accent/20 bg-accent/[0.06]">
                  <Check size={13} className="text-accent" />
                </div>
                <div>
                  <h3 className="mb-2 font-display text-[16px] font-bold text-white">{d.title}</h3>
                  <p className="text-[13px] leading-[1.75] text-body">{d.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tech stack bar */}
        <Reveal delay={0.3}>
          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 shadow-[0_1px_0_rgba(255,255,255,0.02)_inset] sm:p-7">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">Our stack</div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => {
                const Icon = iconMap[t.name];
                return (
                  <div
                    key={t.name}
                    className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.1]"
                  >
                    {Icon ? <Icon color={t.color} /> : <div className="h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />}
                    <span className="font-mono text-[11px] font-medium text-white/40">{t.name}</span>
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
