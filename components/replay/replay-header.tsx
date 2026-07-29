"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/utils";
import { mockReplayTrades } from "@/lib/replay/mock-replay";
import { useReplayStore } from "@/lib/replay/store";

export function ReplayHeader() {
  const { selectedTradeId, setSelectedTradeId, playback, togglePlay, setSpeed, goToEntry, goToExit, toggleFullscreen, toggleCompareMode, searchQuery, setSearchQuery, filterDirection, setFilterDirection, filterResult, setFilterResult } = useReplayStore();
  const [selectorOpen, setSelectorOpen] = useState(false);

  const filtered = useMemo(() => {
    return mockReplayTrades.filter((t) => {
      if (searchQuery && !t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) && !t.setup.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterDirection && filterDirection !== "all" && t.direction !== filterDirection) return false;
      if (filterResult === "win" && (t.pnl === null || t.pnl <= 0)) return false;
      if (filterResult === "loss" && (t.pnl === null || t.pnl >= 0)) return false;
      return true;
    });
  }, [searchQuery, filterDirection, filterResult]);

  const selectedTrade = useMemo(() => mockReplayTrades.find((t) => t.id === selectedTradeId), [selectedTradeId]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Replay Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">Replay your trades tick by tick with full context.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleCompareMode}>
            <Icons.ArrowRight className="mr-2 h-4 w-4" />
            Compare
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Download className="mr-2 h-4 w-4" />
            Export Review
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Icons.Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search trades by symbol or setup..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>

        <Select value={filterDirection || "all"} onValueChange={(v) => setFilterDirection(v === "all" ? null : v)}>
          <SelectTrigger className="h-8 w-[100px] text-xs"><SelectValue placeholder="Direction" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All</SelectItem>
            <SelectItem value="long" className="text-xs">Long</SelectItem>
            <SelectItem value="short" className="text-xs">Short</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterResult || "all"} onValueChange={(v) => setFilterResult(v === "all" ? null : v)}>
          <SelectTrigger className="h-8 w-[100px] text-xs"><SelectValue placeholder="Result" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All</SelectItem>
            <SelectItem value="win" className="text-xs">Wins</SelectItem>
            <SelectItem value="loss" className="text-xs">Losses</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-1.5">
          {filtered.slice(0, 8).map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTradeId(t.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-all",
                selectedTradeId === t.id
                  ? "border-primary/50 bg-primary/10 shadow-sm"
                  : "border-border hover:bg-muted/50"
              )}
            >
              <span className="font-medium">{t.symbol}</span>
              <span className={cn("tabular-nums", t.pnl !== null && t.pnl >= 0 ? "text-success" : t.pnl !== null ? "text-error" : "text-muted-foreground")}>
                {t.pnl !== null ? formatCurrency(t.pnl) : "Open"}
              </span>
              <Badge variant={t.direction === "long" ? "success" : "warning"} className="text-[9px] px-1 py-0">
                {t.direction === "long" ? "L" : "S"}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {selectedTrade && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/50 bg-muted/30 p-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold">{selectedTrade.symbol}</span>
              <Badge variant={selectedTrade.direction === "long" ? "success" : "warning"} className="text-[10px]">
                {selectedTrade.direction.toUpperCase()}
              </Badge>
              <Badge variant={selectedTrade.pnl !== null && selectedTrade.pnl >= 0 ? "success" : "destructive"} className="text-[10px]">
                {selectedTrade.pnl !== null ? formatCurrency(selectedTrade.pnl) : "Open"}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs text-muted-foreground">{selectedTrade.setup}</span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs text-muted-foreground">{selectedTrade.duration}</span>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon-xs" onClick={goToEntry}><Icons.ChevronLeft className="h-3.5 w-3.5" /></Button>
            <Button variant={playback.isPlaying ? "default" : "outline"} size="icon-sm" onClick={togglePlay}>
              {playback.isPlaying ? <Icons.Pause className="h-4 w-4" /> : <Icons.Play className="h-4 w-4 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon-xs" onClick={goToExit}><Icons.ChevronRight className="h-3.5 w-3.5" /></Button>

            <div className="ml-2 flex gap-1">
              {([1, 2, 5, 10] as const).map((s) => (
                <Button key={s} variant={playback.speed === s ? "secondary" : "ghost"} size="xs" onClick={() => setSpeed(s)} className="text-[10px] w-7 h-7 p-0">{s}x</Button>
              ))}
            </div>

            <div className="ml-2 flex gap-1">
              <Button variant="ghost" size="icon-xs" onClick={goToEntry} title="Jump to Entry">
                <Icons.TrendingUp className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon-xs" onClick={goToExit} title="Jump to Exit">
                <Icons.TrendingDown className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon-xs" onClick={toggleFullscreen} title="Fullscreen">
                {playback.isFullscreen ? <Icons.Minimize2 className="h-3.5 w-3.5" /> : <Icons.Maximize2 className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
