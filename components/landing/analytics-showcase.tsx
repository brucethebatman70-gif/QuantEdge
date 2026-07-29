"use client";

import { motion } from "framer-motion";

const scores = [
  { label: "Performance", value: 86, color: "#00D4AA", desc: "Above benchmark by 12%" },
  { label: "Consistency", value: 74, color: "#06E0FF", desc: "Improving 3% weekly" },
  { label: "Risk", value: 82, color: "#8b5cf6", desc: "Controlled drawdown" },
  { label: "Execution", value: 79, color: "#3b82f6", desc: "Precision improving" },
  { label: "Psychology", value: 71, color: "#f59e0b", desc: "Focus area identified" },
  { label: "Discipline", value: 85, color: "#10b981", desc: "Rule adherence strong" },
];

function RadialScore({ label, value, color }: { label: string; value: number; color: string }) {
  const r = 28;
  const cx = 36;
  const cy = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 72 72" className="w-16 h-16">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={3}
          className="text-white/[0.04]" />
        <motion.circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={3} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <motion.text
          x={cx} y={cy + 1} textAnchor="middle" fill="currentColor"
          className="fill-foreground/80" fontSize="14" fontWeight="600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {value}
        </motion.text>
      </svg>
      <span className="text-[10px] text-muted-foreground/60 mt-1">{label}</span>
    </div>
  );
}

export function AnalyticsShowcase() {
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
            Analytics
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Every dimension of<br />
            <span className="text-[#06E0FF]">your performance.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
              Score Dashboard
            </span>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {scores.map((s) => (
                <RadialScore key={s.label} {...s} />
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {scores.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground/60">{s.label}</span>
                  </div>
                  <span className="text-foreground/70">{s.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
              Trade Distribution
            </span>
            <div className="mt-6 space-y-3">
              {[
                { label: "Forex", value: 42, color: "#00D4AA" },
                { label: "Indices", value: 28, color: "#06E0FF" },
                { label: "Crypto", value: 18, color: "#8b5cf6" },
                { label: "Commodities", value: 12, color: "#f59e0b" },
              ].map((a, i) => (
                <div key={a.label} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground/60">{a.label}</span>
                    <span className="text-foreground/70">{a.value}%</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${a.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-1.5 rounded-full"
                    style={{ background: a.color, opacity: 0.6 }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.04]">
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                Filters
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["All Assets", "Forex", "Indices", "Crypto", "1W", "1M", "3M", "YTD"].map((f) => (
                  <span
                    key={f}
                    className={`text-[10px] px-2 py-1 rounded-md border transition-colors duration-200 cursor-default ${
                      f === "All Assets" || f === "1M"
                        ? "border-[#00D4AA]/20 text-[#00D4AA]/70 bg-[#00D4AA]/[0.04]"
                        : "border-white/[0.06] text-muted-foreground/40 hover:text-foreground/60"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
