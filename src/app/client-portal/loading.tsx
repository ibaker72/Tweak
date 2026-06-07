export default function PortalLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-56 rounded-md bg-white/[0.04]" />
            <div className="h-5 w-20 rounded-full bg-white/[0.03]" />
          </div>
          <div className="h-3 w-72 rounded bg-white/[0.03]" />
        </div>
        <div className="h-14 w-14 rounded-full bg-white/[0.04]" />
      </div>

      {/* Summary grid skeleton */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl border border-white/[0.06] bg-white/[0.015]" />
        ))}
      </div>

      {/* Main grid skeleton */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="h-72 rounded-2xl border border-white/[0.06] bg-white/[0.015]" />
          <div className="h-48 rounded-2xl border border-white/[0.06] bg-white/[0.015]" />
        </div>
        <div className="space-y-5">
          <div className="h-40 rounded-2xl border border-white/[0.06] bg-white/[0.015]" />
          <div className="h-40 rounded-2xl border border-white/[0.06] bg-white/[0.015]" />
        </div>
      </div>
    </div>
  );
}
