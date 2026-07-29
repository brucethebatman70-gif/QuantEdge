"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0 }: { value: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1200;
          const target = value;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const display = decimals > 0 ? (count / Math.pow(10, decimals)).toFixed(decimals) : count.toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

function EquityCurve() {
  const points = [
    100, 102, 101, 104, 103, 107, 110, 108, 112, 115, 113, 118, 122, 120, 125, 128, 126, 130, 134, 132,
    136, 140, 138, 142, 145, 143, 148, 146, 150, 154, 152, 156, 160, 158, 162, 166, 164, 168, 172, 170,
    175, 178, 176, 180, 184, 182, 186, 190, 188, 192, 196, 194, 198, 202, 200, 205, 208, 206, 210, 214,
    212, 216, 220, 218, 222, 226, 224, 228, 232, 230, 235, 238, 236, 240, 244, 242, 246, 250, 248, 252
  ];
  const w = 400;
  const h = 160;
  const stepX = w / (points.length - 1);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - ((p - min) / range) * (h - 20) - 10}`)
    .join(" ");

  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="curve-area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d={areaD} fill="url(#curve-area-grad)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d={pathD} fill="none" stroke="#00D4AA" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
      {[20, 60, 100, 140].map((x) => (
        <line key={x} x1={x} y1={0} x2={x} y2={h}
          stroke="currentColor" strokeWidth={0.3} opacity={0.06} />
      ))}
      {[20, 60, 100, 140].map((y) => (
        <line key={y} x1={0} y1={y} x2={w} y2={y}
          stroke="currentColor" strokeWidth={0.3} opacity={0.06} />
      ))}
    </svg>
  );
}

function CalendarHeatmap() {
  const days = 35;
  return (
    <div className="grid grid-cols-7 gap-[3px]">
      {Array.from({ length: days }).map((_, i) => {
        const val = Math.random();
        const intensity = val > 0.7 ? "bg-[#00D4AA]" : val > 0.4 ? "bg-[#00D4AA]/50" : val > 0.15 ? "bg-white/[0.06]" : "bg-white/[0.02]";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.015 }}
            className={`w-2.5 h-2.5 rounded-[2px] ${intensity}`}
          />
        );
      })}
    </div>
  );
}

const stats = [
  { label: "Win Rate", value: 67, suffix: "%", color: "text-[#00D4AA]" },
  { label: "Total P&L", value: 12847, prefix: "+$", color: "text-[#00D4AA]" },
  { label: "Sharpe Ratio", value: 184, suffix: "", color: "text-[#06E0FF]", decimals: 2 },
  { label: "Consistency", value: 78, suffix: "%", color: "text-[#8b5cf6]" },
];

const activityItems = [
  { id: 1, text: "Journaled EUR/USD trade", time: "2m ago", type: "journal" },
  { id: 2, text: "AI reviewed BTC/USD entry", time: "15m ago", type: "ai" },
  { id: 3, text: "New personal best streak", time: "1h ago", type: "achievement" },
  { id: 4, text: "Risk alert: position size exceeded", time: "3h ago", type: "alert" },
  { id: 5, text: "Weekly report generated", time: "5h ago", type: "report" },
];

const typeStyles: Record<string, string> = {
  journal: "bg-[#00D4AA]/10 text-[#00D4AA]",
  ai: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  achievement: "bg-[#f59e0b]/10 text-[#f59e0b]",
  alert: "bg-[#ef4444]/10 text-[#ef4444]",
  report: "bg-[#3b82f6]/10 text-[#3b82f6]",
};

export function DashboardShowcase() {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const insights: Record<string, string> = {
    "Win Rate": "67% win rate across 142 trades. Above average for this strategy.",
    "Total P&L": "+$12,847 total profit. Consistent growth over 8 weeks.",
    "Sharpe Ratio": "1.84 Sharpe indicates strong risk-adjusted returns.",
    "Consistency": "78% consistency score. Improving 3% week over week.",
  };

  return (
    <section className="relative px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Your command center
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Everything you need to<br />
            <span className="text-[#00D4AA]">improve every trade.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6"
        >
          <div className="flex items-center gap-1.5 mb-4 pb-4 border-b border-white/[0.04]">
            <div className="w-2 h-2 rounded-full bg-white/[0.12]" />
            <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
            <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
            <span className="text-[9px] font-mono text-muted-foreground/30 ml-2">Dashboard</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="relative rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03] cursor-default"
                    onMouseEnter={() => setHoveredMetric(stat.label)}
                    onMouseLeave={() => setHoveredMetric(null)}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/50">
                      {stat.label}
                    </span>
                    <div className={`text-lg font-semibold mt-1 ${stat.color}`}>
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix || ""}
                        suffix={stat.suffix || ""}
                        decimals={(stat as any).decimals || 0}
                      />
                    </div>
                    {hoveredMetric === stat.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute -bottom-12 left-0 right-0 z-10 rounded-lg border border-white/[0.06] bg-[#0C0C0F]/95 backdrop-blur-sm px-2.5 py-1.5 shadow-xl"
                      >
                        <span className="text-[10px] text-muted-foreground leading-snug">
                          {insights[stat.label]}
                        </span>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 md:p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                    Equity Curve
                  </span>
                  <span className="text-[10px] font-mono text-[#00D4AA]/60">+8.2% MTD</span>
                </div>
                <div className="h-[140px] md:h-[160px]">
                  <EquityCurve />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                  Activity
                </span>
                <div className="mt-3 space-y-2">
                  {activityItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-2 py-1.5"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${typeStyles[item.type]?.split(" ")[0] || "bg-white/[0.1]"}`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] text-foreground/70 truncate block">{item.text}</span>
                      </div>
                      <span className="text-[9px] text-muted-foreground/40 shrink-0">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                    Trading Activity
                  </span>
                  <span className="text-[9px] text-muted-foreground/30">35 days</span>
                </div>
                <CalendarHeatmap />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
