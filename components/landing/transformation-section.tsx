"use client";

import { motion } from "framer-motion";

const transformations = [
  { from: "Scattered tools", to: "Unified system" },
  { from: "Emotional decisions", to: "Empirical process" },
  { from: "Inconsistent results", to: "Intentional growth" }
];

export function TransformationSection() {
  return (
    <section className="relative px-6 py-48">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            The QuantEdge difference
          </span>
        </motion.div>

        <div className="space-y-20">
          {transformations.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex items-center justify-center gap-6 md:gap-16">
                <div className="text-right flex-1">
                  <span className="text-[clamp(1.25rem,3vw,2rem)] text-muted-foreground/60 font-light">
                    {t.from}
                  </span>
                </div>

                <div className="relative flex items-center justify-center">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-white/[0.08] to-[#00D4AA]/40"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 }}
                    className="absolute w-2 h-2 rounded-full bg-[#00D4AA]"
                  />
                </div>

                <div className="text-left flex-1">
                  <span className="text-[clamp(1.25rem,3vw,2rem)] text-[#00D4AA] font-medium">
                    {t.to}
                  </span>
                </div>
              </div>

              {i < transformations.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-white/[0.06] to-transparent"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="text-center mt-20 text-[15px] text-muted-foreground"
        >
          From inconsistent to <span className="text-foreground font-medium">intentional.</span>
        </motion.p>
      </div>
    </section>
  );
}
