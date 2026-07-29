import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { mockStats } from "@/lib/mock-data";

export function useCardData() {
  const kpi = mockAnalyticsData.kpis;
  const psychology = mockAnalyticsData.psychologyTrends;
  const latestPsy = psychology[psychology.length - 1];
  const equity = mockAnalyticsData.equityCurve;
  const ai = mockAnalyticsData.aiInsights;
  const weekly = mockAnalyticsData.weeklyPerformance;
  const monthly = mockAnalyticsData.monthlyPerformance;
  const daily = mockAnalyticsData.dailyPerformance;
  const markets = mockAnalyticsData.marketPerformance;
  const strategies = mockAnalyticsData.strategyPerformance;
  const sessions = mockAnalyticsData.sessionPerformance;
  const calendar = mockAnalyticsData.calendarData;
  const tradesTotal = weekly.reduce((s, w) => s + w.trades, 0);
  const tradesToday = daily[0]?.trades ?? 0;
  const tradesWeek = Math.round(tradesTotal / weekly.length);
  const tradesMonth = monthly.reduce((s, m) => s + m.trades, 0);

  const emotions = ["Confident", "Calm", "Anxious", "FOMO", "Patient", "Aggressive"];
  const emotionHistory = psychology.map((p) => ({
    week: p.date,
    value: Math.round((p.confidence + p.discipline) / 2),
  }));

  const netProfit = kpi.find((k) => k.label === "Net Profit")!;
  const winRate = kpi.find((k) => k.label === "Win Rate")!;
  const profitFactor = kpi.find((k) => k.label === "Profit Factor")!;
  const expectancy = kpi.find((k) => k.label === "Expectancy")!;
  const avgTrade = kpi.find((k) => k.label === "Avg Trade")!;
  const avgRR = kpi.find((k) => k.label === "Avg R:R")!;
  const largestWin = kpi.find((k) => k.label === "Largest Win")!;
  const largestLoss = kpi.find((k) => k.label === "Largest Loss")!;
  const streak = kpi.find((k) => k.label === "Current Streak")!;
  const maxDrawdown = kpi.find((k) => k.label === "Max Drawdown")!;

  const equitySpark = equity.map((e) => ({ value: e.equity }));
  const weeklySpark = weekly.map((w) => ({ value: w.pnl }));

  const avgRiskValue = mockStats.averageLoss;
  const currentExposure = avgRiskValue * 3;
  const riskCapacity = 5000;
  const riskUtilization = (currentExposure / riskCapacity) * 100;

  const bestStrategy = strategies.reduce((best, s) => s.expectancy > best.expectancy ? s : best);
  const worstStrategy = strategies.reduce((worst, s) => s.expectancy < worst.expectancy ? s : worst);

  const recoveryFrom = Math.abs(maxDrawdown.value);
  const recoveryProgress = Math.min(100, (recoveryFrom / (recoveryFrom + 2.1)) * 100);

  const winLossByDay = daily.map((d) => ({
    day: d.period.slice(0, 3),
    wins: d.wins,
    losses: d.losses,
  }));

  const bestSession = sessions.reduce((best, s) => s.winRate > best.winRate ? s : best);

  const topAi = ai.slice(0, 3);

  return {
    kpi,
    netProfit,
    winRate,
    profitFactor,
    expectancy,
    avgTrade,
    avgRR,
    largestWin,
    largestLoss,
    streak,
    maxDrawdown,
    psychology,
    latestPsy,
    equity,
    equitySpark,
    weeklySpark,
    ai,
    topAi,
    weekly,
    monthly,
    daily,
    markets,
    strategies,
    sessions,
    calendar,
    tradesToday,
    tradesWeek,
    tradesMonth,
    tradesTotal,
    emotions,
    emotionHistory,
    avgRiskValue,
    currentExposure,
    riskCapacity,
    riskUtilization,
    bestStrategy,
    worstStrategy,
    recoveryFrom,
    recoveryProgress,
    winLossByDay,
    bestSession,
    mockStats,
  };
}
