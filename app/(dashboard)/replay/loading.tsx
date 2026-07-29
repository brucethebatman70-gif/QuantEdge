import { SkeletonLine, SkeletonBlock } from "@/components/loading/skeleton-primitives";

export default function ReplayLoading() {
  return (
    <div className="h-full flex flex-col gap-4 p-1">
      <div className="flex items-center gap-4">
        <SkeletonLine width={160} height={22} />
        <SkeletonLine width={240} height={28} rounded="lg" className="ml-auto" />
      </div>
      <div className="flex flex-1 gap-4">
        <div className="flex-1">
          <SkeletonBlock width="100%" height={300} />
        </div>
        <div className="w-72 space-y-4">
          <SkeletonBlock width="100%" height={160} />
          <SkeletonBlock width="100%" height={120} />
        </div>
      </div>
    </div>
  );
}
