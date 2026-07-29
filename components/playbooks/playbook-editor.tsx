"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/lib/icons";
import { usePlaybookStore } from "@/lib/playbooks/store";
import { PlaybookSetupSection } from "./playbook-setup";
import { PlaybookExamples } from "./playbook-examples";
import { PlaybookAiAssistant } from "./playbook-ai-assistant";
import { PlaybookPerformance } from "./playbook-performance";
import { PlaybookVersionHistory } from "./playbook-version-history";
import { RISK_PROFILES, DIFFICULTIES } from "@/lib/playbooks/types";
import type { PlaybookCategory, RiskProfile, Difficulty, PlaybookMarket } from "@/lib/playbooks/types";

export function PlaybookEditor() {
  const { selectedId, playbooks, updatePlaybook, setSelectedPlaybook, toggleFavorite, rightPanel, setRightPanel } = usePlaybookStore();
  const [activeTab, setActiveTab] = useState("content");
  const playbook = selectedId ? playbooks.find((p) => p.id === selectedId) : null;

  if (!playbook) return null;

  return (
    <div className="flex flex-1 h-full">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedPlaybook(null)}>
              <Icons.ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <Input
                value={playbook.title}
                onChange={(e) => updatePlaybook(playbook.id, { title: e.target.value })}
                className="text-base font-semibold border-0 bg-transparent px-0 h-auto focus-visible:ring-0"
              />
            </div>
            <button onClick={() => toggleFavorite(playbook.id)} className={playbook.isFavorite ? "text-warning" : "text-muted-foreground hover:text-warning"}>
              <Icons.Star className={`h-4 w-4 ${playbook.isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">{playbook.category}</Badge>
            <Button variant="ghost" size="xs"><Icons.Edit className="mr-1 h-3 w-3" />Edit</Button>
            <Button variant="ghost" size="xs"><Icons.Save className="mr-1 h-3 w-3" />Save</Button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-2 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Risk:</span>
            <span className={RISK_PROFILES.find((r) => r.value === playbook.riskProfile)?.color}>
              {RISK_PROFILES.find((r) => r.value === playbook.riskProfile)?.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Difficulty:</span>
            <span className="font-medium">{DIFFICULTIES.find((d) => d.value === playbook.difficulty)?.label}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">R:R:</span>
            <span className="font-medium text-primary">{playbook.expectedRR}:1</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">WR:</span>
            <Badge variant={playbook.winRate >= 65 ? "success" : "warning"} className="text-[10px]">{playbook.winRate}%</Badge>
          </div>
          <div className="flex-1" />
          <span className="text-[10px] text-muted-foreground">Updated {new Date(playbook.updatedAt).toLocaleDateString()}</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-6 pt-3 border-b border-border">
              <TabsList>
                <TabsTrigger value="content" className="text-xs"><Icons.FileText className="mr-1.5 h-3.5 w-3.5" />Content</TabsTrigger>
                <TabsTrigger value="setup" className="text-xs"><Icons.ListChecks className="mr-1.5 h-3.5 w-3.5" />Setup</TabsTrigger>
                <TabsTrigger value="examples" className="text-xs"><Icons.Image className="mr-1.5 h-3.5 w-3.5" />Examples</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="content" className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-4 max-w-3xl">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Description</label>
                      <Textarea
                        value={playbook.description}
                        onChange={(e) => updatePlaybook(playbook.id, { description: e.target.value })}
                        className="text-sm min-h-[60px]"
                        placeholder="Describe what this strategy does..."
                      />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {playbook.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Strategy Notes (Markdown)</label>
                      <Textarea
                        value={playbook.content}
                        onChange={(e) => updatePlaybook(playbook.id, { content: e.target.value })}
                        className="text-sm min-h-[200px] font-mono"
                        placeholder="Write your strategy notes in markdown..."
                      />
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="setup" className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 max-w-3xl">
                    <PlaybookSetupSection setup={playbook.setup} readOnly />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="examples" className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 max-w-3xl">
                    <PlaybookExamples examples={playbook.examples} />
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <div className="w-80 border-l border-border flex flex-col">
        <div className="flex border-b border-border">
          {[
            { key: "ai" as const, icon: Icons.Bot, label: "AI" },
            { key: "performance" as const, icon: Icons.BarChart3, label: "Stats" },
            { key: "versions" as const, icon: Icons.History, label: "History" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setRightPanel(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                rightPanel === key
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-hidden">
          {rightPanel === "ai" && <PlaybookAiAssistant />}
          {rightPanel === "performance" && <PlaybookPerformance />}
          {rightPanel === "versions" && <PlaybookVersionHistory />}
        </div>
      </div>
    </div>
  );
}
