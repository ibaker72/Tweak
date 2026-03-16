"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const statusMessages = [
  "Scanning homepage structure...",
  "Checking SEO fundamentals...",
  "Analyzing conversion elements...",
  "Evaluating trust signals...",
  "Reviewing mobile experience...",
  "Crunching the numbers...",
];

export function AuditLoadingState({ url }: { url?: string }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % statusMessages.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const duration = 20000;
    const t = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(92, (elapsed / duration) * 92);
      setProgress(p);
    }, 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
      {/* Pulsing ring */}
      <div className="relative mb-10">
        <div className="h-20 w-20 rounded-full border-2 border-accent/20 animate-ping absolute inset-0" />
        <div className="relative h-20 w-20 rounded-full border-2 border-accent/40 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
        </div>
      </div>

      {/* Status messages */}
      <div className="h-8 mb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-[15px] font-medium text-white"
          >
            {statusMessages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* URL being scanned */}
      {url && (
        <p className="mb-8 font-mono text-[13px] text-accent/60">{url}</p>
      )}

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-accent/40"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <p className="mt-3 text-center text-[11px] text-dim">
          This usually takes about 15-20 seconds
        </p>
      </div>
    </div>
  );
}
