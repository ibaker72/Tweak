import {
  FileText,
  FileArchive,
  FileImage,
  File,
  Figma,
  Download,
} from "lucide-react";
import type { ProjectFile } from "@/lib/portal/types";

const fileIcons: Record<string, typeof File> = {
  pdf: FileText,
  zip: FileArchive,
  png: FileImage,
  jpg: FileImage,
  jpeg: FileImage,
  svg: FileImage,
  fig: Figma,
};

function getFileIcon(fileType: string | null) {
  const Icon = fileType ? fileIcons[fileType.toLowerCase()] : undefined;
  return Icon ?? File;
}

interface FileListProps {
  files: ProjectFile[];
  compact?: boolean;
}

export function FileList({ files, compact = false }: FileListProps) {
  const displayed = compact ? files.slice(0, 4) : files;

  return (
    <div className="space-y-1.5">
      {displayed.map((f) => {
        const Icon = getFileIcon(f.file_type);
        return (
          <a
            key={f.id}
            href={`/api/files/download?path=${encodeURIComponent(f.file_path)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2.5 transition-colors hover:border-white/[0.08] group"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.03]">
              <Icon size={14} className="text-dim" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-white/80">
                {f.file_name}
              </p>
              <p className="font-mono text-[10px] text-dim">
                {f.file_type?.toUpperCase()}
                {" \u00b7 "}
                {new Date(f.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <Download size={12} className="flex-shrink-0 text-dim opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        );
      })}
    </div>
  );
}
