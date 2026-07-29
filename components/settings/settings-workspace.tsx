"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

export function SettingsWorkspace() {
  const { workspace, updateWorkspace } = useSettingsStore();

  const options = ["overview", "analytics", "journal", "trades", "calendar"];
  const brokers = ["TradingView", "MT4", "MT5", "cTrader", "DXtrade"];
  const timeframes = ["1m", "5m", "15m", "30m", "1h", "4h", "1D", "1W"];
  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CHF", "CAD"];
  const units = ["pips", "points", "ticks"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Workspace</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Configure your default trading environment.</p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Default Dashboard</Label>
        <div className="flex gap-1.5 flex-wrap">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => updateWorkspace({ defaultDashboard: o })}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize transition-all ${
                workspace.defaultDashboard === o ? "bg-primary/10 text-primary ring-1 ring-primary" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >{o}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Default Account</Label>
          <input
            value={workspace.defaultAccount}
            onChange={(e) => updateWorkspace({ defaultAccount: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Default Broker</Label>
          <select
            value={workspace.defaultBroker}
            onChange={(e) => updateWorkspace({ defaultBroker: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50 transition-colors"
          >
            {brokers.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Default Timeframe</Label>
        <div className="flex gap-1.5 flex-wrap">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => updateWorkspace({ defaultTimeframe: tf })}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                workspace.defaultTimeframe === tf ? "bg-primary/10 text-primary ring-1 ring-primary" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >{tf}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Default Currency</Label>
          <div className="flex gap-1.5 flex-wrap">
            {currencies.map((c) => (
              <button
                key={c}
                onClick={() => updateWorkspace({ defaultCurrency: c })}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  workspace.defaultCurrency === c ? "bg-primary/10 text-primary ring-1 ring-primary" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >{c}</button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Measurement Units</Label>
          <div className="flex gap-1.5 flex-wrap">
            {units.map((u) => (
              <button
                key={u}
                onClick={() => updateWorkspace({ measurementUnits: u as typeof workspace.measurementUnits })}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize transition-all ${
                  workspace.measurementUnits === u ? "bg-primary/10 text-primary ring-1 ring-primary" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >{u}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm"><Icons.Save className="mr-2 h-3 w-3" />Save Changes</Button>
        <Button variant="outline" size="sm">Reset to Defaults</Button>
      </div>
    </div>
  );
}
