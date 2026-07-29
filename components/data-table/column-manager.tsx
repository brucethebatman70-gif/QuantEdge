'use client';
import { motion } from 'framer-motion';
import { Icons } from '@/lib/icons';
import { cn } from '@/lib/cn';
import { useDataTableStore } from './data-table-store';
import { COLUMN_META } from './data-table-types';

export function ColumnManager() {
  const { columns, toggleColumnVisibility, reorderColumns, setShowColumnManager } = useDataTableStore();
  const visibleCols = columns.filter(c => c.id !== 'select' && c.id !== 'actions');

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden border-b border-white/[0.04]"
    >
      <div className="px-4 py-2.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Column Visibility</span>
          <button onClick={() => setShowColumnManager(false)} className="text-muted-foreground/40 hover:text-foreground"><Icons.X className="w-3 h-3" /></button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {visibleCols.map((col) => (
            <button
              key={col.id}
              onClick={() => toggleColumnVisibility(col.id)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] transition-all border',
                col.visible
                  ? 'bg-white/[0.06] border-white/[0.08] text-foreground/80'
                  : 'bg-transparent border-transparent text-muted-foreground/40 hover:text-foreground/60'
              )}
            >
              {col.visible ? <Icons.Eye className="w-3 h-3" /> : <Icons.EyeOff className="w-3 h-3" />}
              {COLUMN_META[col.id]?.label || col.id}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
