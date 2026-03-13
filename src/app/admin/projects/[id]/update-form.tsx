"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FormDialog } from "@/components/admin/admin-form";
import { createUpdate } from "@/lib/admin/actions";

export function UpdateForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await createUpdate(projectId, {
      title: formData.get("title") as string,
      body: (formData.get("body") as string) || undefined,
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent"
      >
        <Plus size={11} />
        Post Update
      </button>
      <FormDialog
        title="Post Update"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        submitLabel="Post"
      >
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Title *</label>
          <input name="title" required className="field" placeholder="Design mockups ready for review" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Body</label>
          <textarea name="body" rows={4} className="field" placeholder="Share details about this update..." />
        </div>
      </FormDialog>
    </>
  );
}
