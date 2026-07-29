"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/lib/icons";
import { useCopilotStore } from "@/lib/copilot/store";
import { mockAiResponses } from "@/lib/copilot/mock-data";
import { generateId } from "@/lib/utils";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { SuggestedActions } from "./suggested-actions";
import type { CopilotMessage } from "@/lib/copilot/types";

export function ChatWorkspace() {
  const {
    conversations,
    activeConversationId,
    isStreaming,
    setIsStreaming,
    addMessage,
    createConversation,
  } = useCopilotStore();

  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [activeConversation?.messages, scrollToBottom]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userText = input.trim();
    setInput("");

    let convId = activeConversationId;
    if (!convId) {
      convId = createConversation(userText.slice(0, 40));
    }

    const userMsg: CopilotMessage = {
      id: `msg_${generateId()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toISOString(),
    };
    addMessage(convId, userMsg);
    setShowSuggestions(false);

    setIsStreaming(true);

    await new Promise((r) => setTimeout(r, 500 + Math.random() * 1500));

    const responseText = getResponse(userText.toLowerCase());

    const assistantMsg: CopilotMessage = {
      id: `msg_${generateId()}`,
      role: "assistant",
      content: responseText,
      timestamp: new Date().toISOString(),
      metadata: {
        type: detectType(userText),
        sources: ["Dashboard", "Analytics", "Journal", "Trades"].slice(0, Math.floor(Math.random() * 4) + 1),
        score: Math.floor(Math.random() * 30) + 65,
      },
    };
    addMessage(convId, assistantMsg);
    setIsStreaming(false);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {activeConversation ? (
        <>
          <ScrollArea ref={scrollRef} className="flex-1">
            <div className="p-4 space-y-3 max-w-3xl mx-auto">
              <AnimatePresence>
                {activeConversation.messages.map((msg, i) => (
                  <MessageBubble key={msg.id} message={msg} index={i} />
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {isStreaming && <TypingIndicator />}
              </AnimatePresence>
              {!activeConversation.messages.length && !isStreaming && (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <Icons.Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">How can I help you trade better today?</h2>
                  <p className="text-xs text-muted-foreground mb-6">
                    Ask me to review your performance, analyze risk, or generate insights.
                  </p>
                  <SuggestedActions onSelect={(text) => { setInput(text); setShowSuggestions(false); }} />
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-border bg-background/80 backdrop-blur-lg p-4">
            <div className="max-w-3xl mx-auto">
              {showSuggestions && activeConversation.messages.length === 0 && (
                <div className="mb-3">
                  <SuggestedActions onSelect={(text) => { setInput(text); setShowSuggestions(false); }} compact />
                </div>
              )}
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Ask your AI Copilot..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[44px] max-h-32 resize-none pr-10 text-sm"
                    rows={1}
                  />
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="absolute right-2 bottom-2 text-muted-foreground"
                  >
                    <Icons.Mic className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className="h-11 w-11 shrink-0"
                >
                  <Icons.ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[9px] text-muted-foreground/50 text-center mt-2">
                AI Copilot can analyze trades, review performance, and provide personalized coaching
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
              <Icons.Bot className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Welcome to AI Copilot</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your intelligent trading partner. Get personalized insights, analyze performance,
              and improve your trading with AI-powered coaching.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              {[
                { label: "New Chat", icon: Icons.MessageSquare, onClick: () => createConversation() },
                { label: "Review Today", icon: Icons.Activity, onClick: () => createConversation("Today's Performance Review") },
                { label: "Risk Check", icon: Icons.Shield, onClick: () => createConversation("Risk Analysis") },
                { label: "Goal Progress", icon: Icons.Target, onClick: () => createConversation("Goal Progress") },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:bg-accent/5 transition-all"
                >
                  <action.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function detectType(text: string): "analysis" | "review" | "insight" | "suggestion" | "warning" | "success" | "error" | undefined {
  if (text.includes("risk") || text.includes("drawdown")) return "warning";
  if (text.includes("review") || text.includes("performance") || text.includes("today") || text.includes("week")) return "review";
  if (text.includes("goal") || text.includes("progress")) return "insight";
  if (text.includes("mistake") || text.includes("improve") || text.includes("plan")) return "suggestion";
  if (text.includes("compare")) return "analysis";
  return "analysis";
}

function getResponse(text: string): string {
  if (text.includes("today") || text.includes("performance") || text.includes("review")) {
    return mockAiResponses.performance;
  }
  if (text.includes("risk") || text.includes("drawdown") || text.includes("position")) {
    return mockAiResponses.risk;
  }
  if (text.includes("mistake") || text.includes("wrong") || text.includes("pattern")) {
    return mockAiResponses.mistakes;
  }
  if (text.includes("goal") || text.includes("progress") || text.includes("tracking")) {
    return mockAiResponses.goals;
  }
  if (text.includes("week") || text.includes("weekly") || text.includes("report")) {
    return mockAiResponses.weekly;
  }
  if (text.includes("compare") || text.includes("month") || text.includes("vs")) {
    return mockAiResponses.compare;
  }
  if (text.includes("plan") || text.includes("improve")) {
    return mockAiResponses.plan;
  }
  return mockAiResponses.default;
}
