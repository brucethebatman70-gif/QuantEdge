"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AnalyticsProvider } from "./analytics-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPalette } from "@/components/navigation/command-palette";
import { Toaster } from "sonner";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={300}>
        <AnalyticsProvider>
          {children}
          <CommandPalette />
        </AnalyticsProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
            },
          }}
        />
      </TooltipProvider>
    </ThemeProvider>
  );
}
