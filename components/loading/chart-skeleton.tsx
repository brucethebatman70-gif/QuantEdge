"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { SkeletonLine, SkeletonBlock } from "./skeleton-primitives";

interface ChartSkeletonProps {
  className?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  glow?: "default" | "success" | "analytics" | "ai" | "warning";
  stages?: number;
}

export function ChartSkeleton({
  className,
  height = 380,
  title,
  subtitle,
  stages = 3,
}: ChartSkeletonProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage >= stages) return;
    const delays = [200, 400, 600];
    const timer = setTimeout(() => setStage((s) => s + 1), delays[stage] || 400);
    return () => clearTimeout(timer);
  }, [stage, stages]);

  return (
    <div className={cn("glass-card glass-card-hover overflow-hidden", className)}>
      <div className="glass-card-inner-glow" />
      <div className="relative z-10">
        {(title || subtitle) && (
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div className="space-y-1">
              <SkeletonLine width={title ? 160 : 0} height={12} />
              {subtitle && <SkeletonLine width={220} height={10} />}
            </div>
            <SkeletonLine width={80} height={16} rounded="full" />
          </div>
        )}

        <div className="px-5 pb-4" style={{ height }}>
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="container"
                className="w-full h-full rounded-xl border border-border/30 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonBlock width="90%" height="80%" rounded="lg" />
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="grid"
                className="w-full h-full flex flex-col justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex-1 relative">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonLine
                      key={i}
                      width="100%"
                      height={1}
                      className="absolute left-0 right-0 opacity-20"
                      style={{ top: `${(i + 1) * 20}%` }}
                    />
                  ))}
                  <SkeletonLine
                    width="100%"
                    height={1}
                    className="absolute bottom-0 opacity-30"
                  />
                </div>
              </motion.div>
            )}

            {stage >= 2 && (
              <motion.div
                key="line"
                className="w-full h-full flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex-1 relative">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-t border-border/10"
                      style={{ top: `${(i + 1) * 20}%` }}
                    />
                  ))}

                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-skel-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.04" />
                        <stop offset="50%" stopColor="currentColor" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
                      </linearGradient>
                      <linearGradient id="chart-skel-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,160 C40,150 60,170 100,120 C140,70 160,90 200,80 C240,70 280,100 320,60 C360,20 380,40 400,30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity="0.08"
                    />
                    <path
                      d="M0,160 C40,150 60,170 100,120 C140,70 160,90 200,80 C240,70 280,100 320,60 C360,20 380,40 400,30 L400,200 L0,200 Z"
                      fill="url(#chart-skel-fill)"
                    />
                  </svg>
                </div>

                <div className="flex justify-between mt-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonLine key={i} width={32} height={8} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {stage >= 2 && (
          <motion.div
            className="flex items-center gap-4 px-5 pb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <SkeletonLine width={80} height={10} />
            <SkeletonLine width={60} height={10} />
            <SkeletonLine width={70} height={10} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
