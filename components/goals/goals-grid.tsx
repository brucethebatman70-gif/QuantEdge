"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { useGoalsStore } from "@/lib/goals/store";
import { GOAL_TYPE_LABELS, GOAL_CATEGORY_LABELS, GOAL_CATEGORY_COLORS, GOAL_CATEGORY_BG } from "@/lib/goals/types";

const TYPE_ICONS: Record<string, React.ElementType> = {
  daily: Icons.Clock, weekly: Icons.Calendar, monthly: Icons.Calendar, quarterly: Icons.Calendar, yearly: Icons.TrendingUp, custom: Icons.Settings,
};

export function GoalsGrid() {
  const { goals, selectedCategory, selectedType, statusFilter, search } = useGoalsStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let f = [...goals];
    if (statusFilter !== "all") f = f.filter((g) => g.status === statusFilter);
    if (selectedCategory) f = f.filter((g) => g.category === selectedCategory);
    if (selectedType) f = f.filter((g) => g.type === selectedType);
    if (search) { const q = search.toLowerCase(); f = f.filter((g) => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.tags.some((t) => t.toLowerCase().includes(q))); }
    return f;
  }, [goals, statusFilter, selectedCategory, selectedType, search]);

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((goal, i) => {
            const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
            const Icon = TYPE_ICONS[goal.type] || Icons.Target;
            const isExpanded = expanded === goal.id;
            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.02 }}
                className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="p-3.5 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${GOAL_CATEGORY_BG[goal.category]}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{goal.title}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Badge variant="outline" className={`text-[9px] ${GOAL_CATEGORY_COLORS[goal.category]}`}>{GOAL_CATEGORY_LABELS[goal.category]}</Badge>
                          <span className="text-[9px] text-muted-foreground">{GOAL_TYPE_LABELS[goal.type]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {goal.status === "completed" && <Icons.CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                      {goal.status === "missed" && <Icons.XCircle className="h-3.5 w-3.5 text-error" />}
                      {goal.status === "archived" && <Icons.Archive className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-lg font-bold text-foreground">{goal.prefix}{goal.current}{goal.unit}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">of {goal.prefix}{goal.target}{goal.unit}</span>
                    </div>
                    <span className={`text-xs font-semibold ${progress >= 100 ? "text-success" : "text-muted-foreground"}`}>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" indicatorClassName={progress >= 100 ? "bg-success" : progress >= 50 ? "bg-primary" : "bg-warning"} />

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{goal.deadline}</span>
                    <Button variant="ghost" size="xs" onClick={() => setExpanded(isExpanded ? null : goal.id)}>
                      <Icons.ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <Separator />
                    <div className="p-3.5 space-y-2">
                      <p className="text-[11px] text-muted-foreground">{goal.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {goal.tags.map((t) => (<Badge key={t} variant="secondary" className="text-[9px]">{t}</Badge>))}
                      </div>
                      {goal.milestones.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-[10px] font-medium text-muted-foreground uppercase">Milestones</p>
                          {goal.milestones.map((ms, j) => (
                            <div key={j} className="flex items-center gap-2 text-[10px]">
                              <div className={`h-2 w-2 rounded-full ${ms.reached ? "bg-success" : "bg-muted"}`} />
                              <span className={ms.reached ? "text-foreground line-through" : "text-muted-foreground"}>{ms.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <Icons.Target className="h-8 w-8 mb-2 opacity-20" />
          <p className="text-xs">No goals match your filters</p>
        </div>
      )}
    </div>
  );
}
