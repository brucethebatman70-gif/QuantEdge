"use client";

import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useJournalStore, filterEntries } from "@/lib/journal/store";
import type { JournalEntry } from "@/lib/journal/types";
import { format, isToday, isYesterday, isThisWeek, parseISO } from "date-fns";

function groupEntriesByDate(entries: JournalEntry[]) {
  const groups: { label: string; entries: JournalEntry[] }[] = [];
  const map = new Map<string, JournalEntry[]>();

  for (const entry of entries) {
    const date = parseISO(entry.date);
    let label: string;
    if (isToday(date)) label = "Today";
    else if (isYesterday(date)) label = "Yesterday";
    else if (isThisWeek(date, { weekStartsOn: 1 })) label = "This Week";
    else label = format(date, "MMMM d, yyyy");

    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(entry);
  }

  for (const [label, groupEntries] of map) {
    groups.push({ label, entries: groupEntries });
  }
  return groups;
}

export function JournalSidebar() {
  const entries = useJournalStore((s) => s.entries);
  const selectedId = useJournalStore((s) => s.selectedId);
  const filter = useJournalStore((s) => s.filter);
  const sidebarOpen = useJournalStore((s) => s.sidebarOpen);
  const setSelected = useJournalStore((s) => s.setSelected);
  const setFilter = useJournalStore((s) => s.setFilter);
  const setSidebarOpen = useJournalStore((s) => s.setSidebarOpen);
  const createNewEntry = useJournalStore((s) => s.createNewEntry);

  const sortOrder = useJournalStore((s) => s.sortOrder);
  const filtered = useMemo(() => filterEntries(entries, filter, sortOrder), [entries, filter, sortOrder]);
  const groups = useMemo(() => groupEntriesByDate(filtered), [filtered]);
  const entryCount = entries.length;

  const [searchInput, setSearchInput] = useState(filter.search);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setFilter({ search: value });
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    entries.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [entries]);

  const activeTag = filter.tags[0] ?? null;

  if (!sidebarOpen) {
    return (
      <div className="flex flex-col items-center gap-2 border-r border-border bg-card pt-3">
        <Button variant="ghost" size="icon-sm" onClick={() => setSidebarOpen(true)}>
          <Icons.ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-72 flex-col border-r border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <h2 className="text-sm font-semibold">Journal</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-xs" onClick={() => setSidebarOpen(false)}>
            <Icons.ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 border-b border-border p-3">
        <Button size="sm" className="w-full" onClick={createNewEntry}>
          <Icons.Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
        <div className="relative">
          <Icons.Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search entries..."
            className="h-8 pl-8 text-xs"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-border px-3 py-2">
        {allTags.slice(0, 6).map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter({ tags: activeTag === tag ? [] : [tag] })}
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
              activeTag === tag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {tag}
          </button>
        ))}
        {allTags.length > 6 && (
          <span className="text-[10px] text-muted-foreground">+{allTags.length - 6}</span>
        )}
        {activeTag && (
          <button
            onClick={() => setFilter({ tags: [] })}
            className="ml-auto text-[10px] text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {groups.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Icons.StickyNote className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">No entries yet</p>
              <Button variant="outline" size="sm" onClick={createNewEntry}>
                Create your first entry
              </Button>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.label}>
                <div className="flex items-center px-2 py-1.5">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {group.label}
                  </span>
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    {group.entries.length}
                  </span>
                </div>
                {group.entries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setSelected(entry.id)}
                    className={cn(
                      "w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted",
                      selectedId === entry.id
                        ? "bg-muted/70 ring-1 ring-border"
                        : ""
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex-1 truncate font-medium">
                        {entry.title || "Untitled"}
                      </span>
                      {entry.psychology.emotion && (
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {emotionEmoji[entry.psychology.emotion]}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground" suppressHydrationWarning>
                        {format(parseISO(entry.date), "h:mm a")}
                      </span>
                      {entry.status === "draft" && (
                        <Badge variant="outline" className="text-[8px] px-1 py-0">
                          Draft
                        </Badge>
                      )}
                      {entry.aiScore !== null && (
                        <span
                          className={cn(
                            "ml-auto text-[10px] font-medium",
                            entry.aiScore >= 70
                              ? "text-success"
                              : entry.aiScore >= 40
                                ? "text-warning"
                                : "text-error"
                          )}
                        >
                          {entry.aiScore}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border px-3 py-2">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{entryCount} total entries</span>
          <span>{filtered.length} shown</span>
        </div>
      </div>
    </div>
  );
}

const emotionEmoji: Record<string, string> = {
  confident: "\u2705",
  neutral: "\u003C\u2013\u0022",
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
