"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export const shimmerVariants = {
  initial: { backgroundPosition: "200% 0" },
  animate: {
    backgroundPosition: "-200% 0",
    transition: { duration: 2.2, repeat: Infinity, ease: "linear" as const },
  },
};

interface SkeletonBaseProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | "sm" | "md" | "lg" | "xl" | "full";
  style?: React.CSSProperties;
}

export function SkeletonLine({
  className,
  width = "100%",
  height = 12,
  rounded = "md",
  style,
}: SkeletonBaseProps) {
  const radius =
    rounded === "full" ? "rounded-full"
    : rounded === "lg" ? "rounded-lg"
    : rounded === "xl" ? "rounded-xl"
    : rounded === "sm" ? "rounded-sm"
    : "rounded-md";

  return (
    <motion.div
      className={cn(
        "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]",
        radius,
        className
      )}
      style={{ width, height, ...style }}
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
    />
  );
}

export function SkeletonBlock({
  className,
  width = "100%",
  height = 80,
  rounded = "xl",
  style,
}: SkeletonBaseProps) {
  const radius =
    rounded === "full" ? "rounded-full"
    : rounded === "lg" ? "rounded-lg"
    : rounded === "md" ? "rounded-md"
    : rounded === "sm" ? "rounded-sm"
    : "rounded-xl";

  return (
    <motion.div
      className={cn(
        "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]",
        radius,
        className
      )}
      style={{ width, height, ...style }}
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
    />
  );
}

export function SkeletonCircle({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.div
      className={cn(
        "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] rounded-full shrink-0",
        className
      )}
      style={{ width: size, height: size }}
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
    />
  );
}

export function SkeletonBadge({
  className,
  width = 48,
  height = 18,
  rounded = "full",
}: SkeletonBaseProps) {
  return (
    <SkeletonLine
      className={className}
      width={width}
      height={height}
      rounded={rounded}
    />
  );
}

export function SkeletonIcon({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <SkeletonCircle className={className} size={size} />
  );
}
