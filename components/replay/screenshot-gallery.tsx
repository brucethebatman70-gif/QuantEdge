"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { mockReplayTrades } from "@/lib/replay/mock-replay";
import { useReplayStore } from "@/lib/replay/store";

export function ScreenshotGallery() {
  const { selectedTradeId } = useReplayStore();
  const [viewerOpen, setViewerOpen] = useState<string | null>(null);

  const trade = useMemo(() => mockReplayTrades.find((t) => t.id === selectedTradeId), [selectedTradeId]);

  if (!trade || trade.screenshots.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">Screenshots</CardTitle>
        <Button variant="ghost" size="xs" className="text-[10px]">
          <Icons.Camera className="mr-1 h-3 w-3" />
          Capture
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {trade.screenshots.map((s) => (
            <button
              key={s}
              onClick={() => setViewerOpen(viewerOpen === s ? null : s)}
              className={cn(
                "group relative aspect-video overflow-hidden rounded-lg border bg-muted transition-all",
                viewerOpen === s ? "border-primary ring-1 ring-primary" : "border-border hover:border-foreground/30"
              )}
            >
              <div className="flex h-full items-center justify-center">
                <Icons.Image className="h-6 w-6 text-muted-foreground/40" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
                <Icons.Eye className="h-5 w-5 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                <span className="text-[8px] text-white/80">{s}</span>
              </div>
            </button>
          ))}
        </div>

        {viewerOpen && (
          <div className="mt-3 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.Image className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium">{viewerOpen}</span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon-xs">
                  <Icons.Download className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon-xs" onClick={() => setViewerOpen(null)}>
                  <Icons.X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="mt-2 flex h-[200px] items-center justify-center rounded-lg border border-dashed border-border bg-card">
              <div className="flex flex-col items-center gap-2 text-center">
                <Icons.Image className="h-10 w-10 text-muted-foreground/30" />
                <p className="text-[10px] text-muted-foreground">Screenshot preview</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
