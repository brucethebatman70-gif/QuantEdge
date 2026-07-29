"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { AiInsightLine } from "./ai-insight-line";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { BarChart } from "@/components/charts/bar-chart";

export function TradesCard() {
  const { tradesToday, tradesWeek, tradesMonth, winLossByDay, bestSession } = useCardData();
  const totalTrades = tradesWeek * 4;

  return (
    <IntelligenceCard glow="analytics">
      <CardHeader
        title="Trade Activity"
        status="live"
      />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-4">
          <div>
            <span className="text-3xl font-bold tabular-nums tracking-tight">
              <AnimatedCounter end={tradesToday} duration={1} />
            </span>
            <span className="text-[9px] text-muted-foreground/40 ml-1">today</span>
          </div>
          <div className="flex gap-3 text-[10px]">
            <div className="text-center">
              <p className="tabular-nums font-medium">{tradesWeek}</p>
              <p className="text-muted-foreground/40">week</p>
            </div>
            <div className="text-center">
              <p className="tabular-nums font-medium">{tradesMonth}</p>
              <p className="text-muted-foreground/40">month</p>
            </div>
            <div className="text-center">
              <p className="tabular-nums font-medium">{totalTrades}</p>
              <p className="text-muted-foreground/40">total</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 h-16">
        <BarChart
          data={winLossByDay.map((d) => ({ label: d.day, value: d.wins }))}
          height={60}
          maxBarSize={14}
          showGrid={false}
        />
      </div>
      <AiInsightLine type="tip">
        Your {bestSession.session} session leads with {bestSession.winRate}% win rate. Peak hours show strongest performance.
      </AiInsightLine>
    </IntelligenceCard>
  );
}
