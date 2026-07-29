"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { TrendBadge } from "./trend-badge";
import { AiInsightLine } from "./ai-insight-line";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Sparkline } from "@/components/charts/sparkline";

export function ProfitCard() {
  const { netProfit, monthly, equitySpark } = useCardData();
  const monthlyTrend = monthly[monthly.length - 1]?.pnl ?? 0;
  const prevMonth = monthly[monthly.length - 2]?.pnl ?? 0;
  const change = prevMonth !== 0 ? ((monthlyTrend - prevMonth) / Math.abs(prevMonth)) * 100 : 0;

  return (
    <IntelligenceCard glow="success">
      <CardHeader
        title="Net Profit"
        status={netProfit.value > 0 ? "excellent" : "warning"}
      />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums tracking-tight">
            <AnimatedCounter end={netProfit.value} prefix="$" duration={1.2} />
          </span>
          <TrendBadge value={netProfit.change} label="vs last week" className="text-xs" />
        </div>
        <p className="text-[10px] text-muted-foreground/40 mt-0.5">
          Monthly trend: <span className={monthlyTrend >= 0 ? "text-success" : "text-error"}>
            {monthlyTrend >= 0 ? "+" : ""}{monthlyTrend.toLocaleString()}
          </span>
        </p>
      </div>
      <div className="px-4 h-10">
        <Sparkline data={equitySpark} color="#00D4AA" height={40} />
      </div>
      <AiInsightLine type="positive">
        Your net profit grew {netProfit.change}% this week. {monthlyTrend >= 0 ? `Best month so far at $${monthlyTrend.toLocaleString()}.` : `Consider reviewing this month's dip of $${Math.abs(monthlyTrend).toLocaleString()}.`}
      </AiInsightLine>
    </IntelligenceCard>
  );
}
