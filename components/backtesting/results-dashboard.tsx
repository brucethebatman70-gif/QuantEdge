"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Cell } from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/cn";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { mockBacktestResults } from "@/lib/backtesting/mock-backtesting";
import { useBacktestingStore } from "@/lib/backtesting/store";

const kpiMeta = [
  { key: "netProfit", label: "Net Profit", format: "currency", color: "text-success" },
  { key: "grossProfit", label: "Gross Profit", format: "currency", color: "text-success" },
  { key: "grossLoss", label: "Gross Loss", format: "currency", color: "text-error" },
  { key: "profitFactor", label: "Profit Factor", format: "number", color: "" },
  { key: "winRate", label: "Win Rate", format: "percent", color: "text-success" },
  { key: "expectancy", label: "Expectancy", format: "currency", color: "" },
  { key: "avgRR", label: "Avg R:R", format: "number", color: "" },
  { key: "maxDrawdown", label: "Max Drawdown", format: "percent", color: "text-error" },
  { key: "recoveryFactor", label: "Recovery Factor", format: "number", color: "" },
  { key: "sharpeRatio", label: "Sharpe Ratio", format: "number", color: "" },
  { key: "sortinoRatio", label: "Sortino Ratio", format: "number", color: "" },
  { key: "totalTrades", label: "Trade Count", format: "number", color: "" },
  { key: "avgTrade", label: "Average Trade", format: "currency", color: "" },
] as const;

export function ResultsDashboard() {
  const { selectedResultId, setSelectedResultId, compareIds, toggleCompareId } = useBacktestingStore();
  const [chartType, setChartType] = useState<"pnl" | "equity">("pnl");

  const result = useMemo(() => mockBacktestResults.find((r) => r.id === selectedResultId), [selectedResultId]);
  const compared = useMemo(() => mockBacktestResults.filter((r) => compareIds.includes(r.id)), [compareIds]);

  const displayResults = result ? [result, ...compared] : mockBacktestResults;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {mockBacktestResults.map((r) => (
          <button key={r.id} onClick={() => setSelectedResultId(r.id === selectedResultId ? null : r.id)}
            className={cn("flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-all", selectedResultId === r.id ? "border-primary/50 bg-primary/10" : "border-border hover:bg-muted/50")}>
            <span className="font-medium">{r.strategyName}</span>
            <span className={cn("tabular-nums", r.netProfit >= 0 ? "text-success" : "text-error")}>{formatCurrency(r.netProfit)}</span>
          </button>
        ))}
        <Button variant="ghost" size="xs" onClick={() => setSelectedResultId(null)} className="text-[10px]">All</Button>
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {kpiMeta.map((kpi, i) => {
            const val = result[kpi.key as keyof typeof result] as number;
            return (
              <motion.div key={kpi.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                className="rounded-lg border border-border/50 p-2.5">
                <p className="text-[9px] text-muted-foreground">{kpi.label}</p>
                <p className={cn("text-sm font-bold tabular-nums mt-0.5", kpi.color || (val >= 0 ? "text-success" : val < 0 ? "text-error" : ""))}>
                  {kpi.format === "currency" ? formatCurrency(val) : kpi.format === "percent" ? `${val.toFixed(1)}%` : formatNumber(val)}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Performance Chart</CardTitle>
            <div className="flex gap-1">
              {(["pnl", "equity"] as const).map((t) => (
                <Button key={t} variant={chartType === t ? "secondary" : "ghost"} size="xs" onClick={() => setChartType(t)} className="text-[10px] capitalize">{t === "pnl" ? "P&L Comparison" : "Equity Curve"}</Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            {chartType === "pnl" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayResults} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="strategyName" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [formatCurrency(v), "Net Profit"]} />
                  <Bar dataKey="netProfit" radius={[4, 4, 0, 0]} maxBarSize={48}>
                    {displayResults.map((r, i) => <Cell key={i} fill={r.netProfit >= 0 ? "#10b981" : "#ef4444"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : result ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.equityCurve} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <defs><linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [formatCurrency(v), "Equity"]} />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" fill="url(#eqGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : <div className="flex h-full items-center justify-center"><p className="text-xs text-muted-foreground">Select a result to view equity curve</p></div>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Strategy Comparison</CardTitle>
            <Button variant="ghost" size="xs" onClick={() => {}} className="text-[10px]">Clear Selection</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-border">
                <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Strategy</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Net P&L</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Win Rate</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">PF</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Expectancy</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Avg R:R</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Max DD</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Sharpe</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Trades</th>
              </tr></thead>
              <tbody>
                {mockBacktestResults.map((r) => (
                  <tr key={r.id} className={cn("border-b border-border/30 transition-colors hover:bg-muted/50", selectedResultId === r.id && "bg-primary/5")}>
                    <td className="px-2 py-1.5 font-medium">{r.strategyName}</td>
                    <td className={cn("px-2 py-1.5 text-right tabular-nums font-medium", r.netProfit >= 0 ? "text-success" : "text-error")}>{formatCurrency(r.netProfit)}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums text-success">{r.winRate}%</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{r.profitFactor}</td>
                    <td className={cn("px-2 py-1.5 text-right tabular-nums", r.expectancy >= 0 ? "text-success" : "text-error")}>{formatCurrency(r.expectancy)}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{r.avgRR}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums text-error">{r.maxDrawdown}%</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{r.sharpeRatio}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{r.totalTrades}</td>
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
