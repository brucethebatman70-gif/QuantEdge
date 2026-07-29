"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  MT4: Icons.Monitor, MT5: Icons.Monitor, TradingView: Icons.TrendingUp,
  cTrader: Icons.BarChart3, DXtrade: Icons.Database, MatchTrader: Icons.Layers,
};

export function SettingsBrokerConnections() {
  const { brokerConnections } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">Broker Connections</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Manage your linked brokerage accounts.</p>
      </div>

      <div className="space-y-3">
        {brokerConnections.map((br, i) => {
          const Icon = PLATFORM_ICONS[br.platform] || Icons.Monitor;
          return (
            <motion.div
              key={br.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    br.status === "connected" ? "bg-success/10" : br.status === "error" ? "bg-error/10" : "bg-muted"
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      br.status === "connected" ? "text-success" : br.status === "error" ? "text-error" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{br.label}</p>
                      <Badge variant={br.status === "connected" ? "success" : br.status === "error" ? "destructive" : "secondary"} className="text-[9px] capitalize">{br.status}</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {br.platform} • {br.accountId}
                      {br.lastSync && <> • Synced {br.lastSync}</>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button variant="ghost" size="icon-xs" title="Reconnect"><Icons.RefreshCw className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon-xs" title="Disconnect"><Icons.X className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button variant="outline" size="sm"><Icons.Plus className="mr-2 h-3 w-3" />Add Connection</Button>
    </div>
  );
}
