"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Audit", href: "/audit" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fn = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={cn(
        "mx-auto transition-all duration-500",
        scrolled
          ? "glass-nav border-b border-white/[0.06]"
          : "border-b border-transparent"
      )}>
        <div className="wrap flex h-14 items-center justify-between sm:h-[60px]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-accent shadow-[0_1px_4px_rgba(200,255,0,0.12),0_0_0_1px_rgba(200,255,0,0.08)] sm:h-8 sm:w-8 sm:rounded-[var(--brand-radius-sm)]">
              <Terminal size={13} className="text-surface-0 sm:hidden" />
              <Terminal size={14} className="hidden text-surface-0 sm:block" />
            </div>
            <span className="font-display text-[16px] font-extrabold tracking-[-0.03em] text-white sm:text-[17px]">
              Tweak<span className="text-accent">&amp;</span>Build
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/45 transition-all duration-200 hover:bg-white/[0.04] hover:text-white/90">
                {l.label}
              </Link>
            ))}
            <div className="ml-4 h-5 w-px bg-white/[0.06]" />
            <Link href="/contact" className="btn-v ml-4 !gap-2 !px-5 !py-2 !text-[13px]">
              Start a project <ArrowRight size={12} />
            </Link>
          </nav>

          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.03] text-white transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className={cn(
            "border-t border-white/[0.05] bg-surface-0/98 px-5 pb-6 pt-3 backdrop-blur-md transition-opacity duration-200 sm:px-6",
            open ? "opacity-100" : "opacity-0"
          )}>
            <div className="space-y-0.5">
              {links.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3.5 text-[15px] font-medium text-white/60 transition-colors hover:bg-white/[0.03] hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-white/[0.05] pt-5">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-v w-full justify-center !py-3 !text-[14px]">
                Start a project <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
