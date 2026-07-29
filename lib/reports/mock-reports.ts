import type {
  Report, ReportTemplate, ScheduledReport, ExportJob, AiExecutiveSummary,
} from "./types";

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString().split("T")[0];

const DEFAULT_BRANDING = {
  logo: "/images/logo.svg", primaryColor: "#6366f1", showWatermark: true, footer: "QuantEdge Technologies Inc.",
};

const COMMON_METRICS = {
  totalPnL: 18240, winRate: 68.5, profitFactor: 2.14, avgRR: 2.8,
  maxDrawdown: 12.3, totalTrades: 847, sharpeRatio: 1.92, consistencyScore: 76,
  netProfit: 18240, grossProfit: 45600, grossLoss: -27360, totalFees: 1240,
  avgWin: 185, avgLoss: -92, largestWin: 1200, largestLoss: -680,
  winCount: 580, lossCount: 267, averageSessionTime: "4h 12m",
};

const ALL_SECTIONS = [
  { id: "performance_summary" as const, label: "Performance Summary", enabled: true, order: 1 },
  { id: "pnl" as const, label: "PnL", enabled: true, order: 2 },
  { id: "win_rate" as const, label: "Win Rate", enabled: true, order: 3 },
  { id: "profit_factor" as const, label: "Profit Factor", enabled: true, order: 4 },
  { id: "avg_rr" as const, label: "Average R:R", enabled: true, order: 5 },
  { id: "drawdown" as const, label: "Drawdown", enabled: true, order: 6 },
  { id: "risk_analysis" as const, label: "Risk Analysis", enabled: true, order: 7 },
  { id: "psychology_summary" as const, label: "Psychology Summary", enabled: true, order: 8 },
  { id: "goal_progress" as const, label: "Goal Progress", enabled: true, order: 9 },
  { id: "strategy_performance" as const, label: "Strategy Performance", enabled: true, order: 10 },
  { id: "market_performance" as const, label: "Market Performance", enabled: true, order: 11 },
  { id: "journal_summary" as const, label: "Journal Summary", enabled: true, order: 12 },
  { id: "replay_summary" as const, label: "Replay Summary", enabled: true, order: 13 },
  { id: "trade_distribution" as const, label: "Trade Distribution", enabled: true, order: 14 },
  { id: "sharpe_ratio" as const, label: "Sharpe Ratio", enabled: true, order: 15 },
  { id: "consistency_score" as const, label: "Consistency Score", enabled: true, order: 16 },
];

function makeAI(): AiExecutiveSummary {
  return {
    performanceSummary: {
      title: "Performance Overview", type: "positive", score: 82,
      content: "Strong overall performance this period with consistent gains across major sessions. Win rate improved 3% vs last month while maintaining favorable risk controls.",
    },
    strengths: [
      { title: "Morning Session", content: "74% win rate in first 2 hours, consistently your strongest session.", type: "positive", score: 88 },
      { title: "Risk Management", content: "Average loss 2.1% below max threshold. Stop-loss discipline at 94%.", type: "positive", score: 85 },
    ],
    weaknesses: [
      { title: "Afternoon Trades", content: "Win rate drops to 58% post-lunch. Consider midday breaks.", type: "negative", score: 42 },
      { title: "Revenge Trading", content: "4 instances detected this month, avg loss $320 each.", type: "warning", score: 35 },
    ],
    recommendations: [
      { title: "Reduce Position Size", content: "Afternoon sessions show higher volatility. Reduce size by 25% from 12 PM - 2 PM.", type: "neutral", score: 72 },
      { title: "Journal Every Trade", content: "3 missed journal entries this week. Set automated reminders.", type: "positive", score: 78 },
    ],
    riskWarnings: [
      { title: "Drawdown Alert", content: "Current drawdown of 8.5% approaching maximum allowed threshold of 12%.", type: "warning", score: 45 },
      { title: "Correlation Risk", content: "85% of trades are in correlated pairs. Diversify to reduce systemic risk.", type: "warning", score: 38 },
    ],
    nextWeekFocus: {
      title: "Focus Areas", type: "neutral",
      content: "Target: 4 consecutive green days. Reduce afternoon trading volume. Complete 3 replay reviews of winning trades.",
    },
    monthlyActionPlan: [
      { title: "Week 1", content: "Review and refine entry criteria for afternoon sessions. Target 65%+ win rate.", type: "neutral" },
      { title: "Week 2", content: "Implement new risk scaling rules. Backtest on 6 months of data.", type: "neutral" },
      { title: "Week 3", content: "Deep dive on EUR/USD and GBP/USD strategies. Optimize for current volatility regime.", type: "neutral" },
      { title: "Week 4", content: "Portfolio rebalancing. Review correlation matrix. Adjust position sizing.", type: "neutral" },
    ],
    generatedAt: new Date().toISOString(),
  };
}

