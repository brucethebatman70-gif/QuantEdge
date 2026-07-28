"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/auth-card";
import { AnimatedBackground } from "@/components/auth/animated-background";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";
import { useAuthStore } from "@/lib/auth/store";

export default function VerificationSentPage() {
  const { resendVerification, isLoading } = useAuthStore();
  const [countdown, setCountdown] = useState(60);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    await resendVerification();
    setResent(true);
    setCountdown(60);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <AuthCard>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
        >
          <Icons.Mail className="h-8 w-8 text-primary" />
        </motion.div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            We&apos;ve sent a verification link to your email. Click the link to verify your account and get started.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            variant="outline"
            className="w-full"
            disabled={countdown > 0 || isLoading}
            onClick={handleResend}
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
            ) : resent ? (
              <Icons.Check className="mr-2 h-4 w-4 text-success" />
            ) : null}
            {countdown > 0 ? `Resend in ${countdown}s` : resent ? "Sent" : "Resend email"}
          </Button>

          <Link href="/login">
            <Button variant="ghost" className="w-full">
              <Icons.ChevronLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-center text-[10px] text-muted-foreground">
          Didn&apos;t receive it? Check your spam folder or try a different email address.
        </p>
      </AuthCard>
    </div>
  );
}