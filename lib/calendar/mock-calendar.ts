import type { CalendarEvent, CalendarDay, AiCalendarInsight } from "./types";



function dateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const symbols = ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN", "GOOGL", "META", "SPY", "QQQ", "COIN"];
const setups = ["Breakout", "Pullback", "Reversal", "Gap Fill", "Momentum", "Scalp", "Swing", "ORB", "VWAP", "ICT"];
const emotions = ["confident", "calm", "patient", "fomo", "frustrated", "anxious", "greedy", "fearful"];
const tags = ["Tech", "Earnings", "Momentum", "Scalp", "Swing", "Breakout", "Reversal", "Trend", "Options", "Futures"];

function generateTradeEvents(month: number, year: number): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const tradingDays = randInt(12, 20);
  const usedDays = new Set<number>();

  for (let i = 0; i < tradingDays; i++) {
    let day = randInt(1, 28);
    while (usedDays.has(day)) day = randInt(1, 28);
    usedDays.add(day);

    const date = dateStr(year, month, day);
    const symbol = pick(symbols);
    const direction = pick(["long", "short"]) as "long" | "short";
    const entryPrice = rand(100, 500);
    const exitPrice = direction === "long" ? entryPrice * (1 + rand(-0.05, 0.08)) : entryPrice * (1 + rand(-0.08, 0.05));
    const pnl = Math.round((exitPrice - entryPrice) * randInt(10, 100));
    const quantity = randInt(10, 200);

    events.push({
      id: `cal_trade_open_${month}_${i}`,
      type: "trade_open",
      title: `${direction === "long" ? "Long" : "Short"} $${symbol}`,
      description: `Entry: $${entryPrice.toFixed(2)} | Qty: ${quantity}`,
      start: `${date}T09:${String(randInt(30, 59)).padStart(2, "0")}:00`,
      allDay: false,
      pnl: undefined,
      symbol,
      direction,
      quantity,
      tradeId: `t_${month}_${i}`,
      tags: [pick(tags), pick(tags)],
      mood: pick(["good", "neutral", "neutral", "confident"]) as CalendarEvent["mood"],
    });

    const closeHour = randInt(11, 15);
    events.push({
      id: `cal_trade_close_${month}_${i}`,
      type: pnl > 0 ? "trade_close" : "trade_close",
      title: `${pnl > 0 ? "Close +" : "Close "}$${Math.abs(pnl).toLocaleString()}`,
      description: `Exit: $${exitPrice.toFixed(2)} | ${direction === "long" ? "Long" : "Short"} $${symbol}`,
      start: `${date}T${closeHour}:${String(randInt(0, 59)).padStart(2, "0")}:00`,
      allDay: false,
      pnl,
      symbol,
      direction,
      quantity,
      tradeId: `t_${month}_${i}`,
      tags: [pick(tags)],
    });
  }
  return events;
}

function generateJournalEvents(month: number, year: number): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const days = randInt(8, 15);
  for (let i = 0; i < days; i++) {
    const day = randInt(1, 28);
    const date = dateStr(year, month, day);
    const emotion = pick(emotions);
    events.push({
      id: `cal_journal_${month}_${i}`,
      type: "journal_entry",
      title: `${pick(setups)} ${pick(["Trade", "Setup", "Review", "Analysis"])}`,
      description: `Emotion: ${emotion} | Market conditions: ${pick(["Bullish", "Bearish", "Range-bound", "Volatile"])}`,
      start: `${date}T${String(randInt(17, 22)).padStart(2, "0")}:00:00`,
      allDay: false,
      journalId: `je_${month}_${i}`,
      tags: [pick(tags)],
      mood: emotion as CalendarEvent["mood"],
    });
  }
  return events;
}

