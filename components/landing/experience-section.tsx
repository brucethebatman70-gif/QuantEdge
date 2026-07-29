"use client";

import { motion } from "framer-motion";

function MiniEquityCurve() {
  const points = [40, 45, 38, 52, 48, 58, 55, 62, 60, 68, 65, 72, 78, 75, 82, 80, 88, 85, 92, 95];
  const maxH = 80;
  const w = 280;
  const h = 80;
  const stepX = w / (points.length - 1);
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - (p / 100) * h}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="curve-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L ${w} ${h} L 0 ${h} Z`} fill="url(#curve-grad)" />
      <path d={pathD} fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniEmotionBars() {
  const values = [
    { label: "Confidence", value: 85 },
    { label: "Discipline", value: 72 },
    { label: "Focus", value: 68 },
    { label: "Patience", value: 55 },
  ];
  return (
    <div className="space-y-2.5 p-4">
      {values.map((v) => (
        <div key={v.label} className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">{v.label}</span>
            <span className="text-foreground/80">{v.value}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${v.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-[#00D4AA] to-[#06E0FF]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniTimeline() {
  const entries = [
    { pair: "EUR/USD", result: "+$342", type: "profit" },
    { pair: "BTC/USD", result: "-$127", type: "loss" },
    { pair: "AAPL", result: "+$89", type: "profit" },
  ];
  return (
    <div className="space-y-0 p-4">
      {entries.map((e, i) => (
        <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${e.type === "profit" ? "bg-[#00D4AA]" : "bg-[#ef4444]"}`} />
            <span className="text-xs font-medium text-foreground/80">{e.pair}</span>
          </div>
          <span className={`text-xs font-mono ${e.type === "profit" ? "text-[#00D4AA]" : "text-[#ef4444]"}`}>
            {e.result}
          </span>
        </div>
      ))}
    </div>
  );
}

const windows = [
  {
    id: "analytics",
    label: "Performance Analytics",
    desc: "Equity curves, drawdown analysis, and risk metrics in real time.",
    content: <MiniEquityCurve />,
    className: "md:col-span-2 md:row-span-1"
  },
  {
    id: "psychology",
    label: "Emotion Analytics",
    desc: "Track your psychological state across every trade.",
    content: <MiniEmotionBars />,
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: "journal",
    label: "Trade Journal",
    desc: "Structured trade stories with AI-powered review and grading.",
    content: <MiniTimeline />,
    className: "md:col-span-1 md:row-span-1"
  }
];

export function ExperienceSection() {
  return (
    <section className="relative px-6 py-48">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            See it in action
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          {windows.map((win, index) => (
            <motion.div
              key={win.id}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
              className={`relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden group ${win.className}`}
            >
              <div className="absolute top-0 left-0 right-0 h-8 bg-white/[0.03] border-b border-white/[0.04] flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/[0.12]" />
                <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                <span className="text-[9px] font-mono text-muted-foreground/40 ml-2">{win.label}</span>
              </div>
              <div className="pt-8 h-full">
                {win.content}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0C0C0F] via-[#0C0C0F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[11px] text-muted-foreground">{win.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
