"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { useCopilotStore } from "@/lib/copilot/store";

export function CopilotHeader() {
  const { createConversation, searchQuery, setSearchQuery } = useCopilotStore();

  return (
    <header className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
          <Icons.Bot className="h-4 w-4 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">AI Copilot</h1>
          <p className="text-[10px] text-muted-foreground">Your personal AI trading coach.</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-56">
          <Icons.Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
        <Button variant="ghost" size="icon-sm">
          <Icons.Upload className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Icons.Settings className="h-4 w-4" />
        </Button>
        <Button size="sm" onClick={() => createConversation()}>
          <Icons.Plus className="mr-1.5 h-3.5 w-3.5" />
          New Chat
        </Button>
      </div>
    </header>
  );
}
