"use client";

import { useState, useEffect, useMemo } from "react";
import type { CalendarState, CalendarViewType, CalendarEvent, CalendarDay, CalendarFilters, AiCalendarInsight } from "./types";
import { getCalendarEvents, generateCalendarDays, generateAiInsights } from "./mock-calendar";

interface CalendarStoreState extends CalendarState {
  events: CalendarEvent[];
  days: CalendarDay[];
  insights: AiCalendarInsight[];
  filteredEvents: CalendarEvent[];
}

interface CalendarStoreActions {
  setView: (view: CalendarViewType) => void;
  setCurrentDate: (date: Date) => void;
  goToToday: () => void;
  goNext: () => void;
  goPrev: () => void;
  selectEvent: (id: string | null) => void;
  selectDate: (date: string | null) => void;
  setFilters: (partial: Partial<CalendarFilters>) => void;
  setSidebarOpen: (open: boolean) => void;
  setHeatmapMetric: (metric: "pnl" | "winRate" | "frequency" | "discipline" | "consistency") => void;
  toggleSync: () => void;
}

export type CalendarStore = CalendarStoreState & CalendarStoreActions;

let state: CalendarStoreState = {
  view: "month",
  currentDate: new Date(),
  selectedEventId: null,
  selectedDate: null,
  filters: { search: "", types: [], symbols: [], tags: [], pnlRange: null, mood: null },
  syncEnabled: false,
  sidebarOpen: true,
  heatmapMetric: "pnl",
  events: [],
  days: [],
  insights: [],
  filteredEvents: [],
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((l) => l());
}

function setState(partial: Partial<CalendarStoreState>) {
  state = { ...state, ...partial };
  emitChange();
}

function reloadData(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const events = getCalendarEvents(year, month);
  const days = generateCalendarDays(year, month, events);
  const insights = generateAiInsights(days);
  setState({ events, days, insights, filteredEvents: filterEvents(events, state.filters) });
}

function filterEvents(events: CalendarEvent[], filters: CalendarFilters): CalendarEvent[] {
  let filtered = [...events];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (e) => e.title.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q) || e.symbol?.toLowerCase().includes(q) || e.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.types.length > 0) {
    filtered = filtered.filter((e) => filters.types.includes(e.type));
  }

  if (filters.symbols.length > 0) {
    filtered = filtered.filter((e) => e.symbol && filters.symbols.includes(e.symbol));
  }

  if (filters.tags.length > 0) {
    filtered = filtered.filter((e) => e.tags?.some((t) => filters.tags.includes(t)));
  }

  if (filters.mood) {
    filtered = filtered.filter((e) => e.mood === filters.mood);
  }

  return filtered;
}

const actions: CalendarStoreActions = {
  setView: (view) => { setState({ view }); },
  setCurrentDate: (date) => { setState({ currentDate: date }); reloadData(date); },
  goToToday: () => {
    const today = new Date();
    setState({ currentDate: today });
    reloadData(today);
  },
  goNext: () => {
    const d = new Date(state.currentDate);
    if (state.view === "month") d.setMonth(d.getMonth() + 1);
    else if (state.view === "week") d.setDate(d.getDate() + 7);
    else if (state.view === "day") d.setDate(d.getDate() + 1);
    else if (state.view === "quarter") d.setMonth(d.getMonth() + 3);
    else if (state.view === "year") d.setFullYear(d.getFullYear() + 1);
    else if (state.view === "agenda") d.setMonth(d.getMonth() + 1);
    else if (state.view === "timeline") d.setMonth(d.getMonth() + 3);
    setState({ currentDate: d });
    reloadData(d);
  },
  goPrev: () => {
    const d = new Date(state.currentDate);
    if (state.view === "month") d.setMonth(d.getMonth() - 1);
    else if (state.view === "week") d.setDate(d.getDate() - 7);
    else if (state.view === "day") d.setDate(d.getDate() - 1);
    else if (state.view === "quarter") d.setMonth(d.getMonth() - 3);
    else if (state.view === "year") d.setFullYear(d.getFullYear() - 1);
    else if (state.view === "agenda") d.setMonth(d.getMonth() - 1);
    else if (state.view === "timeline") d.setMonth(d.getMonth() - 3);
    setState({ currentDate: d });
    reloadData(d);
  },
  selectEvent: (id) => { setState({ selectedEventId: id }); },
  selectDate: (date) => { setState({ selectedDate: date, selectedEventId: null }); },
  setFilters: (partial) => {
    const newFilters = { ...state.filters, ...partial };
    setState({ filters: newFilters, filteredEvents: filterEvents(state.events, newFilters) });
  },
  setSidebarOpen: (open) => { setState({ sidebarOpen: open }); },
  setHeatmapMetric: (metric) => { setState({ heatmapMetric: metric }); },
  toggleSync: () => { setState({ syncEnabled: !state.syncEnabled }); },
};

function buildProxy(): CalendarStore {
  return new Proxy({} as CalendarStore, {
    get(_, prop: string | symbol) {
      const key = String(prop);
      if (key in actions) return (actions as unknown as Record<string, unknown>)[key];
      return (state as unknown as Record<string, unknown>)[key];
    },
  });
}

export function useCalendarStore(): CalendarStore;
export function useCalendarStore<T>(selector: (store: CalendarStore) => T): T;
export function useCalendarStore<T>(selector?: (store: CalendarStore) => T): T | CalendarStore {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((n) => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const proxy = useMemo(() => buildProxy(), []);

  useEffect(() => { reloadData(new Date()); }, []);

  return selector ? selector(proxy) : proxy;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function getWeekDays(date: Date): Date[] {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export function formatMonthLabel(year: number, month: number): string {
  return new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function isToday(dateStr: string): boolean {
  const today = new Date();
  const d = new Date(dateStr);
  return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
