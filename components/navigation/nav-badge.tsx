"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { NavBadge as NavBadgeType } from "./nav-types";

interface NavBadgeProps {
  badge: NavBadgeType;
  collapsed?: boolean;
}

const badgeStyles: Record<string, string> = {
  new: "bg-primary/15 text-primary border-primary/20",
  beta: "bg-accent/15 text-accent border-accent/20",
  live: "bg-success/15 text-success border-success/20",
  ai: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  updates: "bg-warning/15 text-warning border-warning/20",
  unread: "bg-error/15 text-error border-error/20",
};

const dotColors: Record<string, string> = {
  new: "bg-primary",
  beta: "bg-accent",
  live: "bg-success",
  ai: "bg-purple-400",
  updates: "bg-warning",
  unread: "bg-error",
};

export function NavBadge({ badge, collapsed }: NavBadgeProps) {
  if (collapsed) {
    return (
      <motion.span
        className={cn("w-1.5 h-1.5 rounded-full absolute -top-0.5 -right-0.5", dotColors[badge.type])}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
    );
  }

  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
        badgeStyles[badge.type]
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {badge.type === "unread" && badge.count ? (
        <span className="tabular-nums">{badge.count > 99 ? "99+" : badge.count}</span>
      ) : (
        badge.type
      )}
    </motion.span>
  );
}
