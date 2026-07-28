"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { JournalSidebar } from "@/components/journal/journal-sidebar";
import { JournalEditor } from "@/components/journal/journal-editor";
import { AiPanel } from "@/components/journal/ai-panel";
import { JournalTimeline } from "@/components/journal/journal-timeline";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function JournalPage() {
  return (
    <DashboardLayout>
      <TooltipProvider delayDuration={300}>
        <div className="flex h-full">
          <JournalSidebar />
          <JournalEditor />
          <div className="flex">
            <JournalTimeline />
            <AiPanel />
          </div>
        </div>
      </TooltipProvider>
    </DashboardLayout>
  );
}
