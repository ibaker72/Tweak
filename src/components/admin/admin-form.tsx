"use client";

import { useTransition, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AdminButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
}

export function AdminButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "sm",
  disabled,
  className,
}: AdminButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg font-medium transition-all disabled:opacity-50",
        size === "sm" && "px-3 py-1.5 text-[11px]",
        size === "md" && "px-4 py-2 text-[12px]",
        variant === "primary" && "bg-accent text-surface-0 hover:bg-accent/90",
        variant === "ghost" && "border border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/[0.12] hover:text-white",
        variant === "danger" && "border border-red-400/20 bg-red-400/[0.06] text-red-400 hover:border-red-400/30 hover:bg-red-400/10",
        className,
      )}
    >
      {children}
    </button>
  );
}

interface FormDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  children: ReactNode;
  submitLabel?: string;
}

export function FormDialog({ title, open, onClose, onSubmit, children, submitLabel = "Create" }: FormDialogProps) {
  const [pending, startTransition] = useTransition();

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await onSubmit(formData);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-0/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-surface-1 p-6 shadow-2xl">
        <h3 className="mb-5 font-display text-[16px] font-bold tracking-[-0.01em] text-white">
          {title}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {children}
          <div className="flex items-center justify-end gap-2 pt-2">
            <AdminButton variant="ghost" onClick={onClose} disabled={pending}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={pending}>
              {pending && <Loader2 size={12} className="animate-spin" />}
              {submitLabel}
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
}
