"use client";

import { create } from "zustand";
import type { Notification, NotificationFilter, Toast, NotificationType, NotificationAction } from "./notification-types";

interface NotificationState {
  notifications: Notification[];
  toasts: Toast[];
  centerOpen: boolean;
  query: string;
  activeFilter: NotificationFilter;
  soundEnabled: boolean;
  unreadCount: number;
  criticalCount: number;

  setCenterOpen: (open: boolean) => void;
  toggleCenter: () => void;
  setQuery: (query: string) => void;
  setFilter: (filter: NotificationFilter) => void;
  setSoundEnabled: (enabled: boolean) => void;

  addNotification: (n: Omit<Notification, "id" | "createdAt" | "read" | "pinned" | "snoozedUntil">) => void;
  addToast: (t: Omit<Toast, "id" | "createdAt">) => void;
  dismissToast: (id: string) => void;

  markRead: (id: string) => void;
  markAllRead: () => void;
  markAllReadByType: (type: NotificationType) => void;
  pinNotification: (id: string) => void;
  unpinNotification: (id: string) => void;
  snoozeNotification: (id: string, until: number) => void;
  archiveNotification: (id: string) => void;
  clearAll: () => void;

  getFiltered: () => Notification[];
  getGrouped: () => { pinned: Notification[]; unread: Notification[]; today: Notification[]; yesterday: Notification[]; earlier: Notification[]; archived: Notification[] };
}

const STORAGE_KEY = "qe-notifications";

function loadPersisted(): { notifications: Notification[]; soundEnabled: boolean } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function persist(notifications: Notification[], soundEnabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ notifications, soundEnabled }));
  } catch {}
}

function generateId() {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "sample-1",
    type: "ai_insight",
    title: "Overtrading Detected",
    description: "AI detected 8 trades in the last hour — 3x your average. Consider taking a break to avoid emotional decisions.",
    read: false,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 300000,
    actions: [
      { label: "Analyze", icon: "Brain", handler: () => {} },
      { label: "Dismiss", icon: "X", handler: () => {} },
    ],
  },
  {
    id: "sample-2",
    type: "critical",
    title: "Portfolio Drawdown Alert",
    description: "Portfolio drawdown exceeded 8% threshold. Risk limits triggered.",
    read: false,
    pinned: true,
    snoozedUntil: null,
    createdAt: Date.now() - 600000,
    actions: [
      { label: "View Risk", icon: "Shield", handler: () => {} },
      { label: "Close Positions", icon: "XCircle", handler: () => {} },
    ],
  },
  {
    id: "sample-3",
    type: "trade_alert",
    title: "AAPL Trade Closed",
    description: "AAPL position closed at $198.42. Profit: +$342.50 (2.4% gain). RR: 2.8.",
    read: false,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 1800000,
    actions: [
      { label: "Open Trade", icon: "TrendingUp", handler: () => {} },
      { label: "Journal", icon: "Edit", handler: () => {} },
    ],
  },
  {
    id: "sample-4",
    type: "goal_achievement",
    title: "Weekly Goal Complete!",
    description: "You've achieved your weekly profit target of $2,000. Outstanding consistency this week.",
    read: false,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 3600000,
    actions: [
      { label: "View Progress", icon: "Target", handler: () => {} },
      { label: "Share", icon: "Share2", handler: () => {} },
    ],
  },
  {
    id: "sample-5",
    type: "psychology_alert",
    title: "Revenge Trading Risk",
    description: "After a loss of $450, you entered 3 consecutive trades. Pattern suggests revenge trading.",
    read: false,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 7200000,
    actions: [
      { label: "View Journal", icon: "BookOpen", handler: () => {} },
      { label: "Coach Session", icon: "Brain", handler: () => {} },
    ],
  },
  {
    id: "sample-6",
    type: "market_alert",
    title: "High Volatility: BTC",
    description: "BTC volatility spike detected. +4.2% movement in last 15 minutes. High volume.",
    read: false,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 14400000,
    actions: [
      { label: "View Chart", icon: "LineChart", handler: () => {} },
      { label: "Set Alert", icon: "Bell", handler: () => {} },
    ],
  },
  {
    id: "sample-7",
    type: "success",
    title: "Import Complete",
    description: "10 trades imported successfully from TradingView CSV.",
    read: false,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 28800000,
    actions: [
      { label: "View Trades", icon: "ListChecks", handler: () => {} },
      { label: "Analyze", icon: "BarChart3", handler: () => {} },
    ],
  },
  {
    id: "sample-8",
    type: "ai_insight",
    title: "Best Performing Session",
    description: "Your Tuesday morning sessions show 78% win rate. Consider scheduling more trades during this window.",
    read: false,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 43200000,
    actions: [
      { label: "Analyze Pattern", icon: "Brain", handler: () => {} },
    ],
  },
  {
    id: "sample-9",
    type: "warning",
    title: "Risk Inconsistency",
    description: "Position sizing varies widely (0.5% to 3.2% risk). Consistent sizing improves long-term returns.",
    read: false,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 86400000,
    actions: [
      { label: "View Risk", icon: "Shield", handler: () => {} },
      { label: "Dismiss", icon: "X", handler: () => {} },
    ],
  },
  {
    id: "sample-10",
    type: "system_update",
    title: "New Feature: AI Coach",
    description: "Your AI Coach is now available. Get personalized trading psychology insights.",
    read: true,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 172800000,
    actions: [
      { label: "Try Now", icon: "Bot", handler: () => {} },
    ],
  },
  {
    id: "sample-11",
    type: "goal_achievement",
    title: "30-Day Consistency Streak",
    description: "You've journaled every trade for 30 consecutive days. Consistency is the key to mastery.",
    read: true,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 259200000,
    actions: [
      { label: "View Streak", icon: "Flame", handler: () => {} },
    ],
  },
  {
    id: "sample-12",
    type: "import_status",
    title: "Export Ready",
    description: "Your monthly report is ready for export. 45 trades, +$3,240 PnL, 62% win rate.",
    read: true,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 345600000,
    actions: [
      { label: "Export PDF", icon: "Download", handler: () => {} },
      { label: "View Report", icon: "FileText", handler: () => {} },
    ],
  },
  {
    id: "sample-13",
    type: "risk_alert",
    title: "Stop Loss Triggered",
    description: "Stop loss hit on EUR/USD at 1.0845. Loss: -$280. Review entry strategy before re-entering.",
    read: true,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 432000000,
    actions: [
      { label: "Review Trade", icon: "TrendingDown", handler: () => {} },
    ],
  },
  {
    id: "sample-14",
    type: "ai_insight",
    title: "Weekly Improvement",
    description: "Win rate improved from 54% to 68% compared to last week. Your risk management adjustments are working.",
    read: true,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 518400000,
    actions: [
      { label: "View Report", icon: "PieChart", handler: () => {} },
    ],
  },
  {
    id: "sample-15",
    type: "information",
    title: "Losing Streak Warning",
    description: "4 consecutive losing trades detected. Take a step back and review your strategy.",
    read: true,
    pinned: false,
    snoozedUntil: null,
    createdAt: Date.now() - 604800000,
    actions: [
      { label: "AI Coach", icon: "Brain", handler: () => {} },
      { label: "Review Trades", icon: "BookOpen", handler: () => {} },
    ],
  },
];

