'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Icons } from '@/lib/icons';
import type { TradeTableRow } from './data-table-types';

export function ContextMenu({ x, y, trade, onClose }: { x: number; y: number; trade: TradeTableRow; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const items = [
    { label: 'Open Trade', icon: 'TrendingUp', action: () => {} },
    { label: 'Analyze', icon: 'Brain', action: () => {} },
    { label: 'Duplicate', icon: 'Copy', action: () => {} },
    { label: 'Archive', icon: 'Archive', action: () => {} },
    { label: 'Export', icon: 'Download', action: () => {} },
    { type: 'separator' as const },
    { label: 'Copy Symbol', icon: 'Copy', action: () => navigator.clipboard.writeText(trade.symbol) },
    { label: 'Open Journal', icon: 'BookOpen', action: () => {} },
    { type: 'separator' as const },
    { label: 'Delete', icon: 'Trash2', action: () => {}, danger: true },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed z-[100] min-w-[180px] py-1 rounded-xl overflow-hidden"
      style={{
        left: x, top: y,
        background: 'var(--glass-surface)',
        backdropFilter: 'blur(32px) saturate(2)',
        WebkitBackdropFilter: 'blur(32px) saturate(2)',
        border: '1px solid var(--glass-border)',
        borderTop: '1px solid var(--glass-highlight)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 24px 48px rgba(0,0,0,0.08)',
      }}
    >
      {items.map((item, i) => {
        if ('type' in item) return <div key={i} className="mx-2 my-1 h-px bg-white/[0.06]" />;
        const Icon = Icons[item.icon as keyof typeof Icons] || Icons.HelpCircle;
        return (
          <button
            key={i}
            onClick={() => { item.action(); onClose(); }}
            className={cn('flex w-full items-center gap-2.5 px-3 py-1.5 text-[12px] transition-colors', item.danger ? 'text-error hover:bg-error/10' : 'text-foreground/70 hover:text-foreground hover:bg-white/[0.04]')}
          >
            <Icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        );
      })}
    </motion.div>
  );
}
