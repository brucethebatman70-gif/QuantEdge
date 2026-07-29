export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ReplayEvent {
  id: string;
  type: "entry" | "exit" | "stop_loss" | "take_profit" | "sl_modify" | "tp_modify" | "partial_exit" | "add" | "journal" | "screenshot" | "ai_comment";
  time: string;
  price: number;
  label: string;
  description?: string;
}

export interface ReplayTrade {
  id: string;
  symbol: string;
  direction: "long" | "short";
  entryDate: string;
  exitDate: string | null;
  entryPrice: number;
  exitPrice: number | null;
  stopLoss: number;
  takeProfit: number;
  quantity: number;
  pnl: number | null;
  pnlPercent: number | null;
  fees: number;
  tags: string[];
  setup: string;
  emotion: string;
  mistake: string | null;
  lesson: string | null;
  status: "open" | "closed";
  market: string;
  broker: string;
  session: string;
  strategy: string;
  riskPercent: number;
  rMultiple: number;
  duration: string;
  candles: Candle[];
  events: ReplayEvent[];
  notes: string;
  screenshots: string[];
  annotations: Annotation[];
}

export interface Annotation {
  id: string;
  type: "arrow" | "circle" | "text" | "highlight" | "line";
  x: number;
  y: number;
  label?: string;
  color: string;
}

export interface AiReview {
  entryAnalysis: string;
  exitAnalysis: string;
  riskReview: string;
  executionScore: number;
  ruleViolations: { rule: string; severity: "low" | "medium" | "high" }[];
  emotionalNotes: string;
  improvements: string[];
  confidenceRating: number;
}

export interface PlaybackState {
  isPlaying: boolean;
  speed: 1 | 2 | 5 | 10;
  currentIndex: number;
  isFullscreen: boolean;
  compareMode: boolean;
  compareTradeId: string | null;
}
