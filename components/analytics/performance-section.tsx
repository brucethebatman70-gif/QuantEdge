"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import type { PerformancePeriod } from "@/lib/analytics/types";
import { ChartContainer } from "@/components/charts/chart-container";
import { BarChart } from "@/components/charts/bar-chart";

function PerformanceTable({ data }: { data: PerformancePeriod[] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Period</th>
            <th className="px-3 py-2 text-right font-medium text-muted-foreground">Trades</th>
            <th className="px-3 py-2 text-right font-medium text-muted-foreground">Wins</th>
            <th className="px-3 py-2 text-right font-medium text-muted-foreground">Losses</th>
            <th className="px-3 py-2 text-right font-medium text-muted-foreground">Win Rate</th>
            <th className="px-3 py-2 text-right font-medium text-muted-foreground">P&L</th>
            <th className="px-3 py-2 text-right font-medium text-muted-foreground">Avg P&L</th>
            <th className="px-3 py-2 text-right font-medium text-muted-foreground">PF</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.period} className="border-b border-border/50 transition-colors hover:bg-muted/50">
              <td className="px-3 py-2 font-medium">{p.period}</td>
              <td className="px-3 py-2 text-right tabular-nums">{p.trades}</td>
              <td className="px-3 py-2 text-right tabular-nums text-success">{p.wins}</td>
              <td className="px-3 py-2 text-right tabular-nums text-error">{p.losses}</td>
              <td className="px-3 py-2 text-right tabular-nums">{p.winRate.toFixed(1)}%</td>
              <td className={cn("px-3 py-2 text-right tabular-nums font-medium", p.pnl >= 0 ? "text-success" : "text-error")}>
                {formatCurrency(p.pnl)}
              </td>
              <td className={cn("px-3 py-2 text-right tabular-nums", p.avgPnl >= 0 ? "text-success" : "text-error")}>
                {formatCurrency(p.avgPnl)}
              </td>
              <td className="px-3 py-2 text-right tabular-nums">{p.profitFactor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PerformanceSection() {
  const tabData: Record<string, PerformancePeriod[]> = {
    daily: mockAnalyticsData.dailyPerformance,
    weekly: mockAnalyticsData.weeklyPerformance,
    monthly: mockAnalyticsData.monthlyPerformance,
    quarterly: mockAnalyticsData.quarterlyPerformance,
    yearly: mockAnalyticsData.yearlyPerformance,
  };

  const [tab, setTab] = useState("monthly");

  const chartData = useMemo(() => tabData[tab] || [], [tab]);

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <ChartContainer
        title="Performance Analytics"
        subtitle="P&L and win rate across periods"
        glow="analytics"
        height={420}
        rightAction={
          <TabsList className="h-7">
            {Object.keys(tabData).map((t) => (
              <TabsTrigger key={t} value={t} className="text-[10px] capitalize px-2">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        }
      >
        <BarChart
          data={chartData.map((d) => ({ label: d.period, value: d.pnl }))}
          height={220}
          maxBarSize={40}
          valuePrefix="$"
        />
        <PerformanceTable data={chartData} />
      </ChartContainer>
    </Tabs>
  );
}
