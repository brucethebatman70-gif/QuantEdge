"use client";

import { useEffect } from "react";
import { useNotificationStore } from "./notification-store";

export function NotificationKeyboardShortcut() {
  const toggleCenter = useNotificationStore((s) => s.toggleCenter);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        toggleCenter();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleCenter]);

  return null;
}
