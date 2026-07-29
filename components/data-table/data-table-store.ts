'use client';
import { create } from 'zustand';
import type { ColumnConfig, SavedView, FilterRule, TableDensity } from './data-table-types';
import { DEFAULT_COLUMNS } from './data-table-types';

interface DataTableState {
  columns: ColumnConfig[];
  columnOrder: string[];
  views: SavedView[];
  activeViewId: string | null;
  filters: FilterRule[];
  globalFilter: string;
  density: TableDensity;
  expandedRow: string | null;
  selectedRows: Set<string>;
  showColumnManager: boolean;
  showFilterBar: boolean;

  setColumns: (cols: ColumnConfig[]) => void;
  updateColumn: (id: string, partial: Partial<ColumnConfig>) => void;
  reorderColumns: (ids: string[]) => void;
  toggleColumnVisibility: (id: string) => void;

  saveView: (name: string) => void;
  loadView: (id: string) => void;
  deleteView: (id: string) => void;

  setFilters: (f: FilterRule[]) => void;
  addFilter: (f: FilterRule) => void;
  removeFilter: (id: string) => void;
  clearFilters: () => void;
  setGlobalFilter: (v: string) => void;

  setDensity: (d: TableDensity) => void;
  setExpandedRow: (id: string | null) => void;
  toggleRowSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  setShowColumnManager: (v: boolean) => void;
  setShowFilterBar: (v: boolean) => void;
}

const STORAGE_KEY = 'qe-datatable';
function loadPersisted(): Partial<DataTableState> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}
function persist(state: Partial<DataTableState>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      columns: state.columns, columnOrder: state.columnOrder,
      views: state.views, activeViewId: state.activeViewId,
      filters: state.filters, density: state.density,
    }));
  } catch {}
}

export const useDataTableStore = create<DataTableState>((set, get) => {
  const p = loadPersisted();
  return {
    columns: p?.columns ?? DEFAULT_COLUMNS,
    columnOrder: p?.columnOrder ?? DEFAULT_COLUMNS.sort((a, b) => a.order - b.order).map((c) => c.id),
    views: p?.views ?? [],
    activeViewId: p?.activeViewId ?? null,
    filters: p?.filters ?? [],
    globalFilter: '',
    density: p?.density ?? 'normal',
    expandedRow: null,
    selectedRows: new Set(),
    showColumnManager: false,
    showFilterBar: false,

    setColumns: (cols) => {
      set((s) => {
        persist({ ...s, columns: cols });
        return { columns: cols };
      });
    },
    updateColumn: (id, partial) => set((s) => {
      const next = s.columns.map((c) => c.id === id ? { ...c, ...partial } : c);
      persist({ ...s, columns: next });
      return { columns: next };
    }),
    reorderColumns: (ids) => set((s) => {
      const next = ids.map((id, i) => {
        const col = s.columns.find((c) => c.id === id);
        return col ? { ...col, order: i } : null;
      }).filter(Boolean) as ColumnConfig[];
      persist({ ...s, columns: next, columnOrder: ids });
      return { columnOrder: ids, columns: next };
    }),
    toggleColumnVisibility: (id) => set((s) => {
      const next = s.columns.map((c) => c.id === id ? { ...c, visible: !c.visible } : c);
      persist({ ...s, columns: next });
      return { columns: next };
    }),

    saveView: (name) => set((s) => {
      const view: SavedView = {
        id: Date.now().toString(),
        name,
        columnConfig: s.columns,
        filters: s.filters,
        sort: [],
        groupBy: null,
        density: s.density,
        createdAt: Date.now(),
      };
      const next = [...s.views, view];
      persist({ ...s, views: next, activeViewId: view.id });
      return { views: next, activeViewId: view.id };
    }),
    loadView: (id) => set((s) => {
      const view = s.views.find((v) => v.id === id);
      if (!view) return s;
      persist({ ...s, activeViewId: id, columns: view.columnConfig, filters: view.filters, density: view.density });
      return { activeViewId: id, columns: view.columnConfig, filters: view.filters, density: view.density };
    }),
    deleteView: (id) => set((s) => {
      const next = s.views.filter((v) => v.id !== id);
      const active = s.activeViewId === id ? null : s.activeViewId;
      persist({ ...s, views: next, activeViewId: active });
      return { views: next, activeViewId: active };
    }),

    setFilters: (f) => set((s) => {
      persist({ ...s, filters: f });
      return { filters: f };
    }),
    addFilter: (f) => set((s) => {
      const next = [...s.filters, f];
      persist({ ...s, filters: next });
      return { filters: next };
    }),
    removeFilter: (id) => set((s) => {
      const next = s.filters.filter((f) => f.id !== id);
      persist({ ...s, filters: next });
      return { filters: next };
    }),
    clearFilters: () => set((s) => {
      persist({ ...s, filters: [] });
      return { filters: [] };
    }),
    setGlobalFilter: (v) => set({ globalFilter: v }),

    setDensity: (d) => set((s) => {
      persist({ ...s, density: d });
      return { density: d };
    }),
    setExpandedRow: (id) => set({ expandedRow: id }),
    toggleRowSelection: (id) => set((s) => {
      const next = new Set(s.selectedRows);
      if (next.has(id)) next.delete(id); else next.add(id);
      return { selectedRows: next };
    }),
    selectAll: (ids) => set({ selectedRows: new Set(ids) }),
    clearSelection: () => set({ selectedRows: new Set() }),
    setShowColumnManager: (v) => set({ showColumnManager: v }),
    setShowFilterBar: (v) => set({ showFilterBar: v }),
  };
});
