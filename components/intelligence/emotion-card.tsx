"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { AiInsightLine } from "./ai-insight-line";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Sparkline } from "@/components/charts/sparkline";

export function EmotionCard() {
  const { latestPsy, psychology, ai } = useCardData();
  const emotionSpark = psychology.map((p) => ({ value: p.confidence }));
  const emotionAi = ai.find((a) => a.category === "psychology");

  const metrics = [
    { label: "Confidence", value: latestPsy.confidence, max: 10, color: "#10b981" },
    { label: "Discipline", value: latestPsy.discipline, max: 10, color: "#8b5cf6" },
    { label: "Patience", value: latestPsy.patience, max: 10, color: "#06E0FF" },
    { label: "Fear", value: latestPsy.fear, max: 10, color: "#ef4444", inverse: true },
  ];

  const dominant = latestPsy.confidence >= 7 ? "Confident"
    : latestPsy.fear >= 6 ? "Anxious"
    : latestPsy.discipline >= 7 ? "Disciplined"
    : "Neutral";

  return (
    <IntelligenceCard glow="ai">
      <CardHeader
        title="Trader Psychology"
        status="ai-active"
      />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight opacity-90">{dominant}</span>
          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">dominant</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground/40">{m.label}</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-12 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(m.value / m.max) * 100}%`,
                      backgroundColor: m.color,
                    }}
                  />
                </div>
                <span className="tabular-nums font-medium w-3 text-right">{m.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 h-10">
        <Sparkline data={emotionSpark} color="#8b5cf6" height={40} />
      </div>
      <AiInsightLine type={emotionAi?.type ?? "tip"}>
        {emotionAi?.description.slice(0, 100) ?? "Your emotional state appears balanced. Maintain your current routine for consistent performance."}
      </AiInsightLine>
    </IntelligenceCard>
  );
}
