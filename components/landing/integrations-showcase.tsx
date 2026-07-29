"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const integrations = [
  { name: "TradingView", desc: "Sync charts, ideas, and alerts automatically", category: "Charting" },
  { name: "MetaTrader 4/5", desc: "Direct trade import and journal synchronization", category: "Broker" },
  { name: "cTrader", desc: "Automated trade history and performance sync", category: "Broker" },
  { name: "DXtrade", desc: "Prop firm trade data integration", category: "Broker" },
  { name: "Interactive Brokers", desc: "API-driven trade and portfolio sync", category: "Broker" },
  { name: "Binance", desc: "Crypto trade history and balance sync", category: "Exchange" },
  { name: "Bybit", desc: "Derivatives trade import and analysis", category: "Exchange" },
  { name: "Google Drive", desc: "Backup journal exports and screenshots", category: "Cloud" },
  { name: "Discord", desc: "Trade notifications and daily summaries", category: "Communication" },
  { name: "Telegram", desc: "Real-time alerts and trade signals", category: "Communication" },
  { name: "CSV Import", desc: "Bulk import from any platform", category: "Import" },
  { name: "REST API", desc: "Build custom integrations and automations", category: "Developer" },
];

const enterpriseFeatures = [
  { title: "Team Dashboard", desc: "Aggregated performance across all team members" },
  { title: "Coach Access", desc: "Review trades, leave feedback, track progress" },
  { title: "Role Management", desc: "Admin, manager, trader, coach permissions" },
  { title: "Shared Journal", desc: "Collaborative trade review and discussion" },
  { title: "Audit Logs", desc: "Complete action history and compliance" },
  { title: "Approval Workflow", desc: "Pre-trade approvals for prop firms" },
];

export function IntegrationsShowcase() {
  const [activeIntegration, setActiveIntegration] = useState<string | null>(null);
  const [activeEnterprise, setActiveEnterprise] = useState<string | null>(null);

  return (
    <section className="relative px-6 py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Platform
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Connects with<br />
            <span className="text-[#06E0FF]">everything you use.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
            Integrations
          </span>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {integrations.map((item) => (
              <motion.div
                key={item.name}
                onMouseEnter={() => setActiveIntegration(item.name)}
                onMouseLeave={() => setActiveIntegration(null)}
                className="relative rounded-xl border border-white/[0.04] bg-white/[0.015] p-2.5 transition-all duration-300 cursor-default"
                whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.1)" }}
              >
                <span className="text-[12px] font-medium text-foreground/70">{item.name}</span>
                <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-muted-foreground/30 ml-1.5">
                  {item.category}
                </span>
                {activeIntegration === item.name && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-muted-foreground/60 mt-1 leading-relaxed"
                  >
                    {item.desc}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                Enterprise
              </span>
              <span className="text-[9px] font-mono text-[#00D4AA]/50">TEAMS · PROP FIRMS · COACHES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {enterpriseFeatures.map((item) => (
                <motion.div
                  key={item.title}
                  onMouseEnter={() => setActiveEnterprise(item.title)}
                  onMouseLeave={() => setActiveEnterprise(null)}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 transition-all duration-300 cursor-default"
                  whileHover={{ y: -2, borderColor: "rgba(0,212,170,0.15)" }}
                >
                  <span className="text-[12px] font-medium text-foreground/70">{item.title}</span>
                  {activeEnterprise === item.title && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-muted-foreground/60 mt-1 leading-relaxed"
                    >
                      {item.desc}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
