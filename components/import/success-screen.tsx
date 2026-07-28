"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { brand } from "@/config/brand";

interface SuccessScreenProps {
  imported: number;
  accounts: number;
  onJournal: () => void;
  onAnalytics: () => void;
  onDashboard: () => void;
}

export function SuccessScreen({ imported, accounts, onJournal, onAnalytics, onDashboard }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative mb-8"
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
          <Icons.CheckCircle2 className="h-14 w-14 text-primary" />
        </div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-success"
        >
          <Icons.Sparkles className="h-4 w-4 text-white" />
        </motion.div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: [0, 0.5, 0] }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
            className="absolute -inset-4 rounded-full border-2 border-primary/20"
          />
        ))}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-center"
      >
        Import Complete!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-sm text-muted-foreground text-center max-w-sm"
      >
        Your data has been imported into {brand.name}. Here&apos;s what happened:
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-4 mt-8 mb-8"
      >
        <div className="flex flex-col items-center rounded-xl border border-border/50 p-5">
          <Icons.TrendingUp className="h-6 w-6 text-success mb-2" />
          <span className="text-2xl font-bold">{imported}</span>
          <span className="text-xs text-muted-foreground">Trades Imported</span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-border/50 p-5">
          <Icons.Shield className="h-6 w-6 text-primary mb-2" />
          <span className="text-2xl font-bold">{accounts}</span>
          <span className="text-xs text-muted-foreground">Accounts Connected</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Button size="lg" onClick={onJournal} className="gap-2">
          <Icons.BookOpen className="h-4 w-4" /> Open Journal
        </Button>
        <Button size="lg" variant="outline" onClick={onAnalytics} className="gap-2">
          <Icons.BarChart3 className="h-4 w-4" /> View Analytics
        </Button>
        <Button size="lg" variant="ghost" onClick={onDashboard} className="gap-2">
          <Icons.LayoutDashboard className="h-4 w-4" /> Go to Dashboard
        </Button>
      </motion.div>
    </div>
  );
}
