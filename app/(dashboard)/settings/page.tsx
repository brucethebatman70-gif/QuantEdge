"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";
import { useAuthStore } from "@/lib/auth/store";

export default function SettingsPage() {
  const { sessions, logoutEverywhere, trustDevice, removeSession, isLoading } = useAuthStore();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutEverywhere = async () => {
    await logoutEverywhere();
    router.push("/login");
  };
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

        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Devices and active sessions on your account</p>
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Icons.Monitor className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{session.device}</p>
                        {session.isCurrent && <Badge variant="default" className="text-[9px] px-1.5 py-0">Current</Badge>}
                        {session.isTrusted && <Badge variant="success" className="text-[9px] px-1.5 py-0">Trusted</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{session.browser} · {session.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!session.isTrusted && (
                      <Button variant="outline" size="sm" onClick={() => trustDevice(session.id)}>
                        Trust
                      </Button>
                    )}
                    {!session.isCurrent && (
                      <Button variant="ghost" size="icon-sm" onClick={() => removeSession(session.id)}>
                        <Icons.X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Logout everywhere</p>
                <p className="text-xs text-muted-foreground">Sign out of all active sessions</p>
              </div>
              <Button variant="destructive" size="sm" disabled={isLoading} onClick={() => setShowLogoutConfirm(true)}>
                {isLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  "Logout All"
                )}
              </Button>
            </div>
            {showLogoutConfirm && (
              <div className="rounded-lg bg-error/10 border border-error/20 p-4 space-y-3">
                <p className="text-sm text-error font-medium">Are you sure? This will sign you out everywhere.</p>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={handleLogoutEverywhere}>Confirm</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
                </div>
              </div>
            )}
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
