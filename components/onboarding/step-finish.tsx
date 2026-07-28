"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useAuthStore } from "@/lib/auth/store";
import { brand } from "@/config/brand";

export function StepFinish() {
  const router = useRouter();
  const { completeOnboarding } = useAuthStore();

  const handleFinish = () => {
    completeOnboarding();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative mb-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Icons.Sparkles className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-success">
          <Icons.Check className="h-4 w-4 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center">You&apos;re all set!</h2>
      <p className="mt-3 text-sm text-muted-foreground text-center max-w-sm">
        Your profile is configured and {brand.name} is optimized for your trading style. Let&apos;s start trading.
      </p>
      <Button onClick={handleFinish} size="lg" className="mt-8">
        Go to Dashboard
        <Icons.ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}