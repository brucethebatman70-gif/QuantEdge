"use client";

import { cn } from "@/lib/cn";
import type { Emotion, JournalPsychology } from "@/lib/journal/types";

const emotions: { value: Emotion; label: string; icon: string; color: string }[] = [
  { value: "confident", label: "Confident", icon: "\uD83D\uDE0E", color: "text-success" },
  { value: "calm", label: "Calm", icon: "\uD83D\uDE0C", color: "text-info" },
  { value: "neutral", label: "Neutral", icon: "\uD83D\uDE10", color: "text-muted-foreground" },
  { value: "hopeful", label: "Hopeful", icon: "\uD83D\uDE4F", color: "text-primary" },
  { value: "aggressive", label: "Aggressive", icon: "\uD83D\uDD25", color: "text-error" },
  { value: "anxious", label: "Anxious", icon: "\uD83D\uDE30", color: "text-warning" },
  { value: "fomo", label: "FOMO", icon: "\uD83D\uDE35", color: "text-error" },
  { value: "greedy", label: "Greedy", icon: "\uD83D\uDCB0", color: "text-warning" },
  { value: "fearful", label: "Fearful", icon: "\uD83D\uDE28", color: "text-warning" },
  { value: "bored", label: "Bored", icon: "\uD83D\uDE12", color: "text-muted-foreground" },
  { value: "frustrated", label: "Frustrated", icon: "\uD83D\uDE20", color: "text-error" },
  { value: "impatient", label: "Impatient", icon: "\u23F3", color: "text-warning" },
  { value: "patient", label: "Patient", icon: "\uD83E\uDDD0", color: "text-primary" },
];

interface PsychologySectionProps {
  psychology: JournalPsychology;
  onChange: (psychology: JournalPsychology) => void;
}

export function PsychologySection({ psychology, onChange }: PsychologySectionProps) {
  const update = (partial: Partial<JournalPsychology>) => {
    onChange({ ...psychology, ...partial });
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <h4 className="mb-2 text-xs font-medium text-muted-foreground">Emotion</h4>
        <div className="grid grid-cols-6 gap-1.5">
          {emotions.map((em) => (
            <button
              key={em.value}
              onClick={() => update({ emotion: psychology.emotion === em.value ? null : em.value })}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg border p-2 text-xs transition-all",
                psychology.emotion === em.value
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-border hover:border-muted-foreground/30"
              )}
              title={em.label}
            >
              <span className="text-base">{em.icon}</span>
              <span className={cn("text-[10px] font-medium", em.color)}>{em.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SliderField label="Energy" value={psychology.energyLevel} onChange={(v) => update({ energyLevel: v })} />
        <SliderField label="Confidence" value={psychology.confidence} onChange={(v) => update({ confidence: v })} />
        <SliderField label="Discipline" value={psychology.discipline} onChange={(v) => update({ discipline: v })} />
      </div>

      <div>
        <h4 className="mb-1.5 text-xs font-medium text-muted-foreground">Notes</h4>
        <textarea
          className="min-h-[60px] w-full resize-none rounded-lg border border-border bg-transparent p-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="How were you feeling during this trade?"
          value={psychology.notes}
          onChange={(e) => update({ notes: e.target.value })}
        />
      </div>

      <div>
        <h4 className="mb-1.5 text-xs font-medium text-muted-foreground">Triggers</h4>
        <div className="flex flex-wrap gap-1">
          {psychology.triggers.map((trigger, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px]"
            >
              {trigger}
              <button
                onClick={() => update({ triggers: psychology.triggers.filter((_, j) => j !== i) })}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </span>
          ))}
          <input
            className="min-w-[80px] flex-1 rounded-lg border border-border bg-transparent px-2 py-0.5 text-[10px] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Add trigger..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                update({ triggers: [...psychology.triggers, e.currentTarget.value.trim()] });
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SliderField({
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
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{label}</span>
        <span className="text-[10px] font-medium">{value}/10</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
      />
      <div className="flex justify-between text-[8px] text-muted-foreground">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}
