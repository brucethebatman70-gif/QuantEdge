"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/components/auth/auth-card";
import { AnimatedBackground } from "@/components/auth/animated-background";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";
import { useAuthStore } from "@/lib/auth/store";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/auth/schemas";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "mock-token";
  const { setNewPassword, isLoading } = useAuthStore();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    await setNewPassword(token, data.password);
    setSuccess(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  if (success) {
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
            <h1 className="text-2xl font-bold tracking-tight">Password reset</h1>
            <p className="mt-3 text-sm text-muted-foreground">Your password has been reset successfully. Redirecting to login...</p>
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
          <Icons.Lock className="h-6 w-6 text-primary" />
        </motion.div>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">Must be at least 8 characters with an uppercase letter and number.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <PasswordInput id="password" placeholder="Enter new password" autoComplete="new-password" {...register("password")} />
            {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
            <PasswordStrength password={password || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <PasswordInput id="confirmPassword" placeholder="Repeat new password" autoComplete="new-password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-xs text-error">{errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
        <Link href="/login">
          <Button variant="ghost" className="w-full mt-4">
            <Icons.ChevronLeft className="mr-2 h-4 w-4" /> Back to login
          </Button>
        </Link>
        <p className="mt-6 text-center text-[10px] text-muted-foreground">{brand.copyright}</p>
      </AuthCard>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}