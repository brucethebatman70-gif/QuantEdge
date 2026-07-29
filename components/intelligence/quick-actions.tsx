"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface QuickAction {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <div className={cn(
      "flex items-center gap-1",
      "opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0",
      className
    )}>
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] transition-all duration-200"
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
}
