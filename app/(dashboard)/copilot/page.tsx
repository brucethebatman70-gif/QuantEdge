"use client";

import { CopilotHeader } from "@/components/copilot/copilot-header";
import { ConversationSidebar } from "@/components/copilot/conversation-sidebar";
import { ChatWorkspace } from "@/components/copilot/chat-workspace";
import { ContextPanel } from "@/components/copilot/context-panel";

export default function CopilotPage() {
  return (
    <div className="h-full flex flex-col">
      <CopilotHeader />
      <div className="flex-1 flex overflow-hidden">
        <ConversationSidebar />
        <ChatWorkspace />
        <ContextPanel />
      </div>
    </div>
  );
}
