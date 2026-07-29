"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { ChartContainer } from "@/components/charts/chart-container";
import { BarChart } from "@/components/charts/bar-chart";

type SortKey = "pnl" | "winRate" | "trades" | "avgRr";

export function PairAnalytics() {
  const [sortBy, setSortBy] = useState<SortKey>("pnl");

  const sorted = useMemo(() => {
    return [...mockAnalyticsData.pairPerformance].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [sortBy]);

  return (
    <ChartContainer
      title="Pair / Symbol Analytics"
      subtitle="P&L breakdown by traded pair"
      glow="analytics"
      height={480}
      rightAction={
        <div className="flex gap-1">
          {(["pnl", "winRate", "trades", "avgRr"] as SortKey[]).map((key) => (
            <Button
              key={key}
              variant={sortBy === key ? "secondary" : "ghost"}
              size="xs"
              onClick={() => setSortBy(key)}
              className="text-[10px] capitalize"
            >
              {key === "avgRr" ? "Avg R:R" : key}
            </Button>
          ))}
        </div>
      }
    >
      <BarChart
        data={sorted.map((p) => ({
          label: p.pair,
          value: p.pnl,
          color: p.pnl >= 0 ? "#10b981" : "#ef4444",
        }))}
        height={240}
        layout="horizontal"
        valuePrefix="$"
      />
      <div className="mt-3 overflow-x-auto px-3">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Pair</th>
              <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Trades</th>
              <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Win Rate</th>
              <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">P&L</th>
              <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Avg R:R</th>
              <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Best</th>
              <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Worst</th>
            </tr>
          </thead>
          <tbody>
            {sorted.slice(0, 8).map((p) => (
              <tr key={p.pair} className="border-b border-border/30 transition-colors hover:bg-muted/50">
                <td className="px-2 py-1.5 font-medium">{p.pair}</td>
                <td className="px-2 py-1.5 text-right tabular-nums">{p.trades}</td>
                <td className="px-2 py-1.5 text-right tabular-nums">{p.winRate.toFixed(0)}%</td>
                <td className={cn("px-2 py-1.5 text-right tabular-nums font-medium", p.pnl >= 0 ? "text-success" : "text-error")}>
                  {formatCurrency(p.pnl)}
                </td>
                <td className="px-2 py-1.5 text-right tabular-nums">{p.avgRr.toFixed(1)}</td>
                <td className="px-2 py-1.5 text-right tabular-nums text-success">{formatCurrency(p.bestTrade)}</td>
                <td className="px-2 py-1.5 text-right tabular-nums text-error">{formatCurrency(p.worstTrade)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartContainer>
  );
}
