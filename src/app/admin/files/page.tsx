import Link from "next/link";
import { FileText, FolderKanban } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { getAllFiles, getAllProjects } from "@/lib/admin/queries";
import { FilesFilter } from "./files-filter";

export default async function AdminFilesPage() {
  const [files, projects] = await Promise.all([
    getAllFiles(),
    getAllProjects(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white">
          Files
        </h1>
        <p className="mt-1 text-[13px] text-body">
          {files.length} file{files.length !== 1 ? "s" : ""} across all projects
        </p>
      </div>

      <FilesFilter
        files={files.map((f) => ({
          id: f.id,
          file_name: f.file_name,
          file_type: f.file_type,
          file_path: f.file_path,
          created_at: f.created_at,
          project_id: f.project_id,
          projectName: (f.project as { id: string; name: string } | null)?.name ?? null,
          projectIdResolved: (f.project as { id: string; name: string } | null)?.id ?? null,
        }))}
        projects={projects.map((p) => ({ id: p.id, name: p.name }))}
      />
    </div>
  );
}
