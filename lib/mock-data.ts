export const mockStats = {
  totalPnl: 28450.32,
  totalPnlPercent: 12.5,
  winRate: 67.8,
  winRateChange: 3.2,
  profitFactor: 2.84,
  profitFactorChange: 0.42,
  maxDrawdown: -8.2,
  drawdownChange: -2.1,
  totalTrades: 347,
  averageWin: 1845.50,
  averageLoss: 320.25,
  sharpeRatio: 2.14,
  bestTrade: 8450,
  bestTradeSymbol: "NVDA",
  worstTrade: -3200,
  worstTradeSymbol: "TSLA",
  consecutiveWins: 8,
  consecutiveLosses: 3,
  monthlyReturn: 12.8,
  yearlyReturn: 42.3,
};

export const mockEquityCurve = Array.from({ length: 60 }, (_, i) => {
  const base = 100000;
  const trend = Math.sin(i / 8) * 5000 + i * 150 + Math.random() * 2000;
  return {
    date: new Date(2025, 6 + Math.floor(i / 30), 1 + (i % 28)).toISOString().slice(0, 10),
    value: Math.round(base + trend),
  };
});

export const mockTrades = [
  { id: "1", symbol: "AAPL", direction: "long" as const, entryDate: "2026-07-28T09:32:00", exitDate: "2026-07-28T15:45:00", entryPrice: 245.80, exitPrice: 253.40, quantity: 100, pnl: 760, pnlPercent: 3.09, tags: ["Breakout", "Earnings"], setup: "Flag Pattern", emotion: "Confident", mistake: null, lesson: "Trust the pattern", status: "closed" as const },
  { id: "2", symbol: "TSLA", direction: "short" as const, entryDate: "2026-07-28T10:15:00", exitDate: "2026-07-28T14:30:00", entryPrice: 268.50, exitPrice: 264.20, quantity: 50, pnl: 215, pnlPercent: 1.60, tags: ["Reversal"], setup: "Resistance Reject", emotion: "Patient", mistake: null, lesson: "Resistance holds", status: "closed" as const },
  { id: "3", symbol: "NVDA", direction: "long" as const, entryDate: "2026-07-28T11:00:00", exitDate: "2026-07-28T13:20:00", entryPrice: 142.30, exitPrice: 139.80, quantity: 75, pnl: -187.50, pnlPercent: -1.76, tags: ["Momentum"], setup: "Breakout", emotion: "FOMO", mistake: "Chased breakout", lesson: "Wait for confirmation", status: "closed" as const },
  { id: "4", symbol: "MSFT", direction: "long" as const, entryDate: "2026-07-27T09:45:00", exitDate: "2026-07-27T16:00:00", entryPrice: 468.20, exitPrice: 472.10, quantity: 40, pnl: 156, pnlPercent: 0.83, tags: ["Swing"], setup: "Pullback", emotion: "Neutral", mistake: null, lesson: "Patience pays", status: "closed" as const },
  { id: "5", symbol: "AMZN", direction: "long" as const, entryDate: "2026-07-27T10:30:00", exitDate: "2026-07-27T15:15:00", entryPrice: 198.40, exitPrice: 205.60, quantity: 60, pnl: 432, pnlPercent: 3.63, tags: ["Breakout"], setup: "Ascending Triangle", emotion: "Aggressive", mistake: "Added too late", lesson: "Scale in earlier", status: "closed" as const },
  { id: "6", symbol: "GOOGL", direction: "short" as const, entryDate: "2026-07-26T13:00:00", exitDate: "2026-07-26T15:45:00", entryPrice: 182.30, exitPrice: 183.10, quantity: 80, pnl: -64, pnlPercent: -0.44, tags: ["Scalp"], setup: "Overbought", emotion: "Impatient", mistake: "Early entry", lesson: "Wait for confirmation candle", status: "closed" as const },
  { id: "7", symbol: "META", direction: "long" as const, entryDate: "2026-07-25T09:30:00", exitDate: "2026-07-25T16:00:00", entryPrice: 512.40, exitPrice: 528.80, quantity: 30, pnl: 492, pnlPercent: 3.20, tags: ["Earnings"], setup: "Post-Earnings Drift", emotion: "Confident", mistake: null, lesson: "Earnings momentum is real", status: "closed" as const },
  { id: "8", symbol: "AMD", direction: "long" as const, entryDate: "2026-07-24T11:15:00", exitDate: "2026-07-24T14:50:00", entryPrice: 168.90, exitPrice: 172.30, quantity: 55, pnl: 187, pnlPercent: 2.01, tags: ["Momentum"], setup: "Channel Break", emotion: "Calm", mistake: null, lesson: "Ride the trend", status: "closed" as const },
  { id: "9", symbol: "SPY", direction: "long" as const, entryDate: "2026-07-23T09:45:00", exitDate: "2026-07-23T15:30:00", entryPrice: 556.20, exitPrice: 559.80, quantity: 100, pnl: 360, pnlPercent: 0.65, tags: ["Index", "Swing"], setup: "VWAP Hold", emotion: "Bored", mistake: "Position too small", lesson: "Size up on high conviction", status: "closed" as const },
  { id: "10", symbol: "TSLA", direction: "long" as const, entryDate: "2026-07-22T12:30:00", exitDate: null, entryPrice: 261.40, exitPrice: null, quantity: 40, pnl: null, pnlPercent: null, tags: ["Swing"], setup: "Pullback to EMA", emotion: "Hopeful", mistake: null, lesson: null, status: "open" as const },
];

