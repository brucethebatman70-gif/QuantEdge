"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockBacktestResults } from "@/lib/backtesting/mock-backtesting";
import { useBacktestingStore } from "@/lib/backtesting/store";

export function TradeLog() {
  const { selectedResultId } = useBacktestingStore();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("entryDate");
  const [sortAsc, setSortAsc] = useState(true);
  const [filterDir, setFilterDir] = useState<string | null>(null);

  const result = useMemo(() => mockBacktestResults.find((r) => r.id === selectedResultId), [selectedResultId]);

  const trades = useMemo(() => {
    if (!result) return [];
    let t = [...result.trades];
    if (search) t = t.filter((tr) => tr.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())));
    if (filterDir) t = t.filter((tr) => tr.direction === filterDir);
    t.sort((a, b) => {
      const aV = a[sortBy as keyof typeof a] ?? 0;
      const bV = b[sortBy as keyof typeof b] ?? 0;
      if (typeof aV === "string" && typeof bV === "string") return sortAsc ? aV.localeCompare(bV) : bV.localeCompare(aV);
      return sortAsc ? (aV as number) - (bV as number) : (bV as number) - (aV as number);
    });
    return t;
  }, [result, search, sortBy, sortAsc, filterDir]);

  if (!result) {
    return (
      <Card>
        <CardContent className="flex h-[200px] items-center justify-center">
          <p className="text-xs text-muted-foreground">Select a result to view trade log</p>
        </CardContent>
      </Card>
    );
  }

  const headers = [
    { key: "entryDate", label: "Entry" },
    { key: "exitDate", label: "Exit" },
    { key: "direction", label: "Dir" },
    { key: "entryPrice", label: "Entry $", right: true },
    { key: "exitPrice", label: "Exit $", right: true },
    { key: "quantity", label: "Qty", right: true },
    { key: "pnl", label: "P&L", right: true },
    { key: "exitReason", label: "Reason", right: true },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Trade Log — {result.strategyName} ({result.totalTrades} trades)</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Icons.Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-7 w-32 pl-7 text-[10px]" />
            </div>
            <div className="flex gap-1">
              <Button variant={filterDir === null ? "secondary" : "ghost"} size="xs" className="text-[9px] h-6 px-1.5" onClick={() => setFilterDir(null)}>All</Button>
              <Button variant={filterDir === "long" ? "secondary" : "ghost"} size="xs" className="text-[9px] h-6 px-1.5" onClick={() => setFilterDir("long")}>Long</Button>
              <Button variant={filterDir === "short" ? "secondary" : "ghost"} size="xs" className="text-[9px] h-6 px-1.5" onClick={() => setFilterDir("short")}>Short</Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {headers.map((h) => (
                  <th key={h.key} className={cn("px-2 py-1.5 font-medium text-muted-foreground cursor-pointer hover:text-foreground", h.right ? "text-right" : "text-left")}
                    onClick={() => { if (sortBy === h.key) setSortAsc(!sortAsc); else { setSortBy(h.key); setSortAsc(true); } }}>
                    {h.label} {sortBy === h.key ? (sortAsc ? "↑" : "↓") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades.slice(0, 50).map((t) => (
                <tr key={t.id} className="border-b border-border/30 transition-colors hover:bg-muted/50">
                  <td className="px-2 py-1.5 text-[10px]">{formatDate(t.entryDate)}</td>
                  <td className="px-2 py-1.5 text-[10px]">{formatDate(t.exitDate)}</td>
                  <td className="px-2 py-1.5"><Badge variant={t.direction === "long" ? "success" : "warning"} className="text-[8px] px-1">{t.direction === "long" ? "L" : "S"}</Badge></td>
                  <td className="px-2 py-1.5 text-right tabular-nums">{t.entryPrice.toFixed(2)}</td>
                  <td className="px-2 py-1.5 text-right tabular-nums">{t.exitPrice.toFixed(2)}</td>
                  <td className="px-2 py-1.5 text-right tabular-nums">{t.quantity}</td>
                  <td className={cn("px-2 py-1.5 text-right tabular-nums font-medium", t.pnl >= 0 ? "text-success" : "text-error")}>{formatCurrency(t.pnl)}</td>
                  <td className="px-2 py-1.5 text-right">
                    <Badge variant={t.exitReason === "tp" ? "success" : t.exitReason === "sl" ? "destructive" : t.exitReason === "trailing" ? "warning" : "secondary"} className="text-[8px] px-1">
                      {t.exitReason === "tp" ? "TP" : t.exitReason === "sl" ? "SL" : t.exitReason === "trailing" ? "Trail" : t.exitReason === "time" ? "Time" : "Manual"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {trades.length > 50 && <p className="mt-2 text-center text-[10px] text-muted-foreground">Showing 50 of {trades.length} trades</p>}
        </div>
      </CardContent>
    </Card>
  );
}
