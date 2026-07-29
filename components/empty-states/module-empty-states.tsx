"use client";

import { EmptyStateShell } from "./empty-state-shell";
import {
  TradesIllustration,
  AnalyticsIllustration,
  CalendarIllustration,
  ReportsIllustration,
  GoalsIllustration,
  AiIllustration,
  JournalIllustration,
  ImportIllustration,
  AchievementsIllustration,
  WatchlistIllustration,
  SearchIllustration,
  DemoIllustration,
} from "./illustrations";
import { Icons } from "@/lib/icons";

export function DashboardEmpty({ onStartDemo }: { onStartDemo?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<DemoIllustration size={96} />}
      title="Your trading dashboard awaits"
      description="See your P&L, win rate, risk metrics, and AI insights at a glance. Connect a broker or import your trades to get started."
      action={{
        label: "Explore Demo Workspace",
        onClick: onStartDemo,
        icon: <Icons.Play className="h-3.5 w-3.5" />,
      }}
      secondaryAction={{ label: "Import Trades" }}
      estimatedTime="2 min"
      tip="Demo mode loads realistic sample data so you can explore every feature immediately."
    />
  );
}

export function TradesEmpty({ onImport, onAddTrade }: { onImport?: () => void; onAddTrade?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<TradesIllustration size={88} />}
      title="Track every trade you make"
      description="Log your trades to unlock performance analytics, win rate tracking, and AI-powered insights that help you improve."
      action={{ label: "Import Trades", onClick: onImport, icon: <Icons.Upload className="h-3.5 w-3.5" /> }}
      secondaryAction={{ label: "Add Manually", onClick: onAddTrade }}
      estimatedTime="5 min"
      tip="You can connect MT4, MT5, TradingView, or upload a CSV file to import your trade history."
    />
  );
}

export function AnalyticsEmpty({ onImport }: { onImport?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<AnalyticsIllustration size={88} />}
      title="Data-driven trading starts here"
      description="Analytics turn your trades into actionable insights. Import trade history to see performance breakdowns, risk metrics, and strategy analysis."
      action={{ label: "Import Trade Data", onClick: onImport, icon: <Icons.Upload className="h-3.5 w-3.5" /> }}
      estimatedTime="5 min"
      tip="With just 20+ trades, you'll get meaningful win rate, expectancy, and Sharpe ratio analysis."
    />
  );
}

export function CalendarEmpty({ onAddEvent }: { onAddEvent?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<CalendarIllustration size={88} />}
      title="Plan your trading calendar"
      description="Track economic events, earnings reports, and your personal trading sessions. Never miss a market-moving event again."
      action={{ label: "Add Event", onClick: onAddEvent, icon: <Icons.Plus className="h-3.5 w-3.5" /> }}
      estimatedTime="1 min"
      tip="The calendar syncs with major economic calendars to highlight high-impact events automatically."
    />
  );
}

export function ReportsEmpty({ onGenerate }: { onGenerate?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<ReportsIllustration size={88} />}
      title="Generate professional trading reports"
      description="Create detailed performance reports with a single click. Share them with your mentor, community, or keep them for your records."
      action={{ label: "Generate First Report", onClick: onGenerate, icon: <Icons.FileText className="h-3.5 w-3.5" /> }}
      estimatedTime="30 sec"
      tip="Reports include P&L summary, trade distribution, risk analysis, and AI-generated performance commentary."
    />
  );
}

export function GoalsEmpty({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<GoalsIllustration size={88} />}
      title="Set goals that drive results"
      description="Define daily, weekly, and monthly trading goals. Track your progress and let AI help you stay accountable."
      action={{ label: "Create First Goal", onClick: onCreate, icon: <Icons.Target className="h-3.5 w-3.5" /> }}
      estimatedTime="2 min"
      tip="Traders who set goals improve their win rate by an average of 23%. Start with a daily trade target."
    />
  );
}

export function AiEmpty({ onStartChat }: { onStartChat?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<AiIllustration size={88} />}
      title="Your AI trading co-pilot is ready"
      description="Analyze trades, review strategies, check risk, and get psychology coaching — all through natural conversation."
      action={{ label: "Start a Conversation", onClick: onStartChat, icon: <Icons.MessageSquare className="h-3.5 w-3.5" /> }}
      tip="Try asking: 'Review my last 10 trades' or 'What's my current risk exposure?'"
    />
  );
}

