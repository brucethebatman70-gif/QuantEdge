"use client";

import { useState, useEffect, useCallback } from "react";
import type { AnalyticsFilters, MarketType, TradingSession } from "./types";

interface AnalyticsState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filters: AnalyticsFilters;
  setFilters: (filters: Partial<AnalyticsFilters>) => void;
  resetFilters: () => void;
  compareMode: boolean;
  setCompareMode: (mode: boolean) => void;
  savedViews: { name: string; filters: AnalyticsFilters }[];
  saveView: (name: string) => void;
  loadView: (name: string) => void;
  deleteView: (name: string) => void;
}

const defaultFilters: AnalyticsFilters = {
  dateRange: null,
  account: null,
  broker: null,
  market: null,
  pair: null,
  strategy: null,
  session: null,
  direction: null,
  riskRange: null,
  tags: [],
  search: "",
};

let state: {
  activeTab: string;
  filters: AnalyticsFilters;
  compareMode: boolean;
  savedViews: { name: string; filters: AnalyticsFilters }[];
} = {
  activeTab: "overview",
  filters: { ...defaultFilters },
  compareMode: false,
  savedViews: [],
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function useAnalyticsStore(): AnalyticsState {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate((n) => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const setActiveTab = useCallback((tab: string) => {
    state = { ...state, activeTab: tab };
    notify();
  }, []);

  const setFilters = useCallback((partial: Partial<AnalyticsFilters>) => {
    state = { ...state, filters: { ...state.filters, ...partial } };
    notify();
  }, []);

  const resetFilters = useCallback(() => {
    state = { ...state, filters: { ...defaultFilters } };
    notify();
  }, []);

  const setCompareMode = useCallback((mode: boolean) => {
    state = { ...state, compareMode: mode };
    notify();
  }, []);

  const saveView = useCallback((name: string) => {
    const views = [...state.savedViews, { name, filters: { ...state.filters } }];
    state = { ...state, savedViews: views };
    notify();
  }, []);

  const loadView = useCallback((name: string) => {
    const view = state.savedViews.find((v) => v.name === name);
    if (view) {
      state = { ...state, filters: { ...view.filters } };
      notify();
    }
  }, []);

  const deleteView = useCallback((name: string) => {
    const views = state.savedViews.filter((v) => v.name !== name);
    state = { ...state, savedViews: views };
    notify();
  }, []);

  return {
    activeTab: state.activeTab,
    setActiveTab,
    filters: state.filters,
    setFilters,
    resetFilters,
    compareMode: state.compareMode,
    setCompareMode,
    savedViews: state.savedViews,
    saveView,
    loadView,
    deleteView,
  };
}
