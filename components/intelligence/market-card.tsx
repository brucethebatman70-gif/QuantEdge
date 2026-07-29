"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { AiInsightLine } from "./ai-insight-line";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { BarChart } from "@/components/charts/bar-chart";

export function MarketCard() {
  const { markets, sessions, bestSession, weekly } = useCardData();

  const todaySession = sessions.reduce((best, s) => s.trades > best.trades ? s : best);

  return (
    <IntelligenceCard glow="analytics">
      <CardHeader
        title="Market Overview"
        status="live"
      />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-4">
          <div>
            <p className="text-lg font-bold capitalize opacity-90">{todaySession.session}</p>
            <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">active session</p>
          </div>
          <div className="flex gap-3 text-[10px]">
            <div className="text-center">
              <p className="tabular-nums font-medium text-success">{todaySession.winRate.toFixed(0)}%</p>
              <p className="text-muted-foreground/40">WR</p>
            </div>
            <div className="text-center">
              <p className="tabular-nums font-medium">{todaySession.trades}</p>
              <p className="text-muted-foreground/40">trades</p>
            </div>
            <div className="text-center">
              <p className="tabular-nums font-medium text-success">${todaySession.pnl.toLocaleString()}</p>
              <p className="text-muted-foreground/40">P&L</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 h-14">
        <BarChart
          data={markets.slice(0, 4).map((m) => ({
            label: m.market,
            value: m.pnl / 1000,
            color: m.pnl >= 0 ? "#10b981" : "#ef4444",
          }))}
          height={55}
          maxBarSize={18}
          showGrid={false}
        />
      </div>
      <AiInsightLine type="tip">
        {todaySession.session === bestSession.session
          ? `${todaySession.session.charAt(0).toUpperCase() + todaySession.session.slice(1)} session is your peak — ${todaySession.winRate}% win rate.`
          : `${bestSession.session.charAt(0).toUpperCase() + bestSession.session.slice(1)} session outperforms at ${bestSession.winRate}% win rate.`}
      </AiInsightLine>
    </IntelligenceCard>
  );
}
