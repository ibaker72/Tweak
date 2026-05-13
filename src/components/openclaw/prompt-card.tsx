"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { CATEGORY_LABELS, type PromptEntry } from "@/lib/openclaw/prompt-library";

export function PromptCard({ prompt }: { prompt: PromptEntry }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <article className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-accent/20 bg-accent/[0.06] px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
              {CATEGORY_LABELS[prompt.category]}
            </span>
            <h3 className="font-display text-[14px] font-bold text-white">{prompt.title}</h3>
          </div>
          <p className="mt-1 text-[12px] text-body">{prompt.description}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex h-7 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 font-mono text-[10px] text-dim transition-colors hover:text-white"
        >
          {copied ? <Check size={11} className="text-accent" /> : <Copy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </header>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/[0.04] bg-black/30 p-3 font-mono text-[11px] leading-[1.55] text-body">
{prompt.body}
      </pre>
    </article>
  );
}
