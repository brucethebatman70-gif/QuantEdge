"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

type SyncStatus = "synced" | "syncing" | "error";

interface OptimisticCardProps {
  children: React.ReactNode;
  className?: string;
  optimistic?: boolean;
}

export function OptimisticCard({ children, className, optimistic = true }: OptimisticCardProps) {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("synced");

  const simulateSync = useCallback(async () => {
    if (!optimistic) return;
    setSyncStatus("syncing");
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    setSyncStatus(Math.random() > 0.1 ? "synced" : "error");
  }, [optimistic]);

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        {syncStatus === "syncing" && (
          <motion.div
            className="absolute top-2 right-2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="text-[9px] text-primary/60 font-medium">saving</span>
            </div>
          </motion.div>
        )}
        {syncStatus === "error" && (
          <motion.div
            className="absolute top-2 right-2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button
              onClick={simulateSync}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-error/10 border border-error/20 hover:bg-error/20 transition-colors"
            >
              <span className="text-[9px] text-error/60 font-medium">retry</span>
            </button>
          </motion.div>
        )}
        {syncStatus === "synced" && (
          <motion.div
            className="absolute top-2 right-2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-success/40" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
