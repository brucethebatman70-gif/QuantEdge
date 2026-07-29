"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type GlowVariant = "default" | "success" | "analytics" | "ai" | "warning";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: GlowVariant;
  disableAnimation?: boolean;
}

function Card({ className, children, glow = "default", disableAnimation = false, ...props }: CardProps) {
  const glowClass = glow === "success" ? "glass-glow-success"
    : glow === "analytics" ? "glass-glow-analytics"
    : glow === "ai" ? "glass-glow-ai"
    : glow === "warning" ? "glass-glow-warning"
    : "";

  if (disableAnimation) {
    return (
      <div
        className={cn(
          "glass-card glass-card-hover",
          glowClass,
          className
        )}
      >
        <div className="glass-card-inner-glow" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.015, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.985, transition: { duration: 0.05 } }}
      className={cn(
        "glass-card glass-card-hover",
        glowClass,
        className
      )}
      {...(props as Record<string, unknown>)}
    >
      <div className="glass-card-inner-glow" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-5 pb-3", className)} {...props} />;
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold tracking-tight", className)} {...props} />;
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-2", className)} {...props} />;
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-5 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
export type { GlowVariant };
