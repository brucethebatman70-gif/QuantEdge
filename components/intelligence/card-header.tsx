"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardHeaderProps {
  title: string;
  status?: "live" | "updating" | "excellent" | "warning" | "risk" | "ai-active";
  rightAction?: ReactNode;
}

const statusConfig = {
  live: { label: "Live", color: "bg-success", pulse: true },
  updating: { label: "Updating", color: "bg-[#06E0FF]", pulse: true },
  excellent: { label: "Excellent", color: "bg-success", pulse: false },
  warning: { label: "Warning", color: "bg-warning", pulse: true },
  risk: { label: "Risk", color: "bg-error", pulse: true },
  "ai-active": { label: "AI Active", color: "bg-[#8b5cf6]", pulse: true },
};

export function CardHeader({ title, status, rightAction }: CardHeaderProps) {
  const cfg = status ? statusConfig[status] : null;

  return (
    <div className="flex items-center justify-between px-4 pt-3.5 pb-1.5">
      <div className="flex items-center gap-2">
        {cfg && (
          <span className="flex items-center gap-1.5">
            <span className={cn(
              "h-1.5 w-1.5 rounded-full",
              cfg.color,
              cfg.pulse && "animate-pulse"
            )} />
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-medium">
              {cfg.label}
            </span>
          </span>
        )}
        <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-semibold">
          {title}
        </h3>
      </div>
      {rightAction && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {rightAction}
        </div>
      )}
    </div>
  );
}
