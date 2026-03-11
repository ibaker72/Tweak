"use client";
import { useState } from "react";
import { Send, Check, Loader2, Mail } from "lucide-react";
import { Reveal } from "@/components/shared";

export function HomepageNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 border-y border-white/[0.04] bg-surface-1/50" />
      <div className="wrap relative">
        <Reveal>
          <div className="mx-auto max-w-[520px] text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/[0.15] bg-accent/[0.06]">
              <Mail size={20} className="text-accent" />
            </div>
            <h2 className="font-display text-[clamp(22px,3vw,32px)] font-extrabold tracking-[-0.02em] text-white">
              Join 100+ founders getting weekly product insights.
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-body">
              Studio updates, case studies, and engineering insights. No spam, unsubscribe anytime.
            </p>

            {status === "success" ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/[0.2] bg-accent/[0.06] px-5 py-2.5">
                <Check size={14} className="text-accent" />
                <span className="text-[13px] font-medium text-accent">You&apos;re subscribed!</span>
              </div>
            ) : (
              <form onSubmit={subscribe} className="mx-auto mt-6 flex max-w-[400px] gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="field flex-1"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-v flex-shrink-0 !px-6 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  Subscribe
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 text-[12px] text-red-400">Something went wrong. Please try again.</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
