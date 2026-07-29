"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { formatCurrency } from "@/lib/utils";
import { mockOptimizationRuns, mockStrategies } from "@/lib/backtesting/mock-backtesting";
import { useBacktestingStore } from "@/lib/backtesting/store";

export function OptimizationPanel() {
  const { selectedStrategyId } = useBacktestingStore();
  const [selectedRun, setSelectedRun] = useState<string>("opt1");

  const strategy = useMemo(() => mockStrategies.find((s) => s.id === selectedStrategyId), [selectedStrategyId]);
  const runs = mockOptimizationRuns;
  const currentRun = runs.find((r) => r.id === selectedRun);

  const runResults = useMemo(() => {
    if (!currentRun) return [];
    return currentRun.results.sort((a, b) => b.netProfit - a.netProfit);
  }, [currentRun]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {runs.map((r) => (
          <button key={r.id} onClick={() => setSelectedRun(r.id)}
            className={cn("rounded-lg border px-2.5 py-1.5 text-xs transition-all", selectedRun === r.id ? "border-primary/50 bg-primary/10" : "border-border hover:bg-muted/50")}>
            Optimization #{r.id.slice(-1)}
          </button>
        ))}
        {strategy && <Badge variant="outline" className="text-[10px]">{strategy.name}</Badge>}
      </div>

      {currentRun && (
        <>
          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold">Parameters</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(currentRun.params).map(([param, cfg]) => (
                  <div key={param} className="rounded-lg border border-border/50 p-3">
                    <p className="text-xs font-medium">{param}</p>
                    <div className="mt-2 space-y-1 text-[10px] text-muted-foreground">
                      <div className="flex justify-between"><span>Range</span><span>{cfg.min} – {cfg.max}</span></div>
                      <div className="flex justify-between"><span>Step</span><span>{cfg.step}</span></div>
                    </div>
                    <Input defaultValue={cfg.current} className="mt-2 h-7 text-xs" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Optimization Results ({currentRun.results.length} runs)</CardTitle>
                <Button size="sm" className="text-xs"><Icons.Zap className="mr-1.5 h-4 w-4" />Run Optimization</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={runResults} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="strategyName" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [formatCurrency(v), "Net Profit"]} />
                    <Bar dataKey="netProfit" radius={[4, 4, 0, 0]} maxBarSize={36}>
                      {runResults.map((r, i) => <Cell key={i} fill={i === 0 ? "#10b981" : i === runResults.length - 1 ? "#ef4444" : "#6366f1"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-success/30 bg-success/5 p-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="text-[9px]">Best</Badge>
                    <span className="text-xs font-medium">Best Configuration</span>
                  </div>
                  <div className="mt-2 space-y-0.5 text-[10px]">
                    {Object.entries(currentRun.bestParams).map(([k, v]) => (
                      <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-error/30 bg-error/5 p-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-[9px]">Worst</Badge>
                    <span className="text-xs font-medium">Worst Configuration</span>
                  </div>
                  <div className="mt-2 space-y-0.5 text-[10px]">
                    {Object.entries(currentRun.worstParams).map(([k, v]) => (
                      <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
