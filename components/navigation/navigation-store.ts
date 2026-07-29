"use client";

import { create } from "zustand";
import type { SidebarMode, FavoriteItem, RecentPage, NotificationItem } from "./nav-types";

interface NavigationState {
  mode: SidebarMode;
  setMode: (mode: SidebarMode) => void;
  toggleMode: () => void;
  hovered: boolean;
  setHovered: (h: boolean) => void;
  collapsedSections: Set<string>;
  toggleSection: (id: string) => void;
  isSectionCollapsed: (id: string) => boolean;
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  reorderFavorites: (items: FavoriteItem[]) => void;
  isFavorite: (id: string) => boolean;
  recentPages: RecentPage[];
  addRecentPage: (page: Omit<RecentPage, "visitedAt">) => void;
  clearRecent: () => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const STORAGE_KEY = "qe-nav";

function loadPersisted(): { favorites: FavoriteItem[]; recentPages: RecentPage[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function persist(favorites: FavoriteItem[], recentPages: RecentPage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ favorites, recentPages }));
  } catch {}
}

export const useNavigationStore = create<NavigationState>((set, get) => {
  const persisted = loadPersisted();

  return {
    mode: "expanded",
    setMode: (mode) => set({ mode }),
    toggleMode: () => set((s) => ({ mode: s.mode === "expanded" ? "collapsed" : "expanded" })),
    hovered: false,
    setHovered: (h) => set({ hovered: h }),
    collapsedSections: new Set(),
    toggleSection: (id) =>
      set((s) => {
        const next = new Set(s.collapsedSections);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return { collapsedSections: next };
      }),
    isSectionCollapsed: (id) => get().collapsedSections.has(id),

    favorites: persisted?.favorites || [],
    addFavorite: (item) =>
      set((s) => {
        if (s.favorites.find((f) => f.id === item.id)) return s;
        const next = [...s.favorites, { ...item, order: s.favorites.length }];
        persist(next, s.recentPages);
        return { favorites: next };
      }),
    removeFavorite: (id) =>
      set((s) => {
        const next = s.favorites.filter((f) => f.id !== id);
        persist(next, s.recentPages);
        return { favorites: next };
      }),
    reorderFavorites: (items) =>
      set((s) => {
        const next = items.map((f, i) => ({ ...f, order: i }));
        persist(next, s.recentPages);
        return { favorites: next };
      }),
    isFavorite: (id) => get().favorites.some((f) => f.id === id),

    recentPages: persisted?.recentPages || [],
    addRecentPage: (page) =>
      set((s) => {
        const filtered = s.recentPages.filter((r) => r.href !== page.href);
        const next = [{ ...page, visitedAt: Date.now() }, ...filtered].slice(0, 5);
        persist(s.favorites, next);
        return { recentPages: next };
      }),
    clearRecent: () =>
      set((s) => {
        persist(s.favorites, []);
        return { recentPages: [] };
      }),

    notifications: [],
    unreadCount: 0,
    markRead: (id) =>
      set((s) => {
        const next = s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
        return { notifications: next, unreadCount: next.filter((n) => !n.read).length };
      }),
    markAllRead: () =>
      set((s) => ({
        notifications: s.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      })),

    searchOpen: false,
    setSearchOpen: (open) => set({ searchOpen: open }),
    commandPaletteOpen: false,
    setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  };
});
