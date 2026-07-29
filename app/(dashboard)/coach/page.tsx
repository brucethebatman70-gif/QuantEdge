"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { mockAnalytics } from "@/lib/mock-data";
import { AiLoading } from "@/components/loading/ai-loading";

const aiResponses: Record<string, { bot: string }> = {
  "hello": { bot: "Hi! I'm your AI trading coach. I've analyzed your last 50 trades. Would you like a performance review?" },
  "yes": { bot: "Based on my analysis, your biggest strength is risk management (avg loss: -$180). Your main area for improvement is emotional trading during high volatility. Your breakout setup has 72% win rate — consider scaling that up." },
  "default": { bot: "I can help with performance analysis, trade patterns, risk management, and personalized coaching. What would you like to explore?" },
};

const quickActions = [
  "Analyze my recent trades",
  "What am I doing wrong?",
  "Review my risk management",
  "Suggest improvements",
];

export default function CoachPage() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "bot", text: aiResponses["hello"].bot },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const key = userText.toLowerCase().includes("analyz") || userText.toLowerCase().includes("review") ? "yes" : "default";
      const response = aiResponses[key]?.bot || aiResponses["default"].bot;
      setMessages(prev => [...prev, { role: "bot", text: response }]);
      setThinking(false);
    }, 800);
  };

  return (
    <DashboardLayout title="AI Trading Coach">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            AI-powered insights and personalized coaching
          </p>
          <Button size="sm" variant="premium">
            <Icons.Zap className="mr-2 h-4 w-4" />
            Full Analysis
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>AI Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[450px] flex-col rounded-lg border border-border/50">
                <div className="flex-1 space-y-4 overflow-auto p-4">
                  {thinking && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icons.Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="rounded-lg p-3 w-full max-w-[80%]">
                        <AiLoading
                          stages={["Analyzing", "Processing", "Generating Response"]}
                          autoProgress
                        />
                      </div>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                      {msg.role === "bot" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icons.Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 text-sm max-w-[80%] ${
                          msg.role === "user"
                            ? "bg-primary/10"
                            : "bg-muted"
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.role === "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                          <Icons.User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask your trading coach..."
                      className="flex-1"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button size="icon" onClick={handleSend}>
                      <Icons.ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(action);
                    }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAnalytics.aiInsights.map((insight, i) => {
                const colors: Record<string, string> = {
                  warning: "border-l-warning bg-warning/5",
                  success: "border-l-success bg-success/5",
                  info: "border-l-info bg-info/5",
                };
                const icons: Record<string, typeof Icons.AlertTriangle> = {
                  warning: Icons.AlertTriangle,
                  success: Icons.CheckCircle2,
                  info: Icons.HelpCircle,
                };
                const Icon = icons[insight.type];

                return (
                  <div
                    key={i}
                    className={`rounded-lg border-l-2 border-border p-3 ${colors[insight.type] || ""}`}
                  >
                    <div className="flex items-start gap-2">
                      {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-(--insight-color)" style={({ "--insight-color": `var(--${insight.type})` } as React.CSSProperties)} />}
                      <p className="text-xs leading-relaxed">{insight.message}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
