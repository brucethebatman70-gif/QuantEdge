import type { Emotion, MistakeType } from "@/lib/journal/types";

export type TradeStage =
  | "preparation" | "market_analysis" | "entry" | "management"
  | "exit" | "emotion" | "reflection" | "ai_review" | "lessons";

export interface TradeStoryStage {
  id: TradeStage;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export const TRADE_STAGES: TradeStoryStage[] = [
  { id: "preparation", label: "Preparation", icon: "ListChecks", description: "Pre-trade checklist and market scan", color: "text-info" },
  { id: "market_analysis", label: "Market Analysis", icon: "LineChart", description: "Technical and fundamental review", color: "text-accent" },
  { id: "entry", label: "Entry", icon: "ArrowRight", description: "Execution details", color: "text-success" },
  { id: "management", label: "Management", icon: "Sliders", description: "How the trade was managed", color: "text-warning" },
  { id: "exit", label: "Exit", icon: "LogOut", description: "Exit execution", color: "text-error" },
  { id: "emotion", label: "Emotion", icon: "Heart", description: "How you felt during the trade", color: "text-primary" },
  { id: "reflection", label: "Reflection", icon: "MessageSquare", description: "Post-trade review", color: "text-info" },
  { id: "ai_review", label: "AI Review", icon: "Brain", description: "Automated analysis", color: "text-accent" },
  { id: "lessons", label: "Lessons", icon: "GraduationCap", description: "Key takeaways", color: "text-success" },
];

export interface PreTradeChecklist {
  marketStructure: boolean;
  trend: boolean;
  liquidity: boolean;
  session: boolean;
  riskPercent: boolean;
  rr: boolean;
  newsChecked: boolean;
  confidence: boolean;
  tradingPlan: boolean;
}

export interface PostTradeReview {
  planFollowed: boolean | null;
  wentWell: string;
  wentWrong: string;
  takeAgain: boolean | null;
  oneImprovement: string;
}

export interface SetupGrade {
  grade: "A+" | "A" | "B" | "C" | "D";
  execution: number;
  rr: number;
  discipline: number;
  timing: number;
  rules: number;
  psychology: number;
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: string | null;
  progress: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-entry", label: "First Journal", description: "Create your first journal entry", icon: "BookOpen", unlocked: true, unlockedAt: "2026-07-01", progress: 100 },
  { id: "ten-entries", label: "Getting Started", description: "Create 10 journal entries", icon: "BookOpen", unlocked: true, unlockedAt: "2026-07-10", progress: 100 },
  { id: "fifty-entries", label: "Dedicated Trader", description: "Create 50 journal entries", icon: "BookOpen", unlocked: true, unlockedAt: "2026-07-22", progress: 100 },
  { id: "hundred-entries", label: "Journal Master", description: "Create 100 journal entries", icon: "Trophy", unlocked: false, unlockedAt: null, progress: 68 },
  { id: "streak-7", label: "Week Warrior", description: "7-day journaling streak", icon: "Flame", unlocked: true, unlockedAt: "2026-07-18", progress: 100 },
  { id: "streak-30", label: "Monthly Commitment", description: "30-day journaling streak", icon: "Flame", unlocked: true, unlockedAt: "2026-07-28", progress: 100 },
  { id: "perfect-execution", label: "Perfect Execution", description: "Score 5/5 on entry, exit, and risk management", icon: "Target", unlocked: false, unlockedAt: null, progress: 45 },
  { id: "zero-violations", label: "Rule Follower", description: "10 trades with zero rule violations", icon: "Shield", unlocked: false, unlockedAt: null, progress: 60 },
  { id: "ai-improvement", label: "AI Approved", description: "AI score of 90+ on 5 consecutive trades", icon: "Brain", unlocked: false, unlockedAt: null, progress: 40 },
  { id: "emotional-mastery", label: "Emotional Mastery", description: "Log confident/calm emotion 20 times", icon: "Heart", unlocked: false, unlockedAt: null, progress: 75 },
];
