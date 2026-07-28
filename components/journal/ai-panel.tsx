"use client";

import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useJournalStore } from "@/lib/journal/store";
import type { JournalEntry } from "@/lib/journal/types";

export function AiPanel() {
  const aiPanelOpen = useJournalStore((s) => s.aiPanelOpen);
  const setAiPanelOpen = useJournalStore((s) => s.setAiPanelOpen);
  const selectedId = useJournalStore((s) => s.selectedId);
  const entries = useJournalStore((s) => s.entries);
  const [tab, setTab] = useState<"insights" | "summary" | "suggest">("insights");

  const entry = useMemo(() => entries.find((e) => e.id === selectedId), [entries, selectedId]);

  if (!aiPanelOpen) {
    return (
      <div className="flex flex-col items-center gap-2 border-l border-border bg-card pt-3">
        <Button variant="ghost" size="icon-sm" onClick={() => setAiPanelOpen(true)}>
          <Icons.PanelRightOpen className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-64 flex-col border-l border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Icons.Brain className="h-3.5 w-3.5 text-primary" />
          <h2 className="text-xs font-semibold">AI Assistant</h2>
        </div>
        <Button variant="ghost" size="icon-xs" onClick={() => setAiPanelOpen(false)}>
          <Icons.PanelRightClose className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex border-b border-border">
        {[
          { value: "insights" as const, label: "Insights", icon: Icons.Sparkle },
          { value: "summary" as const, label: "Summary", icon: Icons.FileText },
          { value: "suggest" as const, label: "Suggest", icon: Icons.MessageSquare },
        ].map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 border-b-2 px-2 py-2 text-[10px] font-medium transition-colors",
              tab === value
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3">
          {!selectedId || !entry ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Icons.Brain className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">
                Select an entry to analyze
              </p>
            </div>
          ) : tab === "insights" ? (
            <InsightsView entry={entry} />
          ) : tab === "summary" ? (
            <SummaryView entry={entry} />
          ) : (
            <SuggestView entry={entry} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function InsightsView({ entry }: { entry: JournalEntry }) {
  const insights = useMemo(() => generateInsights(entry), [entry]);

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-medium text-muted-foreground">Quality Score</span>
          <span
            className={cn(
              "text-lg font-bold",
              (entry.aiScore ?? 50) >= 70
                ? "text-success"
                : (entry.aiScore ?? 50) >= 40
                  ? "text-warning"
                  : "text-error"
            )}
          >
            {entry.aiScore ?? "—"}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              (entry.aiScore ?? 50) >= 70
                ? "bg-success"
                : (entry.aiScore ?? 50) >= 40
                  ? "bg-warning"
                  : "bg-error"
            )}
            style={{ width: `${entry.aiScore ?? 50}%` }}
          />
        </div>
      </div>

      {entry.aiSummary && (
        <div className="rounded-lg border border-border p-3">
          <h4 className="mb-1.5 text-[10px] font-medium text-muted-foreground">AI Analysis</h4>
          <p className="text-[11px] leading-relaxed text-foreground/80">
            {entry.aiSummary}
          </p>
        </div>
      )}

      {insights.map((insight, i) => (
        <div
          key={i}
          className={cn(
            "rounded-lg border p-3",
            insight.type === "positive"
              ? "border-success/20 bg-success/5"
              : insight.type === "negative"
                ? "border-error/20 bg-error/5"
                : "border-primary/20 bg-primary/5"
          )}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <span
              className={cn(
                "text-xs",
                insight.type === "positive"
                  ? "text-success"
                  : insight.type === "negative"
                    ? "text-error"
                    : "text-primary"
              )}
            >
              {insight.type === "positive" ? "✦" : insight.type === "negative" ? "!" : "i"}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              {insight.type === "positive" ? "Positive" : insight.type === "negative" ? "Warning" : "Tip"}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-foreground/80">{insight.text}</p>
        </div>
      ))}
    </div>
  );
}

function SummaryView({ entry }: { entry: JournalEntry }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border p-3">
        <h4 className="mb-1.5 text-[10px] font-medium text-muted-foreground">Entry Info</h4>
        <dl className="space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <dt className="text-muted-foreground">Status</dt>
            <dd className="font-medium capitalize">{entry.status}</dd>
          </div>
          <div className="flex justify-between text-[11px]">
            <dt className="text-muted-foreground">Session</dt>
            <dd className="font-medium capitalize">{entry.session}</dd>
          </div>
          <div className="flex justify-between text-[11px]">
            <dt className="text-muted-foreground">Market</dt>
            <dd className="font-medium truncate max-w-[120px]">{entry.marketConditions || "—"}</dd>
          </div>
          <div className="flex justify-between text-[11px]">
            <dt className="text-muted-foreground">Emotion</dt>
            <dd className="font-medium capitalize">{entry.psychology.emotion ?? "—"}</dd>
          </div>
          <div className="flex justify-between text-[11px]">
            <dt className="text-muted-foreground">Followed Plan</dt>
            <dd className={cn("font-medium", entry.execution.planFollowed ? "text-success" : "text-error")}>
              {entry.execution.planFollowed ? "Yes" : "No"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-lg border border-border p-3">
        <h4 className="mb-1.5 text-[10px] font-medium text-muted-foreground">Scores</h4>
        <dl className="space-y-1.5">
          <ScoreRow label="Energy" value={entry.psychology.energyLevel} max={10} />
          <ScoreRow label="Confidence" value={entry.psychology.confidence} max={10} />
          <ScoreRow label="Discipline" value={entry.psychology.discipline} max={10} />
          <ScoreRow label="Entry" value={entry.execution.entryTiming} max={5} />
          <ScoreRow label="Exit" value={entry.execution.exitTiming} max={5} />
          <ScoreRow label="Risk" value={entry.execution.riskManagement} max={5} />
        </dl>
      </div>

      {entry.tags.length > 0 && (
        <div className="rounded-lg border border-border p-3">
          <h4 className="mb-1.5 text-[10px] font-medium text-muted-foreground">Tags</h4>
          <div className="flex flex-wrap gap-1">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center justify-between text-[11px]">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="flex items-center gap-1.5">
        <div className="h-1.5 w-16 rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full",
              pct >= 70 ? "bg-success" : pct >= 40 ? "bg-warning" : "bg-error"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="w-5 text-right font-medium">{value}</span>
      </dd>
    </div>
  );
}

function SuggestView({ entry }: { entry: JournalEntry }) {
  const suggestions = useMemo(() => generateSuggestions(entry), [entry]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => setSelectedSuggestion(selectedSuggestion === i ? null : i)}
          className={cn(
            "w-full rounded-lg border p-3 text-left transition-colors",
            selectedSuggestion === i
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/30"
          )}
        >
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-xs">{s.icon}</span>
            <div>
              <p className="text-[11px] font-medium">{s.title}</p>
              {selectedSuggestion === i && (
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function generateInsights(entry: JournalEntry) {
  const insights: { type: "positive" | "negative" | "info"; text: string }[] = [];

  if (entry.execution.planFollowed) {
    insights.push({
      type: "positive",
      text: "You followed your trading plan \u2014 discipline is the foundation of consistent results.",
    });
  } else {
    insights.push({
      type: "negative",
      text: "Plan deviation detected. Review what caused the breakdown and how to prevent it.",
    });
  }

  if (entry.psychology.emotion === "fomo" || entry.psychology.emotion === "greedy" || entry.psychology.emotion === "impatient") {
    insights.push({
      type: "negative",
      text: `"${entry.psychology.emotion}" emotion detected. This is associated with poor decision-making. Take a break after such trades.`,
    });
  }

  if (entry.psychology.emotion === "confident" || entry.psychology.emotion === "calm") {
    insights.push({
      type: "positive",
      text: `Optimal trading mindset. "${entry.psychology.emotion}" emotions correlate with better outcomes.`,
    });
  }

  if (entry.execution.lessonLearned && entry.execution.lessonLearned.length > 20) {
    insights.push({
      type: "positive",
      text: "You documented a lesson. Reviewing these before each session reinforces learning.",
    });
  }

  if (entry.screenshots.length === 0) {
    insights.push({
      type: "info",
      text: "Adding chart screenshots helps identify visual patterns you might miss in text notes.",
    });
  }

  if (entry.execution.mistake) {
    insights.push({
      type: "negative",
      text: `Mistake: ${entry.execution.mistake}. Track recurring mistakes to identify patterns.`,
    });
  }

  return insights;
}

function generateSuggestions(entry: JournalEntry) {
  const suggestions: { icon: string; title: string; description: string }[] = [];

  if (!entry.execution.planFollowed) {
    suggestions.push({
      icon: "\uD83D\uDCCB",
      title: "Create a Pre-Trade Checklist",
      description: "Traders who use checklists before entry have 23% higher win rates. Create a 5-point checklist based on your playbook rules.",
    });
  }

  if (entry.psychology.notes.length < 10) {
    suggestions.push({
      icon: "\uD83E\uDDD0",
      title: "Deepen Psychology Notes",
      description: "Write at least 2-3 sentences about your emotional state. Pattern recognition in psychology is a leading indicator for performance.",
    });
  }

  if (!entry.execution.lessonLearned) {
    suggestions.push({
      icon: "\uD83D\uDCD6",
      title: "Document a Lesson",
      description: "Every trade has something to teach. Even winning trades reveal insights. Write one thing you'll do differently.",
    });
  }

  suggestions.push({
    icon: "\uD83D\uDCC8",
    title: "Review Related Trades",
    description: `You have ${entry.linkedTrades.length} linked trades. Reviewing them together reveals patterns in entries, exits, and market context.`,
  });

  suggestions.push({
    icon: "\uD83C\uDFAF",
    title: "Set Improvement Goal",
    description: "Based on this entry, set one specific goal for your next session. Example: 'Wait for candle close before entry.'",
  });

  return suggestions;
}
