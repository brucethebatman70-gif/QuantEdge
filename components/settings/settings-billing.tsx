"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

const PLAN_LABELS = { free: "Free", starter: "Starter", pro: "Pro", enterprise: "Enterprise" };
const PLAN_PRICES = { free: 0, starter: 29, pro: 79, enterprise: 299 };

export function SettingsBilling() {
  const { billing } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">Billing</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Manage your subscription and billing information.</p>
      </div>

      <div className="rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icons.Crown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{PLAN_LABELS[billing.plan]}</p>
                <Badge variant={billing.status === "active" ? "success" : "warning"} className="text-[9px] capitalize">{billing.status.replace("_", " ")}</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">${PLAN_PRICES[billing.plan]}/month • Next billing {billing.nextBilling}</p>
            </div>
          </div>
          <Button size="sm">Upgrade</Button>
        </div>
        <Separator className="mb-4" />
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs text-foreground">Monthly Usage</p>
            <span className="text-xs text-muted-foreground">{billing.usage}%</span>
          </div>
          <Progress value={billing.usage} className="h-2" indicatorClassName={billing.usage > 80 ? "bg-warning" : "bg-success"} />
          <p className="text-[10px] text-muted-foreground mt-1">{billing.usage} of {billing.usageLimit} API calls used this month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="sm"><Icons.FileText className="mr-2 h-3 w-3" />Invoices</Button>
        <Button variant="outline" size="sm"><Icons.CreditCard className="mr-2 h-3 w-3" />Payment Methods</Button>
      </div>
    </div>
  );
}
