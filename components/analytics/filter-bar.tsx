"use client";

import { useAnalyticsStore } from "@/lib/analytics/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { useState } from "react";

const markets = ["all", "stocks", "crypto", "indices", "forex", "commodities", "futures"] as const;
const strategies = ["all", "Breakout", "Pullback", "Momentum", "Reversal", "Earnings", "VWAP", "Scalp", "Swing"] as const;
const sessions = ["all", "asian", "london", "newyork", "overlap"] as const;
const directions = ["all", "long", "short"] as const;

export function FilterBar() {
  const { filters, setFilters, resetFilters, savedViews, loadView, deleteView } = useAnalyticsStore();
  const [searchOpen, setSearchOpen] = useState(false);

  const activeCount = [
    filters.market !== null,
    filters.strategy !== null,
    filters.session !== null,
    filters.direction !== null,
    filters.pair !== null,
    filters.search !== "",
    filters.tags.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={filters.market || "all"}
        onValueChange={(v) => setFilters({ market: v === "all" ? null : v as any })}
      >
        <SelectTrigger className="h-8 w-[110px] text-xs">
          <SelectValue placeholder="Market" />
        </SelectTrigger>
        <SelectContent>
          {markets.map((m) => (
            <SelectItem key={m} value={m} className="text-xs capitalize">{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.strategy || "all"}
        onValueChange={(v) => setFilters({ strategy: v === "all" ? null : v as any })}
      >
        <SelectTrigger className="h-8 w-[120px] text-xs">
          <SelectValue placeholder="Strategy" />
        </SelectTrigger>
        <SelectContent>
          {strategies.map((s) => (
            <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.session || "all"}
        onValueChange={(v) => setFilters({ session: v === "all" ? null : v as any })}
      >
        <SelectTrigger className="h-8 w-[120px] text-xs">
          <SelectValue placeholder="Session" />
        </SelectTrigger>
        <SelectContent>
          {sessions.map((s) => (
            <SelectItem key={s} value={s} className="text-xs capitalize">{s === "all" ? "All Sessions" : s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.direction || "all"}
        onValueChange={(v) => setFilters({ direction: v === "all" ? null : v as any })}
      >
        <SelectTrigger className="h-8 w-[100px] text-xs">
          <SelectValue placeholder="Direction" />
        </SelectTrigger>
        <SelectContent>
          {directions.map((d) => (
            <SelectItem key={d} value={d} className="text-xs capitalize">{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative">
        <Icons.Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search trades..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="h-8 w-[160px] pl-8 text-xs"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Icons.Filter className="mr-1.5 h-3.5 w-3.5" />
            Filters
            {activeCount > 0 && (
              <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">{activeCount}</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4" align="end">
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Pair / Symbol</p>
              <Input
                placeholder="e.g. AAPL, BTC/USD..."
                value={filters.pair || ""}
                onChange={(e) => setFilters({ pair: e.target.value || null })}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-1">
                {["Breakout", "Earnings", "Momentum", "Swing", "Scalp"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      const tags = filters.tags.includes(tag)
                        ? filters.tags.filter((t) => t !== tag)
                        : [...filters.tags, tag];
                      setFilters({ tags });
                    }}
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors",
                      filters.tags.includes(tag)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {savedViews.length > 0 && (
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Icons.Star className="mr-1.5 h-3.5 w-3.5" />
              Saved Views
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            {savedViews.map((view) => (
              <div key={view.name} className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted">
                <button
                  className="flex-1 text-left text-xs"
                  onClick={() => { loadView(view.name); setSearchOpen(false); }}
                >
                  {view.name}
                </button>
                <button
                  className="text-muted-foreground hover:text-error"
                  onClick={() => deleteView(view.name)}
                >
                  <Icons.X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      )}

      {activeCount > 0 && (
        <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={resetFilters}>
          Clear all
        </Button>
      )}
    </div>
  );
}