function generateEconomicEvents(month: number, year: number): CalendarEvent[] {
  const economicEvents: { title: string; type: "economic_high" | "economic_medium" | "economic_low"; day: number; hour: number }[] = [
    { title: "FOMC Interest Rate Decision", type: "economic_high", day: 1, hour: 14 },
    { title: "Non-Farm Payrolls", type: "economic_high", day: 3, hour: 8 },
    { title: "CPI Data Release", type: "economic_high", day: 12, hour: 8 },
    { title: "Initial Jobless Claims", type: "economic_medium", day: 5, hour: 8 },
    { title: "GDP Growth Rate", type: "economic_high", day: 25, hour: 8 },
    { title: "Manufacturing PMI", type: "economic_medium", day: 15, hour: 9 },
    { title: "Services PMI", type: "economic_medium", day: 17, hour: 9 },
    { title: "Retail Sales", type: "economic_medium", day: 14, hour: 8 },
    { title: "Industrial Production", type: "economic_low", day: 10, hour: 9 },
    { title: "Consumer Sentiment", type: "economic_low", day: 20, hour: 10 },
    { title: "Fed Chair Speech", type: "economic_high", day: 8, hour: 13 },
    { title: "Treasury Auction", type: "economic_low", day: 22, hour: 11 },
  ];

  return economicEvents.map((e, i) => {
    const date = dateStr(year, month, Math.min(e.day, 28));
    return {
      id: `cal_economic_${month}_${i}`,
      type: e.type,
      title: e.title,
      description: `${e.type === "economic_high" ? "🔴 High Impact" : e.type === "economic_medium" ? "🟡 Medium Impact" : "⚪ Low Impact"}`,
      start: `${date}T${String(e.hour).padStart(2, "0")}:30:00`,
      allDay: false,
      impact: e.type === "economic_high" ? "high" : e.type === "economic_medium" ? "medium" : "low" as "high" | "medium" | "low",
      forecast: `${rand(-0.5, 0.5).toFixed(1)}%`,
      previous: `${rand(-0.3, 0.3).toFixed(1)}%`,
      tags: ["Economic", "Macro"],
    };
  });
}

function generateGoalEvents(month: number, year: number): CalendarEvent[] {
  return [
    {
      id: `cal_goal_monthly_${month}`,
      type: "goal",
      title: "Monthly P&L Target",
      description: `Target: $${(randInt(8, 20) * 1000).toLocaleString()}`,
      start: dateStr(year, month, 1),
      end: dateStr(year, month, 28),
      allDay: true,
      goalId: `g_monthly_${month}`,
      goalCurrent: randInt(3000, 15000),
      goalTarget: 15000,
      tags: ["Performance", "Monthly"],
      completed: Math.random() > 0.4,
    },
    {
      id: `cal_goal_weekly_${month}_1`,
      type: "goal",
      title: "Weekly Win Rate > 60%",
      description: "Maintain win rate above 60% for the week",
      start: dateStr(year, month, Math.min(randInt(1, 7), 28)),
      end: dateStr(year, month, Math.min(randInt(8, 14), 28)),
      allDay: true,
      goalId: `g_weekly_${month}`,
      goalCurrent: randInt(50, 85),
      goalTarget: 60,
      tags: ["Discipline", "Weekly"],
      completed: Math.random() > 0.3,
    },
  ];
}

function generateReviewEvents(month: number, year: number): CalendarEvent[] {
  return [
    {
      id: `cal_daily_review_${month}`,
      type: "daily_review",
      title: "End of Day Review",
      description: "Review today's trades, journal entries, and prepare for tomorrow",
      start: `${dateStr(year, month, randInt(1, 28))}T17:00:00`,
      allDay: false,
      tags: ["Review", "Daily"],
      completed: Math.random() > 0.2,
    },
    {
      id: `cal_weekly_review_${month}`,
      type: "weekly_review",
      title: "Weekly Performance Review",
      description: "Analyze weekly metrics, update playbooks, set goals",
      start: `${dateStr(year, month, randInt(1, 28))}T10:00:00`,
      allDay: false,
      tags: ["Review", "Weekly"],
      completed: Math.random() > 0.3,
    },
    {
      id: `cal_monthly_review_${month}`,
      type: "monthly_review",
      title: "Monthly Strategy Review",
      description: "Deep analysis of monthly performance, strategy adjustments",
      start: `${dateStr(year, month, Math.min(randInt(25, 28), 28))}T09:00:00`,
      allDay: false,
      tags: ["Review", "Monthly"],
      completed: Math.random() > 0.4,
    },
  ];
}

