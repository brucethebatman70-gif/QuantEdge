"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";

export default function ReplayPage() {
  return (
    <DashboardLayout title="Trade Replay">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Replay past market conditions and analyze your decisions
          </p>
          <Button size="sm">
            <Icons.PlayCircle className="mr-2 h-4 w-4" />
            Start Replay
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Chart View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[500px] items-center justify-center rounded-lg border border-dashed border-border">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Icons.BarChart3 className="h-12 w-12" />
                  <p className="text-sm">Select a trade to replay</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Search Symbol</label>
                <Input placeholder="e.g. AAPL, TSLA..." />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Date Range</label>
                <Input placeholder="Select dates" />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icons.ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Next
                  <Icons.ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="icon-sm">
                  <Icons.ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="default" size="icon">
                  <Icons.PlayCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <Icons.ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Speed</p>
                <div className="flex gap-1">
                  {["1x", "2x", "5x", "10x"].map((speed) => (
                    <Button key={speed} variant="outline" size="xs" className="flex-1">
                      {speed}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border/50 p-3">
                <p className="text-xs text-muted-foreground">Replay Stats</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Trades Replayed</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Win Rate</span>
                    <span className="font-medium text-success">62.5%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Avg P&L</span>
                    <span className="font-medium text-success">+$342</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
