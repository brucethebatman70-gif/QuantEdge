import { generateId, wait } from "@/lib/utils";
import type { BrokerPlatform, ImportMethod, ImportTrade, ImportSession, ImportHistoryItem, ValidationIssue, ValidatedTrade, BrokerConnection, BrokerAccount, AiInsight } from "./types";

const mockAccounts: Record<string, BrokerAccount[]> = {
  mt4: [{ id: "acc1", number: "1234567", name: "Main Forex Account", currency: "USD", balance: 52450, equity: 53120, type: "demo" }],
  mt5: [{ id: "acc2", number: "7654321", name: "Multi-Asset Portfolio", currency: "USD", balance: 125800, equity: 128400, type: "demo" }],
  tradingview: [{ id: "acc3", number: "TV-89234", name: "Paper Trading Account", currency: "USD", balance: 100000, equity: 102340, type: "demo" }],
  ctrader: [{ id: "acc4", number: "40891234", name: "ECN Live", currency: "EUR", balance: 45000, equity: 46200, type: "live" }],
  binance: [{ id: "acc5", number: "BIN-78451", name: "Spot Wallet", currency: "USDT", balance: 28450, equity: 29100, type: "live" }],
};

function generateMockTrades(platform: BrokerPlatform, count: number): ImportTrade[] {
  const pairs: Record<string, string[]> = {
    mt4: ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "GBPJPY", "USDCHF", "USDCAD", "NZDUSD"],
    mt5: ["EURUSD", "GBPUSD", "USDJPY", "AAPL", "TSLA", "NVDA", "BTCUSD", "XAUUSD"],
    tradingview: ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN", "GOOGL", "META", "SPY", "QQQ"],
    ctrader: ["EURUSD", "GBPUSD", "USDJPY", "XAUUSD", "BTCUSD", "ETHUSD"],
    dxtrade: ["EURUSD", "GBPUSD", "USDJPY", "AAPL", "TSLA"],
    matchtrader: ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"],
    ninjatrader: ["ES", "NQ", "YM", "RTY", "CL", "GC", "6E"],
    tradelocker: ["EURUSD", "GBPUSD", "USDJPY", "XAUUSD"],
    binance: ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT", "DOGEUSDT", "AVAXUSDT"],
    bybit: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "ARBUSDT"],
    okx: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "OPUSDT", "MATICUSDT"],
  };

  const platformPairs = pairs[platform] || pairs.mt4;
  const trades: ImportTrade[] = [];

  for (let i = 0; i < count; i++) {
    const pair = platformPairs[i % platformPairs.length];
    const direction = Math.random() > 0.5 ? "buy" : "sell";
    const entry = platform === "binance" || platform === "bybit" || platform === "okx"
      ? parseFloat((Math.random() * 50000 + 100).toFixed(2))
      : parseFloat((Math.random() * 200 + 0.5).toFixed(5));
    const exit = direction === "buy"
      ? parseFloat((entry * (1 + (Math.random() - 0.4) * 0.02)).toFixed(5))
      : parseFloat((entry * (1 + (Math.random() - 0.6) * 0.02)).toFixed(5));
    const volume = parseFloat((Math.random() * 5 + 0.01).toFixed(2));
    const diff = direction === "buy" ? exit - entry : entry - exit;
    const pnl = parseFloat((diff * volume * (platform === "binance" ? 1 : 1000)).toFixed(2));

    const day = 28 - Math.floor(i / 3);
    const hour = 8 + Math.floor(Math.random() * 9);
    const minute = Math.floor(Math.random() * 60);

    trades.push({
      id: generateId(),
      tradeId: `${platform.toUpperCase()}-${String(i + 1).padStart(4, "0")}`,
      date: `2026-07-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`,
      pair,
      direction,
      entry,
      exit: Math.random() > 0.1 ? exit : null,
      stopLoss: parseFloat((entry * (1 - (direction === "buy" ? 0.02 : -0.02))).toFixed(5)),
      takeProfit: parseFloat((entry * (1 + (direction === "buy" ? 0.04 : -0.04))).toFixed(5)),
      volume,
      commission: parseFloat((Math.random() * 15 + 0.5).toFixed(2)),
      swap: parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
      pnl,
      status: Math.random() > 0.1 ? "closed" : "open",
      broker: platform,
    });
  }

  return trades.sort((a, b) => b.date.localeCompare(a.date));
}

function generateMockValidation(method: ImportMethod, trades: ImportTrade[]): { validated: ValidatedTrade[]; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];
  const validated: ValidatedTrade[] = trades.map((trade) => {
    const msgs: string[] = [];
    let status: "valid" | "warning" | "error" = "valid";

    if (trade.exit === null && trade.status === "closed") {
      msgs.push("Exit price is missing for closed trade");
      status = "error";
      issues.push({ id: generateId(), tradeId: trade.id, severity: "error", field: "exit", message: "Exit price is missing for closed trade", suggestion: "Update the exit price or mark the trade as open" });
    }
    if (trade.stopLoss === null) {
      msgs.push("Stop loss not set — high risk trade");
      if (status !== "error") status = "warning";
      issues.push({ id: generateId(), tradeId: trade.id, severity: "warning", field: "stopLoss", message: "Stop loss not set", suggestion: "Consider adding a stop loss to manage risk" });
    }
    if (trade.takeProfit === null) {
      msgs.push("Take profit not set");
      if (status !== "error") status = "warning";
      issues.push({ id: generateId(), tradeId: trade.id, severity: "warning", field: "takeProfit", message: "Take profit not set", suggestion: "Set a take profit target for this trade" });
    }

    return { ...trade, validationStatus: status, validationMessages: msgs };
  });

  return { validated, issues };
}

