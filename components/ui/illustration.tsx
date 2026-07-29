"use client";

import { cn } from "@/lib/cn";

interface IllustrationProps {
  variant?: "empty-journal" | "empty-trades" | "no-results" | "no-data" | "empty-analytics" | "empty-achievements";
  size?: "sm" | "md" | "lg";
  className?: string;
}

function EmptyJournalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={cn("text-border", className)}>
      <rect x="10" y="10" width="100" height="80" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="20" y="20" width="80" height="60" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" opacity="0.3" />
      <line x1="30" y1="35" x2="60" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="30" y1="55" x2="55" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <path d="M90 50 L100 55 L90 60" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="90" cy="50" r="2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function EmptyTradesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={cn("text-border", className)}>
      <rect x="15" y="15" width="90" height="70" rx="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="25" y1="35" x2="95" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="25" y1="48" x2="75" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="25" y1="61" x2="65" y2="61" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <path d="M30 70 L48 52 L62 62 L78 44 L95 60" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="70" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="48" cy="52" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="62" cy="62" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="78" cy="44" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="95" cy="60" r="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function NoResultsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={cn("text-border", className)}>
      <circle cx="50" cy="45" r="25" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="68" y1="63" x2="90" y2="85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="42" y1="45" x2="58" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="50" y1="37" x2="50" y2="53" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function NoDataIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={cn("text-border", className)}>
      <rect x="20" y="20" width="80" height="60" rx="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="35" y1="60" x2="55" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeLinecap="round" />
      <line x1="55" y1="40" x2="65" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeLinecap="round" />
      <line x1="65" y1="55" x2="85" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeLinecap="round" />
      <circle cx="50" cy="50" r="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

const iconMap = {
  "empty-journal": EmptyJournalIcon,
  "empty-trades": EmptyTradesIcon,
  "no-results": NoResultsIcon,
  "no-data": NoDataIcon,
  "empty-analytics": NoDataIcon,
  "empty-achievements": NoResultsIcon,
};

const sizeMap = {
  sm: "w-20 h-auto",
  md: "w-28 h-auto",
  lg: "w-36 h-auto",
};

export function Illustration({ variant = "no-data", size = "md", className }: IllustrationProps) {
  const Icon = iconMap[variant];
  return <Icon className={cn(sizeMap[size], className)} />;
}

interface EmptyStateProps {
  icon?: IllustrationProps["variant"];
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon = "no-data", title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-6", className)}>
      <Illustration variant={icon} size="lg" className="mb-6 text-border" />
      <h3 className="text-sm font-medium text-foreground/80 mb-1.5">{title}</h3>
      {description && (
        <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
