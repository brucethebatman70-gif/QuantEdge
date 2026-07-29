import { SkeletonLine } from "@/components/loading/skeleton-primitives";
import { CardSkeletonGrid } from "@/components/loading/card-skeleton";

export default function GoalsLoading() {
  return (
    <div className="h-full flex flex-col p-1">
      <SkeletonLine width={160} height={20} className="mb-4" />
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonLine key={i} width={80} height={28} rounded="lg" />
        ))}
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonLine key={i} width={64} height={20} rounded="lg" />
        ))}
      </div>
      <div className="flex-1 flex gap-4">
        <div className="flex-1">
          <CardSkeletonGrid count={6} columns={3} layout="default" />
        </div>
        <div className="w-80 space-y-4">
          <SkeletonLine width="100%" height={120} />
          <SkeletonLine width="100%" height={80} />
          <SkeletonLine width="100%" height={200} />
        </div>
      </div>
    </div>
  );
}
