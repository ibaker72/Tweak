"use client";

import { AlertTriangle, RotateCw } from "lucide-react";

export default function PortalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="card-premium max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
          <AlertTriangle size={20} className="text-gold" />
        </div>
        <h2 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white">
          Something went wrong loading your dashboard
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-body">
          We hit a snag fetching your project data. This is usually temporary —
          give it another try.
        </p>
        <button
          onClick={reset}
          className="btn-v mx-auto mt-5 !px-5 !py-2 !text-[12px]"
        >
          <RotateCw size={12} /> Try again
        </button>
      </div>
    </div>
  );
}
