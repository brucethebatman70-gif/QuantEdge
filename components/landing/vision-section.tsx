"use client";

import { motion } from "framer-motion";

const ecosystemNodes = [
  { id: "ai", label: "AI Intelligence", x: 50, y: 10, color: "#8b5cf6" },
  { id: "journal", label: "Trade Journal", x: 20, y: 35, color: "#00D4AA" },
  { id: "analytics", label: "Analytics", x: 80, y: 35, color: "#3b82f6" },
  { id: "psychology", label: "Psychology", x: 5, y: 60, color: "#06E0FF" },
  { id: "risk", label: "Risk Engine", x: 35, y: 60, color: "#f59e0b" },
  { id: "reports", label: "Reports", x: 65, y: 60, color: "#00D4AA" },
  { id: "learning", label: "Learning", x: 20, y: 83, color: "#8b5cf6" },
  { id: "growth", label: "Growth", x: 80, y: 83, color: "#3b82f6" },
];

const connections = [
  ["ai", "journal"], ["ai", "analytics"], ["ai", "psychology"], ["ai", "risk"],
  ["journal", "psychology"], ["analytics", "risk"],
  ["psychology", "learning"], ["risk", "reports"],
  ["reports", "learning"], ["learning", "growth"],
  ["journal", "reports"], ["analytics", "learning"],
];

const values = [
  { label: "Discipline", desc: "Structured processes for consistent execution" },
  { label: "Learning", desc: "Systematic review that compounds knowledge" },
  { label: "Awareness", desc: "Deep understanding of your trading patterns" },
  { label: "Growth", desc: "Measurable improvement across every dimension" },
];

export function VisionSection() {
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
            Our Mission
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] max-w-2xl mx-auto">
            Helping traders build<br />
            <span className="text-[#00D4AA]">lasting professional habits.</span>
          </h2>
          <p className="mt-4 text-[13px] text-muted-foreground/60 max-w-xl mx-auto leading-relaxed">
            QuantEdge exists to give every trader the same infrastructure that institutional
            professionals use — not for making predictions, but for building the discipline,
            awareness, and consistency that define great traders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 mb-16"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40 block text-center mb-6">
            The QuantEdge Ecosystem
          </span>
          <svg viewBox="0 0 100 95" className="w-full max-w-md mx-auto">
            <defs>
              <radialGradient id="eco-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="50" cy="45" r="38" fill="url(#eco-glow)" opacity={0.5} />

            {connections.map(([from, to], i) => {
              const f = ecosystemNodes.find((n) => n.id === from)!;
              const t = ecosystemNodes.find((n) => n.id === to)!;
              return (
                <g key={`conn-${i}`}>
                  <line
                    x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                    stroke="currentColor" strokeWidth={0.15} opacity={0.04}
                  />
                  <motion.line
                    x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                    stroke={f.color} strokeWidth={0.4} opacity={0.15}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.05 }}
                  />
                </g>
              );
            })}

            {ecosystemNodes.map((n) => (
              <motion.g key={n.id}>
                <motion.circle
                  cx={n.x} cy={n.y} r={4}
                  fill={n.color} opacity={0.15}
                  initial={{ r: 0 }}
                  whileInView={{ r: 4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                />
                <motion.circle
                  cx={n.x} cy={n.y} r={1.5}
                  fill={n.color} opacity={0.6}
                  initial={{ r: 0 }}
                  whileInView={{ r: 1.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
                <text
                  x={n.x} y={n.y + 3}
                  textAnchor="middle"
                  fill="currentColor" fontSize="2.5" opacity={0.4}
                >
                  {n.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 text-center"
            >
              <span className="text-[12px] font-medium text-[#00D4AA]/80">{v.label}</span>
              <p className="text-[10px] text-muted-foreground/50 mt-1 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
