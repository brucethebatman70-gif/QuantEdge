'use client';
import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel,
  getPaginationRowModel, flexRender, type SortingState, type ColumnDef,
  type Row, type Cell, type HeaderGroup, type Header,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Icons } from '@/lib/icons';
import type { TradeTableRow, ColumnConfig, FilterRule } from './data-table-types';
import { COLUMN_META } from './data-table-types';
import { useDataTableStore } from './data-table-store';
import { StatusBadge } from './status-badge';
import { ContextMenu } from './context-menu';
import { SavedViewsDropdown } from './saved-views';
import { FilterBar } from './filter-bar';
import { ColumnManager } from './column-manager';
import { RowExpansion } from './row-expansion';
import { InlineEdit } from './inline-edit';
import { DensityToggle } from './density-toggle';
import { TableSkeleton } from './table-skeleton';

function formatCellValue(row: TradeTableRow, colId: string): { value: string; color?: string; icon?: string } {
  const v = (row as unknown as Record<string, unknown>)[colId];
  if (colId === 'pnl' || colId === 'pnlPercent') {
    const num = Number(v) || 0;
    const prefix = colId === 'pnlPercent' ? '' : '$';
    const val = colId === 'pnlPercent' ? num.toFixed(2) + '%' : prefix + num.toLocaleString('en-US', { minimumFractionDigits: 2 });
    return { value: val, color: num > 0 ? 'text-success' : num < 0 ? 'text-error' : 'text-muted-foreground' };
  }
  if (colId === 'rr') {
    const num = Number(v) || 0;
    return { value: num.toFixed(2), color: num >= 2 ? 'text-success' : num >= 1 ? 'text-warning' : 'text-error' };
  }
  if (colId === 'direction') return { value: v as string === 'long' ? 'Long' : 'Short', color: v === 'long' ? 'text-success' : 'text-error' };
  if (colId === 'entryDate' || colId === 'exitDate') {
    if (!v) return { value: '—', color: 'text-muted-foreground/50' };
    const d = new Date(v as string);
    return { value: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) };
  }
  if (colId === 'entryPrice' || colId === 'exitPrice') {
    const num = Number(v) || 0;
    return { value: '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2 }) };
  }
  if (colId === 'quantity') return { value: Number(v).toLocaleString() };
  if (colId === 'tags') {
    const arr = Array.isArray(v) ? v : [];
    return { value: arr.slice(0, 3).join(', ') + (arr.length > 3 ? ' +' + (arr.length - 3) : ''), icon: 'Tag' };
  }
  if (colId === 'mistake' || colId === 'lesson') {
    if (!v) return { value: '—', color: 'text-muted-foreground/30' };
    return { value: v as string };
  }
  return { value: v != null ? String(v) : '—' };
}

const ROW_HEIGHT_MAP = { compact: 36, normal: 44, comfortable: 52 } as const;

function CellRenderer({ cell, column }: { cell: Cell<TradeTableRow, unknown>; column: ColumnConfig }) {
  const { globalFilter, density } = useDataTableStore();
  const meta = COLUMN_META[column.id];
  const row = cell.row.original;
  const fmt = formatCellValue(row, column.id);

  if (column.id === 'select') {
    return (
      <div className="flex items-center justify-center h-full">
        <input type="checkbox" checked={cell.row.getIsSelected()} onChange={cell.row.getToggleSelectedHandler()} className="w-3.5 h-3.5 rounded border-border/50 bg-transparent accent-primary" />
      </div>
    );
  }

  if (column.id === 'status') {
    return <StatusBadge status={row.status} />;
  }

  if (column.id === 'symbol') {
    return (
      <div className="flex items-center gap-2">
        <span className={cn('text-xs font-semibold', fmt.color)}>{row.symbol}</span>
      </div>
    );
  }

  if (column.id === 'actions') {
    return (
      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 rounded-md hover:bg-white/[0.06] text-muted-foreground/50 hover:text-foreground transition-all"><Icons.Edit3 className="w-3.5 h-3.5" /></button>
        <button className="p-1 rounded-md hover:bg-white/[0.06] text-muted-foreground/50 hover:text-foreground transition-all"><Icons.MoreHorizontal className="w-3.5 h-3.5" /></button>
      </div>
    );
  }

  if (column.id === 'tags') {
    const tags = row.tags || [];
    return (
      <div className="flex items-center gap-1 overflow-hidden">
        {tags.slice(0, 3).map((t) => (
          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary/80 whitespace-nowrap">{t}</span>
        ))}
        {tags.length > 3 && <span className="text-[9px] text-muted-foreground/50">+{tags.length - 3}</span>}
      </div>
    );
  }

  return (
    <span className={cn(
      'text-xs truncate block',
      fmt.color || 'text-foreground/80',
      meta?.align === 'right' && 'text-right w-full',
      meta?.align === 'center' && 'text-center w-full',
    )}>
      {fmt.value}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4">
        <Icons.Inbox className="w-8 h-8 text-muted-foreground/30" />
      </div>
      <p className="text-sm font-medium text-foreground/80">No trades found</p>
      <p className="text-xs text-muted-foreground/50 mt-1">Import a CSV or add your first trade to get started.</p>
      <div className="flex gap-2 mt-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all">
          <Icons.Upload className="w-3 h-3" /> Import CSV
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.04] text-foreground/60 hover:bg-white/[0.08] transition-all">
          <Icons.Plus className="w-3 h-3" /> Add Trade
        </button>
      </div>
    </div>
  );
}

