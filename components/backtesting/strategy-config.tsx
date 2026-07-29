"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { mockStrategies, getDefaultConfig } from "@/lib/backtesting/mock-backtesting";
import { useBacktestingStore } from "@/lib/backtesting/store";
import { useMemo } from "react";

const timeframes = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"] as const;
const markets = ["Stocks", "Crypto", "Forex", "Indices", "Commodities", "Futures"];
const brokers = ["Interactive Brokers", "TD Ameritrade", "OANDA", "AMP Futures", "Binance"];
const executions = ["instant", "slippage", "partial"] as const;

export function StrategyConfig() {
  const { selectedStrategyId } = useBacktestingStore();
  const strategy = useMemo(() => mockStrategies.find((s) => s.id === selectedStrategyId), [selectedStrategyId]);
  const config = strategy?.config || getDefaultConfig();

  if (!selectedStrategyId) {
    return (
      <Card>
        <CardContent className="flex h-[300px] items-center justify-center">
          <p className="text-xs text-muted-foreground">Select a strategy to configure</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle className="text-sm font-semibold">Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Market</p><Select defaultValue={config.market}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent>{markets.map((m) => <SelectItem key={m} value={m} className="text-xs">{m}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Broker</p><Select defaultValue={config.broker}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent>{brokers.map((b) => <SelectItem key={b} value={b} className="text-xs">{b}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Timeframe</p><Select defaultValue={config.timeframe}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent>{timeframes.map((t) => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Execution Model</p><Select defaultValue={config.executionModel}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent>{executions.map((e) => <SelectItem key={e} value={e} className="text-xs capitalize">{e}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Initial Balance</p><Input defaultValue={config.initialBalance} className="h-8 text-xs" /></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Risk Per Trade %</p><Input defaultValue={config.riskPerTrade} className="h-8 text-xs" /></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Commission $</p><Input defaultValue={config.commission} className="h-8 text-xs" /></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Spread</p><Input defaultValue={config.spread} className="h-8 text-xs" /></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Slippage</p><Input defaultValue={config.slippage} className="h-8 text-xs" /></div>
            <div className="space-y-1"><p className="text-[10px] font-medium text-muted-foreground">Leverage</p><Input defaultValue={config.leverage} className="h-8 text-xs" /></div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">Entry Rules</CardTitle>
            <Button variant="ghost" size="xs" className="text-[10px]"><Icons.Plus className="mr-1 h-3 w-3" /> Add Rule</Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {(strategy?.entryRules || []).map((rule) => (
              <div key={rule.id} className="flex items-start gap-2 rounded-lg border border-border/50 p-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-primary/10"><span className="text-[8px] text-primary">●</span></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium capitalize">{rule.type.replace("_", " ")}</span>
                    <Badge variant={rule.enabled ? "success" : "secondary"} className="text-[8px] px-1">{rule.enabled ? "On" : "Off"}</Badge>
                  </div>
                  {rule.conditions.map((c, i) => <p key={i} className="text-[10px] text-muted-foreground">• {c}</p>)}
                </div>
              </div>
            ))}
            {(!strategy?.entryRules || strategy.entryRules.length === 0) && <p className="text-[10px] text-muted-foreground text-center py-4">No entry rules configured</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">Exit Rules</CardTitle>
            <Button variant="ghost" size="xs" className="text-[10px]"><Icons.Plus className="mr-1 h-3 w-3" /> Add Rule</Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {(strategy?.exitRules || []).map((rule) => (
              <div key={rule.id} className="flex items-start gap-2 rounded-lg border border-border/50 p-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-error/10"><span className="text-[8px] text-error">■</span></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium capitalize">{rule.type.replace(/_/g, " ")}</span>
                    <span className="text-[10px] text-muted-foreground">{rule.value}{rule.type === "time_exit" ? "h" : "%"}</span>
                    <Badge variant={rule.enabled ? "success" : "secondary"} className="text-[8px] px-1">{rule.enabled ? "On" : "Off"}</Badge>
                  </div>
                </div>
              </div>
            ))}
            {(!strategy?.exitRules || strategy.exitRules.length === 0) && <p className="text-[10px] text-muted-foreground text-center py-4">No exit rules configured</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
