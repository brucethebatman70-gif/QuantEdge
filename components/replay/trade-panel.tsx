"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/cn";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { mockReplayTrades } from "@/lib/replay/mock-replay";
import { useReplayStore } from "@/lib/replay/store";
import { AiReview } from "./ai-review";

export function TradePanel() {
  const { selectedTradeId } = useReplayStore();
  const [tab, setTab] = useState<"details" | "ai" | "notes">("details");

  const trade = useMemo(() => mockReplayTrades.find((t) => t.id === selectedTradeId), [selectedTradeId]);

  if (!trade) {
    return (
      <Card className="w-72 shrink-0">
        <CardContent className="flex h-[400px] items-center justify-center">
          <p className="text-xs text-muted-foreground">Select a trade</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-72 shrink-0">
      <div className="flex border-b border-border">
        {(["details", "ai", "notes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 px-3 py-2 text-[11px] font-medium transition-colors",
              tab === t ? "border-b-2 border-primary text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "details" ? "Details" : t === "ai" ? "AI Review" : "Notes"}
          </button>
        ))}
      </div>

      <ScrollArea className="h-[calc(100vh-400px)]">
        <CardContent className="p-4">
          {tab === "details" && (
            <div className="space-y-3">
              <Section label="Trade">
                <Row label="Symbol" value={trade.symbol} />
                <Row label="Direction" value={trade.direction.toUpperCase()} color={trade.direction === "long" ? "text-success" : "text-warning"} />
                <Row label="Status" value={trade.status} />
                <Row label="Duration" value={trade.duration} />
              </Section>
              <Separator />
              <Section label="Execution">
                <Row label="Entry" value={formatCurrency(trade.entryPrice)} />
                <Row label="Exit" value={trade.exitPrice ? formatCurrency(trade.exitPrice) : "—"} />
                <Row label="Quantity" value={trade.quantity.toString()} />
                <Row label="Stop Loss" value={formatCurrency(trade.stopLoss)} color="text-error" />
                <Row label="Take Profit" value={formatCurrency(trade.takeProfit)} color="text-success" />
              </Section>
              <Separator />
              <Section label="Performance">
                <Row label="P&L" value={trade.pnl !== null ? formatCurrency(trade.pnl) : "—"} color={trade.pnl !== null && trade.pnl >= 0 ? "text-success" : "text-error"} bold />
                <Row label="R Multiple" value={trade.rMultiple.toFixed(1)} color={trade.rMultiple >= 0 ? "text-success" : "text-error"} />
                <Row label="Risk %" value={`${trade.riskPercent}%`} />
                <Row label="Fees" value={formatCurrency(trade.fees)} />
              </Section>
              <Separator />
              <Section label="Context">
                <Row label="Setup" value={trade.setup} />
                <Row label="Strategy" value={trade.strategy} />
                <Row label="Market" value={trade.market} />
                <Row label="Session" value={trade.session} />
                <Row label="Broker" value={trade.broker} />
              </Section>
              <Separator />
              <Section label="Psychology">
                <Row label="Emotion" value={trade.emotion} />
                {trade.mistake && <Row label="Mistake" value={trade.mistake} color="text-error" />}
                {trade.lesson && <Row label="Lesson" value={trade.lesson} color="text-success" />}
              </Section>
              <Separator />
              <Section label="Tags">
                <div className="flex flex-wrap gap-1">
                  {trade.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[9px] px-1.5">{tag}</Badge>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {tab === "ai" && <AiReview tradeId={trade.id} />}

          {tab === "notes" && (
            <div className="space-y-3">
              <Section label="Trade Notes">
                <p className="text-xs text-muted-foreground leading-relaxed">{trade.notes || "No notes recorded."}</p>
              </Section>
              <Separator />
              <Section label="Linked Journal Entry">
                <button className="w-full rounded-lg border border-border/50 p-2.5 text-left text-xs hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-primary">View in Journal →</p>
                  <p className="mt-0.5 text-muted-foreground">{trade.notes.slice(0, 60)}...</p>
                </button>
              </Section>
              <Separator />
              <Section label="Screenshots">
                {trade.screenshots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    {trade.screenshots.map((s) => (
                      <div key={s} className="aspect-video rounded-md bg-muted flex items-center justify-center">
                        <span className="text-[8px] text-muted-foreground">{s}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No screenshots</p>
                )}
              </Section>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function Row({ label, value, color, bold }: { label: string; value: string; color?: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className={cn("text-[11px] tabular-nums", bold && "font-semibold", color || "text-foreground")}>{value}</span>
    </div>
  );
}
