"use client";

import { motion } from "framer-motion";

const groups = [
  {
    title: "Professional Traders",
    desc: "Individual traders who treat trading as a profession. They use QuantEdge to maintain discipline, track psychology, and systematically improve every aspect of their performance.",
    count: "4,200+",
    color: "#00D4AA",
    items: ["Swing traders", "Day traders", "Position traders", "Scalpers"],
  },
  {
    title: "Trading Coaches",
    desc: "Coaches and mentors who use QuantEdge to review student trades at scale, track progression, and identify common weak points across their entire cohort.",
    count: "340+",
    color: "#8b5cf6",
    items: ["1:1 mentors", "Course creators", "Group coaches", "Trading psychologists"],
  },
  {
    title: "Prop Firm Traders",
    desc: "Funded traders and prop firm candidates who rely on QuantEdge to track their consistency, manage risk across multiple accounts, and prepare for evaluations.",
    count: "1,800+",
    color: "#3b82f6",
    items: ["FTMO", "Funding Pips", "The Funded Trader", "E8 Markets"],
  },
  {
    title: "Trading Teams",
    desc: "Small teams and trading desks that need shared journaling, collaborative review, and consistent performance tracking across multiple traders.",
    count: "120+",
    color: "#f59e0b",
    items: ["Trading desks", "Family offices", "Small funds", "Research teams"],
  },
];

export function CommunitySection() {
  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Community
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Built for the<br />
            <span className="text-[#00D4AA]">entire trading ecosystem.</span>
          </h2>
          <p className="mt-4 text-[13px] text-muted-foreground/60 max-w-xl mx-auto leading-relaxed">
            QuantEdge serves every role in the trading industry — from individual professionals to
            institutional teams. Each group finds unique value in a platform built for real trading workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.1] transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: g.color }}
                    />
                    <span className="text-[13px] font-medium text-foreground/80">{g.title}</span>
                  </div>
                </div>
                <span
                  className="text-[11px] font-mono tabular-nums"
                  style={{ color: g.color, opacity: 0.6 }}
                >
                  {g.count}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground/60 leading-relaxed mb-3">
                {g.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.04] text-[9px] text-muted-foreground/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                Learning Resources
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Video Guides", desc: "Walkthroughs & tutorials" },
                { label: "Documentation", desc: "API & integration docs" },
                { label: "Webinars", desc: "Monthly deep dives" },
                { label: "Community Hub", desc: "Discussion & tips" },
              ].map((r) => (
                <div
                  key={r.label}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 text-center"
                >
                  <span className="text-[11px] font-medium text-foreground/70">{r.label}</span>
                  <p className="text-[9px] text-muted-foreground/40 mt-0.5">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
