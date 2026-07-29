"use client";

import { Icons } from "@/lib/icons";
import { ReportsHeader } from "@/components/reports/reports-header";
import { QuickReportCards } from "@/components/reports/quick-report-cards";
import { ReportBuilder } from "@/components/reports/report-builder";
import { ReportHistory } from "@/components/reports/report-history";
import { ReportPreview } from "@/components/reports/report-preview";
import { useReportsStore } from "@/lib/reports/store";

export default function ReportsPage() {
  const { search, setSearch, statusFilter, setStatusFilter, typeFilter, setTypeFilter } = useReportsStore();

  return (
    <div className="h-full flex flex-col">
      <ReportsHeader />
      <QuickReportCards />
      <div className="flex items-center gap-2 px-6 py-1.5 border-b border-border">
        <div className="relative flex-1 max-w-xs">
          <Icons.Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports..."
            className="w-full h-7 pl-8 pr-2.5 rounded-lg border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "ready", "generating", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                statusFilter === s ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(["all", "daily", "weekly", "monthly", "quarterly", "yearly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-colors capitalize ${
                typeFilter === t ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <ReportBuilder />
        </div>
        <div className="w-80 border-l border-border flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <ReportHistory />
          </div>
          <div className="border-t border-border">
            <ReportPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
