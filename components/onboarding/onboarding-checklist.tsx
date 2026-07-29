"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  icon: keyof typeof iconMap;
  route?: string;
}

const iconMap = {
  broker: Icons.Link2,
  import: Icons.Upload,
  review: Icons.Brain,
  profile: Icons.User,
  goal: Icons.Target,
  report: Icons.FileText,
  journal: Icons.BookOpen,
  trade: Icons.TrendingUp,
};

type ChecklistKey = keyof typeof iconMap;

const defaultItems: ChecklistItem[] = [
  { id: "broker", label: "Connect a Broker", description: "Link your trading platform", completed: false, icon: "broker" },
  { id: "import", label: "Import Trades", description: "Load your trade history", completed: false, icon: "import" },
  { id: "review", label: "Review AI Insights", description: "Get your first AI analysis", completed: false, icon: "review" },
  { id: "profile", label: "Complete Profile", description: "Set your trading preferences", completed: false, icon: "profile" },
  { id: "goal", label: "Create a Goal", description: "Set your first trading target", completed: false, icon: "goal" },
  { id: "report", label: "Generate a Report", description: "Create your first report", completed: false, icon: "report" },
];

interface OnboardingChecklistProps {
  onComplete?: () => void;
  onItemAction?: (id: string) => void;
  className?: string;
}

export function OnboardingChecklist({ onComplete, onItemAction, className }: OnboardingChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const [dismissed, setDismissed] = useState(false);

  const completedCount = items.filter((i) => i.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);
  const allDone = completedCount === items.length;

  const toggleItem = (id: string) => {
    const next = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(next);
    onItemAction?.(id);
    if (next.every((i) => i.completed)) onComplete?.();
  };

  if (dismissed || allDone) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn("glass rounded-xl p-4 max-w-sm", className)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icons.CheckSquare className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold opacity-80">Getting Started</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground/40 hover:text-foreground/60 transition-colors"
        >
          <Icons.X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="text-[10px] text-muted-foreground/50 font-mono">{progress}%</span>
      </div>

      <div className="space-y-1">
        {items.map((item) => {
          const Icon = iconMap[item.icon as ChecklistKey] || Icons.Check;
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={cn(
                "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-left transition-all duration-200",
                item.completed ? "opacity-50" : "hover:bg-white/[0.03]"
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all duration-200",
                  item.completed
                    ? "border-success bg-success/20 text-success"
                    : "border-white/10 bg-white/[0.03]"
                )}
              >
                {item.completed ? (
                  <Icons.Check className="h-3 w-3" />
                ) : (
                  <Icon className="h-3 w-3 opacity-40" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className={cn("text-xs font-medium", item.completed ? "line-through opacity-60" : "opacity-80")}>
                  {item.label}
                </span>
                <p className="text-[10px] text-muted-foreground/50 truncate">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-white/[0.06]"
          >
            <div className="flex items-center gap-2 text-success">
              <Icons.Sparkles className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">All set! You&apos;re ready to trade.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
