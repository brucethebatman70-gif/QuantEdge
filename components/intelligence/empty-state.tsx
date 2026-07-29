"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-10 text-center", className)}>
      <div className="mb-4 opacity-40">{icon}</div>
      <h4 className="text-sm font-semibold opacity-70 mb-1">{title}</h4>
      <p className="text-[11px] text-muted-foreground/50 leading-relaxed max-w-[220px]">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] text-[11px] font-medium px-4 py-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function NoTradesEmpty() {
  return (
    <EmptyState
      icon={
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="18" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d="M16 28L20 24L24 28L32 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          <circle cx="34" cy="18" r="2" fill="currentColor" opacity="0.2" />
          <path d="M14 14L18 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
          <path d="M34 14L30 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
        </svg>
      }
      title="No trades yet"
      description="Your first trade is just a click away. Start tracking your performance and unlock AI-powered insights."
      action={{ label: "Open Trade" }}
    />
  );
}

export function NoDataEmpty() {
  return (
    <EmptyState
      icon={
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d="M24 18V24L28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.15" />
          <path d="M10 10L38 38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
        </svg>
      }
      title="No data available"
      description="Connect a brokerage account or import your trade history to see analytics here."
      action={{ label: "Import Trades" }}
    />
  );
}

export function NoEmotionsEmpty() {
  return (
    <EmptyState
      icon={
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d="M18 22C18 22 20 20 24 20C28 20 30 22 30 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <path d="M20 28C21 29 22.5 30 24 30C25.5 30 27 29 28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <circle cx="19" cy="20" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="29" cy="20" r="1" fill="currentColor" opacity="0.15" />
        </svg>
      }
      title="No psychology data yet"
      description="Journal your trades with emotional states to discover patterns in your trading psychology."
      action={{ label: "Start Journaling" }}
    />
  );
}

export function NoRiskDataEmpty() {
  return (
    <EmptyState
      icon={
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 6L42 40H6L24 6Z" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d="M24 18V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <circle cx="24" cy="32" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
      }
      title="No risk data"
      description="Start trading to see your risk metrics. We'll track drawdown, exposure, and position sizing automatically."
      action={{ label: "Learn About Risk" }}
    />
  );
}

export function NoMarketDataEmpty() {
  return (
    <EmptyState
      icon={
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="18" width="8" height="18" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.3" />
          <rect x="18" y="12" width="8" height="24" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
          <rect x="30" y="14" width="8" height="22" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.3" />
          <path d="M6 38L42 38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
        </svg>
      }
      title="No market activity"
      description="Trade across different markets to see your sector performance breakdown here."
      action={{ label: "View Markets" }}
    />
  );
}
