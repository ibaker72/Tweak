"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, X, ArrowRight, Mail, Calendar, HelpCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: ArrowRight,
    label: "Start a project",
    desc: "Get a free proposal",
    href: "/contact",
  },
  {
    icon: HelpCircle,
    label: "Get pricing help",
    desc: "Quick Build or Custom?",
    href: "/#pricing",
  },
  {
    icon: Calendar,
    label: "Book a call",
    desc: "30 min, no commitment",
    href: "/contact",
  },
  {
    icon: Mail,
    label: "Email us",
    desc: "iyadbaker.dev@gmail.com",
    href: "mailto:iyadbaker.dev@gmail.com",
    external: true,
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-[59] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div className={cn(
        "fixed z-[60] transition-all duration-300",
        "inset-x-3 bottom-[60px] sm:inset-x-auto",
        "sm:bottom-[76px] sm:right-6 sm:left-auto sm:w-[320px]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}>
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-1 shadow-2xl shadow-black/40">
          {/* Header */}
          <div className="border-b border-white/[0.06] px-5 pb-4 pt-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-[15px] font-bold text-white">Talk to the studio</h3>
                <p className="mt-1 text-[12px] leading-[1.5] text-dim">Questions about scope, pricing, or timeline?</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-[8px] text-dim transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] text-accent/70">Usually respond within a few hours</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-1 p-2.5">
            {actions.map(a => {
              const inner = (
                <div className="group flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-3.5 py-3 transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.035]">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] border border-accent/[0.12] bg-accent/[0.06]">
                    <a.icon size={14} className="text-accent/70" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-white">{a.label}</div>
                    <div className="text-[11px] text-dim">{a.desc}</div>
                  </div>
                  <ArrowRight size={12} className="flex-shrink-0 text-dim opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/50 group-hover:opacity-100" />
                </div>
              );

              return a.external ? (
                <a key={a.label} href={a.href} className="block">{inner}</a>
              ) : (
                <Link key={a.label} href={a.href} onClick={() => setOpen(false)} className="block">{inner}</Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.05] px-5 py-2.5">
            <p className="text-center font-mono text-[9px] uppercase tracking-[0.08em] text-white/20">
              Tweak & Build Studio
            </p>
          </div>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed z-[60] flex items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5",
          "bottom-4 right-3 gap-1.5 px-3 py-2 sm:bottom-6 sm:right-6 sm:gap-2 sm:px-4 sm:py-2.5",
          open
            ? "border-white/[0.12] bg-surface-1 text-white shadow-xl shadow-black/30"
            : "border-accent/[0.25] bg-accent text-surface-0 shadow-[0_8px_32px_rgba(200,255,0,0.12)] sm:shadow-[0_8px_32px_rgba(200,255,0,0.15)]"
        )}
        aria-label={open ? "Close contact panel" : "Open contact panel"}
      >
        {open ? (
          <X size={15} className="sm:h-4 sm:w-4" />
        ) : (
          <>
            <MessageCircle size={15} className="sm:h-4 sm:w-4" />
            <span className="hidden text-[13px] font-bold sm:inline">Talk to us</span>
          </>
        )}
      </button>
    </>
  );
}
