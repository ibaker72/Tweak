export default function ApprovalsLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="mb-4 h-3 w-24 rounded bg-white/[0.04]" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/[0.04]" />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-white/[0.04]" />
            <div className="h-3 w-32 rounded bg-white/[0.03]" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl border border-white/[0.06] bg-white/[0.015]"
          />
        ))}
      </div>
    </div>
  );
}
