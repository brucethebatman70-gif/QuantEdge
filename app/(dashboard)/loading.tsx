import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SkeletonLine, SkeletonCircle, SkeletonBlock } from "@/components/loading/skeleton-primitives";
import { CardSkeletonGrid } from "@/components/loading/card-skeleton";

export default function DashboardLoading() {
  return (
    <DashboardLayout title="">
      <div className="space-y-6 p-1">
        <div className="space-y-1.5">
          <SkeletonLine width={180} height={22} />
          <SkeletonLine width={260} height={13} />
        </div>

        <CardSkeletonGrid count={4} columns={4} layout="kpi" />

        <div className="grid gap-6 lg:grid-cols-2">
          <SkeletonBlock width="100%" height={380} />
          <div className="glass-card p-4 space-y-3">
            <div className="glass-card-inner-glow" />
            <div className="relative z-10 space-y-3">
              <SkeletonLine width="50%" height={12} />
              <SkeletonLine width="35%" height={28} />
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonLine key={i} width={`${60 + Math.random() * 30}%`} height={10} />
              ))}
              <SkeletonBlock height={28} rounded="md" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card p-4 space-y-3">
              <div className="glass-card-inner-glow" />
              <div className="relative z-10 space-y-2">
                <SkeletonLine width="40%" height={10} />
                <SkeletonLine width="60%" height={26} />
                <SkeletonLine width="25%" height={10} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="glass-card p-4 space-y-3">
              <div className="glass-card-inner-glow" />
              <div className="relative z-10 space-y-3">
                <SkeletonLine width="35%" height={10} />
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="space-y-1">
                      <SkeletonLine width="100%" height={6} />
                      <SkeletonLine width="60%" height={6} className="mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
