"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { JournalSidebar } from "@/components/journal/journal-sidebar";
import { JournalEditor } from "@/components/journal/journal-editor";
import { AiPanel } from "@/components/journal/ai-panel";
import { JournalTimeline } from "@/components/journal/journal-timeline";
import { DataTable } from "@/components/data-table";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { mockTrades } from "@/lib/mock-data";
import type { TradeTableRow } from "@/components/data-table";

type Tab = "journal" | "trades";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "journal", label: "Journal", icon: "BookOpen" },
  { key: "trades", label: "Trades", icon: "Table" },
];

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("trades");

  const tradeData: TradeTableRow[] = useMemo(
    () => mockTrades.map((t) => {
      const entryPx = t.entryPrice || 0;
      const exitPx = t.exitPrice || 0;
      const risk = Math.abs(entryPx - (t.direction === "long" ? entryPx * 0.98 : entryPx * 1.02));
      const reward = t.pnl ? Math.abs(t.pnl) : 0;
      return {
        ...t,
        rr: risk > 0 ? Number(((t.pnl && t.pnl > 0 ? reward : 0) / risk).toFixed(2)) : 0,
        session: new Date(t.entryDate).getHours() < 12 ? "Morning" : "Afternoon",
        account: "Main Account",
        broker: "Interactive Brokers",
        fees: 0,
        notes: "",
        screenshot: null,
      } as TradeTableRow;
    }),
    []
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Tab Bar */}
        <div className="shrink-0 flex items-center gap-1 px-4 pt-3 pb-0">
          {TABS.map((tab) => {
            const Icon = Icons[tab.icon as keyof typeof Icons] || Icons.BookOpen;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-[12px] font-medium transition-all relative",
                  activeTab === tab.key
                    ? "text-foreground bg-white/[0.04]"
                    : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-white/[0.02]"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === "journal" ? (
          <div className="flex flex-1 overflow-hidden">
            <JournalSidebar />
            <JournalEditor />
            <div className="flex">
              <JournalTimeline />
              <AiPanel />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden pt-3">
            <DataTable data={tradeData} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
