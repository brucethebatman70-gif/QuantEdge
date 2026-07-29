import { SkeletonLine, SkeletonBlock } from "@/components/loading/skeleton-primitives";
import { CardSkeletonGrid } from "@/components/loading/card-skeleton";

export default function ReportsLoading() {
  return (
    <div className="h-full flex flex-col p-1">
      <SkeletonLine width={180} height={20} className="mb-4" />
      <CardSkeletonGrid count={4} columns={4} layout="intelligence" />
      <div className="flex items-center gap-2 mt-6 mb-2">
        <SkeletonLine width={240} height={28} rounded="lg" />
        <SkeletonLine width={60} height={24} rounded="lg" />
        <SkeletonLine width={60} height={24} rounded="lg" />
        <SkeletonLine width={60} height={24} rounded="lg" />
      </div>
      <div className="flex-1 flex gap-4 mt-2">
        <div className="flex-1">
          <SkeletonBlock width="100%" height={400} />
        </div>
        <div className="w-80">
          <SkeletonBlock width="100%" height={200} />
          <SkeletonBlock width="100%" height={180} className="mt-4" />
        </div>
      </div>
    </div>
  );
}
