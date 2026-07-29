"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import type { PlaybookSetup as PlaybookSetupType } from "@/lib/playbooks/types";

interface Props {
  setup: PlaybookSetupType;
  onChange?: (setup: PlaybookSetupType) => void;
  readOnly?: boolean;
}

const SECTIONS: { key: keyof PlaybookSetupType; label: string; icon: React.ElementType }[] = [
  { key: "marketConditions", label: "Market Conditions", icon: Icons.TrendingUp },
  { key: "entryRules", label: "Entry Rules", icon: Icons.LogIn },
  { key: "confirmationRules", label: "Confirmation Rules", icon: Icons.CheckCircle2 },
  { key: "invalidationRules", label: "Invalidation Rules", icon: Icons.XCircle },
  { key: "stopLossRules", label: "Stop Loss Rules", icon: Icons.Shield },
  { key: "takeProfitRules", label: "Take Profit Rules", icon: Icons.Target },
  { key: "managementRules", label: "Management Rules", icon: Icons.Sliders },
  { key: "riskRules", label: "Risk Rules", icon: Icons.AlertTriangle },
  { key: "commonMistakes", label: "Common Mistakes", icon: Icons.AlertCircle },
  { key: "checklist", label: "Pre-Trade Checklist", icon: Icons.ListChecks },
];

export function PlaybookSetupSection({ setup, readOnly }: Props) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(SECTIONS.map((s) => s.key)));

  const toggleSection = (key: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (!setup) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <Icons.ListChecks className="h-4 w-4 text-primary" />
        Setup Structure
      </h3>
      <div className="space-y-1">
        {SECTIONS.map(({ key, label, icon: Icon }) => {
          const value = setup[key];
          const isArray = Array.isArray(value);
          const isOpen = openSections.has(key);
          const count = isArray ? value.length : value ? 1 : 0;

          return (
            <div key={key} className="rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleSection(key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                <Badge variant={count > 0 ? "secondary" : "outline"} className="text-[10px]">
                  {count}
                </Badge>
                <Icons.ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-3 pb-3 space-y-1.5">
                  {isArray ? (
                    value.length > 0 ? (
                      value.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground italic">No rules defined yet.</p>
                    )
                  ) : value ? (
                    <p className="text-xs text-muted-foreground">{value}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Not specified.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
