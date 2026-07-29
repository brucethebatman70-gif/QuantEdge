"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { useReportsStore } from "@/lib/reports/store";
import { REPORT_TYPE_SHORT } from "@/lib/reports/types";

export function ScheduledReports() {
  const { scheduledReports, toggleScheduledReport, deleteScheduledReport } = useReportsStore();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? scheduledReports : scheduledReports.filter((s) => s.active);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.Repeat className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Scheduled Reports</h3>
          <Badge variant="secondary" className="text-[9px]">{scheduledReports.filter((s) => s.active).length} active</Badge>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={() => setShowAll(!showAll)}>
          <Icons.List className="h-4 w-4" />
        </Button>
      </div>
      <div className="divide-y divide-border">
        {visible.length === 0 ? (
          <div className="p-6 text-center">
            <Icons.Calendar className="h-6 w-6 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No scheduled reports yet.</p>
          </div>
        ) : (
          visible.map((sch, i) => (
            <motion.div
              key={sch.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="p-3.5 flex items-center justify-between hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleScheduledReport(sch.id)}
                  className={`h-7 w-7 rounded-lg border flex items-center justify-center transition-colors ${
                    sch.active ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/30 border-border text-muted-foreground"
                  }`}
                >
                  {sch.active ? <Icons.CheckCheck className="h-3.5 w-3.5" /> : <Icons.X className="h-3.5 w-3.5" />}
                </button>
                <div>
                  <p className="text-xs font-medium text-foreground">{sch.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground capitalize">{sch.frequency}</span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-muted-foreground">{REPORT_TYPE_SHORT[sch.type]}</span>
                    {sch.lastSent && (
                      <>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className="text-[10px] text-muted-foreground">Last: {sch.lastSent}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant={sch.active ? "success" : "secondary"} className="text-[9px]">{sch.active ? "Active" : "Paused"}</Badge>
                <button
                  onClick={() => deleteScheduledReport(sch.id)}
                  className="p-1.5 rounded-md hover:bg-error/10 text-muted-foreground hover:text-error transition-colors"
                >
                  <Icons.Trash2 className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
