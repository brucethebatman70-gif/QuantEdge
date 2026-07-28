import { create } from "zustand";
import type { JournalEntry, JournalFilter, SortOrder } from "./types";
import { mockJournalEntries } from "./mock-journal";

interface JournalStore {
  entries: JournalEntry[];
  selectedId: string | null;
  filter: JournalFilter;
  sortOrder: SortOrder;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  editorMode: "write" | "preview" | "ai";
  editingEntry: JournalEntry | null;

  setSelected: (id: string | null) => void;
  setFilter: (filter: Partial<JournalFilter>) => void;
  setSortOrder: (order: SortOrder) => void;
  setSidebarOpen: (open: boolean) => void;
  setAiPanelOpen: (open: boolean) => void;
  setEditorMode: (mode: "write" | "preview" | "ai") => void;
  setEditingEntry: (entry: JournalEntry | null) => void;

  addEntry: (entry: JournalEntry) => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  createNewEntry: () => string;
}

function defaultFilter(): JournalFilter {
  return {
    dateRange: null,
    tags: [],
    emotions: [],
    status: "all",
    session: "all",
    search: "",
  };
}

function createEmptyEntry(): JournalEntry {
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    title: "",
    content: "",
    status: "draft",
    tags: [],
    session: "morning",
    marketConditions: "",
    psychology: {
      emotion: null,
      energyLevel: 5,
      confidence: 5,
      discipline: 5,
      notes: "",
      triggers: [],
    },
    execution: {
      planFollowed: true,
      entryTiming: 3,
      exitTiming: 3,
      riskManagement: 3,
      mistake: null,
      mistakeNote: "",
      lessonLearned: "",
    },
    screenshots: [],
    voiceNotes: [],
    linkedTrades: [],
    linkedReplays: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    templateId: null,
    aiSummary: null,
    aiScore: null,
  };
}

export function filterEntries(
  entries: JournalEntry[],
  filter: JournalFilter,
  sortOrder: SortOrder
): JournalEntry[] {
  let filtered = entries;

  if (filter.status !== "all") {
    filtered = filtered.filter((e) => e.status === filter.status);
  }
  if (filter.session !== "all") {
    filtered = filtered.filter((e) => e.session === filter.session);
  }
  if (filter.tags.length > 0) {
    filtered = filtered.filter((e) => filter.tags.some((t) => e.tags.includes(t)));
  }
  if (filter.emotions.length > 0) {
    filtered = filtered.filter(
      (e) => e.psychology.emotion && filter.emotions.includes(e.psychology.emotion)
    );
  }
  if (filter.search) {
    const q = filter.search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.content.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (filter.dateRange) {
    const [start, end] = filter.dateRange;
    filtered = filtered.filter((e) => e.date >= start && e.date <= end);
  }

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
    return sortOrder === "newest" ? diff : -diff;
  });

  return sorted;
}

export const useJournalStore = create<JournalStore>((set, get) => ({
  entries: mockJournalEntries,
  selectedId: null,
  filter: defaultFilter(),
  sortOrder: "newest",
  sidebarOpen: true,
  aiPanelOpen: false,
  editorMode: "write",
  editingEntry: null,

  setSelected: (id) =>
    set({
      selectedId: id,
      editingEntry: id ? get().entries.find((e) => e.id === id) ?? null : null,
    }),
  setFilter: (filter) => set((s) => ({ filter: { ...s.filter, ...filter } })),
  setSortOrder: (order) => set({ sortOrder: order }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setAiPanelOpen: (open) => set({ aiPanelOpen: open }),
  setEditorMode: (mode) => set({ editorMode: mode }),
  setEditingEntry: (entry) => set({ editingEntry: entry }),

  addEntry: (entry) => set((s) => ({ entries: [entry, ...s.entries] })),
  updateEntry: (id, updates) =>
    set((s) => ({
      entries: s.entries.map((e) =>
        e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
      ),
      editingEntry:
        s.editingEntry?.id === id
          ? { ...s.editingEntry, ...updates, updatedAt: new Date().toISOString() }
          : s.editingEntry,
    })),
  deleteEntry: (id) =>
    set((s) => ({
      entries: s.entries.filter((e) => e.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
      editingEntry: s.editingEntry?.id === id ? null : s.editingEntry,
    })),

  createNewEntry: () => {
    const entry = createEmptyEntry();
    get().addEntry(entry);
    set({ selectedId: entry.id, editingEntry: entry, sidebarOpen: false });
    return entry.id;
  },
}));
