"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { formatCurrency } from "@/lib/utils";
import { mockStrategies, mockBacktestResults } from "@/lib/backtesting/mock-backtesting";
import { useBacktestingStore } from "@/lib/backtesting/store";

export function StrategyLibrary() {
  const { selectedStrategyId, setSelectedStrategyId, setActiveTab, setSelectedResultId } = useBacktestingStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "favorites" | "templates">("all");

  const filtered = useMemo(() => {
    return mockStrategies.filter((s) => {
      if (filter === "favorites" && !s.isFavorite) return false;
      if (filter === "templates" && !s.isTemplate) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
  }, [search, filter]);

  const getResult = (strategyId: string) => mockBacktestResults.find((r) => r.strategyId === strategyId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Icons.Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search strategies..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-xs" />
        </div>
        {(["all", "favorites", "templates"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("rounded-md px-2.5 py-1 text-xs font-medium transition-colors", filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}
          >{f === "all" ? "All" : f === "favorites" ? "★ Favorites" : "📋 Templates"}</button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((strategy, i) => {
          const result = getResult(strategy.id);
          return (
            <motion.div key={strategy.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className={cn("cursor-pointer transition-all hover:shadow-md", selectedStrategyId === strategy.id && "ring-2 ring-primary")}
                onClick={() => setSelectedStrategyId(strategy.id === selectedStrategyId ? null : strategy.id)}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm truncate">{strategy.name}</CardTitle>
                      <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">{strategy.description}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      {strategy.isFavorite && <Icons.Star className="h-3 w-3 text-warning fill-warning" />}
                      {strategy.isTemplate && <Badge variant="secondary" className="text-[8px] px-1">Template</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {strategy.tags.map((t) => <Badge key={t} variant="outline" className="text-[8px] px-1.5">{t}</Badge>)}
                  </div>
                  {result ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                      <div className="flex justify-between"><span className="text-muted-foreground">Win Rate</span><span className="font-medium text-success">{result.winRate}%</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">P&L</span><span className={cn("font-medium", result.netProfit >= 0 ? "text-success" : "text-error")}>{formatCurrency(result.netProfit)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Trades</span><span className="font-medium">{result.totalTrades}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Sharpe</span><span className="font-medium">{result.sharpeRatio}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Max DD</span><span className="font-medium text-error">{result.maxDrawdown}%</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">PF</span><span className="font-medium">{result.profitFactor}</span></div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-muted-foreground text-center py-2">No backtest results yet</p>
                  )}
                  <div className="mt-2 flex gap-1.5">
                    <Button variant="default" size="xs" className="flex-1 text-[10px]" onClick={(e) => { e.stopPropagation(); setActiveTab("config"); }}>
                      <Icons.Zap className="mr-1 h-3 w-3" /> Run
                    </Button>
                    <Button variant="ghost" size="icon-xs" onClick={(e) => e.stopPropagation()}><Icons.Trash2 className="h-3 w-3" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
