"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/components/auth/auth-card";
import { AnimatedBackground } from "@/components/auth/animated-background";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";
import { useAuthStore } from "@/lib/auth/store";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/auth/schemas";

export default function ForgotPasswordPage() {
  const { resetPassword, isLoading } = useAuthStore();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);
    try {
      await resetPassword(data.email);
      setSent(true);
    } catch {
      setError("Failed to send reset link. Please try again.");
    }
  };

  if (sent) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <AuthCard>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10"
          >
            <Icons.CheckCircle2 className="h-8 w-8 text-success" />
          </motion.div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We&apos;ve sent a password reset link to your email address. It may take a few minutes to arrive.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
              Send again
            </Button>
            <Link href="/login">
              <Button variant="ghost" className="w-full">
                <Icons.ChevronLeft className="mr-2 h-4 w-4" />
                Back to login
              </Button>
            </Link>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <AuthCard>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"
        >
          <Icons.KeyRound className="h-6 w-6 text-primary" />
        </motion.div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            No worries. We&apos;ll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-error/10 border border-error/20 p-3 text-sm text-error"
            >
              {error}
            </motion.div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="hello@example.com" autoComplete="email" {...register("email")} />
            {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <Link href="/login">
          <Button variant="ghost" className="w-full mt-4">
            <Icons.ChevronLeft className="mr-2 h-4 w-4" />
            Back to login
          </Button>
        </Link>

        <p className="mt-6 text-center text-[10px] text-muted-foreground">
          {brand.copyright}
        </p>
      </AuthCard>
    </div>
  );
}