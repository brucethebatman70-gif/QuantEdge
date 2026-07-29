"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Emotion } from "@/lib/journal/types";

interface MoodOption {
  value: Emotion;
  emoji: string;
  label: string;
  color: string;
  gradient: string;
}

const MOODS: MoodOption[] = [
  { value: "confident", emoji: "😎", label: "Confident", color: "text-success", gradient: "from-success/20 to-success/5" },
  { value: "calm", emoji: "😌", label: "Calm", color: "text-info", gradient: "from-info/20 to-info/5" },
  { value: "neutral", emoji: "😐", label: "Neutral", color: "text-muted-foreground", gradient: "from-muted/20 to-muted/5" },
  { value: "hopeful", emoji: "🙏", label: "Hopeful", color: "text-primary", gradient: "from-primary/20 to-primary/5" },
  { value: "patient", emoji: "🧐", label: "Patient", color: "text-primary", gradient: "from-primary/20 to-primary/5" },
  { value: "aggressive", emoji: "🔥", label: "Aggressive", color: "text-error", gradient: "from-error/20 to-error/5" },
  { value: "anxious", emoji: "😰", label: "Anxious", color: "text-warning", gradient: "from-warning/20 to-warning/5" },
  { value: "fomo", emoji: "😵", label: "FOMO", color: "text-error", gradient: "from-error/20 to-error/5" },
  { value: "greedy", emoji: "💰", label: "Greedy", color: "text-warning", gradient: "from-warning/20 to-warning/5" },
  { value: "fearful", emoji: "😨", label: "Fearful", color: "text-warning", gradient: "from-warning/20 to-warning/5" },
  { value: "frustrated", emoji: "😠", label: "Frustrated", color: "text-error", gradient: "from-error/20 to-error/5" },
  { value: "impatient", emoji: "⏳", label: "Impatient", color: "text-warning", gradient: "from-warning/20 to-warning/5" },
  { value: "bored", emoji: "😒", label: "Bored", color: "text-muted-foreground", gradient: "from-muted/20 to-muted/5" },
];

function MoodPill({ mood, selected, onSelect }: { mood: MoodOption; selected: boolean; onSelect: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium transition-all border",
        selected
          ? "bg-white/[0.08] border-white/[0.12] shadow-sm"
          : "bg-white/[0.02] border-transparent hover:bg-white/[0.04] hover:border-white/[0.06] text-muted-foreground/70"
      )}
    >
      <motion.span
        animate={selected ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="text-lg"
      >
        {mood.emoji}
      </motion.span>
      <span className={selected ? mood.color : "text-muted-foreground/60"}>{mood.label}</span>
    </motion.button>
  );
}

function MoodSlider({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const emoji = value <= 3 ? "😟" : value <= 5 ? "😐" : value <= 7 ? "🙂" : "😄";
  const gradient = value <= 3 ? "from-error/30 to-error/10"
    : value <= 5 ? "from-warning/30 to-warning/10"
    : value <= 7 ? "from-info/30 to-info/10"
    : "from-success/30 to-success/10";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground/60">{label}</span>
        <motion.span
          key={value}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm"
        >
          {emoji}
        </motion.span>
      </div>
      <div className={cn("relative h-8 rounded-xl overflow-hidden", `bg-gradient-to-r ${gradient}`)}>
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          {[1, 3, 5, 7, 10].map((n) => (
            <span key={n} className={cn("text-[9px] font-bold", value >= n ? "text-foreground/50" : "text-foreground/20")}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface MoodSliderPanelProps {
  emotion: Emotion | null;
  energyLevel: number;
  confidence: number;
  discipline: number;
  onEmotionChange: (e: Emotion | null) => void;
  onEnergyChange: (v: number) => void;
  onConfidenceChange: (v: number) => void;
  onDisciplineChange: (v: number) => void;
}

export function MoodSliderPanel({
  emotion, energyLevel, confidence, discipline,
  onEmotionChange, onEnergyChange, onConfidenceChange, onDisciplineChange,
}: MoodSliderPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {MOODS.map((mood) => (
          <MoodPill
            key={mood.value}
            mood={mood}
            selected={emotion === mood.value}
            onSelect={() => onEmotionChange(emotion === mood.value ? null : mood.value)}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MoodSlider label="Energy" value={energyLevel} onChange={onEnergyChange} />
        <MoodSlider label="Confidence" value={confidence} onChange={onConfidenceChange} />
        <MoodSlider label="Discipline" value={discipline} onChange={onDisciplineChange} />
      </div>
    </div>
  );
}
