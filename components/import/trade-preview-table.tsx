"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateTime } from "@/lib/utils";
import type { ValidatedTrade } from "@/lib/import/types";

interface TradePreviewTableProps {
  trades: ValidatedTrade[];
}

export function TradePreviewTable({ trades }: TradePreviewTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let list = trades;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((t) =>
        t.pair.toLowerCase().includes(q) ||
        t.tradeId?.toLowerCase().includes(q) ||
        t.broker.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      const aVal = (a as any)[sortField];
      const bVal = (b as any)[sortField];
      if (!aVal || !bVal) return 0;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [trades, search, sortField, sortDir]);

  const toggleSort = (field: string) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((t) => t.id)));
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <Icons.ChevronDown className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? <Icons.ChevronUp className="h-3 w-3" /> : <Icons.ChevronDown className="h-3 w-3" />;
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "valid": return <Badge variant="success" className="text-[9px] px-1.5">Valid</Badge>;
      case "warning": return <Badge variant="warning" className="text-[9px] px-1.5">Warning</Badge>;
      case "error": return <Badge variant="destructive" className="text-[9px] px-1.5">Error</Badge>;
      default: return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border bg-card">
      <div className="flex items-center gap-3 border-b border-border p-4">
        <div className="relative flex-1">
          <Icons.Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search trades..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-9 text-xs"
          />
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Filter"><Icons.Filter className="h-3.5 w-3.5" /></Button>
        <span className="text-xs text-muted-foreground">{filtered.length} trades</span>
      </div>

      <ScrollArea className="max-h-[400px]">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/50">
              <th className="sticky top-0 bg-card p-3 text-left">
                <input
                  type="checkbox"
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                  className="h-3.5 w-3.5 rounded border-input accent-primary"
                  aria-label="Select all trades"
                />
              </th>
              {[
                { key: "tradeId", label: "ID" },
                { key: "date", label: "Date" },
                { key: "pair", label: "Pair" },
                { key: "direction", label: "Dir" },
                { key: "entry", label: "Entry" },
                { key: "exit", label: "Exit" },
                { key: "volume", label: "Vol" },
                { key: "pnl", label: "PnL" },
                { key: "validationStatus", label: "Status" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="sticky top-0 bg-card p-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground select-none"
                  onClick={() => toggleSort(key)}
                >
                  <div className="flex items-center gap-1">
                    {label} <SortIcon field={key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((trade) => (
              <tr
                key={trade.id}
                className={cn(
                  "border-b border-border/25 transition-colors hover:bg-muted/20",
                  selected.has(trade.id) && "bg-primary/[0.02]"
                )}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(trade.id)}
                    onChange={() => toggleOne(trade.id)}
                    className="h-3.5 w-3.5 rounded border-input accent-primary"
                    aria-label={`Select trade ${trade.tradeId}`}
                  />
                </td>
                <td className="p-3 font-mono text-[10px] text-muted-foreground">{trade.tradeId}</td>
                <td className="p-3 whitespace-nowrap">{formatDateTime(trade.date)}</td>
                <td className="p-3">
                  <span className={cn("font-medium", trade.direction === "buy" ? "text-success" : "text-error")}>
                    {trade.direction.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 font-mono">{trade.entry}</td>
                <td className="p-3 font-mono">{trade.exit ?? "—"}</td>
                <td className="p-3">{trade.volume}</td>
                <td className={cn("p-3 font-medium font-mono", (trade.pnl || 0) >= 0 ? "text-success" : "text-error")}>
                  {trade.pnl != null ? `$${trade.pnl.toFixed(2)}` : "—"}
                </td>
                <td className="p-3">{statusBadge(trade.validationStatus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>

      <div className="flex items-center justify-between border-t border-border p-3 text-xs text-muted-foreground">
        <span>{selected.size} of {filtered.length} selected</span>
        <span>{filtered.filter((t) => t.validationStatus === "error").length} errors</span>
      </div>
    </motion.div>
  );
}
