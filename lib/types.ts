export interface Trade {
  id: string;
  symbol: string;
  direction: "long" | "short";
  entryDate: string;
  exitDate: string | null;
  entryPrice: number;
  exitPrice: number | null;
  quantity: number;
  pnl: number | null;
  pnlPercent: number | null;
  fees: number;
  tags: string[];
  notes: string;
  setup: string;
  emotion: string;
  mistake: string | null;
  lesson: string | null;
  screenshot: string | null;
  status: "open" | "closed";
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  equity: number;
  currency: string;
  broker: string;
  type: "spot" | "margin" | "futures";
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  deadline: string;
  category: "daily" | "weekly" | "monthly" | "yearly";
  status: "active" | "completed" | "cancelled";
}

export interface Playbook {
  id: string;
  title: string;
  description: string;
  setup: string;
  entry: string;
  exit: string;
  riskManagement: string;
  tags: string[];
  winRate: number;
  totalTrades: number;
}

export interface AnalyticsSummary {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  averagePnl: number;
  averageWin: number;
  averageLoss: number;
  maxDrawdown: number;
  sharpeRatio: number;
  totalPnl: number;
  consecutiveWins: number;
  consecutiveLosses: number;
  bestTrade: number;
  worstTrade: number;
}

export type NavigationItem = {
  label: string;
  href: string;
  icon: string;
  shortcut?: string;
  badge?: number;
  active?: boolean;
};
