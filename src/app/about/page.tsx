"use client";
import Link from "next/link";
import { ArrowRight, Target, Gauge, Users, Code2 } from "lucide-react";
import { Reveal } from "@/components/shared";

const values = [
  { icon: Target, title: "Outcome obsessed", desc: "Every feature ties back to a business metric. More leads, higher revenue, lower churn. If it doesn't move the needle, we don't build it." },
  { icon: Gauge, title: "Speed without shortcuts", desc: "Clean architecture, TypeScript, tested code, production-grade infrastructure from day one." },
  { icon: Users, title: "Senior talent only", desc: "No junior devs learning on your project. No account managers playing telephone. You work directly with the engineers." },
  { icon: Code2, title: "Radical transparency", desc: "Weekly updates, live preview links, and honest conversations. We tell you when something isn't working." },
];

export default function AboutPage() {
  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <div className="mx-auto max-w-3xl px-7">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-v-light">About</span>
          <h1 className="mt-2 font-display text-[clamp(36px,5vw,52px)] font-black leading-[1.1] tracking-[-0.03em] text-white">A studio built for<br />founders who ship</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 space-y-5 text-base leading-[1.8] text-body">
            <p><strong className="text-white">Tweak & Build</strong> is a product engineering studio founded by <strong className="text-white">Iyad Baker</strong> under <strong className="text-white">Bedrock Alliance LLC</strong>. We design and build web applications, landing pages, SaaS platforms, and automation systems for businesses that need measurable results.</p>
            <p>We exist because too many agencies are broken. They staff projects with junior developers, hide behind account managers, bill by the hour to incentivize slowness, and deliver template work at custom prices. We built Tweak & Build to be the opposite.</p>
            <p>Our model: senior engineers working directly with clients on fixed-price engagements with weekly transparency. Every project gets a dedicated lead, a clear scope, and a guarantee that if we don&apos;t deliver, you don&apos;t pay.</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}><h2 className="mb-8 mt-20 font-display text-2xl font-bold text-white">How we operate</h2></Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={0.15 + i * 0.05}>
              <div className="flex gap-4"><div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-v/[0.15] bg-gradient-to-br from-v/[0.08] to-cyan/[0.03]"><v.icon size={18} className="text-v-light" /></div>
              <div><h3 className="font-display font-bold text-white">{v.title}</h3><p className="mt-1 text-sm leading-[1.7] text-body">{v.desc}</p></div></div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.25}>
          <div className="mt-20 overflow-hidden rounded-[20px] border border-white/[0.06] bg-surface-2 p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-v/20 bg-v/10"><span className="font-display text-lg font-bold text-v-light">IB</span></div>
              <div><h3 className="font-display text-lg font-bold text-white">Iyad Baker</h3><p className="font-mono text-[11px] text-dim">Founder & Lead Engineer</p>
              <p className="mt-3 text-sm leading-[1.75] text-body">Full-stack engineer with deep experience across product development, growth engineering, and technical strategy. Background spanning e-commerce platforms, AI-powered SaaS tools, lead generation systems, and enterprise WordPress builds. Based in New Jersey, working with clients worldwide.</p></div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-16 rounded-[20px] border border-v/[0.15] bg-gradient-to-br from-v/[0.04] to-cyan/[0.02] p-10 text-center">
            <h3 className="font-display text-xl font-bold text-white">Ready to work with us?</h3>
            <p className="mt-2 text-body">Let&apos;s talk about your project.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-v justify-center">Get in touch <ArrowRight size={14} /></Link>
              <Link href="/work" className="btn-o justify-center">See our work</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
