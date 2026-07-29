"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { AiInsightLine } from "./ai-insight-line";
import { AnimatedCounter } from "@/components/motion/animated-counter";

export function AchievementCard() {
  const { streak, mockStats, strategies } = useCardData();
  const bestStreak = Math.max(mockStats.consecutiveWins, 8);
  const totalTrades = mockStats.totalTrades;
  const bestStrategy = strategies.reduce((best, s) => s.winRate > best.winRate ? s : best);
  const milestones = [
    { label: "Total Trades", current: totalTrades, target: 500 },
    { label: "Win Rate", current: mockStats.winRate, target: 75, suffix: "%" },
    { label: "Best Streak", current: bestStreak, target: 15, suffix: " wins" },
  ];

  return (
    <IntelligenceCard glow="success">
      <CardHeader
        title="Achievements"
        status={streak.value >= 5 ? "excellent" : "live"}
      />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tabular-nums tracking-tight">
                <AnimatedCounter end={streak.value} duration={1} />
              </span>
              <span className="text-lg text-muted-foreground/40">🔥</span>
            </div>
            <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">Current Streak</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold tabular-nums">{bestStreak}</p>
            <p className="text-[9px] text-muted-foreground/40">Best</p>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          {milestones.map((m) => {
            const progress = Math.min(100, (m.current / m.target) * 100);
            return (
              <div key={m.label} className="text-[10px]">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-muted-foreground/40">{m.label}</span>
                  <span className="tabular-nums font-medium">
                    {m.current}{m.suffix ?? ""} / {m.target}{m.suffix ?? ""}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progress}%`,
                      background: progress >= 80
                        ? "linear-gradient(90deg, #10b981, #00D4AA)"
                        : progress >= 50
                          ? "linear-gradient(90deg, #f59e0b, #f97316)"
                          : "linear-gradient(90deg, #06E0FF, #8b5cf6)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AiInsightLine type="positive">
        {totalTrades >= 350 ? "Excellent momentum. You're on track to reach 500 trades within several months." : `You're building consistency at ${Math.round(mockStats.winRate)}% win rate.`}
      </AiInsightLine>
    </IntelligenceCard>
  );
}
