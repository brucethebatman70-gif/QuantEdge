"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCopilotStore } from "@/lib/copilot/store";
import { formatDate } from "@/lib/utils";

const FOLDER_ICONS: Record<string, React.ElementType> = {
  Performance: Icons.TrendingUp,
  Risk: Icons.Shield,
  Psychology: Icons.Brain,
  Strategy: Icons.BarChart3,
};

export function ConversationSidebar() {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    deleteConversation,
    togglePinConversation,
    createConversation,
    folders,
    selectedFolder,
    setSelectedFolder,
    showPinnedOnly,
    setShowPinnedOnly,
    searchQuery,
  } = useCopilotStore();

  const filtered = useMemo(() => {
    let result = conversations;
    if (showPinnedOnly) result = result.filter((c) => c.pinned);
    if (selectedFolder) {
      const folder = folders.find((f) => f.id === selectedFolder);
      if (folder) result = result.filter((c) => folder.conversationIds.includes(c.id));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) => c.title.toLowerCase().includes(q) || c.tags.some((t) => t.includes(q))
      );
    }
    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [conversations, showPinnedOnly, selectedFolder, searchQuery, folders]);

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col overflow-hidden">
      <div className="p-3 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full justify-start text-xs", !selectedFolder && !showPinnedOnly && "bg-muted")}
          onClick={() => { setSelectedFolder(null); setShowPinnedOnly(false); }}
        >
          <Icons.MessageSquare className="mr-2 h-3.5 w-3.5" />
          All Chats
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full justify-start text-xs", showPinnedOnly && "bg-muted")}
          onClick={() => { setShowPinnedOnly(!showPinnedOnly); setSelectedFolder(null); }}
        >
          <Icons.Star className="mr-2 h-3.5 w-3.5" />
          Pinned
        </Button>
        <Separator />
        <div className="space-y-0.5">
          {folders.map((folder) => {
            const FolderIcon = FOLDER_ICONS[folder.name] || Icons.Folder;
            return (
              <Button
                key={folder.id}
                variant="ghost"
                size="sm"
                className={cn("w-full justify-start text-xs", selectedFolder === folder.id && "bg-muted")}
                onClick={() => setSelectedFolder(selectedFolder === folder.id ? null : folder.id)}
              >
                <FolderIcon className="mr-2 h-3.5 w-3.5" />
                {folder.name}
                <span className="ml-auto text-[10px] text-muted-foreground">{folder.conversationIds.length}</span>
              </Button>
            );
          })}
        </div>
        <Separator />
      </div>

      <div className="px-3 mb-1 flex items-center justify-between">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Recent Chats
        </span>
        <Button variant="ghost" size="icon-xs" onClick={() => createConversation()}>
          <Icons.Plus className="h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 pb-2">
        <div className="space-y-0.5">
          {filtered.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1];
            const preview = lastMsg
              ? lastMsg.content.replace(/[#*`>\|]/g, "").slice(0, 60) + "..."
              : "No messages yet";
            return (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setActiveConversation(conv.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveConversation(conv.id); } }}
                className={cn(
                  "w-full text-left rounded-lg px-3 py-2 transition-all group cursor-pointer",
                  activeConversationId === conv.id
                    ? "bg-accent/10 border border-accent/20"
                    : "hover:bg-muted/50 border border-transparent"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {conv.pinned && <Icons.Star className="h-2.5 w-2.5 text-warning shrink-0" />}
                      <span className={cn(
                        "text-xs font-medium truncate",
                        activeConversationId === conv.id ? "text-foreground" : "text-foreground/80"
                      )}>
                        {conv.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">{preview}</p>
                    <p className="text-[9px] text-muted-foreground/50 mt-0.5">{formatDate(conv.updatedAt)}</p>
                  </div>
                  <div className="flex shrink-0 gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={(e) => { e.stopPropagation(); togglePinConversation(conv.id); }}
                    >
                      <Icons.Star className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                      className="text-error/60 hover:text-error"
                    >
                      <Icons.Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Icons.MessageSquare className="h-6 w-6 mb-2 opacity-20" />
              <p className="text-[10px]">No conversations found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
