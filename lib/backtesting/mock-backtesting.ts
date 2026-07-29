import type { BacktestStrategy, BacktestResult, OptimizationRun, AiStrategyAnalysis, SimulatedTrade } from "./types";

const rand = (s: number) => { let n = s; return () => { n = (n * 1664525 + 1013904223) & 0x7fffffff; return n / 0x7fffffff; } };

function genEquity(total: number, base: number, seed: number) {
  const r = rand(seed);
  const points: { date: string; value: number }[] = [];
  const start = new Date("2026-01-01");
  for (let i = 0; i < total; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i * 2);
    const drift = (i / total) * base * 0.2;
    const noise = (r() - 0.5) * base * 0.05;
    points.push({ date: d.toISOString().slice(0, 10), value: Math.round(base + drift + noise) });
  }
  return points;
}

function genTrades(count: number, seed: number): SimulatedTrade[] {
  const r = rand(seed);
  const trades: SimulatedTrade[] = [];
  const start = new Date("2026-01-01");
  const symbols = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "TSLA", "META", "AMD", "SPY", "QQQ"];
  for (let i = 0; i < count; i++) {
    const ed = new Date(start);
    ed.setDate(ed.getDate() + Math.floor(r() * 180));
    const xd = new Date(ed);
    xd.setHours(xd.getHours() + Math.floor(r() * 24));
    const dir = r() > 0.5 ? "long" : "short";
    const ep = 100 + r() * 400;
    const epMove = (r() - 0.4) * ep * 0.03;
    const xp = dir === "long" ? ep + epMove : ep - epMove;
    const qty = Math.round(10 + r() * 90);
    const pnl = Math.round((xp - ep) * qty * (dir === "long" ? 1 : -1));
    const reasons = ["tp", "sl", "trailing", "time", "manual"] as const;
    trades.push({
      id: `bt-trade-${i}`,
      entryDate: ed.toISOString(),
      exitDate: xd.toISOString(),
      direction: dir,
      entryPrice: +ep.toFixed(2),
      exitPrice: +xp.toFixed(2),
      quantity: qty,
      pnl,
      pnlPercent: +(((xp - ep) / ep) * 100 * (dir === "long" ? 1 : -1)).toFixed(2),
      fees: Math.round(Math.abs(pnl) * 0.01),
      exitReason: reasons[Math.floor(r() * 5)],
      tags: [symbols[Math.floor(r() * symbols.length)], dir === "long" ? "Bullish" : "Bearish"],
    });
  }
  return trades;
}

