"use client";

import { EmptyStateShell } from "@/components/empty-states/empty-state-shell";
import { ErrorIllustration } from "@/components/empty-states/illustrations";
import { Icons } from "@/lib/icons";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  variant?: "no-data" | "no-internet" | "server-error" | "permission-denied" | "rate-limit" | "loading-failed";
}

const errorConfig: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
  "no-data": {
    title: "No data available",
    description: "We couldn't find any data for this section. It may not exist yet or may have been removed.",
    icon: <Icons.Inbox className="h-4 w-4" />,
  },
  "no-internet": {
    title: "No internet connection",
    description: "Check your connection and try again. Some features may be unavailable offline.",
    icon: <Icons.WifiOff className="h-4 w-4" />,
  },
  "server-error": {
    title: "Something went wrong",
    description: "Our server encountered an error. We've been notified and are working on a fix.",
    icon: <Icons.AlertTriangle className="h-4 w-4" />,
  },
  "permission-denied": {
    title: "Access restricted",
    description: "You don't have permission to view this. Contact your workspace admin to request access.",
    icon: <Icons.Lock className="h-4 w-4" />,
  },
  "rate-limit": {
    title: "Slow down, trader",
    description: "You've hit the rate limit. Take a moment and try again in a few seconds.",
    icon: <Icons.Clock className="h-4 w-4" />,
  },
  "loading-failed": {
    title: "Failed to load",
    description: "This section couldn't load properly. This is usually temporary.",
    icon: <Icons.RefreshCw className="h-4 w-4" />,
  },
};

export function ErrorState({ title, description, onRetry, variant = "server-error" }: ErrorStateProps) {
  const config = errorConfig[variant] || errorConfig["server-error"];

  return (
    <EmptyStateShell
      illustration={<ErrorIllustration size={72} />}
      title={title || config.title}
      description={description || config.description}
      action={{
        label: "Try Again",
        onClick: onRetry,
        icon: <Icons.RefreshCw className="h-3.5 w-3.5" />,
      }}
      tip="If this keeps happening, contact support@quantedge.com"
      compact
    />
  );
}

export function LoadingFailed({ onRetry }: { onRetry?: () => void }) {
  return <ErrorState variant="loading-failed" onRetry={onRetry} />;
}

export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      variant="no-internet"
      description="You're offline. QuantEdge will automatically sync when you're back online."
      onRetry={onRetry}
    />
  );
}