export const mockReports: Report[] = [
  {
    id: "rpt_1", type: "monthly", title: "June 2026 Performance Report",
    description: "Comprehensive monthly performance analysis with AI insights",
    status: "ready", createdAt: daysAgo(1), updatedAt: daysAgo(1),
    dateRange: { start: "2026-06-01", end: "2026-06-30" },
    sections: ALL_SECTIONS, metrics: { ...COMMON_METRICS, totalPnL: 8450, winRate: 71.2 },
    charts: [
      { id: "ch1", type: "equity_curve", label: "Equity Curve", enabled: true, order: 1, data: {} },
      { id: "ch2", type: "drawdown", label: "Drawdown", enabled: true, order: 2, data: {} },
      { id: "ch3", type: "market_breakdown", label: "Market Breakdown", enabled: true, order: 3, data: {} },
      { id: "ch4", type: "strategy_breakdown", label: "Strategy Breakdown", enabled: true, order: 4, data: {} },
      { id: "ch5", type: "calendar_heatmap", label: "Calendar Heatmap", enabled: true, order: 5, data: {} },
    ],
    branding: DEFAULT_BRANDING, tags: ["monthly", "full-report"], generatedBy: "AI",
    fileSize: "4.2 MB", downloadUrl: "#",
  },
  {
    id: "rpt_2", type: "weekly", title: "Week 27 Report",
    description: "Weekly performance review with trade analysis", status: "ready",
    createdAt: daysAgo(3), updatedAt: daysAgo(3),
    dateRange: { start: "2026-06-24", end: "2026-06-30" },
    sections: ALL_SECTIONS.slice(0, 10).map((s) => ({ ...s })),
    metrics: { ...COMMON_METRICS, totalPnL: 2150, winRate: 73.8, totalTrades: 42, winCount: 31, lossCount: 11 },
    charts: [
      { id: "ch1", type: "equity_curve", label: "Equity Curve", enabled: true, order: 1, data: {} },
      { id: "ch2", type: "pnl_distribution", label: "PnL Distribution", enabled: true, order: 2, data: {} },
    ],
    branding: DEFAULT_BRANDING, tags: ["weekly", "quick"], generatedBy: "AI", fileSize: "1.8 MB",
  },
  {
    id: "rpt_3", type: "daily", title: "June 30 Daily Report",
    description: "End-of-day performance summary", status: "ready",
    createdAt: daysAgo(3), updatedAt: daysAgo(3),
    dateRange: { start: "2026-06-30", end: "2026-06-30" },
    sections: ALL_SECTIONS.slice(0, 6).map((s) => ({ ...s })),
    metrics: { ...COMMON_METRICS, totalPnL: 380, winRate: 66.7, totalTrades: 12, winCount: 8, lossCount: 4 },
    charts: [{ id: "ch1", type: "equity_curve", label: "Daily Equity", enabled: true, order: 1, data: {} }],
    branding: DEFAULT_BRANDING, tags: ["daily"], generatedBy: "Auto", fileSize: "0.6 MB",
  },
  {
    id: "rpt_4", type: "quarterly", title: "Q2 2026 Executive Report",
    description: "Quarterly performance review for stakeholders", status: "ready",
    createdAt: daysAgo(10), updatedAt: daysAgo(10),
    dateRange: { start: "2026-04-01", end: "2026-06-30" },
    sections: ALL_SECTIONS, metrics: { ...COMMON_METRICS, totalPnL: 28400, winRate: 69.8, totalTrades: 2100 },
    charts: [
      { id: "ch1", type: "equity_curve", label: "Equity Curve", enabled: true, order: 1, data: {} },
      { id: "ch2", type: "drawdown", label: "Drawdown", enabled: true, order: 2, data: {} },
      { id: "ch3", type: "market_breakdown", label: "Market Breakdown", enabled: true, order: 3, data: {} },
      { id: "ch4", type: "strategy_breakdown", label: "Strategy Breakdown", enabled: true, order: 4, data: {} },
      { id: "ch5", type: "performance_timeline", label: "Performance Timeline", enabled: true, order: 5, data: {} },
      { id: "ch6", type: "calendar_heatmap", label: "Calendar Heatmap", enabled: true, order: 6, data: {} },
    ],
    branding: { ...DEFAULT_BRANDING, showWatermark: false },
    tags: ["quarterly", "executive", "stakeholder"], generatedBy: "AI", fileSize: "8.4 MB",
    aiSummary: makeAI(),
  },
  {
    id: "rpt_5", type: "yearly", title: "2025 Annual Performance Report",
    description: "Full-year performance analysis with strategic recommendations",
    status: "ready", createdAt: daysAgo(180), updatedAt: daysAgo(180),
    dateRange: { start: "2025-01-01", end: "2025-12-31" },
    sections: ALL_SECTIONS, metrics: { ...COMMON_METRICS, totalPnL: 124500, winRate: 67.2, totalTrades: 4680 },
    charts: [
      { id: "ch1", type: "equity_curve", label: "Annual Equity Curve", enabled: true, order: 1, data: {} },
      { id: "ch2", type: "drawdown", label: "Max Drawdown", enabled: true, order: 2, data: {} },
      { id: "ch3", type: "strategy_breakdown", label: "Strategy Performance", enabled: true, order: 3, data: {} },
      { id: "ch4", type: "performance_timeline", label: "Monthly Breakdown", enabled: true, order: 4, data: {} },
    ],
    branding: { ...DEFAULT_BRANDING, showWatermark: false, footer: "Confidential — QuantEdge Technologies Inc." },
    tags: ["yearly", "annual", "executive"], generatedBy: "AI", fileSize: "12.1 MB",
    aiSummary: makeAI(),
  },
  {
    id: "rpt_6", type: "custom", title: "Mentor Review Pack",
    description: "Custom report pack for mentor review sessions", status: "ready",
    createdAt: daysAgo(5), updatedAt: daysAgo(5),
    dateRange: { start: "2026-05-01", end: "2026-06-30" },
    sections: ALL_SECTIONS.filter((s) => ["performance_summary", "pnl", "drawdown", "risk_analysis", "psychology_summary"].includes(s.id)),
    metrics: { ...COMMON_METRICS, totalPnL: 12400, winRate: 70.1, totalTrades: 624 },
    charts: [
      { id: "ch1", type: "equity_curve", label: "Equity", enabled: true, order: 1, data: {} },
      { id: "ch2", type: "risk_analysis", label: "Risk Metrics", enabled: true, order: 2, data: {} },
    ],
    branding: { ...DEFAULT_BRANDING, primaryColor: "#10b981" },
    tags: ["mentor", "custom"], generatedBy: "Manual", fileSize: "3.2 MB",
  },
  {
    id: "rpt_7", type: "daily", title: "Today's Flash Report",
    description: "Live intraday performance snapshot", status: "generating",
    createdAt: daysAgo(0), updatedAt: daysAgo(0),
    dateRange: { start: daysAgo(0), end: daysAgo(0) },
    sections: ALL_SECTIONS.slice(0, 4).map((s) => ({ ...s })),
    metrics: { ...COMMON_METRICS, totalPnL: 0, winRate: 0, totalTrades: 0, winCount: 0, lossCount: 0 },
    charts: [], branding: DEFAULT_BRANDING, tags: ["daily", "live"], generatedBy: "Auto",
  },
  {
    id: "rpt_8", type: "monthly", title: "May 2026 Report",
    description: "Monthly performance summary", status: "draft",
    createdAt: daysAgo(30), updatedAt: daysAgo(28),
    dateRange: { start: "2026-05-01", end: "2026-05-31" },
    sections: ALL_SECTIONS, metrics: { ...COMMON_METRICS, totalPnL: 6120, winRate: 67.4, totalTrades: 180 },
    charts: [{ id: "ch1", type: "equity_curve", label: "Equity", enabled: true, order: 1, data: {} }],
    branding: DEFAULT_BRANDING, tags: ["monthly"], generatedBy: "Manual",
  },
];

