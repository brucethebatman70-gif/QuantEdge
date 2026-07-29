"use client";

import { motion } from "framer-motion";

const communityItems = [
  { label: "Discord Community", desc: "Connect with 2,400+ traders" },
  { label: "Trading Academy", desc: "Structured courses and workshops" },
  { label: "Educational Content", desc: "Guides, articles, and deep dives" },
  { label: "Knowledge Base", desc: "Searchable documentation and FAQs" },
  { label: "Release Notes", desc: "Every update, transparently logged" },
  { label: "Public Roadmap", desc: "See what we are building next" },
  { label: "Feature Requests", desc: "Shape the platform's future" },
  { label: "Beta Program", desc: "Early access to new features" },
];

const resources = [
  { label: "Documentation", desc: "Full API and integration guides" },
  { label: "Help Center", desc: "Troubleshooting and support" },
  { label: "AI Guides", desc: "Getting the most from AI features" },
  { label: "Trading Guides", desc: "Best practices and workflows" },
  { label: "Risk Management", desc: "Build better risk frameworks" },
  { label: "Psychology Articles", desc: "Master your trading mindset" },
  { label: "Platform Updates", desc: "Whats new and what's next" },
  { label: "Blog", desc: "Insights from the QuantEdge team" },
];

export function CommunityHubSection() {
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
            Community & Resources
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            A growing ecosystem<br />
            <span className="text-[#00D4AA]">for serious traders.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
              Community
            </span>
            <p className="text-[11px] text-muted-foreground/60 mt-2 mb-4 leading-relaxed">
              QuantEdge is more than software — it&apos;s a community of traders committed to improvement.
            </p>
            <div className="space-y-1.5">
              {communityItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                  className="group flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="text-[12px] text-foreground/60 group-hover:text-foreground/80 transition-colors">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground/40">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
              Resource Hub
            </span>
            <p className="text-[11px] text-muted-foreground/60 mt-2 mb-4 leading-relaxed">
              Everything you need to master QuantEdge and become a better trader.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {resources.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 hover:border-white/[0.08] transition-all cursor-pointer"
                >
                  <span className="text-[11px] font-medium text-foreground/60 group-hover:text-foreground/80 transition-colors">
                    {item.label}
                  </span>
                  <p className="text-[9px] text-muted-foreground/40 mt-0.5">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
