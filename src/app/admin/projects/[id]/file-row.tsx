"use client";

import { useState, useTransition } from "react";
import { FileText, FileImage, FileArchive, Figma, File, Trash2, Loader2, Download } from "lucide-react";
import type { ProjectFile } from "@/lib/portal/types";
import { deleteFile } from "@/lib/admin/actions";

const fileIcons: Record<string, typeof File> = {
  pdf: FileText, zip: FileArchive, png: FileImage, jpg: FileImage,
  jpeg: FileImage, svg: FileImage, fig: Figma,
};

function formatSize(bytes: number | null) {
  if (!bytes) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileRow({ file, projectId }: { file: ProjectFile; projectId: string }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const Icon = file.file_type ? fileIcons[file.file_type.toLowerCase()] ?? File : File;

  function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      await deleteFile(file.id, projectId);
      setConfirming(false);
    });
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2.5 group">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-dim">
        <Icon size={13} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium text-white">{file.file_name}</p>
        <p className="font-mono text-[10px] text-dim">
          {file.file_type ?? "file"}
          {formatSize(file.file_size) && ` · ${formatSize(file.file_size)}`}
          {" · "}
          {new Date(file.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-1 pl-2">
        <a
          href={`/api/files/download?path=${encodeURIComponent(file.file_path)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-6 w-6 items-center justify-center rounded-md text-dim opacity-0 transition-all hover:bg-accent/10 hover:text-accent group-hover:opacity-100"
          title="Download"
        >
          <Download size={10} />
        </a>
        <button
          onClick={handleDelete}
          disabled={pending}
          className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors disabled:opacity-50 ${
            confirming
              ? "bg-red-400/10 text-red-400"
              : "text-dim opacity-0 hover:bg-red-400/10 hover:text-red-400 group-hover:opacity-100"
          }`}
          title={confirming ? "Click again to confirm" : "Delete file"}
        >
          {pending ? <Loader2 size={10} className="animate-spin" /> : <Trash2 size={10} />}
        </button>
      </div>
    </div>
  );
}
