"use client";

import { useState, useTransition } from "react";
import { Pencil, Loader2, X, Save } from "lucide-react";
import { updateProject } from "@/lib/admin/actions";
import type { Project, ProjectStatus } from "@/lib/portal/types";

const statuses: { value: ProjectStatus; label: string }[] = [
  { value: "planning", label: "Planning" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "revisions", label: "Revisions" },
  { value: "launch_prep", label: "Launch Prep" },
  { value: "live", label: "Live" },
];

export function ProjectEditForm({ project }: { project: Project }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateProject(project.id, {
        name: fd.get("name") as string,
        status: fd.get("status") as ProjectStatus,
        client_company: (fd.get("client_company") as string) || null,
        launch_window: (fd.get("launch_window") as string) || null,
        completion_percent: Number(fd.get("completion_percent")) || 0,
      });
      setEditing(false);
    });
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium text-dim transition-colors hover:border-white/[0.12] hover:text-body"
      >
        <Pencil size={11} />
        Edit Project
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-premium space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[14px] font-bold text-white">Edit Project</h3>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-dim hover:text-body"
        >
          <X size={14} />
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Name</label>
          <input name="name" defaultValue={project.name} required className="field" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Status</label>
          <select name="status" defaultValue={project.status} className="field">
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Client Company</label>
          <input name="client_company" defaultValue={project.client_company ?? ""} className="field" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Launch Window</label>
          <input name="launch_window" defaultValue={project.launch_window ?? ""} className="field" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Completion %</label>
          <input
            name="completion_percent"
            type="number"
            min={0}
            max={100}
            defaultValue={project.completion_percent}
            className="field"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[11px] font-medium text-surface-0 disabled:opacity-50"
        >
          {pending ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
          Save
        </button>
      </div>
    </form>
  );
}
