"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { ChartContainer } from "@/components/charts/chart-container";
import { BarChart } from "@/components/charts/bar-chart";

const marketColors: Record<string, string> = {
  stocks: "#00D4AA",
  crypto: "#f59e0b",
  indices: "#10b981",
  forex: "#06E0FF",
  commodities: "#ec4899",
  futures: "#8b5cf6",
};

export function MarketAnalytics() {
  return (
    <ChartContainer title="Market Performance" subtitle="P&L breakdown by market sector" glow="analytics" height={420}>
      <BarChart
        data={mockAnalyticsData.marketPerformance.map((m) => ({
          label: m.market.charAt(0).toUpperCase() + m.market.slice(1),
          value: m.pnl,
          color: marketColors[m.market] || "#6366f1",
        }))}
        height={240}
        layout="horizontal"
        valuePrefix="$"
      />
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 px-3">
        {mockAnalyticsData.marketPerformance.map((m) => (
          <div key={m.market} className="rounded-lg border border-border/50 p-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: marketColors[m.market] }} />
              <span className="text-xs font-medium capitalize">{m.market}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={cn("text-sm font-bold", m.pnl >= 0 ? "text-success" : "text-error")}>
                {formatCurrency(m.pnl)}
              </span>
              <Badge variant={m.winRate >= 65 ? "success" : m.winRate >= 60 ? "warning" : "secondary"} className="text-[10px] px-1.5">
                {m.winRate.toFixed(0)}%
              </Badge>
            </div>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{m.trades} trades · PF {m.profitFactor.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
}
