import { create } from "zustand";
import type { BrokerPlatform, ImportMethod, ImportTrade, ImportSession, ImportHistoryItem, ValidationIssue, ValidatedTrade, WizardStep, BrokerConnection, BrokerAccount, AiInsight, ImportStatus } from "./types";
import { importService } from "./service";

interface ImportStore {
  wizardStep: WizardStep;
  source: BrokerPlatform | null;
  method: ImportMethod | null;
  connection: BrokerConnection | null;
  account: BrokerAccount | null;
  dateRange: { start: string; end: string };
  trades: ImportTrade[];
  validatedTrades: ValidatedTrade[];
  issues: ValidationIssue[];
  aiInsights: AiInsight[];
  history: ImportHistoryItem[];
  importStatus: ImportStatus;
  importProgress: number;
  importResults: { imported: number; skipped: number; failed: number } | null;
  isLoading: boolean;
  error: string | null;

  setStep: (step: WizardStep) => void;
  setSource: (source: BrokerPlatform) => void;
  setMethod: (method: ImportMethod) => void;
  setDateRange: (range: { start: string; end: string }) => void;
  setAccount: (account: BrokerAccount) => void;
  connectBroker: () => Promise<void>;
  processFile: (file: File) => Promise<void>;
  runValidation: () => Promise<void>;
  runAiInsights: () => Promise<void>;
  startImport: () => Promise<void>;
  cancelImport: () => void;
  resetWizard: () => void;
  loadHistory: () => Promise<void>;
  deleteHistoryItem: (id: string) => Promise<void>;
  reimportHistoryItem: (id: string) => Promise<void>;
}

export const useImportStore = create<ImportStore>((set, get) => ({
  wizardStep: 1,
  source: null,
  method: null,
  connection: null,
  account: null,
  dateRange: { start: "", end: "" },
  trades: [],
  validatedTrades: [],
  issues: [],
  aiInsights: [],
  history: [],
  importStatus: "idle",
  importProgress: 0,
  importResults: null,
  isLoading: false,
  error: null,

  setStep: (step) => set({ wizardStep: step }),

  setSource: (source) => set({ source, method: null, connection: null, account: null, trades: [], validatedTrades: [], issues: [], aiInsights: [], importResults: null, error: null }),

  setMethod: (method) => set({ method, connection: null, trades: [], validatedTrades: [], issues: [], aiInsights: [], importResults: null, error: null }),

  setDateRange: (range) => set({ dateRange: range }),

  setAccount: (account) => set({ account }),

  connectBroker: async () => {
    const { source } = get();
    if (!source) return;
    set({ isLoading: true, error: null, importStatus: "connecting" });
    try {
      const connection = await importService.connectBroker(source);
      set({ connection, isLoading: false, importStatus: "idle", account: connection.accounts[0] || null });
    } catch {
      set({ isLoading: false, error: "Failed to connect to broker", importStatus: "failed" });
    }
  },

  processFile: async (file: File) => {
    set({ isLoading: true, error: null, importStatus: "parsing" });
    try {
      const trades = await importService.parseFile(file);
      set({ trades, isLoading: false, importStatus: "idle" });
    } catch {
      set({ isLoading: false, error: "Failed to parse file", importStatus: "failed" });
    }
  },

  runValidation: async () => {
    const { trades, method } = get();
    if (!method) return;
    set({ isLoading: true, error: null, importStatus: "validating" });
    try {
      const { validated, issues } = await importService.validateTrades(method, trades);
      set({ validatedTrades: validated, issues, isLoading: false, importStatus: "idle" });
    } catch {
      set({ isLoading: false, error: "Validation failed", importStatus: "failed" });
    }
  },

  runAiInsights: async () => {
    const { trades, validatedTrades } = get();
    if (trades.length === 0) return;
    try {
      const insights = await importService.getAiInsights(trades, validatedTrades);
      set({ aiInsights: insights });
    } catch {
      // Non-critical, silently fail
    }
  },

  startImport: async () => {
    const { validatedTrades } = get();
    set({ isLoading: true, error: null, importStatus: "importing", importProgress: 0 });
    try {
      const results = await importService.importTrades(validatedTrades, (pct) => {
        set({ importProgress: pct });
      });
      set({ importResults: results, isLoading: false, importStatus: "completed", importProgress: 100 });
      get().loadHistory();
    } catch {
      set({ isLoading: false, error: "Import failed", importStatus: "failed" });
    }
  },

  cancelImport: () => {
    set({ importStatus: "cancelled", isLoading: false, error: "Import cancelled" });
  },

  resetWizard: () => {
    set({
      wizardStep: 1, source: null, method: null, connection: null, account: null,
      dateRange: { start: "", end: "" }, trades: [], validatedTrades: [], issues: [],
      aiInsights: [], importStatus: "idle", importProgress: 0, importResults: null,
      isLoading: false, error: null,
    });
  },

  loadHistory: async () => {
    try {
      const history = await importService.getImportHistory();
      set({ history });
    } catch {
      // silent
    }
  },

  deleteHistoryItem: async (id: string) => {
    try {
      await importService.deleteHistoryItem(id);
      set((s) => ({ history: s.history.filter((h) => h.id !== id) }));
    } catch {
      // silent
    }
  },

  reimportHistoryItem: async (_id: string) => {
    set({ isLoading: true, importStatus: "importing", importProgress: 0 });
    try {
      await importService.reimportHistoryItem(_id);
      set({ isLoading: false, importStatus: "completed", importProgress: 100 });
    } catch {
      set({ isLoading: false, error: "Re-import failed", importStatus: "failed" });
    }
  },
}));
