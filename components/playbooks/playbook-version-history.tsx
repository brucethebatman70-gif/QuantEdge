"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { usePlaybookStore } from "@/lib/playbooks/store";

export function PlaybookVersionHistory() {
  const { selectedId, playbooks } = usePlaybookStore();
  const playbook = selectedId ? playbooks.find((p) => p.id === selectedId) : null;

  if (!playbook || playbook.versions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
        <Icons.History className="h-8 w-8 mb-2 opacity-20" />
        <p className="text-xs text-center">No version history</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Icons.History className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">Version History</span>
      </div>

      <div className="space-y-2">
        {[...playbook.versions].reverse().map((v, i) => (
          <div key={v.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`h-2.5 w-2.5 rounded-full border-2 ${i === 0 ? "bg-primary border-primary" : "border-muted-foreground/30"}`} />
              {i < playbook.versions.length - 1 && <div className="w-px flex-1 bg-border" />}
            </div>
            <div className="flex-1 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">v{v.version}</span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(v.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {i === 0 && (
                  <span className="text-[10px] text-primary font-medium">Current</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{v.changes}</p>
              {i > 0 && (
                <div className="flex gap-2 mt-1">
                  <Button variant="ghost" size="xs" className="text-[10px]">
                    <Icons.RotateCcw className="mr-1 h-3 w-3" />
                    Restore
                  </Button>
                  <Button variant="ghost" size="xs" className="text-[10px]">
                    <Icons.GitCompare className="mr-1 h-3 w-3" />
                    Compare
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
