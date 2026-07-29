import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SkeletonLine } from "@/components/loading/skeleton-primitives";
import { CardSkeletonGrid } from "@/components/loading/card-skeleton";
import { ChartSkeleton } from "@/components/loading/chart-skeleton";

export default function ChartsLoading() {
  return (
    <DashboardLayout title="Charts Hub">
      <div className="space-y-6 p-1">
        <SkeletonLine width={200} height={20} />
        <CardSkeletonGrid count={4} columns={4} layout="kpi" />
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <ChartSkeleton />
        <div className="grid gap-6 lg:grid-cols-3">
          <ChartSkeleton />
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    </DashboardLayout>
  );
}
