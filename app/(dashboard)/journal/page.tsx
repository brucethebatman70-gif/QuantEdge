"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { JournalSidebar } from "@/components/journal/journal-sidebar";
import { AiPanel } from "@/components/journal/ai-panel";
import { JournalTimeline } from "@/components/journal/journal-timeline";
import { TradeStory } from "@/components/trade-story";
import { DataTable } from "@/components/data-table";
import { JournalDashboard } from "@/components/trade-story/journal-dashboard";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useJournalStore } from "@/lib/journal/store";
import { mockTrades } from "@/lib/mock-data";
import type { TradeTableRow } from "@/components/data-table";

type Tab = "dashboard" | "journal" | "trades";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { key: "journal", label: "Journal", icon: "BookOpen" },
  { key: "trades", label: "Trades", icon: "Table" },
];

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const selectedId = useJournalStore((s) => s.selectedId);

  const tradeData: TradeTableRow[] = useMemo(
    () => mockTrades.map((t) => {
      const entryPx = t.entryPrice || 0;
      const risk = Math.abs(entryPx - (t.direction === "long" ? entryPx * 0.98 : entryPx * 1.02));
      return {
        ...t,
        rr: risk > 0 ? Number(((t.pnl && t.pnl > 0 ? Math.abs(t.pnl) : 0) / risk).toFixed(2)) : 0,
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
        <div className="shrink-0 flex items-center gap-1 px-4 pt-3 pb-0 border-b border-white/[0.04]">
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
                  <motion.div layoutId="journal-tab" className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === "dashboard" && (
          <div className="flex-1 overflow-hidden">
            <JournalDashboard
              onOpenJournal={() => setActiveTab("journal")}
              onOpenTrades={() => setActiveTab("trades")}
            />
          </div>
        )}

        {activeTab === "journal" && (
          <div className="flex flex-1 overflow-hidden">
            <JournalSidebar />
            <TradeStory />
            <div className="flex">
              <JournalTimeline />
              <AiPanel />
            </div>
          </div>
        )}

        {activeTab === "trades" && (
          <div className="flex-1 overflow-hidden pt-3">
            <DataTable data={tradeData} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
