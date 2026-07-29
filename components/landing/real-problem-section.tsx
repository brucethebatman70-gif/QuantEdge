"use client";

import { motion } from "framer-motion";

function ScatteredNotes() {
  const notes = [
    { x: 10, y: 20, w: 40, h: 30, angle: -8 },
    { x: 35, y: 15, w: 35, h: 28, angle: 12 },
    { x: 50, y: 30, w: 38, h: 32, angle: -5 },
    { x: 20, y: 45, w: 42, h: 25, angle: 15 },
    { x: 55, y: 50, w: 36, h: 28, angle: -10 },
  ];
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {notes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 1, rotate: n.angle }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <rect
            x={n.x} y={n.y} width={n.w} height={n.h} rx={3}
            fill="none" stroke="currentColor" strokeWidth={0.4}
            className="text-border"
            opacity={0.6 - i * 0.08}
          />
          <line x1={n.x + 6} y1={n.y + 8} x2={n.x + n.w - 6} y2={n.y + 8}
            stroke="currentColor" strokeWidth={0.3} opacity={0.2} />
          <line x1={n.x + 6} y1={n.y + 14} x2={n.x + n.w - 10} y2={n.y + 14}
            stroke="currentColor" strokeWidth={0.3} opacity={0.15} />
          <line x1={n.x + 6} y1={n.y + 20} x2={n.x + n.w - 14} y2={n.y + 20}
            stroke="currentColor" strokeWidth={0.3} opacity={0.1} />
        </motion.g>
      ))}
    </svg>
  );
}

function EmotionCycle() {
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {[
        { label: "Euphoria", y: 8, color: "#00D4AA", delay: 0 },
        { label: "Anxiety", y: 22, color: "#f59e0b", delay: 0.3 },
        { label: "Fear", y: 38, color: "#ef4444", delay: 0.6 },
        { label: "Regret", y: 50, color: "#dc2626", delay: 0.9 },
        { label: "Hope", y: 35, color: "#f59e0b", delay: 1.2 },
        { label: "Greed", y: 18, color: "#00D4AA", delay: 1.5 },
      ].map((e, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: e.delay }}
        >
          <circle cx={20 + i * 15} cy={e.y} r={3} fill={e.color} opacity={0.4} />
          <text x={20 + i * 15} y={e.y + 8}
            textAnchor="middle" fill="currentColor"
            className="fill-muted-foreground"
            fontSize="3" opacity={0.5}>
            {e.label}
          </text>
        </motion.g>
      ))}
      <motion.path
        d="M20 8 C 28 8, 25 22, 35 22 C 45 22, 40 38, 50 38 C 60 38, 55 50, 65 50 C 75 50, 70 35, 80 35 C 90 35, 85 18, 95 18"
        fill="none" stroke="currentColor" strokeWidth={0.5}
        opacity={0.15}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      />
    </svg>
  );
}

function StructuredView() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <rect x="5" y="10" width="90" height="60" rx="6"
          fill="none" stroke="currentColor" strokeWidth={0.5}
          className="text-[#00D4AA]" opacity={0.2} />
        <rect x="10" y="18" width="18" height="44" rx="3"
          fill="none" stroke="currentColor" strokeWidth={0.4}
          className="text-[#00D4AA]" opacity={0.15} />
        <rect x="32" y="18" width="28" height="20" rx="3"
          fill="none" stroke="currentColor" strokeWidth={0.4}
          className="text-[#00D4AA]" opacity={0.12} />
        <rect x="64" y="18" width="26" height="20" rx="3"
          fill="none" stroke="currentColor" strokeWidth={0.4}
          className="text-[#00D4AA]" opacity={0.12} />
        <rect x="32" y="42" width="58" height="20" rx="3"
          fill="none" stroke="currentColor" strokeWidth={0.4}
          className="text-[#00D4AA]" opacity={0.12} />
        <motion.line x1="10" y1="26" x2="26" y2="26"
          stroke="currentColor" strokeWidth={0.3}
          className="text-[#00D4AA]" opacity={0.2}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }} />
        <motion.line x1="10" y1="32" x2="24" y2="32"
          stroke="currentColor" strokeWidth={0.3}
          className="text-[#00D4AA]" opacity={0.15}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }} />
        <motion.line x1="35" y1="26" x2="56" y2="26"
          stroke="currentColor" strokeWidth={0.3} opacity={0.15}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }} />
      </motion.g>
    </svg>
  );
}

const stages = [
  {
    id: "scattered",
    title: "Scattered across tools",
    description: "Notes in Telegram. Screenshots in Photos. Spreadsheets that never get updated. The average trader manages 7 platforms with zero integration.",
    visual: <ScatteredNotes />,
  },
  {
    id: "emotional",
    title: "Emotions control outcomes",
    description: "Euphoria after wins. Fear after losses. Hope, greed, regret — the emotional cycle repeats because there's no system to break it.",
    visual: <EmotionCycle />,
  },
  {
    id: "structured",
    title: "Every trade tells a story",
    description: "A structured journal captures preparation, execution, emotion, and reflection. Patterns become visible. Mistakes become lessons.",
    visual: <StructuredView />,
  },
];

export function RealProblemSection() {
  return (
    <section className="relative px-6 py-32">
      <div className="max-w-5xl mx-auto space-y-40">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16`}
          >
            <div className="flex-1 w-full max-w-md mx-auto md:mx-0">
              <div className="aspect-[5/4] rounded-2xl border border-white/[0.04] bg-white/[0.015] p-4 flex items-center justify-center">
                <div className="w-full h-full text-muted-foreground/40">
                  {stage.visual}
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left max-w-md">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-block text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50 mb-3"
              >
                {`0${i + 1}`}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.02em] mb-4"
              >
                {stage.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-[15px] leading-relaxed text-muted-foreground"
              >
                {stage.description}
              </motion.p>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#00D4AA]/30 to-transparent mx-auto mb-6" />
          <p className="text-[15px] text-muted-foreground">
            The difference between profitable and unprofitable is not strategy.<br />
            <span className="text-foreground font-medium">It&apos;s a system.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
