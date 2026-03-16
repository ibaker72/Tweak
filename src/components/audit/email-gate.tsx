"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Loader2, Check } from "lucide-react";

interface AuditEmailGateProps {
  open: boolean;
  onClose: () => void;
  auditId: string;
  onSuccess: () => void;
}

export function AuditEmailGate({ open, onClose, auditId, onSuccess }: AuditEmailGateProps) {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          auditRequestId: auditId,
          businessName: businessName || undefined,
          source: "audit_gate",
        }),
      });

      if (res.ok) {
        setStatus("success");
        localStorage.setItem(`audit_unlocked_${auditId}`, "true");
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1000);
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
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
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-surface-1 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-dim hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 mb-5">
              <Lock size={20} className="text-accent" />
            </div>

            <h3 className="font-display text-xl font-bold text-white">
              Unlock Full Report
            </h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-body">
              See all findings, quick wins, and your full priority roadmap.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="field"
                required
              />
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business name (optional)"
                className="field"
              />
              {errorMsg && (
                <p className="text-[12px] text-red-400">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="btn-v w-full justify-center !py-3 disabled:opacity-60"
              >
                {status === "loading" && <Loader2 size={14} className="animate-spin" />}
                {status === "success" && <Check size={14} />}
                {status === "success" ? "Unlocked!" : "Unlock Full Report →"}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] text-dim">
              No spam. Just your report and one follow-up.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
