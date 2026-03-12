import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckSquare, ClipboardCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProjects, getProjectApprovals } from "@/lib/portal/queries";
import { ApprovalList } from "@/components/portal/approval-list";
import { EmptyState } from "@/components/portal/empty-state";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Approvals | Client Portal" };

interface PageProps {
  searchParams: Promise<{ project?: string }>;
}

export default async function ApprovalsPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const projects = await getUserProjects();
  if (projects.length === 0) redirect("/client-portal");

  const params = await searchParams;
  const activeProjectId = params.project || projects[0].id;
  const activeProject = projects.find((p) => p.id === activeProjectId) ?? projects[0];
  const approvals = await getProjectApprovals(activeProject.id);

  const pending = approvals.filter((a) => a.status === "pending");
  const resolved = approvals.filter((a) => a.status !== "pending");

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
            <CheckSquare size={16} className="text-dim" />
          </div>
          <div>
            <h1 className="font-display text-[22px] font-bold tracking-[-0.02em] text-white">
              Approvals
            </h1>
            <p className="font-mono text-[11px] text-dim">{activeProject.name}</p>
          </div>
        </div>
      </div>

      {approvals.length > 0 ? (
        <div className="space-y-8">
          {/* Pending */}
          {pending.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-gold/10">
                  <ClipboardCheck size={10} className="text-gold" />
                </span>
                Awaiting Review ({pending.length})
              </h2>
              <ApprovalList approvals={pending} />
            </div>
          )}

          {/* Resolved */}
          {resolved.length > 0 && (
            <div>
              <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                Resolved ({resolved.length})
              </h2>
              <ApprovalList approvals={resolved} />
            </div>
          )}
        </div>
      ) : (
        <div className="card-premium">
          <EmptyState
            icon={<CheckSquare size={18} />}
            title="No approvals yet"
            description="Approval requests will appear here when your team needs your sign-off."
          />
        </div>
      )}
    </div>
  );
}
