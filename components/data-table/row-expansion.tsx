'use client';
import { Icons } from '@/lib/icons';
import type { TradeTableRow } from './data-table-types';

export function RowExpansion({ trade }: { trade: TradeTableRow }) {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Execution</span>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]"><span className="text-muted-foreground/60">Setup</span><span className="text-foreground/80">{trade.setup}</span></div>
            <div className="flex justify-between text-[11px]"><span className="text-muted-foreground/60">Entry</span><span className="text-foreground/80">${trade.entryPrice?.toFixed(2)}</span></div>
            <div className="flex justify-between text-[11px]"><span className="text-muted-foreground/60">Exit</span><span className="text-foreground/80">{trade.exitPrice ? '$' + trade.exitPrice.toFixed(2) : '—'}</span></div>
            <div className="flex justify-between text-[11px]"><span className="text-muted-foreground/60">Quantity</span><span className="text-foreground/80">{trade.quantity}</span></div>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Psychology</span>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]"><span className="text-muted-foreground/60">Emotion</span><span className="text-foreground/80">{trade.emotion}</span></div>
            {trade.mistake && <div className="flex justify-between text-[11px]"><span className="text-muted-foreground/60">Mistake</span><span className="text-error/80">{trade.mistake}</span></div>}
            {trade.lesson && <div className="flex justify-between text-[11px]"><span className="text-muted-foreground/60">Lesson</span><span className="text-success/80">{trade.lesson}</span></div>}
          </div>
        </div>
      </div>
      {trade.notes && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Notes</span>
          <p className="text-[11px] text-foreground/70 leading-relaxed">{trade.notes}</p>
        </div>
      )}
      <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all"><Icons.Brain className="w-3 h-3" /> AI Review</button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.04] text-foreground/60 hover:bg-white/[0.08] transition-all"><Icons.Edit className="w-3 h-3" /> Edit</button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.04] text-foreground/60 hover:bg-white/[0.08] transition-all"><Icons.Share2 className="w-3 h-3" /> Export</button>
      </div>
    </div>
  );
}
