"use client";

import { motion } from "framer-motion";

const traderTypes = [
  "Professional Traders",
  "Funded Traders",
  "Prop Firm Traders",
  "Forex Traders",
  "Crypto Traders",
  "Index Traders",
  "Commodity Traders",
  "Swing Traders",
  "Day Traders",
  "Scalpers",
  "Trading Coaches",
  "Trading Teams"
];

export function AudienceSection() {
  return (
    <section className="relative px-6 py-48">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Built for
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-6 text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.02em]"
        >
          The trader who demands more.
        </motion.p>

        <div className="mt-16">
          {traderTypes.map((type, index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
              className="group"
            >
              <span className="inline-block text-[clamp(1rem,2vw,1.5rem)] text-muted-foreground/60 transition-all duration-500 group-hover:text-foreground group-hover:scale-[1.02] cursor-default">
                {type}
                {index < traderTypes.length - 1 && (
                  <span className="mx-3 text-muted-foreground/20">/</span>
                )}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mt-20"
        >
          <div className="w-16 h-[1px] bg-[#00D4AA]/30 mx-auto mb-6" />
          <p className="text-[15px] text-muted-foreground">
            <span className="text-foreground font-medium">Every edge.</span> One system.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
