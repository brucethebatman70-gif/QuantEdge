"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void; identify: (id: string, traits?: Record<string, unknown>) => void; reset: () => void };
  }
}

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY) return;
    const script = document.createElement("script");
    script.src = `${POSTHOG_HOST}/static/array.js`;
    script.async = true;
    script.onload = () => {
      window.posthog?.capture("$pageview");
    };
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  useEffect(() => {
    if (!POSTHOG_KEY || !window.posthog) return;
    window.posthog.capture("$pageview", { path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "") });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
