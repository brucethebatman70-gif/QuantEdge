import { SkeletonLine, SkeletonBlock } from "@/components/loading/skeleton-primitives";

export default function PlaybooksLoading() {
  return (
    <div className="h-full flex flex-col p-1">
      <div className="flex items-center gap-4 mb-4">
        <SkeletonLine width={160} height={22} />
        <div className="flex gap-2 ml-auto">
          <SkeletonLine width={80} height={28} rounded="lg" />
          <SkeletonLine width={80} height={28} rounded="lg" />
        </div>
      </div>
      <div className="flex flex-1 gap-4">
        <div className="w-56 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonLine key={i} width="100%" height={36} rounded="lg" />
          ))}
        </div>
        <div className="flex-1">
          <SkeletonBlock width="100%" height={400} />
        </div>
      </div>
    </div>
  );
}
