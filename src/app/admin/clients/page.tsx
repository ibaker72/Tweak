import Link from "next/link";
import { Users, FolderKanban } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { getAllClients, getClientProjectMemberships } from "@/lib/admin/queries";

const roleColors: Record<string, string> = {
  admin: "border-accent/25 bg-accent-muted text-accent",
  team: "border-cyan-border bg-cyan-dim text-cyan-light",
  client: "border-v-border bg-v-dim text-v-light",
};

export default async function AdminClientsPage() {
  const [clients, memberships] = await Promise.all([
    getAllClients(),
    getClientProjectMemberships(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white">
          Clients & Team
        </h1>
        <p className="mt-1 text-[13px] text-body">
          {clients.length} user{clients.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {clients.length === 0 ? (
        <div className="card-premium">
          <EmptyState icon={<Users size={18} />} title="No users" description="Users will appear here after they sign in" />
        </div>
      ) : (
        <div className="space-y-2">
          {clients.map((client) => {
            const projects = memberships[client.id] ?? [];
            return (
              <div
                key={client.id}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4 transition-all hover:border-white/[0.1]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <p className="truncate font-display text-[14px] font-bold tracking-[-0.01em] text-white">
                        {client.full_name || "Unnamed User"}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] ${roleColors[client.role] ?? "text-dim"}`}
                      >
                        {client.role}
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] text-dim">{client.email}</p>
                    <p className="font-mono text-[10px] text-dim">
                      Joined {new Date(client.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  {projects.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {projects.map((p) => (
                        <Link
                          key={p.project_id}
                          href={`/admin/projects/${p.project_id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-dim transition-colors hover:border-white/[0.12] hover:text-body"
                        >
                          <FolderKanban size={10} />
                          {p.project_name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
