'use client';
import { motion } from 'framer-motion';
import { Icons } from '@/lib/icons';
import { useDataTableStore } from './data-table-store';
import { COLUMN_META } from './data-table-types';
import type { FilterRule } from './data-table-types';

export function FilterBar() {
  const { filters, addFilter, removeFilter, clearFilters, columns } = useDataTableStore();
  const visibleCols = columns.filter((c) => c.visible && c.id !== 'select' && c.id !== 'actions');

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden border-b border-white/[0.04]"
    >
      <div className="px-4 py-2.5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Filters</span>
          {filters.length > 0 && (
            <button onClick={clearFilters} className="text-[10px] text-muted-foreground/50 hover:text-foreground transition-colors">Clear all</button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const meta = COLUMN_META[f.columnId];
            return (
              <div key={f.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px]">
                <span className="text-muted-foreground/60">{meta?.label || f.columnId}</span>
                <span className="text-muted-foreground/40">{f.operator}</span>
                <span className="text-foreground/80 font-medium">{f.value}</span>
                <button onClick={() => removeFilter(f.id)} className="ml-1 text-muted-foreground/40 hover:text-foreground"><Icons.X className="w-3 h-3" /></button>
              </div>
            );
          })}
          <button
            onClick={() => {
              const col = visibleCols[0];
              if (!col) return;
              addFilter({ id: Date.now().toString(), columnId: col.id, operator: 'contains', value: '' });
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.04] border border-dashed border-white/[0.06] transition-all"
          >
            <Icons.Plus className="w-3 h-3" /> Add filter
          </button>
        </div>
      </div>
    </motion.div>
  );
}
