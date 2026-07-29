import { SkeletonLine, SkeletonBlock } from "@/components/loading/skeleton-primitives";

export default function JournalLoading() {
  return (
    <div className="flex h-full p-1">
      <div className="w-56 space-y-2 p-3 border-r border-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonLine key={i} width={`${60 + Math.random() * 30}%`} height={32} rounded="lg" />
        ))}
      </div>
      <div className="flex-1 p-6 space-y-4">
        <SkeletonLine width={200} height={22} />
        <SkeletonBlock width="100%" height={300} />
      </div>
      <div className="w-80 space-y-3 p-4 border-l border-border">
        <SkeletonLine width="80%" height={14} />
        <SkeletonLine width="60%" height={14} />
        <SkeletonLine width="90%" height={14} />
        <SkeletonLine width="70%" height={14} />
      </div>
    </div>
  );
}
