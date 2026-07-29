export type NotificationType =
  | "success"
  | "information"
  | "warning"
  | "critical"
  | "ai_insight"
  | "market_alert"
  | "trade_alert"
  | "risk_alert"
  | "psychology_alert"
  | "goal_achievement"
  | "import_status"
  | "system_update";

export type NotificationPriority = "critical" | "warning" | "ai" | "trade" | "general" | "archive";

export type NotificationFilter = "all" | "unread" | "ai" | "trades" | "goals" | "reports" | "system" | "archived";

export interface NotificationAction {
  label: string;
  icon?: string;
  handler: () => void;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  read: boolean;
  pinned: boolean;
  snoozedUntil: number | null;
  createdAt: number;
  actions: NotificationAction[];
  groupId?: string;
  groupLabel?: string;
  groupCount?: number;
}

export interface Toast {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  actions?: NotificationAction[];
  duration: number;
  createdAt: number;
}

export const NOTIFICATION_PRIORITY: Record<NotificationType, NotificationPriority> = {
  critical: "critical",
  warning: "warning",
  risk_alert: "critical",
  psychology_alert: "warning",
  ai_insight: "ai",
  trade_alert: "trade",
  success: "general",
  information: "general",
  market_alert: "trade",
  goal_achievement: "general",
  import_status: "general",
  system_update: "general",
};

export const NOTIFICATION_SOUNDS = {
  success: "/sounds/success.mp3",
  warning: "/sounds/warning.mp3",
  critical: "/sounds/critical.mp3",
  ai_insight: "/sounds/ai.mp3",
} as const;
