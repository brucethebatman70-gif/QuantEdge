"use client";

import { useCardData } from "./card-data";
import { IntelligenceCard } from "./intelligence-card";
import { CardHeader } from "./card-header";
import { AiInsightLine } from "./ai-insight-line";
import { DonutChart } from "@/components/charts/donut-chart";

export function PortfolioCard() {
  const { markets } = useCardData();
  const totalPnl = markets.reduce((s, m) => s + Math.abs(m.pnl), 0);

  const donutData = markets.map((m) => ({
    label: m.market,
    value: Math.abs(m.pnl),
    color: m.pnl >= 0
      ? (m.market === "stocks" ? "#00D4AA" : m.market === "crypto" ? "#f59e0b" : m.market === "indices" ? "#10b981" : m.market === "forex" ? "#06E0FF" : m.market === "commodities" ? "#ec4899" : "#8b5cf6")
      : "#ef4444",
  }));

  return (
    <IntelligenceCard glow="success">
      <CardHeader title="Portfolio Allocation" status="excellent" />
      <div className="px-4 pb-2">
        <div className="flex items-baseline gap-3">
          <div className="w-20 h-20">
            <DonutChart
              data={donutData}
              height={80}
              innerRadius={28}
              outerRadius={38}
              animated
            />
          </div>
          <div className="flex-1 space-y-0.5">
            {markets.slice(0, 4).map((m) => (
              <div key={m.market} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: m.pnl >= 0
                        ? (m.market === "stocks" ? "#00D4AA" : m.market === "crypto" ? "#f59e0b" : m.market === "indices" ? "#10b981" : m.market === "forex" ? "#06E0FF" : m.market === "commodities" ? "#ec4899" : "#8b5cf6")
                        : "#ef4444",
                    }}
                  />
                  <span className="text-muted-foreground/40 capitalize">{m.market}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums">{m.trades}</span>
                  <span className={m.pnl >= 0 ? "tabular-nums font-medium text-success" : "tabular-nums font-medium text-error"}>
                    ${(m.pnl / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AiInsightLine type="positive">
        Portfolio diversified across {markets.length} sectors. Indices lead at ${markets.find((m) => m.market === "indices")?.pnl.toLocaleString()} P&L.
      </AiInsightLine>
    </IntelligenceCard>
  );
}
