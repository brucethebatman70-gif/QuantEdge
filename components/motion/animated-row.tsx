"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

interface AnimatedRowProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export function AnimatedRow({ children, index, className }: AnimatedRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easings.enter, delay: index * 0.015 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
