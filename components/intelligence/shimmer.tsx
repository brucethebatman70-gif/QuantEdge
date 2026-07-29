"use client";

import { cn } from "@/lib/cn";

interface ShimmerProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  rounded?: boolean;
}

export function Shimmer({ className, height = 12, width = "100%", rounded = true }: ShimmerProps) {
  return (
    <div
      className={cn(
        "glass-skeleton",
        rounded && "rounded-md",
        className
      )}
      style={{ height, width }}
    />
  );
}

export function CardShimmer() {
  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Shimmer width={80} height={10} />
        <Shimmer width={50} height={8} />
      </div>
      <Shimmer height={36} width="60%" />
      <Shimmer height={40} width="100%" />
      <div className="flex items-center gap-2">
        <Shimmer width={60} height={10} />
        <Shimmer width={40} height={10} />
      </div>
    </div>
  );
}
