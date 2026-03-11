"use client";
import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";

export function NewsletterInline({ source = "inline" }: { source?: string }) {
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
        body: JSON.stringify({ email, source }),
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

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/[0.12] bg-accent/[0.03] p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/[0.2] bg-accent/[0.06]">
          <Check size={18} className="text-accent" />
        </div>
        <p className="font-display text-[15px] font-bold text-white">You&apos;re in!</p>
        <p className="mt-1 text-[13px] text-body">We&apos;ll send you the good stuff. No spam, ever.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-8">
      <h3 className="font-display text-[17px] font-bold text-white">
        Get insights like this delivered weekly.
      </h3>
      <p className="mt-1.5 text-[13px] text-body">
        No spam, unsubscribe anytime.
      </p>
      <form onSubmit={subscribe} className="mt-4 flex gap-2.5">
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
          className="btn-v flex-shrink-0 !px-5 !py-[13px] disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          <span className="hidden sm:inline">Subscribe</span>
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-[12px] text-red-400">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
