"use client";

import { create } from "zustand";

interface CommandHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

interface CommandFavorite {
  id: string;
  label: string;
  icon: string;
  href?: string;
}

interface CommandState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  query: string;
  setQuery: (q: string) => void;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  activeSection: string | null;
  setActiveSection: (s: string | null) => void;
  showPreview: boolean;
  setShowPreview: (s: boolean) => void;
  previewItem: string | null;
  setPreviewItem: (id: string | null) => void;
  history: CommandHistoryItem[];
  addHistory: (query: string) => void;
  clearHistory: () => void;
  favorites: CommandFavorite[];
  addFavorite: (fav: CommandFavorite) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  voiceOpen: boolean;
  setVoiceOpen: (v: boolean) => void;
}

const STORAGE_KEY = "qe-command";

function loadPersisted(): { history: CommandHistoryItem[]; favorites: CommandFavorite[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function persist(history: CommandHistoryItem[], favorites: CommandFavorite[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ history, favorites }));
  } catch {}
}

export const useCommandStore = create<CommandState>((set, get) => {
  const persisted = loadPersisted();

  return {
    open: false,
    setOpen: (open) => set({ open, query: open ? "" : get().query, selectedIndex: 0, previewItem: null }),
    toggle: () => {
      const next = !get().open;
      set({ open: next, query: next ? "" : get().query, selectedIndex: 0, previewItem: null });
    },
    query: "",
    setQuery: (q) => set({ query: q, selectedIndex: 0, previewItem: null }),
    selectedIndex: 0,
    setSelectedIndex: (i) => set({ selectedIndex: i }),
    activeSection: null,
    setActiveSection: (s) => set({ activeSection: s }),
    showPreview: false,
    setShowPreview: (s) => set({ showPreview: s }),
    previewItem: null,
    setPreviewItem: (id) => set({ previewItem: id }),

    history: persisted?.history || [],
    addHistory: (query) =>
      set((s) => {
        const filtered = s.history.filter((h) => h.query !== query);
        const next = [{ id: crypto.randomUUID(), query, timestamp: Date.now() }, ...filtered].slice(0, 10);
        persist(next, s.favorites);
        return { history: next };
      }),
    clearHistory: () =>
      set((s) => {
        persist([], s.favorites);
        return { history: [] };
      }),

    favorites: persisted?.favorites || [],
    addFavorite: (fav) =>
      set((s) => {
        if (s.favorites.find((f) => f.id === fav.id)) return s;
        const next = [...s.favorites, fav];
        persist(s.history, next);
        return { favorites: next };
      }),
    removeFavorite: (id) =>
      set((s) => {
        const next = s.favorites.filter((f) => f.id !== id);
        persist(s.history, next);
        return { favorites: next };
      }),
    isFavorite: (id) => get().favorites.some((f) => f.id === id),

    voiceOpen: false,
    setVoiceOpen: (v) => set({ voiceOpen: v }),
  };
});
