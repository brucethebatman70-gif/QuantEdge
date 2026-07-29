"use client";

import { cn } from "@/lib/cn";
import { SkeletonLine, SkeletonCircle } from "./skeleton-primitives";
import { CardSkeleton, CardSkeletonGrid } from "./card-skeleton";
import { ChartSkeleton } from "./chart-skeleton";
import { TableSkeleton } from "./table-skeleton";
import { ProgressiveStage } from "./progressive-loader";

interface PageSkeletonProps {
  className?: string;
  title?: boolean;
  subtitle?: boolean;
  cards?: number;
  cardLayout?: "default" | "intelligence" | "kpi" | "market" | "emotion" | "achievement" | "portfolio";
  cardColumns?: number;
  charts?: number;
  table?: boolean;
  tableRows?: number;
  aiWidget?: boolean;
  sidebar?: boolean;
}

export function PageSkeleton({
  className,
  title = true,
  subtitle = true,
  cards = 0,
  cardLayout = "default",
  cardColumns = 4,
  charts = 0,
  table = false,
  tableRows = 6,
  aiWidget = false,
  sidebar = false,
}: PageSkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {sidebar && (
        <ProgressiveStage delay={0}>
          <div className="w-56 space-y-1 p-2 rounded-xl bg-card/50">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2">
                <SkeletonCircle size={16} />
                <SkeletonLine width={`${50 + Math.random() * 30}%`} height={10} />
              </div>
            ))}
          </div>
        </ProgressiveStage>
      )}

      {(title || subtitle) && (
        <ProgressiveStage delay={0.05} duration={0.4}>
          <div className="space-y-1.5">
            {title && <SkeletonLine width={180} height={20} />}
            {subtitle && <SkeletonLine width={260} height={12} />}
          </div>
        </ProgressiveStage>
      )}

      {cards > 0 && (
        <ProgressiveStage delay={0.1} duration={0.5}>
          <CardSkeletonGrid count={cards} columns={cardColumns} layout={cardLayout} />
        </ProgressiveStage>
      )}

      {charts > 0 && (
        <div className="space-y-6">
          {charts === 1 ? (
            <ProgressiveStage delay={0.2} duration={0.5}>
              <ChartSkeleton />
            </ProgressiveStage>
          ) : (
            <div className={cn("grid gap-6", charts >= 2 ? "lg:grid-cols-2" : "")}>
              {Array.from({ length: charts }).map((_, i) => (
                <ProgressiveStage key={i} delay={0.2 + i * 0.1} duration={0.5}>
                  <ChartSkeleton />
                </ProgressiveStage>
              ))}
            </div>
          )}
        </div>
      )}

      {table && (
        <ProgressiveStage delay={0.35} duration={0.5}>
          <TableSkeleton rows={tableRows} columns={5} hasBadge />
        </ProgressiveStage>
      )}

      {aiWidget && (
        <ProgressiveStage delay={0.45} duration={0.5}>
          <div className="grid gap-4 lg:grid-cols-3">
            <CardSkeleton layout="intelligence" />
            <CardSkeleton layout="intelligence" />
            <CardSkeleton layout="intelligence" />
          </div>
        </ProgressiveStage>
      )}
    </div>
  );
}
