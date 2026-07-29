"use client";

import { useCopilotStore } from "@/lib/copilot/store";
import { AiHomeDashboard } from "@/components/copilot/ai-home-dashboard";
import { PremiumChat } from "@/components/copilot/premium-chat";
import { ConversationSidebar } from "@/components/copilot/conversation-sidebar";
import { ContextPanel } from "@/components/copilot/context-panel";
import { CopilotHeader } from "@/components/copilot/copilot-header";

export default function CopilotPage() {
  const { view } = useCopilotStore();

  if (view === "home") {
    return <AiHomeDashboard />;
  }

  return (
    <div className="h-full flex flex-col">
      <CopilotHeader />
      <div className="flex-1 flex overflow-hidden">
        <ConversationSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <PremiumChat />
        </div>
        <ContextPanel />
      </div>
    </div>
  );
}
