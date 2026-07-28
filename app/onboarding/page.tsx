"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";
import { useAuthStore } from "@/lib/auth/store";
import type { TradingExperience, Market, TradingStyle, Broker, CoachingStyle, FocusArea } from "@/lib/auth/types";

const totalSteps = 8;
const steps = ["Welcome", "Markets", "Style", "Broker", "Account", "Goals", "AI Coach", "Finish"];

export default function OnboardingPage() {
  const router = useRouter();
  const { onboardingData, updateOnboarding, completeOnboarding } = useAuthStore();
  const [step, setStep] = useState(1);

  const next = () => { if (step < totalSteps) setStep(s => s + 1); };
  const back = () => { if (step > 1) setStep(s => s - 1); else router.push("/"); };

  const selectableGrid = <T extends string>(items: T[], selected: T | T[] | undefined, onSelect: (v: T) => void, multi = false) => (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => {
        const isSelected = multi ? (selected as T[])?.includes(item) : selected === item;
        return (
          <button key={item} onClick={() => onSelect(item)}
            className={cn("rounded-xl border p-4 text-sm font-medium text-left transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
              isSelected ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border bg-card text-foreground")}>
            <span className="capitalize">{item.replace(/-/g, " ")}</span>
          </button>
        );
      })}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1: {
        const opts: TradingExperience[] = ["beginner", "intermediate", "advanced", "professional"];
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center py-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-2xl font-bold text-primary">JD</span>
              </div>
              <h2 className="text-lg font-semibold">Welcome, Demo User</h2>
              <p className="text-sm text-muted-foreground">Let&apos;s set up your trading profile</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Your trading experience</p>
              {selectableGrid(opts, onboardingData.experience, (v) => updateOnboarding({ experience: v }))}
            </div>
          </div>
        );
      }
      case 2: {
        const opts: Market[] = ["forex", "crypto", "indices", "stocks", "futures", "options", "commodities"];
        const selected = onboardingData.markets || [];
        return (
          <div>
            <p className="text-sm font-medium mb-3">Which markets do you trade?</p>
            {selectableGrid(opts, selected, (v) => {
              const next = selected.includes(v) ? selected.filter((m) => m !== v) : [...selected, v];
              updateOnboarding({ markets: next });
            }, true)}
          </div>
        );
      }
      case 3: {
        const opts: TradingStyle[] = ["scalping", "day-trading", "swing", "position-trading", "algorithmic"];
        return (
          <div>
            <p className="text-sm font-medium mb-3">Select your trading style</p>
            {selectableGrid(opts, onboardingData.tradingStyle, (v) => updateOnboarding({ tradingStyle: v }))}
          </div>
        );
      }
      case 4: {
        const opts: Broker[] = ["mt4", "mt5", "tradingview", "ctrader", "matchtrader", "dxtrade", "other"];
        return (
          <div>
            <p className="text-sm font-medium mb-3">Which broker platform do you use?</p>
            {selectableGrid(opts, onboardingData.broker, (v) => updateOnboarding({ broker: v }))}
          </div>
        );
      }
      case 5:
        return (
          <div className="space-y-4">
            {[{ k: "accountCurrency", l: "Account currency", p: "USD" }, { k: "startingBalance", l: "Starting balance", p: "10000" }, { k: "riskPercent", l: "Preferred risk %", p: "2" }, { k: "preferredRR", l: "Preferred R:R ratio", p: "3" }].map(({ k, l, p }) => (
              <div key={k}>
                <label className="text-sm font-medium mb-1.5 block">{l}</label>
                <input type={k === "accountCurrency" ? "text" : "number"} placeholder={p}
                  value={(onboardingData as any)[k] || ""}
                  onChange={(e) => updateOnboarding({ [k]: k === "accountCurrency" ? e.target.value : Number(e.target.value) })}
                  className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200" />
              </div>
            ))}
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            {[{ k: "monthlyProfitGoal", l: "Monthly profit goal ($)", p: "5000" }, { k: "maxDrawdown", l: "Maximum drawdown (%)", p: "15" }, { k: "dailyRiskLimit", l: "Daily risk limit ($)", p: "500" }, { k: "weeklyGoal", l: "Weekly goal ($)", p: "1500" }].map(({ k, l, p }) => (
              <div key={k}>
                <label className="text-sm font-medium mb-1.5 block">{l}</label>
                <input type="number" placeholder={p}
                  value={(onboardingData as any)[k] || ""}
                  onChange={(e) => updateOnboarding({ [k]: Number(e.target.value) })}
                  className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200" />
              </div>
            ))}
          </div>
        );
      case 7: {
        const coachOpts: CoachingStyle[] = ["strict", "balanced", "supportive"];
        const focusOpts: FocusArea[] = ["risk", "psychology", "execution", "consistency", "discipline"];
        const selectedAreas = onboardingData.focusAreas || [];
        return (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">AI coaching style</p>
              {selectableGrid(coachOpts, onboardingData.coachingStyle, (v) => updateOnboarding({ coachingStyle: v }))}
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Focus areas</p>
              {selectableGrid(focusOpts, selectedAreas, (v) => {
                const next = selectedAreas.includes(v) ? selectedAreas.filter((a) => a !== v) : [...selectedAreas, v];
                updateOnboarding({ focusAreas: next });
              }, true)}
            </div>
          </div>
        );
      }
      case 8:
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }} className="relative mb-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <Icons.Sparkles className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-success">
                <Icons.Check className="h-4 w-4 text-white" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-center">You&apos;re all set!</h2>
            <p className="mt-3 text-sm text-muted-foreground text-center max-w-sm">
              Your profile is configured and {brand.name} is optimized for your trading style.
            </p>
          </div>
        );
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!onboardingData.experience;
      case 2: return (onboardingData.markets?.length || 0) > 0;
      case 3: return !!onboardingData.tradingStyle;
      case 4: return !!onboardingData.broker;
      case 5: return !!onboardingData.accountCurrency && !!onboardingData.startingBalance;
      case 6: return !!onboardingData.monthlyProfitGoal;
      case 7: return !!onboardingData.coachingStyle;
      case 8: return true;
      default: return false;
    }
  };

  const handleFinish = () => { completeOnboarding(); router.push("/"); };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">Step {step} of {totalSteps}</span>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div key={i} className={cn("h-1 w-8 rounded-full transition-all duration-300", i + 1 <= step ? "bg-primary" : "bg-muted")} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              {steps.map((s, i) => {
                const num = i + 1, active = num === step, done = num < step;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium transition-all", active && "bg-primary text-primary-foreground scale-110", done && "bg-success/20 text-success", !active && !done && "bg-muted text-muted-foreground")}>
                      {done ? <Icons.Check className="h-3 w-3" /> : num}
                    </div>
                    <span className={cn("hidden sm:inline text-[10px] font-medium", active && "text-foreground", done && "text-success", !active && !done && "text-muted-foreground")}>{s}</span>
                    {i < steps.length - 1 && <div className={cn("h-px w-4 sm:w-6", done ? "bg-success/50" : "bg-muted")} />}
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">{steps[step - 1]}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step === 1 && "Tell us about yourself"}{step === 2 && "Choose the markets you trade"}{step === 3 && "Define your trading approach"}{step === 4 && "Select your primary platform"}{step === 5 && "Set your account parameters"}{step === 6 && "Define your targets"}{step === 7 && "Personalize your AI coach"}{step === 8 && "Ready to start trading"}
                </p>
              </div>
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <Button variant="ghost" onClick={back}>
              <Icons.ChevronLeft className="mr-2 h-4 w-4" />{step === 1 ? "Skip" : "Back"}
            </Button>
            {step < totalSteps ? (
              <Button onClick={next} disabled={!canProceed()} size="lg">Continue<Icons.ChevronRight className="ml-2 h-4 w-4" /></Button>
            ) : (
              <Button onClick={handleFinish} size="lg">Go to Dashboard<Icons.ArrowRight className="ml-2 h-4 w-4" /></Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}