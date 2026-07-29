"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { SkeletonLine, SkeletonBadge } from "./skeleton-primitives";

interface TableSkeletonProps {
  className?: string;
  rows?: number;
  columns?: number;
  columnWidths?: string[];
  hasCheckbox?: boolean;
  hasBadge?: boolean;
}

export function TableSkeleton({
  className,
  rows = 6,
  columns = 4,
  columnWidths,
  hasCheckbox = false,
  hasBadge = false,
}: TableSkeletonProps) {
  const widths = columnWidths || Array.from({ length: columns }, () => `${100 / columns}%`);

  return (
    <div className={cn("glass-table", className)}>
      <table className="w-full">
        <thead>
          <tr>
            {hasCheckbox && <th className="px-4 py-3 w-10"><SkeletonLine width={14} height={14} rounded="sm" /></th>}
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <SkeletonLine width={widths[i] || "60%"} height={10} />
              </th>
            ))}
            <th className="px-4 py-3 w-16"><SkeletonLine width={40} height={10} /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <motion.tr
              key={rowIdx}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.3, delay: rowIdx * 0.05, ease: [0.22, 1, 0.36, 1] },
              }}
              className="border-b border-border/50 last:border-b-0"
            >
              {hasCheckbox && (
                <td className="px-4 py-3">
                  <SkeletonLine width={14} height={14} rounded="sm" />
                </td>
              )}
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-3">
                  {hasBadge && colIdx === 0 ? (
                    <SkeletonBadge width={60} height={18} />
                  ) : (
                    <SkeletonLine
                      width={widths[colIdx] || `${60 + Math.random() * 30}%`}
                      height={11}
                    />
                  )}
                </td>
              ))}
              <td className="px-4 py-3">
                <SkeletonLine width={24} height={6} />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TabularSkeleton({
  className,
  rows = 6,
}: {
  className?: string;
  rows?: number;
}) {
  return (
    <div className={cn("glass-card p-4", className)}>
      <div className="glass-card-inner-glow" />
      <div className="relative z-10 space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.25, delay: i * 0.04 },
            }}
            className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-white/[0.02]"
          >
            <SkeletonLine width="30%" height={11} />
            <SkeletonLine width="20%" height={11} />
            <SkeletonLine width="15%" height={11} className="ml-auto" />
            <SkeletonLine width="10%" height={11} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