function generateOtherEvents(month: number, year: number): CalendarEvent[] {
  return [
    {
      id: `cal_backtest_${month}`,
      type: "backtest_run",
      title: `${pick(["Momentum", "Mean Reversion", "Gap Fill", "ORB", "Swing"])} Backtest`,
      description: `${randInt(50, 300)} trades | Win rate: ${randInt(55, 75)}%`,
      start: `${dateStr(year, month, randInt(1, 28))}T14:00:00`,
      allDay: false,
      backtestId: `bt_${month}`,
      tags: ["Backtest", "Analysis"],
    },
    {
      id: `cal_replay_${month}`,
      type: "replay_session",
      title: `${pick(symbols)} Trade Replay`,
      description: "Review and analyze past trade execution",
      start: `${dateStr(year, month, randInt(1, 28))}T19:00:00`,
      allDay: false,
      replayId: `rp_${month}`,
      tags: ["Replay", "Learning"],
    },
    {
      id: `cal_playbook_${month}`,
      type: "playbook_update",
      title: `Updated ${pick(["ICT", "SMC", "ORB", "VWAP", "Scalping"])} Playbook`,
      description: "Refined entry rules and risk parameters",
      start: `${dateStr(year, month, randInt(1, 28))}T16:00:00`,
      allDay: false,
      playbookId: `pb_${month}`,
      tags: ["Playbook", "Strategy"],
    },
    {
      id: `cal_ai_coach_${month}`,
      type: "ai_coaching",
      title: "AI Coaching Session",
      description: "Performance analysis and personalized recommendations",
      start: `${dateStr(year, month, randInt(1, 28))}T18:00:00`,
      allDay: false,
      tags: ["AI", "Coaching"],
    },
    {
      id: `cal_study_${month}`,
      type: "study_session",
      title: `${pick(["ICT Concepts", "Order Flow", "Market Profile", "Volume Analysis"])} Study`,
      description: "Dedicated learning session",
      start: `${dateStr(year, month, randInt(1, 28))}T20:00:00`,
      allDay: false,
      tags: ["Study", "Education"],
    },
  ];
}

function generateEarningsEvents(month: number, year: number): CalendarEvent[] {
  return [
    { id: `cal_earnings_aapl_${month}`, type: "earnings", title: "AAPL Earnings", description: "Q earnings report", start: `${dateStr(year, month, randInt(1, 28))}T16:30:00`, allDay: false, symbol: "AAPL", impact: "high", tags: ["Earnings", "Tech"] },
    { id: `cal_earnings_tsla_${month}`, type: "earnings", title: "TSLA Earnings", description: "Q earnings report", start: `${dateStr(year, month, randInt(1, 28))}T16:30:00`, allDay: false, symbol: "TSLA", impact: "high", tags: ["Earnings", "Tech"] },
  ];
}

export function generateMonthData(year: number, month: number) {
  const events = [
    ...generateTradeEvents(month, year),
    ...generateJournalEvents(month, year),
    ...generateEconomicEvents(month, year),
    ...generateGoalEvents(month, year),
    ...generateReviewEvents(month, year),
    ...generateOtherEvents(month, year),
    ...generateEarningsEvents(month, year),
  ];
  return events;
}

