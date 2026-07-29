"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";

type SortKey = "pnl" | "winRate" | "trades" | "avgRr";

export function PairAnalytics() {
  const [sortBy, setSortBy] = useState<SortKey>("pnl");

  const sorted = useMemo(() => {
    return [...mockAnalyticsData.pairPerformance].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [sortBy]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Pair / Symbol Analytics</CardTitle>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sorted} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="pair" tick={{ fontSize: 10, fill: "hsl(var(--foreground))" }} tickLine={false} axisLine={false} width={55} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                formatter={(value: number) => [formatCurrency(value), "P&L"]}
              />
              <Bar dataKey="pnl" radius={[0, 4, 4, 0]} maxBarSize={16}>
                {sorted.map((entry, i) => (
                  <Cell key={i} fill={entry.pnl >= 0 ? "#10b981" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 overflow-x-auto">
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
      </CardContent>
    </Card>
  );
}
