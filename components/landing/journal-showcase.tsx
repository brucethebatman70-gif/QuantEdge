"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const timelineStages = [
  { id: "prep", label: "Preparation", desc: "Market scan, news review, pre-trade checklist", icon: "01" },
  { id: "idea", label: "Trade Idea", desc: "Setup identification, confluence, thesis", icon: "02" },
  { id: "entry", label: "Entry", desc: "Execution, position size, timing", icon: "03" },
  { id: "manage", label: "Management", desc: "SL/TP adjustments, scaling, monitoring", icon: "04" },
  { id: "exit", label: "Exit", desc: "Close, partials, exit rationale", icon: "05" },
  { id: "reflect", label: "Reflection", desc: "Emotion check, rule adherence, notes", icon: "06" },
  { id: "ai", label: "AI Review", desc: "Automated grade, pattern detection, coaching", icon: "07" },
  { id: "lessons", label: "Lessons", desc: "Key takeaway, improvement, next objective", icon: "08" },
];

const emotionData = [
  { label: "Anxiety", before: 65, after: 30, color: "#f59e0b" },
  { label: "Confidence", before: 40, after: 82, color: "#00D4AA" },
  { label: "Discipline", before: 50, after: 75, color: "#8b5cf6" },
  { label: "Focus", before: 55, after: 88, color: "#3b82f6" },
];

export function JournalShowcase() {
  const [activeStage, setActiveStage] = useState(2);

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
            Trading Journal
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Every trade becomes<br />
            <span className="text-[#00D4AA]">a complete story.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative pl-6">
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-[#00D4AA]/30 via-white/[0.06] to-transparent" />
              {timelineStages.map((stage, i) => (
                <motion.button
                  key={stage.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => setActiveStage(i)}
                  className={`relative w-full text-left py-2.5 pl-4 transition-all duration-300 ${
                    activeStage === i ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className={`absolute left-[-15px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border transition-all duration-500 ${
                    activeStage === i
                      ? "bg-[#00D4AA] border-[#00D4AA] shadow-[0_0_8px_rgba(0,212,170,0.3)]"
                      : "bg-transparent border-white/[0.15]"
                  }`} />
                  <span className="text-[11px] font-medium">{stage.label}</span>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5 leading-relaxed">{stage.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5">
              <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-white/[0.04]">
                <div className="w-2 h-2 rounded-full bg-white/[0.12]" />
                <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                <span className="text-[9px] font-mono text-muted-foreground/30 ml-2">
                  {timelineStages[activeStage]?.label || "Journal"}
                </span>
              </div>

              <div className="space-y-0">
                {activeStage === 0 && (
                  <div className="space-y-2.5 p-1">
                    {["Market structure analysis completed", "Economic calendar checked", "Key levels identified", "Risk parameters set", "Pre-trade checklist signed"].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-2.5 text-[13px] text-foreground/70"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#00D4AA]/50" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeStage === 6 && (
                  <div className="space-y-3 p-1">
                    <div className="rounded-lg border border-[#8b5cf6]/10 bg-[#8b5cf6]/[0.03] p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-medium text-[#8b5cf6]">Trade Grade</span>
                        <span className="text-sm font-semibold text-[#8b5cf6]">B+</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {[{ l: "Execution", v: "A" }, { l: "Timing", v: "A-" }, { l: "Discipline", v: "B" }, { l: "Risk", v: "B+" }].map((s) => (
                          <div key={s.l} className="flex justify-between text-[11px] text-muted-foreground/60">
                            <span>{s.l}</span>
                            <span className="text-foreground/70 font-medium">{s.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[12px] text-muted-foreground/60 leading-relaxed p-1">
                      Pattern detected: Consistent improvement in entry timing. Consider reducing position size during high-impact news.
                    </p>
                  </div>
                )}

                {activeStage === 7 && (
                  <div className="space-y-2.5 p-1">
                    {[
                      { l: "Key Lesson", v: "Patience at resistance levels improves R:R ratio by 40%" },
                      { l: "Improvement", v: "Add post-entry breathing pause of 30 seconds" },
                      { l: "Next Objective", v: "Maintain 2:1 R:R minimum for 10 consecutive trades" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-lg border border-white/[0.04] bg-white/[0.015] p-2.5"
                      >
                        <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-muted-foreground/40">{item.l}</span>
                        <p className="text-[12px] text-foreground/70 mt-0.5">{item.v}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {![0, 6, 7].includes(activeStage) && (
                  <div className="flex items-center justify-center h-40 text-[13px] text-muted-foreground/30">
                    <span className="text-center">
                      {timelineStages[activeStage]?.label}<br />
                      <span className="text-[11px]">{timelineStages[activeStage]?.desc}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                  Emotion Delta
                </span>
                <div className="mt-2 space-y-2">
                  {emotionData.slice(0, 2).map((e) => (
                    <div key={e.label} className="space-y-0.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground/60">{e.label}</span>
                        <span className="text-foreground/60">{e.before}% → {e.after}%</span>
                      </div>
                      <div className="flex gap-0.5 h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${e.before}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="rounded-l-full"
                          style={{ background: e.color, opacity: 0.3 }}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${e.after}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="rounded-r-full"
                          style={{ background: e.color, opacity: 0.7 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                  Replay Preview
                </span>
                <div className="mt-3 flex items-center gap-2">
                  {["⏮", "▶", "⏭"].map((icon, i) => (
                    <span key={i} className="w-6 h-6 flex items-center justify-center rounded-md border border-white/[0.06] text-[10px] text-muted-foreground/50 cursor-default" />
                  ))}
                </div>
                <div className="mt-2 h-px bg-gradient-to-r from-[#00D4AA]/30 via-white/[0.06] to-transparent rounded-full relative">
                  <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00D4AA]/50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
