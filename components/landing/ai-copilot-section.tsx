"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "ai";
  content: string;
  delay: number;
};

const analysisSteps: Message[] = [
  { role: "user", content: "Analyze my EUR/USD trade from this morning.", delay: 0 },
  { role: "ai", content: "Analyzing your trade...", delay: 600 },
  { role: "ai", content: "Market Structure: Bearish order flow on H1. Price rejected from key resistance at 1.0940.", delay: 2000 },
  { role: "ai", content: "Execution: Entry at 1.0928 was well-timed. R:R ratio of 1:2.8 meets your criteria.", delay: 3400 },
  { role: "ai", content: "Emotion: Elevated heart rate detected before entry. Consider pre-trade breathing exercise.", delay: 4800 },
  { role: "ai", content: "Grade: B+ (Execution: A, Discipline: B, Timing: A, Risk: B+)", delay: 6200 },
];

function TypingText({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span>{displayed}</span>;
}

function ConfidenceBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-muted-foreground/60">{label}</span>
        <span className="text-foreground/70">{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

const aiMessages = [
  {
    icon: "brain",
    title: "Trade Analysis",
    desc: "Automatic detection of market structure, liquidity zones, and execution quality from your screenshots.",
  },
  {
    icon: "target",
    title: "Risk Coaching",
    desc: "Position sizing recommendations, drawdown limits, and risk score with actionable adjustments.",
  },
  {
    icon: "heart",
    title: "Psychology Tracking",
    desc: "Emotion patterns across your trading history. Identify triggers that lead to mistakes.",
  },
  {
    icon: "trending",
    title: "Performance Review",
    desc: "Weekly summaries with strengths, weaknesses, and personalized improvement plan.",
  },
];

export function AICopilotSection() {
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [stepComplete, setStepComplete] = useState(false);

  useEffect(() => {
    if (visibleMessages < analysisSteps.length && stepComplete) {
      const timer = setTimeout(() => {
        setVisibleMessages((p) => p + 1);
        setStepComplete(false);
      }, analysisSteps[visibleMessages]?.delay || 500);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, stepComplete]);

  return (
    <section className="relative px-6 py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Intelligence
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            An AI partner that<br />
            <span className="text-[#8b5cf6]">knows your trading.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 relative"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.04]">
                <div className="w-2 h-2 rounded-full bg-white/[0.12]" />
                <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                <span className="text-[9px] font-mono text-muted-foreground/30 ml-2">AI Analysis</span>
              </div>

              <div className="p-4 space-y-3 min-h-[280px]">
                {analysisSteps.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#00D4AA]/10 text-foreground/90 border border-[#00D4AA]/10"
                          : "bg-[#8b5cf6]/[0.06] text-foreground/80 border border-[#8b5cf6]/[0.06]"
                      }`}
                    >
                      {msg.role === "ai" || i > 0 ? (
                        i === visibleMessages - 1 && !stepComplete ? (
                          <TypingText text={msg.content} speed={20} onComplete={() => setStepComplete(true)} />
                        ) : (
                          msg.content
                        )
                      ) : (
                        msg.content
                      )}
                    </div>
                  </motion.div>
                ))}
                {visibleMessages < analysisSteps.length && (
                  <div className="flex items-center gap-1.5 text-muted-foreground/30 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-breathe" />
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-breathe" style={{ animationDelay: "0.3s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-breathe" style={{ animationDelay: "0.6s" }} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-2 space-y-3"
          >
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                Confidence Scores
              </span>
              <div className="mt-3 space-y-2.5">
                <ConfidenceBar label="Analysis" value={94} color="#8b5cf6" />
                <ConfidenceBar label="Execution" value={87} color="#00D4AA" />
                <ConfidenceBar label="Risk Assessment" value={82} color="#06E0FF" />
                <ConfidenceBar label="Psychology" value={71} color="#f59e0b" />
              </div>
            </div>

            {aiMessages.slice(0, 2).map((msg) => (
              <motion.div
                key={msg.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 transition-all duration-300 hover:border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/[0.02] cursor-default"
              >
                <span className="text-[12px] font-medium text-foreground/80">{msg.title}</span>
                <p className="text-[11px] text-muted-foreground/60 mt-1 leading-relaxed">
                  {msg.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {aiMessages.slice(2).map((msg) => (
            <motion.div
              key={msg.title}
              whileHover={{ y: -2 }}
              className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3.5 transition-all duration-300 hover:border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/[0.02] cursor-default"
            >
              <span className="text-[12px] font-medium text-foreground/80">{msg.title}</span>
              <p className="text-[11px] text-muted-foreground/60 mt-1 leading-relaxed">{msg.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
