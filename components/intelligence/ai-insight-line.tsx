"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AiInsightLineProps {
  children: ReactNode;
  type?: "positive" | "warning" | "tip";
  className?: string;
}

const typeColors = {
  positive: "text-success",
  warning: "text-warning",
  tip: "text-[#06E0FF]",
};

const typeIcons = {
  positive: "✦",
  warning: "⚠",
  tip: "→",
};

export function AiInsightLine({ children, type = "tip", className }: AiInsightLineProps) {
  return (
    <div className={cn(
      "flex items-start gap-1.5 px-4 py-2 border-t border-white/[0.04] bg-white/[0.015]",
      "opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150",
      className
    )}>
      <span className={cn("text-[10px] mt-[1px] shrink-0", typeColors[type])}>
        {typeIcons[type]}
      </span>
      <p className={cn("text-[10px] leading-relaxed", typeColors[type])}>
        {children}
      </p>
    </div>
  );
}
