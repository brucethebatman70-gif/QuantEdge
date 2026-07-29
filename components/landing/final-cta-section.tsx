"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const trustItems = [
  { label: "Private Workspace", desc: "Your data, isolated and encrypted" },
  { label: "AI Assisted", desc: "Smart insights without replacing you" },
  { label: "Secure Infrastructure", desc: "TLS 1.3 & AES-256 encryption" },
  { label: "Cloud Sync", desc: "Real-time across every device" },
  { label: "Regular Updates", desc: "New features shipped weekly" },
  { label: "Fast Performance", desc: "Built for speed at every scale" },
  { label: "Professional Support", desc: "Real people, real help" },
  { label: "14-Day Trial", desc: "Full access, no credit card" },
];

export function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative px-6 py-40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00D4AA]/[0.02] blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#8b5cf6]/[0.015] blur-[60px]" />
      </div>

      <div className="relative max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Start your journey
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.02em]"
        >
          Start your professional<br />
          <span className="text-[#00D4AA]">trading journey.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 text-[14px] text-muted-foreground leading-relaxed"
        >
          Join thousands of traders who have transformed their approach.<br />
          Track. Analyze. Improve. Every single trade.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <div className="flex items-center gap-3 max-w-sm mx-auto">
            <div className="relative flex-1 group">
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
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative inline-flex items-center gap-2 rounded-xl bg-[#00D4AA] px-5 py-3 text-sm font-medium text-[#0C0C0F] transition-all hover:bg-[#00D4AA]/90 active:scale-[0.98] shrink-0 overflow-hidden"
            >
              <motion.span
                animate={hovered ? { scale: [1, 1.04, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                Build your edge
              </motion.span>
              <motion.span
                animate={hovered ? { x: [0, 2, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                →
              </motion.span>
            </Link>
          </div>
          <p className="text-[10px] text-muted-foreground/30 mt-2">
            No credit card required. 14-day free trial on Professional.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl mx-auto">
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.02 }}
                className="group rounded-xl border border-white/[0.04] bg-white/[0.015] p-2.5 text-left hover:border-white/[0.08] transition-colors"
              >
                <span className="text-[10px] font-medium text-foreground/60 group-hover:text-foreground/80 transition-colors">
                  {item.label}
                </span>
                <p className="text-[8px] text-muted-foreground/40 mt-0.5">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
