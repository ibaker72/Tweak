import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FolderOpen, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProjects, getProjectFiles } from "@/lib/portal/queries";
import { FileList } from "@/components/portal/file-list";
import { EmptyState } from "@/components/portal/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Files | Client Portal" };

interface PageProps {
  searchParams: Promise<{ project?: string }>;
}

export default async function FilesPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const projects = await getUserProjects();
  if (projects.length === 0) redirect("/client-portal");

  const params = await searchParams;
  const activeProjectId = params.project || projects[0].id;
  const activeProject = projects.find((p) => p.id === activeProjectId) ?? projects[0];
  const files = await getProjectFiles(activeProject.id);

  // Group files by type
  const grouped = files.reduce<Record<string, typeof files>>((acc, f) => {
    const group = f.file_type?.toUpperCase() || "OTHER";
    (acc[group] ??= []).push(f);
    return acc;
  }, {});

  const groups = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/client-portal"
          className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-dim transition-colors hover:text-body"
        >
          <ArrowLeft size={12} />
          Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03]">
            <FolderOpen size={16} className="text-dim" />
          </div>
          <div>
            <h1 className="font-display text-[22px] font-bold tracking-[-0.02em] text-white">
              Project Files
            </h1>
            <p className="font-mono text-[11px] text-dim">{activeProject.name}</p>
          </div>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 ? (
        groups.length > 1 ? (
          <div className="space-y-8">
            {groups.map(([type, typeFiles]) => (
              <div key={type}>
                <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                  {type} files
                </h2>
                <FileList files={typeFiles} />
              </div>
            ))}
          </div>
        ) : (
          <FileList files={files} />
        )
      ) : (
        <div className="card-premium">
          <EmptyState
            icon={<FileText size={18} />}
            title="No files yet"
            description="Project files will appear here when your team uploads them."
          />
        </div>
      )}
    </div>
  );
}
