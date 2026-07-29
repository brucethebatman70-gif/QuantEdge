"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useCopilotStore } from "@/lib/copilot/store";
import type { CopilotMessage } from "@/lib/copilot/types";
import { mockAiResponses } from "@/lib/copilot/mock-data";

export function PremiumChat() {
  const { activeConversationId, conversations, isStreaming, setView, setActiveConversation, createConversation, addMessage, setIsStreaming, memory } = useCopilotStore();
  const [input, setInput] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConversationId);
  const messages = activeConv?.messages ?? [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, streamingContent, scrollToBottom]);

  const getResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("perform") || q.includes("pnl") || q.includes("profit")) return mockAiResponses.performance;
    if (q.includes("risk") || q.includes("drawdown") || q.includes("exposure")) return mockAiResponses.risk;
    if (q.includes("mistake") || q.includes("wrong") || q.includes("error")) return mockAiResponses.mistakes;
    if (q.includes("goal") || q.includes("target") || q.includes("progress")) return mockAiResponses.goals;
    if (q.includes("week") || q.includes("month") || q.includes("trend")) return mockAiResponses.weekly;
    if (q.includes("compare") || q.includes("vs") || q.includes("better")) return mockAiResponses.compare;
    if (q.includes("plan") || q.includes("improve") || q.includes("better") || q.includes("fix")) return mockAiResponses.plan;
    return mockAiResponses.default;
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");

    if (!activeConversationId) {
      const id = createConversation("Trade Analysis");
      const userMsg: CopilotMessage = { id: `msg_${Date.now()}`, role: "user", content: text, timestamp: new Date().toISOString() };
      addMessage(id, userMsg);
    } else {
      const userMsg: CopilotMessage = { id: `msg_${Date.now()}`, role: "user", content: text, timestamp: new Date().toISOString() };
      addMessage(activeConversationId, userMsg);
    }

    setIsStreaming(true);
    setStreamingContent("");

    const fullResponse = getResponse(text);
    let idx = 0;
    const interval = setInterval(() => {
      idx += 2;
      setStreamingContent(fullResponse.slice(0, idx));
      if (idx >= fullResponse.length) {
        clearInterval(interval);
        setIsStreaming(false);
        if (activeConversationId) {
          const aiMsg: CopilotMessage = { id: `msg_${Date.now()}`, role: "assistant", content: fullResponse, timestamp: new Date().toISOString(), metadata: { type: "analysis", score: 85, confidence: "high" } };
          addMessage(activeConversationId, aiMsg);
        }
        setStreamingContent("");
      }
    }, 15);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <button onClick={() => setView("home")} className="flex items-center gap-1.5 text-[10px] text-muted-foreground/40 hover:text-foreground/70 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Home
          </button>
          <span className="text-[10px] text-muted-foreground/20">/</span>
          <span className="text-xs font-medium truncate max-w-[240px]">{activeConv?.title ?? "New Chat"}</span>
          {activeConv?.pinned && <span className="text-[9px] text-muted-foreground/30">📌</span>}
        </div>
        <div className="flex items-center gap-2">
          <ProfileChip />
          <span className="flex items-center gap-1.5 text-[9px] text-muted-foreground/30">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {memory.tradingStyle}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && !isStreaming && (
          <WelcomeScreen onSelect={(q) => setInput(q)} />
        )}
        {messages.map((msg) => (
          <MessageBlock key={msg.id} message={msg} />
        ))}
        {isStreaming && streamingContent && (
          <MessageBlock
            message={{
              id: "streaming",
              role: "assistant",
              content: streamingContent,
              timestamp: new Date().toISOString(),
              metadata: { type: "analysis" },
            }}
            isStreaming
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 px-4 py-3 border-t border-white/[0.04]">
        <div className="relative flex items-end gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2 focus-within:border-white/[0.12] transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your trading..."
            rows={1}
            className="flex-1 bg-transparent text-xs outline-none resize-none py-1 placeholder:text-muted-foreground/30"
            style={{ minHeight: 20, maxHeight: 80 }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="shrink-0 rounded-lg bg-[#00D4AA] hover:bg-[#00D4AA]/80 disabled:opacity-30 p-1.5 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div className="flex items-center gap-2 mt-1.5 px-1">
          <MemoryIndicator memory={memory} />
        </div>
      </div>
    </div>
  );
}

function ProfileChip() {
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2 py-1">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 20c0-4 4-7 10-7s10 3 10 7"/></svg>
      <span className="text-[9px] text-muted-foreground/50">Analyst Mode</span>
    </div>
  );
}

