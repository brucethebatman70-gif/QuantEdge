"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { useCopilotStore } from "@/lib/copilot/store";

const INSIGHT_ICONS: Record<string, React.ElementType> = {
  Zap: Icons.Zap,
  Shield: Icons.Shield,
  Brain: Icons.Brain,
  AlertTriangle: Icons.AlertTriangle,
  Activity: Icons.Activity,
  Heart: Icons.Heart,
};

export function AiInsightsPanel() {
  const { insights } = useCopilotStore();

  return (
    <div className="space-y-3">
      {insights.map((metric, i) => {
        const Icon = INSIGHT_ICONS[metric.icon] || Icons.Activity;
        const percent = Math.min(100, Math.round((metric.value / metric.max) * 100));
        const TrendIcon = metric.trend === "up" ? Icons.TrendingUp : metric.trend === "down" ? Icons.TrendingDown : Icons.Minus;
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-lg border border-border bg-card p-3 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-muted/50 flex items-center justify-center">
                  <Icon className="h-3 w-3" />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">{metric.label}</span>
              </div>
              <TrendIcon className={`h-3 w-3 ${
                metric.trend === "up" ? "text-success" : metric.trend === "down" ? "text-error" : "text-muted-foreground"
              }`} />
            </div>
            <div className="flex items-baseline gap-1 mb-1.5">
              <span className={`text-lg font-bold ${metric.color}`}>{metric.value}</span>
              <span className="text-[10px] text-muted-foreground">/ {metric.max}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, delay: i * 0.04, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  percent >= 80 ? "bg-success" : percent >= 60 ? "bg-warning" : "bg-error"
                }`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
