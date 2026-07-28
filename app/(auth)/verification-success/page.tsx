"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/auth-card";
import { AnimatedBackground } from "@/components/auth/animated-background";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";

export default function VerificationSuccessPage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Email verified</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your email has been verified. You&apos;re all set to start trading.
          </p>
        </div>
        <Link href="/">
          <Button className="mt-8 w-full" size="lg">
            <Icons.ArrowRight className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
        </Link>
        <p className="mt-6 text-center text-[10px] text-muted-foreground">{brand.copyright}</p>
      </AuthCard>
    </div>
  );
}