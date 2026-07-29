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
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import type { PerformancePeriod } from "@/lib/analytics/types";

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
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Performance Analytics</CardTitle>
            <TabsList className="h-8">
              {Object.keys(tabData).map((t) => (
                <TabsTrigger key={t} value={t} className="text-[11px] capitalize px-2.5">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: number, name: string) => [
                    name === "P&L" ? formatCurrency(value) : `${value}%`,
                    name,
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="pnl" name="P&L" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Line type="monotone" dataKey="winRate" name="Win Rate" stroke="#10b981" strokeWidth={2} dot={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <PerformanceTable data={chartData} />
        </CardContent>
      </Card>
    </Tabs>
  );
}
