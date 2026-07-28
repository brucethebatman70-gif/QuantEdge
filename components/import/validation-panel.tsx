"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ValidatedTrade, ValidationIssue, AiInsight } from "@/lib/import/types";

interface ValidationPanelProps {
  trades: ValidatedTrade[];
  issues: ValidationIssue[];
  aiInsights: AiInsight[];
}

export function ValidationPanel({ trades, issues, aiInsights }: ValidationPanelProps) {
  const validCount = trades.filter((t) => t.validationStatus === "valid").length;
  const warningCount = trades.filter((t) => t.validationStatus === "warning").length;
  const errorCount = trades.filter((t) => t.validationStatus === "error").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Valid", count: validCount, color: "text-success", bg: "bg-success/10", icon: Icons.CheckCircle2 },
          { label: "Warnings", count: warningCount, color: "text-warning", bg: "bg-warning/10", icon: Icons.AlertTriangle },
          { label: "Errors", count: errorCount, color: "text-error", bg: "bg-error/10", icon: Icons.XCircle },
        ].map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("rounded-xl border p-4 text-center", item.bg)}
          >
            <item.icon className={cn("h-5 w-5 mx-auto mb-2", item.color)} />
            <span className={cn("text-xl font-bold", item.color)}>{item.count}</span>
            <p className="text-[10px] text-muted-foreground mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {aiInsights.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Icons.Zap className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm">AI Insights</CardTitle>
              <Badge variant="default" className="text-[9px] px-1.5">AI</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {aiInsights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "rounded-lg border p-3 text-sm",
                  insight.severity === "error" && "border-error/20 bg-error/[0.02]",
                  insight.severity === "warning" && "border-warning/20 bg-warning/[0.02]",
                  insight.severity === "info" && "border-info/20 bg-info/[0.02]"
                )}
              >
                <div className="flex items-start gap-2">
                  {insight.severity === "error" ? (
                    <Icons.XCircle className="h-4 w-4 text-error mt-0.5 shrink-0" />
                  ) : insight.severity === "warning" ? (
                    <Icons.AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                  ) : (
                    <Icons.Info className="h-4 w-4 text-info mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="text-xs font-medium">{insight.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{insight.suggestion}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {issues.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Validation Details</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="max-h-[200px]">
              <div className="divide-y divide-border/50">
                {issues.map((issue) => (
                  <div key={issue.id} className="flex items-start gap-3 p-3 text-sm hover:bg-muted/20">
                    {issue.severity === "error" ? (
                      <Icons.XCircle className="h-4 w-4 text-error mt-0.5 shrink-0" />
                    ) : issue.severity === "warning" ? (
                      <Icons.AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                    ) : (
                      <Icons.Info className="h-4 w-4 text-info mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{issue.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{issue.suggestion}</p>
                    </div>
                    <Badge variant={issue.severity === "error" ? "destructive" : issue.severity === "warning" ? "warning" : "default"} className="text-[9px] px-1.5 shrink-0">
                      {issue.field}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