export function DataTable({ data, loading }: { data: TradeTableRow[]; loading?: boolean }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const {
    columns, columnOrder, globalFilter, density, expandedRow,
    selectedRows, showColumnManager, showFilterBar,
    setGlobalFilter, setExpandedRow, toggleRowSelection, selectAll, clearSelection,
    setShowColumnManager, setShowFilterBar,
    updateColumn, toggleColumnVisibility, reorderColumns,
  } = useDataTableStore();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnSizing, setColumnSizing] = useState<Record<string, number>>({});
  const [editingCell, setEditingCell] = useState<{ rowId: string; colId: string } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; row: TradeTableRow } | null>(null);

  const visibleColumns = useMemo(() => columns.filter((c) => c.visible).sort((a, b) => a.order - b.order), [columns]);

  const tableColumns = useMemo<ColumnDef<TradeTableRow>[]>(() => {
    return visibleColumns.map((col) => ({
      id: col.id,
      accessorKey: col.id === 'select' || col.id === 'actions' ? undefined : col.id,
      enableSorting: !['select', 'actions', 'tags'].includes(col.id),
      enableResizing: !['select', 'actions'].includes(col.id),
      size: columnSizing[col.id] || col.width,
      minSize: col.minWidth,
      header: () => (
        <div className={cn(
          'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60',
          COLUMN_META[col.id]?.align === 'right' && 'justify-end',
          COLUMN_META[col.id]?.align === 'center' && 'justify-center',
        )}>
          {col.label}
        </div>
      ),
      cell: ({ cell }) => <CellRenderer cell={cell as Cell<TradeTableRow, unknown>} column={col} />,
    }));
  }, [visibleColumns, columnSizing]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, globalFilter, columnSizing, rowSelection: Object.fromEntries([...selectedRows].map((id) => [id, true])) },
    onSortingChange: setSorting,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      if (typeof updater === 'function') {
        const next = updater(Object.fromEntries([...selectedRows].map((id) => [id, true])));
        const ids = Object.keys(next).filter((k) => next[k]);
        if (ids.length === data.length) selectAll(data.map((d) => d.id));
        else if (ids.length === 0) clearSelection();
        else { clearSelection(); ids.forEach((id) => toggleRowSelection(id)); }
      }
    },
    enableMultiRowSelection: true,
    getRowId: (row) => row.id,
  });

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT_MAP[density],
    overscan: 20,
  });

  const handleContextMenu = useCallback((e: React.MouseEvent, row: TradeTableRow) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, row });
  }, []);

  const allSelected = rows.length > 0 && selectedRows.size === rows.length;

  return (
    <div className="relative flex flex-col h-full">
      {/* Toolbar */}
      <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04]">
        <div className="relative flex-1 max-w-[280px]">
          <Icons.Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search trades..."
            className="w-full h-8 pl-8 pr-3 text-xs bg-white/[0.04] border border-white/[0.06] rounded-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-white/[0.12] transition-colors"
          />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowFilterBar(!showFilterBar)} className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all', showFilterBar ? 'bg-white/[0.08] text-foreground' : 'text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.04]')}>
            <Icons.Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <button onClick={() => setShowColumnManager(!showColumnManager)} className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all', showColumnManager ? 'bg-white/[0.08] text-foreground' : 'text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.04]')}>
            <Icons.Sliders className="w-3.5 h-3.5" /> Columns
          </button>
          <div className="w-px h-5 bg-white/[0.06] mx-1" />
          <SavedViewsDropdown />
          <div className="w-px h-5 bg-white/[0.06] mx-1" />
          <DensityToggle />
        </div>
        {selectedRows.size > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 ml-2 pl-2 border-l border-white/[0.06]">
            <span className="text-[11px] text-muted-foreground/60">{selectedRows.size} selected</span>
            <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-white/[0.04] hover:bg-white/[0.08] text-foreground/70 transition-all"><Icons.Trash2 className="w-3 h-3" /> Delete</button>
            <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-white/[0.04] hover:bg-white/[0.08] text-foreground/70 transition-all"><Icons.Download className="w-3 h-3" /> Export</button>
            <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-white/[0.04] hover:bg-white/[0.08] text-foreground/70 transition-all"><Icons.Brain className="w-3 h-3" /> AI Review</button>
          </motion.div>
        )}
      </div>

      {/* Filter Bar */}
      <AnimatePresence>
        {showFilterBar && <FilterBar />}
      </AnimatePresence>

      {/* Column Manager */}
      <AnimatePresence>
        {showColumnManager && <ColumnManager />}
      </AnimatePresence>

      {/* Table Body */}
      <div className="flex-1 overflow-hidden rounded-xl border border-white/[0.04] mx-4 mb-4" style={{ background: 'var(--glass-surface)', backdropFilter: 'blur(16px) saturate(1.6)', WebkitBackdropFilter: 'blur(16px) saturate(1.6)' }}>
        <div ref={parentRef} className="h-full overflow-auto">
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
            {/* Sticky Header */}
            <div className="sticky top-0 z-10" style={{ background: 'var(--glass-surface)', backdropFilter: 'blur(24px) saturate(2)', WebkitBackdropFilter: 'blur(24px) saturate(2)', borderBottom: '1px solid var(--glass-border)' }}>
              <div className="flex" style={{ minWidth: table.getTotalSize() }}>
                <div className="flex items-center px-3 py-2.5 w-10 shrink-0">
                  <input type="checkbox" checked={allSelected} onChange={() => allSelected ? clearSelection() : selectAll(data.map((d) => d.id))} className="w-3.5 h-3.5 rounded border-border/50 bg-transparent accent-primary" />
                </div>
                {table.getHeaderGroups().map((hg) => hg.headers.map((header) => (
                  <div
                    key={header.id}
                    className={cn(
                      'flex items-center px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 shrink-0 select-none relative group/header',
                      header.column.getCanSort() && 'cursor-pointer hover:text-foreground/80 transition-colors',
                    )}
                    style={{ width: header.getSize(), minWidth: header.column.columnDef.minSize }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: <Icons.ChevronUp className="w-3 h-3 ml-1" />, desc: <Icons.ChevronDown className="w-3 h-3 ml-1" /> }[header.column.getIsSorted() as string] ?? null}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/30 transition-colors opacity-0 group-hover/header:opacity-100"
                      />
                    )}
                  </div>
                )))}
              </div>
            </div>

            {/* Virtualized Rows */}
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              const trade = row.original;
              const isSelected = selectedRows.has(trade.id);
              const isExpanded = expandedRow === trade.id;
              return (
                <div key={row.id}>
                  <div
                    className={cn(
                      'flex absolute left-0 right-0 group transition-all duration-150',
                      'hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
                      isSelected && 'bg-primary/[0.04]',
                      isExpanded && 'bg-white/[0.03]',
                    )}
                    style={{ height: `${virtualRow.size}px`, transform: `translateY(${virtualRow.start}px)` }}
                    onContextMenu={(e) => handleContextMenu(e, trade)}
                    onClick={() => setExpandedRow(isExpanded ? null : trade.id)}
                  >
                    <div className="flex shrink-0" style={{ minWidth: table.getTotalSize() }}>
                      <div className="flex items-center px-3 w-10 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={isSelected} onChange={() => toggleRowSelection(trade.id)} className="w-3.5 h-3.5 rounded border-border/50 bg-transparent accent-primary" />
                      </div>
                      {row.getVisibleCells().filter((c) => c.column.id !== 'select').map((cell) => {
                        const col = columns.find((c) => c.id === cell.column.id);
                        if (!col) return null;
                        return (
                          <div
                            key={cell.id}
                            className={cn('flex items-center px-3 shrink-0 overflow-hidden', density === 'compact' ? 'text-[11px]' : 'text-xs')}
                            style={{ width: col.width, minWidth: col.minWidth }}
                            onDoubleClick={(e) => { e.stopPropagation(); setEditingCell({ rowId: trade.id, colId: col.id }); }}
                          >
                            {editingCell?.rowId === trade.id && editingCell?.colId === col.id ? (
                              <InlineEdit trade={trade} columnId={col.id} onDone={() => setEditingCell(null)} />
                            ) : (
                              <CellRenderer cell={cell as Cell<TradeTableRow, unknown>} column={col} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Expanded Row */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-b border-white/[0.04]"
                        style={{ transform: `translateY(${virtualRow.start}px)` }}
                      >
                        <RowExpansion trade={trade} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          {!loading && rows.length === 0 && <EmptyState />}
          {loading && <TableSkeleton />}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2 border-t border-white/[0.04]">
        <span className="text-[10px] text-muted-foreground/40">{data.length} trades</span>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/30">
          <button onClick={() => table.setPageIndex(0)} className="px-1.5 py-0.5 rounded hover:bg-white/[0.04]"><Icons.ChevronLeft className="w-3 h-3" /></button>
          <span>{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</span>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="px-1.5 py-0.5 rounded hover:bg-white/[0.04]"><Icons.ChevronRight className="w-3 h-3" /></button>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} trade={contextMenu.row} onClose={() => setContextMenu(null)} />}
    </div>
  );
}
