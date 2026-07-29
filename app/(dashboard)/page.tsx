"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { mockEquityCurve } from "@/lib/mock-data";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ChartContainer } from "@/components/charts/chart-container";
import { EquityCurveChart } from "@/components/charts/equity-curve-chart";
import { ProfitCard } from "@/components/intelligence/profit-card";
import { WinRateCard } from "@/components/intelligence/win-rate-card";
import { RiskCard } from "@/components/intelligence/risk-card";
import { DrawdownCard } from "@/components/intelligence/drawdown-card";
import { TradesCard } from "@/components/intelligence/trades-card";
import { EmotionCard } from "@/components/intelligence/emotion-card";
import { AICard } from "@/components/intelligence/ai-card";
import { MarketCard } from "@/components/intelligence/market-card";
import { PortfolioCard } from "@/components/intelligence/portfolio-card";
import { AchievementCard } from "@/components/intelligence/achievement-card";

const equityData = mockEquityCurve.map((d) => ({
  date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  equity: d.value,
}));

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <ScrollReveal><ProfitCard /></ScrollReveal>
          <ScrollReveal><WinRateCard /></ScrollReveal>
          <ScrollReveal><RiskCard /></ScrollReveal>
          <ScrollReveal><DrawdownCard /></ScrollReveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <ChartContainer title="Performance Dashboard" subtitle="Equity curve with drawdown overlay" glow="success" height={380}>
              <EquityCurveChart data={equityData} height={340} showDrawdown gradientId="db-eq" />
            </ChartContainer>
          </ScrollReveal>
          <ScrollReveal>
            <AICard />
          </ScrollReveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <ScrollReveal><TradesCard /></ScrollReveal>
          <ScrollReveal><PortfolioCard /></ScrollReveal>
          <ScrollReveal><MarketCard /></ScrollReveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ScrollReveal><EmotionCard /></ScrollReveal>
          <ScrollReveal><AchievementCard /></ScrollReveal>
        </div>
      </div>
    </DashboardLayout>
  );
}
