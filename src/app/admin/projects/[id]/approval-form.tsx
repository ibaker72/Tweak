"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FormDialog } from "@/components/admin/admin-form";
import { createApproval } from "@/lib/admin/actions";

export function ApprovalForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await createApproval(projectId, {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || undefined,
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent"
      >
        <Plus size={11} />
        Request Approval
      </button>
      <FormDialog
        title="Request Approval"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        submitLabel="Send Request"
      >
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Title *</label>
          <input name="title" required className="field" placeholder="Homepage design sign-off" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Description</label>
          <textarea name="description" rows={3} className="field" placeholder="What needs to be approved..." />
        </div>
      </FormDialog>
    </>
  );
}
