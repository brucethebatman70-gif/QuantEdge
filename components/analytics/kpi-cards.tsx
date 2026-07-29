"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/utils";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import type { AnalyticsKpi } from "@/lib/analytics/types";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

function AnimatedCounter({ value, format, prefix, suffix }: { value: number; format: AnalyticsKpi["format"]; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = value * eased;
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);

  const formatted = format === "currency"
    ? formatCurrency(display)
    : format === "percent"
    ? `${display >= 0 ? "+" : ""}${display.toFixed(1)}%`
    : formatNumber(Math.round(display));

  return <span ref={ref}>{prefix || ""}{formatted.replace(/^[+-]/, "")}{suffix || ""}</span>;
}

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {mockAnalyticsData.kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, duration: 0.4 }}
        >
          <Card className="group hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <p className="text-[11px] font-medium text-muted-foreground">{kpi.label}</p>
                <Sparkline data={kpi.sparkline} color={kpi.change >= 0 ? "var(--color-success, #10b981)" : "var(--color-error, #ef4444)"} />
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className={cn(
                  "text-lg font-bold tabular-nums",
                  kpi.value >= 0 ? "text-foreground" : "text-error"
                )}>
                  {kpi.prefix || ""}
                  <AnimatedCounter value={Math.abs(kpi.value)} format={kpi.format} prefix={kpi.prefix} suffix={kpi.suffix} />
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1">
                <span className={cn(
                  "inline-flex items-center text-[11px] font-medium",
                  kpi.inverse ? (kpi.change < 0 ? "text-success" : kpi.change > 0 ? "text-error" : "text-muted-foreground") : (kpi.change >= 0 ? "text-success" : "text-error")
                )}>
                  {kpi.change >= 0 ? "↑" : "↓"} {kpi.inverse ? Math.abs(kpi.change) : Math.abs(kpi.change)}{kpi.suffix || "%"}
                </span>
                <span className="text-[11px] text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
