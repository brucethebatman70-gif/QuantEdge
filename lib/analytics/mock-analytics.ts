import type { AnalyticsData, EquityPoint, PerformancePeriod, MarketPerformance, PairPerformance, StrategyPerformance, SessionPerformance, PsychologyTrend, CalendarDay, AiInsight } from "./types";

const rng = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
};

const rand = rng(42);

function perfPeriod(period: string, base: number): PerformancePeriod {
  const trades = Math.round(base + rand() * 20);
  const wins = Math.round(trades * (0.55 + rand() * 0.25));
  const losses = trades - wins;
  const winRate = (wins / trades) * 100;
  const avgWin = 800 + rand() * 1200;
  const avgLoss = 300 + rand() * 400;
  const pnl = Math.round(wins * avgWin - losses * avgLoss);
  const avgPnl = Math.round(pnl / trades);
  const profitFactor = losses > 0 ? parseFloat(((wins * avgWin) / (losses * avgLoss)).toFixed(2)) : 99;
  return { period, trades, wins, losses, pnl, winRate, avgPnl, profitFactor };
}

function equityPoint(date: string, baseEquity: number, i: number, total: number): EquityPoint {
  const trend = Math.sin((i / total) * Math.PI * 2) * 3000;
  const noise = (rand() - 0.5) * 4000;
  const drift = (i / total) * 15000;
  const equity = Math.round(baseEquity + drift + trend + noise);
  const balance = Math.round(baseEquity + drift + noise * 0.7);
  const dd = -Math.round(Math.abs(Math.sin(i / 5)) * (rand() * 5 + 2) * 100) / 100;
  const drawdown = i > 2 ? Math.min(dd, 0) : 0;
  return { date, equity, balance, drawdown };
}

function calendarDay(date: string): CalendarDay {
  const trades = Math.floor(rand() * 6);
  const wins = Math.floor(trades * (0.4 + rand() * 0.4));
  const winRate = trades > 0 ? Math.round((wins / trades) * 100) : 0;
  const avgPnl = rand() * 800 - 200;
  const pnl = Math.round(trades * avgPnl);
  return { date, pnl, trades, winRate };
}

