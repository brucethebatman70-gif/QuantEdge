"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface LegendItem {
  id: string;
  label: string;
  color: string;
  value?: string | number;
  active?: boolean;
}

interface InteractiveLegendProps {
  items: LegendItem[];
  onToggle?: (id: string) => void;
  onHover?: (id: string | null) => void;
  layout?: "horizontal" | "vertical";
  size?: "sm" | "md";
}

export function InteractiveLegend({
  items,
  onToggle,
  onHover,
  layout = "horizontal",
  size = "sm",
}: InteractiveLegendProps) {
  const isSm = size === "sm";

  return (
    <div
      className={cn(
        "flex gap-1",
        layout === "vertical" ? "flex-col" : "flex-row flex-wrap"
      )}
    >
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onToggle?.(item.id)}
          onMouseEnter={() => onHover?.(item.id)}
          onMouseLeave={() => onHover?.(null)}
          className={cn(
            "flex items-center gap-1.5 rounded-md transition-colors",
            isSm ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
            item.active !== false
              ? "opacity-90 hover:opacity-100 hover:bg-white/5"
              : "opacity-30 hover:opacity-50"
          )}
          layout
          layoutId={`legend-${item.id}`}
        >
          <span
            className={cn("rounded-full shrink-0", isSm ? "h-1.5 w-1.5" : "h-2 w-2")}
            style={{ backgroundColor: item.color }}
          />
          <span className="font-medium opacity-80">{item.label}</span>
          {item.value !== undefined && (
            <span className="tabular-nums text-muted-foreground/50 font-mono">
              {item.value}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
