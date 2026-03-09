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
    color: "#8B5CF6",
  },
  {
    icon: HelpCircle,
    label: "Get pricing help",
    desc: "Quick Build or Custom?",
    href: "/#pricing",
    color: "#06B6D4",
  },
  {
    icon: Calendar,
    label: "Book a call",
    desc: "30 min, no commitment",
    href: "/contact",
    color: "#A78BFA",
  },
  {
    icon: Mail,
    label: "Email us",
    desc: "iyadbaker.dev@gmail.com",
    href: "mailto:iyadbaker.dev@gmail.com",
    color: "#22C55E",
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
          className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div className={cn(
        "fixed z-[60] transition-all duration-300",
        // Mobile: centered bottom sheet
        "inset-x-4 bottom-20 sm:inset-x-auto",
        // Desktop: bottom right
        "sm:bottom-20 sm:right-6 sm:left-auto sm:w-[340px]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}>
        <div className="overflow-hidden rounded-[20px] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(139,92,246,0.06)]" style={{ background: "linear-gradient(170deg, rgba(14,14,24,0.97), rgba(10,10,18,0.99))" }}>
          {/* Header */}
          <div className="border-b border-white/[0.06] px-6 pb-4 pt-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-[16px] font-bold text-white">Talk to the studio</h3>
                <p className="mt-1 text-[12px] leading-[1.5] text-body">Questions about scope, pricing, or timeline?</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-dim transition-colors hover:bg-white/[0.05] hover:text-white"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Clock size={11} className="text-cyan" />
              <span className="font-mono text-[10px] text-cyan">Usually respond within a few hours</span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-3">
            {actions.map(a => {
              const inner = (
                <div className="group flex items-center gap-3.5 rounded-[14px] border border-white/[0.04] bg-white/[0.015] px-4 py-3.5 transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.03]">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] transition-colors" style={{ background: `${a.color}12`, border: `1px solid ${a.color}20` }}>
                    <a.icon size={16} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-white">{a.label}</div>
                    <div className="text-[11px] text-dim">{a.desc}</div>
                  </div>
                  <ArrowRight size={13} className="flex-shrink-0 text-dim opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/60 group-hover:opacity-100" />
                </div>
              );

              return a.external ? (
                <a key={a.label} href={a.href} className="mb-1.5 block last:mb-0">{inner}</a>
              ) : (
                <Link key={a.label} href={a.href} onClick={() => setOpen(false)} className="mb-1.5 block last:mb-0">{inner}</Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.05] px-6 py-3">
            <p className="text-center text-[10px] text-dim">
              Best for quick questions about your project
            </p>
          </div>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 rounded-full border px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_24px_rgba(139,92,246,0.08)] transition-all duration-300 hover:-translate-y-0.5",
          open
            ? "border-white/[0.1] bg-surface-2 text-white"
            : "border-v/[0.25] text-white"
        )}
        style={{
          background: open
            ? "linear-gradient(135deg, rgba(14,14,24,0.95), rgba(10,10,18,0.98))"
            : "linear-gradient(135deg, #8B5CF6, #7C3AED)",
        }}
        aria-label={open ? "Close contact panel" : "Open contact panel"}
      >
        {open ? (
          <X size={18} />
        ) : (
          <>
            <MessageCircle size={18} />
            <span className="hidden text-[13px] font-semibold sm:inline">Talk to us</span>
          </>
        )}
      </button>
    </>
  );
}
