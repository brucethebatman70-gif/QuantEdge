"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useNotificationStore } from "./notification-store";
import type { Notification, NotificationFilter, NotificationType } from "./notification-types";
import { ScrollArea } from "@/components/ui/scroll-area";

const TYPE_META: Record<NotificationType, { icon: keyof typeof Icons; color: string; label: string }> = {
  success: { icon: "CheckCircle2", color: "text-success", label: "Success" },
  information: { icon: "Info", color: "text-info", label: "Info" },
  warning: { icon: "AlertTriangle", color: "text-warning", label: "Warning" },
  critical: { icon: "AlertCircle", color: "text-error", label: "Critical" },
  ai_insight: { icon: "Brain", color: "text-primary", label: "AI Insight" },
  market_alert: { icon: "TrendingUp", color: "text-accent", label: "Market Alert" },
  trade_alert: { icon: "DollarSign", color: "text-success", label: "Trade Alert" },
  risk_alert: { icon: "Shield", color: "text-error", label: "Risk Alert" },
  psychology_alert: { icon: "Heart", color: "text-warning", label: "Psychology" },
  goal_achievement: { icon: "Trophy", color: "text-primary", label: "Achievement" },
  import_status: { icon: "Upload", color: "text-info", label: "Import" },
  system_update: { icon: "RefreshCw", color: "text-muted-foreground", label: "System" },
};

const FILTER_OPTIONS: { key: NotificationFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "ai", label: "AI" },
  { key: "trades", label: "Trades" },
  { key: "goals", label: "Goals" },
  { key: "system", label: "System" },
  { key: "archived", label: "Archived" },
];

const SNOOZE_OPTIONS = [
  { label: "30 min", value: 30 * 60 * 1000 },
  { label: "1 hour", value: 60 * 60 * 1000 },
  { label: "Tomorrow", value: 24 * 60 * 60 * 1000 },
  { label: "Custom", value: -1 },
];

function badgeClass(type: NotificationType) {
  const color = TYPE_META[type].color.replace("text-", "");
  const map: Record<string, string> = {
    success: "bg-success/10 text-success",
    info: "bg-info/10 text-info",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    "muted-foreground": "bg-muted/20 text-muted-foreground",
  };
  return map[color] || "bg-white/[0.04] text-muted-foreground";
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function NotificationIcon({ type }: { type: NotificationType }) {
  const meta = TYPE_META[type];
  const Icon = Icons[meta.icon];
  const bgMap: Record<string, string> = {
    success: "bg-success/10",
    info: "bg-info/10",
    warning: "bg-warning/10",
    error: "bg-error/10",
    primary: "bg-primary/10",
    accent: "bg-accent/10",
    "muted-foreground": "bg-muted/20",
  };
  const colorKey = meta.color.replace("text-", "");
  return (
    <div className={cn("shrink-0 w-8 h-8 rounded-lg flex items-center justify-center", bgMap[colorKey] || "bg-white/[0.04]")}>
      <Icon className={cn("w-4 h-4", meta.color)} />
    </div>
  );
}

function NotificationCard({ notification, onClose }: { notification: Notification; onClose?: () => void }) {
  const { markRead, pinNotification, unpinNotification, archiveNotification, snoozeNotification } = useNotificationStore();
  const [showSnooze, setShowSnooze] = useState(false);

  const handleSnooze = (ms: number) => {
    if (ms === -1) return;
    snoozeNotification(notification.id, Date.now() + ms);
    setShowSnooze(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative rounded-xl border transition-all duration-200",
        !notification.read
          ? "bg-white/[0.04] border-white/[0.08]"
          : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.04]"
      )}
      onMouseEnter={() => !notification.read && markRead(notification.id)}
    >
      <div className="flex items-start gap-3 p-3">
        <NotificationIcon type={notification.type} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={cn("text-[13px] leading-tight", !notification.read ? "font-semibold text-foreground" : "text-foreground/80")}>
              {notification.title}
            </p>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => notification.pinned ? unpinNotification(notification.id) : pinNotification(notification.id)}
                className={cn(
                  "p-1 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100",
                  notification.pinned ? "text-primary opacity-100" : "text-muted-foreground/40 hover:text-muted-foreground/80"
                )}
              >
                <Icons.Pin className="w-3 h-3" />
              </button>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground/60 mt-1 leading-relaxed line-clamp-2">{notification.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] text-muted-foreground/40">{timeAgo(notification.createdAt)}</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", badgeClass(notification.type))}>
              {TYPE_META[notification.type].label}
            </span>
          </div>
          {notification.actions.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              {notification.actions.map((action, ai) => (
                <button
                  key={ai}
                  onClick={() => { action.handler(); onClose?.(); }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] hover:bg-white/[0.08] text-foreground/70 hover:text-foreground transition-all"
                >
                  {action.icon && Icons[action.icon] && (
                    <span className={cn("w-3 h-3", TYPE_META[notification.type].color)}>
                      {React.createElement(Icons[action.icon], { className: "w-3 h-3" })}
                    </span>
                  )}
                  {action.label}
                </button>
              ))}
              <div className="relative">
                <button
                  onClick={() => setShowSnooze(!showSnooze)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-transparent hover:bg-white/[0.04] text-muted-foreground/50 hover:text-muted-foreground/80 transition-all"
                >
                  <Icons.Clock className="w-3 h-3" />
                  Snooze
                </button>
                <AnimatePresence>
                  {showSnooze && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      className="absolute bottom-full left-0 mb-1 p-1 rounded-lg glass-popover shadow-lg min-w-[120px] z-10"
                    >
                      {SNOOZE_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => handleSnooze(opt.value)}
                          className="w-full text-left px-2.5 py-1.5 text-[11px] rounded-md hover:bg-white/[0.06] text-muted-foreground/70 hover:text-foreground transition-colors"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => archiveNotification(notification.id)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-transparent hover:bg-white/[0.04] text-muted-foreground/50 hover:text-muted-foreground/80 transition-all"
              >
                <Icons.Archive className="w-3 h-3" />
                Archive
              </button>
            </div>
          )}
        </div>
        {!notification.read && (
          <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" />
        )}
      </div>
    </motion.div>
  );
}

