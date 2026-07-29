"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { AiInsightLine } from "./ai-insight-line";

export function AICard() {
  const { topAi, strategies } = useCardData();
  const best = strategies.reduce((best, s) => s.expectancy > best.expectancy ? s : best);

  const riskDetected = topAi.filter((a) => a.type === "warning").length;
  const qualityScore = Math.round(
    strategies.reduce((s, st) => s + st.consistency, 0) / strategies.length
  );

  return (
    <IntelligenceCard glow="ai">
      <CardHeader title="AI Intelligence" status="ai-active" />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-4">
          <div>
            <span className="text-3xl font-bold tabular-nums tracking-tight opacity-90">
              {qualityScore}
            </span>
            <span className="text-sm text-muted-foreground/40 ml-0.5">%</span>
            <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider mt-0.5">Trade Quality</p>
          </div>
          <div className="flex gap-3 text-[10px]">
            <div className="text-center">
              <p className="tabular-nums font-medium">{topAi.filter((a) => a.type === "positive").length}</p>
              <p className="text-muted-foreground/40">Positives</p>
            </div>
            <div className="text-center">
              <p className={riskDetected > 0 ? "tabular-nums font-medium text-warning" : "tabular-nums font-medium"}>
                {riskDetected}
              </p>
              <p className="text-muted-foreground/40">Risks</p>
            </div>
            <div className="text-center">
              <p className="tabular-nums font-medium">{topAi.filter((a) => a.type === "tip").length}</p>
              <p className="text-muted-foreground/40">Tips</p>
            </div>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          {topAi.map((insight, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[9px]">
              <span className={insight.type === "positive" ? "text-success" : insight.type === "warning" ? "text-warning" : "text-[#06E0FF]"}>
                {insight.type === "positive" ? "✦" : insight.type === "warning" ? "⚠" : "→"}
              </span>
              <span className="text-muted-foreground/60">{insight.title}</span>
              <span className="tabular-nums ml-auto font-medium opacity-70">{insight.metric}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 pb-3">
        <button className="w-full rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-[10px] font-medium py-1.5 transition-colors">
          Analyze Now →
        </button>
      </div>
      <AiInsightLine type="tip">
        Your best strategy "{best.strategy}" delivers ${best.expectancy} expectancy with {best.winRate}% win rate.
      </AiInsightLine>
    </IntelligenceCard>
  );
}
