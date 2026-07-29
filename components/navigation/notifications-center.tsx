"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useNavigationStore } from "./navigation-store";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const SAMPLE_NOTIFICATIONS = [
  { id: "1", title: "AI Insight Ready", description: "Your weekly performance analysis is available", type: "insight" as const, read: false, createdAt: Date.now() - 60000 },
  { id: "2", title: "Risk Alert", description: "Portfolio drawdown exceeded 5% threshold", type: "alert" as const, read: false, createdAt: Date.now() - 300000 },
  { id: "3", title: "New Report", description: "Monthly report for June is generated", type: "update" as const, read: true, createdAt: Date.now() - 86400000 },
  { id: "4", title: "Achievement Unlocked", description: "100 trades journaled! You're on fire.", type: "achievement" as const, read: false, createdAt: Date.now() - 172800000 },
];

const typeIcons: Record<string, typeof Icons.Bell> = {
  insight: Icons.Lightbulb,
  alert: Icons.AlertTriangle,
  update: Icons.RefreshCw,
  achievement: Icons.Trophy,
};

const typeColors: Record<string, string> = {
  insight: "text-accent",
  alert: "text-warning",
  update: "text-info",
  achievement: "text-success",
};

interface NotificationsCenterProps {
  collapsed?: boolean;
}

export function NotificationsCenter({ collapsed }: NotificationsCenterProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const trigger = (
    <button
      onClick={() => setOpen(!open)}
      className={cn(
        "relative flex items-center justify-center rounded-xl transition-colors",
        collapsed ? "h-10 w-10 mx-auto hover:bg-white/[0.04]" : "h-9 px-3 mx-1.5 hover:bg-white/[0.04]"
      )}
    >
      <Icons.Bell className={cn("w-4 h-4", collapsed ? "opacity-60" : "opacity-60")} />
      {unreadCount > 0 && (
        <motion.span
          className={cn(
            "absolute flex items-center justify-center bg-error text-white rounded-full text-[8px] font-bold",
            collapsed ? "-top-0.5 -right-0.5 w-4 h-4" : "-top-1 -right-1 w-4 h-4"
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </motion.span>
      )}
    </button>
  );

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent side="right">
            <span className="text-xs">Notifications</span>
            {unreadCount > 0 && (
              <span className="ml-1.5 text-[10px] text-error">({unreadCount})</span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="relative px-3">
      <div className="flex items-center justify-between px-1 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">Notifications</span>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[9px] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="space-y-0.5">
        {notifications.slice(0, 4).map((n, i) => {
          const Icon = typeIcons[n.type] || Icons.Bell;
          return (
            <motion.button
              key={n.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => markRead(n.id)}
              className={cn(
                "flex w-full items-start gap-2.5 rounded-xl px-3 py-2 text-left transition-colors",
                !n.read ? "bg-white/[0.03]" : "hover:bg-white/[0.03]"
              )}
            >
              <div className="shrink-0 mt-0.5">
                <Icon className={cn("w-3.5 h-3.5", typeColors[n.type])} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-[11px] truncate", !n.read ? "font-medium text-foreground" : "text-muted-foreground/70")}>
                  {n.title}
                </p>
                <p className="text-[10px] text-muted-foreground/40 truncate">{n.description}</p>
              </div>
              {!n.read && (
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
