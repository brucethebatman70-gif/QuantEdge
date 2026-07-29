import type { Trade } from "@/lib/types";

export type TableDensity = "compact" | "normal" | "comfortable";
export type ColumnPin = "left" | "right" | false;

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  width: number;
  minWidth: number;
  order: number;
  pinned: ColumnPin;
  frozen: boolean;
}

export interface SavedView {
  id: string;
  name: string;
  columnConfig: ColumnConfig[];
  filters: FilterRule[];
  sort: { id: string; desc: boolean }[];
  groupBy: string | null;
  density: TableDensity;
  createdAt: number;
}

export interface FilterRule {
  id: string;
  columnId: string;
  operator: FilterOperator;
  value: string;
}

export type FilterOperator =
  | "equals" | "not_equals"
  | "contains" | "not_contains"
  | "gt" | "gte" | "lt" | "lte"
  | "between"
  | "is_empty" | "is_not_empty";

export interface TradeTableRow extends Trade {
  aiScore?: number;
  rr?: number;
  session?: string;
  account?: string;
  broker?: string;
}

export const DEFAULT_COLUMNS: ColumnConfig[] = [
  { id: "select", label: "", visible: true, width: 40, minWidth: 40, order: 0, pinned: "left", frozen: true },
  { id: "status", label: "Status", visible: true, width: 88, minWidth: 72, order: 1, pinned: "left", frozen: true },
  { id: "symbol", label: "Symbol", visible: true, width: 84, minWidth: 68, order: 2, pinned: "left", frozen: true },
  { id: "direction", label: "Dir", visible: true, width: 56, minWidth: 48, order: 3, pinned: false, frozen: false },
  { id: "entryDate", label: "Entry", visible: true, width: 140, minWidth: 100, order: 4, pinned: false, frozen: false },
  { id: "exitDate", label: "Exit", visible: true, width: 140, minWidth: 100, order: 5, pinned: false, frozen: false },
  { id: "entryPrice", label: "Entry", visible: true, width: 100, minWidth: 80, order: 6, pinned: false, frozen: false },
  { id: "exitPrice", label: "Exit", visible: true, width: 100, minWidth: 80, order: 7, pinned: false, frozen: false },
  { id: "quantity", label: "Qty", visible: true, width: 68, minWidth: 56, order: 8, pinned: false, frozen: false },
  { id: "pnl", label: "P&L", visible: true, width: 100, minWidth: 80, order: 9, pinned: false, frozen: false },
  { id: "pnlPercent", label: "P&L %", visible: true, width: 80, minWidth: 64, order: 10, pinned: false, frozen: false },
  { id: "rr", label: "R:R", visible: true, width: 64, minWidth: 52, order: 11, pinned: false, frozen: false },
  { id: "setup", label: "Setup", visible: true, width: 120, minWidth: 80, order: 12, pinned: false, frozen: false },
  { id: "emotion", label: "Emotion", visible: true, width: 100, minWidth: 72, order: 13, pinned: false, frozen: false },
  { id: "tags", label: "Tags", visible: true, width: 160, minWidth: 80, order: 14, pinned: false, frozen: false },
  { id: "mistake", label: "Mistake", visible: true, width: 140, minWidth: 80, order: 15, pinned: false, frozen: false },
  { id: "lesson", label: "Lesson", visible: true, width: 160, minWidth: 80, order: 16, pinned: false, frozen: false },
  { id: "actions", label: "", visible: true, width: 60, minWidth: 60, order: 17, pinned: "right", frozen: true },
];

export const COLUMN_META: Record<string, { label: string; group: string; align?: string; format?: string }> = {
  select: { label: "", group: "", align: "center" },
  status: { label: "Status", group: "Trade", align: "center" },
  symbol: { label: "Symbol", group: "Trade" },
  direction: { label: "Direction", group: "Trade", align: "center" },
  entryDate: { label: "Entry Date", group: "Timing" },
  exitDate: { label: "Exit Date", group: "Timing" },
  entryPrice: { label: "Entry Price", group: "Prices", align: "right", format: "currency" },
  exitPrice: { label: "Exit Price", group: "Prices", align: "right", format: "currency" },
  quantity: { label: "Quantity", group: "Size", align: "right" },
  pnl: { label: "P&L", group: "Performance", align: "right", format: "currency" },
  pnlPercent: { label: "P&L %", group: "Performance", align: "right", format: "percent" },
  rr: { label: "R:R", group: "Performance", align: "right", format: "decimal" },
  setup: { label: "Setup", group: "Analysis" },
  emotion: { label: "Emotion", group: "Psychology" },
  tags: { label: "Tags", group: "Organization" },
  mistake: { label: "Mistake", group: "Review" },
  lesson: { label: "Lesson", group: "Review" },
  actions: { label: "", group: "", align: "center" },
};
