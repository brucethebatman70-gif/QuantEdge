"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { ChartContainer } from "@/components/charts/chart-container";
import { BarChart } from "@/components/charts/bar-chart";

export function StrategyAnalytics() {
  const top = [...mockAnalyticsData.strategyPerformance].sort((a, b) => b.expectancy - a.expectancy);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartContainer title="Strategy Performance" subtitle="Expectancy by strategy" glow="analytics" height={320}>
        <BarChart
          data={top.map((s) => ({
            label: s.strategy,
            value: s.expectancy,
            color: s.expectancy >= 0 ? "#8b5cf6" : "#ef4444",
          }))}
          height={260}
          maxBarSize={32}
          valuePrefix="$"
        />
      </ChartContainer>

      <ChartContainer title="Strategy Consistency" subtitle="Radar view of consistency scores" glow="ai" height={320}>
        <div className="flex items-center justify-center h-[260px]">
          <div className="grid grid-cols-2 gap-3 w-full px-4">
            {top.map((s) => (
              <div key={s.strategy} className="rounded-lg border border-border/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">{s.strategy}</span>
                  <span className="text-xs tabular-nums font-bold opacity-80">{s.consistency}%</span>
                </div>
                <div className="relative h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                    style={{
                      width: `${s.consistency}%`,
                      background: `linear-gradient(90deg, #8b5cf6, #06E0FF)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ChartContainer>

      <ChartContainer title="Strategy Comparison" subtitle="Full strategy metrics comparison" className="lg:col-span-2" height={320}>
        <div className="overflow-x-auto px-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Strategy</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Trades</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Win Rate</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Avg R:R</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Expectancy</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Drawdown</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Consistency</th>
              </tr>
            </thead>
            <tbody>
              {top.map((s) => (
                <tr key={s.strategy} className="border-b border-border/30 transition-colors hover:bg-muted/50">
                  <td className="px-3 py-2 font-medium">{s.strategy}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.trades}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.winRate}%</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.avgRr.toFixed(1)}</td>
                  <td className={cn("px-3 py-2 text-right tabular-nums font-medium", s.expectancy >= 0 ? "text-success" : "text-error")}>
                    {formatCurrency(s.expectancy)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-error">{s.drawdown.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={s.consistency} className="h-1.5 w-16" />
                      <span className="tabular-nums">{s.consistency}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartContainer>
    </div>
  );
}
