"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";
import { COUNTRY_OPTIONS, TIMEZONE_OPTIONS, LANGUAGE_OPTIONS } from "@/lib/settings/types";

export function SettingsProfile() {
  const { profile, updateProfile } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Profile</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Manage your personal information and preferences.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icons.User className="h-7 w-7 text-primary" />
          </div>
          <button className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-card">
            <Icons.Plus className="h-3 w-3" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{profile.displayName}</p>
          <p className="text-xs text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Display Name</Label>
          <Input value={profile.displayName} onChange={(e) => updateProfile({ displayName: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Username</Label>
          <Input value={profile.username} onChange={(e) => updateProfile({ username: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Email</Label>
          <Input type="email" value={profile.email} onChange={(e) => updateProfile({ email: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Phone</Label>
          <Input value={profile.phone} onChange={(e) => updateProfile({ phone: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Country</Label>
          <select
            value={profile.country}
            onChange={(e) => updateProfile({ country: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50 transition-colors"
          >
            {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Timezone</Label>
          <select
            value={profile.timezone}
            onChange={(e) => updateProfile({ timezone: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50 transition-colors"
          >
            {TIMEZONE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Language</Label>
          <select
            value={profile.language}
            onChange={(e) => updateProfile({ language: e.target.value })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50 transition-colors"
          >
            {LANGUAGE_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Trading Experience</Label>
          <select
            value={profile.tradingExperience}
            onChange={(e) => updateProfile({ tradingExperience: e.target.value as typeof profile.tradingExperience })}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50 transition-colors"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="pro">Professional</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Bio</Label>
        <textarea
          value={profile.bio}
          onChange={(e) => updateProfile({ bio: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground outline-none focus:border-primary/50 transition-colors resize-none"
        />
      </div>

      <div className="flex gap-2">
        <Button size="sm"><Icons.Save className="mr-2 h-3 w-3" />Save Changes</Button>
        <Button variant="outline" size="sm">Cancel</Button>
      </div>
    </div>
  );
}
