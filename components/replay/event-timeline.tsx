"use client";

import { useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockReplayTrades } from "@/lib/replay/mock-replay";
import { useReplayStore } from "@/lib/replay/store";

const eventColors: Record<string, string> = {
  entry: "bg-success border-success/30",
  exit: "bg-error border-error/30",
  partial_exit: "bg-warning border-warning/30",
  stop_loss: "bg-error/20 border-error/20",
  take_profit: "bg-success/20 border-success/20",
  sl_modify: "bg-info/20 border-info/20",
  tp_modify: "bg-info/20 border-info/20",
  add: "bg-success border-success/30",
  journal: "bg-primary/20 border-primary/20",
  screenshot: "bg-primary/20 border-primary/20",
  ai_comment: "bg-accent/20 border-accent/20",
};

const eventIcons: Record<string, string> = {
  entry: "●", exit: "●", partial_exit: "◐", stop_loss: "▲", take_profit: "▼",
  sl_modify: "△", tp_modify: "▽", add: "+", journal: "📝", screenshot: "📷", ai_comment: "🤖",
};

export function EventTimeline() {
  const { selectedTradeId, playback, goToFrame } = useReplayStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const trade = useMemo(() => mockReplayTrades.find((t) => t.id === selectedTradeId), [selectedTradeId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [trade?.id]);

  if (!trade) return null;

  const currentTime = trade.candles[playback.currentIndex]?.time;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Event Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-2">
          {trade.events.map((ev, i) => {
            const isPast = currentTime && ev.time <= currentTime;
            const evIdx = trade.candles.findIndex((c) => c.time === ev.time);
            return (
              <button
                key={ev.id}
                onClick={() => evIdx >= 0 && goToFrame(evIdx)}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-1 rounded-lg border p-2.5 text-left transition-all duration-200",
                  isPast ? eventColors[ev.type] || "bg-muted border-border" : "border-border/30 opacity-40",
                  "hover:shadow-sm hover:border-foreground/20 min-w-[100px]"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">{eventIcons[ev.type] || "•"}</span>
                  <span className="text-[10px] font-medium">{ev.label}</span>
                </div>
                <span className={cn("text-[10px] tabular-nums", ev.type === "entry" || ev.type === "add" ? "text-success" : ev.type === "exit" || ev.type === "stop_loss" ? "text-error" : "text-muted-foreground")}>
                  {formatCurrency(ev.price)}
                </span>
                {ev.description && (
                  <span className="text-[9px] text-muted-foreground leading-tight line-clamp-2">{ev.description}</span>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
