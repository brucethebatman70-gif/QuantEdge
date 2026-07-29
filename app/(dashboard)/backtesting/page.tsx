"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BacktestingHeader } from "@/components/backtesting/backtesting-header";
import { StrategyLibrary } from "@/components/backtesting/strategy-library";
import { StrategyConfig } from "@/components/backtesting/strategy-config";
import { ResultsDashboard } from "@/components/backtesting/results-dashboard";
import { TradeLog } from "@/components/backtesting/trade-log";
import { OptimizationPanel } from "@/components/backtesting/optimization-panel";
import { AiAnalysis } from "@/components/backtesting/ai-analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBacktestingStore } from "@/lib/backtesting/store";

export default function BacktestingPage() {
  const { activeTab, setActiveTab, selectedStrategyId } = useBacktestingStore();

  return (
    <DashboardLayout title="Backtesting Center">
      <div className="flex h-full flex-col gap-4">
        <BacktestingHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-fit">
            <TabsTrigger value="library">Strategy Library</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="optimizer">Optimizer</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="flex-1 mt-4">
            <StrategyLibrary />
          </TabsContent>

          <TabsContent value="config" className="flex-1 mt-4">
            <StrategyConfig />
          </TabsContent>

          <TabsContent value="results" className="flex-1 mt-4 space-y-4">
            <ResultsDashboard />
            <TradeLog />
          </TabsContent>

          <TabsContent value="optimizer" className="flex-1 mt-4">
            <OptimizationPanel />
          </TabsContent>

          <TabsContent value="analysis" className="flex-1 mt-4">
            <AiAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
