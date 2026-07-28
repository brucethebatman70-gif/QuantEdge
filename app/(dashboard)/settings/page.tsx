"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <div className="space-y-8 max-w-3xl">
        <div>
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-muted-foreground">Manage your account settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue="Demo User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={`demo@${brand.company.toLowerCase().replace(/\s/g, "")}.com`} />
              </div>
            </div>
            <Button size="sm">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sound Effects</p>
                <p className="text-xs text-muted-foreground">Play sounds on trade execution</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Trade Confirmations</p>
                <p className="text-xs text-muted-foreground">Show confirmation dialog before trade</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Real-time Updates</p>
                <p className="text-xs text-muted-foreground">Enable WebSocket for live data</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Display</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Chart Period</Label>
              <div className="flex gap-2">
                {["1D", "5D", "1M", "3M", "6M", "1Y", "ALL"].map((period) => (
                  <Button key={period} variant="outline" size="sm">
                    {period}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Default Timeframe</Label>
              <div className="flex gap-2 flex-wrap">
                {["1m", "5m", "15m", "30m", "1h", "4h", "1D", "1W"].map((tf) => (
                  <Button key={tf} variant="outline" size="sm">
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button variant="destructive" size="sm">
            <Icons.XCircle className="mr-2 h-4 w-4" />
            Reset All Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
