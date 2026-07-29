"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

export function SettingsSecurity() {
  const { security } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">Security</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Protect your account and data.</p>
      </div>

      <div className="rounded-xl border border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-muted/50 flex items-center justify-center"><Icons.Lock className="h-4 w-4" /></div>
            <div><p className="text-xs font-medium text-foreground">Password</p><p className="text-[10px] text-muted-foreground">Last changed 3 months ago</p></div>
          </div>
          <Button variant="outline" size="sm">Change</Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-muted/50 flex items-center justify-center"><Icons.Fingerprint className="h-4 w-4" /></div>
            <div><p className="text-xs font-medium text-foreground">Two-Factor Authentication</p><p className="text-[10px] text-muted-foreground">Add an extra layer of security</p></div>
          </div>
          <Switch checked={security.twoFactorEnabled} />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-foreground mb-3">Active Sessions</p>
        <div className="space-y-2">
          {security.trustedDevices.map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <Icons.Monitor className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-foreground">{d.name}</p>
                  <p className="text-[10px] text-muted-foreground">Last active {d.lastUsed}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon-xs"><Icons.X className="h-3 w-3" /></Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-foreground mb-3">Recovery Codes</p>
        <div className="flex flex-wrap gap-2">
          {security.recoveryCodes.map((code) => (
            <Badge key={code} variant="secondary" className="text-[10px] font-mono">{code}</Badge>
          ))}
        </div>
        <Button variant="outline" size="sm" className="mt-2"><Icons.RefreshCw className="mr-2 h-3 w-3" />Generate New Codes</Button>
      </div>
    </div>
  );
}
