"use client";

import { cn } from "@/lib/cn";

interface TrendBadgeProps {
  value: number;
  label?: string;
  inverse?: boolean;
  className?: string;
}

export function TrendBadge({ value, label, inverse = false, className }: TrendBadgeProps) {
  const isPositive = inverse ? value < 0 : value >= 0;
  const isNegative = inverse ? value > 0 : value < 0;
  const absValue = Math.abs(value);

  return (
    <div
      className={cn(
        "group/trend relative inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] tabular-nums font-medium transition-all duration-300",
        isPositive && "text-success",
        isNegative && "text-error",
        (isPositive || isNegative) && "bg-white/[0.03]",
        className
      )}
    >
      <span className={cn(
        "transition-transform duration-300",
        "group-hover/trend:scale-110"
      )}>
        {isPositive ? "↑" : isNegative ? "↓" : "→"}
      </span>
      <span className="group-hover/trend:opacity-100 transition-opacity">
        {absValue.toFixed(1)}%
      </span>
      {label && (
        <span className="text-[9px] text-muted-foreground/40 hidden group-hover/trend:inline transition-opacity">
          {label}
        </span>
      )}
    </div>
  );
}
