"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/auth-card";
import { AnimatedBackground } from "@/components/auth/animated-background";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";
import { useAuthStore } from "@/lib/auth/store";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "mock-token";
  const { verifyEmail, isLoading } = useAuthStore();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    const run = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
        setTimeout(() => router.push("/"), 2000);
      } catch {
        setStatus("error");
      }
    };
    run();
  }, [token, verifyEmail, router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <AuthCard>
        <AnimatePresence mode="wait">
          {status === "verifying" && (
            <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Verifying your email</h1>
              <p className="mt-3 text-sm text-muted-foreground">Please wait while we verify your email address...</p>
            </motion.div>
          )}
          {status === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10"
              >
                <Icons.CheckCircle2 className="h-8 w-8 text-success" />
              </motion.div>
              <h1 className="text-2xl font-bold tracking-tight">Email verified</h1>
              <p className="mt-3 text-sm text-muted-foreground">Your email has been verified. Redirecting to dashboard...</p>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10">
                <Icons.XCircle className="h-8 w-8 text-error" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Verification failed</h1>
              <p className="mt-3 text-sm text-muted-foreground">This link is invalid or expired. Please request a new one.</p>
              <Link href="/verification-sent">
                <Button className="mt-6 w-full">Resend verification</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </AuthCard>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}