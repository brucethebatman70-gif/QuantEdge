'use client';
import { cn } from '@/lib/cn';
import { Icons } from '@/lib/icons';

const STATUS_CONFIG = {
  open: { label: 'Open', color: 'text-warning bg-warning/10', icon: 'Radio' },
  closed: { label: 'Closed', color: 'text-success bg-success/10', icon: 'CheckCircle2' },
} as const;

export function StatusBadge({ status }: { status: 'open' | 'closed' }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.closed;
  const Icon = Icons[cfg.icon];
  return (
    <div className={cn('flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium w-fit', cfg.color)}>
      {Icon && <Icon className="w-2.5 h-2.5" />}
      {cfg.label}
    </div>
  );
}
