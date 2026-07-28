"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { mockStats, mockAnalytics } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const metrics = [
    { label: "Total Trades", value: formatNumber(mockStats.totalTrades), change: "+23 vs last month" },
    { label: "Win Rate", value: mockStats.winRate + "%", change: "+3.2% improvement" },
    { label: "Profit Factor", value: mockStats.profitFactor.toFixed(2), change: "Above 2.0 threshold" },
    { label: "Avg Win", value: formatCurrency(mockStats.averageWin), change: formatCurrency(mockStats.averageLoss) + " avg loss" },
    { label: "Max Drawdown", value: mockStats.maxDrawdown + "%", change: "Peak-to-trough" },
    { label: "Sharpe Ratio", value: mockStats.sharpeRatio.toFixed(2), change: "Excellent risk-adjusted" },
    { label: "Best Trade", value: formatCurrency(mockStats.bestTrade), change: mockStats.bestTradeSymbol + " (Mar 2026)" },
    { label: "Worst Trade", value: formatCurrency(mockStats.worstTrade), change: mockStats.worstTradeSymbol + " (Feb 2026)" },
  ];

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="setups">Setups</TabsTrigger>
            <TabsTrigger value="symbols">Symbols</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.slice(0, 4).map((m) => (
                <Card key={m.label}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {m.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{m.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{m.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly P&L</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <svg viewBox="0 0 600 260" className="h-full w-full">
                      {(() => {
                        const data = mockAnalytics.monthlyPerformance;
                        const maxPnl = Math.max(...data.map(d => Math.abs(d.pnl)));
                        const h = 220, barW = 60, gap = 20;
                        return data.map((m, i) => {
                          const x = i * (barW + gap) + 10;
                          const barH = (Math.abs(m.pnl) / maxPnl) * h * 0.8;
                          const y = m.pnl >= 0 ? h - barH : h;
                          return (
                            <g key={m.month}>
                              <rect x={x} y={y} width={barW} height={Math.max(barH, 3)} rx="6" fill={m.pnl >= 0 ? "var(--success)" : "var(--error)"} opacity="0.8" />
                              <text x={x + barW / 2} y={h + 16} textAnchor="middle" className="fill-muted-foreground" fontSize="11">{m.month}</text>
                              <text x={x + barW / 2} y={y - 6} textAnchor="middle" className="fill-muted-foreground" fontSize="9">${(m.pnl / 1000).toFixed(1)}k</text>
                            </g>
                          );
                        });
                      })()}
                    </svg>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Win Rate by Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <svg viewBox="0 0 600 260" className="h-full w-full">
                      {(() => {
                        const data = mockAnalytics.winLossByDay;
                        const maxCount = Math.max(...data.map(d => d.wins + d.losses));
                        const h = 220, barW = 80, gap = 30;
                        return data.map((d, i) => {
                          const x = i * (barW + gap) + 15;
                          const winH = (d.wins / maxCount) * h * 0.8;
                          const lossH = (d.losses / maxCount) * h * 0.8;
                          return (
                            <g key={d.day}>
                              <rect x={x} y={h - winH} width={barW / 2 - 2} height={Math.max(winH, 3)} rx="4" fill="var(--success)" opacity="0.8" />
                              <rect x={x + barW / 2 + 2} y={h - lossH} width={barW / 2 - 2} height={Math.max(lossH, 3)} rx="4" fill="var(--error)" opacity="0.8" />
                              <text x={x + barW / 2} y={h + 16} textAnchor="middle" className="fill-muted-foreground" fontSize="11">{d.day.slice(0, 3)}</text>
                              <text x={x + barW / 4} y={h - winH - 4} textAnchor="middle" className="fill-success" fontSize="9">{d.wins}</text>
                              <text x={x + barW * 3 / 4} y={h - lossH - 4} textAnchor="middle" className="fill-error" fontSize="9">{d.losses}</text>
                            </g>
                          );
                        });
                      })()}
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.slice(4).map((m) => (
                <Card key={m.label}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {m.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{m.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{m.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Setup Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.setupPerformance.map((s) => (
                    <div key={s.setup}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium">{s.setup}</span>
                        <span className="text-muted-foreground">{s.trades} trades · {formatCurrency(s.avgPnl)} avg</span>
                      </div>
                      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${s.winRate}%` }}
                        />
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>{s.winRate}% WR</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setups" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Setup Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {mockAnalytics.setupPerformance.map((s) => (
                    <Card key={s.setup} className="border border-border/50">
                      <CardHeader>
                        <CardTitle className="text-sm">{s.setup}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Trades</span>
                            <span className="font-medium">{s.trades}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Win Rate</span>
                            <span className="font-medium text-success">{s.winRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg P&L</span>
                            <span className="font-medium">{formatCurrency(s.avgPnl)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symbols" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Symbol Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-3 text-left font-medium text-muted-foreground">Symbol</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Trades</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Win Rate</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">P&L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockAnalytics.symbolPerformance.map((s) => (
                        <tr key={s.symbol} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                          <td className="py-3 font-medium">{s.symbol}</td>
                          <td className="py-3 text-right">{s.trades}</td>
                          <td className="py-3 text-right">
                            <span className={s.winRate >= 65 ? "text-success" : "text-warning"}>
                              {s.winRate}%
                            </span>
                          </td>
                          <td className={`py-3 text-right font-medium ${s.pnl >= 0 ? "text-success" : "text-error"}`}>
                            {formatCurrency(s.pnl)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
