"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

export function SettingsAiPreferences() {
  const { aiPreferences, updateAiPreferences } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">AI Preferences</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Configure how QuantEdge AI assists you.</p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Preferred AI Model</Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "gpt-4", label: "GPT-4", desc: "Best analysis", icon: <Icons.Sparkles className="h-4 w-4" /> },
            { id: "claude-3", label: "Claude 3", desc: "Deep reasoning", icon: <Icons.Brain className="h-4 w-4" /> },
            { id: "gpt-3.5", label: "GPT-3.5", desc: "Fast responses", icon: <Icons.Zap className="h-4 w-4" /> },
            { id: "gemini", label: "Gemini", desc: "Multi-modal", icon: <Icons.Bot className="h-4 w-4" /> },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => updateAiPreferences({ preferredModel: m.id as typeof aiPreferences.preferredModel })}
              className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all ${
                aiPreferences.preferredModel === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
              }`}
            >
              <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center">{m.icon}</div>
              <div>
                <p className="text-xs font-medium text-foreground">{m.label}</p>
                <p className="text-[10px] text-muted-foreground">{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Response Style</Label>
          <select
            value={aiPreferences.responseStyle}
            onChange={(e) => updateAiPreferences({ responseStyle: e.target.value as typeof aiPreferences.responseStyle })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50"
          >
            <option value="concise">Concise</option>
            <option value="balanced">Balanced</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Coaching Style</Label>
          <select
            value={aiPreferences.coachingStyle}
            onChange={(e) => updateAiPreferences({ coachingStyle: e.target.value as typeof aiPreferences.coachingStyle })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50"
          >
            <option value="mentor">Mentor</option>
            <option value="analyst">Analyst</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Risk Profile</Label>
          <select
            value={aiPreferences.riskProfile}
            onChange={(e) => updateAiPreferences({ riskProfile: e.target.value as typeof aiPreferences.riskProfile })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50"
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div><p className="text-xs font-medium text-foreground">Memory</p><p className="text-[10px] text-muted-foreground">AI remembers your preferences across sessions</p></div>
          <Switch checked={aiPreferences.memory} onCheckedChange={(v) => updateAiPreferences({ memory: v })} />
        </div>
        <div className="flex items-center justify-between">
          <div><p className="text-xs font-medium text-foreground">Voice Mode</p><p className="text-[10px] text-muted-foreground">Enable voice interactions with AI coach</p></div>
          <Switch checked={aiPreferences.voiceMode} onCheckedChange={(v) => updateAiPreferences({ voiceMode: v })} />
        </div>
        <div className="flex items-center justify-between">
          <div><p className="text-xs font-medium text-foreground">Smart Suggestions</p><p className="text-[10px] text-muted-foreground">AI proactively suggests trades and analysis</p></div>
          <Switch checked={aiPreferences.smartSuggestions} onCheckedChange={(v) => updateAiPreferences({ smartSuggestions: v })} />
        </div>
      </div>
    </div>
  );
}
