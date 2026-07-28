"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/lib/icons";

const reports = [
  { name: "Monthly Performance Report", period: "June 2026", type: "Performance", status: "generated" as const },
  { name: "Quarterly Tax Report", period: "Q2 2026", type: "Tax", status: "pending" as const },
  { name: "Strategy Comparison", period: "H1 2026", type: "Analysis", status: "generated" as const },
  { name: "Risk Assessment", period: "Current", type: "Risk", status: "draft" as const },
];

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reports">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Generate and view performance reports
          </p>
          <Button size="sm">
            <Icons.Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="tax">Tax</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {reports.map((report) => (
                    <div
                      key={report.name}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                          <Icons.FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{report.name}</p>
                          <p className="text-xs text-muted-foreground">{report.period}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            report.status === "generated" ? "success" :
                            report.status === "pending" ? "warning" : "secondary"
                          }
                          className="capitalize"
                        >
                          {report.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Icons.ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground">Performance reports</p>
            </div>
          </TabsContent>

          <TabsContent value="tax" className="mt-4">
            <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground">Tax reports</p>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-4">
            <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground">Custom reports</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
