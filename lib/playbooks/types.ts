export type PlaybookCategory =
  | "scalping" | "swing" | "smc" | "ict" | "liquidity"
  | "breakout" | "trend" | "reversal" | "news" | "custom"
  | "favorites" | "archived";

export type RiskProfile = "low" | "medium" | "high";
export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";
export type PlaybookMarket = "stocks" | "forex" | "crypto" | "indices" | "futures" | "commodities";

export interface PlaybookSetup {
  marketConditions: string;
  entryRules: string[];
  confirmationRules: string[];
  invalidationRules: string[];
  stopLossRules: string[];
  takeProfitRules: string[];
  managementRules: string[];
  riskRules: string[];
  commonMistakes: string[];
  checklist: string[];
}

export interface PlaybookExample {
  id: string;
  type: "winning" | "losing";
  title: string;
  description: string;
  screenshots: string[];
  replayLink?: string;
  journalLink?: string;
  analyticsLink?: string;
  pnl?: number;
  date?: string;
}

export interface PlaybookVersion {
  id: string;
  version: number;
  timestamp: string;
  changes: string;
}

export interface Playbook {
  id: string;
  title: string;
  coverImage?: string;
  description: string;
  category: PlaybookCategory;
  tags: string[];
  market: PlaybookMarket[];
  timeframes: string[];
  riskProfile: RiskProfile;
  difficulty: Difficulty;
  expectedRR: number;
  winRate: number;
  totalTrades: number;
  netProfit: number;
  avgRR: number;
  expectancy: number;
  maxDrawdown: number;
  consistencyScore: number;
  setup: PlaybookSetup;
  examples: PlaybookExample[];
  versions: PlaybookVersion[];
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlaybookFilter {
  search: string;
  category: PlaybookCategory | "all";
  difficulty: Difficulty | "all";
  market: PlaybookMarket | "all";
  tags: string[];
}

export interface AiAnalysis {
  summary: string;
  suggestions: string[];
  weaknesses: string[];
  missingRules: string[];
  reviewQuestions: string[];
  confidenceScore: number;
}

export const PLAYBOOK_CATEGORIES: { value: PlaybookCategory; label: string; icon: string }[] = [
  { value: "scalping", label: "Scalping", icon: "Zap" },
  { value: "swing", label: "Swing", icon: "TrendingUp" },
  { value: "smc", label: "SMC", icon: "Layers" },
  { value: "ict", label: "ICT", icon: "Brain" },
  { value: "liquidity", label: "Liquidity", icon: "Droplets" },
  { value: "breakout", label: "Breakout", icon: "ArrowUpRight" },
  { value: "trend", label: "Trend", icon: "LineChart" },
  { value: "reversal", label: "Reversal", icon: "Repeat" },
  { value: "news", label: "News", icon: "Radio" },
  { value: "custom", label: "Custom", icon: "Wrench" },
  { value: "favorites", label: "Favorites", icon: "Star" },
  { value: "archived", label: "Archived", icon: "Archive" },
];

export const RISK_PROFILES: { value: RiskProfile; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "text-success" },
  { value: "medium", label: "Medium", color: "text-warning" },
  { value: "high", label: "High", color: "text-error" },
];

export const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];
