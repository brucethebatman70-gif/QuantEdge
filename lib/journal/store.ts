"use client";

import { useState, useEffect, useMemo } from "react";
import type { JournalEntry, JournalFilter, SortOrder } from "./types";
import { mockJournalEntries } from "./mock-journal";

interface JournalState {
  entries: JournalEntry[];
  selectedId: string | null;
  filter: JournalFilter;
  sortOrder: SortOrder;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  editorMode: "write" | "preview" | "ai";
  editingEntry: JournalEntry | null;
}

interface JournalActions {
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

export type JournalStore = JournalState & JournalActions;

let state: JournalState = {
  entries: mockJournalEntries,
  selectedId: null,
  filter: {
    dateRange: null,
    tags: [],
    emotions: [],
    status: "all",
    session: "all",
    search: "",
  },
  sortOrder: "newest",
  sidebarOpen: true,
  aiPanelOpen: false,
  editorMode: "write",
  editingEntry: null,
};

const reactListeners = new Set<() => void>();

function emitChange() {
  reactListeners.forEach((l) => l());
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

function setState(partial: Partial<JournalState>) {
  state = { ...state, ...partial };
  emitChange();
}

function setStateWithUpdater(updater: (prev: JournalState) => JournalState) {
  state = updater(state);
  emitChange();
}

const actions: JournalActions = {
  setSelected: (id) => {
    const editingEntry = id ? state.entries.find((e) => e.id === id) ?? null : null;
    setState({ selectedId: id, editingEntry });
  },
  setFilter: (filter) => setStateWithUpdater((s) => ({ ...s, filter: { ...s.filter, ...filter } })),
  setSortOrder: (order) => setState({ sortOrder: order }),
  setSidebarOpen: (open) => setState({ sidebarOpen: open }),
  setAiPanelOpen: (open) => setState({ aiPanelOpen: open }),
  setEditorMode: (mode) => setState({ editorMode: mode }),
  setEditingEntry: (entry) => setState({ editingEntry: entry }),
  addEntry: (entry) => setStateWithUpdater((s) => ({ ...s, entries: [entry, ...s.entries] })),
  updateEntry: (id, updates) =>
    setStateWithUpdater((s) => {
      const now = new Date().toISOString();
      return {
        ...s,
        entries: s.entries.map((e) => (e.id === id ? { ...e, ...updates, updatedAt: now } : e)),
        editingEntry:
          s.editingEntry?.id === id ? { ...s.editingEntry, ...updates, updatedAt: now } : s.editingEntry,
      };
    }),
  deleteEntry: (id) =>
    setStateWithUpdater((s) => ({
      ...s,
      entries: s.entries.filter((e) => e.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
      editingEntry: s.editingEntry?.id === id ? null : s.editingEntry,
    })),
  createNewEntry: () => {
    const entry = createEmptyEntry();
    actions.addEntry(entry);
    setState({ selectedId: entry.id, editingEntry: entry, sidebarOpen: false });
    return entry.id;
  },
};

function buildProxy(): JournalStore {
  return new Proxy({}, {
    get(_, prop: string | symbol) {
      const key = String(prop);
      if (key in actions) return (actions as unknown as Record<string, unknown>)[key];
      return (state as unknown as Record<string, unknown>)[key];
    },
  }) as unknown as JournalStore;
}

export function useJournalStore(): JournalStore;
export function useJournalStore<T>(selector: (store: JournalStore) => T): T;
export function useJournalStore<T>(selector?: (store: JournalStore) => T): T | JournalStore {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((n) => n + 1);
    reactListeners.add(listener);
    return () => { reactListeners.delete(listener); };
  }, []);

  const proxy = useMemo(() => buildProxy(), []);

  return selector ? selector(proxy) : proxy;
}
