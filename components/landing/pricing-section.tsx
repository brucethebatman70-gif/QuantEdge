"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    id: "starter",
    name: "Starter",
    who: "Individual traders starting their journaling journey",
    monthly: 19,
    yearly: 190,
    features: [
      "Unlimited trade journal entries",
      "8-stage trade timeline",
      "Basic analytics dashboard",
      "Emotion tracking",
      "CSV import",
      "1 workspace",
    ],
    limitations: "No AI review, no team features",
  },
  {
    id: "professional",
    name: "Professional",
    who: "Serious traders committed to continuous improvement",
    monthly: 39,
    yearly: 390,
    popular: true,
    features: [
      "Everything in Starter",
      "AI trade review & grading",
      "Advanced analytics & scores",
      "Psychology engine & coaching",
      "Risk management tools",
      "Trade replay",
      "Scenario simulator",
      "5 workspaces",
    ],
    limitations: "Limited to 5 workspaces",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    who: "Teams, prop firms, and trading coaches",
    monthly: 99,
    yearly: 990,
    features: [
      "Everything in Professional",
      "Unlimited workspaces",
      "Team dashboard",
      "Coach access & reviews",
      "Role management",
      "Audit logs",
      "Approval workflows",
      "Priority support",
      "Custom integrations",
    ],
    limitations: "Requires minimum 3 seats",
  },
];

