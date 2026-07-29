"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface EmptyStateShellProps {
  illustration: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    icon?: ReactNode;
    variant?: "primary" | "secondary";
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
  tip?: string;
  estimatedTime?: string;
  className?: string;
  compact?: boolean;
  animated?: boolean;
}

export function EmptyStateShell({
  illustration,
  title,
  description,
  action,
  secondaryAction,
  tip,
  estimatedTime,
  className,
  compact = false,
  animated = true,
}: EmptyStateShellProps) {
  const Wrapper = animated ? motion.div : "div";
  const animProps = animated ? {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  } : {};

  return (
    <Wrapper
      {...animProps}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "px-4 py-8" : "px-8 py-16",
        className
      )}
    >
      <motion.div
        initial={animated ? { scale: 0.9, opacity: 0 } : undefined}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        transition={animated ? { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 } : undefined}
        className="mb-6"
      >
        <div className="relative">
          {illustration}
          <div className="absolute -inset-4 bg-gradient-radial from-primary/5 to-transparent rounded-full opacity-50" />
        </div>
      </motion.div>

      <h3 className={cn("font-bold tracking-tight opacity-90", compact ? "text-base" : "text-xl")}>
        {title}
      </h3>

      {description && (
        <p className={cn("text-muted-foreground/60 mt-2 max-w-md leading-relaxed", compact ? "text-xs" : "text-sm")}>
          {description}
        </p>
      )}

      {estimatedTime && (
        <p className="text-[10px] text-muted-foreground/40 mt-1.5 font-mono">
          Takes ~{estimatedTime}
        </p>
      )}

      {action && (
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={action.onClick}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg text-xs font-medium px-4 py-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
              action.variant === "secondary"
                ? "bg-white/[0.05] hover:bg-white/[0.08] text-foreground/70"
                : "bg-primary/20 hover:bg-primary/30 text-primary"
            )}
          >
            {action.icon}
            {action.label}
          </button>
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-1.5 rounded-lg text-xs font-medium px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] text-foreground/70 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}

      {tip && (
        <p className="text-[10px] text-muted-foreground/40 mt-6 max-w-xs leading-relaxed border border-white/[0.04] rounded-lg px-3 py-2 bg-white/[0.02]">
          <span className="text-primary/60 font-medium">Tip: </span>
          {tip}
        </p>
      )}
    </Wrapper>
  );
}
