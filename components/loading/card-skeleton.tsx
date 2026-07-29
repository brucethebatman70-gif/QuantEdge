"use client";

import { cn } from "@/lib/cn";
import { SkeletonLine, SkeletonBlock, SkeletonCircle, SkeletonBadge } from "./skeleton-primitives";
import { motion } from "framer-motion";

interface CardSkeletonProps {
  className?: string;
  layout?: "default" | "intelligence" | "kpi" | "market" | "emotion" | "achievement" | "portfolio";
}

export function CardSkeleton({ className, layout = "default" }: CardSkeletonProps) {
  if (layout === "intelligence") {
    return (
      <div className={cn("glass-card p-4 space-y-3", className)}>
        <div className="glass-card-inner-glow" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <SkeletonLine width="50%" height={10} />
            <SkeletonCircle size={20} />
          </div>
          <SkeletonLine width="35%" height={28} />
          <SkeletonLine width="20%" height={10} />
          <SkeletonBlock height={32} rounded="md" />
        </div>
      </div>
    );
  }

  if (layout === "kpi") {
    return (
      <div className="glass-card p-4 space-y-3">
        <div className="glass-card-inner-glow" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <SkeletonLine width="40%" height={10} />
            <SkeletonBadge width={40} height={16} />
          </div>
          <SkeletonLine width="55%" height={26} />
          <SkeletonLine width="30%" height={8} />
          <SkeletonBlock height={32} rounded="sm" />
        </div>
      </div>
    );
  }

  if (layout === "market") {
    return (
      <div className="glass-card p-4 space-y-3">
        <div className="glass-card-inner-glow" />
        <div className="relative z-10 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonCircle size={6} />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between">
                  <SkeletonLine width="30%" height={10} />
                  <SkeletonLine width="20%" height={10} />
                </div>
                <SkeletonBlock height={4} rounded="full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "emotion") {
    return (
      <div className="glass-card p-4 space-y-3">
        <div className="glass-card-inner-glow" />
        <div className="relative z-10 space-y-3">
          <SkeletonLine width="35%" height={10} />
          <SkeletonBlock height={48} rounded="lg" />
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <SkeletonLine width="100%" height={6} />
                <SkeletonLine width="60%" height={6} className="mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "achievement") {
    return (
      <div className="glass-card p-4 space-y-3">
        <div className="glass-card-inner-glow" />
        <div className="relative z-10 space-y-3">
          <SkeletonLine width="40%" height={10} />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white/[0.03]">
                <SkeletonCircle size={24} />
                <SkeletonLine width="70%" height={8} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "portfolio") {
    return (
      <div className="glass-card p-4 space-y-3">
        <div className="glass-card-inner-glow" />
        <div className="relative z-10 space-y-3">
          <SkeletonLine width="40%" height={10} />
          <SkeletonBlock height={60} rounded="lg" />
          <div className="flex justify-between">
            <SkeletonLine width="25%" height={10} />
            <SkeletonLine width="25%" height={10} />
            <SkeletonLine width="25%" height={10} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass-card p-4 space-y-3", className)}>
      <div className="glass-card-inner-glow" />
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <SkeletonLine width="45%" height={12} />
          <SkeletonCircle size={24} />
        </div>
        <SkeletonLine width="60%" height={28} />
        <SkeletonLine width="35%" height={12} />
      </div>
    </div>
  );
}

export function CardSkeletonGrid({
  count = 4,
  columns = 4,
  layout = "default",
  className,
}: CardSkeletonProps & { count?: number; columns?: number }) {
  return (
    <motion.div
      className={cn(
        "grid gap-4",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        columns === 5 && "sm:grid-cols-2 lg:grid-cols-5",
        columns === 6 && "sm:grid-cols-3 lg:grid-cols-6",
        className
      )}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.03 } },
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <CardSkeleton layout={layout} />
        </motion.div>
      ))}
    </motion.div>
  );
}
