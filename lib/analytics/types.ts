export type TimeGranularity = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
export type MarketType = "forex" | "crypto" | "indices" | "commodities" | "stocks" | "futures";
export type TradingSession = "asian" | "london" | "newyork" | "overlap";
export type EmotionType = "confident" | "calm" | "neutral" | "hopeful" | "aggressive" | "anxious" | "fomo" | "greedy" | "fearful" | "bored" | "frustrated" | "impatient" | "patient";

export interface AnalyticsKpi {
  label: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
  format: "currency" | "percent" | "number";
  inverse?: boolean;
  sparkline: number[];
}

export interface EquityPoint {
  date: string;
  equity: number;
  balance: number;
  drawdown: number;
}

export interface PerformancePeriod {
  period: string;
  trades: number;
  wins: number;
  losses: number;
  pnl: number;
  winRate: number;
  avgPnl: number;
  profitFactor: number;
}

export interface MarketPerformance {
  market: MarketType;
  trades: number;
  winRate: number;
  pnl: number;
  avgPnl: number;
  profitFactor: number;
}

export interface PairPerformance {
  pair: string;
  trades: number;
  winRate: number;
  pnl: number;
  avgRr: number;
  bestTrade: number;
  worstTrade: number;
}

export interface StrategyPerformance {
  strategy: string;
  trades: number;
  winRate: number;
  avgRr: number;
  expectancy: number;
  drawdown: number;
  consistency: number;
}

export interface SessionPerformance {
  session: TradingSession;
  trades: number;
  winRate: number;
  pnl: number;
  avgPnl: number;
  hourlyData: { hour: number; winRate: number; volume: number }[];
}

export interface RiskDistribution {
  bucket: string;
  count: number;
  pnl: number;
}

export interface PsychologyTrend {
  date: string;
  confidence: number;
  fear: number;
  greed: number;
  discipline: number;
  patience: number;
}

export interface CalendarDay {
  date: string;
  pnl: number;
  trades: number;
  winRate: number;
}

export interface AiInsight {
  type: "positive" | "warning" | "tip";
  category: "pattern" | "mistake" | "strategy" | "behavior" | "risk" | "psychology";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  metric?: string;
  change?: number;
}

export interface AnalyticsFilters {
  dateRange: [Date, Date] | null;
  account: string | null;
  broker: string | null;
  market: MarketType | null;
  pair: string | null;
  strategy: string | null;
  session: TradingSession | null;
  direction: "long" | "short" | null;
  riskRange: [number, number] | null;
  tags: string[];
  search: string;
}

export interface AnalyticsData {
  kpis: AnalyticsKpi[];
  equityCurve: EquityPoint[];
  dailyPerformance: PerformancePeriod[];
  weeklyPerformance: PerformancePeriod[];
  monthlyPerformance: PerformancePeriod[];
  quarterlyPerformance: PerformancePeriod[];
  yearlyPerformance: PerformancePeriod[];
  marketPerformance: MarketPerformance[];
  pairPerformance: PairPerformance[];
  strategyPerformance: StrategyPerformance[];
  sessionPerformance: SessionPerformance[];
  riskDistribution: RiskDistribution[];
  positionSizeDistribution: RiskDistribution[];
  psychologyTrends: PsychologyTrend[];
  calendarData: CalendarDay[];
  aiInsights: AiInsight[];
}
