"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { TrendBadge } from "./trend-badge";
import { AiInsightLine } from "./ai-insight-line";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Sparkline } from "@/components/charts/sparkline";

export function WinRateCard() {
  const { winRate, monthly, bestStrategy } = useCardData();
  const weeklyRates = monthly.map((m) => ({ value: m.winRate }));
  const consistency = bestStrategy.consistency;

  return (
    <IntelligenceCard glow="analytics">
      <CardHeader
        title="Win Rate"
        status={winRate.value >= 65 ? "excellent" : winRate.value >= 55 ? "live" : "warning"}
      />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums tracking-tight">
            <AnimatedCounter end={winRate.value} duration={1.2} />
            <span className="text-lg text-muted-foreground/40">%</span>
          </span>
          <TrendBadge value={winRate.change} label="vs last week" />
        </div>
        <p className="text-[10px] text-muted-foreground/40 mt-0.5">
          Consistency score: <span className="text-[#8b5cf6]">{consistency}%</span>
        </p>
      </div>
      <div className="px-4 h-10">
        <Sparkline data={weeklyRates} color="#06E0FF" height={40} />
      </div>
      <AiInsightLine type="tip">
        Your {bestStrategy.strategy} strategy leads at {bestStrategy.winRate}% win rate. Focus on this setup for consistent results.
      </AiInsightLine>
    </IntelligenceCard>
  );
}
