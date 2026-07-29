"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { useCalendarStore } from "@/lib/calendar/store";
import { HEATMAP_METRIC_LABELS } from "@/lib/calendar/types";

const METRICS = ["pnl", "winRate", "frequency", "discipline", "consistency"] as const;

export function CalendarHeatmap() {
  const { days, heatmapMetric, setHeatmapMetric } = useCalendarStore();

  const months = useMemo(() => {
    const grouped: { name: string; days: { date: string; value: number }[] }[] = [];
    const monthMap = new Map<string, { date: string; value: number }[]>();

    days.forEach((day) => {
      const monthKey = day.date.slice(0, 7);
      if (!monthMap.has(monthKey)) monthMap.set(monthKey, []);

      let value = 0;
      switch (heatmapMetric) {
        case "pnl": value = day.pnl; break;
        case "winRate": value = day.trades > 0 ? (day.wins / day.trades) * 100 : 0; break;
        case "frequency": value = day.trades; break;
        case "discipline": value = day.discipline * 10; break;
        case "consistency": value = day.trades > 0 ? 100 - Math.abs(50 - (day.wins / day.trades) * 100) : 0; break;
      }
      monthMap.get(monthKey)!.push({ date: day.date, value });
    });

    monthMap.forEach((dayArr, key) => {
      const [y, m] = key.split("-").map(Number);
      const name = new Date(y, m - 1).toLocaleDateString("en-US", { month: "short" });
      grouped.push({ name, days: dayArr });
    });

    return grouped;
  }, [days, heatmapMetric]);

  const allValues = days.map((d) => {
    switch (heatmapMetric) {
      case "pnl": return d.pnl;
      case "winRate": return d.trades > 0 ? (d.wins / d.trades) * 100 : 0;
      case "frequency": return d.trades;
      case "discipline": return d.discipline * 10;
      case "consistency": return d.trades > 0 ? 100 - Math.abs(50 - (d.wins / d.trades) * 100) : 0;
      default: return 0;
    }
  });
  const maxAbs = Math.max(...allValues.map(Math.abs), 1);

  const getColor = (value: number) => {
    const intensity = Math.min(1, Math.abs(value) / maxAbs);
    const alpha = 0.1 + intensity * 0.7;
    if (heatmapMetric === "pnl") {
      return value >= 0 ? `rgba(16, 185, 129, ${alpha})` : `rgba(239, 68, 68, ${alpha})`;
    }
    return value > 0 ? `rgba(0, 212, 170, ${alpha})` : `rgba(113, 113, 122, ${alpha * 0.3})`;
  };

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.Grid3x3 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Heatmap</span>
        </div>
        <div className="flex gap-1">
          {METRICS.map((metric) => (
            <button
              key={metric}
              onClick={() => setHeatmapMetric(metric)}
              className={`px-2 py-1 text-[10px] rounded-md transition-colors ${
                heatmapMetric === metric
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {HEATMAP_METRIC_LABELS[metric]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {months.map((month) => (
          <div key={month.name} className="space-y-1">
            <span className="text-[10px] text-muted-foreground block text-center">{month.name}</span>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }, (_, wd) => (
                month.days
                  .filter((_, i) => i % 7 === wd)
                  .map((d, i) => (
                    <motion.div
                      key={`${d.date}-${wd}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.01 }}
                      className="w-3 h-3 rounded-sm cursor-pointer"
                      style={{ backgroundColor: getColor(d.value) }}
                      title={`${d.date}: ${d.value.toFixed(0)}`}
                    />
                  ))
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
