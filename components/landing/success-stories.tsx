"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const stories = [
  {
    id: "prop",
    style: "Prop Firm Trader",
    level: "3 years experience",
    challenge: "Struggled with consistency across multiple prop firm accounts. Kept repeating the same mistakes.",
    help: "QuantEdge's AI review identified pattern of over-leveraging after losses. Structured journaling exposed emotional triggers.",
    metrics: [
      { label: "Win Rate", before: "48%", after: "67%", color: "#00D4AA" },
      { label: "Consistency", before: "52%", after: "81%", color: "#06E0FF" },
      { label: "Drawdown", before: "18%", after: "7%", color: "#f59e0b", inverse: true },
    ],
    quote: "I finally understand why I was losing. The AI saw what I couldn't.",
  },
  {
    id: "swing",
    style: "Swing Trader",
    level: "5 years experience",
    challenge: "Managed detailed spreadsheets but had no system for reviewing psychology or decision quality.",
    help: "QuantEdge connected journal entries to emotional states. Discovered that Tuesday trades had 30% lower discipline scores.",
    metrics: [
      { label: "R:R Ratio", before: "1.2:1", after: "2.4:1", color: "#8b5cf6" },
      { label: "Discipline", before: "58%", after: "84%", color: "#3b82f6" },
      { label: "Avg Weekly", before: "+$420", after: "+$1,280", color: "#00D4AA" },
    ],
    quote: "The psychology tracking changed everything. I didn't know my emotions had patterns.",
  },
  {
    id: "coach",
    style: "Trading Coach",
    level: "10+ years experience",
    challenge: "Needed a way to review student trades at scale and track their progression over time.",
    help: "Team dashboard with coach access. Tracked 12 students simultaneously, identifying common weak points across the group.",
    metrics: [
      { label: "Students", before: "8", after: "24", color: "#00D4AA" },
      { label: "Review Time", before: "45min", after: "12min", color: "#06E0FF", inverse: true },
      { label: "Pass Rate", before: "61%", after: "83%", color: "#8b5cf6" },
    ],
    quote: "QuantEdge turned my coaching practice from 1:1 to scalable group training.",
  },
];

export function SuccessStories() {
  const [activeStory, setActiveStory] = useState(stories[0].id);

  const story = stories.find((s) => s.id === activeStory) || stories[0];

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
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50 mb-4">
            <span>{story.style}</span>
            <span className="text-muted-foreground/20">·</span>
            <span>{story.level}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">Challenge</span>
                <p className="text-[13px] text-foreground/70 mt-1 leading-relaxed">{story.challenge}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">Solution</span>
                <p className="text-[13px] text-foreground/70 mt-1 leading-relaxed">{story.help}</p>
              </div>
              <div className="rounded-lg border border-white/[0.04] bg-white/[0.015] p-3">
                <span className="text-[12px] text-foreground/80 italic">&ldquo;{story.quote}&rdquo;</span>
              </div>
            </div>

            <div className="space-y-3">
              {story.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground/60">{m.label}</span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-muted-foreground/40">{m.before}</span>
                      <span className="text-foreground/30">→</span>
                      <span className="font-medium" style={{ color: m.color }}>{m.after}</span>
                    </div>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-white/[0.04]" />
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.inverse ? 100 - parseInt(m.after) : parseInt(m.after)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full opacity-30"
                      style={{ background: m.color }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.inverse ? 100 - parseInt(m.before) : parseInt(m.before)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                      className="absolute inset-0 h-full rounded-full opacity-60"
                      style={{ background: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
