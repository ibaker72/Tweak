"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { FormDialog } from "@/components/admin/admin-form";
import { createProject } from "@/lib/admin/actions";

export function NewProjectButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await createProject({
      name: formData.get("name") as string,
      client_company: (formData.get("client_company") as string) || undefined,
      launch_window: (formData.get("launch_window") as string) || undefined,
    });
    router.push(`/admin/projects/${result.id}`);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-v !py-2 !px-5 !text-[12px] inline-flex w-fit items-center gap-2"
      >
        <Plus size={13} />
        New Project
      </button>
      <FormDialog
        title="Create Project"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        submitLabel="Create Project"
      >
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
            Project Name *
          </label>
          <input name="name" required className="field" placeholder="Brand Refresh & Website Rebuild" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
            Client Company
          </label>
          <input name="client_company" className="field" placeholder="Acme Corp" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
            Launch Window
          </label>
          <input name="launch_window" className="field" placeholder="Q2 2026" />
        </div>
      </FormDialog>
    </>
  );
}
