"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/cn";

interface ExportReportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formats = [
  { id: "pdf", label: "PDF Report", desc: "Full analytics report with charts", icon: "FileText" },
  { id: "csv", label: "CSV Data", desc: "Raw trade data in spreadsheet format", icon: "Table" },
  { id: "excel", label: "Excel", desc: "Formatted workbook with pivot tables", icon: "Grid3x3" },
  { id: "summary", label: "Executive Summary", desc: "AI-generated performance summary", icon: "Brain" },
] as const;

export function ExportReport({ open, onOpenChange }: ExportReportProps) {
  const [selected, setSelected] = useState<string>("pdf");
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>
            Choose a format for your analytics report.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          {formats.map((f) => {
            const Icon = Icons[f.icon as keyof typeof Icons] || Icons.FileText;
            return (
              <button
                key={f.id}
                onClick={() => setSelected(f.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                  selected === f.id
                    ? "border-primary/50 bg-primary/5"
                    : "border-border hover:bg-muted/50"
                )}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                    selected === f.id ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                  )}
                >
                  {selected === f.id && <span className="text-[8px]">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={exporting}>
            {exporting ? (
              <>
                <Icons.RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Icons.Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
