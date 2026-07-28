"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/lib/icons";
import { formatCurrency } from "@/lib/utils";
import { mockBacktestResults } from "@/lib/mock-data";

export default function BacktestingPage() {
  const [selected, setSelected] = useState("results");

  return (
    <DashboardLayout title="Backtesting">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Backtest and validate trading strategies
          </p>
          <Button size="sm">
            <Icons.Plus className="mr-2 h-4 w-4" />
            New Backtest
          </Button>
        </div>

        <Tabs defaultValue="strategies" value={selected} onValueChange={setSelected}>
          <TabsList>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="optimizer">Optimizer</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockBacktestResults.map((s) => (
                <Card key={s.name}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm">{s.name}</CardTitle>
                      <Icons.FlaskConical className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Win Rate</span>
                        <p className="font-medium text-success">{s.winRate}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Trades</span>
                        <p className="font-medium">{s.trades}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">P&L</span>
                        <p className="font-medium text-success">{formatCurrency(s.pnl)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sharpe</span>
                        <p className="font-medium">{s.sharpe}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 rounded bg-muted p-2 text-center">
                        <p className="text-[10px] text-muted-foreground">Max DD</p>
                        <p className="text-xs font-medium text-error">{s.maxDD}%</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icons.PlayCircle className="mr-1 h-3 w-3" />
                        Run
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Backtest Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <svg viewBox="0 0 600 350" className="h-full w-full">
                    {(() => {
                      const data = mockBacktestResults;
                      const maxPnl = Math.max(...data.map(d => d.pnl));
                      const h = 300, barW = 80, gap = 30;
                      return data.map((d, i) => {
                        const x = i * (barW + gap) + 20;
                        const barH = (d.pnl / maxPnl) * h * 0.7;
                        return (
                          <g key={d.name}>
                            <defs>
                              <linearGradient id={`bar-grad-${i}`} x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
                              </linearGradient>
                            </defs>
                            <rect x={x} y={h - barH} width={barW} height={Math.max(barH, 3)} rx="6" fill={`url(#bar-grad-${i})`} />
                            <text x={x + barW / 2} y={h - barH - 8} textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">${(d.pnl / 1000).toFixed(1)}k</text>
                            <text x={x + barW / 2} y={h + 16} textAnchor="middle" className="fill-muted-foreground" fontSize="10">{d.name.split(" ")[0]}</text>
                            <text x={x + barW / 2} y={h + 30} textAnchor="middle" className="fill-muted-foreground" fontSize="9">{d.winRate}% WR</text>
                          </g>
                        );
                      });
                    })()}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimizer" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Parameter Optimizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { param: "EMA Fast", range: "5-20", step: "1", current: "10" },
                    { param: "EMA Slow", range: "20-100", step: "5", current: "50" },
                    { param: "Stop Loss", range: "1-5%", step: "0.5%", current: "2%" },
                  ].map((p) => (
                    <div key={p.param} className="rounded-lg border border-border/50 p-4">
                      <p className="text-sm font-medium">{p.param}</p>
                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <p>Range: {p.range}</p>
                        <p>Step: {p.step}</p>
                        <p>Current: {p.current}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Button variant="premium" size="lg">
                    <Icons.Zap className="mr-2 h-5 w-5" />
                    Run Optimization
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
