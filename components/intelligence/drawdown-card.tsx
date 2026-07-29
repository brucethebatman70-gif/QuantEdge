"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { TrendBadge } from "./trend-badge";
import { AiInsightLine } from "./ai-insight-line";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Sparkline } from "@/components/charts/sparkline";
export function DrawdownCard() {
  const { maxDrawdown, recoveryFrom, recoveryProgress, equity } = useCardData();
  const ddSpark = equity.map((e) => ({ value: Math.max(0, Math.abs(e.drawdown) * 5) }));

  return (
    <IntelligenceCard glow="warning">
      <CardHeader
        title="Drawdown"
        status={recoveryProgress > 50 ? "excellent" : "warning"}
      />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums tracking-tight text-error">
            <AnimatedCounter end={Math.abs(maxDrawdown.value)} duration={1.2} suffix="%" />
          </span>
          <TrendBadge value={Math.abs(maxDrawdown.change)} label="vs last week" inverse />
        </div>
        <div className="flex items-center gap-3 mt-1 text-[10px]">
          <span className="text-muted-foreground/40">Recovery:</span>
          <span className="text-success">{recoveryProgress.toFixed(0)}%</span>
          <span className="text-muted-foreground/30">|</span>
          <span className="text-muted-foreground/40">Peak-to-trough:</span>
          <span className="text-error">${(recoveryFrom * 100).toLocaleString()}</span>
        </div>
      </div>
      <div className="px-4 h-10">
        <Sparkline data={ddSpark} color="#ef4444" height={40} />
      </div>
      <AiInsightLine type={recoveryProgress > 50 ? "positive" : "warning"}>
        {recoveryProgress > 50
          ? `Recovered ${recoveryProgress.toFixed(0)}% of drawdown. On track to break even within ${Math.round((100 - recoveryProgress) / 10)} weeks.`
          : `Currently ${(100 - recoveryProgress).toFixed(0)}% from full recovery. Consider tighter risk parameters.`}
      </AiInsightLine>
    </IntelligenceCard>
  );
}