export const useNotificationStore = create<NotificationState>((set, get) => {
  const persisted = loadPersisted();

  return {
    notifications: persisted?.notifications ?? SAMPLE_NOTIFICATIONS,
    toasts: [],
    centerOpen: false,
    query: "",
    activeFilter: "all",
    soundEnabled: persisted?.soundEnabled ?? true,
    unreadCount: (persisted?.notifications ?? SAMPLE_NOTIFICATIONS).filter((n) => !n.read && !n.snoozedUntil).length,
    criticalCount: (persisted?.notifications ?? SAMPLE_NOTIFICATIONS).filter((n) => (n.type === "critical" || n.type === "risk_alert") && !n.read).length,

    setCenterOpen: (open) => set({ centerOpen: open }),
    toggleCenter: () => set((s) => ({ centerOpen: !s.centerOpen })),
    setQuery: (query) => set({ query }),
    setFilter: (filter) => set({ activeFilter: filter }),
    setSoundEnabled: (enabled) => {
      set((s) => {
        persist(s.notifications, enabled);
        return { soundEnabled: enabled };
      });
    },

    addNotification: (partial) => {
      const notification: Notification = {
        ...partial,
        id: generateId(),
        createdAt: Date.now(),
        read: false,
        pinned: false,
        snoozedUntil: null,
      };
      set((s) => {
        const next = [notification, ...s.notifications];
        const unread = next.filter((n) => !n.read && !n.snoozedUntil).length;
        const critical = next.filter((n) => (n.type === "critical" || n.type === "risk_alert") && !n.read).length;
        persist(next, s.soundEnabled);
        return { notifications: next, unreadCount: unread, criticalCount: critical };
      });
    },

    addToast: (partial) => {
      const toast: Toast = {
        ...partial,
        id: generateId(),
        createdAt: Date.now(),
      };
      set((s) => {
        const next = [toast, ...s.toasts].slice(0, 5);
        return { toasts: next };
      });
      setTimeout(() => {
        get().dismissToast(toast.id);
      }, partial.duration || 4000);
    },

    dismissToast: (id) => {
      set((s) => ({
        toasts: s.toasts.filter((t) => t.id !== id),
      }));
    },

    markRead: (id) => {
      set((s) => {
        const next = s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
        const unread = next.filter((n) => !n.read && !n.snoozedUntil).length;
        const critical = next.filter((n) => (n.type === "critical" || n.type === "risk_alert") && !n.read).length;
        persist(next, s.soundEnabled);
        return { notifications: next, unreadCount: unread, criticalCount: critical };
      });
    },

    markAllRead: () => {
      set((s) => {
        const next = s.notifications.map((n) => ({ ...n, read: true }));
        persist(next, s.soundEnabled);
        return { notifications: next, unreadCount: 0, criticalCount: 0 };
      });
    },

    markAllReadByType: (type) => {
      set((s) => {
        const next = s.notifications.map((n) => (n.type === type ? { ...n, read: true } : n));
        const unread = next.filter((n) => !n.read && !n.snoozedUntil).length;
        const critical = next.filter((n) => (n.type === "critical" || n.type === "risk_alert") && !n.read).length;
        persist(next, s.soundEnabled);
        return { notifications: next, unreadCount: unread, criticalCount: critical };
      });
    },

    pinNotification: (id) => {
      set((s) => {
        const next = s.notifications.map((n) => (n.id === id ? { ...n, pinned: true } : n));
        persist(next, s.soundEnabled);
        return { notifications: next };
      });
    },

    unpinNotification: (id) => {
      set((s) => {
        const next = s.notifications.map((n) => (n.id === id ? { ...n, pinned: false } : n));
        persist(next, s.soundEnabled);
        return { notifications: next };
      });
    },

    snoozeNotification: (id, until) => {
      set((s) => {
        const next = s.notifications.map((n) => (n.id === id ? { ...n, snoozedUntil: until, read: true } : n));
        const unread = next.filter((n) => !n.read && !n.snoozedUntil).length;
        persist(next, s.soundEnabled);
        return { notifications: next, unreadCount: unread };
      });
    },

    archiveNotification: (id) => {
      set((s) => {
        const next = s.notifications.map((n) => (n.id === id ? { ...n, snoozedUntil: -1 } : n));
        const unread = next.filter((n) => !n.read && !n.snoozedUntil).length;
        persist(next, s.soundEnabled);
        return { notifications: next, unreadCount: unread };
      });
    },

    clearAll: () => {
      set((s) => {
        persist([], s.soundEnabled);
        return { notifications: [], unreadCount: 0, criticalCount: 0 };
      });
    },

    getFiltered: () => {
      const { notifications, activeFilter, query } = get();
      let filtered = notifications.filter((n) => !n.snoozedUntil || n.snoozedUntil === -1);
      if (activeFilter === "unread") filtered = filtered.filter((n) => !n.read);
      else if (activeFilter === "ai") filtered = filtered.filter((n) => n.type === "ai_insight" || n.type === "psychology_alert");
      else if (activeFilter === "trades") filtered = filtered.filter((n) => n.type === "trade_alert" || n.type === "market_alert" || n.type === "risk_alert");
      else if (activeFilter === "goals") filtered = filtered.filter((n) => n.type === "goal_achievement");
      else if (activeFilter === "reports") filtered = filtered.filter((n) => n.type === "import_status" || n.type === "system_update" || n.type === "information");
      else if (activeFilter === "system") filtered = filtered.filter((n) => n.type === "system_update");
      else if (activeFilter === "archived") filtered = notifications.filter((n) => n.snoozedUntil === -1);
      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.description.toLowerCase().includes(q) ||
            n.type.toLowerCase().includes(q)
        );
      }
      return filtered;
    },

    getGrouped: () => {
      const { getFiltered } = get();
      const filtered = getFiltered();
      const now = Date.now();
      const day = 86400000;
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const yesterdayStart = todayStart.getTime() - day;
      const pinned = filtered.filter((n) => n.pinned);
      const unread = filtered.filter((n) => !n.read && !n.pinned);
      const today = filtered.filter((n) => n.read && !n.pinned && n.createdAt >= todayStart.getTime());
      const yesterday = filtered.filter((n) => n.read && !n.pinned && n.createdAt >= yesterdayStart && n.createdAt < todayStart.getTime());
      const earlier = filtered.filter((n) => n.read && !n.pinned && n.createdAt < yesterdayStart);
      const archived = get().notifications.filter((n) => n.snoozedUntil === -1);
      return { pinned, unread, today, yesterday, earlier, archived };
    },
  };
});
