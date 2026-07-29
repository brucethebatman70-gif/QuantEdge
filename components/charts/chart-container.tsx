"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChartContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  rightAction?: ReactNode;
  glow?: "default" | "success" | "analytics" | "ai" | "warning";
  height?: number | string;
}

export function ChartContainer({
  children,
  title,
  subtitle,
  className,
  rightAction,
  glow = "default",
  height = 320,
}: ChartContainerProps) {
  const glowClass = glow === "success" ? "glass-glow-success"
    : glow === "analytics" ? "glass-glow-analytics"
    : glow === "ai" ? "glass-glow-ai"
    : glow === "warning" ? "glass-glow-warning"
    : "";

  return (
    <div className={cn("glass-card glass-card-hover", glowClass, className)}>
      <div className="glass-card-inner-glow" />
      <div className="relative z-10">
        {(title || rightAction) && (
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div>
              {title && <h3 className="text-sm font-semibold opacity-80">{title}</h3>}
              {subtitle && <p className="text-xs text-muted-foreground/60 mt-0.5">{subtitle}</p>}
            </div>
            {rightAction && <div className="flex items-center gap-2">{rightAction}</div>}
          </div>
        )}
        <div className="px-1 pb-1" style={{ height: typeof height === "number" ? height : height }}>
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
