"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/lib/icons";
import { useCalendarStore } from "@/lib/calendar/store";
import { Badge } from "@/components/ui/badge";

export function CalendarAiInsights() {
  const { insights } = useCalendarStore();

  return (
    <div className="border-t border-border">
      <ScrollArea className="h-48">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Icons.Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI Insights</span>
          </div>
          <div className="space-y-2">
            {insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-lg border p-3 ${
                  insight.type === "positive" ? "border-success/20 bg-success/5" :
                  insight.type === "warning" ? "border-warning/20 bg-warning/5" :
                  insight.type === "tip" ? "border-primary/20 bg-primary/5" :
                  "border-border bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {insight.type === "positive" && <Icons.CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                  {insight.type === "warning" && <Icons.AlertTriangle className="h-3.5 w-3.5 text-warning" />}
                  {insight.type === "tip" && <Icons.Sparkles className="h-3.5 w-3.5 text-primary" />}
                  {insight.type === "insight" && <Icons.Brain className="h-3.5 w-3.5 text-primary" />}
                  <span className="text-xs font-semibold text-foreground">{insight.title}</span>
                  <Badge variant="outline" className="text-[9px] ml-auto capitalize">{insight.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
