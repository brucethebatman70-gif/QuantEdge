export type Timeframe = "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d" | "1w";
export type ExecutionModel = "instant" | "slippage" | "partial";
export type IndicatorType = "ema" | "sma" | "rsi" | "macd" | "bb" | "vwap" | "atr" | "stoch";

export interface BacktestConfig {
  market: string;
  broker: string;
  account: string;
  dateRange: [string, string];
  timeframe: Timeframe;
  initialBalance: number;
  riskPerTrade: number;
  commission: number;
  spread: number;
  slippage: number;
  leverage: number;
  executionModel: ExecutionModel;
}

export interface EntryRule {
  id: string;
  type: "indicator" | "price_action" | "structure" | "liquidity" | "smc" | "ict" | "custom";
  conditions: string[];
  enabled: boolean;
}

export interface ExitRule {
  id: string;
  type: "stop_loss" | "take_profit" | "trailing_stop" | "breakeven" | "partial_tp" | "time_exit" | "manual";
  value: number;
  enabled: boolean;
}

export interface BacktestStrategy {
  id: string;
  name: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
  isTemplate: boolean;
  config: BacktestConfig;
  entryRules: EntryRule[];
  exitRules: ExitRule[];
}

export interface BacktestResult {
  id: string;
  strategyId: string;
  strategyName: string;
  timestamp: string;
  duration: string;
  netProfit: number;
  grossProfit: number;
  grossLoss: number;
  profitFactor: number;
  winRate: number;
  expectancy: number;
  avgRR: number;
  maxDrawdown: number;
  recoveryFactor: number;
  sharpeRatio: number;
  sortinoRatio: number;
  totalTrades: number;
  avgTrade: number;
  equityCurve: { date: string; value: number }[];
  trades: SimulatedTrade[];
  parameters: Record<string, number>;
}

export interface SimulatedTrade {
  id: string;
  entryDate: string;
  exitDate: string;
  direction: "long" | "short";
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  pnlPercent: number;
  fees: number;
  exitReason: "tp" | "sl" | "trailing" | "time" | "manual";
  tags: string[];
}

export interface OptimizationRun {
  id: string;
  strategyId: string;
  params: Record<string, { min: number; max: number; step: number; current: number }>;
  results: BacktestResult[];
  bestParams: Record<string, number>;
  worstParams: Record<string, number>;
}

export interface AiStrategyAnalysis {
  strength: string;
  weaknesses: string[];
  riskReview: string;
  marketSuitability: string[];
  bestSession: string;
  bestPair: string;
  optimizationSuggestions: string[];
  overallScore: number;
}

export interface BacktestStoreState {
  activeTab: string;
  selectedStrategyId: string | null;
  selectedResultId: string | null;
  compareIds: string[];
}
