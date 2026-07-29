"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useReportsStore } from "@/lib/reports/store";
import { REPORT_SECTION_LABELS, REPORT_TYPE_SHORT } from "@/lib/reports/types";

export function ReportPreview() {
  const { selectedReport, selectReport } = useReportsStore();
  const r = selectedReport;

  if (!r) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center h-full flex flex-col items-center justify-center">
        <Icons.FileText className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
        <p className="text-sm font-medium text-foreground">No Report Selected</p>
        <p className="text-xs text-muted-foreground mt-1">Select a report from the history to preview it.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card overflow-hidden h-full flex flex-col"
    >
      <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Icons.Eye className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
          <Badge variant="secondary" className="text-[9px]">{REPORT_TYPE_SHORT[r.type]}</Badge>
          <Badge className={`text-[9px] ${r.status === "ready" ? "bg-success/10 text-success" : r.status === "generating" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>{r.status}</Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon-sm" onClick={() => selectReport(null)}>
            <Icons.X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-5">
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total PnL", value: `$${r.metrics.totalPnL.toLocaleString()}`, color: r.metrics.totalPnL >= 0 ? "text-success" : "text-error" },
            { label: "Win Rate", value: `${r.metrics.winRate}%`, color: "text-foreground" },
            { label: "Profit Factor", value: r.metrics.profitFactor.toFixed(2), color: "text-foreground" },
            { label: "Total Trades", value: r.metrics.totalTrades.toLocaleString(), color: "text-foreground" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="text-[10px] text-muted-foreground">{m.label}</p>
              <p className={`text-base font-bold mt-0.5 ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border p-3">
            <p className="text-[10px] font-medium text-muted-foreground mb-2">Date Range</p>
            <p className="text-xs text-foreground">{r.dateRange.start} → {r.dateRange.end}</p>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="text-[10px] font-medium text-muted-foreground mb-2">Generated</p>
            <p className="text-xs text-foreground">{r.createdAt} by {r.generatedBy}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-medium text-muted-foreground mb-2">Sections ({r.sections.length})</p>
          <div className="flex flex-wrap gap-1.5">
            {r.sections.map((s) => (
              <Badge key={s.id} variant="secondary" className="text-[9px]">
                {REPORT_SECTION_LABELS[s.id]}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-medium text-muted-foreground mb-2">Charts ({r.charts.length})</p>
          <div className="grid grid-cols-4 gap-2">
            {r.charts.map((ch) => (
              <div key={ch.id} className="rounded-lg border border-border p-3 bg-muted/10 flex flex-col items-center gap-1.5">
                {ch.type === "equity_curve" ? <Icons.TrendingUp className="h-4 w-4 text-success" /> :
                 ch.type === "drawdown" ? <Icons.TrendingDown className="h-4 w-4 text-error" /> :
                 ch.type === "market_breakdown" ? <Icons.PieChart className="h-4 w-4 text-primary" /> :
                 ch.type === "strategy_breakdown" ? <Icons.Layers className="h-4 w-4 text-accent" /> :
                 ch.type === "calendar_heatmap" ? <Icons.Calendar className="h-4 w-4 text-warning" /> :
                 <Icons.BarChart3 className="h-4 w-4 text-muted-foreground" />}
                <span className="text-[8px] text-muted-foreground text-center leading-tight">{ch.label}</span>
              </div>
            ))}
          </div>
        </div>

        {r.tags.length > 0 && (
          <div>
            <p className="text-[10px] font-medium text-muted-foreground mb-2">Tags</p>
            <div className="flex gap-1.5 flex-wrap">
              {r.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-[9px]">{t}</Badge>
              ))}
            </div>
          </div>
        )}

        {r.fileSize && (
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <Icons.Download className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium text-foreground">{r.title}.pdf</p>
                <p className="text-[10px] text-muted-foreground">{r.fileSize}</p>
              </div>
            </div>
            <Button size="sm">
              <Icons.Download className="mr-2 h-3 w-3" />Download
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
