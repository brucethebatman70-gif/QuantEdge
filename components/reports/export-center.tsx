"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/lib/icons";
import { useReportsStore } from "@/lib/reports/store";
import type { ExportFormat } from "@/lib/reports/types";

const EXPORT_OPTIONS: { format: ExportFormat; label: string; icon: React.ReactNode; desc: string }[] = [
  { format: "pdf", label: "PDF", icon: <Icons.FileText className="h-4 w-4 text-error" />, desc: "Full report with charts and branding" },
  { format: "csv", label: "CSV", icon: <Icons.Table className="h-4 w-4 text-success" />, desc: "Raw trade data in spreadsheet format" },
  { format: "excel", label: "Excel", icon: <Icons.Table className="h-4 w-4 text-primary" />, desc: "Formatted workbook with multiple sheets" },
  { format: "json", label: "JSON", icon: <Icons.Code className="h-4 w-4 text-warning" />, desc: "Structured data for API integration" },
];

export function ExportCenter() {
  const { exportJobs, reports } = useReportsStore();

  const readyReports = reports.filter((r) => r.status === "ready");

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.Download className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Export</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="px-2.5 py-1 rounded-lg bg-muted text-[10px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Icons.Printer className="h-3 w-3" />Print
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2 block">Select Format</label>
          <div className="grid grid-cols-2 gap-2">
            {EXPORT_OPTIONS.map((opt) => (
              <button
                key={opt.format}
                disabled={readyReports.length === 0}
                className="flex items-center gap-2.5 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/20 transition-all disabled:opacity-40 disabled:pointer-events-none text-left"
              >
                <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  {opt.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{opt.label}</p>
                  <p className="text-[9px] text-muted-foreground leading-tight">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2 block">Recent Exports</label>
          <div className="space-y-2">
            {exportJobs.slice(0, 4).map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`h-6 w-6 rounded-md flex items-center justify-center ${
                    job.format === "pdf" ? "bg-error/10" : job.format === "csv" ? "bg-success/10" : job.format === "excel" ? "bg-primary/10" : "bg-warning/10"
                  }`}>
                    {job.format === "pdf" ? <Icons.FileText className="h-3 w-3 text-error" /> :
                     job.format === "csv" || job.format === "excel" ? <Icons.Table className="h-3 w-3" /> :
                     <Icons.Code className="h-3 w-3 text-warning" />}
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-foreground">{job.reportTitle}</p>
                    <p className="text-[9px] text-muted-foreground uppercase">{job.format} • {job.createdAt}</p>
                  </div>
                </div>
                {job.status === "completed" ? (
                  <Badge variant="success" className="text-[9px]">{job.fileSize || "Done"}</Badge>
                ) : job.status === "processing" ? (
                  <div className="flex items-center gap-1.5">
                    <Progress value={50} className="h-1 w-12" />
                    <span className="text-[9px] text-muted-foreground">Processing</span>
                  </div>
                ) : job.status === "failed" ? (
                  <Badge variant="destructive" className="text-[9px]">Failed</Badge>
                ) : (
                  <Badge variant="secondary" className="text-[9px]">Pending</Badge>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
