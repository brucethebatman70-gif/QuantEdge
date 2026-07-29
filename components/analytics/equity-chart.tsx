"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";

type Series = "equity" | "balance" | "drawdown";

export function EquityChart() {
  const [series, setSeries] = useState<Series>("equity");
  const [zoom, setZoom] = useState<[number, number]>([0, mockAnalyticsData.equityCurve.length - 1]);

  const data = useMemo(() => {
    const sliced = mockAnalyticsData.equityCurve.slice(zoom[0], zoom[1] + 1);
    return sliced.map((p) => ({
      ...p,
      label: formatDate(p.date),
    }));
  }, [zoom]);

  const seriesOptions: { key: Series; label: string; color: string }[] = [
    { key: "equity", label: "Equity", color: "#6366f1" },
    { key: "balance", label: "Balance", color: "#22d3ee" },
    { key: "drawdown", label: "Drawdown", color: "#ef4444" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Equity Analytics</CardTitle>
        <div className="flex items-center gap-1">
          {seriesOptions.map((opt) => (
            <Button
              key={opt.key}
              variant={series === opt.key ? "secondary" : "ghost"}
              size="xs"
              onClick={() => setSeries(opt.key)}
              className="text-[11px]"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [formatCurrency(value), seriesOptions.find((o) => o.key === series)?.label]}
                labelFormatter={(label) => label}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px" }}
                formatter={(value) => <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>}
              />
              {series === "drawdown" ? (
                <Bar
                  dataKey="drawdown"
                  fill="#ef4444"
                  opacity={0.6}
                  name="Drawdown"
                  radius={[2, 2, 0, 0]}
                />
              ) : (
                <>
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={series}
                    stroke={series === "equity" ? "#6366f1" : "#22d3ee"}
                    fill={`url(#${series}Gradient)`}
                    strokeWidth={2}
                    name={seriesOptions.find((o) => o.key === series)?.label}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2 }}
                  />
                  {series === "equity" && (
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#22d3ee"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      name="Balance"
                      dot={false}
                    />
                  )}
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#6366f1]" />
              Growth: +18.4%
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#22d3ee]" />
              Current: {formatCurrency(mockAnalyticsData.equityCurve[mockAnalyticsData.equityCurve.length - 1].equity)}
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 3, 6, 12].map((m) => (
              <Button
                key={m}
                variant="ghost"
                size="xs"
                className="text-[10px]"
                onClick={() => {
                  const total = mockAnalyticsData.equityCurve.length;
                  const range = Math.floor(total * (m / 12));
                  setZoom([Math.max(0, total - range), total - 1]);
                }}
              >
                {m}M
              </Button>
            ))}
            <Button
              variant="ghost"
              size="xs"
              className="text-[10px]"
              onClick={() => setZoom([0, mockAnalyticsData.equityCurve.length - 1])}
            >
              All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
