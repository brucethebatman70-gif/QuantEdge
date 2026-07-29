"use client";

import { cn } from "@/lib/cn";

interface TooltipRow {
  label: string;
  value: string | number;
  color?: string;
  prefix?: string;
  suffix?: string;
}

interface ChartTooltipContentProps {
  rows: TooltipRow[];
  timestamp?: string;
  className?: string;
}

export function ChartTooltipContent({ rows, timestamp, className }: ChartTooltipContentProps) {
  return (
    <div className={cn("glass-tooltip px-3 py-2 min-w-[160px]", className)}>
      {timestamp && (
        <p className="text-[10px] text-muted-foreground/50 mb-1.5 font-mono">{timestamp}</p>
      )}
      <div className="space-y-1">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {row.color && (
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: row.color }}
                />
              )}
              <span className="text-[11px] text-muted-foreground/70">{row.label}</span>
            </div>
            <span className="text-[11px] font-medium tabular-nums opacity-80">
              {row.prefix || ""}{row.value}{row.suffix || ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function chartTooltipStyle(baseGlass = true) {
  if (baseGlass) {
    return {
      contentStyle: {
        background: "transparent",
        border: "none",
        borderRadius: 0,
        padding: 0,
        boxShadow: "none",
      },
      wrapperStyle: { zIndex: 100 },
    };
  }
  return {};
}

export const defaultTooltipProps = {
  cursor: { stroke: "rgba(255,255,255,0.08)", strokeWidth: 1, strokeDasharray: "4 4" },
};
