"use client";

import { useState, useEffect, useMemo } from "react";
import type { Playbook, PlaybookCategory, PlaybookFilter, Difficulty, PlaybookMarket, AiAnalysis } from "./types";
import { mockPlaybooks } from "./mock-playbooks";

interface PlaybookState {
  playbooks: Playbook[];
  selectedId: string | null;
  sidebarCategory: PlaybookCategory | "all";
  filter: PlaybookFilter;
  rightPanel: "ai" | "performance" | "versions";
  isLibraryView: boolean;
}

interface PlaybookActions {
  setSelectedPlaybook: (id: string | null) => void;
  setSidebarCategory: (category: PlaybookCategory | "all") => void;
  setFilter: (partial: Partial<PlaybookFilter>) => void;
  setRightPanel: (panel: "ai" | "performance" | "versions") => void;
  setIsLibraryView: (view: boolean) => void;
  updatePlaybook: (id: string, updates: Partial<Playbook>) => void;
  toggleFavorite: (id: string) => void;
  addPlaybook: (playbook: Playbook) => void;
  deletePlaybook: (id: string) => void;
  duplicatePlaybook: (id: string) => void;
  analyzePlaybook: (id: string) => AiAnalysis;
}

export type PlaybookStore = PlaybookState & PlaybookActions;

let state: PlaybookState = {
  playbooks: mockPlaybooks,
  selectedId: null,
  sidebarCategory: "all",
  filter: { search: "", category: "all", difficulty: "all", market: "all", tags: [] },
  rightPanel: "ai",
  isLibraryView: true,
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((l) => l());
}

function setState(partial: Partial<PlaybookState>) {
  state = { ...state, ...partial };
  emitChange();
}

function generateAiAnalysis(playbook: Playbook): AiAnalysis {
  const setup = playbook.setup;
  const hasEntry = setup.entryRules.length > 0;
  const hasExit = setup.takeProfitRules.length > 0;
  const hasSL = setup.stopLossRules.length > 0;
  const hasChecklist = setup.checklist.length > 0;
  const hasMistakes = setup.commonMistakes.length > 0;
  const hasRisk = setup.riskRules.length > 0;
  const missing: string[] = [];
  if (!hasEntry) missing.push("Entry rules");
  if (!hasExit) missing.push("Take profit rules");
  if (!hasSL) missing.push("Stop loss rules");
  if (!hasChecklist) missing.push("Pre-trade checklist");
  if (!hasMistakes) missing.push("Common mistakes");
  if (!hasRisk) missing.push("Risk management rules");
  if (!setup.marketConditions) missing.push("Market conditions");

  const totalFields = 10;
  const filledFields = [hasEntry, hasExit, hasSL, hasChecklist, hasMistakes, hasRisk, !!setup.marketConditions, setup.confirmationRules.length > 0, setup.invalidationRules.length > 0, setup.managementRules.length > 0].filter(Boolean).length;
  const completeness = filledFields / totalFields;

  return {
    summary: `${playbook.title} is a ${playbook.difficulty}-level ${playbook.category} strategy with a ${playbook.winRate}% win rate over ${playbook.totalTrades} trades. ${completeness >= 0.7 ? "The setup is well-documented with clear rules." : "Some sections need more detail to be production-ready."}`,
    suggestions: [
      ...(playbook.examples.length === 0 ? ["Add winning and losing trade examples to validate the strategy"] : []),
      ...(playbook.totalTrades < 100 ? ["Consider more backtesting data — current sample size is limited"] : []),
      ...(playbook.consistencyScore < 70 ? ["Focus on consistency — the score suggests room for improvement in execution"] : []),
    ],
    weaknesses: [
      ...(playbook.maxDrawdown > 15 ? [`Max drawdown of ${playbook.maxDrawdown}% is higher than ideal — review risk management`] : []),
      ...(playbook.consistencyScore < 70 ? ["Consistency score below 70 — review if rules are being followed correctly"] : []),
      ...(playbook.expectancy < 1 ? ["Expectancy below 1.0 — strategy may not be profitable over many trades"] : []),
    ],
    missingRules: missing,
    reviewQuestions: [
      "Does this strategy work in both trending and ranging markets?",
      "What happens during high-impact news events?",
      "How does this perform across different market sessions?",
      "What is the maximum consecutive loss streak?",
      ...(hasMistakes ? [] : ["What are the most common mistakes traders make with this setup?"]),
      ...(hasRisk ? [] : ["What are the specific risk parameters for each trade?"]),
    ],
    confidenceScore: Math.round(completeness * 100),
  };
}

