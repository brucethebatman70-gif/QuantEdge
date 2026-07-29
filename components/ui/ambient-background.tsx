"use client";

import { cn } from "@/lib/cn";

interface AmbientBackgroundProps {
  variant?: "primary" | "ai" | "analytics" | "muted";
  className?: string;
}

export function AmbientBackground({ variant = "primary", className }: AmbientBackgroundProps) {
  const variantClass = {
    primary: "bg-ambient-primary",
    ai: "bg-ambient-ai",
    analytics: "bg-ambient-analytics",
    muted: "bg-gradient-to-b from-white/[0.02] to-transparent",
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className={cn("absolute inset-0", variantClass)} />
    </div>
  );
}
