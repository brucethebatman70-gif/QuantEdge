"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const modules = [
  { id: "ai", label: "AI Engine", color: "#8b5cf6", x: 50, y: 15, desc: "Intelligence layer that analyzes every trade" },
  { id: "journal", label: "Journal", color: "#00D4AA", x: 20, y: 38, desc: "Structured trade stories with full context" },
  { id: "analytics", label: "Analytics", color: "#06E0FF", x: 80, y: 38, desc: "Performance metrics and visual insights" },
  { id: "risk", label: "Risk", color: "#f59e0b", x: 10, y: 62, desc: "Position sizing and drawdown management" },
  { id: "psychology", label: "Psychology", color: "#ec4899", x: 90, y: 62, desc: "Emotion tracking and behavioral coaching" },
  { id: "reports", label: "Reports", color: "#3b82f6", x: 35, y: 85, desc: "Automated summaries and compliance" },
  { id: "growth", label: "Growth", color: "#10b981", x: 65, y: 85, desc: "Goal tracking and skill development" },
];

const connections = [
  ["ai", "journal"], ["ai", "analytics"], ["ai", "psychology"],
  ["journal", "analytics"], ["journal", "risk"], ["journal", "psychology"],
  ["analytics", "reports"], ["analytics", "growth"],
  ["risk", "reports"], ["psychology", "growth"],
  ["reports", "growth"], ["ai", "reports"], ["ai", "risk"],
];

export function EcosystemSection() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const activeModuleData = modules.find((m) => m.id === activeModule);

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
            Ecosystem
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            One intelligent<br />
            <span className="text-[#00D4AA]">connected system.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
        >
          <svg viewBox="0 0 100 100" className="w-full h-auto max-w-lg mx-auto" preserveAspectRatio="xMidYMid meet">
            {connections.map(([from, to]) => {
              const f = modules.find((m) => m.id === from);
              const t = modules.find((m) => m.id === to);
              if (!f || !t) return null;
              const isActive = activeModule === from || activeModule === to;
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                  stroke={isActive ? "#00D4AA" : "currentColor"}
                  strokeWidth={isActive ? 0.8 : 0.3}
                  opacity={isActive ? 0.4 : 0.08}
                  className="transition-all duration-500"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}

            {modules.map((mod) => {
              const isActive = activeModule === mod.id;
              return (
                <motion.g
                  key={mod.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  onMouseEnter={() => setActiveModule(mod.id)}
                  onMouseLeave={() => setActiveModule(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={mod.x} cy={mod.y} r={isActive ? 6 : 4.5}
                    fill={isActive ? mod.color : "currentColor"}
                    opacity={isActive ? 0.9 : 0.15}
                    className="transition-all duration-300"
                  />
                  {isActive && (
                    <circle
                      cx={mod.x} cy={mod.y} r={10}
                      fill="none" stroke={mod.color}
                      strokeWidth={0.5} opacity={0.3}
                    />
                  )}
                  <text
                    x={mod.x} y={mod.y + (mod.y < 50 ? -7 : 11)}
                    textAnchor="middle" fill="currentColor"
                    fontSize="3.5" fontWeight={isActive ? "600" : "400"}
                    opacity={isActive ? 0.8 : 0.3}
                    className="transition-all duration-300"
                  >
                    {mod.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>

          {activeModuleData && (
            <motion.div
              key={activeModuleData.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: activeModuleData.color }} />
                <span className="text-[13px] font-medium text-foreground/80">{activeModuleData.label}</span>
              </div>
              <p className="text-[12px] text-muted-foreground/60 mt-1">{activeModuleData.desc}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
