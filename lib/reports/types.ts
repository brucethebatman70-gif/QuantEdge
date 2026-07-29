export type ReportType = "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom";

export type ReportStatus = "draft" | "generating" | "ready" | "scheduled" | "error";

export type ReportSectionId =
  | "performance_summary" | "pnl" | "win_rate" | "profit_factor" | "avg_rr"
  | "drawdown" | "risk_analysis" | "psychology_summary" | "goal_progress"
  | "strategy_performance" | "market_performance" | "journal_summary"
  | "replay_summary" | "trade_distribution" | "sharpe_ratio" | "consistency_score";

export type ExportFormat = "pdf" | "csv" | "excel" | "json";

export type ScheduleFrequency = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

export interface ReportBranding {
  logo: string;
  primaryColor: string;
  showWatermark: boolean;
  footer: string;
}

export interface ReportSectionConfig {
  id: ReportSectionId;
  label: string;
  enabled: boolean;
  order: number;
}

export interface ReportMetrics {
  totalPnL: number;
  winRate: number;
  profitFactor: number;
  avgRR: number;
  maxDrawdown: number;
  totalTrades: number;
  sharpeRatio: number;
  consistencyScore: number;
  netProfit: number;
  grossProfit: number;
  grossLoss: number;
  totalFees: number;
  avgWin: number;
  avgLoss: number;
  largestWin: number;
  largestLoss: number;
  winCount: number;
  lossCount: number;
  averageSessionTime: string;
}

export interface AiSection {
  title: string;
  content: string;
  score?: number;
  type: "positive" | "negative" | "neutral" | "warning";
}

export interface AiExecutiveSummary {
  performanceSummary: AiSection;
  strengths: AiSection[];
  weaknesses: AiSection[];
  recommendations: AiSection[];
  riskWarnings: AiSection[];
  nextWeekFocus: AiSection;
  monthlyActionPlan: AiSection[];
  generatedAt: string;
}

export interface ChartConfig {
  id: string;
  type: "equity_curve" | "drawdown" | "pnl_distribution" | "market_breakdown"
      | "strategy_breakdown" | "risk_analysis" | "calendar_heatmap" | "performance_timeline";
  label: string;
  enabled: boolean;
  order: number;
  data: unknown;
}

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  dateRange: { start: string; end: string };
  sections: ReportSectionConfig[];
  metrics: ReportMetrics;
  charts: ChartConfig[];
  aiSummary?: AiExecutiveSummary;
  branding: ReportBranding;
  tags: string[];
  generatedBy: string;
  fileSize?: string;
  downloadUrl?: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: ReportType;
  sections: ReportSectionConfig[];
  charts: ChartConfig[];
  branding: ReportBranding;
  isPreset: boolean;
}

export interface ScheduledReport {
  id: string;
  type: ReportType;
  frequency: ScheduleFrequency;
  title: string;
  recipients: string[];
  lastSent?: string;
  nextSend: string;
  active: boolean;
  templateId: string;
  createdAt: string;
}

export interface ExportJob {
  id: string;
  reportId: string;
  reportTitle: string;
  format: ExportFormat;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  completedAt?: string;
  fileSize?: string;
  downloadUrl?: string;
}

export interface ReportsState {
  reports: Report[];
  templates: ReportTemplate[];
  scheduledReports: ScheduledReport[];
  exportJobs: ExportJob[];
  activeTab: "all" | "history" | "scheduled" | "templates";
  selectedReport: Report | null;
  search: string;
  statusFilter: ReportStatus | "all";
  typeFilter: ReportType | "all";
}

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  daily: "Daily Report", weekly: "Weekly Report", monthly: "Monthly Report",
  quarterly: "Quarterly Report", yearly: "Yearly Report", custom: "Custom Report",
};

export const REPORT_TYPE_SHORT: Record<ReportType, string> = {
  daily: "Daily", weekly: "Weekly", monthly: "Monthly",
  quarterly: "Quarterly", yearly: "Yearly", custom: "Custom",
};

export const REPORT_SECTION_LABELS: Record<ReportSectionId, string> = {
  performance_summary: "Performance Summary", pnl: "PnL", win_rate: "Win Rate",
  profit_factor: "Profit Factor", avg_rr: "Average R:R", drawdown: "Drawdown",
  risk_analysis: "Risk Analysis", psychology_summary: "Psychology Summary",
  goal_progress: "Goal Progress", strategy_performance: "Strategy Performance",
  market_performance: "Market Performance", journal_summary: "Journal Summary",
  replay_summary: "Replay Summary", trade_distribution: "Trade Distribution",
  sharpe_ratio: "Sharpe Ratio", consistency_score: "Consistency Score",
};

export const EXPORT_FORMAT_ICONS: Record<ExportFormat, string> = {
  pdf: "FileText", csv: "FileSpreadsheet", excel: "Table", json: "Code",
};

export const DURATION_OPTIONS = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 14 Days", value: "14d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 60 Days", value: "60d" },
  { label: "Last Quarter", value: "quarter" },
  { label: "This Year", value: "year" },
  { label: "All Time", value: "all" },
] as const;
