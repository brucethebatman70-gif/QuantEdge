"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { useGoalsStore } from "@/lib/goals/store";
import { HABIT_LABELS } from "@/lib/goals/types";

const HABIT_ICONS: Record<string, React.ElementType> = {
  Sun: Icons.Sun, FileText: Icons.FileText, BookOpen: Icons.BookOpen, Camera: Icons.Camera,
  PlayCircle: Icons.PlayCircle, FlaskConical: Icons.FlaskConical, CheckCircle2: Icons.CheckCircle2,
};

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function GoalsHabitTracker() {
  const { habits, toggleHabit } = useGoalsStore();

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-3.5 border-b border-border">
        <h3 className="text-xs font-semibold text-foreground">Habit Tracker</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">Track daily trading routines</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-[10px] text-muted-foreground font-medium">Habit</th>
              <th className="text-center py-2 text-[10px] text-muted-foreground font-medium">Streak</th>
              {DAYS.map((d) => (<th key={d} className="w-8 text-center py-2 text-[10px] text-muted-foreground font-medium">{d}</th>))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, i) => {
              const Icon = HABIT_ICONS[habit.icon] || Icons.CheckCircle2;
              const weekStart = Math.max(0, habit.monthlyData.length - 7);
              const weekSlice = habit.monthlyData.slice(weekStart);
              return (
                <motion.tr
                  key={habit.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-muted flex items-center justify-center">
                        <Icon className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-foreground">{HABIT_LABELS[habit.id]}</p>
                        <p className="text-[9px] text-muted-foreground">{habit.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-warning">
                      <Icons.Flame className="h-3 w-3" />{habit.streak}
                    </span>
                  </td>
                  {weekSlice.map((done, di) => (
                    <td key={di} className="text-center py-2">
                      <button
                        onClick={() => toggleHabit(habit.id, weekStart + di)}
                        className={`h-5 w-5 rounded-sm transition-colors ${done ? "bg-success" : "bg-muted hover:bg-muted/50"}`}
                        aria-label={`${HABIT_LABELS[habit.id]} day ${di + 1}: ${done ? "done" : "not done"}`}
                      />
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
