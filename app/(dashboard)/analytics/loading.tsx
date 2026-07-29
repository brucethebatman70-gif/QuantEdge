import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SkeletonLine } from "@/components/loading/skeleton-primitives";
import { CardSkeletonGrid } from "@/components/loading/card-skeleton";
import { ChartSkeleton } from "@/components/loading/chart-skeleton";

export default function AnalyticsLoading() {
  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6 p-1">
        <SkeletonLine width={240} height={20} />
        <SkeletonLine width={320} height={13} />

        <CardSkeletonGrid count={4} columns={4} layout="kpi" />

        <div className="flex gap-2 pb-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonLine key={i} width={72} height={28} rounded="lg" />
          ))}
        </div>

        <ChartSkeleton />
      </div>
    </DashboardLayout>
  );
}
