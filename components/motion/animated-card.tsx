"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  disableHover?: boolean;
}

export function AnimatedCard({ children, className, delay = 0, disableHover = false }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: easings.enter, delay }}
      whileHover={disableHover ? undefined : { y: -4, scale: 1.015, transition: { duration: 0.25, ease: easings.hover } }}
      whileTap={{ scale: 0.985, transition: { duration: 0.05 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
