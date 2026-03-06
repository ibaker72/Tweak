"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "/#services" }, { label: "Work", href: "/work" },
  { label: "Pricing", href: "/#pricing" }, { label: "Process", href: "/#process" }, { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "glass-nav border-b border-white/[0.05]" : "border-b border-transparent")}>
      <div className="wrap flex h-[70px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-v to-v-deep shadow-[0_4px_24px_rgba(139,92,246,0.25)]" style={{ animation: "glowPulse 4s ease-in-out infinite" }}>
            <Terminal size={16} className="text-white" />
          </div>
          <span className="font-display text-[18px] font-extrabold tracking-[-0.03em] text-white">tweak&build</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(l => <Link key={l.href} href={l.href} className="text-[13px] font-medium text-dim transition-colors hover:text-white">{l.label}</Link>)}
          <Link href="/contact" className="btn-v !px-5 !py-2.5 !text-[13px]">Work with us <ArrowRight size={13} /></Link>
        </nav>
        <button onClick={() => setOpen(!open)} className="text-white lg:hidden" aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && <div className="border-t border-white/[0.05] bg-surface-1 px-7 py-5 lg:hidden">
        {links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-gray-400 hover:text-white">{l.label}</Link>)}
        <Link href="/contact" onClick={() => setOpen(false)} className="btn-v mt-3 w-full justify-center">Work with us <ArrowRight size={14} /></Link>
      </div>}
      <style>{`@keyframes glowPulse{0%,100%{box-shadow:0 4px 20px rgba(139,92,246,0.2)}50%{box-shadow:0 4px 32px rgba(139,92,246,0.35)}}`}</style>
    </header>
  );
}
