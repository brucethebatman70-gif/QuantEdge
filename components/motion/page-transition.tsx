"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

export function PageTransition({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
