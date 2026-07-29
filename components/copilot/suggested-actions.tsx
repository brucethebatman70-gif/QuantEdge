"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useCopilotStore } from "@/lib/copilot/store";

const ACTION_ICONS: Record<string, React.ElementType> = {
  Activity: Icons.Activity,
  Shield: Icons.Shield,
  AlertTriangle: Icons.AlertTriangle,
  BarChart3: Icons.BarChart3,
  Target: Icons.Target,
  TrendingDown: Icons.TrendingDown,
  Sparkles: Icons.Sparkles,
  FileText: Icons.FileText,
};

interface SuggestedActionsProps {
  onSelect: (text: string) => void;
  compact?: boolean;
}

export function SuggestedActions({ onSelect, compact }: SuggestedActionsProps) {
  const { suggestions } = useCopilotStore();

  const visible = compact ? suggestions.slice(0, 4) : suggestions;

  return (
    <div className={cn("flex flex-wrap gap-2", compact ? "" : "justify-center")}>
      {visible.map((action, i) => {
        const Icon = ACTION_ICONS[action.icon] || Icons.Sparkles;
        return (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(action.text)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-accent/5 transition-all",
              compact ? "text-[10px] px-2.5 py-1.5" : ""
            )}
          >
            <Icon className="h-3 w-3 text-primary" />
            {action.text}
          </motion.button>
        );
      })}
    </div>
  );
}
