"use client";

import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCopilotStore } from "@/lib/copilot/store";
import { AiInsightsPanel } from "./ai-insights-panel";
import { useGoalsStore } from "@/lib/goals/store";

const PANEL_TABS = [
  { id: "insights" as const, label: "AI Insights", icon: Icons.Brain },
  { id: "suggestions" as const, label: "Suggestions", icon: Icons.Sparkles },
  { id: "templates" as const, label: "Templates", icon: Icons.FileText },
];

export function ContextPanel() {
  const { contextPanel, setContextPanel, templates } = useCopilotStore();
  const { kpis } = useGoalsStore();

  return (
    <aside className="w-72 border-l border-border bg-card flex flex-col overflow-hidden">
      <div className="flex border-b border-border">
        {PANEL_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setContextPanel(contextPanel === tab.id ? null : tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-medium transition-colors",
                contextPanel === tab.id
                  ? "text-foreground bg-muted/30 border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3 w-3" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {contextPanel === "insights" && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Trading Health</h3>
                <span className="text-[9px] text-muted-foreground/60">Real-time</span>
              </div>
              <AiInsightsPanel />

              <Separator />

              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Top Goals</h3>
                <Button variant="ghost" size="icon-xs">
                  <Icons.ArrowRight className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
                {kpis.slice(0, 3).map((kpi) => (
                  <div key={kpi.label} className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">{kpi.label}</span>
                    <span className={cn("font-medium", kpi.color)}>{kpi.value}{kpi.unit}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {contextPanel === "suggestions" && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "Generate AI Review", icon: Icons.Sparkles },
                  { label: "Create Playbook", icon: Icons.FileText },
                  { label: "Open Replay", icon: Icons.PlayCircle },
                  { label: "Review Losing Trades", icon: Icons.TrendingDown },
                  { label: "Review Winning Trades", icon: Icons.TrendingUp },
                  { label: "Create Improvement Plan", icon: Icons.Target },
                ].map((action) => {
                  const ActionIcon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-left"
                    >
                      <ActionIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {contextPanel === "templates" && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Chat Templates</h3>
              </div>
              <div className="space-y-1.5">
                {templates.map((template) => {
                  const TIcon = Icons[template.icon as keyof typeof Icons] || Icons.FileText;
                  return (
                    <button
                      key={template.id}
                      className="w-full flex items-start gap-2.5 rounded-lg border border-border/50 bg-background/50 p-2.5 text-left hover:border-primary/20 hover:bg-accent/5 transition-all"
                    >
                      <div className="h-6 w-6 shrink-0 rounded-md bg-primary/10 flex items-center justify-center mt-0.5">
                        <TIcon className="h-3 w-3 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground">{template.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{template.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