function GroupSection({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  if (count === 0) return null;
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between px-1 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">{label}</span>
        <span className="text-[10px] text-muted-foreground/30">{count}</span>
      </div>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4">
        <Icons.Inbox className="w-8 h-8 text-muted-foreground/30" />
      </div>
      <p className="text-sm font-medium text-foreground/80">Everything is up to date</p>
      <p className="text-xs text-muted-foreground/50 mt-1 max-w-[200px]">
        No new notifications. AI will alert you when something needs attention.
      </p>
      <div className="mt-6 flex gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all">
          <Icons.Sparkles className="w-3 h-3" />
          Ask AI to check
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.04] text-foreground/60 hover:bg-white/[0.08] transition-all">
          <Icons.Search className="w-3 h-3" />
          Search history
        </button>
      </div>
    </motion.div>
  );
}

function SearchInput({ query, onChange }: { query: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="relative">
      <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notifications..."
        className="w-full h-9 pl-9 pr-8 text-xs bg-white/[0.04] border border-white/[0.06] rounded-xl text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-white/[0.12] transition-colors"
      />
      {query && (
        <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground/70">
          <Icons.X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export function NotificationCenter({ onClose }: { onClose?: () => void }) {
  const {
    centerOpen,
    query,
    activeFilter,
    unreadCount,
    notifications,
    setQuery,
    setFilter,
    markAllRead,
    clearAll,
    getGrouped,
  } = useNotificationStore();

  const grouped = useMemo(() => getGrouped(), [getGrouped, notifications, activeFilter, query]);

  const hasNotifications = grouped.pinned.length > 0 || grouped.unread.length > 0 || grouped.today.length > 0 || grouped.yesterday.length > 0 || grouped.earlier.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-4 top-[72px] z-50 w-[420px] max-h-[calc(100vh-100px)] flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "var(--glass-surface)",
        backdropFilter: "blur(40px) saturate(2)",
        WebkitBackdropFilter: "blur(40px) saturate(2)",
        border: "1px solid var(--glass-border)",
        borderTop: "1px solid var(--glass-highlight)",
        boxShadow: `
          0 4px 8px rgba(0,0,0,0.02),
          0 16px 32px rgba(0,0,0,0.06),
          0 32px 64px rgba(0,0,0,0.08),
          0 48px 96px rgba(0,0,0,0.04)
        `,
      }}
    >
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/15 text-primary"
              >
                {unreadCount}
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] px-2 py-1 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.04] transition-all"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={clearAll}
              className="text-[10px] px-2 py-1 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.04] transition-all"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-white/[0.04] transition-all"
            >
              <Icons.X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <SearchInput query={query} onChange={setQuery} />
        {/* Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={cn(
                "shrink-0 text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all",
                activeFilter === opt.key
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground/50 hover:text-muted-foreground/80 hover:bg-white/[0.03]"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 px-3 pb-3">
        <div className="space-y-3">
          {!hasNotifications && activeFilter !== "archived" && <EmptyState />}

          {grouped.pinned.length > 0 && (
            <GroupSection label="Pinned" count={grouped.pinned.length}>
              {grouped.pinned.map((n) => (
                <NotificationCard key={n.id} notification={n} onClose={onClose} />
              ))}
            </GroupSection>
          )}

          {grouped.unread.length > 0 && (
            <GroupSection label="Unread" count={grouped.unread.length}>
              {grouped.unread.map((n) => (
                <NotificationCard key={n.id} notification={n} onClose={onClose} />
              ))}
            </GroupSection>
          )}

          {grouped.today.length > 0 && (
            <GroupSection label="Today" count={grouped.today.length}>
              {grouped.today.map((n) => (
                <NotificationCard key={n.id} notification={n} onClose={onClose} />
              ))}
            </GroupSection>
          )}

          {grouped.yesterday.length > 0 && (
            <GroupSection label="Yesterday" count={grouped.yesterday.length}>
              {grouped.yesterday.map((n) => (
                <NotificationCard key={n.id} notification={n} onClose={onClose} />
              ))}
            </GroupSection>
          )}

          {grouped.earlier.length > 0 && (
            <GroupSection label="Earlier" count={grouped.earlier.length}>
              {grouped.earlier.map((n) => (
                <NotificationCard key={n.id} notification={n} onClose={onClose} />
              ))}
            </GroupSection>
          )}

          {activeFilter === "archived" && grouped.archived.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icons.Archive className="w-8 h-8 text-muted-foreground/20 mb-3" />
              <p className="text-xs text-muted-foreground/50">No archived notifications</p>
            </div>
          )}

          {activeFilter === "archived" && grouped.archived.length > 0 && (
            <GroupSection label="Archived" count={grouped.archived.length}>
              {grouped.archived.map((n) => (
                <NotificationCard key={n.id} notification={n} onClose={onClose} />
              ))}
            </GroupSection>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="shrink-0 px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground/30">
            {notifications.length} total
          </span>
          <span className="text-[10px] text-muted-foreground/30">
            {unreadCount} unread
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/30">
          <kbd className="px-1 py-0.5 rounded bg-white/[0.04] text-[9px]">⌘N</kbd>
          <span>toggle</span>
        </div>
      </div>
    </motion.div>
  );
}
