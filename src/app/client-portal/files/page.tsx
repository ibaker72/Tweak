import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FolderOpen, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProjects, getProjectFiles } from "@/lib/portal/queries";
import { FileList } from "@/components/portal/file-list";
import { EmptyState } from "@/components/portal/empty-state";
import { ProjectSwitcher } from "@/components/portal/project-switcher";
import { FILE_CATEGORY_LABELS, type FileCategory, type ProjectFile } from "@/lib/portal/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Files | Client Portal" };

interface PageProps {
  searchParams: Promise<{ project?: string }>;
}

// Render order for category sections. Anything unrecognised falls through to
// the "Uncategorised" bucket at the bottom.
const CATEGORY_ORDER: FileCategory[] = ["design", "document", "asset", "invoice", "other"];

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

  // Group by category, preserving CATEGORY_ORDER, with an "Uncategorised"
  // bucket for null. Inside each bucket files keep their query order (newest
  // first by created_at).
  const grouped = files.reduce<Record<string, ProjectFile[]>>((acc, f) => {
    const key = f.category ?? "_uncategorised";
    (acc[key] ??= []).push(f);
    return acc;
  }, {});

  const sections: Array<{ key: string; label: string; files: ProjectFile[] }> = [];
  for (const c of CATEGORY_ORDER) {
    if (grouped[c]?.length) {
      sections.push({ key: c, label: FILE_CATEGORY_LABELS[c], files: grouped[c] });
    }
  }
  if (grouped._uncategorised?.length) {
    sections.push({ key: "_uncategorised", label: "Uncategorised", files: grouped._uncategorised });
  }

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03]">
              <FolderOpen size={16} className="text-dim" />
            </div>
            <div>
              <h1 className="font-display text-[22px] font-bold tracking-[-0.02em] text-white">
                Project Files
              </h1>
              <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-dim">
                {activeProject.name}
              </p>
            </div>
          </div>
          {projects.length > 1 && (
            <ProjectSwitcher projects={projects} activeProjectId={activeProjectId} />
          )}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 ? (
        sections.length > 1 ? (
          <div className="space-y-8">
            {sections.map(({ key, label, files: sectionFiles }) => (
              <section key={key}>
                <h2 className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                  <span>{label}</span>
                  <span className="text-white/15">·</span>
                  <span>{sectionFiles.length} {sectionFiles.length === 1 ? "file" : "files"}</span>
                </h2>
                <FileList files={sectionFiles} />
              </section>
            ))}
          </div>
        ) : (
          <FileList files={files} />
        )
      ) : (
        <div className="card-premium">
          <EmptyState
            icon={<FileText size={18} />}
            title="No files shared yet"
            description="Your team will share project files here — designs, documents, assets and invoices. You'll be able to preview images inline and download anything else."
          />
        </div>
      )}
    </div>
  );
}
