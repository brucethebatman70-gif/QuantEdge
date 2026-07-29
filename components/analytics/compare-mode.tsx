"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/cn";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { useAnalyticsStore } from "@/lib/analytics/store";

export function CompareMode() {
  const { compareMode, setCompareMode } = useAnalyticsStore();

  const metrics = useMemo(() => {
    const first = mockAnalyticsData.monthlyPerformance.slice(0, 3);
    const second = mockAnalyticsData.monthlyPerformance.slice(3, 6);
    const firstTotal = first.reduce((s, m) => s + m.pnl, 0);
    const secondTotal = second.reduce((s, m) => s + m.pnl, 0);
    const firstTrades = first.reduce((s, m) => s + m.trades, 0);
    const secondTrades = second.reduce((s, m) => s + m.trades, 0);
    const firstWins = first.reduce((s, m) => s + m.wins, 0);
    const secondWins = second.reduce((s, m) => s + m.wins, 0);

    return [
      { label: "Net P&L", first: firstTotal, second: secondTotal, format: "currency" as const },
      { label: "Total Trades", first: firstTrades, second: secondTrades, format: "number" as const },
      { label: "Win Rate", first: (firstWins / firstTrades) * 100, second: (secondWins / secondTrades) * 100, format: "percent" as const },
      { label: "Avg P&L/Trade", first: firstTotal / firstTrades, second: secondTotal / secondTrades, format: "currency" as const },
    ];
  }, []);

  if (!compareMode) return null;

  return (
    <Card className="border-2 border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Compare Mode</CardTitle>
        <Button variant="ghost" size="xs" onClick={() => setCompareMode(false)}>
          Close
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground">Period 1</p>
            <Select defaultValue="Q1">
              <SelectTrigger className="mt-1 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q1" className="text-xs">Q1 2026 (Jan-Mar)</SelectItem>
                <SelectItem value="Q2" className="text-xs">Q2 2026 (Apr-Jun)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground">Period 2</p>
            <Select defaultValue="Q2">
              <SelectTrigger className="mt-1 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q2" className="text-xs">Q2 2026 (Apr-Jun)</SelectItem>
                <SelectItem value="Q3" className="text-xs">Q3 2026 (Jul-Sep)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((m) => {
            const diff = m.second - m.first;
            const better = m.format === "percent" || m.format === "currency" ? diff >= 0 : diff >= 0;
            return (
              <div key={m.label} className="rounded-lg border border-border/50 p-2.5">
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
                <div className="mt-1 space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">P1:</span>
                    <span className="tabular-nums font-medium">
                      {m.format === "currency" ? formatCurrency(m.first) : m.format === "percent" ? `${m.first.toFixed(1)}%` : m.first.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">P2:</span>
                    <span className="tabular-nums font-medium">
                      {m.format === "currency" ? formatCurrency(m.second) : m.format === "percent" ? `${m.second.toFixed(1)}%` : m.second.toFixed(0)}
                    </span>
                  </div>
                </div>
                <div className={cn("mt-1 text-[10px] font-medium", better ? "text-success" : "text-error")}>
                  {better ? "↑" : "↓"} {m.format === "currency" ? formatCurrency(Math.abs(diff)) : m.format === "percent" ? `${Math.abs(diff).toFixed(1)}%` : Math.abs(diff).toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalyticsData.monthlyPerformance} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                formatter={(value: number) => [formatCurrency(value), "P&L"]}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="pnl" name="P&L" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