const comparisonCategories = [
  {
    category: "Journaling",
    items: [
      { feature: "Trade timeline entries", starter: true, pro: true, enterprise: true },
      { feature: "Screenshot annotations", starter: false, pro: true, enterprise: true },
      { feature: "Trade replay", starter: false, pro: true, enterprise: true },
      { feature: "AI-generated summaries", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Analytics",
    items: [
      { feature: "Performance dashboard", starter: true, pro: true, enterprise: true },
      { feature: "Score cards (6 dimensions)", starter: false, pro: true, enterprise: true },
      { feature: "Custom date ranges", starter: false, pro: true, enterprise: true },
      { feature: "Export reports", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "AI & Psychology",
    items: [
      { feature: "Trade grading", starter: false, pro: true, enterprise: true },
      { feature: "Emotion analytics", starter: true, pro: true, enterprise: true },
      { feature: "Personalized coaching", starter: false, pro: true, enterprise: true },
      { feature: "Behavior pattern detection", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Team & Enterprise",
    items: [
      { feature: "Workspaces", starter: "1", pro: "5", enterprise: "Unlimited" },
      { feature: "Team dashboard", starter: false, pro: false, enterprise: true },
      { feature: "Role management", starter: false, pro: false, enterprise: true },
      { feature: "Audit logs", starter: false, pro: false, enterprise: true },
    ],
  },
];

const faqItems = [
  { q: "Will my data remain private?", a: "All data is encrypted end-to-end. We use TLS 1.3 for transit and AES-256 for storage. AI processing is isolated per workspace. We never share or sell your trading data." },
  { q: "Can I import my existing journal?", a: "Yes. QuantEdge supports CSV import from any platform. We also have direct integrations with TradingView, MetaTrader, cTrader, Binance, Bybit, and Interactive Brokers." },
  { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no hidden fees. You keep access to your data even after cancellation. We believe in earning your business every month." },
  { q: "Does AI replace my decisions?", a: "No. QuantEdge's AI is designed to augment your decision-making, not replace it. It identifies patterns, highlights blind spots, and provides coaching — but every trade decision remains yours." },
  { q: "Which brokers are supported?", a: "We integrate with TradingView, MT4/5, cTrader, DXtrade, Interactive Brokers, Binance, and Bybit. CSV import works with any platform. New integrations are added regularly." },
  { q: "How long does setup take?", a: "Most users are journaling within 5 minutes. Import existing data instantly via CSV or broker integration. The AI begins providing insights after 10 journaled trades." },
  { q: "Can teams collaborate?", a: "Yes. The Enterprise plan includes team dashboards, coach access, shared journals, role management, audit logs, and approval workflows. Perfect for prop firms and trading teams." },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [tradeCount, setTradeCount] = useState(30);
  const [mistakeRate, setMistakeRate] = useState(25);

  const filteredFaq = faqItems.filter(
    (item) =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const timeSaved = Math.round(tradeCount * 8 * (mistakeRate / 100) * 0.6);
  const consistencyImprovement = Math.min(95, 40 + mistakeRate * 0.8 + (tradeCount > 50 ? 10 : 0));

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
            Pricing
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            Invest in your<br />
            <span className="text-[#00D4AA]">trading career.</span>
          </h2>
        </motion.div>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-[12px] transition-colors ${!isYearly ? "text-foreground/80" : "text-muted-foreground/40"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
              isYearly ? "bg-[#00D4AA]/30" : "bg-white/[0.08]"
            }`}
          >
            <motion.div
              animate={{ x: isYearly ? 18 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-0.5 w-4 h-4 rounded-full shadow-sm ${
                isYearly ? "bg-[#00D4AA]" : "bg-white/40"
              }`}
            />
          </button>
          <span className={`text-[12px] transition-colors ${isYearly ? "text-foreground/80" : "text-muted-foreground/40"}`}>
            Yearly
            <span className="text-[#00D4AA] ml-1 text-[10px]">Save ~17%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearly : plan.monthly;
            const isSelected = selectedPlan === plan.id;
            return (
              <motion.button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: plans.indexOf(plan) * 0.08 }}
                className={`relative rounded-2xl border text-left p-5 transition-all duration-300 ${
                  isSelected
                    ? "border-[#00D4AA]/30 bg-[#00D4AA]/[0.03]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-5 px-2.5 py-0.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[9px] font-mono uppercase tracking-[0.08em] text-[#00D4AA]/70">
                    Most popular
                  </span>
                )}
                <span className="text-[13px] font-medium text-foreground/80">{plan.name}</span>
                <p className="text-[10px] text-muted-foreground/50 mt-1 leading-relaxed">{plan.who}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold">
                    ${isYearly ? Math.round(price / 12) : price}
                  </span>
                  <span className="text-[11px] text-muted-foreground/40">/month</span>
                </div>
                {isYearly && (
                  <p className="text-[10px] text-[#00D4AA]/60 mt-0.5">${price}/year</p>
                )}
                <ul className="mt-4 space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="text-[11px] text-foreground/60 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00D4AA]/50 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.limitations && (
                  <p className="text-[9px] text-muted-foreground/30 mt-3 italic">{plan.limitations}</p>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 mb-14"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
            ROI Calculator
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-muted-foreground/60">Trades per month</span>
                  <span className="text-foreground/70">{tradeCount}</span>
                </div>
                <input
                  type="range" min={5} max={200} value={tradeCount}
                  onChange={(e) => setTradeCount(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none bg-white/[0.06] cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00D4AA]
                    [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,212,170,0.3)]"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-muted-foreground/60">Mistake rate</span>
                  <span className="text-foreground/70">{mistakeRate}%</span>
                </div>
                <input
                  type="range" min={5} max={60} value={mistakeRate}
                  onChange={(e) => setMistakeRate(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none bg-white/[0.06] cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8b5cf6]
                    [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(139,92,246,0.3)]"
                />
              </div>
            </div>
            <motion.div
              key={`${tradeCount}-${mistakeRate}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground/60">Time saved / month</span>
                <span className="text-sm font-semibold text-[#00D4AA]">~{timeSaved} hours</span>
              </div>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground/60">Consistency improvement</span>
                <span className="text-sm font-semibold text-[#8b5cf6]">+{consistencyImprovement}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 mb-14"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
            Feature Comparison
          </span>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="text-left py-2 pr-4 text-muted-foreground/40 font-mono uppercase tracking-[0.08em]">Feature</th>
                  <th className="text-center py-2 px-3 text-muted-foreground/40 font-mono uppercase tracking-[0.08em]">Starter</th>
                  <th className="text-center py-2 px-3 text-[#00D4AA]/60 font-mono uppercase tracking-[0.08em]">Professional</th>
                  <th className="text-center py-2 px-3 text-muted-foreground/40 font-mono uppercase tracking-[0.08em]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((cat) => (
                  <motion.tr key={cat.category}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <td
                      colSpan={4}
                      className="pt-4 pb-1 text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/30"
                    >
                      {cat.category}
                    </td>
                  </motion.tr>
                )).concat(
                  comparisonCategories.flatMap((cat) =>
                    cat.items.map((item) => (
                      <tr key={item.feature}>
                        <td className="py-1.5 pr-4 text-foreground/60">{item.feature}</td>
                        <td className="text-center py-1.5 px-3">
                          {item.starter === true ? <span className="text-[#00D4AA]/60">✓</span> : item.starter === false ? <span className="text-muted-foreground/20">—</span> : <span className="text-foreground/60 text-[10px]">{item.starter}</span>}
                        </td>
                        <td className="text-center py-1.5 px-3">
                          {item.pro === true ? <span className="text-[#00D4AA]">✓</span> : item.pro === false ? <span className="text-muted-foreground/20">—</span> : <span className="text-foreground/60 text-[10px]">{item.pro}</span>}
                        </td>
                        <td className="text-center py-1.5 px-3">
                          {item.enterprise === true ? <span className="text-[#00D4AA]/60">✓</span> : item.enterprise === false ? <span className="text-muted-foreground/20">—</span> : <span className="text-foreground/60 text-[10px]">{item.enterprise}</span>}
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
              Frequently Asked Questions
            </span>
            <div className="relative mt-4 mb-6">
              <input
                type="text"
                placeholder="Search questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/30 transition-all focus:outline-none focus:border-[#00D4AA]/30"
              />
            </div>
            <div className="space-y-2">
              {filteredFaq.map((item) => (
                <div key={item.q} className="rounded-xl border border-white/[0.04] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === item.q ? null : item.q)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-[12px] text-foreground/70 hover:text-foreground/90 transition-colors"
                  >
                    {item.q}
                    <motion.span
                      animate={{ rotate: openFaq === item.q ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-muted-foreground/30 shrink-0 ml-2"
                    >
                      ↓
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === item.q && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-3.5 pb-3 text-[11px] text-muted-foreground/60 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {filteredFaq.length === 0 && (
                <p className="text-[12px] text-muted-foreground/40 text-center py-4">No matching questions</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
