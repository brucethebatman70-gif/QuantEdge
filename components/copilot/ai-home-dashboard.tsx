"use client";

import type { AiProactiveAlert, CopilotConversation } from "@/lib/copilot/types";
import { useCopilotStore } from "@/lib/copilot/store";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";

const equitySpark = mockAnalyticsData.equityCurve.map((e) => ({ value: e.equity }));
const psyTrend = mockAnalyticsData.psychologyTrends.map((p) => ({ value: p.confidence }));
const marketData = mockAnalyticsData.marketPerformance;

export function AiHomeDashboard() {
  const { insights, proactiveAlerts, conversations, setView, setActiveConversation, memory } = useCopilotStore();
  const unreadAlerts = proactiveAlerts.filter((a) => !a.read).length;
  const recentConversations = conversations.slice(0, 4);
  const confidentInsight = insights.reduce((best, i) => i.value / i.max > (best?.value ?? 0) / (best?.max ?? 1) ? i : best, insights[0]);

  const aiScore = Math.round(
    insights.reduce((s, i) => s + (i.value / i.max) * 20, 0) / insights.length
  );

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="shrink-0 px-6 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#00D4AA] animate-pulse" />
              <h1 className="text-lg font-semibold tracking-tight">AI Intelligence</h1>
            </div>
            <p className="text-[11px] text-muted-foreground/50 mt-0.5">
              Today · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadAlerts > 0 && (
              <span className="flex items-center gap-1.5 rounded-lg bg-warning/10 border border-warning/20 px-2.5 py-1 text-[10px] text-warning font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                {unreadAlerts} alert{unreadAlerts > 1 ? "s" : ""}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground/40">
              AI Score: <span className="tabular-nums font-medium text-[#00D4AA]">{aiScore}%</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6 space-y-4 overflow-y-auto">
        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
          <ScrollReveal><TodaySummaryWidget /></ScrollReveal>
          <ScrollReveal><ConfidenceWidget /></ScrollReveal>
          <ScrollReveal><StreakWidget /></ScrollReveal>
          <ScrollReveal><RiskWidget /></ScrollReveal>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <PerformanceInsightWidget />
          </ScrollReveal>
          <ScrollReveal>
            <ProactiveAlertsWidget alerts={proactiveAlerts} conversations={conversations} />
          </ScrollReveal>
        </div>

        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
          <ScrollReveal className="xl:col-span-2">
            <QuickActionsGrid onStartChat={() => { setView("chat"); setActiveConversation(null); }} />
          </ScrollReveal>
          <ScrollReveal className="xl:col-span-2">
            <RecentConversationsWidget conversations={recentConversations} onSelect={(id) => { setActiveConversation(id); setView("chat"); }} />
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

function WidgetShell({ title, status, children, className = "" }: { title: string; status?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card group relative ${className}`}>
      <div className="glass-card-inner-glow" />
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-semibold">{title}</h3>
          {status && <span className="text-[9px] text-muted-foreground/30">{status}</span>}
        </div>
        {children}
      </div>
    </div>
  );
}

function TodaySummaryWidget() {
  const kpis = mockAnalyticsData.kpis;
  const netProfit = kpis.find((k) => k.label === "Net Profit")!;
  const winRate = kpis.find((k) => k.label === "Win Rate")!;
  const todayPnl = mockAnalyticsData.dailyPerformance[0]?.pnl ?? 0;
  const weekTrades = Math.round(mockAnalyticsData.weeklyPerformance.reduce((s, w) => s + w.trades, 0) / 4);

  return (
    <WidgetShell title="Today's Summary" status="Live">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold tabular-nums tracking-tight">
          <AnimatedCounter end={todayPnl} prefix="$" duration={1} />
        </span>
        <span className={todayPnl >= 0 ? "text-[10px] text-success" : "text-[10px] text-error"}>
          {todayPnl >= 0 ? "+" : ""}
          <AnimatedCounter end={Math.abs(todayPnl)} duration={0.8} prefix="$" />
          {" today"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2 text-[10px]">
        <div className="flex items-center justify-between rounded-md bg-white/[0.03] px-2 py-1">
          <span className="text-muted-foreground/40">Win Rate</span>
          <span className="tabular-nums font-medium">{winRate.value}%</span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-white/[0.03] px-2 py-1">
          <span className="text-muted-foreground/40">Trades</span>
          <span className="tabular-nums font-medium">{weekTrades}</span>
        </div>
      </div>
    </WidgetShell>
  );
}

function ConfidenceWidget() {
  const confident = mockAnalyticsData.kpis.find((k) => k.label === "Net Profit")!;
  const consistency = mockAnalyticsData.strategyPerformance.reduce((s, st) => s + st.consistency, 0) / mockAnalyticsData.strategyPerformance.length;
  const confLevel = consistency >= 80 ? "Very High" : consistency >= 65 ? "High" : consistency >= 50 ? "Medium" : "Low";

  return (
    <WidgetShell title="AI Confidence" status={confLevel}>
      <div className="flex items-center gap-3 mb-2">
        <div className="relative h-14 w-14">
          <svg viewBox="0 0 60 60" className="h-14 w-14 -rotate-90">
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="30" cy="30" r="24" fill="none" stroke="#00D4AA" strokeWidth="5"
              strokeDasharray={`${(consistency / 100) * 150.8} 150.8`}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(0,212,170,0.3))" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tabular-nums">{Math.round(consistency)}%</span>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-[10px] text-muted-foreground/50">Data quality: excellent</p>
          <p className="text-[10px] text-muted-foreground/50">Prediction accuracy: {Math.round(consistency - 5)}%</p>
          <p className="text-[9px] text-muted-foreground/30 mt-1">Last updated 2m ago</p>
        </div>
      </div>
    </WidgetShell>
  );
}

function StreakWidget() {
  const streak = mockAnalyticsData.kpis.find((k) => k.label === "Current Streak")!;
  const bestStreak = Math.max(streak.value, 8);

  return (
    <WidgetShell title="Trading Streak" status={streak.value >= 5 ? "🔥 On Fire" : "Active"}>
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tabular-nums"><AnimatedCounter end={streak.value} duration={1} /></span>
            <span className="text-[10px] text-muted-foreground/40">wins</span>
          </div>
          <p className="text-[9px] text-muted-foreground/30">Best: {bestStreak}</p>
        </div>
        <div className="flex-1 h-6 flex items-end gap-[2px]">
          {Array.from({ length: 14 }, (_, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all duration-500"
              style={{
                height: i < streak.value ? `${40 + Math.random() * 60}%` : "10%",
                background: i < streak.value ? "linear-gradient(180deg, #00D4AA, rgba(0,212,170,0.3))" : "rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

function RiskWidget() {
  const maxDD = mockAnalyticsData.kpis.find((k) => k.label === "Max Drawdown")!;
  const avgRisk = mockAnalyticsData.kpis.find((k) => k.label === "Avg Trade")!;
  const exposurePct = Math.abs(maxDD.value) / 12 * 100;
  const riskOk = exposurePct < 70;

  return (
    <WidgetShell title="Risk Score" status={riskOk ? "Healthy" : "Warning"}>
      <div className="flex items-center gap-3 mb-2">
        <div className="relative h-14 w-14">
          <svg viewBox="0 0 60 60" className="h-14 w-14 -rotate-90">
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="30" cy="30" r="24" fill="none" stroke={riskOk ? "#10b981" : "#f59e0b"} strokeWidth="5"
              strokeDasharray={`${Math.min(100, exposurePct) / 100 * 150.8} 150.8`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tabular-nums">{Math.round(Math.min(100, exposurePct))}%</span>
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground/40">Drawdown</span>
            <span className="tabular-nums font-medium text-error">{Math.abs(maxDD.value)}%</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground/40">Avg Risk</span>
            <span className="tabular-nums font-medium">{avgRisk.prefix}${Math.abs(avgRisk.value).toFixed(0)}</span>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

function PerformanceInsightWidget() {
  const monthly = mockAnalyticsData.monthlyPerformance;
  const bestMonth = monthly.reduce((best, m) => m.pnl > best.pnl ? m : best);
  const worstMonth = monthly.reduce((worst, m) => m.pnl < worst.pnl ? m : worst);
  const totalPnl = monthly.reduce((s, m) => s + m.pnl, 0);
  const activeStrategies = mockAnalyticsData.strategyPerformance.filter((s) => s.expectancy > 0).length;
  const bestStrategy = mockAnalyticsData.strategyPerformance.reduce((best, s) => s.expectancy > best.expectancy ? s : best);

  return (
    <WidgetShell title="Performance Insights">
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums">
            <AnimatedCounter end={totalPnl} prefix="$" duration={1.2} />
          </span>
          <span className="text-[10px] text-success">YTD P&L</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="rounded-md bg-white/[0.03] p-2">
            <p className="text-muted-foreground/40 mb-0.5">Best Month</p>
            <p className="font-medium text-success">{bestMonth.period} — <AnimatedCounter end={bestMonth.pnl} prefix="$" duration={0.8} /></p>
          </div>
          <div className="rounded-md bg-white/[0.03] p-2">
            <p className="text-muted-foreground/40 mb-0.5">Worst Month</p>
            <p className="font-medium text-error">{worstMonth.period} — <AnimatedCounter end={Math.abs(worstMonth.pnl)} prefix="$" duration={0.8} /></p>
          </div>
          <div className="rounded-md bg-white/[0.03] p-2">
            <p className="text-muted-foreground/40 mb-0.5">Active Strategies</p>
            <p className="font-medium text-[#06E0FF]">{activeStrategies}/{mockAnalyticsData.strategyPerformance.length} profitable</p>
          </div>
          <div className="rounded-md bg-white/[0.03] p-2">
            <p className="text-muted-foreground/40 mb-0.5">Top Strategy</p>
            <p className="font-medium text-[#00D4AA]">{bestStrategy.strategy} — ${bestStrategy.expectancy}/trade</p>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

function ProactiveAlertsWidget({ alerts, conversations }: { alerts: AiProactiveAlert[]; conversations: CopilotConversation[] }) {
  const unread = alerts.filter((a) => !a.read);
  const chatSuggestions = conversations.length === 0;

  return (
    <WidgetShell title="Proactive Insights" status={`${unread.length} new`}>
      <div className="space-y-1.5">
        {(unread.length > 0 ? unread : []).length > 0 ? (
          unread.slice(0, 2).map((alert) => (
            <div key={alert.id} className="flex items-start gap-2 rounded-md bg-white/[0.03] p-2">
              <span className={alert.type === "warning" ? "text-warning" : alert.type === "celebration" ? "text-success" : alert.type === "insight" ? "text-[#06E0FF]" : "text-[#00D4AA]"}>
                {alert.type === "warning" ? "⚠" : alert.type === "celebration" ? "✦" : alert.type === "insight" ? "→" : "•"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] leading-relaxed text-muted-foreground/70">{alert.message}</p>
                {alert.actionLabel && (
                  <button className="mt-1 text-[9px] font-medium text-[#00D4AA] opacity-70 hover:opacity-100">{alert.actionLabel}</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-[10px] text-muted-foreground/30">No new insights</p>
            {chatSuggestions && (
              <p className="text-[9px] text-muted-foreground/20 mt-1">Start a conversation to receive personalized insights</p>
            )}
          </div>
        )}
      </div>
    </WidgetShell>
  );
}

function QuickActionsGrid({ onStartChat }: { onStartChat: () => void }) {
  const actions = [
    { label: "New Chat", icon: "💬", desc: "Ask anything", action: onStartChat },
    { label: "Review Today", icon: "📊", desc: "Trade analysis" },
    { label: "Risk Check", icon: "🛡️", desc: "Exposure audit" },
    { label: "Weekly Report", icon: "📈", desc: "Generate report" },
    { label: "Emotion Scan", icon: "🧠", desc: "Psychology check" },
    { label: "Market Intel", icon: "🌍", desc: "Market analysis" },
  ];

  return (
    <WidgetShell title="Quick Actions">
      <div className="grid grid-cols-3 gap-2">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.action}
            className="flex flex-col items-center gap-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] p-2.5 transition-all duration-200 group/btn"
          >
            <span className="text-lg opacity-60 group-hover/btn:opacity-100 transition-opacity">{a.icon}</span>
            <span className="text-[9px] font-medium opacity-70 group-hover/btn:opacity-100 transition-opacity">{a.label}</span>
            <span className="text-[8px] text-muted-foreground/30">{a.desc}</span>
          </button>
        ))}
      </div>
    </WidgetShell>
  );
}

function RecentConversationsWidget({ conversations, onSelect }: { conversations: CopilotConversation[]; onSelect: (id: string) => void }) {
  return (
    <WidgetShell title="Recent Conversations" status={conversations.length > 0 ? `${conversations.length} chats` : ""}>
      <div className="space-y-1">
        {conversations.length > 0 ? (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className="w-full flex items-center gap-2 rounded-md hover:bg-white/[0.04] px-2 py-1.5 transition-colors text-left group/conv"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-white/[0.06] text-[9px] shrink-0">
                {conv.folder === "Performance" ? "📈" : conv.folder === "Risk" ? "🛡️" : conv.folder === "Psychology" ? "🧠" : conv.folder === "Strategy" ? "🎯" : "💬"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium truncate opacity-80 group-hover/conv:opacity-100 transition-opacity">{conv.title}</p>
                <p className="text-[8px] text-muted-foreground/30 truncate">{conv.messages[0]?.content.slice(0, 60)}...</p>
              </div>
              <span className="text-[8px] text-muted-foreground/20 shrink-0">
                {new Date(conv.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </button>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-[10px] text-muted-foreground/30">No conversations yet</p>
            <p className="text-[9px] text-muted-foreground/20 mt-1">Start a new chat to begin</p>
          </div>
        )}
      </div>
    </WidgetShell>
  );
}
