"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";

export function AuditURLInput() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validate = (input: string): string | null => {
    let u = input.trim();
    if (!u) return "Please enter a URL";

    // Add https:// if missing
    if (!/^https?:\/\//i.test(u)) {
      u = "https://" + u;
    }

    try {
      const parsed = new URL(u);
      if (!parsed.hostname.includes(".")) return "Please enter a valid website URL";
      return null;
    } catch {
      return "Please enter a valid website URL";
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(url);
    if (err) {
      setError(err);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (data.id) {
        router.push(`/audit/${data.id}`);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter your website URL..."
            className="field !rounded-xl !py-4 !px-5 !text-[15px] w-full"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-v flex-shrink-0 justify-center !rounded-xl !py-4 !px-7 !text-[15px] disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Run My Audit <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-400">
          <AlertCircle size={14} />
          <span className="text-[13px]">{error}</span>
        </div>
      )}

      <p className="mt-4 text-center text-[12px] text-dim">
        Free instant audit. No signup required.
      </p>
    </form>
  );
}