export const mockStrategies: BacktestStrategy[] = [
  {
    id: "s1", name: "EMA Crossover", description: "Entry on fast EMA crossing above slow EMA, exit on cross below.",
    tags: ["Trend", "EMA"], isFavorite: true, isTemplate: true,
    config: { market: "Stocks", broker: "Interactive Brokers", account: "Margin", dateRange: ["2026-01-01", "2026-07-01"], timeframe: "1h", initialBalance: 100000, riskPerTrade: 2, commission: 0.01, spread: 0.02, slippage: 0.01, leverage: 1, executionModel: "slippage" },
    entryRules: [{ id: "er1", type: "indicator", conditions: ["EMA 12 > EMA 26", "Price > EMA 12", "Volume > 20 SMA"], enabled: true }],
    exitRules: [{ id: "ex1", type: "stop_loss", value: 2, enabled: true }, { id: "ex2", type: "take_profit", value: 4, enabled: true }, { id: "ex3", type: "trailing_stop", value: 1.5, enabled: true }],
  },
  {
    id: "s2", name: "Breakout Scanner", description: "Enter when price breaks above resistance with volume confirmation.",
    tags: ["Breakout", "Volume"], isFavorite: true, isTemplate: true,
    config: { market: "Stocks", broker: "Interactive Brokers", account: "Cash", dateRange: ["2026-01-01", "2026-07-01"], timeframe: "15m", initialBalance: 100000, riskPerTrade: 1.5, commission: 0.01, spread: 0.02, slippage: 0.02, leverage: 1, executionModel: "slippage" },
    entryRules: [{ id: "er2", type: "price_action", conditions: ["Price breaks 20-day high", "Volume > 1.5x average", "RSI > 55"], enabled: true }],
    exitRules: [{ id: "ex4", type: "stop_loss", value: 1.5, enabled: true }, { id: "ex5", type: "take_profit", value: 3, enabled: true }, { id: "ex6", type: "trailing_stop", value: 1, enabled: true }],
  },
  {
    id: "s3", name: "Mean Reversion", description: "Enter when price deviates 2+ standard deviations from VWAP.",
    tags: ["Reversion", "VWAP"], isFavorite: false, isTemplate: true,
    config: { market: "Stocks", broker: "TD Ameritrade", account: "Margin", dateRange: ["2026-01-01", "2026-07-01"], timeframe: "5m", initialBalance: 50000, riskPerTrade: 1, commission: 0.02, spread: 0.03, slippage: 0.01, leverage: 1, executionModel: "instant" },
    entryRules: [{ id: "er3", type: "indicator", conditions: ["Price 2 std dev below VWAP", "RSI < 30", "Volume > average"], enabled: true }],
    exitRules: [{ id: "ex7", type: "stop_loss", value: 1, enabled: true }, { id: "ex8", type: "take_profit", value: 2, enabled: true }, { id: "ex9", type: "breakeven", value: 0.5, enabled: true }],
  },
  {
    id: "s4", name: "Momentum Pullback", description: "Buy pullbacks to 20 EMA in strong uptrend with momentum.",
    tags: ["Momentum", "Pullback"], isFavorite: true, isTemplate: false,
    config: { market: "Stocks", broker: "Interactive Brokers", account: "Margin", dateRange: ["2026-01-01", "2026-07-01"], timeframe: "30m", initialBalance: 100000, riskPerTrade: 2, commission: 0.01, spread: 0.02, slippage: 0.01, leverage: 1, executionModel: "slippage" },
    entryRules: [{ id: "er4", type: "structure", conditions: ["Price above 50 EMA", "20 EMA > 50 EMA", "Pullback to 20 EMA", "Bullish engulfing candle"], enabled: true }],
    exitRules: [{ id: "ex10", type: "stop_loss", value: 2, enabled: true }, { id: "ex11", type: "take_profit", value: 4, enabled: true }, { id: "ex12", type: "time_exit", value: 24, enabled: true }],
  },
  {
    id: "s5", name: "VWAP Strategy", description: "Trade VWAP bounces with volume confirmation at support/resistance levels.",
    tags: ["VWAP", "Intraday"], isFavorite: false, isTemplate: false,
    config: { market: "Indices", broker: "TD Ameritrade", account: "Cash", dateRange: ["2026-01-01", "2026-07-01"], timeframe: "15m", initialBalance: 50000, riskPerTrade: 1.5, commission: 0.02, spread: 0.01, slippage: 0.01, leverage: 1, executionModel: "instant" },
    entryRules: [{ id: "er5", type: "indicator", conditions: ["Price at VWAP", "Volume spike > 2x", "RSI > 50 on bounce"], enabled: true }],
    exitRules: [{ id: "ex13", type: "stop_loss", value: 1, enabled: true }, { id: "ex14", type: "take_profit", value: 2, enabled: true }],
  },
  {
    id: "s6", name: "Gap Fill Strategy", description: "Trade gap fills with high probability after earnings or news gaps.",
    tags: ["Gaps", "Earnings"], isFavorite: true, isTemplate: false,
    config: { market: "Stocks", broker: "Interactive Brokers", account: "Margin", dateRange: ["2026-01-01", "2026-07-01"], timeframe: "1h", initialBalance: 100000, riskPerTrade: 2, commission: 0.01, spread: 0.02, slippage: 0.02, leverage: 1, executionModel: "slippage" },
    entryRules: [{ id: "er6", type: "price_action", conditions: ["Gap > 3% at open", "Price reaches 50% gap fill", "Volume declining"], enabled: true }],
    exitRules: [{ id: "ex15", type: "stop_loss", value: 1.5, enabled: true }, { id: "ex16", type: "take_profit", value: 3, enabled: true }],
  },
  {
    id: "s7", name: "ICT Killzone", description: "ICT concepts — trade during London/New York killzone with liquidity sweeps.",
    tags: ["ICT", "SMC"], isFavorite: false, isTemplate: false,
    config: { market: "Forex", broker: "OANDA", account: "Mini", dateRange: ["2026-01-01", "2026-07-01"], timeframe: "5m", initialBalance: 10000, riskPerTrade: 1, commission: 0, spread: 0.0001, slippage: 0.0001, leverage: 50, executionModel: "instant" },
    entryRules: [{ id: "er7", type: "ict", conditions: ["Liquidity sweep above high", "Price returns to fair value gap", "MSS confirmed"], enabled: true }],
    exitRules: [{ id: "ex17", type: "stop_loss", value: 1, enabled: true }, { id: "ex18", type: "take_profit", value: 2, enabled: true }],
  },
  {
    id: "s8", name: "Scalp Momentum", description: "Quick scalps with 1:1 R:R targeting small moves in liquid markets.",
    tags: ["Scalp", "Momentum"], isFavorite: false, isTemplate: false,
    config: { market: "Futures", broker: "AMP Futures", account: "Futures", dateRange: ["2026-01-01", "2026-07-01"], timeframe: "1m", initialBalance: 50000, riskPerTrade: 0.5, commission: 2.5, spread: 0.01, slippage: 0.01, leverage: 1, executionModel: "instant" },
    entryRules: [{ id: "er8", type: "price_action", conditions: ["Price breaks session high/low", "Volume spike", "1-minute momentum > 0.1%"], enabled: true }],
    exitRules: [{ id: "ex19", type: "stop_loss", value: 0.5, enabled: true }, { id: "ex20", type: "take_profit", value: 0.5, enabled: true }],
  },
];