function MemoryIndicator({ memory }: { memory: { knownInfo: string[]; tradingStyle: string } }) {
  return (
    <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground/20">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
      Knows: {memory.knownInfo[0]?.slice(0, 40)}...
    </div>
  );
}

function MessageBlock({ message, isStreaming }: { message: CopilotMessage; isStreaming?: boolean }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-lg ${isUser ? "bg-[#00D4AA]/20" : "bg-[#8b5cf6]/20"}`}>
        {isUser ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00D4AA]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8b5cf6]"><path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 20c0-4 4-7 10-7s10 3 10 7"/></svg>
        )}
      </div>
      <div className={`flex-1 min-w-0 ${isUser ? "max-w-[80%]" : ""}`}>
        <div className={`rounded-xl px-3.5 py-2.5 ${isUser ? "bg-[#00D4AA]/10 border border-[#00D4AA]/15" : "bg-white/[0.03] border border-white/[0.06]"}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[9px] font-medium ${isUser ? "text-[#00D4AA]/70" : "text-[#8b5cf6]/70"}`}>
              {isUser ? "You" : "AI Analyst"}
            </span>
            {message.metadata?.confidence && (
              <span className="text-[8px] text-muted-foreground/30 px-1.5 py-0.5 rounded bg-white/[0.04]">
                {message.metadata.confidence === "very-high" ? "Very High" : message.metadata.confidence.charAt(0).toUpperCase() + message.metadata.confidence.slice(1)} Confidence
              </span>
            )}
            {message.metadata?.type && (
              <span className={`text-[8px] px-1.5 py-0.5 rounded ${
                message.metadata.type === "warning" ? "bg-warning/10 text-warning" :
                message.metadata.type === "success" ? "bg-success/10 text-success" :
                message.metadata.type === "insight" ? "bg-[#06E0FF]/10 text-[#06E0FF]" :
                "bg-white/[0.04] text-muted-foreground/40"
              }`}>
                {message.metadata.type}
              </span>
            )}
          </div>
          <div className="text-[11px] leading-relaxed opacity-80 whitespace-pre-wrap">
            {message.content}
            {isStreaming && <span className="inline-block w-0.5 h-3.5 bg-[#00D4AA] ml-0.5 animate-pulse" />}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-[8px] text-muted-foreground/20">
            {new Date(message.timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          </span>
          {message.metadata?.sources?.map((s) => (
            <span key={s} className="text-[8px] text-muted-foreground/30 px-1.5 py-0.5 rounded bg-white/[0.03]">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({ onSelect }: { onSelect: (text: string) => void }) {
  const suggestions = [
    "Analyze my last 10 trades",
    "Review my risk management",
    "How can I improve my win rate?",
    "Generate a weekly performance report",
    "Compare this month to last month",
    "Find my biggest recurring mistake",
    "Check my trading psychology",
    "Create an improvement plan",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full py-16 px-6">
      <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-[#8b5cf6]/15 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 20c0-4 4-7 10-7s10 3 10 7"/></svg>
      </div>
      <h2 className="text-base font-semibold opacity-80 mb-1">Ask Your AI Analyst</h2>
      <p className="text-[11px] text-muted-foreground/50 text-center max-w-sm mb-6">
        Your personal trading analyst, coach, and risk manager. Trained on your data and ready to help.
      </p>
      <div className="grid grid-cols-2 gap-2 max-w-lg w-full">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="text-left text-[9px] text-muted-foreground/60 hover:text-foreground/80 px-2.5 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
