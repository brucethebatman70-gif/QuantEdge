"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";
import { ACCENT_COLORS } from "@/lib/settings/types";

export function SettingsAppearance() {
  const { appearance, updateAppearance } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="text-base font-semibold text-foreground">Appearance</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Customize the look and feel of QuantEdge.</p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Theme</Label>
        <div className="grid grid-cols-3 gap-2">
          {(["dark", "light", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => updateAppearance({ theme: t })}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left text-xs transition-all ${
                appearance.theme === t ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {t === "dark" ? <Icons.Moon className="h-4 w-4" /> : t === "light" ? <Icons.Sun className="h-4 w-4" /> : <Icons.Monitor className="h-4 w-4" />}
              <span className="capitalize">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Accent Color</Label>
        <div className="flex gap-2">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => updateAppearance({ accentColor: c.id })}
              className={`h-8 w-8 rounded-full transition-all ${
                appearance.accentColor === c.id ? "ring-2 ring-offset-2 ring-offset-card ring-foreground scale-110" : ""
              }`}
              style={{ backgroundColor: c.value }}
              title={c.label}
            />
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-1.5">
        <Label className="text-xs">Sidebar Style</Label>
        <div className="grid grid-cols-3 gap-2">
          {(["default", "compact", "icon-only"] as const).map((s) => (
            <button
              key={s}
              onClick={() => updateAppearance({ sidebarStyle: s })}
              className={`px-3 py-2 rounded-lg border text-xs capitalize text-left transition-all ${
                appearance.sidebarStyle === s ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >{s.replace("-", " ")}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Compact Mode</p>
            <p className="text-[10px] text-muted-foreground">Reduce padding and spacing throughout the app</p>
          </div>
          <Switch checked={appearance.compactMode} onCheckedChange={(v) => updateAppearance({ compactMode: v })} />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Glass Intensity</p>
            <p className="text-[10px] text-muted-foreground">Adjust the frosted glass effect opacity</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range" min={0} max={100} value={appearance.glassIntensity}
              onChange={(e) => updateAppearance({ glassIntensity: Number(e.target.value) })}
              className="w-24 h-1"
            />
            <span className="text-[11px] text-muted-foreground w-8 text-right">{appearance.glassIntensity}%</span>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Border Radius</p>
            <p className="text-[10px] text-muted-foreground">Control the roundness of UI elements</p>
          </div>
          <div className="flex gap-1">
            {(["sm", "md", "lg", "xl"] as const).map((r) => (
              <button
                key={r}
                onClick={() => updateAppearance({ borderRadius: r })}
                className={`px-2 py-1 rounded text-[10px] font-medium capitalize transition-all ${
                  appearance.borderRadius === r ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >{r}</button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Typography Scale</p>
            <p className="text-[10px] text-muted-foreground">Adjust base font size ({appearance.typographyScale}%)</p>
          </div>
          <input
            type="range" min={75} max={150} value={appearance.typographyScale}
            onChange={(e) => updateAppearance({ typographyScale: Number(e.target.value) })}
            className="w-24 h-1"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Animation Level</p>
            <p className="text-[10px] text-muted-foreground">Control motion and transition effects</p>
          </div>
          <div className="flex gap-1">
            {(["full", "reduced", "none"] as const).map((l) => (
              <button
                key={l}
                onClick={() => updateAppearance({ animationLevel: l })}
                className={`px-2 py-1 rounded text-[10px] font-medium capitalize transition-all ${
                  appearance.animationLevel === l ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
