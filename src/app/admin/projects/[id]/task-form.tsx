"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FormDialog } from "@/components/admin/admin-form";
import { createTask } from "@/lib/admin/actions";

export function TaskForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await createTask(projectId, {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || undefined,
      task_type: (formData.get("task_type") as "completed" | "client_action" | "launch_check") || "completed",
      due_date: (formData.get("due_date") as string) || undefined,
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent"
      >
        <Plus size={11} />
        Add Task
      </button>
      <FormDialog
        title="Add Task"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Title *</label>
          <input name="title" required className="field" placeholder="Review homepage mockup" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Description</label>
          <textarea name="description" rows={2} className="field" placeholder="Optional details..." />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Type</label>
            <select name="task_type" className="field">
              <option value="completed">Completed Work</option>
              <option value="client_action">Client Action</option>
              <option value="launch_check">Launch Check</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Due Date</label>
            <input name="due_date" type="date" className="field" />
          </div>
        </div>
      </FormDialog>
    </>
  );
}
