"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, X, Loader2, Check, Calendar } from "lucide-react";
import Link from "next/link";

interface AuditCTABlockProps {
  auditId?: string;
}

export function AuditCTABlock({ auditId }: AuditCTABlockProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,255,0,0.03),transparent)]" />

      <div className="relative text-center">
        <h2 className="font-display text-[clamp(24px,4vw,36px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
          Want TweakAndBuild to Fix These Issues?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[15px] leading-[1.7] text-body">
          Get a clear action plan — or let us implement the improvements for you.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="btn-v w-full justify-center sm:w-auto"
          >
            <Calendar size={14} />
            Book a Strategy Call
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => setShowForm(true)}
            className="btn-o w-full justify-center sm:w-auto"
          >
            <Mail size={14} />
            Request a Fix Plan
          </button>
        </div>

        <p className="mt-6 text-[13px] text-dim">
          Or reach out directly at{" "}
          <a href="mailto:hello@tweakandbuild.com" className="text-accent/70 hover:text-accent transition-colors">
            hello@tweakandbuild.com
          </a>
        </p>
      </div>

      <FixPlanDialog open={showForm} onClose={() => setShowForm(false)} auditId={auditId} />
    </section>
  );
}

function FixPlanDialog({ open, onClose, auditId }: { open: boolean; onClose: () => void; auditId?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          businessName: name || undefined,
          message: message || undefined,
          auditRequestId: auditId || undefined,
          source: "audit_fix_plan",
        }),
      });

      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-surface-1 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-dim hover:text-white transition-colors">
              <X size={16} />
            </button>

            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check size={20} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">Request Sent!</h3>
                <p className="mt-2 text-[14px] text-body">We&apos;ll review your audit and get back to you within 24 hours.</p>
                <button onClick={onClose} className="btn-o mt-6">Close</button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-white">Request a Fix Plan</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-body">
                  Tell us a bit about your project and we&apos;ll put together a prioritized plan based on your audit results.
                </p>
                <form onSubmit={submit} className="mt-6 space-y-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name or business" className="field" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="field" required />
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything specific you'd like us to focus on?" className="field" rows={3} />
                  <button type="submit" disabled={status === "loading"} className="btn-v w-full justify-center !py-3 disabled:opacity-60">
                    {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : null}
                    Send Request <ArrowRight size={14} />
                  </button>
                  {status === "error" && <p className="text-[12px] text-red-400 text-center">Something went wrong. Please try again.</p>}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