const r1 = rand(42);
const r2 = rand(55);
const r3 = rand(68);
const r4 = rand(81);
const r5 = rand(94);
const r6 = rand(107);
const r7 = rand(120);
const r8 = rand(133);

function strat(name: string, id: string, trades: number, seed: number): BacktestResult {
  const r = rand(seed);
  const wins = Math.round(trades * (0.55 + r() * 0.2));
  const losses = trades - wins;
  const avgWin = 600 + r() * 800;
  const avgLoss = 300 + r() * 200;
  const pnl = wins * avgWin - losses * avgLoss;
  const totalWinsVal = wins * avgWin;
  const totalLossVal = losses * avgLoss;
  return {
    id: `result-${id}`, strategyId: id, strategyName: name, timestamp: "2026-07-28T10:00:00Z",
    duration: "6 months", netProfit: Math.round(pnl), grossProfit: Math.round(totalWinsVal),
    grossLoss: Math.round(-totalLossVal), profitFactor: +(totalWinsVal / (totalLossVal || 1)).toFixed(2),
    winRate: +(wins / trades * 100).toFixed(1), expectancy: Math.round(pnl / trades),
    avgRR: +(avgWin / avgLoss).toFixed(2), maxDrawdown: -+(5 + r() * 10).toFixed(1),
    recoveryFactor: +(pnl / (5 + r() * 10) / 1000).toFixed(2),
    sharpeRatio: +(1.2 + r() * 1.2).toFixed(2), sortinoRatio: +(1.5 + r() * 1.5).toFixed(2),
    totalTrades: trades, avgTrade: Math.round(pnl / trades),
    equityCurve: genEquity(60, 100000, seed),
    trades: genTrades(Math.min(trades, 30), seed),
    parameters: { "Stop Loss %": 2, "Take Profit %": 4, "Max Position": 100 },
  };
}

