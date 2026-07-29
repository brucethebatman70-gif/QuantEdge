"use client";

import { useState, useEffect, useMemo } from "react";
import type { GoalsState, Goal, GoalCategory, GoalType, GoalStatus } from "./types";
import { mockGoals, mockHabits, mockAchievements, mockKpis, mockAiCoachMessages } from "./mock-goals";

interface GoalsStoreActions {
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (cat: GoalCategory | null) => void;
  setSelectedType: (type: GoalType | null) => void;
  setStatusFilter: (status: GoalStatus | "all") => void;
  setSearch: (search: string) => void;
  updateGoalProgress: (id: string, current: number) => void;
  addGoal: (goal: Goal) => void;
  toggleHabit: (habitId: string, dayIndex: number) => void;
}

export type GoalsStore = GoalsState & GoalsStoreActions;

let state: GoalsState = {
  goals: mockGoals,
  habits: mockHabits,
  achievements: mockAchievements,
  kpis: mockKpis,
  aiCoachMessages: mockAiCoachMessages,
  activeTab: "overview",
  selectedCategory: null,
  selectedType: null,
  statusFilter: "all",
  search: "",
};

const listeners = new Set<() => void>();

function emitChange() { listeners.forEach((l) => l()); }
function setState(partial: Partial<GoalsState>) { state = { ...state, ...partial }; emitChange(); }

const actions: GoalsStoreActions = {
  setActiveTab: (tab) => setState({ activeTab: tab }),
  setSelectedCategory: (cat) => setState({ selectedCategory: cat }),
  setSelectedType: (type) => setState({ selectedType: type }),
  setStatusFilter: (status) => setState({ statusFilter: status }),
  setSearch: (search) => setState({ search }),
  updateGoalProgress: (id, current) => {
    const updated = state.goals.map((g) => g.id === id ? { ...g, current: Math.min(current, g.target) } : g);
    setState({ goals: updated });
  },
  addGoal: (goal) => setState({ goals: [...state.goals, goal] }),
  toggleHabit: (habitId, dayIndex) => {
    const updated = state.habits.map((h) => {
      if (h.id !== habitId) return h;
      const monthly = [...h.monthlyData];
      monthly[dayIndex] = !monthly[dayIndex];
      const streak = monthly.slice().reverse().findIndex((v) => !v);
      return { ...h, monthlyData: monthly, streak: streak === 0 ? 0 : streak === -1 ? monthly.length : streak };
    });
    setState({ habits: updated });
  },
};

function buildProxy(): GoalsStore {
  return new Proxy({} as GoalsStore, {
    get(_, prop: string | symbol) {
      const key = String(prop);
      if (key in actions) return (actions as unknown as Record<string, unknown>)[key];
      return (state as unknown as Record<string, unknown>)[key];
    },
  });
}

export function useGoalsStore(): GoalsStore;
export function useGoalsStore<T>(selector: (store: GoalsStore) => T): T;
export function useGoalsStore<T>(selector?: (store: GoalsStore) => T): T | GoalsStore {
  const [, setTick] = useState(0);
  useEffect(() => { const l = () => setTick((n) => n + 1); listeners.add(l); return () => { listeners.delete(l); }; }, []);
  const proxy = useMemo(() => buildProxy(), []);
  return selector ? selector(proxy) : proxy;
}
