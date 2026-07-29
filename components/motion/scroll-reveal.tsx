"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { scrollReveal, scrollRevealChildren, stagger } from "@/lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, visible: { transition: stagger(0.05) } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={scrollRevealChildren}
      className={className}
    >
      {children}
    </motion.div>
  );
}
