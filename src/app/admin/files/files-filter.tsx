"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FileText, FolderKanban, FileImage, FileArchive, Figma, Download, Trash2, Loader2, Search } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { deleteFile } from "@/lib/admin/actions";

interface FileRow {
  id: string;
  file_name: string;
  file_type: string | null;
  file_path: string;
  file_size: number | null;
  created_at: string;
  project_id: string;
  projectName: string | null;
  projectIdResolved: string | null;
}

function fileIcon(type: string | null) {
  switch (type?.toLowerCase()) {
    case "pdf": return <FileText size={14} />;
    case "zip": case "rar": return <FileArchive size={14} />;
    case "png": case "jpg": case "jpeg": case "gif": case "svg": case "webp": return <FileImage size={14} />;
    case "figma": return <Figma size={14} />;
    default: return <FileText size={14} />;
  }
}

function formatSize(bytes: number | null) {
  if (!bytes) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileRowItem({ file }: { file: FileRow }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      await deleteFile(file.id, file.project_id);
      setConfirming(false);
    });
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-3.5 group">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-dim">
        {fileIcon(file.file_type)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-white">{file.file_name}</p>
        <div className="mt-0.5 flex items-center gap-2">
          {file.file_type && (
            <span className="font-mono text-[10px] uppercase text-dim">{file.file_type}</span>
          )}
          {formatSize(file.file_size) && (
            <span className="font-mono text-[10px] text-dim">{formatSize(file.file_size)}</span>
          )}
          <span className="font-mono text-[10px] text-dim">
            {new Date(file.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file.projectIdResolved && (
          <Link
            href={`/admin/projects/${file.projectIdResolved}`}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-dim transition-colors hover:border-white/[0.12] hover:text-body"
          >
            <FolderKanban size={10} />
            {file.projectName}
          </Link>
        )}
        <a
          href={`/api/files/download?path=${encodeURIComponent(file.file_path)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-dim opacity-0 transition-all hover:bg-accent/10 hover:text-accent group-hover:opacity-100"
          title="Download"
        >
          <Download size={12} />
        </a>
        <button
          onClick={handleDelete}
          disabled={pending}
          className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all disabled:opacity-50 ${
            confirming
              ? "bg-red-400/10 text-red-400"
              : "text-dim opacity-0 hover:bg-red-400/10 hover:text-red-400 group-hover:opacity-100"
          }`}
          title={confirming ? "Click again to confirm" : "Delete"}
        >
          {pending ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        </button>
      </div>
    </div>
  );
}

export function FilesFilter({ files, projects }: { files: FileRow[]; projects: { id: string; name: string }[] }) {
  const [filterProject, setFilterProject] = useState("");
  const [search, setSearch] = useState("");

  let filtered = filterProject ? files.filter((f) => f.project_id === filterProject) : files;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((f) => f.file_name.toLowerCase().includes(q));
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="field !w-auto !py-2 !pl-8 !text-[12px] min-w-[200px]"
          />
        </div>
        {projects.length > 1 && (
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="field !w-auto !py-2 !text-[12px]"
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        )}
        <span className="font-mono text-[11px] text-dim">
          {filtered.length} file{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="card-premium">
          <EmptyState icon={<FileText size={18} />} title="No files found" description={search ? "Try a different search" : "Files will appear here when added to projects"} />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((file) => (
            <FileRowItem key={file.id} file={file} />
          ))}
        </div>
      )}
    </>
  );
}
