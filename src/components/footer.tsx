"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ArrowUp, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";
import { faqs } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-[780px] px-6 sm:px-8">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title mt-4">Common questions</h2>
            <p className="mx-auto mt-4 max-w-[400px] text-[15px] leading-[1.7] text-body">
              Everything you need to know before getting started.
            </p>
          </div>
        </Reveal>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className={cn(
                "overflow-hidden rounded-2xl border transition-all duration-200",
                open === i ? "border-accent/[0.15] bg-accent/[0.02]" : "border-white/[0.05] bg-white/[0.015]"
              )}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-[18px] text-left">
                  <span className={cn("text-[15px] font-semibold", open === i ? "text-white" : "text-gray-300")}>{faq.q}</span>
                  <ChevronDown size={18} className={cn("flex-shrink-0 transition-transform duration-300", open === i ? "rotate-180 text-accent" : "text-dim")} />
                </button>
                <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open === i ? 300 : 0 }}>
                  <p className="px-6 pb-5 text-sm leading-[1.75] text-body">{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { h: "Services", links: [{ l: "Web Applications", href: "/#services" }, { l: "Landing Pages", href: "/#services" }, { l: "E-Commerce", href: "/#services" }, { l: "Automation & AI", href: "/#services" }] },
    { h: "Company", links: [{ l: "Case Studies", href: "/work" }, { l: "About", href: "/about" }, { l: "Process", href: "/#process" }, { l: "Contact", href: "/contact" }] },
  ];

  return (
    <footer className="border-t border-white/[0.04]">
      <div className="wrap py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-accent">
                <Terminal size={13} className="text-surface-0" />
              </div>
              <span className="font-display text-[17px] font-extrabold tracking-[-0.03em] text-white">
                Tweak<span className="text-accent">&amp;</span>Build
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              Product engineering studio. We build high-converting websites, web apps, and automation systems for founders who ship.
            </p>
            <a href="mailto:iyadbaker.dev@gmail.com" className="mt-3 block text-sm text-dim transition-colors hover:text-accent">iyadbaker.dev@gmail.com</a>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{c.h}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(l => (
                  <li key={l.l}><Link href={l.href} className="text-sm text-dim transition-colors hover:text-white">{l.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.04] pt-8 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-dim">&copy; {new Date().getFullYear()} Bedrock Alliance LLC</span>
            <Link href="/privacy" className="text-xs text-dim transition-colors hover:text-body">Privacy</Link>
            <Link href="/terms" className="text-xs text-dim transition-colors hover:text-body">Terms</Link>
          </div>
          <span className="text-xs text-dim">Engineered by Tweak &amp; Build</span>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [v, setV] = useState(false);
  useEffect(() => { const fn = () => setV(window.scrollY > 500); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  if (!v) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-surface-2/90 text-dim shadow-lg backdrop-blur-sm transition-all hover:border-accent/[0.3] hover:text-accent"
      aria-label="Back to top">
      <ArrowUp size={16} />
    </button>
  );
}
