export type BrokerPlatform =
  | "mt4" | "mt5" | "tradingview" | "ctrader" | "dxtrade"
  | "matchtrader" | "ninjatrader" | "tradelocker"
  | "binance" | "bybit" | "okx";

export type ImportMethod = "oauth" | "api" | "csv" | "xlsx" | "json" | "manual";

export type ImportStatus = "idle" | "connecting" | "fetching" | "parsing" | "validating" | "importing" | "completed" | "failed" | "cancelled";

export type ValidationSeverity = "error" | "warning" | "info";

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ImportTrade {
  id: string;
  tradeId?: string;
  date: string;
  pair: string;
  direction: "buy" | "sell";
  entry: number;
  exit: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  volume: number;
  commission: number;
  swap: number;
  pnl: number | null;
  status: "open" | "closed";
  broker: string;
}

export interface BrokerConnection {
  id: string;
  platform: BrokerPlatform;
  name: string;
  status: "connected" | "disconnected" | "error";
  accounts: BrokerAccount[];
  lastSync: string | null;
}

export interface BrokerAccount {
  id: string;
  number: string;
  name: string;
  currency: string;
  balance: number;
  equity: number;
  type: "live" | "demo";
}

export interface ImportSession {
  id: string;
  source: string;
  method: ImportMethod;
  status: ImportStatus;
  trades: ImportTrade[];
  validatedTrades: ValidatedTrade[];
  errors: ValidationIssue[];
  progress: ImportProgress;
  startedAt: string;
  completedAt: string | null;
}

export interface ValidatedTrade extends ImportTrade {
  validationStatus: "valid" | "warning" | "error";
  validationMessages: string[];
}

export interface ValidationIssue {
  id: string;
  tradeId: string;
  severity: ValidationSeverity;
  field: string;
  message: string;
  suggestion: string;
}

export interface ImportProgress {
  total: number;
  imported: number;
  skipped: number;
  failed: number;
  percent: number;
}

export interface ImportHistoryItem {
  id: string;
  source: string;
  method: ImportMethod;
  date: string;
  importedTrades: number;
  failedTrades: number;
  duration: string;
  status: "success" | "partial" | "failed";
}

export interface WizardState {
  step: WizardStep;
  source: BrokerPlatform | null;
  method: ImportMethod | null;
  connection: BrokerConnection | null;
  account: BrokerAccount | null;
  dateRange: { start: string; end: string } | null;
  trades: ImportTrade[];
  validatedTrades: ValidatedTrade[];
  errors: ValidationIssue[];
}

export interface AiInsight {
  type: "duplicate" | "incorrect-symbol" | "timezone" | "missing-sl" | "missing-tp" | "risk-inconsistency";
  severity: ValidationSeverity;
  message: string;
  suggestion: string;
  trades: string[];
}

export const BROKER_PLATFORMS: { id: BrokerPlatform; name: string; description: string; formats: string[]; color: string }[] = [
  { id: "mt4", name: "MetaTrader 4", description: "Industry-standard forex and CFD trading platform", formats: ["CSV", "API"], color: "#2196F3" },
  { id: "mt5", name: "MetaTrader 5", description: "Multi-asset platform with advanced tools", formats: ["CSV", "API"], color: "#1565C0" },
  { id: "tradingview", name: "TradingView", description: "Premier charting and social trading network", formats: ["OAuth", "CSV"], color: "#2962FF" },
  { id: "ctrader", name: "cTrader", description: "ECN trading platform with advanced features", formats: ["API", "CSV"], color: "#00897B" },
  { id: "dxtrade", name: "DXtrade", description: "Multi-asset brokerage platform", formats: ["API", "CSV"], color: "#5C6BC0" },
  { id: "matchtrader", name: "MatchTrader", description: "Modern mobile-first trading platform", formats: ["API", "CSV"], color: "#7B1FA2" },
  { id: "ninjatrader", name: "NinjaTrader", description: "Advanced futures and forex trading platform", formats: ["CSV", "API"], color: "#F57C00" },
  { id: "tradelocker", name: "TradeLocker", description: "Web-based trading platform", formats: ["API", "CSV"], color: "#2E7D32" },
  { id: "binance", name: "Binance", description: "World's largest cryptocurrency exchange", formats: ["API", "CSV", "JSON"], color: "#F0B90B" },
  { id: "bybit", name: "Bybit", description: "Leading crypto derivatives exchange", formats: ["API", "CSV"], color: "#F7A600" },
  { id: "okx", name: "OKX", description: "Global cryptocurrency exchange and DeFi platform", formats: ["API", "CSV", "JSON"], color: "#0A0A0A" },
];
