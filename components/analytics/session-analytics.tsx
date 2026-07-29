"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";

const sessionLabels: Record<string, string> = {
  asian: "Asian",
  london: "London",
  newyork: "New York",
  overlap: "Overlap",
};

const sessionColors: Record<string, string> = {
  asian: "#f59e0b",
  london: "#6366f1",
  newyork: "#10b981",
  overlap: "#06b6d4",
};

function getHeatColor(winRate: number): string {
  if (winRate >= 70) return "bg-success/20 text-success border-success/30";
  if (winRate >= 60) return "bg-warning/20 text-warning border-warning/30";
  return "bg-error/20 text-error border-error/30";
}

export function SessionAnalytics() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Session Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mockAnalyticsData.sessionPerformance.map((s) => (
            <button
              key={s.session}
              onClick={() => setSelected(selected === s.session ? null : s.session)}
              className={cn(
                "rounded-xl border p-3 text-left transition-all duration-200",
                selected === s.session
                  ? "border-primary/50 bg-primary/5 shadow-sm"
                  : "border-border hover:border-border/80 hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sessionColors[s.session] }} />
                <span className="text-sm font-medium">{sessionLabels[s.session]}</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={cn("text-lg font-bold", s.pnl >= 0 ? "text-success" : "text-error")}>
                  {formatCurrency(s.pnl)}
                </span>
                <Badge variant={s.winRate >= 68 ? "success" : s.winRate >= 62 ? "warning" : "secondary"} className="text-[10px] px-1.5">
                  {s.winRate.toFixed(0)}%
                </Badge>
              </div>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{s.trades} trades · {formatCurrency(s.avgPnl)} avg</p>

              {selected === s.session && (
                <div className="mt-3 animate-fade-in border-t border-border/50 pt-3">
                  <p className="mb-2 text-[10px] font-medium text-muted-foreground">Hourly Heatmap</p>
                  <div className="grid grid-cols-4 gap-1">
                    {s.hourlyData.map((h) => (
                      <div
                        key={h.hour}
                        className={cn(
                          "rounded border px-1.5 py-1 text-center text-[10px]",
                          getHeatColor(h.winRate)
                        )}
                      >
                        <div className="font-medium">{h.hour}:00</div>
                        <div>{h.winRate}%</div>
                        <div className="text-[8px] opacity-70">{h.volume}t</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
