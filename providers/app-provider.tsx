"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
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
    </ThemeProvider>
  );
}
