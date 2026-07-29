"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useNotificationStore } from "./notification-store";

interface NotificationBadgeProps {
  collapsed?: boolean;
  onClick?: () => void;
}

export function NotificationBadge({ collapsed, onClick }: NotificationBadgeProps) {
  const { unreadCount, criticalCount } = useNotificationStore();

  if (collapsed) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center rounded-xl transition-colors",
          "h-10 w-10 mx-auto hover:bg-white/[0.04]"
        )}
      >
        <Icons.Bell className="w-4 h-4 opacity-60" />
        {unreadCount > 0 && (
          <motion.span
            className={cn(
              "absolute flex items-center justify-center rounded-full text-[8px] font-bold text-white",
              "-top-0.5 -right-0.5 w-4 h-4",
              criticalCount > 0 ? "bg-error" : "bg-primary"
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
        {criticalCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-error"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center w-full rounded-xl px-3 py-2 gap-2.5 transition-colors hover:bg-white/[0.04]"
      )}
    >
      <div className="relative">
        <Icons.Bell className="w-4 h-4 opacity-60" />
        {criticalCount > 0 && (
          <motion.span
            className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-error"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <span className="flex-1 text-left text-[11px] font-medium opacity-70">Notifications</span>
      {unreadCount > 0 && (
        <motion.span
          className={cn(
            "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
            criticalCount > 0
              ? "bg-error/15 text-error"
              : "bg-primary/15 text-primary"
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {unreadCount}
        </motion.span>
      )}
    </button>
  );
}
