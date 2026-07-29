"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useReportsStore } from "@/lib/reports/store";
import { REPORT_TYPE_LABELS, type ReportType } from "@/lib/reports/types";

export function ReportsHeader() {
  const { generateReport, templates } = useReportsStore();
  const [showNewMenu, setShowNewMenu] = useState(false);

  return (
    <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Reports Center</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Generate beautiful performance reports.</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Button size="sm" onClick={() => setShowNewMenu(!showNewMenu)}>
            <Icons.Plus className="mr-2 h-4 w-4" />New Report
          </Button>
          {showNewMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNewMenu(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded-xl border border-border bg-card shadow-xl p-1.5">
                {(Object.keys(REPORT_TYPE_LABELS) as ReportType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => { generateReport(type, templates[0]?.id ?? ""); setShowNewMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-muted/50 transition-colors capitalize"
                  >
                    {REPORT_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <Button variant="secondary" size="sm">
          <Icons.Sparkles className="mr-2 h-4 w-4" />Generate AI Report
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Icons.Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Icons.Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
