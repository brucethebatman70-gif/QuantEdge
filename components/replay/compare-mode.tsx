"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockReplayTrades } from "@/lib/replay/mock-replay";
import { useReplayStore } from "@/lib/replay/store";

export function CompareMode() {
  const { playback, setSelectedTradeId, selectedTradeId } = useReplayStore();

  const primary = useMemo(() => mockReplayTrades.find((t) => t.id === selectedTradeId), [selectedTradeId]);
  const others = useMemo(() => mockReplayTrades.filter((t) => t.id !== selectedTradeId), [selectedTradeId]);

  if (!playback.compareMode || !primary) return null;

  return (
    <Card className="border-2 border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Compare Mode</CardTitle>
        <Button variant="ghost" size="xs" onClick={() => {}} className="text-[10px]">
          Compare with →
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.slice(0, 7).map((t) => {
            const pnlDiff = primary.pnl !== null && t.pnl !== null ? t.pnl - primary.pnl : 0;
            const wrDiff = t.rMultiple - primary.rMultiple;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTradeId(t.id)}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all",
                  "hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold">{t.symbol}</span>
                    <Badge variant={t.direction === "long" ? "success" : "warning"} className="text-[9px] px-1">{t.direction === "long" ? "L" : "S"}</Badge>
                  </div>
                  {pnlDiff !== 0 && (
                    <span className={cn("text-[10px] font-medium", pnlDiff > 0 ? "text-success" : "text-error")}>
                      {pnlDiff > 0 ? "+" : ""}{formatCurrency(pnlDiff)}
                    </span>
                  )}
                </div>
                <div className="mt-2 space-y-0.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">P&L</span>
                    <span className={cn("tabular-nums font-medium", t.pnl !== null && t.pnl >= 0 ? "text-success" : "text-error")}>
                      {t.pnl !== null ? formatCurrency(t.pnl) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">R:R</span>
                    <span className="tabular-nums font-medium">{t.rMultiple.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="tabular-nums">{t.duration}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Setup</span>
                    <span className="tabular-nums">{t.setup}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Strategy</span>
                    <span className="tabular-nums">{t.strategy}</span>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>Emotion: {t.emotion}</span>
                  {t.mistake && <Badge variant="destructive" className="text-[8px] px-1">{t.mistake}</Badge>}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
