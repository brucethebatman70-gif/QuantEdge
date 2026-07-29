"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CardShimmer } from "./shimmer";
import { motion } from "framer-motion";

interface IntelligenceCardProps {
  children: ReactNode;
  className?: string;
  glow?: "default" | "success" | "analytics" | "ai" | "warning";
  loading?: boolean;
  empty?: boolean;
  emptyState?: ReactNode;
  onClick?: () => void;
}

export function IntelligenceCard({
  children,
  className,
  glow = "default",
  loading = false,
  empty = false,
  emptyState,
  onClick,
}: IntelligenceCardProps) {
  const glowClass = glow === "success" ? "glass-glow-success"
    : glow === "analytics" ? "glass-glow-analytics"
    : glow === "ai" ? "glass-glow-ai"
    : glow === "warning" ? "glass-glow-warning"
    : "";

  if (loading) {
    return <CardShimmer />;
  }

  if (empty && emptyState) {
    return (
      <div className={cn("glass-card group relative", glowClass, className)}>
        <div className="glass-card-inner-glow" />
        <div className="relative z-10">
          {emptyState}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "glass-card glass-card-hover group relative cursor-default",
        onClick && "cursor-pointer",
        glowClass,
        className
      )}
      onClick={onClick}
    >
      <div className="glass-card-inner-glow" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
