"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useAnalyticsStore } from "@/lib/analytics/store";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function AnalyticsHeader() {
  const { setCompareMode, compareMode, saveView, filters } = useAnalyticsStore();
  const [saveOpen, setSaveOpen] = useState(false);
  const [viewName, setViewName] = useState("");

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Understand your performance with institutional-grade analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setSaveOpen(true)}>
            <Icons.Save className="mr-2 h-4 w-4" />
            Save View
          </Button>
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Icons.Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Icons.Brain className="mr-2 h-4 w-4" />
            Generate AI Report
          </Button>
          <Button
            variant={compareMode ? "default" : "outline"}
            size="sm"
            onClick={() => setCompareMode(!compareMode)}
          >
            <Icons.ArrowRight className="mr-2 h-4 w-4" />
            Compare
          </Button>
        </div>
      </div>

      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Filter View</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="View name..."
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && viewName.trim()) {
                  saveView(viewName.trim());
                  setViewName("");
                  setSaveOpen(false);
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (viewName.trim()) {
                  saveView(viewName.trim());
                  setViewName("");
                  setSaveOpen(false);
                }
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
