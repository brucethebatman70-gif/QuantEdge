"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

const INTEGRATION_ICONS: Record<string, React.ElementType> = {
  Discord: Icons.MessageSquare, Slack: Icons.MessageSquare, Telegram: Icons.Send,
  "Google Drive": Icons.Cloud, Dropbox: Icons.Cloud,
};

export function SettingsIntegrations() {
  const { integrations, toggleIntegration } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">Integrations</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Connect QuantEdge with your favorite tools.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {integrations.map((int, i) => {
          const Icon = INTEGRATION_ICONS[int.name] || Icons.Link;
          return (
            <motion.div
              key={int.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`rounded-xl border p-4 transition-all ${
                int.status === "connected" ? "border-success/20 bg-success/5" : "border-border bg-card hover:border-primary/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                  int.status === "connected" ? "bg-success/10" : "bg-muted/50"
                }`}>
                  <Icon className={`h-4 w-4 ${int.status === "connected" ? "text-success" : "text-muted-foreground"}`} />
                </div>
                <button
                  onClick={() => toggleIntegration(int.id)}
                  className={`h-6 rounded-full px-2.5 text-[9px] font-medium transition-all flex items-center gap-1 ${
                    int.status === "connected" ? "bg-error/10 text-error hover:bg-error/20" : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  <Icons.Power className="h-2.5 w-2.5" />
                  {int.status === "connected" ? "Disconnect" : "Connect"}
                </button>
              </div>
              <p className="text-xs font-medium text-foreground">{int.name}</p>
              {int.connectedAt && (
                <p className="text-[10px] text-muted-foreground mt-0.5">Connected {int.connectedAt}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
