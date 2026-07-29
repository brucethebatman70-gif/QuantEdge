'use client';
import { cn } from '@/lib/cn';
import { Icons } from '@/lib/icons';
import { useDataTableStore } from './data-table-store';
import type { TableDensity } from './data-table-types';

const DENSITY_OPTIONS: { key: TableDensity; label: string; icon: string }[] = [
  { key: 'compact', label: 'Compact', icon: 'Minus' },
  { key: 'normal', label: 'Normal', icon: 'Menu' },
  { key: 'comfortable', label: 'Comfortable', icon: 'ChevronDown' },
];

export function DensityToggle() {
  const { density, setDensity } = useDataTableStore();
  return (
    <div className="flex items-center gap-0.5">
      {DENSITY_OPTIONS.map((opt) => {
        const Icon = Icons[opt.icon as keyof typeof Icons] || Icons.Menu;
        return (
          <button
            key={opt.key}
            onClick={() => setDensity(opt.key)}
            className={cn(
              'p-1.5 rounded-lg transition-all',
              density === opt.key
                ? 'bg-white/[0.08] text-foreground'
                : 'text-muted-foreground/40 hover:text-foreground/60 hover:bg-white/[0.03]'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}
