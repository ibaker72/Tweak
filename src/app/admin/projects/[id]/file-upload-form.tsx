"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, X, CheckCircle, AlertCircle } from "lucide-react";

export function FileUploadForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleUpload(file: File) {
    setUploading(true);
    setResult(null);
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("project_id", projectId);

    try {
      const res = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        setResult({ type: "error", message: json.error || "Upload failed" });
      } else {
        setResult({ type: "success", message: `${file.name} uploaded` });
        router.refresh();
        setTimeout(() => {
          setOpen(false);
          setResult(null);
          setFileName(null);
        }, 1500);
      }
    } catch {
      setResult({ type: "error", message: "Network error. Please try again." });
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent"
      >
        <Upload size={11} />
        Upload
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-0/80 backdrop-blur-sm" onClick={() => !uploading && setOpen(false)} />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-surface-1 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-[16px] font-bold tracking-[-0.01em] text-white">
            Upload File
          </h3>
          {!uploading && (
            <button onClick={() => setOpen(false)} className="text-dim hover:text-body">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center rounded-xl border-2 border-dashed border-white/[0.08] bg-white/[0.01] px-6 py-8 text-center transition-colors hover:border-white/[0.15]"
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="mb-3 animate-spin text-accent" />
              <p className="text-[13px] font-medium text-white">Uploading...</p>
              <p className="mt-1 truncate font-mono text-[11px] text-dim">{fileName}</p>
            </>
          ) : result ? (
            <>
              {result.type === "success" ? (
                <CheckCircle size={24} className="mb-3 text-emerald-400" />
              ) : (
                <AlertCircle size={24} className="mb-3 text-red-400" />
              )}
              <p className={`text-[13px] font-medium ${result.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                {result.message}
              </p>
            </>
          ) : (
            <>
              <Upload size={24} className="mb-3 text-dim" />
              <p className="text-[13px] font-medium text-white">
                Drop a file here
              </p>
              <p className="mt-1 text-[11px] text-dim">or click to browse</p>
              <button
                onClick={() => fileRef.current?.click()}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[11px] font-medium text-surface-0"
              >
                Choose File
              </button>
            </>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-dim">
          Max 50 MB per file
        </p>
      </div>
    </div>
  );
}
