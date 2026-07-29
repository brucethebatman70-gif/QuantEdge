"use client";

import { useState, useEffect } from "react";
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
import { DemoModePrompt } from "@/components/onboarding";
import { OnboardingChecklist } from "@/components/onboarding";
import { ProductTour } from "@/components/onboarding";
import { CelebrationOverlay } from "@/components/onboarding";

const equityData = mockEquityCurve.map((d) => ({
  date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  equity: d.value,
}));

export default function DashboardPage() {
  const [hasData, setHasData] = useState(false);
  const [showDemoPrompt, setShowDemoPrompt] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("qe-demo-loaded");
    if (saved) {
      setHasData(true);
      setShowDemoPrompt(false);
    }
  }, []);

  const handleLoadDemo = () => {
    localStorage.setItem("qe-demo-loaded", "true");
    setHasData(true);
    setShowDemoPrompt(false);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  if (!hasData && showDemoPrompt) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <DemoModePrompt onLoadDemo={handleLoadDemo} onCancel={() => setShowDemoPrompt(false)} />
        </div>
        <ProductTour />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <CelebrationOverlay
        show={showCelebration}
        title="Demo workspace ready!"
        subtitle="Explore realistic sample data across every feature."
        onComplete={() => setShowCelebration(false)}
      />

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              <ScrollReveal><ProfitCard /></ScrollReveal>
              <ScrollReveal><WinRateCard /></ScrollReveal>
              <ScrollReveal><RiskCard /></ScrollReveal>
              <ScrollReveal><DrawdownCard /></ScrollReveal>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 mt-4">
              <ScrollReveal className="lg:col-span-2">
                <ChartContainer title="Performance Dashboard" subtitle="Equity curve with drawdown overlay" glow="success" height={380}>
                  <EquityCurveChart data={equityData} height={340} showDrawdown gradientId="db-eq" />
                </ChartContainer>
              </ScrollReveal>
              <ScrollReveal>
                <AICard />
              </ScrollReveal>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 mt-4">
              <ScrollReveal><TradesCard /></ScrollReveal>
              <ScrollReveal><PortfolioCard /></ScrollReveal>
              <ScrollReveal><MarketCard /></ScrollReveal>
            </div>

            <div className="grid gap-4 lg:grid-cols-2 mt-4">
              <ScrollReveal><EmotionCard /></ScrollReveal>
              <ScrollReveal><AchievementCard /></ScrollReveal>
            </div>
          </div>

          <div className="hidden xl:block w-72 shrink-0 pt-1">
            <OnboardingChecklist />
          </div>
        </div>
      </div>

      <ProductTour />
    </DashboardLayout>
  );
}
