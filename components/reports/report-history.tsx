"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { useReportsStore } from "@/lib/reports/store";
import { REPORT_TYPE_SHORT } from "@/lib/reports/types";

const STATUS_STYLES: Record<string, string> = {
  ready: "text-success border-success/20 bg-success/5",
  generating: "text-warning border-warning/20 bg-warning/5",
  draft: "text-muted-foreground border-border bg-muted/20",
  error: "text-error border-error/20 bg-error/5",
};

export function ReportHistory() {
  const { reports, selectReport, selectedReport, search, statusFilter, typeFilter, deleteReport } = useReportsStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = reports.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.tags.some((t) => t.includes(search))) return false;
    return true;
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.FileText className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Report History</h3>
          <Badge variant="secondary" className="text-[9px]">{filtered.length} reports</Badge>
        </div>
      </div>
      <div className="divide-y divide-border overflow-auto max-h-[400px]">
        {filtered.length === 0 ? (
          <div className="p-6 text-center">
            <Icons.FileText className="h-6 w-6 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No reports match your filters.</p>
          </div>
        ) : (
          filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onMouseEnter={() => setHoveredId(r.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => selectReport(selectedReport?.id === r.id ? null : r)}
              className={`p-3.5 cursor-pointer transition-colors ${
                selectedReport?.id === r.id ? "bg-primary/5" : "hover:bg-muted/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground truncate">{r.title}</span>
                    <Badge variant="secondary" className={`text-[9px] ${STATUS_STYLES[r.status]}`}>{r.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{REPORT_TYPE_SHORT[r.type]}</span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-muted-foreground">{r.dateRange.start} — {r.dateRange.end}</span>
                    {r.fileSize && (
                      <>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className="text-[10px] text-muted-foreground">{r.fileSize}</span>
                      </>
                    )}
                  </div>
                  <AnimatePresence>
                    {hoveredId === r.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-1.5 mt-1.5"
                      >
                        <button className="px-2 py-0.5 rounded text-[9px] bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                          <Icons.Download className="h-2.5 w-2.5" />Download
                        </button>
                        <button className="px-2 py-0.5 rounded text-[9px] bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                          <Icons.Share2 className="h-2.5 w-2.5" />Share
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteReport(r.id); }}
                          className="px-2 py-0.5 rounded text-[9px] bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center gap-1"
                        >
                          <Icons.Trash2 className="h-2.5 w-2.5" />Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {r.charts.length > 0 && (
                    <div className="flex -space-x-1">
                      {r.charts.slice(0, 3).map((ch) => {
                        const Icon = CHART_ICONS[ch.type] || Icons.BarChart3;
                        return <Icon key={ch.id} className="h-3 w-3 text-muted-foreground" />;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

const CHART_ICONS: Record<string, React.ElementType> = {
  equity_curve: Icons.TrendingUp, drawdown: Icons.TrendingDown, pnl_distribution: Icons.BarChart3,
  market_breakdown: Icons.PieChart, strategy_breakdown: Icons.Layers, risk_analysis: Icons.Shield,
  calendar_heatmap: Icons.Calendar, performance_timeline: Icons.Activity,
};
