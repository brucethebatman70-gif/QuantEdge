"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export function Skeleton({ className = "", width, height, rounded = true }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-muted via-muted/60 to-muted bg-[length:200%_100%] ${rounded ? "rounded-lg" : ""} ${className}`}
      style={{ width, height }}
      variants={{
        initial: { backgroundPosition: "200% 0" },
        animate: { backgroundPosition: "-200% 0", transition: { duration: 1.5, repeat: Infinity, ease: "linear" } },
      }}
      initial="initial"
      animate="animate"
    />
  );
}

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border bg-card p-5 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Skeleton width="40%" height={16} />
        <Skeleton width={24} height={24} rounded />
      </div>
      <Skeleton width="60%" height={28} />
      <Skeleton width="30%" height={14} />
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border/50">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} width={`${100 / columns}%`} height={14} className="flex-1" />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton width={200} height={24} />
      <Skeleton width={320} height={14} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