const actions: PlaybookActions = {
  setSelectedPlaybook: (id) => {
    setState({ selectedId: id, isLibraryView: id === null });
  },
  setSidebarCategory: (category) => {
    setState({ sidebarCategory: category, filter: { ...state.filter, category } });
  },
  setFilter: (partial) => {
    setState({ filter: { ...state.filter, ...partial } });
  },
  setRightPanel: (panel) => {
    setState({ rightPanel: panel });
  },
  setIsLibraryView: (view) => {
    setState({ isLibraryView: view });
  },
  updatePlaybook: (id, updates) => {
    setState({
      playbooks: state.playbooks.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      ),
    });
  },
  toggleFavorite: (id) => {
    setState({
      playbooks: state.playbooks.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ),
    });
  },
  addPlaybook: (playbook) => {
    setState({ playbooks: [playbook, ...state.playbooks] });
  },
  deletePlaybook: (id) => {
    setState({
      playbooks: state.playbooks.filter((p) => p.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    });
  },
  duplicatePlaybook: (id) => {
    const original = state.playbooks.find((p) => p.id === id);
    if (!original) return;
    const copy: Playbook = {
      ...original,
      id: `pb_${crypto.randomUUID().slice(0, 8)}`,
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      versions: [
        ...original.versions,
        { id: crypto.randomUUID(), version: original.versions.length + 1, timestamp: new Date().toISOString(), changes: "Duplicated from original" },
      ],
    };
    setState({ playbooks: [copy, ...state.playbooks] });
  },
  analyzePlaybook: (id) => {
    const playbook = state.playbooks.find((p) => p.id === id);
    if (!playbook) return { summary: "Playbook not found", suggestions: [], weaknesses: [], missingRules: [], reviewQuestions: [], confidenceScore: 0 };
    return generateAiAnalysis(playbook);
  },
};

function buildProxy(): PlaybookStore {
  return new Proxy({} as PlaybookStore, {
    get(_, prop: string | symbol) {
      const key = String(prop);
      if (key in actions) return (actions as unknown as Record<string, unknown>)[key];
      return (state as unknown as Record<string, unknown>)[key];
    },
  });
}

export function usePlaybookStore(): PlaybookStore;
export function usePlaybookStore<T>(selector: (store: PlaybookStore) => T): T;
export function usePlaybookStore<T>(selector?: (store: PlaybookStore) => T): T | PlaybookStore {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((n) => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const proxy = useMemo(() => buildProxy(), []);

  return selector ? selector(proxy) : proxy;
}

export function filterPlaybooks(playbooks: Playbook[], filter: PlaybookFilter, sidebarCategory: PlaybookCategory | "all"): Playbook[] {
  let filtered = [...playbooks];

  if (sidebarCategory === "favorites") {
    filtered = filtered.filter((p) => p.isFavorite && !p.isArchived);
  } else if (sidebarCategory === "archived") {
    filtered = filtered.filter((p) => p.isArchived);
  } else if (sidebarCategory !== "all") {
    filtered = filtered.filter((p) => p.category === sidebarCategory && !p.isArchived);
  } else {
    filtered = filtered.filter((p) => !p.isArchived);
  }

  if (filter.search) {
    const q = filter.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filter.difficulty !== "all") {
    filtered = filtered.filter((p) => p.difficulty === filter.difficulty);
  }

  if (filter.market !== "all") {
    filtered = filtered.filter((p) => p.market.includes(filter.market as PlaybookMarket));
  }

  if (filter.tags.length > 0) {
    filtered = filtered.filter((p) => filter.tags.some((t) => p.tags.includes(t)));
  }

  return filtered;
}
