"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const stories = [
  {
    id: "prop",
    style: "Prop Firm Trader",
    level: "3 years experience",
    challenge: "Struggled with consistency across multiple prop firm accounts. Kept repeating the same mistakes despite knowing the theory.",
    help: "QuantEdge's AI review identified a pattern of over-leveraging after losses. Structured journaling exposed emotional triggers tied to specific market conditions. The psychology engine helped build a pre-trade routine that reduced impulsive entries.",
    progression: [
      { label: "Month 1-2", desc: "Awareness — identified patterns" },
      { label: "Month 3-4", desc: "Application — built new routines" },
      { label: "Month 5-6", desc: "Mastery — consistent execution" },
    ],
    metrics: [
      { label: "Win Rate", before: 48, after: 67, color: "#00D4AA" },
      { label: "Consistency", before: 52, after: 81, color: "#06E0FF" },
      { label: "Max Drawdown", before: 18, after: 7, color: "#f59e0b" },
    ],
    riskImprovement: [
      { label: "Avg Risk/Trade", before: "2.8%", after: "1.2%" },
      { label: "Emotional Trades", before: "34%", after: "11%" },
    ],
    calendarData: [3, 1, 4, 2, 0, 3, 2, 4, 1, 0, 2, 3, 4, 1, 0, 2, 3, 1, 4, 0, 2, 3, 1, 4, 0, 2, 3, 1, 4, 0],
    quote: "I finally understand why I was losing. The AI saw what I couldn't.",
  },
  {
    id: "swing",
    style: "Swing Trader",
    level: "5 years experience",
    challenge: "Managed detailed spreadsheets but had no system for reviewing psychology or decision quality. Spent hours on admin instead of analysis.",
    help: "QuantEdge connected journal entries to emotional states. Discovered Tuesday trades had 30% lower discipline scores. Automated journaling eliminated spreadsheet work. AI summaries turned hours of review into minutes.",
    progression: [
      { label: "Month 1-2", desc: "Data collection & baseline" },
      { label: "Month 3-4", desc: "Pattern recognition began" },
      { label: "Month 5-6", desc: "Systematic improvement" },
    ],
    metrics: [
      { label: "R:R Ratio", before: 1.2, after: 2.4, color: "#8b5cf6" },
      { label: "Discipline Score", before: 58, after: 84, color: "#3b82f6" },
      { label: "Avg Weekly P&L", before: 420, after: 1280, color: "#00D4AA" },
    ],
    riskImprovement: [
      { label: "Review Time/Day", before: "45min", after: "8min" },
      { label: "Plan vs Impulse", before: "40:60", after: "78:22" },
    ],
    calendarData: [2, 3, 1, 4, 0, 2, 3, 1, 4, 0, 3, 2, 1, 4, 0, 2, 3, 4, 1, 3, 0, 2, 1, 4, 3, 0, 2, 1, 4, 0],
    quote: "The psychology tracking changed everything. I didn't know my emotions had patterns.",
  },
  {
    id: "coach",
    style: "Trading Coach",
    level: "10+ years experience",
    challenge: "Needed a way to review student trades at scale and track their progression over time. Manual review didn't scale beyond a handful of students.",
    help: "Team dashboard with coach access. Tracked 12 students simultaneously, identifying common weak points across the group. Automated grading freed up hours. Shared journals enabled group learning sessions.",
    progression: [
      { label: "Month 1", desc: "Setup & student onboarding" },
      { label: "Month 2-3", desc: "Scaled from 8 to 24 students" },
      { label: "Month 4-6", desc: "Improved pass rate through data" },
    ],
    metrics: [
      { label: "Students Coached", before: 8, after: 24, color: "#00D4AA" },
      { label: "Review Time/Student", before: 45, after: 12, color: "#06E0FF" },
      { label: "Pass Rate", before: 61, after: 83, color: "#8b5cf6" },
    ],
    riskImprovement: [
      { label: "Avg Session Length", before: "90min", after: "35min" },
      { label: "Student Retention", before: "62%", after: "89%" },
    ],
    calendarData: [4, 2, 3, 1, 0, 4, 2, 3, 1, 0, 4, 3, 2, 1, 0, 4, 2, 3, 1, 4, 0, 2, 3, 1, 4, 0, 2, 3, 1, 0],
    quote: "QuantEdge turned my coaching practice from 1:1 to scalable group training.",
  },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const w = 120;
  const h = 28;
  const max = Math.max(...data, 1);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={0.8}
        opacity={0.4}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function CalendarHeatmap({ data }: { data: number[] }) {
  const days = 30;
  return (
    <div className="grid grid-cols-10 gap-[2px]">
      {Array.from({ length: days }).map((_, i) => {
        const val = data[i] ?? 0;
        const intensity = val === 0 ? "bg-white/[0.02]" :
          val <= 1 ? "bg-[#00D4AA]/20" :
          val <= 2 ? "bg-[#00D4AA]/40" :
          val <= 3 ? "bg-[#00D4AA]/60" : "bg-[#00D4AA]/80";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.008 }}
            className={`w-full aspect-square rounded-sm ${intensity}`}
          />
        );
      })}
    </div>
  );
}

