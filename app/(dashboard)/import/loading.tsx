import { SkeletonLine, SkeletonBlock } from "@/components/loading/skeleton-primitives";
import { CardSkeletonGrid } from "@/components/loading/card-skeleton";

export default function ImportLoading() {
  return (
    <div className="space-y-6 p-1">
      <SkeletonLine width={200} height={22} />
      <SkeletonLine width={320} height={13} />
      <CardSkeletonGrid count={4} columns={4} layout="default" />
      <SkeletonBlock width="100%" height={200} />
    </div>
  );
}
