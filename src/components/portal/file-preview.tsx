"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, X, Download, AlertTriangle } from "lucide-react";

interface FilePreviewProps {
  fileId: string;
  fileName: string;
  open: boolean;
  onClose: () => void;
}

export function FilePreview({ fileId, fileName, open, onClose }: FilePreviewProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setUrl(null);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/files/download?id=${encodeURIComponent(fileId)}&inline=1`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `Request failed (${res.status})`);
        }
        return res.json() as Promise<{ url: string }>;
      })
      .then((data) => {
        if (cancelled) return;
        setUrl(data.url);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setError(e.message);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, fileId]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${fileName}`}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
        aria-label="Close preview"
      >
        <X size={16} />
      </button>

      <a
        href={`/api/files/download?id=${encodeURIComponent(fileId)}`}
        onClick={(e) => e.stopPropagation()}
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        <Download size={12} /> Download
      </a>

      <div
        className="flex max-h-[85vh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {loading && (
          <div className="flex items-center gap-2 text-white/70">
            <Loader2 size={16} className="animate-spin" />
            <span className="font-mono text-[12px]">Loading preview…</span>
          </div>
        )}
        {error && (
          <div className="flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center">
            <AlertTriangle size={20} className="text-gold" />
            <p className="font-display text-[15px] font-semibold text-white">
              Couldn&apos;t load preview
            </p>
            <p className="text-[12px] text-body">{error}</p>
          </div>
        )}
        {!loading && !error && url && (
          // Using an <img> tag is intentional: signed URLs are short-lived and
          // not appropriate for next/image optimization.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={fileName}
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
          />
        )}
      </div>
    </div>
  );
}
