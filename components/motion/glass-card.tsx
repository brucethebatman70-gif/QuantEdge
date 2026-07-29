"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cardEnter } from "@/lib/motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
}

export function GlassCard({ children, className = "", delay = 0, as = "div" }: GlassCardProps) {
  const Component = motion[as];
  return (
    <Component
      variants={cardEnter}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -4,
        scale: 1.015,
        borderColor: "var(--border-hover, rgba(255,255,255,0.15))",
        boxShadow: "0 12px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.06)",
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`relative rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-colors ${className}`}
      style={{ viewTransitionName: "card" }}
    >
      {children}
    </Component>
  );
}
