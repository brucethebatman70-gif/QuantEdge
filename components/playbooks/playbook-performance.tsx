"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/lib/icons";
import { usePlaybookStore } from "@/lib/playbooks/store";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function PlaybookPerformance() {
  const { selectedId, playbooks } = usePlaybookStore();
  const playbook = selectedId ? playbooks.find((p) => p.id === selectedId) : null;

  if (!playbook) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
        <Icons.BarChart3 className="h-8 w-8 mb-2 opacity-20" />
        <p className="text-xs text-center">Select a playbook to view performance</p>
      </div>
    );
  }

  const metrics = [
    { label: "Win Rate", value: `${playbook.winRate}%`, badge: playbook.winRate >= 65 ? "success" : playbook.winRate >= 50 ? "warning" : "destructive" as const },
    { label: "Avg R:R", value: `${playbook.avgRR}:1` },
    { label: "Expectancy", value: playbook.expectancy.toFixed(2), color: playbook.expectancy >= 1 ? "text-success" : "text-error" },
    { label: "Net Profit", value: formatCurrency(playbook.netProfit), color: playbook.netProfit >= 0 ? "text-success" : "text-error" },
    { label: "Max Drawdown", value: `${playbook.maxDrawdown}%`, color: playbook.maxDrawdown <= 10 ? "text-success" : playbook.maxDrawdown <= 20 ? "text-warning" : "text-error" },
    { label: "Total Trades", value: formatNumber(playbook.totalTrades) },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Icons.BarChart3 className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">Performance</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg bg-muted/50 p-2.5 space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</span>
            <span className={`text-sm font-semibold ${m.color || "text-foreground"}`}>
              {m.value}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Consistency Score</span>
          <span className="font-medium text-foreground">{playbook.consistencyScore}%</span>
        </div>
        <Progress value={playbook.consistencyScore} className="h-2" />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Expected R:R</span>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${Math.min(playbook.expectedRR * 20, 100)}%` }}
            />
          </div>
          <span className="text-xs font-medium text-foreground">{playbook.expectedRR}:1</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {playbook.market.map((m) => (
          <Badge key={m} variant="outline" className="text-[10px]">{m}</Badge>
        ))}
        {playbook.timeframes.map((tf) => (
          <Badge key={tf} variant="secondary" className="text-[10px]">{tf}</Badge>
        ))}
      </div>
    </div>
  );
}
