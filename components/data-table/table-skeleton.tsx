'use client';
export function TableSkeleton() {
  return (
    <div className="p-4 space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-4 h-4 rounded bg-white/[0.04]" />
          <div className="w-16 h-3 rounded bg-white/[0.04]" />
          <div className="w-12 h-3 rounded bg-white/[0.04]" />
          <div className="w-24 h-3 rounded bg-white/[0.04]" />
          <div className="w-20 h-3 rounded bg-white/[0.04]" />
          <div className="w-16 h-3 rounded bg-white/[0.04]" />
          <div className="flex-1 h-3 rounded bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
