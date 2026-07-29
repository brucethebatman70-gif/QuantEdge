"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface StageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ProgressiveStage({ children, className, delay = 0, duration = 0.5 }: StageProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function ProgressiveLoader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}

export function StaggerFade({
  children,
  className,
  interval = 0.04,
}: {
  children: ReactNode;
  className?: string;
  interval?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: interval } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
