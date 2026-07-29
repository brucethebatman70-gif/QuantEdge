"use client";

import { useState, useEffect, useCallback } from "react";
import type { BacktestStoreState } from "./types";

interface BacktestingState extends BacktestStoreState {
  setActiveTab: (tab: string) => void;
  setSelectedStrategyId: (id: string | null) => void;
  setSelectedResultId: (id: string | null) => void;
  toggleCompareId: (id: string) => void;
  clearCompare: () => void;
}

let state: BacktestStoreState = {
  activeTab: "strategies",
  selectedStrategyId: null,
  selectedResultId: null,
  compareIds: [],
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function useBacktestingStore(): BacktestingState {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate((n) => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const setActiveTab = useCallback((tab: string) => { state = { ...state, activeTab: tab }; notify(); }, []);
  const setSelectedStrategyId = useCallback((id: string | null) => { state = { ...state, selectedStrategyId: id }; notify(); }, []);
  const setSelectedResultId = useCallback((id: string | null) => { state = { ...state, selectedResultId: id }; notify(); }, []);
  const toggleCompareId = useCallback((id: string) => {
    const ids = state.compareIds.includes(id) ? state.compareIds.filter((i) => i !== id) : [...state.compareIds, id];
    state = { ...state, compareIds: ids };
    notify();
  }, []);
  const clearCompare = useCallback(() => { state = { ...state, compareIds: [] }; notify(); }, []);

  return {
    ...state, setActiveTab, setSelectedStrategyId, setSelectedResultId, toggleCompareId, clearCompare,
  };
}