export function SuccessStories() {
  const [activeStory, setActiveStory] = useState(stories[0].id);
  const story = stories.find((s) => s.id === activeStory) || stories[0];

  return (
    <section className="relative px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Success Stories
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Real traders.<br />
            <span className="text-[#00D4AA]">Real transformation.</span>
          </h2>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10">
          {stories.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStory(s.id)}
              className={`px-4 py-2 rounded-full text-[11px] font-medium transition-all duration-300 ${
                activeStory === s.id
                  ? "bg-white/[0.06] text-foreground border border-white/[0.1]"
                  : "text-muted-foreground/50 hover:text-muted-foreground/80 border border-transparent"
              }`}
            >
              {s.style}
            </button>
          ))}
        </div>

        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
        >
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50 mb-6">
            <span>{story.style}</span>
            <span className="text-muted-foreground/20">·</span>
            <span>{story.level}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                  Challenge
                </span>
                <p className="text-[13px] text-foreground/70 mt-1 leading-relaxed">{story.challenge}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                  How QuantEdge Helped
                </span>
                <p className="text-[13px] text-foreground/70 mt-1 leading-relaxed">{story.help}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                  Learning Progression
                </span>
                <div className="mt-2 space-y-2">
                  {story.progression.map((p, i) => (
                    <motion.div
                      key={p.label}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#00D4AA]/60" />
                        {i < story.progression.length - 1 && (
                          <div className="absolute top-2 w-[1px] h-4 bg-white/[0.06]" />
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-foreground/70">{p.label}</span>
                        <span className="text-[10px] text-muted-foreground/50 ml-2">— {p.desc}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.04] bg-white/[0.015] p-3">
                <span className="text-[12px] text-foreground/80 italic">&ldquo;{story.quote}&rdquo;</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40 mb-2 block">
                  Before vs After
                </span>
                <div className="space-y-2.5">
                  {story.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-muted-foreground/60">{m.label}</span>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-muted-foreground/40">{m.before}{m.label === "R:R Ratio" ? ":1" : m.label.includes("P&L") ? "" : "%"}</span>
                          <span className="text-foreground/30">→</span>
                          <span className="font-medium" style={{ color: m.color }}>
                            {m.after}{m.label === "R:R Ratio" ? ":1" : m.label.includes("P&L") ? "" : "%"}
                          </span>
                        </div>
                      </div>
                      <div className="relative h-2 rounded-full bg-white/[0.04] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(m.after, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full opacity-40"
                          style={{ background: m.color }}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(m.before, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                          className="absolute inset-0 h-full rounded-full opacity-20"
                          style={{ background: m.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {story.riskImprovement.map((r) => (
                  <div
                    key={r.label}
                    className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-2.5"
                  >
                    <span className="text-[9px] text-muted-foreground/50 block">{r.label}</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[11px] text-muted-foreground/40">{r.before}</span>
                      <span className="text-[10px] text-foreground/30">→</span>
                      <span className="text-[11px] font-medium text-[#00D4AA]">{r.after}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40 mb-2 block">
                  Monthly Consistency
                </span>
                <CalendarHeatmap data={story.calendarData} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
