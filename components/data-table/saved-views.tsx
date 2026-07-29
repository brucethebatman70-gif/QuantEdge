'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/lib/icons';
import { useDataTableStore } from './data-table-store';

export function SavedViewsDropdown() {
  const { views, activeViewId, saveView, loadView, deleteView } = useDataTableStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-muted-foreground/50 hover:text-foreground hover:bg-white/[0.04] transition-all">
        <Icons.Eye className="w-3.5 h-3.5" /> {activeViewId ? views.find((v) => v.id === activeViewId)?.name || 'View' : 'Views'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            className="absolute top-full right-0 mt-1 w-[200px] p-1 rounded-xl overflow-hidden z-20"
            style={{
              background: 'var(--glass-surface)',
              backdropFilter: 'blur(32px) saturate(2)',
              WebkitBackdropFilter: 'blur(32px) saturate(2)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
          >
            {views.map((v) => (
              <div key={v.id} className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] group">
                <button onClick={() => { loadView(v.id); setOpen(false); }} className="flex-1 text-left text-[11px] text-foreground/70">{v.name}</button>
                <button onClick={() => deleteView(v.id)} className="opacity-0 group-hover:opacity-100 p-0.5 text-muted-foreground/40 hover:text-error transition-all"><Icons.X className="w-3 h-3" /></button>
              </div>
            ))}
            <div className="border-t border-white/[0.06] mt-1 pt-1">
              <button
                onClick={() => { const name = prompt('View name:'); if (name) { saveView(name); setOpen(false); } }}
                className="flex w-full items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.04] transition-all"
              >
                <Icons.Plus className="w-3 h-3" /> Save current view
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
