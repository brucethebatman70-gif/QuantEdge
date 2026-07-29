"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { useCopilotStore } from "@/lib/copilot/store";

export function CopilotHeader() {
  const { view, setView, createConversation, searchQuery, setSearchQuery } = useCopilotStore();

  if (view === "home") return null;

  return (
    <header className="flex items-center justify-between gap-4 px-5 py-2.5 border-b border-white/[0.04] bg-background/80 backdrop-blur-lg shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={() => setView("home")} className="flex items-center gap-1.5 text-[10px] text-muted-foreground/40 hover:text-foreground/70 transition-colors px-2 py-1 rounded-md hover:bg-white/[0.04]">
          <Icons.ChevronLeft className="h-3 w-3" />
          Back
        </button>
        <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#00D4AA] to-[#06E0FF] flex items-center justify-center">
          <Icons.Bot className="h-3 w-3 text-black" />
        </div>
        <h1 className="text-sm font-semibold text-foreground">AI Copilot</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-48">
          <Icons.Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-7 text-[10px] bg-white/[0.04] border-white/[0.06]"
          />
        </div>
        <Button variant="ghost" size="icon-sm" className="h-7 w-7">
          <Icons.Upload className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon-sm" className="h-7 w-7">
          <Icons.Settings className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" onClick={() => createConversation()} className="h-7 text-[10px]">
          <Icons.Plus className="mr-1 h-3 w-3" />
          New Chat
        </Button>
      </div>
    </header>
  );
}
