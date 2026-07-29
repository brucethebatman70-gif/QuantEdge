"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/lib/icons";
import { useGoalsStore } from "@/lib/goals/store";
import { GOAL_TYPE_LABELS, GOAL_CATEGORY_LABELS, type GoalType, type GoalCategory } from "@/lib/goals/types";

const GOAL_TYPES: GoalType[] = ["daily", "weekly", "monthly", "quarterly", "yearly", "custom"];
const GOAL_CATEGORIES: GoalCategory[] = ["profit", "consistency", "risk", "psychology", "education", "habit", "strategy"];

const TEMPLATES = [
  { title: "Profit Target", type: "monthly" as GoalType, category: "profit" as GoalCategory, description: "Set a monthly P&L target" },
  { title: "Win Rate Goal", type: "weekly" as GoalType, category: "consistency" as GoalCategory, description: "Target a specific win rate" },
  { title: "Risk Limit", type: "daily" as GoalType, category: "risk" as GoalCategory, description: "Set max drawdown or risk per trade" },
  { title: "Study Hours", type: "weekly" as GoalType, category: "education" as GoalCategory, description: "Dedicate hours to learning" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GoalsCreateDialog({ open, onOpenChange }: Props) {
  const { addGoal } = useGoalsStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState<GoalType>("weekly");
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory>("profit");
  const [target, setTarget] = useState("100");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      id: `g_${Date.now()}`,
      type: selectedType,
      category: selectedCategory,
      title,
      description,
      target: Number(target),
      current: 0,
      unit: "",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      deadline: deadline || "Ongoing",
      milestones: [],
      tags: [GOAL_TYPE_LABELS[selectedType], GOAL_CATEGORY_LABELS[selectedCategory]],
      linkedHabits: [],
    });
    onOpenChange(false);
    setTitle("");
    setDescription("");
    setTarget("100");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
          <DialogDescription>Set a new performance goal to track your progress</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex gap-1.5 flex-wrap">
            {TEMPLATES.map((t) => (
              <button
                key={t.title}
                type="button"
                onClick={() => { setTitle(t.title); setSelectedType(t.type); setSelectedCategory(t.category); }}
                className="px-2 py-1.5 rounded-lg border border-border text-[10px] text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
              >
                {t.title}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Type</Label>
              <div className="flex gap-1.5 flex-wrap">
                {GOAL_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                      selectedType === t ? "bg-primary/10 text-primary ring-1 ring-primary" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {GOAL_TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Category</Label>
              <div className="flex gap-1.5 flex-wrap">
                {GOAL_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCategory(c)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium capitalize transition-colors ${
                      selectedCategory === c ? "bg-primary/10 text-primary ring-1 ring-primary" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="goal-title" className="text-xs">Title</Label>
              <Input id="goal-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Goal title..." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="goal-desc" className="text-xs">Description</Label>
              <Input id="goal-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What do you want to achieve?" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="goal-target" className="text-xs">Target</Label>
                <Input id="goal-target" type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="goal-deadline" className="text-xs">Deadline</Label>
                <Input id="goal-deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. This Week" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" size="sm" disabled={!title.trim()}>
                <Icons.Plus className="mr-2 h-4 w-4" />Create Goal
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
