"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/lib/icons";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { mockStats, mockTrades, mockGoals } from "@/lib/mock-data";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AnimatedRow } from "@/components/motion/animated-row";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { easings, stagger as staggerConfig } from "@/lib/motion";

export default function DashboardPage() {
  const stats = [
    { label: "Total P&L", value: mockStats.totalPnl, change: "+" + mockStats.totalPnlPercent + "%", positive: true, icon: "DollarSign" as const },
    { label: "Win Rate", value: mockStats.winRate, change: "+" + mockStats.winRateChange + "%", positive: true, icon: "Activity" as const, suffix: "%" as const },
    { label: "Profit Factor", value: mockStats.profitFactor, change: "+" + mockStats.profitFactorChange.toFixed(2), positive: true, icon: "Zap" as const, decimals: 2 },
    { label: "Drawdown", value: mockStats.maxDrawdown, change: mockStats.drawdownChange + "%", positive: false, icon: "Shield" as const, suffix: "%" as const },
  ];

  const closedTrades = mockTrades.filter(t => t.status === "closed").slice(0, 5);
  const winRate = mockStats.winRate;
  const months = [
    { month: "Jan", pnl: 3200 },
    { month: "Feb", pnl: -1800 },
    { month: "Mar", pnl: 5600 },
    { month: "Apr", pnl: 4100 },
    { month: "May", pnl: 2800 },
    { month: "Jun", pnl: 7200 },
    { month: "Jul", pnl: 8450 },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <Stagger interval={0.06}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = Icons[stat.icon];
              return (
                <StaggerItem key={stat.label}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </CardTitle>
                      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stat.label === "Total P&L" ? (
                          <AnimatedCounter end={stat.value} prefix="$" duration={1.2} />
                        ) : (
                          <>
                            <AnimatedCounter end={Number(stat.value)} duration={1} />
                            {stat.label === "Win Rate" && "%"}
                          </>
                        )}
                      </div>
                      <div className={stat.positive ? "text-success text-xs" : "text-error text-xs"}>
                        {stat.change}
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </div>
        </Stagger>

        <div className="grid gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Equity Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-lg bg-muted/30 p-4">
                  <svg viewBox="0 0 600 260" className="h-full w-full">
                    <defs>
                      <linearGradient id="equity-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {(() => {
                      const data = Array.from({ length: 60 }, (_, i) => ({
                        x: i,
                        y: 100000 + Math.sin(i / 8) * 5000 + i * 150 + ((i * 137 + 50) % 2000),
                      }));
                      const minY = Math.min(...data.map(d => d.y));
                      const maxY = Math.max(...data.map(d => d.y));
                      const range = maxY - minY;
                      const w = 600, h = 200;
                      const points = data.map((d, i) => {
                        const px = (i / 59) * w;
                        const py = h - ((d.y - minY) / range) * h * 0.9 - 10;
                        return `${px},${py}`;
                      });
                      const areaPoints = `0,${h} ${points.join(" ")} ${w},${h}`;
                      return (
                        <>
                          <motion.polygon
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8, ease: easings.enter, delay: 0.3 } }}
                            points={areaPoints} fill="url(#equity-gradient)"
                          />
                          <motion.polyline
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: easings.enter, delay: 0.2 } }}
                            points={points.join(" ")} fill="none" stroke="var(--primary)" strokeWidth="2"
                          />
                        </>
                      );
                    })()}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {closedTrades.map((trade, i) => (
                    <AnimatedRow key={trade.id} index={i}>
                      <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${trade.direction === "long" ? "bg-success/10" : "bg-error/10"}`}>
                            {trade.direction === "long" ? (
                              <Icons.TrendingUp className="h-4 w-4 text-success" />
                            ) : (
                              <Icons.TrendingDown className="h-4 w-4 text-error" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{trade.symbol}</p>
                            <p className="text-xs text-muted-foreground">{trade.exitDate?.slice(0, 10)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${(trade.pnl ?? 0) >= 0 ? "text-success" : "text-error"}`}>
                            {formatCurrency(trade.pnl ?? 0)}
                          </p>
                          <p className={`text-xs ${(trade.pnlPercent ?? 0) >= 0 ? "text-success" : "text-error"}`}>
                            {formatPercent(trade.pnlPercent ?? 0)}
                          </p>
                        </div>
                      </div>
                    </AnimatedRow>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Win/Loss Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-[200px] items-center justify-center">
                  <svg viewBox="0 0 200 200" className="h-full w-full max-w-[180px]">
                    {(() => {
                      const lossRate = 100 - winRate;
                      const cx = 100, cy = 100, r = 80;
                      return (
                        <>
                          <motion.circle
                            cx={cx} cy={cy} r={r} fill="none" stroke="var(--success)" strokeWidth="30"
                            strokeDasharray={`${winRate * 5.026} ${lossRate * 5.026}`}
                            strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}
                            initial={{ strokeDashoffset: winRate * 5.026 }}
                            animate={{ strokeDashoffset: 0, transition: { duration: 1, ease: easings.enter, delay: 0.3 } }}
                          />
                          <motion.circle
                            cx={cx} cy={cy} r={r} fill="none" stroke="var(--error)" strokeWidth="30"
                            strokeDasharray={`${lossRate * 5.026} ${winRate * 5.026}`}
                            strokeDashoffset={`-${winRate * 5.026}`}
                            strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.6 } }}
                          />
                          <text x={cx} y={cy - 8} textAnchor="middle" className="fill-foreground text-2xl font-bold">
                            <tspan>
                              <AnimatedCounter end={winRate} duration={1} delay={0.5} />
                            </tspan>%
                          </text>
                          <text x={cx} y={cy + 14} textAnchor="middle" className="fill-muted-foreground text-xs">Win Rate</text>
                        </>
                      );
                    })()}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <svg viewBox="0 0 280 180" className="h-full w-full">
                    {(() => {
                      const maxPnl = Math.max(...months.map(m => Math.abs(m.pnl)));
                      const h = 150, barW = 28, gap = 8;
                      return months.map((m, i) => {
                        const barH = (Math.abs(m.pnl) / maxPnl) * h * 0.8;
                        const y = m.pnl >= 0 ? h - barH : h;
                        return (
                          <g key={m.month}>
                            <motion.rect
                              x={i * (barW + gap) + 10}
                              initial={{ scaleY: 0, y: h }}
                              animate={{ scaleY: 1, y: 0, transition: { duration: 0.6, ease: easings.enter, delay: 0.2 + i * 0.08 } }}
                              style={{ originY: h / 2 }}
                              width={barW} height={Math.max(barH, 3)} rx="4"
                              fill={m.pnl >= 0 ? "var(--success)" : "var(--error)"}
                            />
                            <text x={i * (barW + gap) + barW / 2 + 10} y={h + 14}
                              textAnchor="middle" className="fill-muted-foreground" fontSize="9">
                              {m.month}
                            </text>
                          </g>
                        );
                      });
                    })()}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Goals Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGoals.slice(0, 3).map((goal, i) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: easings.enter, delay: 0.3 + i * 0.1 } }}
                  >
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{goal.title}</span>
                      <span className="text-muted-foreground">{goal.prefix ? "$" : ""}{goal.current}{goal.unit} / {goal.prefix ? "$" : ""}{goal.target}{goal.unit}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </DashboardLayout>
  );
}
