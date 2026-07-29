"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { useGoalsStore } from "@/lib/goals/store";

const ICON_MAP: Record<string, React.ElementType> = {
  Target: Icons.Target, Activity: Icons.Activity, Shield: Icons.Shield, CheckCircle2: Icons.CheckCircle2,
  AlertTriangle: Icons.AlertTriangle, TrendingUp: Icons.TrendingUp, Flame: Icons.Flame, BookOpen: Icons.BookOpen, Clock: Icons.Clock,
};

export function GoalsOverview() {
  const { kpis } = useGoalsStore();

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {kpis.map((kpi, i) => {
          const Icon = ICON_MAP[kpi.icon] || Icons.Target;
          const percent = Math.min(100, Math.round((kpi.value / kpi.target) * 100));
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-lg border border-border bg-card p-2.5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="h-3 w-3" />
                <span className="text-[9px] text-muted-foreground truncate">{kpi.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-sm font-bold ${kpi.color}`}>{kpi.value}{kpi.unit}</span>
                <span className="text-[9px] text-muted-foreground">/ {kpi.target}{kpi.unit}</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                  className={`h-full rounded-full ${percent >= 80 ? "bg-success" : percent >= 50 ? "bg-warning" : "bg-error"}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
