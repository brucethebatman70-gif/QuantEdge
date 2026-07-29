"use client";

import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

export function SettingsKeyboardShortcuts() {
  const { keyboardShortcuts } = useSettingsStore();

  const grouped = keyboardShortcuts.reduce<Record<string, typeof keyboardShortcuts>>((acc, ks) => {
    if (!acc[ks.category]) acc[ks.category] = [];
    acc[ks.category].push(ks);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">Keyboard Shortcuts</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Speed up your workflow with keyboard shortcuts.</p>
      </div>

      {Object.entries(grouped).map(([category, shortcuts]) => (
        <div key={category}>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">{category}</p>
          <div className="rounded-xl border border-border divide-y divide-border">
            {shortcuts.map((ks) => (
              <div key={ks.id} className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-foreground">{ks.label}</span>
                <kbd className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground border border-border">
                  {ks.keys}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
        <Icons.Keyboard className="h-3 w-3" />Press <kbd className="px-1 py-0.5 rounded bg-muted text-[9px] font-mono">⌘K</kbd> to view all shortcuts
      </p>
    </div>
  );
}
