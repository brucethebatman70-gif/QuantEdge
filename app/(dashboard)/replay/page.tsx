"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ReplayHeader } from "@/components/replay/replay-header";
import { ReplayChart } from "@/components/replay/replay-chart";
import { EventTimeline } from "@/components/replay/event-timeline";
import { TradePanel } from "@/components/replay/trade-panel";
import { CompareMode } from "@/components/replay/compare-mode";
import { Annotations } from "@/components/replay/annotations";
import { ScreenshotGallery } from "@/components/replay/screenshot-gallery";
import { useReplayStore } from "@/lib/replay/store";

export default function ReplayPage() {
  const { selectedTradeId } = useReplayStore();

  return (
    <DashboardLayout title="Trade Replay">
      <div className="flex h-full flex-col gap-4">
        <ReplayHeader />
        <CompareMode />
        <div className="flex flex-1 gap-4 overflow-hidden">
          <div className="flex flex-1 flex-col gap-4 min-w-0">
            <ReplayChart />
            {selectedTradeId && <EventTimeline />}
          </div>
          {selectedTradeId && (
            <div className="flex w-72 shrink-0 flex-col gap-4">
              <TradePanel />
              <Annotations />
              <ScreenshotGallery />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
