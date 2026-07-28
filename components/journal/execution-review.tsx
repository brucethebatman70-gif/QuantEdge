"use client";

import { cn } from "@/lib/cn";
import type { JournalExecution, MistakeType } from "@/lib/journal/types";

const mistakes: { value: MistakeType; label: string; color: string }[] = [
  { value: "fomo", label: "FOMO Entry", color: "text-error" },
  { value: "early_entry", label: "Early Entry", color: "text-warning" },
  { value: "late_exit", label: "Late Exit", color: "text-warning" },
  { value: "oversized", label: "Oversized", color: "text-error" },
  { value: "no_stop", label: "No Stop Loss", color: "text-error" },
  { value: "chased", label: "Chased Price", color: "text-error" },
  { value: "revenge", label: "Revenge Trade", color: "text-error" },
  { value: "overtrading", label: "Overtrading", color: "text-warning" },
  { value: "missed_setup", label: "Missed Setup", color: "text-info" },
  { value: "deviation", label: "Plan Deviation", color: "text-warning" },
];

interface ExecutionReviewProps {
  execution: JournalExecution;
  onChange: (execution: JournalExecution) => void;
}

export function ExecutionReview({ execution, onChange }: ExecutionReviewProps) {
  const update = (partial: Partial<JournalExecution>) => {
    onChange({ ...execution, ...partial });
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-muted-foreground">Followed Plan</span>
        <button
          onClick={() => update({ planFollowed: !execution.planFollowed })}
          className={cn(
            "relative inline-flex h-6 w-10 items-center rounded-full transition-colors",
            execution.planFollowed ? "bg-success" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              execution.planFollowed ? "translate-x-5" : "translate-x-1"
            )}
          />
        </button>
        <span className={cn("text-xs font-medium", execution.planFollowed ? "text-success" : "text-error")}>
          {execution.planFollowed ? "Yes" : "No"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <RatingField label="Entry Timing" value={execution.entryTiming} onChange={(v) => update({ entryTiming: v })} />
        <RatingField label="Exit Timing" value={execution.exitTiming} onChange={(v) => update({ exitTiming: v })} />
        <RatingField label="Risk Mgmt" value={execution.riskManagement} onChange={(v) => update({ riskManagement: v })} />
      </div>

      <div>
        <h4 className="mb-1.5 text-xs font-medium text-muted-foreground">Mistake (if any)</h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => update({ mistake: null, mistakeNote: "" })}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] transition-colors",
              !execution.mistake
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-muted-foreground/30"
            )}
          >
            None
          </button>
          {mistakes.map((m) => (
            <button
              key={m.value}
              onClick={() => update({ mistake: execution.mistake === m.value ? null : m.value })}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10px] transition-colors",
                execution.mistake === m.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground/30"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {execution.mistake && (
        <div>
          <h4 className="mb-1.5 text-xs font-medium text-muted-foreground">Mistake Details</h4>
          <textarea
            className="min-h-[50px] w-full resize-none rounded-lg border border-border bg-transparent p-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Describe what went wrong..."
            value={execution.mistakeNote}
            onChange={(e) => update({ mistakeNote: e.target.value })}
          />
        </div>
      )}

      <div>
        <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="text-success">✦</span> Lesson Learned
        </h4>
        <textarea
          className="min-h-[60px] w-full resize-none rounded-lg border border-border bg-transparent p-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="What will you do differently next time?"
          value={execution.lessonLearned}
          onChange={(e) => update({ lessonLearned: e.target.value })}
        />
      </div>
    </div>
  );
}

function RatingField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={cn(
              "h-5 w-5 rounded-sm text-xs transition-colors",
              star <= value
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground/40"
            )}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
