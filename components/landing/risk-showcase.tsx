"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const riskMetrics = [
  { label: "Current Exposure", value: "14.2%", color: "#00D4AA" },
  { label: "Daily Risk Used", value: "62%", color: "#3b82f6" },
  { label: "Max Drawdown", value: "8.4%", color: "#f59e0b" },
  { label: "Open Positions", value: "3", color: "#8b5cf6" },
];

export function RiskShowcase() {
  const [riskAmount, setRiskAmount] = useState(2);
  const [positionSize, setPositionSize] = useState(1);

  const projectedDrawdown = (riskAmount * 1.5 + positionSize * 0.8).toFixed(1);
  const probabilityImprovement = Math.min(95, 55 + riskAmount * 5 + positionSize * 8);

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
            Risk Management
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Know your<br />
            <span className="text-[#f59e0b]">risk before you trade.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                Risk Overview
              </span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {riskMetrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
                    <span className="text-[10px] text-muted-foreground/50">{m.label}</span>
                    <div className="text-lg font-semibold mt-1" style={{ color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                Scenario Simulator
              </span>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-muted-foreground/60">Risk per Trade</span>
                    <span className="text-foreground/70">{riskAmount}.0%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={riskAmount}
                    onChange={(e) => setRiskAmount(Number(e.target.value))}
                    className="w-full h-1 rounded-full appearance-none bg-white/[0.06] cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#f59e0b]
                      [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-muted-foreground/60">Position Size</span>
                    <span className="text-foreground/70">{positionSize}.0x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={positionSize}
                    onChange={(e) => setPositionSize(Number(e.target.value))}
                    className="w-full h-1 rounded-full appearance-none bg-white/[0.06] cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#3b82f6]
                      [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 space-y-3"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5 flex flex-col justify-center min-h-[280px]">
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                Projected Impact
              </span>
              <motion.div
                key={`${riskAmount}-${positionSize}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-center"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-semibold text-[#f59e0b]">
                    {projectedDrawdown}%
                  </span>
                  <span className="text-[13px] text-muted-foreground/50">drawdown</span>
                </div>
                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span className="text-[clamp(2rem,3vw,2.5rem)] font-semibold text-[#00D4AA]">
                    {probabilityImprovement}%
                  </span>
                  <span className="text-[13px] text-muted-foreground/50">success probability</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
