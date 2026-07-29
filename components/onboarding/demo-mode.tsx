"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/lib/icons";
import { DemoIllustration } from "@/components/empty-states/illustrations";

interface DemoModeProps {
  onLoadDemo: () => void;
  onCancel?: () => void;
}

export function DemoModePrompt({ onLoadDemo, onCancel }: DemoModeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center px-6"
    >
      <DemoIllustration size={100} />
      <h2 className="text-xl font-bold mt-6 opacity-90">Welcome to your workspace</h2>
      <p className="text-sm text-muted-foreground/60 mt-2 max-w-md">
        You don&apos;t have any data yet. Load a demo workspace with realistic sample data to explore every feature immediately.
      </p>
      <div className="flex items-center gap-3 mt-8">
        <button
          onClick={onLoadDemo}
          className="inline-flex items-center gap-2 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary text-sm font-medium px-6 py-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Icons.Play className="h-4 w-4" />
          Explore Demo Workspace
        </button>
        <button
          onClick={onCancel}
          className="rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-foreground/70 text-sm font-medium px-6 py-2.5 transition-all duration-200"
        >
          Skip
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-10 text-center">
        {[
          { label: "Trading Charts", desc: "Interactive charts with indicators" },
          { label: "AI Analysis", desc: "Smart trade insights & coaching" },
          { label: "Performance", desc: "Detailed reports & analytics" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="h-1 w-8 rounded-full bg-primary/30 mb-2" />
            <span className="text-xs font-medium opacity-70">{item.label}</span>
            <span className="text-[10px] text-muted-foreground/50 mt-0.5">{item.desc}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
