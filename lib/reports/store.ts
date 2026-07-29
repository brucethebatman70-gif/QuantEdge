"use client";

import { useState, useEffect, useMemo } from "react";
import type { ReportsState, Report, ReportType, ReportStatus, ScheduledReport } from "./types";
import { mockReports, mockTemplates, mockScheduledReports, mockExportJobs } from "./mock-reports";

interface ReportsStoreActions {
  setActiveTab: (tab: ReportsState["activeTab"]) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: ReportStatus | "all") => void;
  setTypeFilter: (type: ReportType | "all") => void;
  selectReport: (report: Report | null) => void;
  generateReport: (type: ReportType, templateId: string) => void;
  deleteReport: (id: string) => void;
  addScheduledReport: (s: ScheduledReport) => void;
  toggleScheduledReport: (id: string) => void;
  deleteScheduledReport: (id: string) => void;
}

export type ReportsStore = ReportsState & ReportsStoreActions;

let state: ReportsState = {
  reports: mockReports,
  templates: mockTemplates,
  scheduledReports: mockScheduledReports,
  exportJobs: mockExportJobs,
  activeTab: "all",
  selectedReport: null,
  search: "",
  statusFilter: "all",
  typeFilter: "all",
};

const listeners = new Set<() => void>();
function emitChange() { listeners.forEach((l) => l()); }
function setState(partial: Partial<ReportsState>) { state = { ...state, ...partial }; emitChange(); }

const actions: ReportsStoreActions = {
  setActiveTab: (tab) => setState({ activeTab: tab }),
  setSearch: (search) => setState({ search }),
  setStatusFilter: (status) => setState({ statusFilter: status }),
  setTypeFilter: (type) => setState({ typeFilter: type }),
  selectReport: (report) => setState({ selectedReport: report }),
  generateReport: (type, _templateId) => {
    void _templateId;
    const id = `rpt_${state.reports.length + 1}_${Date.now()}`;
    const newReport: Report = {
      id, type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
      description: "Generated from template",
      status: "generating",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      dateRange: { start: new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0], end: new Date().toISOString().split("T")[0] },
      sections: [],
      metrics: {
        totalPnL: 0, winRate: 0, profitFactor: 0, avgRR: 0, maxDrawdown: 0,
        totalTrades: 0, sharpeRatio: 0, consistencyScore: 0, netProfit: 0,
        grossProfit: 0, grossLoss: 0, totalFees: 0, avgWin: 0, avgLoss: 0,
        largestWin: 0, largestLoss: 0, winCount: 0, lossCount: 0,
        averageSessionTime: "0h 0m",
      },
      charts: [],
      branding: { logo: "/images/logo.svg", primaryColor: "#6366f1", showWatermark: true, footer: "QuantEdge Technologies Inc." },
      tags: [type],
      generatedBy: "AI",
    };
    setState({ reports: [newReport, ...state.reports] });
    setTimeout(() => {
      setState({
        reports: state.reports.map((r) => r.id === id ? { ...r, status: "ready" as const } : r),
      });
    }, 2000);
  },
  deleteReport: (id) => setState({ reports: state.reports.filter((r) => r.id !== id) }),
  addScheduledReport: (s) => setState({ scheduledReports: [...state.scheduledReports, s] }),
  toggleScheduledReport: (id) => setState({
    scheduledReports: state.scheduledReports.map((s) => s.id === id ? { ...s, active: !s.active } : s),
  }),
  deleteScheduledReport: (id) => setState({ scheduledReports: state.scheduledReports.filter((s) => s.id !== id) }),
};

function buildProxy(): ReportsStore {
  return new Proxy({} as ReportsStore, {
    get(_, prop: string | symbol) {
      const key = String(prop);
      if (key in actions) return (actions as unknown as Record<string, unknown>)[key];
      return (state as unknown as Record<string, unknown>)[key];
    },
  });
}

export function useReportsStore(): ReportsStore;
export function useReportsStore<T>(selector: (store: ReportsStore) => T): T;
export function useReportsStore<T>(selector?: (store: ReportsStore) => T): T | ReportsStore {
  const [, setTick] = useState(0);
  useEffect(() => { const l = () => setTick((n) => n + 1); listeners.add(l); return () => { listeners.delete(l); }; }, []);
  const proxy = useMemo(() => buildProxy(), []);
  return selector ? selector(proxy) : proxy;
}