export const mockGoals = [
  { id: "1", title: "Daily Trade Target", target: 5, current: 4, category: "daily" as const, deadline: "Today", unit: "" },
  { id: "2", title: "Weekly Win Rate", target: 70, current: 67.8, category: "weekly" as const, deadline: "This Week", unit: "%" },
  { id: "3", title: "Monthly P&L Target", target: 15000, current: 8450, category: "monthly" as const, deadline: "July 2026", unit: "$", prefix: true },
  { id: "4", title: "Max Drawdown", target: 10, current: 8.2, category: "monthly" as const, deadline: "July 2026", unit: "%" },
  { id: "5", title: "Yearly Return", target: 50, current: 32.5, category: "yearly" as const, deadline: "2026", unit: "%" },
  { id: "6", title: "Trading Days", target: 200, current: 112, category: "yearly" as const, deadline: "2026", unit: "" },
];

export const mockPlaybooks = [
  {
    title: "Morning Breakout",
    description: "Capture early momentum from pre-market volume",
    setup: "Price breaks above pre-market high with volume",
    entry: "Limit order 5c above pre-market high",
    exit: "Trailing stop at 2x ATR",
    riskManagement: "Stop loss at VWAP",
    winRate: 72,
    totalTrades: 89,
    tags: ["Momentum", "Day Trading"],
  },
  {
    title: "VWAP Reversal",
    description: "Mean reversion strategy using VWAP as support/resistance",
    setup: "Price deviates 2+ standard deviations from VWAP",
    entry: "Limit order at VWAP + 2 std dev",
    exit: "Partial at VWAP, remainder at -1 std dev",
    riskManagement: "Stop at -3 std dev",
    winRate: 65,
    totalTrades: 156,
    tags: ["Mean Reversion", "Intraday"],
  },
  {
    title: "Earnings Momentum",
    description: "Trade post-earnings momentum with volatility expansion",
    setup: "Stock gaps >5% on earnings with above-average volume",
    entry: "Market order at open, add on first pullback",
    exit: "Trailing stop at 1.5x ATR",
    riskManagement: "Stop loss at gap fill level",
    winRate: 58,
    totalTrades: 45,
    tags: ["Earnings", "Swing"],
  },
  {
    title: "Opening Range Breakout",
    description: "Trade the break of the first 30-minute range",
    setup: "Identify first 30min high/low after market open",
    entry: "Buy above range high, sell below range low",
    exit: "Target 2x range width",
    riskManagement: "Stop at opposite range boundary",
    winRate: 68,
    totalTrades: 212,
    tags: ["ORB", "Intraday"],
  },
  {
    title: "Gap Fill Strategy",
    description: "Trade gap fills with high probability setups",
    setup: "Stock gaps up/down >2% at open",
    entry: "Enter when price reaches 50% gap fill level",
    exit: "Full gap fill or 3:1 R",
    riskManagement: "Stop at gap origin",
    winRate: 71,
    totalTrades: 78,
    tags: ["Gaps", "Mean Reversion"],
  },
  {
    title: "Trend Following",
    description: "Ride established trends with momentum confirmation",
    setup: "Price above all MAs, RSI > 60, rising volume",
    entry: "On pullback to 20 EMA",
    exit: "Trailing stop at 3x ATR or MA cross",
    riskManagement: "Stop below recent swing low",
    winRate: 62,
    totalTrades: 134,
    tags: ["Trend", "Swing"],
  },
];

