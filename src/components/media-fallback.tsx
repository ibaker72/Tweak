import { ImageOff } from "lucide-react";

/**
 * Shared dark "visual asset" placeholder used whenever a Work/case-study image
 * is missing or fails to load. It fills its (relative) parent so the surrounding
 * layout keeps its height / aspect ratio instead of collapsing or showing a
 * broken-image icon.
 */
export function MediaFallback({
  label = "Visual asset coming soon",
}: {
  label?: string;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01) 60%, rgba(255,255,255,0.02))",
      }}
    >
      <div className="flex flex-col items-center gap-2 px-3 text-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
          <ImageOff size={14} className="text-white/40" strokeWidth={1.5} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
          {label}
        </span>
      </div>
    </div>
  );
}
