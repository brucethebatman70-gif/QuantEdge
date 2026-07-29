export type GoalType = "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom";

export type GoalCategory = "profit" | "consistency" | "risk" | "psychology" | "education" | "habit" | "strategy";

export type GoalStatus = "active" | "completed" | "missed" | "archived";

export type HabitId =
  | "morning_analysis" | "trading_plan" | "journal_complete" | "screenshot_uploaded"
  | "replay_reviewed" | "backtest_completed" | "playbook_updated" | "daily_review" | "study_session";

export type AchievementId =
  | "first_100_trades" | "seven_day_discipline" | "thirty_day_consistency"
  | "risk_master" | "journal_master" | "replay_expert" | "strategy_builder";

export interface Goal {
  id: string;
  type: GoalType;
  category: GoalCategory;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  prefix?: string;
  status: GoalStatus;
  createdAt: string;
  deadline: string;
  milestones: Milestone[];
  tags: string[];
  linkedHabits: HabitId[];
  linkedAchievement?: AchievementId;
}

export interface Milestone {
  label: string;
  target: number;
  reached: boolean;
  reachedAt?: string;
}

export interface Habit {
  id: HabitId;
  label: string;
  description: string;
  icon: string;
  streak: number;
  bestStreak: number;
  weeklyData: boolean[];
  monthlyData: boolean[];
  category: GoalCategory;
}

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  target: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface PerformanceKpi {
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: string;
  trend: "up" | "down" | "stable";
  color: string;
}

export interface AiCoachMessage {
  type: "weekly_review" | "monthly_review" | "habit_analysis" | "weakness" | "strength" | "suggestion" | "motivation";
  title: string;
  description: string;
  score: number | null;
}

export interface GoalsState {
  goals: Goal[];
  habits: Habit[];
  achievements: Achievement[];
  kpis: PerformanceKpi[];
  aiCoachMessages: AiCoachMessage[];
  activeTab: string;
  selectedCategory: GoalCategory | null;
  selectedType: GoalType | null;
  statusFilter: GoalStatus | "all";
  search: string;
}

export const GOAL_TYPE_LABELS: Record<GoalType, string> = {
  daily: "Daily", weekly: "Weekly", monthly: "Monthly", quarterly: "Quarterly", yearly: "Yearly", custom: "Custom",
};

export const GOAL_CATEGORY_LABELS: Record<GoalCategory, string> = {
  profit: "Profit", consistency: "Consistency", risk: "Risk", psychology: "Psychology",
  education: "Education", habit: "Habit", strategy: "Strategy",
};

export const GOAL_CATEGORY_COLORS: Record<GoalCategory, string> = {
  profit: "text-success", consistency: "text-primary", risk: "text-warning",
  psychology: "text-info", education: "text-accent", habit: "text-primary",
  strategy: "text-secondary-foreground",
};

export const GOAL_CATEGORY_BG: Record<GoalCategory, string> = {
  profit: "bg-success/10", consistency: "bg-primary/10", risk: "bg-warning/10",
  psychology: "bg-info/10", education: "bg-accent/10", habit: "bg-primary/5",
  strategy: "bg-muted",
};

export const HABIT_LABELS: Record<HabitId, string> = {
  morning_analysis: "Morning Analysis", trading_plan: "Trading Plan",
  journal_complete: "Journal Complete", screenshot_uploaded: "Screenshot Uploaded",
  replay_reviewed: "Replay Reviewed", backtest_completed: "Backtest Completed",
  playbook_updated: "Playbook Updated", daily_review: "Daily Review", study_session: "Study Session",
};

export const ACHIEVEMENT_RARITY_COLORS: Record<string, string> = {
  common: "text-muted-foreground border-muted", rare: "text-primary border-primary/30",
  epic: "text-warning border-warning/30", legendary: "text-success border-success/30",
};
