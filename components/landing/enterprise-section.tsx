"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const offers = [
  { label: "Custom Onboarding", desc: "Tailored setup for your team's workflow and existing tools." },
  { label: "Enterprise Demo", desc: "Personal walkthrough covering your specific use cases." },
  { label: "Dedicated Support", desc: "Priority channel with guaranteed response times." },
  { label: "API Access", desc: "Full API for custom integrations and data pipelines." },
  { label: "Priority Features", desc: "Early access to new features and beta programs." },
  { label: "Team Training", desc: "Onboarding sessions for your entire team." },
];

const audiences = [
  "Trading Teams",
  "Prop Firms",
  "Institutions",
  "Fund Managers",
  "Trading Coaches",
  "Educational Programs",
];

export function EnterpriseSection() {
  return (
    <section className="relative px-6 py-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            For Teams & Institutions
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Built for<br />
            <span className="text-[#00D4AA]">professional organizations.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {audiences.map((a) => (
            <span
              key={a}
              className="px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[11px] text-muted-foreground/60"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {offers.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3.5"
            >
              <span className="text-[12px] font-medium text-foreground/70">{item.label}</span>
              <p className="text-[10px] text-muted-foreground/50 mt-1 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-[12px] font-medium text-foreground/70 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all"
          >
            Contact enterprise sales
            <span className="text-[#00D4AA]">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
