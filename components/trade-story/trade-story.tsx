"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useJournalStore } from "@/lib/journal/store";
import type { JournalEntry, Emotion } from "@/lib/journal/types";
import { TRADE_STAGES, type TradeStage, type PreTradeChecklist, type PostTradeReview, type SetupGrade } from "./story-types";
import { MoodSliderPanel } from "./mood-slider";

function StageIcon({ stage, completed }: { stage: string; completed: boolean }) {
  const s = TRADE_STAGES.find((t) => t.id === stage);
  const Icon = Icons[s?.icon as keyof typeof Icons] || Icons.HelpCircle;
  return (
    <div className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
      completed ? "bg-primary/15 shadow-[0_0_12px_rgba(0,212,170,0.15)]" : "bg-white/[0.03]"
    )}>
      <Icon className={cn("w-4 h-4", completed ? "text-primary" : "text-muted-foreground/30")} />
    </div>
  );
}

function TimelineConnector({ active, index, total }: { active: boolean; index: number; total: number }) {
  if (index === total - 1) return null;
  return (
    <div className="absolute left-5 top-10 bottom-0 w-px">
      <div className={cn(
        "h-full transition-all duration-500",
        active ? "bg-gradient-to-b from-primary/40 to-primary/10" : "bg-white/[0.04]"
      )} />
    </div>
  );
}

function StageCard({ children, stage, isOpen, onToggle, completed }: {
  children: React.ReactNode;
  stage: TradeStage;
  isOpen: boolean;
  onToggle: () => void;
  completed: boolean;
}) {
  const meta = TRADE_STAGES.find((s) => s.id === stage)!;
  const Icon = Icons[meta.icon as keyof typeof Icons] || Icons.HelpCircle;

  return (
    <div className="relative pl-14">
      <TimelineConnector active={completed} index={TRADE_STAGES.findIndex((s) => s.id === stage)} total={TRADE_STAGES.length} />
      <button
        onClick={onToggle}
        className="absolute left-0 top-0 z-10"
      >
        <StageIcon stage={stage} completed={completed} />
      </button>
      <motion.div
        layout
        className={cn(
          "rounded-xl border transition-all duration-200 overflow-hidden",
          isOpen
            ? "bg-white/[0.03] border-white/[0.08]"
            : "bg-transparent border-transparent hover:bg-white/[0.02] cursor-pointer"
        )}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <div className="flex items-center gap-3">
            <Icon className={cn("w-4 h-4", meta.color)} />
            <div>
              <span className="text-[13px] font-medium text-foreground/80">{meta.label}</span>
              <span className="text-[11px] text-muted-foreground/50 ml-2">{meta.description}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icons.ChevronDown className="w-4 h-4 text-muted-foreground/40" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-4 pb-4 pt-1 border-t border-white/[0.04]">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ChecklistItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "flex w-full items-center gap-3 px-3 py-2 rounded-lg text-[12px] transition-all",
        checked ? "bg-success/5 text-success/90" : "bg-white/[0.02] text-foreground/60 hover:bg-white/[0.04]"
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
        checked ? "bg-success border-success" : "border-border/50"
      )}>
        {checked && <Icons.Check className="w-3 h-3 text-white" />}
      </div>
      {label}
    </button>
  );
}

function PreparationStage({ entry, updateEntry }: { entry: JournalEntry; updateEntry: (u: Partial<JournalEntry>) => void }) {
  const checklist = entry.execution.planFollowed;
  return (
    <div className="space-y-2">
      <p className="text-[11px] text-muted-foreground/50 mb-1">Complete before entering a trade</p>
      <ChecklistItem label="Market structure confirmed" checked={entry.session === "morning"} onChange={() => {}} />
      <ChecklistItem label="Trend direction identified" checked={true} onChange={() => {}} />
      <ChecklistItem label="Liquidity sufficient" checked={true} onChange={() => {}} />
      <ChecklistItem label="Session aligned with strategy" checked={true} onChange={() => {}} />
      <ChecklistItem label="Risk % within limits" checked={true} onChange={() => {}} />
      <ChecklistItem label="R:R ratio acceptable" checked={true} onChange={() => {}} />
      <ChecklistItem label="News checked" checked={false} onChange={() => {}} />
      <div className="mt-2">
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Market Conditions</label>
        <input
          value={entry.marketConditions}
          onChange={(e) => updateEntry({ marketConditions: e.target.value })}
          placeholder="Describe current market conditions..."
          className="w-full h-9 px-3 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-white/[0.12] transition-colors"
        />
      </div>
    </div>
  );
}

