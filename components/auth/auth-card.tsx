"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full max-w-sm rounded-2xl border bg-card p-8 shadow-lg",
        "backdrop-blur-xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}