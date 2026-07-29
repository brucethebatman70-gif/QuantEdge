"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsHeader } from "@/components/analytics/analytics-header";
import { FilterBar } from "@/components/analytics/filter-bar";
import { KpiCards } from "@/components/analytics/kpi-cards";
import { EquityChart } from "@/components/analytics/equity-chart";
import { PerformanceSection } from "@/components/analytics/performance-section";
import { MarketAnalytics } from "@/components/analytics/market-analytics";
import { PairAnalytics } from "@/components/analytics/pair-analytics";
import { StrategyAnalytics } from "@/components/analytics/strategy-analytics";
import { SessionAnalytics } from "@/components/analytics/session-analytics";
import { RiskAnalytics } from "@/components/analytics/risk-analytics";
import { PsychologyAnalytics } from "@/components/analytics/psychology-analytics";
import { CalendarHeatmap } from "@/components/analytics/calendar-heatmap";
import { AiInsights } from "@/components/analytics/ai-insights";
import { CompareMode } from "@/components/analytics/compare-mode";
import { useAnalyticsStore } from "@/lib/analytics/store";

export default function AnalyticsPage() {
  const { activeTab, setActiveTab } = useAnalyticsStore();

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        <AnalyticsHeader />
        <KpiCards />
        <FilterBar />
        <CompareMode />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-9 flex-wrap">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
            <TabsTrigger value="markets" className="text-xs">Markets</TabsTrigger>
            <TabsTrigger value="strategies" className="text-xs">Strategies</TabsTrigger>
            <TabsTrigger value="sessions" className="text-xs">Sessions</TabsTrigger>
            <TabsTrigger value="risk" className="text-xs">Risk</TabsTrigger>
            <TabsTrigger value="psychology" className="text-xs">Psychology</TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs">Calendar</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <EquityChart />
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <PerformanceSection />
          </TabsContent>

          <TabsContent value="markets" className="mt-4 space-y-4">
            <MarketAnalytics />
            <PairAnalytics />
          </TabsContent>

          <TabsContent value="strategies" className="mt-4">
            <StrategyAnalytics />
          </TabsContent>

          <TabsContent value="sessions" className="mt-4">
            <SessionAnalytics />
          </TabsContent>

          <TabsContent value="risk" className="mt-4">
            <RiskAnalytics />
          </TabsContent>

          <TabsContent value="psychology" className="mt-4">
            <PsychologyAnalytics />
          </TabsContent>

          <TabsContent value="calendar" className="mt-4">
            <CalendarHeatmap />
          </TabsContent>

          <TabsContent value="insights" className="mt-4">
            <AiInsights />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
