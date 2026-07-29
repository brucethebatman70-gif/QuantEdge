"use client";

import { motion } from "framer-motion";

const categories = [
  {
    label: "Encryption",
    items: [
      { label: "Data in Transit", desc: "TLS 1.3 with forward secrecy" },
      { label: "Data at Rest", desc: "AES-256 encryption" },
      { label: "End-to-End", desc: "Isolated per-workspace keys" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { label: "Cloud Sync", desc: "Real-time across all devices" },
      { label: "Auto Backups", desc: "Daily encrypted snapshots" },
      { label: "Uptime", desc: "99.9% SLA with redundancy" },
    ],
  },
  {
    label: "Access",
    items: [
      { label: "Role-Based Access", desc: "Granular permission levels" },
      { label: "Session Protection", desc: "Automatic timeout & audit" },
      { label: "2FA", desc: "Two-factor authentication" },
    ],
  },
  {
    label: "AI Privacy",
    items: [
      { label: "Isolated Processing", desc: "Per-workspace AI contexts" },
      { label: "Data Isolation", desc: "No cross-account training" },
      { label: "On-Request Deletion", desc: "Full data wipe capability" },
    ],
  },
];

const nodes = [
  { id: "device", label: "Your Device", x: 20, y: 30 },
  { id: "encrypt", label: "Encryption", x: 50, y: 15 },
  { id: "cloud", label: "QuantEdge Cloud", x: 80, y: 30 },
  { id: "backup", label: "Backups", x: 80, y: 65 },
  { id: "ai", label: "AI Processing", x: 20, y: 65 },
];

const connections = [
  ["device", "encrypt"],
  ["encrypt", "cloud"],
  ["cloud", "backup"],
  ["cloud", "ai"],
];

const particles = [
  { x1: 24, y1: 32, x2: 46, y2: 18, color: "#00D4AA" },
  { x1: 54, y1: 18, x2: 76, y2: 32, color: "#06E0FF" },
  { x1: 78, y1: 34, x2: 78, y2: 62, color: "#8b5cf6" },
  { x1: 24, y1: 62, x2: 46, y2: 34, color: "#3b82f6" },
];

export function TrustSection() {
  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
              Security Architecture
            </span>
            <svg viewBox="0 0 100 80" className="w-full max-w-md mx-auto mt-4">
              <defs>
                <linearGradient id="sec-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="3" markerHeight="2" refX="1.5" refY="1" orient="auto">
                  <polygon points="0 0, 3 1, 0 2" fill="#00D4AA" opacity="0.3" />
                </marker>
              </defs>

              <g>
                {nodes.map((n) => (
                  <motion.g key={n.id}>
                    <motion.rect
                      x={n.x - 14} y={n.y - 4} width={28} height={8} rx={4}
                      fill="currentColor" opacity={0.04}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.04 }}
                      viewport={{ once: true }}
                    />
                    <text
                      x={n.x} y={n.y + 1} textAnchor="middle"
                      fill="currentColor" fontSize="2.8" opacity={0.45}
                    >
                      {n.label}
                    </text>
                  </motion.g>
                ))}

                {connections.map(([from, to], i) => {
                  const f = nodes.find((n) => n.id === from)!;
                  const t = nodes.find((n) => n.id === to)!;
                  return (
                    <motion.g key={`conn-${i}`}>
                      <line
                        x1={f.x + 14} y1={f.y} x2={t.x - 14} y2={t.y}
                        stroke="currentColor" strokeWidth={0.2} opacity={0.06}
                      />
                      <motion.line
                        x1={f.x + 14} y1={f.y} x2={t.x - 14} y2={t.y}
                        stroke="#00D4AA" strokeWidth={0.5} opacity={0.3}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        strokeDasharray="3 2"
                      />
                    </motion.g>
                  );
                })}

                {particles.map((p, i) => (
                  <motion.circle
                    key={i}
                    r={0.6}
                    fill={p.color}
                    opacity={0.6}
                    initial={{ cx: p.x1, cy: p.y1 }}
                    whileInView={{
                      cx: [p.x1, p.x2, p.x1],
                      cy: [p.y1, p.y2, p.y1],
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40 block mb-2">
                  {cat.label}
                </span>
                <div className="space-y-1.5">
                  {cat.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[11px] text-foreground/70">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground/50">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
