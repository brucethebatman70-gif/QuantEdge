import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SkeletonLine } from "@/components/loading/skeleton-primitives";
import { SkeletonBlock } from "@/components/loading/skeleton-primitives";
import { CardSkeletonGrid } from "@/components/loading/card-skeleton";

export default function BacktestingLoading() {
  return (
    <DashboardLayout title="Backtesting Center">
      <div className="space-y-4 p-1">
        <SkeletonLine width={220} height={20} />
        <SkeletonLine width={160} height={13} />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonLine key={i} width={100} height={28} rounded="lg" />
          ))}
        </div>
        <CardSkeletonGrid count={3} columns={3} layout="intelligence" />
        <SkeletonBlock width="100%" height={320} />
      </div>
    </DashboardLayout>
  );
}
