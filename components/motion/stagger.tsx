"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, enter } from "@/lib/motion";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  interval?: number;
  delayFirst?: number;
  once?: boolean;
}

export function Stagger({ children, className, interval = 0.04, delayFirst = 0 }: StaggerProps) {
  return (
    <motion.div
      variants={staggerContainer(interval, delayFirst)}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={staggerItem(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Scroll-triggered stagger ── */
export function StaggerScroll({ children, className, interval = 0.04, delayFirst = 0.1 }: StaggerProps) {
  return (
    <motion.div
      variants={staggerContainer(interval, delayFirst)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItemScroll({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={staggerItem(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