export const mockTemplates: ReportTemplate[] = [
  {
    id: "tmpl_1", name: "Standard Monthly", description: "Complete monthly performance report with all sections",
    type: "monthly", sections: ALL_SECTIONS,
    charts: [
      { id: "ch1", type: "equity_curve", label: "Equity Curve", enabled: true, order: 1, data: {} },
      { id: "ch2", type: "drawdown", label: "Drawdown", enabled: true, order: 2, data: {} },
      { id: "ch3", type: "market_breakdown", label: "Market Breakdown", enabled: true, order: 3, data: {} },
    ],
    branding: DEFAULT_BRANDING, isPreset: true,
  },
  {
    id: "tmpl_2", name: "Quick Weekly", description: "Concise weekly review with key metrics only",
    type: "weekly", sections: ALL_SECTIONS.slice(0, 7).map((s) => ({ ...s })),
    charts: [{ id: "ch1", type: "equity_curve", label: "Weekly Equity", enabled: true, order: 1, data: {} }],
    branding: DEFAULT_BRANDING, isPreset: true,
  },
  {
    id: "tmpl_3", name: "Executive Summary", description: "High-level report for stakeholders and investors",
    type: "quarterly", sections: ALL_SECTIONS.slice(0, 5).map((s) => ({ ...s })),
    charts: [
      { id: "ch1", type: "performance_timeline", label: "Timeline", enabled: true, order: 1, data: {} },
      { id: "ch2", type: "strategy_breakdown", label: "Strategies", enabled: true, order: 2, data: {} },
    ],
    branding: { ...DEFAULT_BRANDING, showWatermark: false }, isPreset: true,
  },
  {
    id: "tmpl_4", name: "Risk Focus", description: "Deep dive into risk metrics and drawdown analysis",
    type: "monthly", sections: ALL_SECTIONS.filter((s) => ["drawdown", "risk_analysis", "sharpe_ratio", "consistency_score", "profit_factor"].includes(s.id)),
    charts: [{ id: "ch1", type: "risk_analysis", label: "Risk Profile", enabled: true, order: 1, data: {} }],
    branding: DEFAULT_BRANDING, isPreset: false,
  },
];

