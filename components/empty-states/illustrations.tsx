"use client";

import { cn } from "@/lib/cn";

interface IllustrationProps {
  className?: string;
  size?: number;
}

export function TradesIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <rect x="12" y="30" width="56" height="36" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M22 44L28 38L34 44L46 34L58 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <circle cx="58" cy="30" r="4" fill="currentColor" opacity="0.15" />
      <path d="M16 24L22 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M64 24L58 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <circle cx="40" cy="66" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="28" cy="66" r="2" fill="currentColor" opacity="0.08" />
      <circle cx="52" cy="66" r="2" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

export function AnalyticsIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <rect x="6" y="28" width="12" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      <rect x="24" y="20" width="12" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.35" />
      <rect x="42" y="14" width="12" height="42" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      <rect x="60" y="24" width="12" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
      <rect x="24" y="20" width="12" height="36" rx="2" fill="currentColor" opacity="0.06" />
      <path d="M6 64L74 64" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <line x1="30" y1="20" x2="30" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.12" strokeDasharray="2 2" />
      <circle cx="30" cy="8" r="2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export function CalendarIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <rect x="10" y="12" width="60" height="56" rx="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      <rect x="10" y="28" width="60" height="12" fill="currentColor" opacity="0.06" />
      <path d="M24 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M56 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <rect x="16" y="44" width="8" height="8" rx="1" fill="currentColor" opacity="0.15" />
      <rect x="28" y="44" width="8" height="8" rx="1" fill="currentColor" opacity="0.08" />
      <rect x="40" y="44" width="8" height="8" rx="1" fill="currentColor" opacity="0.12" />
      <rect x="52" y="44" width="8" height="8" rx="1" fill="currentColor" opacity="0.06" />
      <rect x="16" y="56" width="8" height="8" rx="1" fill="currentColor" opacity="0.1" />
      <rect x="28" y="56" width="8" height="8" rx="1" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

export function ReportsIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <path d="M18 12H52L66 26V66C66 68.2 64.2 70 62 70H18C15.8 70 14 68.2 14 66V16C14 13.8 15.8 12 18 12Z" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M52 12V26H66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
      <line x1="22" y1="36" x2="50" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <line x1="22" y1="44" x2="58" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
      <line x1="22" y1="52" x2="46" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.12" />
      <line x1="22" y1="60" x2="54" y2="60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.1" />
      <circle cx="62" cy="36" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="62" cy="44" r="2" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

export function GoalsIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.15" />
      <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
      <circle cx="40" cy="40" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.4" />
      <path d="M40 12V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M40 62V68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M12 40H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M62 40H68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M20.7 20.7L24.9 24.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
      <path d="M55.1 55.1L59.3 59.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
    </svg>
  );
}

export function AiIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <rect x="16" y="16" width="48" height="48" rx="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
      <path d="M40 24V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M40 48V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M24 40H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M48 40H56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M28.7 28.7L34 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M46 46L51.3 51.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M28.7 51.3L34 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M46 34L51.3 28.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function JournalIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <rect x="14" y="8" width="52" height="64" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      <line x1="22" y1="24" x2="58" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <line x1="22" y1="34" x2="50" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
      <line x1="22" y1="44" x2="54" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.12" />
      <line x1="22" y1="54" x2="44" y2="54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.1" />
      <rect x="54" y="30" width="14" height="14" rx="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M61 35V39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="61" cy="42" r="1.5" fill="currentColor" opacity="0.5" />
      <path d="M14 62H66" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.1" />
    </svg>
  );
}

export function ImportIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <rect x="12" y="30" width="56" height="36" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M40 8V38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M30 28L40 38L50 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <line x1="20" y1="50" x2="32" y2="50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <line x1="20" y1="56" x2="40" y2="56" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
      <circle cx="56" cy="52" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M56 48V56M52 52H60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M12 66H68" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.1" />
    </svg>
  );
}

export function AchievementsIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <path d="M40 8L46 24H62L50 36L56 52L40 42L24 52L30 36L18 24H34L40 8Z" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.12" />
      <path d="M40 28V52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <path d="M28 40H52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.2" />
      <path d="M30 64L40 60L50 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
    </svg>
  );
}

export function WatchlistIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
      <path d="M40 20V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M40 48V60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M20 40H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M48 40H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.4" />
      <path d="M26.8 26.8L32.4 32.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
      <path d="M47.6 47.6L53.2 53.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
    </svg>
  );
}

export function SearchIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-primary/30", className)}>
      <circle cx="34" cy="34" r="16" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M46 46L62 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M26 34H42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <path d="M34 26V42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.08" />
      <circle cx="60" cy="18" r="1.5" fill="currentColor" opacity="0.06" />
      <circle cx="16" cy="56" r="1.5" fill="currentColor" opacity="0.06" />
      <circle cx="66" cy="66" r="2" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

export function DemoIllustration({ className, size = 100 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={cn("text-primary/30", className)}>
      <rect x="10" y="20" width="80" height="60" rx="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
      <rect x="20" y="30" width="25" height="18" rx="4" fill="currentColor" opacity="0.08" />
      <rect x="50" y="30" width="30" height="18" rx="4" fill="currentColor" opacity="0.05" />
      <rect x="20" y="54" width="18" height="16" rx="4" fill="currentColor" opacity="0.06" />
      <rect x="42" y="54" width="18" height="16" rx="4" fill="currentColor" opacity="0.08" />
      <rect x="64" y="54" width="16" height="16" rx="4" fill="currentColor" opacity="0.05" />
      <path d="M50 16V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
      <path d="M50 76V84" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
      <path d="M50 82H58" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.1" />
      <path d="M50 18H58" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.1" />
      <circle cx="50" cy="16" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="50" cy="84" r="2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export function ErrorIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-destructive/30", className)}>
      <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
      <path d="M30 30L50 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M50 30L30 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M40 24V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M40 48V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function SuccessIllustration({ className, size = 80 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={cn("text-success/30", className)}>
      <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
      <path d="M28 40L36 48L52 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.12" />
      <path d="M40 14V20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <path d="M40 60V66" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <path d="M18 40H24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
      <path d="M56 40H62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
    </svg>
  );
}
