"use client";

import { useState, useTransition, useMemo } from "react";
import { UserPlus, Search, Loader2, Users } from "lucide-react";
import type { Profile, MemberRole } from "@/lib/portal/types";
import { addProjectMember } from "@/lib/admin/actions";

const roleColors: Record<string, string> = {
  admin: "text-accent",
  team: "text-cyan-light",
  client: "text-v-light",
};

interface AddMemberFormProps {
  projectId: string;
  eligibleUsers: Profile[];
}

export function AddMemberForm({ projectId, eligibleUsers }: AddMemberFormProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<MemberRole>("client");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (!search.trim()) return eligibleUsers;
    const q = search.toLowerCase();
    return eligibleUsers.filter(
      (u) =>
        (u.full_name?.toLowerCase().includes(q)) ||
        (u.email?.toLowerCase().includes(q))
    );
  }, [eligibleUsers, search]);

  function handleAdd(userId: string) {
    startTransition(async () => {
      await addProjectMember(projectId, userId, selectedRole);
      setSearch("");
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent"
      >
        <UserPlus size={11} />
        Add
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-0/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-surface-1 p-6 shadow-2xl">
        <h3 className="mb-4 font-display text-[16px] font-bold tracking-[-0.01em] text-white">
          Add Member
        </h3>

        {/* Role selector */}
        <div className="mb-4">
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
            Member Role
          </label>
          <div className="flex gap-1.5">
            {(["client", "team", "owner"] as MemberRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] capitalize transition-all ${
                  selectedRole === role
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-white/[0.06] bg-white/[0.02] text-dim hover:text-body"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="field !pl-8 !py-2.5 !text-[12px]"
            autoFocus
          />
        </div>

        {/* User list */}
        <div className="max-h-[280px] space-y-1 overflow-y-auto">
          {eligibleUsers.length === 0 ? (
            <div className="flex flex-col items-center py-6 text-center">
              <Users size={18} className="mb-2 text-dim" />
              <p className="text-[12px] text-dim">No eligible users to add</p>
              <p className="mt-0.5 text-[11px] text-dim/60">All users are already members of this project</p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-4 text-center text-[12px] text-dim">No users match &quot;{search}&quot;</p>
          ) : (
            filtered.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] px-3 py-2.5 transition-all hover:border-white/[0.08]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-white">
                    {user.full_name || "Unnamed User"}
                  </p>
                  <p className="font-mono text-[10px] text-dim">{user.email}</p>
                </div>
                <div className="flex items-center gap-2 pl-3">
                  <span className={`font-mono text-[9px] uppercase tracking-[0.06em] ${roleColors[user.role] ?? "text-dim"}`}>
                    {user.role}
                  </span>
                  <button
                    onClick={() => handleAdd(user.id)}
                    disabled={pending}
                    className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent transition-colors hover:bg-accent/20 disabled:opacity-50"
                  >
                    {pending ? <Loader2 size={10} className="animate-spin" /> : <UserPlus size={10} />}
                    Add
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Close */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
