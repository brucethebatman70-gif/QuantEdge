"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

const PROVIDER_ICONS: Record<string, React.ElementType> = {
  OpenAI: Icons.Sparkles, Anthropic: Icons.Brain, "Google AI": Icons.Bot,
};

const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: "text-success bg-success/10",
  Anthropic: "text-primary bg-primary/10",
  "Google AI": "text-warning bg-warning/10",
};

export function SettingsApiKeys() {
  const { apiKeys, deleteApiKey } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">API Keys</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Manage API credentials for AI services.</p>
      </div>

      <div className="space-y-3">
        {apiKeys.map((key, i) => {
          const Icon = PROVIDER_ICONS[key.provider] || Icons.KeyRound;
          const color = PROVIDER_COLORS[key.provider] || "text-muted-foreground bg-muted";
          return (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-border p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{key.label}</p>
                    <p className="text-[10px] text-muted-foreground">{key.provider} • Created {key.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant={key.status === "active" ? "success" : key.status === "error" ? "destructive" : "secondary"} className="text-[9px] capitalize">{key.status}</Badge>
                  <button onClick={() => deleteApiKey(key.id)} className="p-1.5 rounded-md hover:bg-error/10 text-muted-foreground hover:text-error"><Icons.Trash2 className="h-3 w-3" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={key.usage} className="h-1 flex-1" />
                <span className="text-[10px] text-muted-foreground">{key.usage}% used</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button variant="outline" size="sm"><Icons.Plus className="mr-2 h-3 w-3" />Add API Key</Button>
    </div>
  );
}
