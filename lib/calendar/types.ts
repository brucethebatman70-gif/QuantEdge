export type CalendarViewType = "day" | "week" | "month" | "quarter" | "year" | "agenda" | "timeline";

export type EventType =
  | "trade_open" | "trade_close" | "trade_partial" | "trade_sl_update" | "trade_tp_update"
  | "journal_entry" | "replay_session" | "backtest_run" | "playbook_update"
  | "economic_high" | "economic_medium" | "economic_low"
  | "earnings" | "personal_note"
  | "goal" | "daily_review" | "weekly_review" | "monthly_review"
  | "ai_coaching" | "study_session" | "trading_break"
  | "sync_event";

export type EventMood = "great" | "good" | "neutral" | "bad" | "terrible";

export interface CalendarEvent {
  id: string;
  type: EventType;
  title: string;
  description?: string;
  start: string;
  end?: string;
  allDay: boolean;
  color?: string;
  pnl?: number;
  symbol?: string;
  direction?: "long" | "short";
  quantity?: number;
  tags?: string[];
  mood?: EventMood;
  energy?: number;
  discipline?: number;
  tradeId?: string;
  journalId?: string;
  replayId?: string;
  backtestId?: string;
  playbookId?: string;
  goalId?: string;
  goalCurrent?: number;
  goalTarget?: number;
  impact?: "high" | "medium" | "low";
  forecast?: string;
  previous?: string;
  actual?: string;
  completed?: boolean;
  syncSource?: "google" | "apple" | "outlook" | "ics";
  syncId?: string;
}

export interface CalendarDay {
  date: string;
  events: CalendarEvent[];
  pnl: number;
  trades: number;
  wins: number;
  journalEntries: number;
  mood: EventMood | null;
  energy: number;
  discipline: number;
}

export interface CalendarWeek {
  start: string;
  end: string;
  days: CalendarDay[];
  pnl: number;
  trades: number;
  winRate: number;
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDay[];
  pnl: number;
  trades: number;
}

export interface CalendarFilters {
  search: string;
  types: EventType[];
  symbols: string[];
  tags: string[];
  pnlRange: [number, number] | null;
  mood: EventMood | null;
}

export interface CalendarState {
  view: CalendarViewType;
  currentDate: Date;
  selectedEventId: string | null;
  selectedDate: string | null;
  filters: CalendarFilters;
  syncEnabled: boolean;
  sidebarOpen: boolean;
  heatmapMetric: "pnl" | "winRate" | "frequency" | "discipline" | "consistency";
}

export interface AiCalendarInsight {
  type: "positive" | "warning" | "tip" | "insight";
  title: string;
  description: string;
}

export const EVENT_TYPE_CONFIG: Record<EventType, { label: string; color: string; icon: string }> = {
  trade_open: { label: "Trade Open", color: "#22c55e", icon: "TrendingUp" },
  trade_close: { label: "Trade Close", color: "#ef4444", icon: "TrendingDown" },
  trade_partial: { label: "Partial Exit", color: "#f59e0b", icon: "ArrowRight" },
  trade_sl_update: { label: "SL Update", color: "#f97316", icon: "Shield" },
  trade_tp_update: { label: "TP Update", color: "#3b82f6", icon: "Target" },
  journal_entry: { label: "Journal Entry", color: "#6366f1", icon: "BookOpen" },
  replay_session: { label: "Replay Session", color: "#06b6d4", icon: "PlayCircle" },
  backtest_run: { label: "Backtest Run", color: "#10b981", icon: "FlaskConical" },
  playbook_update: { label: "Playbook Update", color: "#8b5cf6", icon: "FileText" },
  economic_high: { label: "High Impact News", color: "#ef4444", icon: "Radio" },
  economic_medium: { label: "Medium Impact News", color: "#f59e0b", icon: "Radio" },
  economic_low: { label: "Low Impact News", color: "#6b7280", icon: "Radio" },
  earnings: { label: "Earnings", color: "#06b6d4", icon: "DollarSign" },
  personal_note: { label: "Personal Note", color: "#6b7280", icon: "StickyNote" },
  goal: { label: "Goal", color: "#8b5cf6", icon: "Target" },
  daily_review: { label: "Daily Review", color: "#6366f1", icon: "CheckCircle2" },
  weekly_review: { label: "Weekly Review", color: "#6366f1", icon: "CheckCircle2" },
  monthly_review: { label: "Monthly Review", color: "#6366f1", icon: "CheckCircle2" },
  ai_coaching: { label: "AI Coaching", color: "#06b6d4", icon: "Bot" },
  study_session: { label: "Study Session", color: "#8b5cf6", icon: "Brain" },
  trading_break: { label: "Trading Break", color: "#10b981", icon: "Waves" },
  sync_event: { label: "Synced Event", color: "#6b7280", icon: "RefreshCw" },
};

export const VIEW_LABELS: Record<CalendarViewType, string> = {
  day: "Day", week: "Week", month: "Month", quarter: "Quarter", year: "Year", agenda: "Agenda", timeline: "Timeline",
};

export const MOOD_LABELS: Record<EventMood, string> = {
  great: "Great", good: "Good", neutral: "Neutral", bad: "Bad", terrible: "Terrible",
};

export const MOOD_COLORS: Record<EventMood, string> = {
  great: "text-success", good: "text-primary", neutral: "text-muted-foreground", bad: "text-warning", terrible: "text-error",
};

export const HEATMAP_METRIC_LABELS: Record<string, string> = {
  pnl: "Daily P&L", winRate: "Win Rate", frequency: "Trading Frequency", discipline: "Discipline Score", consistency: "Consistency",
};
