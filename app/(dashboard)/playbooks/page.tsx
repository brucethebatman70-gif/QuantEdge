"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { mockPlaybooks } from "@/lib/mock-data";

export default function PlaybooksPage() {
  return (
    <DashboardLayout title="Playbooks">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Documented trading strategies and setups
          </p>
          <Button size="sm">
            <Icons.Plus className="mr-2 h-4 w-4" />
            New Playbook
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPlaybooks.map((pb) => (
            <Card key={pb.title}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{pb.title}</CardTitle>
                  <Icons.FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">{pb.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {pb.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Setup</span>
                    <span className="text-right max-w-[60%]">{pb.setup}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Entry</span>
                    <span className="text-right max-w-[60%]">{pb.entry}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Exit</span>
                    <span className="text-right max-w-[60%]">{pb.exit}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Risk</span>
                    <span className="text-right max-w-[60%]">{pb.riskManagement}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={pb.winRate >= 65 ? "success" : "warning"}>
                      {pb.winRate}% WR
                    </Badge>
                    <span className="text-xs text-muted-foreground">{pb.totalTrades} trades</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
