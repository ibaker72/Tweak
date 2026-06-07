"use client";

import { useState } from "react";
import {
  FileText,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  FileCode,
  File as FileIcon,
  Figma,
  Download,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectFile } from "@/lib/portal/types";
import { FILE_CATEGORY_LABELS } from "@/lib/portal/types";
import { FilePreview } from "./file-preview";

function getFileIcon(mime: string | null, fileType: string | null) {
  if (mime) {
    if (mime.startsWith("image/")) return FileImage;
    if (mime.startsWith("video/")) return FileVideo;
    if (mime.startsWith("audio/")) return FileAudio;
    if (mime === "application/pdf") return FileText;
    if (mime.includes("zip") || mime.includes("compressed")) return FileArchive;
    if (mime.includes("spreadsheet") || mime.includes("excel") || mime.includes("csv")) return FileSpreadsheet;
    if (mime.includes("json") || mime.includes("javascript") || mime.includes("xml") || mime.includes("html")) return FileCode;
    if (mime.startsWith("text/") || mime.includes("word") || mime.includes("document")) return FileText;
  }
  if (fileType) {
    const ext = fileType.toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) return FileImage;
    if (ext === "pdf") return FileText;
    if (["zip", "tar", "gz", "rar"].includes(ext)) return FileArchive;
    if (["xls", "xlsx", "csv"].includes(ext)) return FileSpreadsheet;
    if (ext === "fig") return Figma;
    if (["doc", "docx", "txt", "md"].includes(ext)) return FileText;
  }
  return FileIcon;
}

function isPreviewable(mime: string | null) {
  return !!mime && mime.startsWith("image/");
}

function formatSize(bytes: number | null) {
  if (!bytes) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface FileListProps {
  files: ProjectFile[];
  compact?: boolean;
}

export function FileList({ files, compact = false }: FileListProps) {
  const displayed = compact ? files.slice(0, 4) : files;
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);

  return (
    <>
      <div className="space-y-1.5">
        {displayed.map((f) => {
          const Icon = getFileIcon(f.mime_type, f.file_type);
          const previewable = isPreviewable(f.mime_type);
          const categoryLabel = f.category ? FILE_CATEGORY_LABELS[f.category] : null;
          return (
            <div
              key={f.id}
              className="group flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2.5 transition-colors hover:border-white/[0.08]"
            >
              <button
                type="button"
                onClick={() => previewable && setPreviewFile(f)}
                disabled={!previewable}
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.03]",
                  previewable && "transition-colors hover:bg-accent/15",
                )}
                aria-label={previewable ? `Preview ${f.file_name}` : f.file_name}
              >
                <Icon size={14} className={cn("text-dim", previewable && "group-hover:text-accent")} />
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-[12px] font-medium text-white/80">
                    {f.file_name}
                  </p>
                  {categoryLabel && (
                    <span className="rounded-full border border-accent/25 bg-accent-muted px-2 py-[1px] font-mono text-[9px] uppercase tracking-[0.08em] text-accent">
                      {categoryLabel}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 font-mono text-[10px] text-dim">
                  {(f.file_type?.toUpperCase() || f.mime_type || "FILE")}
                  {formatSize(f.file_size) && ` · ${formatSize(f.file_size)}`}
                  {" · "}
                  {new Date(f.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {previewable && (
                  <button
                    type="button"
                    onClick={() => setPreviewFile(f)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-dim opacity-0 transition-all hover:bg-white/[0.04] hover:text-body group-hover:opacity-100"
                    aria-label={`Preview ${f.file_name}`}
                    title="Preview"
                  >
                    <Eye size={12} />
                  </button>
                )}
                <a
                  href={`/api/files/download?id=${encodeURIComponent(f.id)}`}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-dim opacity-0 transition-all hover:bg-white/[0.04] hover:text-body group-hover:opacity-100"
                  aria-label={`Download ${f.file_name}`}
                  title="Download"
                >
                  <Download size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {previewFile && (
        <FilePreview
          fileId={previewFile.id}
          fileName={previewFile.file_name}
          open={!!previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </>
  );
}
