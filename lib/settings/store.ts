"use client";

import { useState, useEffect, useMemo } from "react";
import type {
  SettingsState, NavSectionId, ProfileSettings, WorkspaceSettings,
  AppearanceSettings, NotificationSettings, AiPreferences, PrivacySettings,
} from "./types";

interface SettingsStoreActions {
  setActiveNav: (nav: NavSectionId) => void;
  updateProfile: (partial: Partial<ProfileSettings>) => void;
  updateWorkspace: (partial: Partial<WorkspaceSettings>) => void;
  updateAppearance: (partial: Partial<AppearanceSettings>) => void;
  updateNotifications: (partial: Partial<NotificationSettings>) => void;
  updateAiPreferences: (partial: Partial<AiPreferences>) => void;
  updatePrivacy: (partial: Partial<PrivacySettings>) => void;
  toggleHelpPanel: () => void;
  addApiKey: (key: { provider: string; label: string }) => void;
  deleteApiKey: (id: string) => void;
  toggleIntegration: (id: string) => void;
}

export type SettingsStore = SettingsState & SettingsStoreActions;

let state: SettingsState = {
  activeNav: "profile",
  profile: {
    displayName: "Demo User",
    username: "demotrader",
    email: "demo@quantedge.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    timezone: "America/New_York",
    language: "English",
    tradingExperience: "advanced",
    bio: "Professional day trader specializing in forex and indices. 5+ years of experience.",
  },
  workspace: {
    defaultDashboard: "overview",
    defaultAccount: "Demo Account",
    defaultBroker: "TradingView",
    defaultTimeframe: "1h",
    defaultCurrency: "USD",
    measurementUnits: "pips",
  },
  appearance: {
    theme: "dark",
    accentColor: "indigo",
    sidebarStyle: "default",
    glassIntensity: 50,
    compactMode: false,
    borderRadius: "lg",
    typographyScale: 100,
    animationLevel: "full",
  },
  notifications: {
    desktop: true, email: true, mobile: false,
    tradeAlerts: true, goalAlerts: true, aiAlerts: true,
    weeklyReports: true, monthlyReports: false,
  },
  brokerConnections: [
    { id: "br_1", platform: "MT4", label: "IC Markets MT4", status: "connected", accountId: "51234567", lastSync: "2 min ago" },
    { id: "br_2", platform: "MT5", label: "Pepperstone MT5", status: "connected", accountId: "87654321", lastSync: "5 min ago" },
    { id: "br_3", platform: "TradingView", label: "TradingView Paper", status: "disconnected", accountId: "TV-12345" },
    { id: "br_4", platform: "cTrader", label: "cTrader Live", status: "error", accountId: "CT-98765", lastSync: "1 hour ago" },
  ],
  aiPreferences: {
    preferredModel: "gpt-4",
    responseStyle: "balanced",
    coachingStyle: "mentor",
    riskProfile: "moderate",
    memory: true,
    voiceMode: false,
    smartSuggestions: true,
  },
  security: {
    password: "********",
    twoFactorEnabled: false,
    trustedDevices: [
      { id: "dev_1", name: "Windows Desktop - Chrome", lastUsed: "2 hours ago" },
      { id: "dev_2", name: "iPhone 15 Pro - Safari", lastUsed: "Yesterday" },
    ],
    recoveryCodes: ["QE-ABCD-1234", "QE-EFGH-5678", "QE-IJKL-9012"],
  },
  privacy: { analyticsSharing: true, dataExport: true },
  apiKeys: [
    { id: "ak_1", provider: "OpenAI", label: "GPT-4 Trading Analysis", status: "active", usage: 78, createdAt: "2026-03-15" },
    { id: "ak_2", provider: "Anthropic", label: "Claude Review Agent", status: "active", usage: 42, createdAt: "2026-04-01" },
    { id: "ak_3", provider: "Google AI", label: "Gemini Insights", status: "inactive", usage: 0, createdAt: "2026-05-10" },
  ],
  integrations: [
    { id: "int_1", name: "Discord", status: "connected", connectedAt: "2026-01-15" },
    { id: "int_2", name: "Slack", status: "disconnected" },
    { id: "int_3", name: "Telegram", status: "connected", connectedAt: "2026-02-20" },
    { id: "int_4", name: "Google Drive", status: "disconnected" },
  ],
  billing: {
    plan: "pro",
    status: "active",
    nextBilling: "2026-08-15",
    usage: 68,
    usageLimit: 100,
  },
  keyboardShortcuts: [
    { id: "ks_1", label: "Global Search", keys: "⌘K", category: "Global" },
    { id: "ks_2", label: "AI Copilot", keys: "⌘I", category: "Global" },
    { id: "ks_3", label: "New Trade", keys: "⌘N", category: "Trading" },
    { id: "ks_4", label: "Quick Journal", keys: "⌘J", category: "Journal" },
    { id: "ks_5", label: "Replay Trade", keys: "⌘R", category: "Replay" },
    { id: "ks_6", label: "Analytics", keys: "⌘A", category: "Analytics" },
    { id: "ks_7", label: "Toggle Sidebar", keys: "⌘B", category: "Navigation" },
    { id: "ks_8", label: "Settings", keys: "⌘,", category: "Navigation" },
  ],
  showHelpPanel: true,
};

const listeners = new Set<() => void>();
function emitChange() { listeners.forEach((l) => l()); }
function setState(partial: Partial<SettingsState>) { state = { ...state, ...partial }; emitChange(); }

const actions: SettingsStoreActions = {
  setActiveNav: (nav) => setState({ activeNav: nav }),
  updateProfile: (p) => setState({ profile: { ...state.profile, ...p } }),
  updateWorkspace: (w) => setState({ workspace: { ...state.workspace, ...w } }),
  updateAppearance: (a) => setState({ appearance: { ...state.appearance, ...a } }),
  updateNotifications: (n) => setState({ notifications: { ...state.notifications, ...n } }),
  updateAiPreferences: (a) => setState({ aiPreferences: { ...state.aiPreferences, ...a } }),
  updatePrivacy: (p) => setState({ privacy: { ...state.privacy, ...p } }),
  toggleHelpPanel: () => setState({ showHelpPanel: !state.showHelpPanel }),
  addApiKey: (key) => setState({
    apiKeys: [...state.apiKeys, {
      id: `ak_${Date.now()}`, ...key, status: "active" as const, usage: 0, createdAt: new Date().toISOString().split("T")[0],
    }],
  }),
  deleteApiKey: (id) => setState({ apiKeys: state.apiKeys.filter((k) => k.id !== id) }),
  toggleIntegration: (id) => setState({
    integrations: state.integrations.map((i) => i.id === id ? { ...i, status: i.status === "connected" ? "disconnected" as const : "connected" as const } : i),
  }),
};

function buildProxy(): SettingsStore {
  return new Proxy({} as SettingsStore, {
    get(_, prop: string | symbol) {
      const key = String(prop);
      if (key in actions) return (actions as unknown as Record<string, unknown>)[key];
      return (state as unknown as Record<string, unknown>)[key];
    },
  });
}

export function useSettingsStore(): SettingsStore;
export function useSettingsStore<T>(selector: (store: SettingsStore) => T): T;
export function useSettingsStore<T>(selector?: (store: SettingsStore) => T): T | SettingsStore {
  const [, setTick] = useState(0);
  useEffect(() => { const l = () => setTick((n) => n + 1); listeners.add(l); return () => { listeners.delete(l); }; }, []);
  const proxy = useMemo(() => buildProxy(), []);
  return selector ? selector(proxy) : proxy;
}