function MarketAnalysisStage({ entry, updateEntry }: { entry: JournalEntry; updateEntry: (u: Partial<JournalEntry>) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Session</label>
        <div className="flex gap-1.5">
          {(["morning", "afternoon", "overnight"] as const).map((s) => (
            <button
              key={s}
              onClick={() => updateEntry({ session: s })}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all",
                entry.session === s ? "bg-white/[0.08] text-foreground" : "text-muted-foreground/50 hover:text-foreground/70 bg-white/[0.02]"
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Analysis Notes</label>
        <textarea
          value="Price is trading above VWAP with increasing volume. Key resistance at previous day high. Support at 20 EMA."
          readOnly
          className="w-full h-20 px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground/60 resize-none"
        />
      </div>
    </div>
  );
}

function EntryStage({ entry, updateEntry }: { entry: JournalEntry; updateEntry: (u: Partial<JournalEntry>) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Setup Type</label>
          <input
            value={entry.tags[0] || ""}
            placeholder="e.g. Breakout, Pullback"
            className="w-full h-9 px-3 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-white/[0.12]"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Entry Timing</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => updateEntry({ execution: { ...entry.execution, entryTiming: n } })}
                className={cn(
                  "flex-1 h-9 rounded-lg text-[11px] font-medium transition-all",
                  entry.execution.entryTiming >= n ? "bg-success/15 text-success" : "bg-white/[0.03] text-muted-foreground/30"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Entry Notes</label>
        <input
          value={entry.content.split("\n")[0] || ""}
          onChange={(e) => updateEntry({ content: e.target.value + "\n" + entry.content.split("\n").slice(1).join("\n") })}
          placeholder="Describe your entry..."
          className="w-full h-9 px-3 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-white/[0.12]"
        />
      </div>
    </div>
  );
}

function ManagementStage({ entry, updateEntry }: { entry: JournalEntry; updateEntry: (u: Partial<JournalEntry>) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Risk Management</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => updateEntry({ execution: { ...entry.execution, riskManagement: n } })}
              className={cn(
                "flex-1 h-9 rounded-lg text-[11px] font-medium transition-all",
                entry.execution.riskManagement >= n ? "bg-success/15 text-success" : "bg-white/[0.03] text-muted-foreground/30"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Management Notes</label>
        <textarea
          placeholder="How did you manage the trade? Did you trail stops, scale out, add to position?"
          className="w-full h-16 px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 resize-none focus:outline-none focus:border-white/[0.12]"
        />
      </div>
    </div>
  );
}

function ExitStage({ entry, updateEntry }: { entry: JournalEntry; updateEntry: (u: Partial<JournalEntry>) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Exit Timing</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => updateEntry({ execution: { ...entry.execution, exitTiming: n } })}
              className={cn(
                "flex-1 h-9 rounded-lg text-[11px] font-medium transition-all",
                entry.execution.exitTiming >= n ? "bg-success/15 text-success" : "bg-white/[0.03] text-muted-foreground/30"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Exit Notes</label>
        <textarea
          placeholder="Why did you exit? Did you hit your target, stop loss, or exit manually?"
          className="w-full h-16 px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 resize-none focus:outline-none focus:border-white/[0.12]"
        />
      </div>
    </div>
  );
}

function EmotionStage({ entry, updateEntry }: { entry: JournalEntry; updateEntry: (u: Partial<JournalEntry>) => void }) {
  return (
    <MoodSliderPanel
      emotion={entry.psychology.emotion}
      energyLevel={entry.psychology.energyLevel}
      confidence={entry.psychology.confidence}
      discipline={entry.psychology.discipline}
      onEmotionChange={(e) => updateEntry({ psychology: { ...entry.psychology, emotion: e } })}
      onEnergyChange={(v) => updateEntry({ psychology: { ...entry.psychology, energyLevel: v } })}
      onConfidenceChange={(v) => updateEntry({ psychology: { ...entry.psychology, confidence: v } })}
      onDisciplineChange={(v) => updateEntry({ psychology: { ...entry.psychology, discipline: v } })}
    />
  );
}

function ReflectionStage({ entry, updateEntry }: { entry: JournalEntry; updateEntry: (u: Partial<JournalEntry>) => void }) {
  const mistakes = [
    { value: "fomo" as const, label: "FOMO Entry" },
    { value: "early_entry" as const, label: "Early Entry" },
    { value: "late_exit" as const, label: "Late Exit" },
    { value: "oversized" as const, label: "Oversized Risk" },
    { value: "no_stop" as const, label: "No Stop Loss" },
    { value: "chased" as const, label: "Chased Price" },
    { value: "revenge" as const, label: "Revenge Trade" },
    { value: "overtrading" as const, label: "Overtrading" },
    { value: "deviation" as const, label: "Plan Deviation" },
  ];
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Did you follow your plan?</label>
        <div className="flex gap-1.5">
          <button
            onClick={() => updateEntry({ execution: { ...entry.execution, planFollowed: true } })}
            className={cn("px-4 py-2 rounded-lg text-[11px] font-medium transition-all", entry.execution.planFollowed ? "bg-success/15 text-success" : "bg-white/[0.03] text-muted-foreground/50")}
          >
            <Icons.CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5" />Yes
          </button>
          <button
            onClick={() => updateEntry({ execution: { ...entry.execution, planFollowed: false } })}
            className={cn("px-4 py-2 rounded-lg text-[11px] font-medium transition-all", !entry.execution.planFollowed ? "bg-error/15 text-error" : "bg-white/[0.03] text-muted-foreground/50")}
          >
            <Icons.XCircle className="w-3.5 h-3.5 inline mr-1.5" />No
          </button>
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Mistakes</label>
        <div className="flex flex-wrap gap-1.5">
          {mistakes.map((m) => (
            <button
              key={m.value}
              onClick={() => updateEntry({ execution: { ...entry.execution, mistake: entry.execution.mistake === m.value ? null : m.value } })}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all",
                entry.execution.mistake === m.value ? "bg-error/15 text-error" : "bg-white/[0.03] text-muted-foreground/50 hover:text-foreground/70"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      {entry.execution.mistake && (
        <div>
          <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Mistake Details</label>
          <textarea
            value={entry.execution.mistakeNote}
            onChange={(e) => updateEntry({ execution: { ...entry.execution, mistakeNote: e.target.value } })}
            placeholder="What happened? What could you have done differently?"
            className="w-full h-16 px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 resize-none focus:outline-none focus:border-white/[0.12]"
          />
        </div>
      )}
    </div>
  );
}

function AiReviewStage({ entry }: { entry: JournalEntry }) {
  const score = entry.aiScore ?? 0;
  const grade: SetupGrade = {
    grade: score >= 90 ? "A+" : score >= 80 ? "A" : score >= 65 ? "B" : score >= 45 ? "C" : "D",
    execution: entry.execution.entryTiming,
    rr: score >= 70 ? 4 : 2,
    discipline: entry.psychology.discipline,
    timing: Math.round((entry.execution.entryTiming + entry.execution.exitTiming) / 2),
    rules: entry.execution.planFollowed ? 4 : 1,
    psychology: entry.psychology.emotion && ["confident", "calm", "patient"].includes(entry.psychology.emotion) ? 4 : 2,
  };

  const gradeColors: Record<string, string> = { "A+": "text-success", A: "text-success", B: "text-primary", C: "text-warning", D: "text-error" };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <span className={cn("text-3xl font-bold", gradeColors[grade.grade])}>{grade.grade}</span>
          <span className="text-[10px] text-muted-foreground/50 mt-0.5">Grade</span>
        </div>
        <div className="flex-1 space-y-1.5">
          {[
            { label: "Execution", value: entry.execution.entryTiming, max: 5 },
            { label: "R:R Ratio", value: grade.rr, max: 5 },
            { label: "Discipline", value: entry.psychology.discipline, max: 5 },
            { label: "Timing", value: grade.timing, max: 5 },
            { label: "Rules", value: grade.rules, max: 5 },
            { label: "Psychology", value: grade.psychology, max: 5 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground/50 w-16 shrink-0">{item.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / item.max) * 100}%` }}
                  className={cn("h-full rounded-full", item.value >= 4 ? "bg-success" : item.value >= 3 ? "bg-warning" : "bg-error")}
                />
              </div>
              <span className="text-[10px] text-muted-foreground/50 w-4 text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      {entry.aiSummary && (
        <div className="p-3 rounded-lg bg-accent/5 border border-accent/10">
          <p className="text-[11px] text-foreground/70 leading-relaxed">{entry.aiSummary}</p>
        </div>
      )}
    </div>
  );
}

function LessonsStage({ entry, updateEntry }: { entry: JournalEntry; updateEntry: (u: Partial<JournalEntry>) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Key Lesson</label>
        <textarea
          value={entry.execution.lessonLearned}
          onChange={(e) => updateEntry({ execution: { ...entry.execution, lessonLearned: e.target.value } })}
          placeholder="What is the most important thing you learned from this trade?"
          className="w-full h-16 px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 resize-none focus:outline-none focus:border-white/[0.12]"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">One Improvement</label>
          <input
            placeholder="What would you do differently?"
            className="w-full h-9 px-3 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-white/[0.12]"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-muted-foreground/60 block mb-1.5">Next Objective</label>
          <input
            placeholder="What will you focus on next?"
            className="w-full h-9 px-3 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-white/[0.12]"
          />
        </div>
      </div>
    </div>
  );
}

export function TradeStory() {
  const selectedId = useJournalStore((s) => s.selectedId);
  const editingEntry = useJournalStore((s) => s.editingEntry);
  const updateEntry = useJournalStore((s) => s.updateEntry);
  const [openStages, setOpenStages] = useState<Set<TradeStage>>(new Set(["preparation"]));

  const toggleStage = (stage: TradeStage) => {
    setOpenStages((prev) => {
      const next = new Set(prev);
      if (next.has(stage)) next.delete(stage);
      else next.add(stage);
      return next;
    });
  };

  if (!selectedId || !editingEntry) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03]">
            <Icons.StickyNote className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground/80">No entry selected</h3>
            <p className="mt-1 text-xs text-muted-foreground/50">Choose an entry from the sidebar or create a new one</p>
          </div>
        </div>
      </div>
    );
  }

  const update = (partial: Partial<JournalEntry>) => updateEntry(editingEntry.id, partial);

  const stages: { stage: TradeStage; component: React.ReactNode }[] = [
    { stage: "preparation", component: <PreparationStage entry={editingEntry} updateEntry={update} /> },
    { stage: "market_analysis", component: <MarketAnalysisStage entry={editingEntry} updateEntry={update} /> },
    { stage: "entry", component: <EntryStage entry={editingEntry} updateEntry={update} /> },
    { stage: "management", component: <ManagementStage entry={editingEntry} updateEntry={update} /> },
    { stage: "exit", component: <ExitStage entry={editingEntry} updateEntry={update} /> },
    { stage: "emotion", component: <EmotionStage entry={editingEntry} updateEntry={update} /> },
    { stage: "reflection", component: <ReflectionStage entry={editingEntry} updateEntry={update} /> },
    { stage: "ai_review", component: <AiReviewStage entry={editingEntry} /> },
    { stage: "lessons", component: <LessonsStage entry={editingEntry} updateEntry={update} /> },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <input
              className="bg-transparent text-sm font-semibold outline-none text-foreground/80 placeholder:text-muted-foreground/30 min-w-0 flex-1"
              placeholder="Trade title..."
              value={editingEntry.title}
              onChange={(e) => update({ title: e.target.value })}
            />
            {editingEntry.aiScore !== null && (
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                editingEntry.aiScore >= 80 ? "bg-success/10 text-success" : editingEntry.aiScore >= 50 ? "bg-warning/10 text-warning" : "bg-error/10 text-error"
              )}>
                {editingEntry.aiScore}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-muted-foreground/40">{new Date(editingEntry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
            <span className={cn(
              "text-[9px] px-1.5 py-0.5 rounded-full font-medium",
              editingEntry.status === "published" ? "bg-success/10 text-success" : "bg-white/[0.04] text-muted-foreground/50"
            )}>
              {editingEntry.status}
            </span>
            <div className="flex gap-0.5">
              {editingEntry.tags.slice(0, 3).map((t) => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-4">
          <button
            onClick={() => update({ status: editingEntry.status === "draft" ? "published" : "draft" })}
            className={cn("flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all", editingEntry.status === "published" ? "bg-success/10 text-success" : "bg-white/[0.04] text-muted-foreground/60")}
          >
            <Icons.CheckCircle2 className="w-3.5 h-3.5" />
            {editingEntry.status === "published" ? "Published" : "Draft"}
          </button>
        </div>
      </div>

      {/* Timeline Stages */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-2 max-w-3xl mx-auto">
          {stages.map(({ stage, component }) => (
            <StageCard
              key={stage}
              stage={stage}
              isOpen={openStages.has(stage)}
              onToggle={() => toggleStage(stage)}
              completed={openStages.has(stage)}
            >
              {component}
            </StageCard>
          ))}
        </div>
      </div>
    </div>
  );
}
