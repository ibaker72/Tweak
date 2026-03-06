"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Mail, Clock, ArrowRight, ArrowUp, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";
import { faqs } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-surface-1 py-24 sm:py-28">
      <div className="mx-auto max-w-[780px] px-7">
        <Reveal><div className="mb-12 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-v-light">FAQ</span>
          <h2 className="mt-2 font-display text-[clamp(28px,3.5vw,38px)] font-extrabold tracking-[-0.02em] text-white">Common questions</h2>
        </div></Reveal>
        <div className="space-y-1.5">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className={cn("overflow-hidden rounded-[16px] border transition-all duration-200",
                open === i ? "border-v/[0.2] bg-gradient-to-br from-v/[0.04] to-cyan/[0.02]" : "border-white/[0.05]")}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left">
                  <span className={cn("text-[15px] font-semibold", open === i ? "text-white" : "text-gray-300")}>{faq.q}</span>
                  <ChevronDown size={18} className={cn("flex-shrink-0 transition-transform duration-300", open === i ? "rotate-180 text-cyan" : "text-dim")} />
                </button>
                <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open === i ? 280 : 0 }}>
                  <p className="px-5 pb-5 text-sm leading-[1.75] text-body">{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactBar() {
  return (
    <section className="border-t border-white/[0.05] py-16">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white">Ready to build?</h2>
          <div className="mt-2.5 flex flex-wrap gap-5">
            <a href="mailto:iyadbaker.dev@gmail.com" className="flex items-center gap-2 text-sm text-body transition-colors hover:text-white"><Mail size={15} className="text-cyan" /> iyadbaker.dev@gmail.com</a>
            <span className="flex items-center gap-2 text-sm text-dim"><Clock size={15} className="text-cyan" /> Responds in under 4 hours</span>
          </div>
        </div>
        <Link href="/#pricing" className="btn-v">Work with us <ArrowRight size={15} /></Link>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { h: "Services", links: [{ l: "Web Applications", href: "/#services" },{ l: "Landing Pages", href: "/#services" },{ l: "WordPress", href: "/#services" },{ l: "Automation", href: "/#services" }] },
    { h: "Company", links: [{ l: "Case Studies", href: "/work" },{ l: "About", href: "/about" },{ l: "Process", href: "/#process" },{ l: "Contact", href: "/contact" }] },
  ];
  return (
    <footer className="border-t border-white/[0.04]">
      <div className="wrap py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-v to-v-deep shadow-[0_2px_12px_rgba(139,92,246,0.15)]"><Terminal size={13} className="text-white" /></div>
              <span className="font-display text-[15px] font-extrabold text-white">tweak&build</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">Product engineering studio. We design and build web apps, landing pages, and automation systems for businesses ready to scale.</p>
            <a href="mailto:iyadbaker.dev@gmail.com" className="mt-3 block text-sm text-dim transition-colors hover:text-v">iyadbaker.dev@gmail.com</a>
          </div>
          {cols.map(c => <div key={c.h}><h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{c.h}</h4><ul className="mt-4 space-y-2.5">{c.links.map(l => <li key={l.l}><Link href={l.href} className="text-sm text-dim transition-colors hover:text-white">{l.l}</Link></li>)}</ul></div>)}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.04] pt-8 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-dim">© {new Date().getFullYear()} Bedrock Alliance LLC</span>
            <Link href="/privacy" className="text-xs text-dim transition-colors hover:text-body">Privacy</Link>
            <Link href="/terms" className="text-xs text-dim transition-colors hover:text-body">Terms</Link>
          </div>
          <span className="text-xs text-dim">Engineered by Tweak & Build</span>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [v, setV] = useState(false);
  useEffect(() => { const fn = () => setV(window.scrollY > 500); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  if (!v) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-surface-2/90 text-dim shadow-lg backdrop-blur-sm transition-all hover:border-v/[0.2] hover:text-v" aria-label="Top"><ArrowUp size={16} /></button>;
}
