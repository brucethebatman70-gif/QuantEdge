"use client";

import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { ChartContainer } from "@/components/charts/chart-container";
import { DonutChart } from "@/components/charts/donut-chart";
import { BarChart } from "@/components/charts/bar-chart";

const pieColors = ["#00D4AA", "#06E0FF", "#8b5cf6", "#f59e0b", "#ef4444"];

export function RiskAnalytics() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartContainer title="Risk Distribution" subtitle="Trade count by risk bucket" glow="warning" height={380}>
        <DonutChart
          data={mockAnalyticsData.riskDistribution.map((r, i) => ({
            label: r.bucket,
            value: r.count,
            color: pieColors[i],
          }))}
          height={220}
          innerRadius={55}
          outerRadius={85}
          centerValue={`${mockAnalyticsData.riskDistribution.reduce((s, r) => s + r.count, 0)}`}
          centerLabel="Trades"
        />
        <div className="mt-2 space-y-1 px-3">
          {mockAnalyticsData.riskDistribution.map((r, i) => (
            <div key={r.bucket} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                <span>{r.bucket}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="tabular-nums text-muted-foreground">{r.count} trades</span>
                <span className={cn("tabular-nums font-medium", r.pnl >= 0 ? "text-success" : "text-error")}>
                  {formatCurrency(r.pnl)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      <ChartContainer title="Position Size Distribution" subtitle="Trade count by position size" height={380}>
        <BarChart
          data={mockAnalyticsData.positionSizeDistribution.map((d) => ({
            label: d.bucket,
            value: d.count,
          }))}
          height={300}
          maxBarSize={40}
        />
      </ChartContainer>
    </div>
  );
}
