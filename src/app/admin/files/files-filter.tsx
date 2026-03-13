"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, FolderKanban, FileImage, FileArchive, Figma } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";

interface FileRow {
  id: string;
  file_name: string;
  file_type: string | null;
  file_path: string;
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
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files..."
          className="field !w-auto !py-2 !text-[12px] min-w-[180px]"
        />
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
      </div>

      {filtered.length === 0 ? (
        <div className="card-premium">
          <EmptyState icon={<FileText size={18} />} title="No files found" description="Files will appear here when added to projects" />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((file) => (
            <div key={file.id} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-3.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-dim">
                {fileIcon(file.file_type)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-white">{file.file_name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  {file.file_type && (
                    <span className="font-mono text-[10px] uppercase text-dim">{file.file_type}</span>
                  )}
                  <span className="font-mono text-[10px] text-dim">
                    {new Date(file.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>
              {file.projectIdResolved && (
                <Link
                  href={`/admin/projects/${file.projectIdResolved}`}
                  className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-dim transition-colors hover:border-white/[0.12] hover:text-body"
                >
                  <FolderKanban size={10} />
                  {file.projectName}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
