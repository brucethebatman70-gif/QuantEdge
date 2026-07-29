"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/cn";

type TourStep = {
  target: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
  spotlight?: "small" | "medium" | "large";
};

const TOUR_STEPS: TourStep[] = [
  {
    target: "[data-tour='sidebar']",
    title: "Navigate the app",
    description: "Use the sidebar to access Dashboard, Journal, Analytics, Charts, AI Copilot, and more. Every tool is one click away.",
    position: "right",
    spotlight: "large",
  },
  {
    target: "[data-tour='dashboard']",
    title: "Your command center",
    description: "The Dashboard shows your P&L, win rate, risk metrics, and AI intelligence cards. This is your daily trading overview.",
    position: "bottom",
  },
  {
    target: "[data-tour='charts']",
    title: "Advanced charting",
    description: "Explore interactive charts with equity curves, bar charts, donut charts, and TradingView-style crosshair interactions.",
    position: "top",
  },
  {
    target: "[data-tour='ai-copilot']",
    title: "AI trading co-pilot",
    description: "Chat with AI to analyze trades, review risk, check psychology, or generate reports. Your personal trading analyst.",
    position: "top",
    spotlight: "large",
  },
  {
    target: "[data-tour='reports']",
    title: "Generate reports",
    description: "Create professional performance reports with AI commentary. Share with your mentor or keep for your records.",
    position: "top",
  },
  {
    target: "[data-tour='settings']",
    title: "Customize everything",
    description: "Configure broker connections, AI preferences, appearance, and more. Make QuantEdge yours.",
    position: "left",
  },
];

interface ProductTourProps {
  onComplete?: () => void;
  onSkip?: () => void;
  storageKey?: string;
}

export function ProductTour({ onComplete, onSkip, storageKey = "qe-tour-completed" }: ProductTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const step = TOUR_STEPS[currentStep];
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updateTargetRect = useCallback(() => {
    const el = document.querySelector(step.target);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
    }
  }, [step]);

  useEffect(() => {
    if (!isActive) return;
    updateTargetRect();
    const observer = new ResizeObserver(updateTargetRect);
    const el = document.querySelector(step.target);
    if (el) observer.observe(el);
    window.addEventListener("scroll", updateTargetRect, true);
    window.addEventListener("resize", updateTargetRect);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateTargetRect, true);
      window.removeEventListener("resize", updateTargetRect);
    };
  }, [isActive, step, updateTargetRect]);

  const start = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  const next = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      complete();
    }
  }, [currentStep]);

  const prev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const complete = useCallback(() => {
    setIsActive(false);
    try { localStorage.setItem(storageKey, "true"); } catch {}
    onComplete?.();
  }, [onComplete, storageKey]);

  const skip = useCallback(() => {
    setIsActive(false);
    onSkip?.();
  }, [onSkip]);

  const getTooltipPosition = () => {
    if (!targetRect) return { top: 0, left: 0 };
    const margin = 16;
    const tooltipWidth = 320;
    const tooltipHeight = 180;

    switch (step.position) {
      case "bottom":
        return {
          top: targetRect.bottom + margin,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        };
      case "top":
        return {
          top: targetRect.top - tooltipHeight - margin,
          left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        };
      case "left":
        return {
          top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
          left: targetRect.left - tooltipWidth - margin,
        };
      case "right":
        return {
          top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
          left: targetRect.right + margin,
        };
    }
  };

  const pos = getTooltipPosition();

  return (
    <>
      <AnimatePresence>
        {isActive && targetRect && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
              onClick={skip}
            />
            <motion.div
              className={cn(
                "fixed z-[91] rounded-xl pointer-events-none",
                step.spotlight === "large"
                  ? "ring-[80px] ring-black/40 ring-inset"
                  : step.spotlight === "medium"
                  ? "ring-[40px] ring-black/40 ring-inset"
                  : "ring-[20px] ring-black/40 ring-inset"
              )}
              style={{
                top: targetRect.top - 8,
                left: targetRect.left - 8,
                width: targetRect.width + 16,
                height: targetRect.height + 16,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[92] w-80"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="glass p-4 rounded-xl shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-muted-foreground/50 font-mono">
                    {currentStep + 1} / {TOUR_STEPS.length}
                  </span>
                  <button
                    onClick={skip}
                    className="text-muted-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    <Icons.X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <h4 className="text-sm font-bold opacity-90">{step.title}</h4>
                <p className="text-xs text-muted-foreground/60 mt-1.5 leading-relaxed">
                  {step.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
                  <div className="flex gap-1.5">
                    {TOUR_STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 rounded-full transition-all duration-300",
                          i === currentStep ? "w-4 bg-primary" : "w-1 bg-white/10"
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {currentStep > 0 && (
                      <button
                        onClick={prev}
                        className="text-xs text-muted-foreground/50 hover:text-foreground/70 transition-colors px-2 py-1"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={next}
                      className="rounded-lg bg-primary/20 hover:bg-primary/30 text-primary text-xs font-medium px-3 py-1.5 transition-all"
                    >
                      {currentStep < TOUR_STEPS.length - 1 ? "Next" : "Finish"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!isActive && (
        <button
          onClick={start}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary text-xs font-medium px-4 py-2 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Icons.HelpCircle className="h-3.5 w-3.5" />
          Tour
        </button>
      )}
    </>
  );
}
