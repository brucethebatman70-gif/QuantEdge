"use client";

import { useCountUp, formatCount } from "@/lib/hooks/use-count-up";
import { motion } from "framer-motion";
import { counterEnter } from "@/lib/motion";

interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
  className?: string;
}

export function AnimatedCounter({ end, prefix = "", suffix = "", decimals = 0, duration = 1.2, delay = 0, enabled = true, className }: AnimatedCounterProps) {
  const value = useCountUp({ end, duration, delay, enabled });

  return (
    <motion.span variants={counterEnter} initial="hidden" animate="visible" className={className}>
      {formatCount(value, prefix, suffix, decimals)}
    </motion.span>
  );
}
