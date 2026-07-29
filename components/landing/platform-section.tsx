"use client";

import { motion } from "framer-motion";

const capabilities = [
  { id: "journal", label: "Journal", desc: "Structured trade stories" },
  { id: "analytics", label: "Analytics", desc: "Performance intelligence" },
  { id: "risk", label: "Risk", desc: "Position & drawdown control" },
  { id: "ai", label: "AI Coach", desc: "Behavioral grading" },
  { id: "replay", label: "Replay", desc: "Trade reconstruction" },
  { id: "backtest", label: "Backtest", desc: "Strategy validation" },
  { id: "psychology", label: "Psychology", desc: "Emotion tracking" },
  { id: "reports", label: "Reports", desc: "Institutional summaries" },
  { id: "goals", label: "Goals", desc: "Objective alignment" },
  { id: "intel", label: "Intel", desc: "Market intelligence" }
];

export function PlatformSection() {
  return (
    <section className="relative px-6 py-48">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            The unified platform
          </span>
        </motion.div>

        <div className="relative">
          <div className="flex flex-wrap justify-center gap-3">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                className="group relative"
              >
                <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 transition-all duration-500 hover:border-[#00D4AA]/30 hover:bg-[#00D4AA]/[0.03] hover:shadow-[0_0_30px_-10px_rgba(0,212,170,0.15)]">
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {cap.label}
                  </span>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="whitespace-nowrap rounded-lg border border-white/[0.06] bg-[#0C0C0F] px-3 py-1.5 text-[11px] text-muted-foreground shadow-xl">
                      {cap.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#00D4AA]/20 to-transparent mx-auto mt-14 max-w-md"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="text-center mt-8 text-[15px] text-muted-foreground"
          >
            One operating system. <span className="text-foreground font-medium">Every tool you need.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
