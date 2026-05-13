"use client";

import { useState } from "react";
import { Play, Loader2 } from "lucide-react";

const JOBS = [
  { id: "discover", label: "Discover prospects", desc: "Search Google Places + auto-audit" },
  { id: "outreach", label: "Send initial outreach", desc: "Draft + send cold emails (max 10)" },
  { id: "followup", label: "Send follow-ups", desc: "Followup #1 after 3d, #2 after 7d" },
  { id: "geo-generate", label: "Generate GEO content", desc: "AI content for /seo/[city]/[industry]" },
];

export function AutomationActions() {
  const [pending, setPending] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});

  async function trigger(job: string) {
    setPending(job);
    setResults((r) => ({ ...r, [job]: "running..." }));
    try {
      const res = await fetch(`/api/openclaw/admin/run/${job}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setResults((r) => ({ ...r, [job]: `error: ${data.error || res.status}` }));
      } else {
        const stats = data.stats ? formatStats(data.stats) : "ok";
        setResults((r) => ({ ...r, [job]: stats }));
      }
    } catch (err) {
      setResults((r) => ({
        ...r,
        [job]: `error: ${err instanceof Error ? err.message : "network"}`,
      }));
    } finally {
      setPending(null);
    }
  }

  return (
    <section>
      <h2 className="mb-3 font-display text-[15px] font-bold text-white">Manual triggers</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {JOBS.map((j) => (
          <div
            key={j.id}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-[13px] font-bold text-white">{j.label}</div>
                <div className="mt-0.5 font-mono text-[10px] text-dim">{j.desc}</div>
              </div>
              <button
                onClick={() => trigger(j.id)}
                disabled={pending !== null}
                className="flex h-7 items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/[0.06] px-2.5 font-mono text-[10px] text-accent transition-colors hover:bg-accent/[0.1] disabled:opacity-40"
              >
                {pending === j.id ? <Loader2 size={11} className="animate-spin" /> : <Play size={11} />}
                Run
              </button>
            </div>
            {results[j.id] && (
              <div className="mt-2 truncate font-mono text-[10px] text-dim" title={results[j.id]}>
                → {results[j.id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function formatStats(stats: Record<string, unknown>): string {
  const parts = Object.entries(stats)
    .filter(([k, v]) => k !== "errors" && typeof v === "number")
    .map(([k, v]) => `${k}:${v}`);
  return parts.join(" · ") || "ok";
}
