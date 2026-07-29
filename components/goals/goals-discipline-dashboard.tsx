"use client";

import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/lib/icons";
import { useGoalsStore } from "@/lib/goals/store";

interface DisciplineMetric {
  label: string;
  value: number;
  max: number;
  icon: keyof typeof RULE_ICONS;
  color: "success" | "warning" | "error";
}

const RULE_ICONS = {
  CheckCheck: Icons.CheckCheck,
  AlertTriangle: Icons.AlertTriangle,
  FileText: Icons.FileText,
  RefreshCw: Icons.RefreshCw,
};

function calcMetric(
  label: string,
  value: number,
  max: number,
  icon: DisciplineMetric["icon"],
): DisciplineMetric {
  const ratio = max > 0 ? value / max : 0;
  const color: DisciplineMetric["color"] = ratio >= 0.8 ? "success" : ratio >= 0.5 ? "warning" : "error";
  return { label, value, max, icon, color };
}

export function GoalsDisciplineDashboard() {
  const { habits, goals } = useGoalsStore();

  const metrics = useMemo(() => {
    const journalHabit = habits.find((h) => h.id === "journal_complete");
    const reviewHabit = habits.find((h) => h.id === "daily_review");
    const riskGoal = goals.filter((g) => g.category === "risk" && g.status === "active");
    const consistencyGoal = goals.filter((g) => g.category === "consistency" && g.status === "active");

    const journalRate = journalHabit
      ? journalHabit.monthlyData.filter(Boolean).length
      : 0;
    const reviewRate = reviewHabit
      ? reviewHabit.monthlyData.filter(Boolean).length
      : 0;
    const totalDays = Math.min(30, Math.max(journalRate, reviewRate, 1));

    const riskCompliance = riskGoal.reduce((sum, g) => {
      const progress = g.target > 0 ? g.current / g.target : 0;
      const capped = Math.min(progress, 1);
      return sum + capped;
    }, 0);
    const riskCount = riskGoal.length || 1;
    const avgRisk = Math.round((riskCompliance / riskCount) * 100);

    const habitComplete = habits.reduce((sum, h) => {
      const done = h.monthlyData.filter(Boolean).length;
      return sum + done;
    }, 0);
    const habitTotal = habits.length * 30;
    const avgHabits = habitTotal > 0 ? Math.round((habitComplete / habitTotal) * 100) : 0;

    return [
      calcMetric("Rule Compliance", Math.round((avgRisk + avgHabits) / 2), 100, "CheckCheck"),
      calcMetric("Risk Discipline", avgRisk, 100, "AlertTriangle"),
      calcMetric("Journal Completion", journalRate, totalDays, "FileText"),
      calcMetric("Review Completion", reviewRate, totalDays, "RefreshCw"),
    ];
  }, [habits, goals]);

  const colorMap = {
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };

  const textColorMap = {
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  };

  const bgColorMap = {
    success: "bg-success/10",
    warning: "bg-warning/10",
    error: "bg-error/10",
  };

  const overall = Math.round(metrics.reduce((s, m) => s + (m.max > 0 ? (m.value / m.max) * 100 : 0), 0) / metrics.length);
  const overallColor: DisciplineMetric["color"] = overall >= 80 ? "success" : overall >= 50 ? "warning" : "error";

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="p-3.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.Gavel className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-semibold text-foreground">Discipline Dashboard</h3>
        </div>
        <span className={`text-xs font-bold ${textColorMap[overallColor]}`}>{overall}%</span>
      </div>
      <div className="p-3.5 space-y-3">
        {metrics.map((m) => {
          const Icon = RULE_ICONS[m.icon];
          const ratio = m.max > 0 ? m.value / m.max : 0;
          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <div className={`p-1 rounded-md ${bgColorMap[m.color]}`}>
                    <Icon className={`h-3 w-3 ${textColorMap[m.color]}`} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{m.label}</span>
                </div>
                <span className={`text-[10px] font-medium ${textColorMap[m.color]}`}>
                  {m.value}/{m.max}
                </span>
              </div>
              <Progress
                value={Math.round(ratio * 100)}
                className="h-1.5"
                indicatorClassName={colorMap[m.color]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