export const mockAnalyticsData: AnalyticsData = {
  kpis: [
    { label: "Net Profit", value: 28450.32, change: 12.5, prefix: "$", format: "currency", sparkline: [1000, 3200, 2800, 5600, 4100, 7200, 8450].map((v, i) => v * (1 + i * 0.15)) },
    { label: "Gross Profit", value: 52340.00, change: 8.3, prefix: "$", format: "currency", sparkline: [5000, 6200, 5800, 8100, 7400, 9200, 10640] },
    { label: "Gross Loss", value: -23890.00, change: -5.1, prefix: "$", format: "currency", inverse: true, sparkline: [4200, 3800, 5100, 3500, 4600, 2700, 2990] },
    { label: "Win Rate", value: 67.8, change: 3.2, suffix: "%", format: "percent", sparkline: [58, 62, 65, 63, 68, 71, 67.8] },
    { label: "Profit Factor", value: 2.84, change: 0.42, format: "number", sparkline: [1.8, 2.1, 2.3, 2.0, 2.5, 2.7, 2.84] },
    { label: "Expectancy", value: 182.50, change: 15.20, prefix: "$", format: "currency", sparkline: [95, 120, 145, 130, 160, 175, 182.5] },
    { label: "Avg R:R", value: 2.45, change: 0.18, format: "number", sparkline: [1.8, 2.0, 2.2, 2.1, 2.3, 2.4, 2.45] },
    { label: "Avg Trade", value: 245.80, change: 32.40, prefix: "$", format: "currency", sparkline: [120, 155, 180, 165, 210, 230, 245.8] },
    { label: "Largest Win", value: 8450.00, change: 12.8, prefix: "$", format: "currency", sparkline: [3200, 4100, 5600, 4800, 6200, 7800, 8450] },
    { label: "Largest Loss", value: -3200.00, change: -8.2, prefix: "$", format: "currency", inverse: true, sparkline: [1800, 2200, 2800, 2400, 3100, 2900, 3200] },
    { label: "Current Streak", value: 5, change: 2, suffix: " wins", format: "number", sparkline: [1, 0, 2, 1, 3, 4, 5] },
    { label: "Max Drawdown", value: -8.2, change: -2.1, suffix: "%", format: "percent", inverse: true, sparkline: [12, 10, 14, 9, 11, 8, 8.2] },
  ],

  equityCurve: (() => {
    const points: EquityPoint[] = [];
    const start = new Date("2026-01-01");
    const base = 100000;
    for (let i = 0; i < 180; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i * 2);
      points.push(equityPoint(d.toISOString().slice(0, 10), base, i, 180));
    }
    return points;
  })(),

  dailyPerformance: [
    perfPeriod("Mon", 8), perfPeriod("Tue", 10), perfPeriod("Wed", 9),
    perfPeriod("Thu", 11), perfPeriod("Fri", 7), perfPeriod("Sat", 2), perfPeriod("Sun", 1),
  ],

  weeklyPerformance: Array.from({ length: 26 }, (_, i) => {
    const d = new Date("2026-01-05");
    d.setDate(d.getDate() + i * 7);
    return perfPeriod(`W${i + 1}`, 12 + rand() * 4);
  }),

  monthlyPerformance: [
    { period: "Jan", trades: 28, wins: 18, losses: 10, pnl: 3200, winRate: 64.3, avgPnl: 114, profitFactor: 2.1 },
    { period: "Feb", trades: 32, wins: 17, losses: 15, pnl: -1800, winRate: 53.1, avgPnl: -56, profitFactor: 0.85 },
    { period: "Mar", trades: 35, wins: 24, losses: 11, pnl: 5600, winRate: 68.6, avgPnl: 160, profitFactor: 3.2 },
    { period: "Apr", trades: 30, wins: 20, losses: 10, pnl: 4100, winRate: 66.7, avgPnl: 137, profitFactor: 2.6 },
    { period: "May", trades: 26, wins: 17, losses: 9, pnl: 2800, winRate: 65.4, avgPnl: 108, profitFactor: 2.3 },
    { period: "Jun", trades: 38, wins: 26, losses: 12, pnl: 7200, winRate: 68.4, avgPnl: 189, profitFactor: 3.5 },
    { period: "Jul", trades: 34, wins: 24, losses: 10, pnl: 8450, winRate: 70.6, avgPnl: 249, profitFactor: 3.8 },
  ],

  quarterlyPerformance: [
    perfPeriod("Q1 2026", 85), perfPeriod("Q2 2026", 92), perfPeriod("Q3 2026", 78),
  ],

  yearlyPerformance: [
    perfPeriod("2022", 180), perfPeriod("2023", 220), perfPeriod("2024", 280),
    perfPeriod("2025", 310), perfPeriod("2026", 200),
  ],

  marketPerformance: [
    { market: "stocks", trades: 142, winRate: 68.3, pnl: 12450, avgPnl: 88, profitFactor: 2.8 },
    { market: "crypto", trades: 68, winRate: 61.8, pnl: 6720, avgPnl: 99, profitFactor: 2.1 },
    { market: "indices", trades: 95, winRate: 72.6, pnl: 15840, avgPnl: 167, profitFactor: 3.4 },
    { market: "forex", trades: 42, winRate: 59.5, pnl: 2340, avgPnl: 56, profitFactor: 1.6 },
    { market: "commodities", trades: 28, winRate: 64.3, pnl: 3120, avgPnl: 111, profitFactor: 2.2 },
    { market: "futures", trades: 35, winRate: 71.4, pnl: 5890, avgPnl: 168, profitFactor: 3.1 },
  ],

  pairPerformance: [
    { pair: "AAPL", trades: 42, winRate: 71.4, pnl: 12450, avgRr: 2.8, bestTrade: 2450, worstTrade: -890 },
    { pair: "MSFT", trades: 35, winRate: 68.6, pnl: 6780, avgRr: 2.4, bestTrade: 1820, worstTrade: -650 },
    { pair: "NVDA", trades: 29, winRate: 65.5, pnl: 8920, avgRr: 3.1, bestTrade: 3200, worstTrade: -1200 },
    { pair: "AMZN", trades: 31, winRate: 74.2, pnl: 10340, avgRr: 2.9, bestTrade: 2800, worstTrade: -750 },
    { pair: "GOOGL", trades: 27, winRate: 59.3, pnl: 2150, avgRr: 1.8, bestTrade: 1200, worstTrade: -980 },
    { pair: "TSLA", trades: 38, winRate: 55.3, pnl: -2340, avgRr: 1.5, bestTrade: 1800, worstTrade: -3200 },
    { pair: "META", trades: 24, winRate: 70.8, pnl: 5670, avgRr: 2.6, bestTrade: 2100, worstTrade: -580 },
    { pair: "SPY", trades: 52, winRate: 73.1, pnl: 14890, avgRr: 3.2, bestTrade: 3400, worstTrade: -920 },
    { pair: "QQQ", trades: 45, winRate: 68.9, pnl: 9870, avgRr: 2.5, bestTrade: 2600, worstTrade: -1100 },
    { pair: "COIN", trades: 18, winRate: 61.1, pnl: 3450, avgRr: 2.2, bestTrade: 1500, worstTrade: -890 },
    { pair: "EUR/USD", trades: 22, winRate: 59.1, pnl: 1340, avgRr: 1.6, bestTrade: 680, worstTrade: -420 },
    { pair: "BTC/USD", trades: 15, winRate: 66.7, pnl: 4560, avgRr: 2.7, bestTrade: 2100, worstTrade: -780 },
  ],

  strategyPerformance: [
    { strategy: "Breakout", trades: 85, winRate: 72, avgRr: 2.8, expectancy: 420, drawdown: -5.2, consistency: 88 },
    { strategy: "Pullback", trades: 62, winRate: 68, avgRr: 2.4, expectancy: 310, drawdown: -6.8, consistency: 82 },
    { strategy: "Momentum", trades: 73, winRate: 65, avgRr: 2.1, expectancy: 280, drawdown: -8.5, consistency: 75 },
    { strategy: "Reversal", trades: 48, winRate: 58, avgRr: 1.8, expectancy: -85, drawdown: -14.2, consistency: 45 },
    { strategy: "Earnings", trades: 35, winRate: 71, avgRr: 3.2, expectancy: 680, drawdown: -4.1, consistency: 91 },
    { strategy: "VWAP", trades: 56, winRate: 66, avgRr: 2.2, expectancy: 195, drawdown: -7.4, consistency: 78 },
    { strategy: "Scalp", trades: 92, winRate: 61, avgRr: 1.5, expectancy: 85, drawdown: -10.1, consistency: 62 },
    { strategy: "Swing", trades: 44, winRate: 73, avgRr: 3.5, expectancy: 520, drawdown: -4.8, consistency: 85 },
  ],

  sessionPerformance: [
    {
      session: "newyork", trades: 156, winRate: 68.5, pnl: 15840, avgPnl: 102,
      hourlyData: [
        { hour: 9, winRate: 62, volume: 18 }, { hour: 10, winRate: 71, volume: 28 },
        { hour: 11, winRate: 65, volume: 22 }, { hour: 12, winRate: 58, volume: 15 },
        { hour: 13, winRate: 72, volume: 24 }, { hour: 14, winRate: 69, volume: 20 },
        { hour: 15, winRate: 74, volume: 16 }, { hour: 16, winRate: 67, volume: 13 },
      ],
    },
    {
      session: "london", trades: 98, winRate: 64.3, pnl: 8450, avgPnl: 86,
      hourlyData: [
        { hour: 3, winRate: 58, volume: 8 }, { hour: 4, winRate: 62, volume: 12 },
        { hour: 5, winRate: 66, volume: 16 }, { hour: 6, winRate: 68, volume: 18 },
        { hour: 7, winRate: 65, volume: 14 }, { hour: 8, winRate: 61, volume: 10 },
        { hour: 9, winRate: 63, volume: 12 }, { hour: 10, winRate: 67, volume: 8 },
      ],
    },
    {
      session: "asian", trades: 52, winRate: 59.6, pnl: 2340, avgPnl: 45,
      hourlyData: [
        { hour: 18, winRate: 56, volume: 6 }, { hour: 19, winRate: 58, volume: 8 },
        { hour: 20, winRate: 62, volume: 10 }, { hour: 21, winRate: 60, volume: 9 },
        { hour: 22, winRate: 64, volume: 7 }, { hour: 23, winRate: 57, volume: 5 },
        { hour: 0, winRate: 55, volume: 4 }, { hour: 1, winRate: 52, volume: 3 },
      ],
    },
    {
      session: "overlap", trades: 104, winRate: 71.2, pnl: 12450, avgPnl: 120,
      hourlyData: [
        { hour: 8, winRate: 70, volume: 14 }, { hour: 9, winRate: 73, volume: 18 },
        { hour: 10, winRate: 72, volume: 16 }, { hour: 11, winRate: 69, volume: 12 },
        { hour: 12, winRate: 74, volume: 10 }, { hour: 13, winRate: 68, volume: 8 },
      ],
    },
  ],

  riskDistribution: [
    { bucket: "$0–$100", count: 45, pnl: 3200 },
    { bucket: "$100–$250", count: 78, pnl: 8900 },
    { bucket: "$250–$500", count: 62, pnl: 10200 },
    { bucket: "$500–$1000", count: 38, pnl: 8400 },
    { bucket: "$1000+", count: 22, pnl: -2250 },
  ],

  positionSizeDistribution: [
    { bucket: "100–500 shares", count: 52, pnl: 4100 },
    { bucket: "500–1000 shares", count: 68, pnl: 9200 },
    { bucket: "1000–2500 shares", count: 45, pnl: 7800 },
    { bucket: "2500–5000 shares", count: 28, pnl: 5400 },
    { bucket: "5000+ shares", count: 12, pnl: 1950 },
  ],

  psychologyTrends: (() => {
    const trends: PsychologyTrend[] = [];
    const start = new Date("2026-01-01");
    for (let i = 0; i < 30; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i * 7);
      trends.push({
        date: d.toISOString().slice(0, 10),
        confidence: Math.round(5 + Math.sin(i * 0.5) * 2 + rand() * 3),
        fear: Math.round(3 + Math.cos(i * 0.3) * 1.5 + rand() * 2),
        greed: Math.round(4 + Math.sin(i * 0.4) * 2 + rand() * 2.5),
        discipline: Math.round(6 + Math.sin(i * 0.6) * 1.5 + rand() * 2),
        patience: Math.round(5 + Math.cos(i * 0.5) * 1.5 + rand() * 2.5),
      });
    }
    return trends;
  })(),

  calendarData: (() => {
    const days: CalendarDay[] = [];
    const start = new Date("2026-01-01");
    for (let i = 0; i < 365; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        days.push(calendarDay(d.toISOString().slice(0, 10)));
      }
    }
    return days;
  })(),

  aiInsights: [
    { type: "positive", category: "strategy", title: "Breakout Strategy Dominates", description: "Your Breakout strategy has a 72% win rate with $420 expectancy. Consider increasing position size by 15% on high-conviction setups.", impact: "high", metric: "72% WR", change: 5 },
    { type: "warning", category: "mistake", title: "FOMO Entries Increasing", description: "Detected 8 FOMO entries this month vs 3 last month. Most occurred after 2+ consecutive losses — classic revenge trading pattern.", impact: "high", metric: "+5 FOMO", change: -8 },
    { type: "positive", category: "behavior", title: "Risk Management Improving", description: "Average loss decreased 18% compared to last quarter. You're cutting losses earlier — average loss is now $320 vs $390.", impact: "medium", metric: "-18% Loss", change: 18 },
    { type: "tip", category: "pattern", title: "Morning Session Peak Performance", description: "Your win rate is 71% between 9:30-11:00 AM vs 58% after 2 PM. Consider front-loading your highest conviction trades.", impact: "high", metric: "+13% WR", change: 13 },
    { type: "warning", category: "psychology", title: "Confidence Dips After Losses", description: "Psychology correlation detected: confidence drops 40% after 3 consecutive losses, leading to missed opportunities. Average $850 left on table.", impact: "medium", metric: "40% Drop", change: -6 },
    { type: "positive", category: "risk", title: "Consistent Position Sizing", description: "92% of trades fall within optimal 1-2% risk range. This consistency contributes to your 2.84 profit factor.", impact: "medium", metric: "92%", change: 4 },
    { type: "warning", category: "strategy", title: "Reversal Strategy Underperforming", description: "Reversal strategy -$85 expectancy with 58% win rate. Consider pausing this strategy until market conditions favor reversals.", impact: "high", metric: "-$85 Exp", change: -12 },
    { type: "tip", category: "pattern", title: "Wednesday Sweet Spot", description: "Wednesday has your highest average P&L at $520/trade. Tuesday and Thursday also above average. Monday and Friday underperform.", impact: "medium", metric: "$520 Avg", change: 8 },
    { type: "positive", category: "behavior", title: "Plan Adherence Improving", description: "86% of your winning trades followed a predefined plan. Continue using checklists before entry.", impact: "medium", metric: "86%", change: 7 },
    { type: "warning", category: "mistake", title: "Overtrading on High Vol Days", description: "On high VIX days (>25), your trade count increases 60% but win rate drops to 48%. Consider reducing size or sitting out.", impact: "high", metric: "-20% WR", change: -15 },
    { type: "tip", category: "psychology", title: "Emotional Regulation Score", description: "Your discipline score drops progressively through the week (Tue: 8/10, Fri: 5/10). Take shorter sessions or break midday.", impact: "low", metric: "-3 Drop", change: -3 },
    { type: "positive", category: "risk", title: "Max Drawdown Under Control", description: "Current max drawdown of 8.2% is well within your 12% limit. Only 2 trades exceeded 2% risk this quarter.", impact: "high", metric: "8.2% DD", change: 2 },
  ],
};
