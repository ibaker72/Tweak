"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function ClientUpload({ projectId }: { projectId: string }) {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleUpload(file: File) {
    setUploading(true);
    setResult(null);

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
        setTimeout(() => setResult(null), 3000);
      }
    } catch {
      setResult({ type: "error", message: "Network error. Please try again." });
    } finally {
      setUploading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = "";
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/[0.06] px-3 py-1.5 text-[11px] font-medium text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
      >
        {uploading ? <Loader2 size={11} className="animate-spin" /> : <Upload size={11} />}
        Upload File
      </button>
      <input ref={fileRef} type="file" className="hidden" onChange={handleChange} />
      {result && (
        <span className={`inline-flex items-center gap-1 text-[11px] ${result.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
          {result.type === "success" ? <CheckCircle size={11} /> : <AlertCircle size={11} />}
          {result.message}
        </span>
      )}
    </div>
  );
}