export const mockAnalytics = {
  monthlyPerformance: [
    { month: "Jan", pnl: 3200, trades: 28 },
    { month: "Feb", pnl: -1800, trades: 32 },
    { month: "Mar", pnl: 5600, trades: 35 },
    { month: "Apr", pnl: 4100, trades: 30 },
    { month: "May", pnl: 2800, trades: 26 },
    { month: "Jun", pnl: 7200, trades: 38 },
    { month: "Jul", pnl: 8450, trades: 34 },
  ],
  winLossByDay: [
    { day: "Mon", wins: 12, losses: 5 },
    { day: "Tue", wins: 15, losses: 7 },
    { day: "Wed", wins: 10, losses: 8 },
    { day: "Thu", wins: 14, losses: 4 },
    { day: "Fri", wins: 8, losses: 9 },
  ],
  symbolPerformance: [
    { symbol: "AAPL", trades: 42, winRate: 71.4, pnl: 12450 },
    { symbol: "TSLA", trades: 38, winRate: 55.3, pnl: -2340 },
    { symbol: "NVDA", trades: 29, winRate: 65.5, pnl: 8920 },
    { symbol: "MSFT", trades: 35, winRate: 68.6, pnl: 6780 },
    { symbol: "AMZN", trades: 31, winRate: 74.2, pnl: 10340 },
    { symbol: "GOOGL", trades: 27, winRate: 59.3, pnl: 2150 },
  ],
  aiInsights: [
    { type: "warning" as const, message: "Your win rate dropped 5% this week. Review your breakout entries for premature exits." },
    { type: "success" as const, message: "Excellent risk management! Your average loss decreased 15% compared to last month." },
    { type: "info" as const, message: "You're overtrading on Mondays. Average 4 trades vs 2.5 on other days." },
    { type: "warning" as const, message: "3 FOMO entries detected this week. Stick to your playbook triggers." },
    { type: "success" as const, message: "Your best setup (Breakout) has 72% win rate. Consider increasing size." },
    { type: "info" as const, message: "Morning sessions (9:30-11:00) show 68% win rate vs 45% after lunch." },
  ],
  setupPerformance: [
    { setup: "Breakout", trades: 85, winRate: 72, avgPnl: 420 },
    { setup: "Pullback", trades: 62, winRate: 68, avgPnl: 310 },
    { setup: "Reversal", trades: 48, winRate: 58, avgPnl: -85 },
    { setup: "Momentum", trades: 73, winRate: 65, avgPnl: 280 },
    { setup: "Earnings", trades: 35, winRate: 71, avgPnl: 680 },
  ],
};

export const mockBacktestResults = [
  { name: "EMA Crossover", winRate: 68.4, trades: 156, pnl: 12450, sharpe: 1.89, maxDD: -12.4 },
  { name: "Breakout Scanner", winRate: 72.1, trades: 89, pnl: 8320, sharpe: 2.14, maxDD: -8.7 },
  { name: "Mean Reversion", winRate: 58.7, trades: 234, pnl: 6780, sharpe: 1.45, maxDD: -15.2 },
  { name: "Momentum Pullback", winRate: 64.9, trades: 112, pnl: 9560, sharpe: 1.76, maxDD: -10.1 },
  { name: "VWAP Strategy", winRate: 66.2, trades: 178, pnl: 10450, sharpe: 1.92, maxDD: -9.3 },
];
