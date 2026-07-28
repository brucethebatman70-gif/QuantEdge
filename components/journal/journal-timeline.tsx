"use client";

import { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useJournalStore } from "@/lib/journal/store";
import { format, parseISO } from "date-fns";

export function JournalTimeline() {
  const entries = useJournalStore((s) => s.entries);
  const setSelected = useJournalStore((s) => s.setSelected);

  const timeline = useMemo(() => {
    const sorted = [...entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted.slice(0, 20);
  }, [entries]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-2.5">
        <h3 className="text-xs font-semibold">Activity Timeline</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3">
          <div className="relative space-y-0">
            <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-border" />
            {timeline.map((entry, i) => (
              <button
                key={entry.id}
                onClick={() => setSelected(entry.id)}
                className="relative flex w-full gap-3 px-1 py-2.5 text-left transition-colors hover:bg-muted/50 rounded-lg"
              >
                <div
                  className={cn(
                    "relative z-10 mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ring-2 ring-card",
                    entry.aiScore !== null && entry.aiScore >= 70
                      ? "bg-success"
                      : entry.aiScore !== null && entry.aiScore >= 40
                        ? "bg-warning"
                        : "bg-muted-foreground/30"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-xs font-medium">
                      {entry.title || "Untitled"}
                    </span>
                    {entry.psychology.emotion && (
                      <span className="text-[10px] text-muted-foreground">
                        {emotionIcon[entry.psychology.emotion]}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground" suppressHydrationWarning>
                      {format(parseISO(entry.date), "MMM d, h:mm a")}
                    </span>
                    {entry.execution.mistake && (
                      <Badge variant="destructive" className="text-[8px] px-1 py-0">
                        Mistake
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {entry.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] text-muted-foreground/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

const emotionIcon: Record<string, string> = {
  confident: "\u2705",
  neutral: "\uD83D\uDE10",
  anxious: "\uD83D\uDE30",
  fomo: "\uD83D\uDE35",
  greedy: "\uD83D\uDCB0",
  fearful: "\uD83D\uDE28",
  bored: "\uD83D\uDE12",
  frustrated: "\uD83D\uDE20",
  hopeful: "\uD83D\uDE4F",
  calm: "\uD83D\uDE0C",
  aggressive: "\uD83D\uDD25",
  impatient: "\u23F3",
  patient: "\uD83E\uDDD0",
};
