"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { TrendBadge } from "./trend-badge";
import { AiInsightLine } from "./ai-insight-line";
import { AnimatedCounter } from "@/components/motion/animated-counter";

export function RiskCard() {
  const { avgRiskValue, currentExposure, riskUtilization, maxDrawdown, strategies } = useCardData();
  const worstDD = strategies.reduce((min, s) => Math.min(min, s.drawdown), 0);

  return (
    <IntelligenceCard glow="warning">
      <CardHeader
        title="Risk Management"
        status={riskUtilization < 60 ? "excellent" : riskUtilization < 80 ? "live" : "risk"}
      />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums tracking-tight">
            <AnimatedCounter end={avgRiskValue} prefix="$" duration={1.2} />
          </span>
          <span className="text-[10px] text-muted-foreground/40">avg loss</span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-[10px]">
          <span className="text-muted-foreground/40">Exposure:</span>
          <span className={riskUtilization < 70 ? "text-success" : "text-warning"}>
            ${currentExposure.toLocaleString()} / ${5000}
          </span>
          <span className="text-muted-foreground/30">|</span>
          <span className="text-muted-foreground/40">Worst DD:</span>
          <span className="text-error">{worstDD.toFixed(1)}%</span>
        </div>
      </div>
      <div className="px-4 pb-3">
        <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
            style={{
              width: `${riskUtilization}%`,
              background: riskUtilization < 60
                ? "linear-gradient(90deg, #10b981, #00D4AA)"
                : riskUtilization < 80
                  ? "linear-gradient(90deg, #f59e0b, #f97316)"
                  : "linear-gradient(90deg, #ef4444, #dc2626)",
            }}
          />
        </div>
      </div>
      <AiInsightLine type={riskUtilization < 60 ? "positive" : "warning"}>
        {riskUtilization < 60
          ? "Risk is well within your target range. Current exposure is healthy."
          : `Exposure at ${riskUtilization.toFixed(0)}% of capacity. Consider reducing position sizes.`}
      </AiInsightLine>
    </IntelligenceCard>
  );
}
