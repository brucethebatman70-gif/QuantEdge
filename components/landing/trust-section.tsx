"use client";

import { motion } from "framer-motion";

const features = [
  { label: "Encrypted Transit", desc: "TLS 1.3 for all data in motion" },
  { label: "Encrypted Storage", desc: "AES-256 for all data at rest" },
  { label: "Cloud Sync", desc: "Real-time across all devices" },
  { label: "Auto Backups", desc: "Daily encrypted snapshots" },
  { label: "Access Control", desc: "Role-based permissions" },
  { label: "AI Privacy", desc: "Processing isolated per workspace" },
];

const nodes = [
  { id: "device", label: "Your Device", x: 50, y: 15 },
  { id: "encrypt", label: "Encryption Layer", x: 50, y: 40 },
  { id: "cloud", label: "QuantEdge Cloud", x: 50, y: 65 },
  { id: "ai", label: "AI Processing", x: 50, y: 88 },
];

export function TrustSection() {
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
            Trust & Security
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Your data.<br />
            <span className="text-[#00D4AA]">Always protected.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
              Architecture
            </span>
            <svg viewBox="0 0 100 100" className="w-full max-w-sm mx-auto mt-4">
              <defs>
                <linearGradient id="sec-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g>
                {nodes.map((n) => (
                  <motion.g key={n.id}>
                    <motion.rect
                      x={n.x - 18} y={n.y - 5} width={36} height={10} rx={5}
                      fill="currentColor" opacity={0.06}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 0.06 }}
                      viewport={{ once: true }}
                    />
                    <text
                      x={n.x} y={n.y + 1} textAnchor="middle"
                      fill="currentColor" fontSize="3.5" opacity={0.5}
                    >
                      {n.label}
                    </text>
                  </motion.g>
                ))}
                {[
                  ["device", "encrypt"],
                  ["encrypt", "cloud"],
                  ["cloud", "ai"],
                ].map(([from, to], i) => {
                  const f = nodes.find((n) => n.id === from)!;
                  const t = nodes.find((n) => n.id === to)!;
                  return (
                    <motion.g key={i}>
                      <line
                        x1={f.x} y1={f.y + 5} x2={t.x} y2={t.y - 5}
                        stroke="currentColor" strokeWidth={0.3} opacity={0.08}
                      />
                      <motion.line
                        x1={f.x} y1={f.y + 5} x2={t.x} y2={t.y - 5}
                        stroke="#00D4AA" strokeWidth={0.8} opacity={0.4}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.3 }}
                        strokeDasharray="4 2"
                      />
                    </motion.g>
                  );
                })}
                <motion.path
                d="M30 25 C 40 20, 60 20, 70 25"
                fill="none" stroke="#00D4AA" strokeWidth={0.4}
                opacity={0.15}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
              <motion.path
                d="M30 50 C 40 45, 60 45, 70 50"
                fill="none" stroke="#06E0FF" strokeWidth={0.4}
                opacity={0.15}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
            </g>
            </svg>
            <p className="text-[11px] text-muted-foreground/50 text-center mt-2">
              End-to-end encrypted architecture with isolated AI processing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]/50 shrink-0" />
                  <span className="text-[12px] font-medium text-foreground/70">{f.label}</span>
                  <span className="text-[11px] text-muted-foreground/40 ml-auto">{f.desc}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
