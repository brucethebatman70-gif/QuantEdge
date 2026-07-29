"use client";

import { cn } from "@/lib/cn";

interface GradientDividerProps {
  variant?: "default" | "subtle" | "accent" | "label";
  orientation?: "horizontal" | "vertical";
  label?: string;
  className?: string;
}

export function GradientDivider({
  variant = "default",
  orientation = "horizontal",
  label,
  className,
}: GradientDividerProps) {
  if (variant === "label") {
    return (
      <div className={cn("divider-label", orientation === "vertical" && "flex-col", className)}>
        {orientation === "horizontal" ? (
          <>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-border" />
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground shrink-0">
              {label || ""}
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </>
        ) : (
          <>
            <span className="w-px flex-1 bg-gradient-to-b from-transparent to-border" />
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground shrink-0 [writing-mode:vertical-lr]">
              {label || ""}
            </span>
            <span className="w-px flex-1 bg-gradient-to-b from-border to-transparent" />
          </>
        )}
      </div>
    );
  }

  const variantClass = {
    default: "divider-gradient",
    subtle: "divider-light",
    accent: "divider-accent",
  }[variant];

  const orientClass = orientation === "vertical" ? "divider-gradient-vertical" : "";

  return <div className={cn(variantClass, orientClass, className)} />;
}
