"use client";

import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useJournalStore } from "@/lib/journal/store";
import { journalTemplates } from "@/lib/journal/mock-journal";
import type { JournalEntry, JournalTemplate, SessionType } from "@/lib/journal/types";
import { PsychologySection } from "./psychology-section";
import { ExecutionReview } from "./execution-review";
import { format, parseISO } from "date-fns";

type EditorTab = "notes" | "psychology" | "execution" | "media";

export function JournalEditor() {
  const selectedId = useJournalStore((s) => s.selectedId);
  const editingEntry = useJournalStore((s) => s.editingEntry);
  const updateEntry = useJournalStore((s) => s.updateEntry);
  const createNewEntry = useJournalStore((s) => s.createNewEntry);

  const [activeSection, setActiveSection] = useState<EditorTab>("notes");
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);

  const update = useMemo(() => {
    return (updates: Partial<JournalEntry>) => {
      if (!editingEntry) return;
      updateEntry(editingEntry.id, updates);
    };
  }, [editingEntry, updateEntry]);

  const sectionCount = useMemo(() => {
    if (!editingEntry) return 0;
    let count = 0;
    if (editingEntry.execution.lessonLearned) count++;
    if (editingEntry.psychology.emotion) count++;
    if (editingEntry.screenshots.length > 0) count++;
    return count;
  }, [editingEntry]);

  if (!selectedId || !editingEntry) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Icons.StickyNote className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <div>
            <h3 className="text-sm font-medium">No entry selected</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose an entry from the sidebar or create a new one
            </p>
          </div>
          <Button size="sm" onClick={createNewEntry}>
            <Icons.Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>
    );
  }

  const applyTemplate = (template: JournalTemplate) => {
    updateEntry(editingEntry.id, {
      content: template.sections.notes || editingEntry.content,
      psychology: {
        ...editingEntry.psychology,
        ...template.sections.psychology,
      },
      execution: {
        ...editingEntry.execution,
        ...template.sections.execution,
      },
      templateId: template.id,
    });
    setShowTemplatePicker(false);
  };

  const addTag = (tag: string) => {
    if (!editingEntry.tags.includes(tag)) {
      updateEntry(editingEntry.id, { tags: [...editingEntry.tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    updateEntry(editingEntry.id, { tags: editingEntry.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b border-border px-5 py-3">
        <div className="flex-1 space-y-2">
          <input
            className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-muted-foreground/40"
            placeholder="Entry title..."
            value={editingEntry.title}
            onChange={(e) => updateEntry(editingEntry.id, { title: e.target.value })}
          />
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground" suppressHydrationWarning>
              {format(parseISO(editingEntry.date), "MMMM d, yyyy h:mm a")}
            </span>
            <Badge variant={editingEntry.status === "published" ? "success" : "outline"} className="text-[9px] px-1.5 py-0">
              {editingEntry.status}
            </Badge>
            {sectionCount > 0 && (
              <span className="text-[10px] text-muted-foreground">{sectionCount} sections complete</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => updateEntry(editingEntry.id, { status: editingEntry.status === "draft" ? "published" : "draft" })}
            title={editingEntry.status === "draft" ? "Publish" : "Unpublish"}
          >
            {editingEntry.status === "draft" ? (
              <Icons.CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Icons.CheckCircle2 className="h-4 w-4 text-success" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowTemplatePicker(!showTemplatePicker)}
            title="Apply template"
          >
            <Icons.FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showTemplatePicker && (
        <div className="border-b border-border bg-muted/30 px-5 py-3">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-medium">Choose a Template</h4>
            <Button variant="ghost" size="icon-xs" onClick={() => setShowTemplatePicker(false)}>
              <Icons.X className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {journalTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template)}
                className={cn(
                  "rounded-lg border p-2.5 text-left transition-colors hover:bg-muted",
                  editingEntry.templateId === template.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                )}
              >
                <p className="text-xs font-medium">{template.name}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{template.description}</p>
                <Badge variant="secondary" className="mt-1 text-[8px] px-1 py-0">
                  {template.setup}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex border-b border-border">
        {[
          { value: "notes" as const, label: "Notes", icon: Icons.StickyNote },
          { value: "psychology" as const, label: "Psychology", icon: Icons.Smile },
          { value: "execution" as const, label: "Execution", icon: Icons.Target },
          { value: "media" as const, label: "Media", icon: Icons.Image },
        ].map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setActiveSection(value)}
            className={cn(
              "flex items-center gap-1.5 border-b-2 px-4 py-2 text-[11px] font-medium transition-colors",
              activeSection === value
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-5">
          {activeSection === "notes" && (
            <NotesSection
              content={editingEntry.content}
              marketConditions={editingEntry.marketConditions}
              session={editingEntry.session}
              tags={editingEntry.tags}
              linkedTrades={editingEntry.linkedTrades}
              onContentChange={(content) => updateEntry(editingEntry.id, { content })}
              onMarketConditionsChange={(v) => updateEntry(editingEntry.id, { marketConditions: v })}
              onSessionChange={(v) => updateEntry(editingEntry.id, { session: v as JournalEntry["session"] })}
              onAddTag={addTag}
              onRemoveTag={removeTag}
            />
          )}
          {activeSection === "psychology" && (
            <PsychologySection
              psychology={editingEntry.psychology}
              onChange={(psychology) => updateEntry(editingEntry.id, { psychology })}
            />
          )}
          {activeSection === "execution" && (
            <ExecutionReview
              execution={editingEntry.execution}
              onChange={(execution) => updateEntry(editingEntry.id, { execution })}
            />
          )}
          {activeSection === "media" && (
            <MediaSection
              screenshots={editingEntry.screenshots}
              voiceNotes={editingEntry.voiceNotes}
              onScreenshotsChange={(screenshots) => updateEntry(editingEntry.id, { screenshots })}
              onVoiceNotesChange={(voiceNotes) => updateEntry(editingEntry.id, { voiceNotes })}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function NotesSection({
  content,
  marketConditions,
  session,
  tags,
  linkedTrades,
  onContentChange,
  onMarketConditionsChange,
  onSessionChange,
  onAddTag,
  onRemoveTag,
}: {
  content: string;
  marketConditions: string;
  session: string;
  tags: string[];
  linkedTrades: string[];
  onContentChange: (v: string) => void;
  onMarketConditionsChange: (v: string) => void;
  onSessionChange: (v: SessionType) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}) {
  const [tagInput, setTagInput] = useState("");

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center gap-0.5 rounded-lg border border-border p-1">
        {[
          { icon: Icons.Bold, action: "bold", label: "Bold" },
          { icon: Icons.Italic, action: "italic", label: "Italic" },
          { icon: Icons.List, action: "ul", label: "Bullet List" },
          { icon: Icons.ListOrdered, action: "ol", label: "Numbered List" },
        ].map(({ icon: Icon, action, label }) => (
          <button
            key={action}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            title={label}
            onClick={() => {
              const ta = document.querySelector(".journal-textarea") as HTMLTextAreaElement;
              if (!ta) return;
              const start = ta.selectionStart;
              const end = ta.selectionEnd;
              const selected = content.substring(start, end);
              let insert = "";
              switch (action) {
                case "bold": insert = `**${selected || "bold"}**`; break;
                case "italic": insert = `*${selected || "italic"}*`; break;
                case "ul": insert = selected ? `\n- ${selected.split("\n").join("\n- ")}` : "\n- item"; break;
                case "ol": insert = selected ? `\n1. ${selected.split("\n").join("\n2. ")}` : "\n1. item"; break;
              }
              const newContent = content.substring(0, start) + insert + content.substring(end);
              onContentChange(newContent);
              setTimeout(() => { ta.focus(); ta.setSelectionRange(start, start + insert.length); }, 0);
            }}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
        <Separator orientation="vertical" className="mx-1 h-5" />
        <button
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          title="Heading"
          onClick={() => {
            const ta = document.querySelector(".journal-textarea") as HTMLTextAreaElement;
            if (!ta) return;
            const start = ta.selectionStart;
            const insert = "\n## ";
            const newContent = content.substring(0, start) + insert + content.substring(ta.selectionEnd);
            onContentChange(newContent);
            setTimeout(() => { ta.focus(); ta.setSelectionRange(start + insert.length, start + insert.length); }, 0);
          }}
        >
          <Icons.Hash className="h-3.5 w-3.5" />
        </button>
      </div>

      <textarea
        className="journal-textarea min-h-[300px] w-full resize-none rounded-lg border border-border bg-transparent p-4 font-mono text-xs leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring"
        placeholder="Write your journal entry in markdown..."
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />

      <div className="flex flex-wrap gap-4">
        <div className="min-w-[160px] flex-1">
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Market Conditions</label>
          <input
            className="h-8 w-full rounded-lg border border-border bg-transparent px-2.5 text-xs placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="e.g., Risk-on, low VIX"
            value={marketConditions}
            onChange={(e) => onMarketConditionsChange(e.target.value)}
          />
        </div>
        <div className="min-w-[120px]">
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Session</label>
          <select
            className="h-8 w-full rounded-lg border border-border bg-transparent px-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            value={session}
            onChange={(e) => onSessionChange(e.target.value as SessionType)}
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="overnight">Overnight</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Tags</label>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
            >
              {tag}
              <button onClick={() => onRemoveTag(tag)} className="hover:text-error">&times;</button>
            </span>
          ))}
          <input
            className="h-6 min-w-[80px] flex-1 rounded-lg border border-border bg-transparent px-2 text-[10px] placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Add tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tagInput.trim()) {
                onAddTag(tagInput.trim());
                setTagInput("");
              }
            }}
          />
        </div>
      </div>

      {linkedTrades.length > 0 && (
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Linked Trades</label>
          <div className="flex flex-wrap gap-1">
            {linkedTrades.map((tid) => (
              <Badge key={tid} variant="secondary" className="text-[9px]">
                <Icons.Link className="mr-1 h-2.5 w-2.5" />
                Trade #{tid}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MediaSection({
  screenshots,
  voiceNotes,
  onScreenshotsChange,
  onVoiceNotesChange,
}: {
  screenshots: JournalEntry["screenshots"];
  voiceNotes: JournalEntry["voiceNotes"];
  onScreenshotsChange: (v: JournalEntry["screenshots"]) => void;
  onVoiceNotesChange: (v: JournalEntry["voiceNotes"]) => void;
}) {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h4 className="mb-3 text-xs font-medium text-muted-foreground">Screenshots</h4>
        {screenshots.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-center">
            <Icons.Camera className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">No screenshots attached</p>
            <Button variant="outline" size="sm">
              <Icons.Upload className="mr-2 h-3 w-3" />
              Upload Screenshots
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {screenshots.map((ss) => (
              <div key={ss.id} className="group relative overflow-hidden rounded-lg border border-border">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Icons.Image className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <div className="p-2">
                  <p className="text-[10px] text-muted-foreground truncate">{ss.caption}</p>
                  <Badge variant="secondary" className="mt-1 text-[8px] px-1 py-0">{ss.type}</Badge>
                </div>
                <button
                  onClick={() => onScreenshotsChange(screenshots.filter((s) => s.id !== ss.id))}
                  className="absolute right-1.5 top-1.5 hidden rounded-md bg-background/80 p-1 text-error hover:bg-background group-hover:block"
                >
                  <Icons.Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                onScreenshotsChange([
                  ...screenshots,
                  {
                    id: crypto.randomUUID(),
                    url: "/placeholder.svg",
                    caption: "New screenshot",
                    type: "chart",
                    uploadedAt: new Date().toISOString(),
                  },
                ])
              }
              className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <Icons.Plus className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-xs font-medium text-muted-foreground">Voice Notes</h4>
        {voiceNotes.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-center">
            <Icons.Mic className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">No voice recordings</p>
            <Button variant="outline" size="sm" disabled>
              <Icons.Mic className="mr-2 h-3 w-3" />
              Record (coming soon)
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {voiceNotes.map((vn) => (
              <div key={vn.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Icons.Mic className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs">{vn.transcript}</p>
                  <p className="text-[10px] text-muted-foreground">{vn.duration}s</p>
                </div>
                <Button variant="ghost" size="icon-xs">
                  <Icons.Volume2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
