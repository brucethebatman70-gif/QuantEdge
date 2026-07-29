"use client";

import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";

export function SettingsAbout() {
  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-base font-semibold text-foreground">About</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Information about QuantEdge.</p>
      </div>

      <div className="rounded-xl border border-border p-6 text-center space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <Icons.Bot className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">{brand.name}</h3>
          <p className="text-xs text-muted-foreground">{brand.tagline}</p>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>v{process.env.NEXT_PUBLIC_APP_VERSION || "3.0.0"}</span>
          <span>•</span>
          <span>{brand.company}</span>
          <span>•</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>

      <div className="rounded-xl border border-border divide-y divide-border">
        {[
          { label: "Terms of Service", icon: <Icons.FileText className="h-4 w-4" /> },
          { label: "Privacy Policy", icon: <Icons.Shield className="h-4 w-4" /> },
          { label: "Documentation", icon: <Icons.BookOpen className="h-4 w-4" /> },
          { label: "Release Notes", icon: <Icons.Info className="h-4 w-4" /> },
          { label: "Open Source Licenses", icon: <Icons.Code className="h-4 w-4" /> },
        ].map((item) => (
          <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs text-foreground hover:bg-muted/20 transition-colors">
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
