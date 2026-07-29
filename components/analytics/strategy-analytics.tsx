"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";

export function StrategyAnalytics() {
  const top = [...mockAnalyticsData.strategyPerformance].sort((a, b) => b.expectancy - a.expectancy);

  const radarData = mockAnalyticsData.strategyPerformance.map((s) => ({
    strategy: s.strategy,
    value: s.consistency,
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Strategy Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="strategy" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: number) => [formatCurrency(value), "Expectancy"]}
                />
                <Bar dataKey="expectancy" radius={[4, 4, 0, 0]} maxBarSize={32}>
                  {top.map((entry, i) => (
                    <Cell key={i} fill={entry.expectancy >= 0 ? "#6366f1" : "#ef4444"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Strategy Consistency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="strategy" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                <Radar name="Consistency" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Strategy Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
        </CardContent>
      </Card>
    </div>
  );
}
