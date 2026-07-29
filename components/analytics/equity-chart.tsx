"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { ChartContainer } from "@/components/charts/chart-container";
import { EquityCurveChart } from "@/components/charts/equity-curve-chart";
import { InteractiveLegend } from "@/components/charts/interactive-legend";

type Series = "equity" | "balance" | "drawdown";

export function EquityChart() {
  const [series, setSeries] = useState<Series>("equity");
  const [zoom, setZoom] = useState<[number, number]>([0, mockAnalyticsData.equityCurve.length - 1]);

  const data = useMemo(() => {
    const sliced = mockAnalyticsData.equityCurve.slice(zoom[0], zoom[1] + 1);
    return sliced.map((p) => ({
      date: formatDate(p.date),
      equity: p.equity,
      balance: p.balance,
      drawdown: p.drawdown,
    }));
  }, [zoom]);

  const seriesOptions = [
    { id: "equity", label: "Equity", color: "#00D4AA", active: series === "equity" },
    { id: "balance", label: "Balance", color: "#06E0FF", active: series === "balance" },
    { id: "drawdown", label: "Drawdown", color: "#ef4444", active: series === "drawdown" },
  ];

  return (
    <ChartContainer
      title="Equity Analytics"
      subtitle="Portfolio equity, balance & drawdown analysis"
      glow="success"
      height={420}
      rightAction={
        <div className="flex items-center gap-1">
          {seriesOptions.map((opt) => (
            <Button
              key={opt.id}
              variant={series === opt.id ? "secondary" : "ghost"}
              size="xs"
              onClick={() => setSeries(opt.id as Series)}
              className="text-[11px]"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      }
    >
      {series === "drawdown" ? (
        <EquityCurveChart data={data} height={340} showDrawdown gradientId="eq-dd" />
      ) : (
        <EquityCurveChart
          data={data}
          height={340}
          showBalance={series === "equity"}
          gradientId={`eq-${series}`}
        />
      )}
      <div className="flex items-center justify-between border-t border-border/50 px-4 pb-3 pt-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#00D4AA]" />
            Growth: +18.4%
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#06E0FF]" />
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
    </ChartContainer>
  );
}
