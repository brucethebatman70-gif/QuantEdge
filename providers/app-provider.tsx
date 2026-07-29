"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AnalyticsProvider } from "./analytics-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPalette } from "@/components/navigation/command-palette";
import { ToastContainer, NotificationKeyboardShortcut } from "@/components/notification";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={300}>
        <AnalyticsProvider>
          {children}
          <CommandPalette />
          <NotificationKeyboardShortcut />
          <ToastContainer />
        </AnalyticsProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
