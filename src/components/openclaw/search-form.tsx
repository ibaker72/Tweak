"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { INDUSTRY_LABELS } from "@/lib/openclaw/types";
import type { ProspectIndustry, Prospect } from "@/lib/openclaw/types";

interface SearchFormProps {
  onResults: (prospects: Prospect[], summary: { inserted: number; skipped: number }) => void;
}

export function SearchForm({ onResults }: SearchFormProps) {
  const [industry, setIndustry] = useState<ProspectIndustry>("dealerships");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/openclaw/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, location: location.trim(), industry }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Search failed");
        return;
      }

      onResults(data.prospects ?? [], { inserted: data.inserted, skipped: data.skipped });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSearch} className="card-premium p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Search size={13} />
        </div>
        <h2 className="font-display text-[15px] font-bold text-white">Search for prospects</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {/* Industry */}
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
            Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value as ProspectIndustry)}
            className="field w-full"
          >
            {Object.entries(INDUSTRY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
            Location
          </label>
          <input
            type="text"
            className="field w-full"
            placeholder="Miami, FL or Austin TX"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Optional refinement */}
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
            Refine <span className="text-white/20">(optional)</span>
          </label>
          <input
            type="text"
            className="field w-full"
            placeholder="e.g. Toyota, HVAC, Allstate"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-red-400/15 bg-red-400/[0.06] px-3 py-2 font-mono text-[11px] text-red-400">
          {error}
        </p>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading || !location.trim()}
          className="btn-v flex items-center gap-2 !py-2 !px-5 !text-[13px] disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search size={13} />
              Search Google Places
            </>
          )}
        </button>
      </div>
    </form>
  );
}
