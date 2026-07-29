"use client";

import { GoalsHeader } from "@/components/goals/goals-header";
import { GoalsOverview } from "@/components/goals/goals-overview";
import { GoalsGrid } from "@/components/goals/goals-grid";
import { GoalsHabitTracker } from "@/components/goals/goals-habit-tracker";
import { GoalsAchievements } from "@/components/goals/goals-achievements";
import { GoalsAiCoach } from "@/components/goals/goals-ai-coach";
import { GoalsDisciplineDashboard } from "@/components/goals/goals-discipline-dashboard";
import { useGoalsStore } from "@/lib/goals/store";

export default function GoalsPage() {
  const { selectedCategory, setSelectedCategory, selectedType, setSelectedType, statusFilter, setStatusFilter, goals } = useGoalsStore();

  const activeCount = goals.filter((g) => g.status === "active").length;
  const completedCount = goals.filter((g) => g.status === "completed").length;
  const missedCount = goals.filter((g) => g.status === "missed").length;

  return (
    <div className="h-full flex flex-col">
      <GoalsHeader />
      <div className="flex items-center gap-2 px-6 py-2 border-b border-border bg-muted/20 overflow-x-auto">
        <button onClick={() => setStatusFilter("all")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors shrink-0 ${statusFilter === "all" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>All ({goals.length})</button>
        <button onClick={() => setStatusFilter("active")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors shrink-0 ${statusFilter === "active" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>Active ({activeCount})</button>
        <button onClick={() => setStatusFilter("completed")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors shrink-0 ${statusFilter === "completed" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>Completed ({completedCount})</button>
        <button onClick={() => setStatusFilter("missed")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors shrink-0 ${statusFilter === "missed" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>Missed ({missedCount})</button>
      </div>
      <div className="flex items-center gap-1.5 px-6 py-1.5 border-b border-border overflow-x-auto">
        {(["profit", "consistency", "risk", "psychology", "education", "habit", "strategy"] as const).map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)} className={`px-2 py-1 text-[10px] rounded-md transition-colors shrink-0 capitalize ${selectedCategory === cat ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>{cat}</button>
        ))}
        {selectedType && <button onClick={() => setSelectedType(null)} className="px-2 py-1 text-[10px] rounded-md bg-error/10 text-error shrink-0">Clear filters</button>}
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <GoalsOverview />
          <GoalsGrid />
        </div>
        <div className="w-80 border-l border-border flex flex-col overflow-hidden">
          <GoalsDisciplineDashboard />
          <GoalsHabitTracker />
          <div className="flex-1 overflow-auto">
            <GoalsAchievements />
          </div>
          <GoalsAiCoach />
        </div>
      </div>
    </div>
  );
}
