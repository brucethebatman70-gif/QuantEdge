"use client";

import { useState, useEffect, useMemo } from "react";
import type {
  CopilotConversation,
  CopilotMessage,
  CopilotState,
  AiProactiveAlert,
  AiMemoryProfile,
} from "./types";
import {
  mockConversations,
  mockTemplates,
  mockSuggestions,
  mockInsights,
  mockFolders,
} from "./mock-data";

interface CopilotActions {
  setView: (view: "home" | "chat") => void;
  setActiveConversation: (id: string | null) => void;
  createConversation: (title?: string) => string;
  deleteConversation: (id: string) => void;
  togglePinConversation: (id: string) => void;
  addMessage: (conversationId: string, message: CopilotMessage) => void;
  setIsStreaming: (streaming: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedFolder: (folder: string | null) => void;
  setShowPinnedOnly: (pinned: boolean) => void;
  setContextPanel: (panel: CopilotState["contextPanel"]) => void;
  setActivePanel: (panel: CopilotState["activePanel"]) => void;
  markAlertRead: (id: string) => void;
}

const defaultMemory: AiMemoryProfile = {
  tradingStyle: "swing",
  preferredAssets: ["AAPL", "NVDA", "MSFT", "SPY"],
  riskPercent: 2,
  sessions: ["newyork", "london"],
  favoriteSetups: ["Breakout", "Pullback"],
  goals: [{ label: "Daily Trades", progress: 80 }, { label: "Win Rate 70%", progress: 68 }, { label: "Risk < 2%", progress: 90 }],
  learningProgress: ["Risk management improved 18%", "Emotion control needs work"],
  knownInfo: ["User prefers swing trading", "Avoids crypto", "Best session is NY morning"],
};

let state: CopilotState = {
  view: "home",
  conversations: mockConversations,
  activeConversationId: null,
  isStreaming: false,
  searchQuery: "",
  selectedFolder: null,
  showPinnedOnly: false,
  insights: mockInsights,
  suggestions: mockSuggestions,
  templates: mockTemplates,
  folders: mockFolders,
  contextPanel: "insights",
  activePanel: null,
  proactiveAlerts: [
    { id: "alert_1", type: "warning", message: "Your position sizing has been inconsistent this week. 3 trades exceeded 2% risk.", timestamp: new Date().toISOString(), read: false, actionLabel: "Review trades" },
    { id: "alert_2", type: "celebration", message: "Breakout strategy hit 72% win rate this month. Your best performing setup.", timestamp: new Date(Date.now() - 3600000).toISOString(), read: false, actionLabel: "View details" },
    { id: "alert_3", type: "insight", message: "You perform 13% better during London session. Consider prioritizing these hours.", timestamp: new Date(Date.now() - 7200000).toISOString(), read: false, actionLabel: "Optimize schedule" },
  ],
  memory: defaultMemory,
};

const listeners = new Set<() => void>();
function emitChange() { listeners.forEach((l) => l()); }
function setState(partial: Partial<CopilotState>) { state = { ...state, ...partial }; emitChange(); }
function getState() { return state; }

function generateId(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 11);
}

const actions: CopilotActions = {
  setView: (view) => setState({ view }),
  setActiveConversation: (id) => setState({ activeConversationId: id }),
  createConversation: (title) => {
    const id = `conv_${generateId()}`;
    const conv: CopilotConversation = {
      id,
      title: title || `New Chat`,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
      folder: undefined,
      tags: [],
    };
    setState({
      conversations: [conv, ...state.conversations],
      activeConversationId: id,
      view: "chat",
    });
    return id;
  },
  deleteConversation: (id) => {
    setState({
      conversations: state.conversations.filter((c) => c.id !== id),
      activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
    });
  },
  togglePinConversation: (id) => {
    setState({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, pinned: !c.pinned } : c
      ),
    });
  },
  addMessage: (conversationId, message) => {
    setState({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, message], updatedAt: new Date().toISOString() }
          : c
      ),
    });
  },
  setIsStreaming: (streaming) => setState({ isStreaming: streaming }),
  setSearchQuery: (query) => setState({ searchQuery: query }),
  setSelectedFolder: (folder) => setState({ selectedFolder: folder }),
  setShowPinnedOnly: (pinned) => setState({ showPinnedOnly: pinned }),
  setContextPanel: (panel) => setState({ contextPanel: panel }),
  setActivePanel: (panel) => setState({ activePanel: panel }),
  markAlertRead: (id) => {
    setState({
      proactiveAlerts: state.proactiveAlerts.map((a) =>
        a.id === id ? { ...a, read: true } : a
      ),
    });
  },
};

export type CopilotStore = CopilotState & CopilotActions;

function buildProxy(): CopilotStore {
  return new Proxy({} as CopilotStore, {
    get(_, prop: string | symbol) {
      const key = String(prop);
      if (key in actions) return (actions as unknown as Record<string, unknown>)[key];
      return (state as unknown as Record<string, unknown>)[key];
    },
  });
}

const proxy = buildProxy();

export function useCopilotStore(): CopilotStore;
export function useCopilotStore<T>(selector: (store: CopilotStore) => T): T;
export function useCopilotStore<T>(selector?: (store: CopilotStore) => T): T | CopilotStore {
  const [, setTick] = useState(0);
  useEffect(() => {
    const listener = () => setTick((n) => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);
  return selector ? selector(proxy) : proxy;
}

export function getCopilotState() { return getState(); }
export function getCopilotActions() { return actions; }
