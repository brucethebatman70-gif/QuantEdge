"use client";

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
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";

const marketColors: Record<string, string> = {
  stocks: "#6366f1",
  crypto: "#f59e0b",
  indices: "#10b981",
  forex: "#06b6d4",
  commodities: "#ec4899",
  futures: "#8b5cf6",
};

export function MarketAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Market Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalyticsData.marketPerformance} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="market" tick={{ fontSize: 11, fill: "hsl(var(--foreground))", fontWeight: 500 }} tickLine={false} axisLine={false} width={80} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                formatter={(value: number) => [formatCurrency(value), "P&L"]}
              />
              <Bar dataKey="pnl" radius={[0, 4, 4, 0]} maxBarSize={24}>
                {mockAnalyticsData.marketPerformance.map((entry, i) => (
                  <Cell key={i} fill={marketColors[entry.market] || "#6366f1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
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
      </CardContent>
    </Card>
  );
}