function generateAiInsights(trades: ImportTrade[], validated: ValidatedTrade[]): AiInsight[] {
  const insights: AiInsight[] = [];

  const pairCounts = new Map<string, { date: string; trade: ImportTrade }[]>();
  trades.forEach((t) => {
    if (!pairCounts.has(t.pair)) pairCounts.set(t.pair, []);
    pairCounts.get(t.pair)!.push({ date: t.date, trade: t });
  });

  pairCounts.forEach((entries, symbol) => {
    const dateMap = new Map<string, ImportTrade[]>();
    entries.forEach((e) => {
      const day = e.date.slice(0, 10);
      if (!dateMap.has(day)) dateMap.set(day, []);
      dateMap.get(day)!.push(e.trade);
    });
    dateMap.forEach((dayTrades, day) => {
      if (dayTrades.length > 2) {
        insights.push({
          type: "duplicate",
          severity: "warning",
          message: `Potential duplicate trades detected for ${symbol} on ${day}`,
          suggestion: "Review these trades — they may be duplicates or partial fills",
          trades: dayTrades.map((t) => t.id),
        });
      }
    });
  });

  const missingSL = validated.filter((t) => t.validationMessages.some((m) => m.includes("Stop loss")));
  if (missingSL.length > 0) {
    insights.push({
      type: "missing-sl",
      severity: "warning",
      message: `${missingSL.length} trades are missing stop losses`,
      suggestion: "Add stop losses to protect against unexpected market moves",
      trades: missingSL.map((t) => t.id),
    });
  }

  const highRisk = trades.filter((t) => Math.abs(t.pnl || 0) / t.volume > 1000);
  if (highRisk.length > 0) {
    insights.push({
      type: "risk-inconsistency",
      severity: "info",
      message: `${highRisk.length} trades show high risk relative to position size`,
      suggestion: "Review position sizing — consider reducing volume on volatile pairs",
      trades: highRisk.map((t) => t.id),
    });
  }

  return insights;
}

export const importService = {
  async connectBroker(platform: BrokerPlatform): Promise<BrokerConnection> {
    await wait(2000);
    const platformInfo = (await import("./types")).BROKER_PLATFORMS.find((p) => p.id === platform);
    return {
      id: generateId(),
      platform,
      name: platformInfo?.name || platform,
      status: "connected",
      accounts: mockAccounts[platform] || [
        { id: generateId(), number: "DEMO001", name: "Demo Account", currency: "USD", balance: 100000, equity: 100000, type: "demo" },
      ],
      lastSync: new Date().toISOString(),
    };
  },

  async fetchTrades(platform: BrokerPlatform, method: ImportMethod, _accountId: string, dateRange: { start: string; end: string }): Promise<ImportTrade[]> {
    await wait(1500);
    const count = Math.floor(Math.random() * 30 + 10);
    return generateMockTrades(platform, count);
  },

  async parseFile(file: File): Promise<ImportTrade[]> {
    await wait(1200);
    const ext = file.name.split(".").pop()?.toLowerCase();
    const platform = (ext === "csv" || ext === "xlsx" || ext === "json")
      ? "tradingview" as BrokerPlatform
      : "tradingview" as BrokerPlatform;
    return generateMockTrades(platform, Math.floor(Math.random() * 20 + 5));
  },

  async validateTrades(method: ImportMethod, trades: ImportTrade[]): Promise<{ validated: ValidatedTrade[]; issues: ValidationIssue[] }> {
    await wait(800);
    return generateMockValidation(method, trades);
  },

  async getAiInsights(trades: ImportTrade[], validated: ValidatedTrade[]): Promise<AiInsight[]> {
    await wait(600);
    return generateAiInsights(trades, validated);
  },

  async importTrades(trades: ValidatedTrade[], onProgress: (pct: number) => void): Promise<{ imported: number; skipped: number; failed: number }> {
    let imported = 0, skipped = 0, failed = 0;
    for (let i = 0; i < trades.length; i++) {
      await wait(150);
      if (trades[i].validationStatus === "error") {
        failed++;
      } else if (Math.random() > 0.92) {
        skipped++;
      } else {
        imported++;
      }
      onProgress(Math.round(((i + 1) / trades.length) * 100));
    }
    return { imported, skipped, failed };
  },

  async getImportHistory(): Promise<ImportHistoryItem[]> {
    await wait(500);
    return [
      { id: "h1", source: "MetaTrader 4", method: "api", date: "2026-07-27T14:30:00", importedTrades: 48, failedTrades: 2, duration: "12s", status: "success" },
      { id: "h2", source: "Binance", method: "csv", date: "2026-07-26T09:15:00", importedTrades: 156, failedTrades: 5, duration: "35s", status: "partial" },
      { id: "h3", source: "TradingView", method: "oauth", date: "2026-07-25T16:45:00", importedTrades: 32, failedTrades: 0, duration: "8s", status: "success" },
      { id: "h4", source: "cTrader", method: "api", date: "2026-07-24T11:20:00", importedTrades: 89, failedTrades: 12, duration: "22s", status: "partial" },
      { id: "h5", source: "Bybit", method: "api", date: "2026-07-23T08:00:00", importedTrades: 0, failedTrades: 34, duration: "15s", status: "failed" },
      { id: "h6", source: "CSV Upload", method: "csv", date: "2026-07-22T13:10:00", importedTrades: 24, failedTrades: 1, duration: "6s", status: "success" },
    ];
  },

  async deleteHistoryItem(_id: string): Promise<void> {
    await wait(300);
  },

  async reimportHistoryItem(_id: string): Promise<void> {
    await wait(2000);
  },
};
