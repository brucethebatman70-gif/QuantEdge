"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/lib/icons";
import { mockGoals } from "@/lib/mock-data";

export default function GoalsPage() {
  return (
    <DashboardLayout title="Goals">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Set and track your trading goals
          </p>
          <Button size="sm">
            <Icons.Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockGoals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <Card key={goal.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm">{goal.title}</CardTitle>
                        <Badge variant="secondary" className="text-[10px] capitalize">
                          {goal.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold">
                          {goal.prefix ? "$" : ""}{goal.current}{goal.unit}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          of {goal.prefix ? "$" : ""}{goal.target}{goal.unit}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs">
                        <span className={progress >= 100 ? "text-success" : "text-muted-foreground"}>
                          {Math.round(progress)}% complete
                        </span>
                        <span className="text-muted-foreground">{goal.deadline}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Icons.CheckCircle2 className="h-8 w-8" />
                <p className="text-sm">No completed goals yet</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {mockGoals.map((goal) => {
                    const progress = (goal.current / goal.target) * 100;
                    return (
                      <div key={goal.id} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                            <Icons.Target className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{goal.title}</p>
                            <p className="text-xs text-muted-foreground">{goal.deadline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-32">
                            <Progress value={progress} className="h-2" />
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round(progress)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
