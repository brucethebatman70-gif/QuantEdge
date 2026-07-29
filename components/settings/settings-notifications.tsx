"use client";

import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

const NOTIF_GROUPS = [
  {
    label: "Delivery Channels", items: [
      { key: "desktop" as const, label: "Desktop", desc: "In-app notifications", icon: <Icons.Monitor className="h-4 w-4 text-primary" /> },
      { key: "email" as const, label: "Email", desc: "Send notifications via email", icon: <Icons.Mail className="h-4 w-4 text-accent" /> },
      { key: "mobile" as const, label: "Mobile", desc: "Push notifications to your device", icon: <Icons.Bell className="h-4 w-4 text-warning" /> },
    ],
  },
  {
    label: "Alert Types", items: [
      { key: "tradeAlerts" as const, label: "Trade Alerts", desc: "Trade execution and status updates", icon: <Icons.TrendingUp className="h-4 w-4 text-success" /> },
      { key: "goalAlerts" as const, label: "Goal Alerts", desc: "Goal progress and achievement milestones", icon: <Icons.Trophy className="h-4 w-4 text-warning" /> },
      { key: "aiAlerts" as const, label: "AI Alerts", desc: "AI coach insights and recommendations", icon: <Icons.Brain className="h-4 w-4 text-primary" /> },
    ],
  },
  {
    label: "Reports", items: [
      { key: "weeklyReports" as const, label: "Weekly Reports", desc: "Receive weekly performance digest", icon: <Icons.Calendar className="h-4 w-4 text-success" /> },
      { key: "monthlyReports" as const, label: "Monthly Reports", desc: "Receive monthly performance report", icon: <Icons.BarChart3 className="h-4 w-4 text-accent" /> },
    ],
  },
];

export function SettingsNotifications() {
  const { notifications, updateNotifications } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">Notifications</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Control how and when you receive notifications.</p>
      </div>

      {NOTIF_GROUPS.map((group, gi) => (
        <div key={group.label}>
          {gi > 0 && <Separator className="mb-4" />}
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">{group.label}</p>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center">{item.icon}</div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(v) => updateNotifications({ [item.key]: v })}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
