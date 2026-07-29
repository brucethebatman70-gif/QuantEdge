"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/lib/icons";
import { useGoalsStore } from "@/lib/goals/store";

export function GoalsAiCoach() {
  const { aiCoachMessages } = useGoalsStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const visibleMessages = aiCoachMessages;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Icons.Bot className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-semibold text-foreground">AI Performance Coach</h3>
          <Badge variant="secondary" className="text-[9px] ml-auto">{visibleMessages.length} insights</Badge>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Personalized analysis and recommendations</p>
      </div>
      <ScrollArea className="h-72">
        <div className="p-3.5 space-y-2">
          {visibleMessages.map((msg, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className={`w-full text-left rounded-lg border p-3 transition-all ${
                    msg.type === "weekly_review" || msg.type === "monthly_review" ? "border-primary/20 bg-primary/5" :
                    msg.type === "weakness" ? "border-warning/20 bg-warning/5" :
                    msg.type === "strength" ? "border-success/20 bg-success/5" :
                    msg.type === "suggestion" ? "border-accent/20 bg-accent/5" :
                    "border-border bg-muted/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {msg.type === "weekly_review" || msg.type === "monthly_review" ? <Icons.Calendar className="h-3 w-3 text-primary" /> :
                       msg.type === "weakness" ? <Icons.AlertTriangle className="h-3 w-3 text-warning" /> :
                       msg.type === "strength" ? <Icons.CheckCircle2 className="h-3 w-3 text-success" /> :
                       msg.type === "suggestion" ? <Icons.Lightbulb className="h-3 w-3 text-accent" /> :
                       <Icons.Sparkles className="h-3 w-3 text-primary" />}
                      <span className="text-xs font-semibold text-foreground">{msg.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {msg.score !== null && (
                        <span className={`text-[10px] font-bold ${
                          msg.score >= 80 ? "text-success" : msg.score >= 60 ? "text-warning" : "text-error"
                        }`}>{msg.score}</span>
                      )}
                      <Icons.ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                  {msg.score !== null && (
                    <div className="mt-1.5">
                      <Progress value={msg.score} className="h-1" indicatorClassName={
                        msg.score >= 80 ? "bg-success" : msg.score >= 60 ? "bg-warning" : "bg-error"
                      } />
                    </div>
                  )}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-[11px] text-muted-foreground mt-2 leading-relaxed"
                      >
                        {msg.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
