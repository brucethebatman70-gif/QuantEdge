"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { brand } from "@/config/brand";

export function CTASection() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative px-6 py-32">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Start your journey
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]"
        >
          Your edge is waiting.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mt-4 text-[15px] text-muted-foreground"
        >
          Join professional traders using QuantEdge to transform their process.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="mt-10"
        >
          <div className="flex items-center gap-3 max-w-sm mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-all focus:outline-none focus:border-[#00D4AA]/40 focus:bg-white/[0.05] focus:shadow-[0_0_20px_-8px_rgba(0,212,170,0.15)]"
              />
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00D4AA] px-5 py-3 text-sm font-medium text-[#0C0C0F] transition-all hover:bg-[#00D4AA]/90 hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              Get started
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-20 pt-16 border-t border-white/[0.04]"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-muted-foreground/40">
            <span>&copy; {new Date().getFullYear()} {brand.company}. All rights reserved.</span>
            <span className="hidden md:inline text-muted-foreground/20">/</span>
            <Link href="/legal/privacy" className="hover:text-foreground/60 transition-colors">
              Privacy
            </Link>
            <span className="text-muted-foreground/20">/</span>
            <Link href="/legal/terms" className="hover:text-foreground/60 transition-colors">
              Terms
            </Link>
            <span className="text-muted-foreground/20">/</span>
            <Link href="mailto:support@quantedge.io" className="hover:text-foreground/60 transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
