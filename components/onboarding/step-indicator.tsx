"use client";

import { cn } from "@/lib/cn";

interface StepIndicatorProps {
  steps: { label: string; icon: string }[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        return (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-300",
                isActive && "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110",
                isCompleted && "bg-success/20 text-success",
                !isActive && !isCompleted && "bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                stepNum
              )}
            </div>
            <span
              className={cn(
                "hidden sm:inline text-xs font-medium transition-colors",
                isActive && "text-foreground",
                isCompleted && "text-success",
                !isActive && !isCompleted && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <div className={cn("h-px w-6 sm:w-10 transition-colors", isCompleted ? "bg-success/50" : "bg-muted")} />
            )}
          </div>
        );
      })}
    </div>
  );
}