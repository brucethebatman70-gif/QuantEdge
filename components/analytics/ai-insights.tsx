"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import type { AiInsight } from "@/lib/analytics/types";

const typeConfig = {
  positive: { icon: "✓", bg: "bg-success/10 border-success/20", text: "text-success", label: "Positive" },
  warning: { icon: "⚠", bg: "bg-warning/10 border-warning/20", text: "text-warning", label: "Warning" },
  tip: { icon: "💡", bg: "bg-info/10 border-info/20", text: "text-info", label: "Tip" },
};

const categoryIcons: Record<string, string> = {
  pattern: "📊",
  mistake: "❌",
  strategy: "🎯",
  behavior: "🧠",
  risk: "🛡",
  psychology: "💭",
};

export function AiInsights() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const filtered = filterType
    ? mockAnalyticsData.aiInsights.filter((i) => i.type === filterType)
    : mockAnalyticsData.aiInsights;

  const highCount = mockAnalyticsData.aiInsights.filter((i) => i.impact === "high").length;
  const positiveCount = mockAnalyticsData.aiInsights.filter((i) => i.type === "positive").length;
  const warningCount = mockAnalyticsData.aiInsights.filter((i) => i.type === "warning").length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold">AI Intelligence</CardTitle>
            <p className="text-[11px] text-muted-foreground">
              {highCount} high impact · {positiveCount} positive · {warningCount} warnings
            </p>
          </div>
          <div className="flex gap-1">
            {(["all", "positive", "warning", "tip"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t === "all" ? null : t)}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-medium transition-colors",
                  filterType === t || (!filterType && t === "all")
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((insight) => (
              <motion.div
                key={insight.title}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => setSelected(selected === insight.title ? null : insight.title)}
                  className={cn(
                    "w-full rounded-xl border p-3 text-left transition-all duration-200",
                    selected === insight.title
                      ? "border-primary/40 bg-primary/5 shadow-sm"
                      : typeConfig[insight.type].bg,
                    "hover:shadow-sm"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-base">{categoryIcons[insight.category]}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{insight.title}</span>
                        <Badge
                          variant={
                            insight.impact === "high"
                              ? "destructive"
                              : insight.impact === "medium"
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[9px] px-1.5 py-0"
                        >
                          {insight.impact}
                        </Badge>
                        <span className={cn("text-[10px] font-medium", typeConfig[insight.type].text)}>
                          {typeConfig[insight.type].label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                      {selected === insight.title && insight.metric && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mt-2 flex items-center gap-3 border-t border-border/50 pt-2 text-xs"
                        >
                          <span className="text-muted-foreground">Metric: <span className="font-medium text-foreground">{insight.metric}</span></span>
                          {insight.change && (
                            <span className={cn(insight.change >= 0 ? "text-success" : "text-error")}>
                              {insight.change >= 0 ? "+" : ""}{insight.change}% change
                            </span>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
