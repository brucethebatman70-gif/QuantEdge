"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";

function getIntensity(pnl: number, maxAbs: number): string {
  if (pnl === 0) return "bg-muted";
  const ratio = Math.abs(pnl) / maxAbs;
  if (pnl > 0) {
    if (ratio > 0.75) return "bg-success/70";
    if (ratio > 0.5) return "bg-success/50";
    if (ratio > 0.25) return "bg-success/30";
    return "bg-success/15";
  }
  if (ratio > 0.75) return "bg-error/70";
  if (ratio > 0.5) return "bg-error/50";
  if (ratio > 0.25) return "bg-error/30";
  return "bg-error/15";
}

export function CalendarHeatmap() {
  const [month, setMonth] = useState(6);

  const { days, maxAbs, totalPnl, totalTrades, avgWinRate } = useMemo(() => {
    const monthDays = mockAnalyticsData.calendarData.filter((d) => {
      const m = new Date(d.date).getMonth();
      return m === month;
    });
    const max = Math.max(...monthDays.map((d) => Math.abs(d.pnl)), 1);
    const total = monthDays.reduce((s, d) => s + d.pnl, 0);
    const trades = monthDays.reduce((s, d) => s + d.trades, 0);
    const wr = monthDays.filter((d) => d.trades > 0).reduce((s, d, _, arr) => s + d.winRate / arr.length, 0);
    return { days: monthDays, maxAbs: max, totalPnl: total, totalTrades: trades, avgWinRate: wr };
  }, [month]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const firstDay = days.length > 0 ? new Date(days[0].date).getDay() : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Calendar Heatmap</CardTitle>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMonth((m) => (m > 0 ? m - 1 : 11))}
              className="rounded-md px-2 py-1 text-xs hover:bg-muted"
            >
              ←
            </button>
            <span className="w-16 text-center text-sm font-medium">{monthNames[month]}</span>
            <button
              onClick={() => setMonth((m) => (m < 11 ? m + 1 : 0))}
              className="rounded-md px-2 py-1 text-xs hover:bg-muted"
            >
              →
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 grid grid-cols-7 gap-1 text-[10px] text-muted-foreground">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square rounded-md bg-transparent" />
          ))}
          {days.map((d) => {
            const dt = new Date(d.date);
            return (
              <div
                key={d.date}
                className={cn(
                  "group relative flex aspect-square cursor-pointer items-center justify-center rounded-md text-[11px] font-medium transition-all hover:scale-110 hover:shadow-md",
                  getIntensity(d.pnl, maxAbs),
                  d.pnl > 0 ? "text-success-foreground" : d.pnl < 0 ? "text-error-foreground" : "text-muted-foreground"
                )}
              >
                <span>{dt.getDate()}</span>
                <div className="pointer-events-none absolute -top-1 left-1/2 z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border bg-popover px-2.5 py-1.5 text-xs shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="font-medium">{formatCurrency(d.pnl)}</p>
                  <p className="text-[10px] text-muted-foreground">{d.trades} trades · {d.winRate}% WR</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span>{totalTrades} trades</span>
          <span className={cn("font-medium", totalPnl >= 0 ? "text-success" : "text-error")}>
            {formatCurrency(totalPnl)}
          </span>
          <span>{avgWinRate.toFixed(0)}% WR</span>
        </div>
      </CardContent>
    </Card>
  );
}
