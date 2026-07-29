"use client";

import { motion } from "framer-motion";

const truths = [
  {
    line: "The average trader switches between",
    highlight: "7 platforms",
    end: " daily."
  },
  {
    line: "97 journal entries.",
    highlight: "14 different tools.",
    end: " Zero consistency."
  },
  {
    line: "Emotions control",
    highlight: "80%",
    end: " of trading outcomes."
  },
  {
    line: "The difference between profitable and unprofitable",
    end: " is not strategy."
  },
  {
    line: null,
    highlight: "It&apos;s process.",
    end: null,
    isClimax: true
  }
];

export function ProblemSection() {
  return (
    <section className="relative px-6 py-48">
      <div className="max-w-3xl mx-auto space-y-28">
        {truths.map((truth, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {index > 0 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-12 h-[1px] bg-white/[0.08] mx-auto mb-14"
              />
            )}
            {truth.isClimax ? (
              <p className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[#00D4AA]">
                It&apos;s process.
              </p>
            ) : (
              <p className="text-[clamp(1.25rem,3vw,2rem)] leading-[1.3] text-muted-foreground">
                {truth.line}{" "}
                {truth.highlight && (
                  <span className="text-foreground font-medium">{truth.highlight}</span>
                )}
                {truth.end}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