export const mockScheduledReports: ScheduledReport[] = [
  {
    id: "sch_1", type: "daily", frequency: "daily", title: "End of Day Flash",
    recipients: ["abdul@quantedge.com"], lastSent: daysAgo(1), nextSend: daysAgo(0),
    active: true, templateId: "tmpl_2", createdAt: daysAgo(60),
  },
  {
    id: "sch_2", type: "weekly", frequency: "weekly", title: "Weekly Performance Review",
    recipients: ["abdul@quantedge.com", "mentor@example.com"],
    lastSent: daysAgo(4), nextSend: daysAgo(3),
    active: true, templateId: "tmpl_2", createdAt: daysAgo(90),
  },
  {
    id: "sch_3", type: "monthly", frequency: "monthly", title: "Monthly Investor Report",
    recipients: ["abdul@quantedge.com", "investor@example.com"],
    lastSent: daysAgo(29), nextSend: daysAgo(2),
    active: true, templateId: "tmpl_3", createdAt: daysAgo(180),
  },
  {
    id: "sch_4", type: "quarterly", frequency: "quarterly", title: "Q3 Review",
    recipients: ["abdul@quantedge.com", "team@quantedge.com"],
    lastSent: undefined, nextSend: daysAgo(63),
    active: false, templateId: "tmpl_1", createdAt: daysAgo(90),
  },
];

export const mockExportJobs: ExportJob[] = [
  { id: "exp_1", reportId: "rpt_1", reportTitle: "June 2026 Performance Report", format: "pdf", status: "completed", createdAt: daysAgo(1), completedAt: daysAgo(1), fileSize: "4.2 MB", downloadUrl: "#" },
  { id: "exp_2", reportId: "rpt_2", reportTitle: "Week 27 Report", format: "csv", status: "completed", createdAt: daysAgo(3), completedAt: daysAgo(3), fileSize: "0.8 MB", downloadUrl: "#" },
  { id: "exp_3", reportId: "rpt_4", reportTitle: "Q2 2026 Executive Report", format: "pdf", status: "completed", createdAt: daysAgo(10), completedAt: daysAgo(10), fileSize: "8.4 MB", downloadUrl: "#" },
  { id: "exp_4", reportId: "rpt_4", reportTitle: "Q2 2026 Executive Report", format: "excel", status: "processing", createdAt: daysAgo(0), fileSize: undefined },
  { id: "exp_5", reportId: "rpt_5", reportTitle: "2025 Annual Performance Report", format: "json", status: "completed", createdAt: daysAgo(180), completedAt: daysAgo(180), fileSize: "2.1 MB", downloadUrl: "#" },
  { id: "exp_6", reportId: "rpt_6", reportTitle: "Mentor Review Pack", format: "pdf", status: "failed", createdAt: daysAgo(1), fileSize: undefined },
];

export function createMockReport(id: string, type: import("./types").ReportType): Report {
  return {
    id: `rpt_${id}`, type, title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
    description: "Generated from template", status: "generating",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
    dateRange: { start: daysAgo(30), end: daysAgo(0) },
    sections: ALL_SECTIONS.slice(0, 8).map((s) => ({ ...s })),
    metrics: { ...COMMON_METRICS }, charts: [],
    branding: { ...DEFAULT_BRANDING }, tags: [type], generatedBy: "AI",
  };
}
