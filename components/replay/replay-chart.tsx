"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockReplayTrades } from "@/lib/replay/mock-replay";
import { useReplayStore } from "@/lib/replay/store";
import { Icons } from "@/lib/icons";
import type { Candle, ReplayEvent } from "@/lib/replay/types";

function CandleChart({ candles, events, direction, entryPrice, stopLoss, takeProfit, currentIndex }: {
  candles: Candle[]; events: ReplayEvent[]; direction: string; entryPrice: number; stopLoss: number; takeProfit: number; currentIndex: number;
}) {
  const visible = candles.slice(0, Math.max(currentIndex + 1, 10));
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const { priceMin, priceMax, priceRange, volMax } = useMemo(() => {
    const prices = visible.flatMap((c) => [c.high, c.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const pad = (max - min) * 0.1 || 1;
    return { priceMin: min - pad, priceMax: max + pad, priceRange: max - min + 2 * pad, volMax: Math.max(...visible.map((c) => c.volume)) };
  }, [visible]);

  const chartH = 340;
  const volH = 50;
  const totalH = chartH + volH;
  const candleW = 8;
  const gap = 2;
  const totalW = visible.length * (candleW + gap);

  const scalePrice = (price: number) => chartH - ((price - priceMin) / priceRange) * chartH;
  const scaleVol = (vol: number) => (vol / volMax) * volH;

  const lastPrice = visible.length > 0 ? visible[visible.length - 1].close : entryPrice;

  const getCandleColor = (c: Candle) => c.close >= c.open ? "var(--color-success, #10b981)" : "var(--color-error, #ef4444)";

  return (
    <div className="relative">
      <svg ref={svgRef} width={Math.max(totalW, 600)} height={totalH + 30} className="overflow-visible" onMouseLeave={() => setHoveredCandle(null)}>
        <defs>
          <linearGradient id="entryGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="exitGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {visible.map((c, i) => {
          const x = i * (candleW + gap);
          const isUp = c.close >= c.open;
          const top = isUp ? c.close : c.open;
          const bottom = isUp ? c.open : c.close;
          const bodyY = scalePrice(top);
          const bodyH = Math.max(scalePrice(bottom) - scalePrice(top), 1);
          const wickTop = scalePrice(c.high);
          const wickBottom = scalePrice(c.low);
          const color = getCandleColor(c);
          const isHovered = hoveredCandle === c;

          return (
            <g key={i}>
              <rect x={x + candleW / 2 - 0.5} y={wickTop} width={1} height={wickBottom - wickTop} fill={color} />
              <rect
                x={x + 0.5} y={bodyY} width={candleW - 1} height={bodyH}
                fill={color} rx={0.5}
                className="cursor-crosshair"
                onMouseEnter={(e) => { setHoveredCandle(c); setHoverPos({ x: e.clientX, y: e.clientY }); }}
              />
              {isHovered && (
                <rect x={x} y={0} width={candleW + gap} height={chartH} fill="hsl(var(--primary))" opacity={0.05} />
              )}
            </g>
          );
        })}

        {events.filter((e) => visible.findIndex((c) => c.time === e.time) >= 0 && e.type !== "ai_comment").map((ev) => {
          const idx = visible.findIndex((c) => c.time === ev.time);
          if (idx < 0) return null;
          const x = idx * (candleW + gap) + candleW / 2;
          const y = scalePrice(ev.price);
          const isEntry = ev.type === "entry" || ev.type === "add";
          const isExit = ev.type === "exit" || ev.type === "partial_exit";

          return (
            <g key={ev.id}>
              {isEntry && (
                <>
                  <rect x={0} y={y} width={totalW} height={1} fill="#10b981" opacity={0.3} />
                  <rect x={0} y={Math.min(y, scalePrice(takeProfit))} width={totalW} height={Math.abs(scalePrice(takeProfit) - y)} fill="url(#entryGradient)" />
                </>
              )}
              {isExit && (
                <>
                  <rect x={0} y={y} width={totalW} height={1} fill="#ef4444" opacity={0.3} />
                  <rect x={0} y={Math.min(y, scalePrice(stopLoss))} width={totalW} height={Math.abs(scalePrice(stopLoss) - y)} fill="url(#exitGradient)" />
                </>
              )}
              <circle cx={x} cy={y} r={4} fill={isEntry ? "#10b981" : isExit ? "#ef4444" : "#f59e0b"} stroke="hsl(var(--card))" strokeWidth={2} />
              <text x={x} y={y - 8} textAnchor="middle" fill={isEntry ? "#10b981" : isExit ? "#ef4444" : "#f59e0b"} fontSize="8" fontWeight="600">
                {isEntry ? "ENTRY" : isExit ? "EXIT" : ev.type === "stop_loss" ? "SL" : ev.type === "take_profit" ? "TP" : "MOD"}
              </text>
            </g>
          );
        })}

        {stopLoss && (
          <g>
            <rect x={0} y={scalePrice(stopLoss)} width={totalW} height={1} fill="#ef4444" strokeDasharray="4 2" opacity={0.6} />
            <text x={totalW - 4} y={scalePrice(stopLoss) - 2} textAnchor="end" fill="#ef4444" fontSize="8">SL {formatCurrency(stopLoss)}</text>
          </g>
        )}
        {takeProfit && (
          <g>
            <rect x={0} y={scalePrice(takeProfit)} width={totalW} height={1} fill="#10b981" strokeDasharray="4 2" opacity={0.6} />
            <text x={totalW - 4} y={scalePrice(takeProfit) - 2} textAnchor="end" fill="#10b981" fontSize="8">TP {formatCurrency(takeProfit)}</text>
          </g>
        )}
        {entryPrice && (
          <g>
            <rect x={0} y={scalePrice(entryPrice)} width={totalW} height={1} fill="#6366f1" strokeDasharray="2 2" opacity={0.4} />
          </g>
        )}

        {visible.map((c, i) => {
          if (i % Math.max(1, Math.floor(visible.length / 6)) !== 0) return null;
          const x = i * (candleW + gap) + candleW / 2;
          const d = new Date(c.time);
          return <text key={i} x={x} y={totalH + volH + 14} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">{d.getHours()}:{String(d.getMinutes()).padStart(2, "0")}</text>;
        })}

        {Array.from({ length: 5 }).map((_, i) => {
          const price = priceMin + (priceRange * i) / 4;
          const y = scalePrice(price);
          return (
            <g key={i}>
              <rect x={0} y={y} width={totalW} height={1} fill="hsl(var(--border))" opacity={0.3} />
              <text x={totalW - 4} y={y - 2} textAnchor="end" fill="hsl(var(--muted-foreground))" fontSize="8">{formatCurrency(price)}</text>
            </g>
          );
        })}

        {visible.map((c, i) => {
          if (i > currentIndex) return null;
          const x = i * (candleW + gap);
          return <rect key={`vol-${i}`} x={x + 1} y={chartH + (volH - scaleVol(c.volume))} width={candleW - 2} height={scaleVol(c.volume)} fill={getCandleColor(c)} opacity={0.3} rx={0.5} />;
        })}

        {currentIndex < visible.length - 1 && (
          <rect x={(currentIndex + 1) * (candleW + gap)} y={0} width={totalW} height={chartH + volH} fill="hsl(var(--background))" opacity={0.6} />
        )}
      </svg>

      {hoveredCandle && (
        <div className="pointer-events-none absolute z-50 rounded-lg border bg-popover px-2.5 py-1.5 text-xs shadow-lg" style={{ left: "50%", top: -60, transform: "translateX(-50%)" }}>
          <p className="font-medium">O: {hoveredCandle.open.toFixed(2)} H: {hoveredCandle.high.toFixed(2)}</p>
          <p className="text-muted-foreground">L: {hoveredCandle.low.toFixed(2)} C: {hoveredCandle.close.toFixed(2)}</p>
          <p className="text-muted-foreground">Vol: {(hoveredCandle.volume / 1000).toFixed(0)}K</p>
        </div>
      )}

      <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Current: <span className={cn("font-medium", lastPrice >= entryPrice ? "text-success" : "text-error")}>{formatCurrency(lastPrice)}</span></span>
        <span>Candles: {visible.length} / {candles.length}</span>
        <span>Range: {formatCurrency(priceMin)} – {formatCurrency(priceMax)}</span>
      </div>
    </div>
  );
}

export function ReplayChart() {
  const { selectedTradeId, playback, goToFrame } = useReplayStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const trade = useMemo(() => mockReplayTrades.find((t) => t.id === selectedTradeId), [selectedTradeId]);

  useEffect(() => {
    if (!trade) return;
    if (playback.isPlaying && playback.currentIndex < trade.candles.length - 1) {
      const interval = 1000 / playback.speed;
      timerRef.current = setInterval(() => {
        goToFrame(playback.currentIndex + 1);
      }, interval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playback.isPlaying, playback.speed, trade?.id]);

  useEffect(() => {
    if (trade && playback.currentIndex >= trade.candles.length - 1) {
      goToFrame(0);
    }
  }, [playback.currentIndex, trade?.id]);

  if (!trade) {
    return (
      <Card className="flex-1">
        <CardContent className="flex h-[500px] items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <Icons.BarChart3 className="h-16 w-16 text-muted-foreground/30" />
            <div>
              <h3 className="text-sm font-medium">No trade selected</h3>
              <p className="mt-1 text-xs text-muted-foreground">Select a trade above to begin replay</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("flex-1", playback.isFullscreen && "fixed inset-0 z-50 m-0 rounded-none")}>
      <CardContent className={cn("p-4", playback.isFullscreen && "flex h-screen items-center justify-center")}>
        <div className="overflow-x-auto">
          <CandleChart
            candles={trade.candles}
            events={trade.events}
            direction={trade.direction}
            entryPrice={trade.entryPrice}
            stopLoss={trade.stopLoss}
            takeProfit={trade.takeProfit}
            currentIndex={playback.currentIndex}
          />
        </div>
        <div className="mt-3">
          <input
            type="range"
            min={0}
            max={trade.candles.length - 1}
            value={playback.currentIndex}
            onChange={(e) => goToFrame(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>{new Date(trade.candles[0]?.time).toLocaleTimeString()}</span>
            <span>{new Date(trade.candles[trade.candles.length - 1]?.time).toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <Button variant="ghost" size="xs" onClick={() => goToFrame(0)} className="text-[10px]">Start</Button>
          <Button variant="ghost" size="icon-xs" onClick={() => goToFrame(Math.max(0, playback.currentIndex - 1))}>
            <Icons.ChevronLeft className="h-3 w-3" />
          </Button>
          <span className="text-xs tabular-nums">{playback.currentIndex + 1} / {trade.candles.length}</span>
          <Button variant="ghost" size="icon-xs" onClick={() => goToFrame(Math.min(trade.candles.length - 1, playback.currentIndex + 1))}>
            <Icons.ChevronRight className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="xs" onClick={() => goToFrame(trade.candles.length - 1)} className="text-[10px]">End</Button>
        </div>
      </CardContent>
    </Card>
  );
}
