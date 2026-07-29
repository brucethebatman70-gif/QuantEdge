"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function OpeningSection() {
  const [textVisible, setTextVisible] = useState(false);
  const [secondTextVisible, setSecondTextVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 600);
    const t2 = setTimeout(() => setSecondTextVisible(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
            <path d="M16 1L2 13L8 21L16 11L24 21L30 13L16 1Z" fill="#00D4AA" />
            <path d="M8 21L2 13L8 31L16 21L16 11L8 21Z" fill="#06E0FF" />
            <path d="M24 21L30 13L24 31L16 21L16 11L24 21Z" fill="#00D4AA" opacity="0.7" />
          </svg>
          <span className="text-sm font-medium tracking-tight">QuantEdge</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="relative inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/[0.08] hover:border-white/[0.2]"
          >
            Get started
          </Link>
        </div>
      </nav>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 8 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8">
            AI-Powered Trading Operating System
          </span>
        </motion.div>

        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 24, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            Trading is not about
            <br />
            <span className="text-[#00D4AA]">being right.</span>
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: secondTextVisible ? 1 : 0, y: secondTextVisible ? 0 : 24, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            It&apos;s about
            <br />
            <span className="text-[#00D4AA]">being prepared.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: secondTextVisible ? 1 : 0, y: secondTextVisible ? 0 : 16 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-8 text-[17px] leading-relaxed text-muted-foreground max-w-xl mx-auto"
        >
          Precision. Discipline. Intelligence. The unified platform for traders
          who demand more from their process.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: secondTextVisible ? 1 : 0, y: secondTextVisible ? 0 : 16 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-[#00D4AA] px-6 py-3 text-sm font-medium text-[#0C0C0F] transition-all hover:bg-[#00D4AA]/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Create your edge
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:border-white/[0.16]"
          >
            Watch overview
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: secondTextVisible ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40">
            Scroll to explore
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/[0.15] to-transparent" />
        </div>
      </motion.div>
    </motion.section>
  );
}
