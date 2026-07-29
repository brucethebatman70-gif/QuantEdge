"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { SkeletonLine } from "./skeleton-primitives";

interface AiLoadingProps {
  className?: string;
  stages?: string[];
  onComplete?: () => void;
  autoProgress?: boolean;
}

const DEFAULT_STAGES = [
  { label: "Analyzing", icon: "⟳" },
  { label: "Reading Journal", icon: "📖" },
  { label: "Calculating Risk", icon: "∑" },
  { label: "Generating Insights", icon: "✦" },
  { label: "Preparing Report", icon: "→" },
];

export function AiLoading({
  className,
  stages: customStages,
  onComplete,
  autoProgress = true,
}: AiLoadingProps) {
  const stages = customStages?.map((s) => ({ label: s, icon: "⟳" })) || DEFAULT_STAGES;
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoProgress) return;
    if (currentStage >= stages.length) {
      onComplete?.();
      return;
    }

    const stageDuration = 1800 + Math.random() * 1200;
    const interval = 50;
    const steps = stageDuration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const newProgress = Math.min((step / steps) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentStage((s) => s + 1);
          setProgress(0);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentStage, autoProgress, onComplete, stages.length]);

  if (currentStage >= stages.length) return null;

  return (
    <div className={cn("glass-card p-4", className)}>
      <div className="glass-card-inner-glow" />
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-xs text-muted-foreground/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {stages[currentStage].icon}
          </motion.span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentStage}
              className="text-xs font-medium text-muted-foreground/80"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {stages[currentStage].label}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/60 to-primary/30"
            style={{ width: `${progress}%` }}
            layout
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="flex gap-1.5">
          {stages.slice(0, currentStage).map((_, i) => (
            <motion.div
              key={i}
              className="h-1 flex-1 rounded-full bg-primary/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
          <motion.div
            className="h-1 flex-1 rounded-full bg-primary/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {Array.from({ length: stages.length - currentStage - 1 }).map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-muted" />
          ))}
        </div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <SkeletonLine width="35%" height={8} />
          <SkeletonLine width="25%" height={8} />
          <SkeletonLine width="20%" height={8} className="ml-auto" />
        </motion.div>
      </div>
    </div>
  );
}

export function AiThinkingDots({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary/40"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function AiTypingCursor({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.span
      className={cn("inline-block w-[2px] h-4 bg-primary/60 ml-0.5", className)}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
  );
}

export function AiStreamingText({
  text,
  speed = 30,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (displayed >= text.length) return;
    const timer = setTimeout(() => setDisplayed((s) => s + 1), speed);
    return () => clearTimeout(timer);
  }, [displayed, text.length, speed]);

  return (
    <span className={className}>
      {text.slice(0, displayed)}
      <AiTypingCursor />
    </span>
  );
}
