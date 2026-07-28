"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ImportProgressProps {
  progress: number;
  total: number;
  imported: number;
  skipped: number;
  failed: number;
  onCancel: () => void;
}

export function ImportProgress({ progress, total, imported, skipped, failed, onCancel }: ImportProgressProps) {
  const estimated = Math.max(5, Math.round((total - imported - skipped - failed) * 0.15));
  const remaining = total - imported - skipped - failed;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative mb-8">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--muted)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none"
            stroke="var(--primary)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - progress / 100) }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{progress}%</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Importing Trades</h3>
      <p className="text-sm text-muted-foreground mb-6">Estimated time: ~{estimated}s remaining</p>

      <div className="w-full max-w-sm mb-6">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: total, color: "text-foreground" },
          { label: "Imported", value: imported, color: "text-success" },
          { label: "Skipped", value: skipped, color: "text-warning" },
          { label: "Failed", value: failed, color: "text-error" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center rounded-xl border border-border/50 p-3 min-w-[70px]">
            <span className={cn("text-lg font-bold", item.color)}>{item.value}</span>
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={onCancel} className="text-error hover:text-error">
        <Icons.X className="mr-1.5 h-3.5 w-3.5" /> Cancel Import
      </Button>
    </div>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
