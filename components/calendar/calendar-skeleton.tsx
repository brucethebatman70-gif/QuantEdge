"use client";

import { SkeletonLine, SkeletonBlock } from "@/components/loading/skeleton-primitives";
import { motion } from "framer-motion";

export function CalendarSkeleton() {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-4">
      <div className="flex items-center gap-2">
        <SkeletonLine width={160} height={18} />
        <SkeletonLine width={96} height={18} />
      </div>
      <div className="grid grid-cols-7 gap-px">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
          >
            <SkeletonLine width="100%" height={10} />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.008 }}
          >
            <SkeletonBlock width="100%" height="100%" className="aspect-square" rounded="lg" />
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonLine key={i} width={80} height={32} rounded="lg" />
        ))}
      </div>
    </div>
  );
}

export function CalendarSidebarSkeleton() {
  return (
    <div className="w-80 border-l border-border p-4 space-y-4">
      <SkeletonLine width={128} height={18} />
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <SkeletonBlock width="100%" height={64} rounded="lg" />
          </motion.div>
        ))}
      </div>
      <SkeletonLine width="100%" height={14} />
      <SkeletonLine width="75%" height={14} />
      <SkeletonLine width="50%" height={14} />
    </div>
  );
}