function optRun(id: string, sid: string, seed: number): OptimizationRun {
  const r = rand(seed);
  const count = 3 + Math.floor(r() * 5);
  const results: BacktestResult[] = [];
  for (let i = 0; i < count; i++) {
    results.push(strat(`Run ${i + 1}`, sid, 100 + Math.floor(r() * 100), seed + i));
  }
  const best = [...results].sort((a, b) => b.netProfit - a.netProfit)[0];
  const worst = [...results].sort((a, b) => a.netProfit - b.netProfit)[0];
  return {
    id, strategyId: sid,
    params: { "Stop Loss": { min: 1, max: 3, step: 0.5, current: 2 }, "Take Profit": { min: 2, max: 6, step: 0.5, current: 4 }, "Max Position": { min: 50, max: 200, step: 25, current: 100 } },
    results, bestParams: best.parameters, worstParams: worst.parameters,
  };
}

export const mockBacktestResults: BacktestResult[] = [
  strat("EMA Crossover", "s1", 156, 42),
  strat("Breakout Scanner", "s2", 89, 55),
  strat("Mean Reversion", "s3", 234, 68),
  strat("Momentum Pullback", "s4", 112, 81),
  strat("VWAP Strategy", "s5", 178, 94),
  strat("Gap Fill Strategy", "s6", 78, 107),
  strat("ICT Killzone", "s7", 45, 120),
  strat("Scalp Momentum", "s8", 312, 133),
];

export const mockOptimizationRuns: OptimizationRun[] = [
  optRun("opt1", "s1", 200),
  optRun("opt2", "s2", 300),
];

export const mockAiAnalyses: Record<string, AiStrategyAnalysis> = {
  s1: {
    strength: "Strong trend-following strategy with consistent win rate above 65%. Low drawdown during trending markets. Excellent risk-adjusted returns (Sharpe > 2).",
    weaknesses: ["Underperforms in ranging markets", "Whipsaws during low volatility", "Late entries on fast moves"],
    riskReview: "Correlation risk — all trades in same direction during trends. Consider adding a hedge mechanism for black swan events. Max drawdown of 12.4% is acceptable.",
    marketSuitability: ["Strong uptrends", "High volatility (VIX > 20)", "Liquid large caps"],
    bestSession: "New York AM (9:30-11:30)",
    bestPair: "SPY (73% win rate)",
    optimizationSuggestions: ["Add ATR filter to avoid low-volatility periods", "Optimize EMA period for each market", "Add volume confirmation to reduce false signals"],
    overallScore: 84,
  },
  s3: {
    strength: "Excellent mean reversion strategy with high Sharpe ratio. Works well in range-bound markets with defined support/resistance levels.",
    weaknesses: ["Poor performance during strong trends", "High drawdown during gap moves", "Requires active monitoring"],
    riskReview: "Strategy is vulnerable to overnight gaps and news events. Consider adding a news filter. Position sizing is conservative at 1% risk.",
    marketSuitability: ["Range-bound markets", "Low volatility environments", "High liquidity pairs"],
    bestSession: "London Open (3:00-5:00 AM ET)",
    bestPair: "MSFT (68% win rate)",
    optimizationSuggestions: ["Narrow Bollinger Band settings to 1.5 std dev", "Add volume filter to avoid low-liquidity periods", "Implement time-based exit before close"],
    overallScore: 76,
  },
};

export function getDefaultConfig() {
  return {
    market: "", broker: "", account: "", dateRange: ["", ""] as [string, string],
    timeframe: "1h" as const, initialBalance: 100000, riskPerTrade: 2,
    commission: 0.01, spread: 0.02, slippage: 0.01, leverage: 1, executionModel: "slippage" as const,
  };
}

export function getAiAnalysis(strategyId: string): AiStrategyAnalysis {
  return mockAiAnalyses[strategyId] || {
    strength: "Balanced strategy with moderate performance across market conditions.",
    weaknesses: ["Limited historical data for statistical significance"],
    riskReview: "Standard risk profile. Monitor drawdown during volatile periods.",
    marketSuitability: ["General market conditions"],
    bestSession: "New York Session",
    bestPair: "N/A",
    optimizationSuggestions: ["Increase sample size", "Backtest across multiple market regimes"],
    overallScore: 65,
  };
}