export function JournalEmpty({ onCreate, onImport }: { onCreate?: () => void; onImport?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<JournalIllustration size={88} />}
      title="Document your trading journey"
      description="Journaling helps you identify patterns in your decision-making. Record your thoughts, emotions, and lessons from every trade."
      action={{ label: "Write First Entry", onClick: onCreate, icon: <Icons.Edit3 className="h-3.5 w-3.5" /> }}
      secondaryAction={{ label: "Import Notes", onClick: onImport }}
      estimatedTime="3 min"
      tip="Traders who journal consistently improve 2x faster. Start with a simple trade recap."
    />
  );
}

export function ImportEmpty({ onImport, onConnect }: { onImport?: () => void; onConnect?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<ImportIllustration size={88} />}
      title="Import your trade history"
      description="Connect your broker or upload trade files to populate your QuantEdge workspace. Supports MT4, MT5, TradingView, and CSV."
      action={{ label: "Connect Broker", onClick: onConnect, icon: <Icons.Link2 className="h-3.5 w-3.5" /> }}
      secondaryAction={{ label: "Upload CSV", onClick: onImport }}
      estimatedTime="3 min"
      tip="Your data stays encrypted. We support 20+ broker platforms and standard CSV formats."
    />
  );
}

export function AchievementsEmpty() {
  return (
    <EmptyStateShell
      illustration={<AchievementsIllustration size={88} />}
      title="Achievements unlock as you trade"
      description="Complete trades, hit goals, and build streaks to earn achievements. Each one marks a milestone in your trading journey."
      tip="Your first achievement unlocks after logging 10 trades. Consistent trading is the key."
    />
  );
}

export function WatchlistEmpty({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<WatchlistIllustration size={88} />}
      title="Build your watchlist"
      description="Track the instruments that matter to you. Add symbols to monitor prices, news, and AI-generated trading signals."
      action={{ label: "Add Symbol", onClick: onAdd, icon: <Icons.Plus className="h-3.5 w-3.5" /> }}
      estimatedTime="30 sec"
      tip="Start with your most traded instruments. You can organize them into custom groups."
    />
  );
}

export function SearchEmpty({ query }: { query?: string }) {
  return (
    <EmptyStateShell
      illustration={<SearchIllustration size={72} />}
      title={query ? `No results for "${query}"` : "Search everything"}
      description={query
        ? "Try different keywords or browse popular pages below."
        : "Search across trades, journals, reports, goals, and settings."}
      tip="Try searching for 'AAPL', 'risk report', or 'March goals'"
      compact
    />
  );
}

export function PlaybooksEmpty({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<TradesIllustration size={88} />}
      title="Create your trading playbooks"
      description="Document your winning strategies as reusable playbooks. Set entry rules, exit criteria, and risk parameters for every setup you trade."
      action={{ label: "Create Playbook", onClick: onCreate, icon: <Icons.Plus className="h-3.5 w-3.5" /> }}
      estimatedTime="5 min"
      tip="Start with your most profitable setup. A well-documented playbook is your edge."
    />
  );
}

export function ReplayEmpty({ onStart }: { onStart?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<AnalyticsIllustration size={88} />}
      title="Replay and learn from your trades"
      description="Step through your trades tick-by-tick to understand exactly what happened. Learn from every entry and exit."
      action={{ label: "Select a Trade", onClick: onStart, icon: <Icons.Play className="h-3.5 w-3.5" /> }}
      estimatedTime="3 min"
      tip="Import at least 10 trades to get the full replay experience with market context."
    />
  );
}

export function BacktestingEmpty({ onNew }: { onNew?: () => void }) {
  return (
    <EmptyStateShell
      illustration={<AnalyticsIllustration size={88} />}
      title="Test strategies before risking capital"
      description="Backtest your trading ideas against historical data to see how they would have performed before trading them live."
      action={{ label: "New Backtest", onClick: onNew, icon: <Icons.Beaker className="h-3.5 w-3.5" /> }}
      estimatedTime="10 min"
      tip="Start with a simple moving average crossover strategy to learn the backtesting workflow."
    />
  );
}
