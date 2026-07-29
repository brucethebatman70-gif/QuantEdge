"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

export function SettingsPrivacy() {
  const { privacy, updatePrivacy } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">Privacy</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Control your data and privacy settings.</p>
      </div>

      <div className="rounded-xl border border-border divide-y divide-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-muted/50 flex items-center justify-center"><Icons.BarChart3 className="h-4 w-4 text-primary" /></div>
            <div>
              <p className="text-xs font-medium text-foreground">Analytics Sharing</p>
              <p className="text-[10px] text-muted-foreground">Help improve QuantEdge by sharing anonymous usage data</p>
            </div>
          </div>
          <Switch checked={privacy.analyticsSharing} onCheckedChange={(v) => updatePrivacy({ analyticsSharing: v })} />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-muted/50 flex items-center justify-center"><Icons.Download className="h-4 w-4 text-accent" /></div>
            <div>
              <p className="text-xs font-medium text-foreground">Data Export</p>
              <p className="text-[10px] text-muted-foreground">Allow exporting your personal data</p>
            </div>
          </div>
          <Switch checked={privacy.dataExport} onCheckedChange={(v) => updatePrivacy({ dataExport: v })} />
        </div>
      </div>

      <Separator />

      <div className="rounded-xl border border-error/20 bg-error/5 p-4">
        <div className="flex items-start gap-3">
          <Icons.AlertTriangle className="h-5 w-5 text-error shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-error">Danger Zone</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Once you delete your account, there is no going back. Please be certain.</p>
            <Button variant="destructive" size="sm" className="mt-3">
              <Icons.Trash2 className="mr-2 h-3 w-3" />Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
