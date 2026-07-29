"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useBacktestingStore } from "@/lib/backtesting/store";

export function BacktestingHeader() {
  const { setActiveTab } = useBacktestingStore();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Backtesting Center</h1>
        <p className="mt-1 text-sm text-muted-foreground">Test, validate and optimize your trading strategies.</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setActiveTab("strategies")}>
          <Icons.Plus className="mr-2 h-4 w-4" />
          New Backtest
        </Button>
        <Button variant="outline" size="sm">
          <Icons.Save className="mr-2 h-4 w-4" />
          Save Config
        </Button>
        <Button size="sm">
          <Icons.Zap className="mr-2 h-4 w-4" />
          Run Test
        </Button>
        <Button variant="outline" size="sm" onClick={() => setActiveTab("optimizer")}>
          <Icons.ArrowRight className="mr-2 h-4 w-4" />
          Compare
        </Button>
        <Button variant="outline" size="sm">
          <Icons.Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
