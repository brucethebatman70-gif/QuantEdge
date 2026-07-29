'use client';
import { useState, useRef, useEffect } from 'react';
import type { TradeTableRow } from './data-table-types';

export function InlineEdit({ trade, columnId, onDone }: { trade: TradeTableRow; columnId: string; onDone: () => void }) {
  const initialValue = String((trade as unknown as Record<string, unknown>)[columnId] ?? '');
  const [value, setValue] = useState(initialValue);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  const handleDone = () => {
    (trade as unknown as Record<string, unknown>)[columnId] = value;
    onDone();
  };

  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleDone}
      onKeyDown={(e) => { if (e.key === 'Enter') handleDone(); if (e.key === 'Escape') onDone(); }}
      className="w-full h-6 px-1.5 text-[11px] bg-white/[0.08] border border-primary/30 rounded text-foreground outline-none"
    />
  );
}