export function generateCalendarDays(year: number, month: number, events: CalendarEvent[]): CalendarDay[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: CalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = dateStr(year, month, day);
    const dayEvents = events.filter((e) => e.start.startsWith(date) || (e.end && e.end >= date && e.start <= date));

    const tradeEvents = dayEvents.filter((e) => e.type.startsWith("trade_"));
    const journalEvents = dayEvents.filter((e) => e.type === "journal_entry");
    const totalPnl = tradeEvents.reduce((sum, e) => sum + (e.pnl || 0), 0);
    const trades = tradeEvents.length;
    const wins = tradeEvents.filter((e) => (e.pnl || 0) > 0).length;

    const moodEvent = dayEvents.find((e) => e.mood);
    const energy = Math.round(rand(3, 10));
    const discipline = Math.round(rand(3, 10));

    days.push({
      date,
      events: dayEvents,
      pnl: totalPnl,
      trades,
      wins,
      journalEntries: journalEvents.length,
      mood: (moodEvent?.mood as CalendarEvent["mood"]) || null,
      energy,
      discipline,
    });
  }
  return days;
}

export function generateAiInsights(days: CalendarDay[]): AiCalendarInsight[] {
  const totalPnl = days.reduce((s, d) => s + d.pnl, 0);
  const tradingDays = days.filter((d) => d.trades > 0);
  const winDays = tradingDays.filter((d) => d.pnl > 0);
  const bestDay = [...days].sort((a, b) => b.pnl - a.pnl)[0];
  const worstDay = [...days].sort((a, b) => a.pnl - b.pnl)[0];

  const insights: AiCalendarInsight[] = [];
  insights.push({ type: "insight", title: "Monthly Performance", description: `${totalPnl >= 0 ? "Profit" : "Loss"} of $${Math.abs(totalPnl).toLocaleString()} across ${tradingDays.length} trading days.` });
  if (winDays.length > 0) {
    insights.push({ type: "positive", title: "Best Trading Day", description: `${bestDay.date}: $${bestDay.pnl.toLocaleString()} with ${bestDay.trades} trades.` });
  }
  if (worstDay && worstDay.pnl < 0) {
    insights.push({ type: "warning", title: "Worst Trading Day", description: `${worstDay.date}: -$${Math.abs(worstDay.pnl).toLocaleString()} — review what went wrong.` });
  }
  if (tradingDays.length > 0) {
    const winRate = Math.round((winDays.length / tradingDays.length) * 100);
    insights.push({ type: winRate >= 50 ? "positive" : "warning", title: "Daily Win Rate", description: `${winRate}% of trading days were profitable.` });
  }
  const noTradeDays = days.filter((d) => d.trades === 0 && d.journalEntries === 0).length;
  if (noTradeDays > days.length * 0.3) {
    insights.push({ type: "tip", title: "Consider More Consistency", description: `${noTradeDays} days with no activity. Consistent engagement leads to better results.` });
  }
  insights.push({ type: "tip", title: "Recommended Rest", description: `Take at least 1-2 days off per week. Your discipline score drops on ${tradingDays.filter((d) => d.discipline < 5).length} days.` });

  return insights;
}

function generateQuarterMonths(year: number, quarter: number): CalendarEvent[] {
  const startMonth = (quarter - 1) * 3;
  const events: CalendarEvent[] = [];
  for (let i = 0; i < 3; i++) {
    events.push(...generateMonthData(year, startMonth + i));
  }
  return events;
}

function generateYearEvents(year: number): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  for (let i = 0; i < 12; i++) {
    events.push(...generateMonthData(year, i));
  }
  return events;
}

const calendarEventsCache = new Map<string, CalendarEvent[]>();

export function getCalendarEvents(year: number, month?: number, quarter?: number): CalendarEvent[] {
  const key = month !== undefined ? `${year}-${month}` : quarter !== undefined ? `${year}-Q${quarter}` : `${year}-full`;
  if (calendarEventsCache.has(key)) return calendarEventsCache.get(key)!;

  let events: CalendarEvent[];
  if (month !== undefined) {
    events = generateMonthData(year, month);
  } else if (quarter !== undefined) {
    events = generateQuarterMonths(year, quarter);
  } else {
    events = generateYearEvents(year);
  }
  calendarEventsCache.set(key, events);
  return events;
}

export { dateStr };
