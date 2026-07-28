"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useAuthStore } from "@/lib/auth/store";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export function OnboardingLayout({
  children,
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextDisabled,
  nextLabel = "Continue",
}: OnboardingLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) onBack();
    else if (currentStep > 1) router.push(`/step-${currentStep - 1}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-1 w-8 rounded-full transition-all duration-300 ${
                    i + 1 <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>

            {children}
          </motion.div>

          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <Icons.ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={onNext} disabled={nextDisabled} size="lg">
              {nextLabel}
              {nextLabel === "Finish" ? (
                <Icons.Sparkles className="ml-2 h-4 w-4" />
              ) : (
                <Icons.ChevronRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}