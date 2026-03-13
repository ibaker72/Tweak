"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FormDialog } from "@/components/admin/admin-form";
import { createMilestone } from "@/lib/admin/actions";

export function MilestoneForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await createMilestone(projectId, {
      title: formData.get("title") as string,
      status: (formData.get("status") as "pending" | "in_progress" | "completed") || "pending",
      due_date: (formData.get("due_date") as string) || undefined,
      sort_order: Number(formData.get("sort_order")) || 0,
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent"
      >
        <Plus size={11} />
        Add
      </button>
      <FormDialog
        title="Add Milestone"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Title *</label>
          <input name="title" required className="field" placeholder="Discovery & Strategy" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Status</label>
            <select name="status" className="field">
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Sort Order</label>
            <input name="sort_order" type="number" defaultValue={0} className="field" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Due Date</label>
          <input name="due_date" type="date" className="field" />
        </div>
      </FormDialog>
    </>
  );
}
