"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      "Trade replay & simulator",
      "5 workspaces",
    ],
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
      "Team dashboard & coach access",
      "Role management & audit logs",
      "Approval workflows",
      "Priority support",
      "Custom integrations",
    ],
  },
];

const comparisonData = [
  {
    category: "Journaling",
    items: [
      { feature: "Trade timeline entries", starter: true, pro: true, enterprise: true },
      { feature: "Screenshot annotations", starter: false, pro: true, enterprise: true },
      { feature: "Trade replay", starter: false, pro: true, enterprise: true },
      { feature: "AI-generated summaries", starter: false, pro: true, enterprise: true },
      { feature: "Voice notes", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Analytics",
    items: [
      { feature: "Performance dashboard", starter: true, pro: true, enterprise: true },
      { feature: "Score cards (6 dimensions)", starter: false, pro: true, enterprise: true },
      { feature: "Custom date ranges", starter: false, pro: true, enterprise: true },
      { feature: "Export reports", starter: false, pro: false, enterprise: true },
      { feature: "Team performance view", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "AI & Psychology",
    items: [
      { feature: "Trade grading", starter: false, pro: true, enterprise: true },
      { feature: "Emotion analytics", starter: true, pro: true, enterprise: true },
      { feature: "Personalized coaching", starter: false, pro: true, enterprise: true },
      { feature: "Behavior pattern detection", starter: false, pro: true, enterprise: true },
      { feature: "Team-wide AI insights", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Team & Enterprise",
    items: [
      { feature: "Workspaces", starter: "1", pro: "5", enterprise: "Unlimited" },
      { feature: "Team dashboard", starter: false, pro: false, enterprise: true },
      { feature: "Role management", starter: false, pro: false, enterprise: true },
      { feature: "Audit logs", starter: false, pro: false, enterprise: true },
      { feature: "Approval workflows", starter: false, pro: false, enterprise: true },
    ],
  },
];

const faqCategories = [
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Will my data remain private?",
        a: "All data is encrypted end-to-end. We use TLS 1.3 for transit and AES-256 for storage. AI processing is isolated per workspace. We never share or sell your trading data. You can request full deletion at any time.",
      },
      {
        q: "Who can see my trades?",
        a: "Only you and anyone you explicitly invite. Workspace data is fully isolated. Even on team plans, you control what each member can see through role-based permissions.",
      },
    ],
  },
  {
    category: "Getting Started",
    items: [
      {
        q: "How long does setup take?",
        a: "Most users are journaling within 5 minutes. Import existing data instantly via CSV or broker integration. The AI begins providing insights after 10 journaled trades. No lengthy onboarding required.",
      },
      {
        q: "Can I import my existing journal?",
        a: "Yes. QuantEdge supports CSV import from any platform. We also have direct integrations with TradingView, MetaTrader, cTrader, DXtrade, Binance, Bybit, and Interactive Brokers.",
      },
      {
        q: "Which brokers are supported?",
        a: "We integrate with TradingView, MT4/5, cTrader, DXtrade, Interactive Brokers, Binance, and Bybit. CSV import works with any platform. New integrations are added regularly based on user requests.",
      },
    ],
  },
  {
    category: "Billing",
    items: [
      {
        q: "Can I cancel anytime?",
        a: "Absolutely. No contracts, no hidden fees. You keep access to your data even after cancellation. We believe in earning your business every month. Cancel in one click from your settings.",
      },
      {
        q: "What happens to my data if I cancel?",
        a: "Your data remains accessible in read-only mode. You can export everything at any time. If you want full deletion, we process it within 48 hours of your request.",
      },
      {
        q: "Is there a free trial?",
        a: "We offer a 14-day free trial on the Professional plan. No credit card required. Full access to all features including AI review and coaching. Cancel anytime during the trial.",
      },
    ],
  },
  {
    category: "Product",
    items: [
      {
        q: "Does AI replace my decisions?",
        a: "No. QuantEdge's AI is designed to augment your decision-making, not replace it. It identifies patterns, highlights blind spots, and provides coaching. Every trade decision remains yours. The AI is a review tool, not an auto-trader.",
      },
      {
        q: "Can teams collaborate?",
        a: "Yes. The Enterprise plan includes team dashboards, coach access, shared journals, role management, audit logs, and approval workflows. Perfect for prop firms, trading teams, and coaching practices.",
      },
      {
        q: "Is there a mobile app?",
        a: "QuantEdge is fully responsive and works on any device through the browser. Native mobile apps for iOS and Android are in development. The web experience is fully functional on mobile.",
      },
    ],
  },
];

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
      <path d="M2 5L4 7L8 3" stroke="#00D4AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
      <line x1="2.5" y1="5" x2="7.5" y2="5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity={0.2} />
    </svg>
  );
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const [tradeCount, setTradeCount] = useState(30);
  const [accountSize, setAccountSize] = useState(10000);
  const [mistakeRate, setMistakeRate] = useState(25);
  const [frequency, setFrequency] = useState(3);

  const [faqSearch, setFaqSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredFaq = faqCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
          item.a.toLowerCase().includes(faqSearch.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const timeSaved = Math.round(tradeCount * frequency * (mistakeRate / 100) * 0.5);
  const consistencyImprovement = Math.min(92, 35 + mistakeRate * 0.7 + (tradeCount > 50 ? 8 : 0) + (frequency >= 4 ? 5 : 0));
  const journalEfficiency = Math.min(95, 50 + (1 - mistakeRate / 100) * 40 + (frequency > 2 ? 10 : 0));

  const yearlySavings = plans.map((p) => p.monthly * 12 - p.yearly);
  const selectedPlanObj = plans.find((p) => p.id === selectedPlan);
  const savingsDisplay = selectedPlanObj ? (selectedPlanObj.monthly * 12 - selectedPlanObj.yearly) : 0;

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
            className="relative w-11 h-5 rounded-full transition-colors duration-300 bg-white/[0.08] data-[active=true]:bg-[#00D4AA]/30"
            data-active={isYearly}
          >
            <motion.div
              animate={{ x: isYearly ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-0.5 w-4 h-4 rounded-full shadow-sm ${
                isYearly ? "bg-[#00D4AA]" : "bg-white/40"
              }`}
            />
          </button>
          <span className={`text-[12px] transition-colors ${isYearly ? "text-foreground/80" : "text-muted-foreground/40"}`}>
            Yearly
            <span className="text-[#00D4AA] ml-1 text-[10px]">
              Save ~{savingsDisplay > 0 ? Math.round((1 - selectedPlanObj!.yearly / (selectedPlanObj!.monthly * 12)) * 100) : 17}%
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearly : plan.monthly;
            const monthlyDisplay = isYearly ? Math.round(price / 12) : price;
            const isSelected = selectedPlan === plan.id;
            return (
              <motion.button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: plans.indexOf(plan) * 0.08 }}
                whileHover={{ y: -2 }}
                className={`relative rounded-2xl border text-left p-6 transition-all duration-300 ${
                  isSelected
                    ? "border-[#00D4AA]/30 bg-[#00D4AA]/[0.03] shadow-[0_0_30px_-12px_rgba(0,212,170,0.15)]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
                }`}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-2.5 left-5 px-2.5 py-0.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[9px] font-mono uppercase tracking-[0.08em] text-[#00D4AA]/70"
                  >
                    Most popular
                  </motion.span>
                )}
                <span className="text-[13px] font-medium text-foreground/80">{plan.name}</span>
                <p className="text-[10px] text-muted-foreground/50 mt-1 leading-relaxed">{plan.who}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-[-0.02em]">
                    ${monthlyDisplay}
                  </span>
                  <span className="text-[11px] text-muted-foreground/40">/month</span>
                </div>
                {isYearly && (
                  <p className="text-[10px] text-[#00D4AA]/60 mt-0.5">
                    ${price}/year
                    <span className="text-muted-foreground/30 ml-1">
                      (save ${plan.monthly * 12 - plan.yearly})
                    </span>
                  </p>
                )}
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="text-[11px] text-foreground/60 flex items-start gap-2">
                      <span className="mt-0.5">
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
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
          <p className="text-[12px] text-muted-foreground/60 mt-1 mb-5 leading-relaxed">
            Estimate how QuantEdge improves your trading workflow. Adjust the sliders to match your situation.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-muted-foreground/60">Trades per month</span>
                  <span className="text-foreground/70 font-medium">{tradeCount}</span>
                </div>
                <input
                  type="range" min={5} max={200} value={tradeCount}
                  onChange={(e) => setTradeCount(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none bg-white/[0.06] cursor-pointer outline-none
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00D4AA]
                    [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,212,170,0.3)]"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-muted-foreground/60">Account size</span>
                  <span className="text-foreground/70 font-medium">${accountSize.toLocaleString()}</span>
                </div>
                <input
                  type="range" min={1000} max={500000} step={1000} value={accountSize}
                  onChange={(e) => setAccountSize(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none bg-white/[0.06] cursor-pointer outline-none
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8b5cf6]
                    [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(139,92,246,0.3)]"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-muted-foreground/60">Mistake rate (trades with errors)</span>
                  <span className="text-foreground/70 font-medium">{mistakeRate}%</span>
                </div>
                <input
                  type="range" min={5} max={60} value={mistakeRate}
                  onChange={(e) => setMistakeRate(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none bg-white/[0.06] cursor-pointer outline-none
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#3b82f6]
                    [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-muted-foreground/60">Trading frequency (days/week)</span>
                  <span className="text-foreground/70 font-medium">{frequency} days</span>
                </div>
                <input
                  type="range" min={1} max={7} value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none bg-white/[0.06] cursor-pointer outline-none
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#06E0FF]
                    [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(6,224,255,0.3)]"
                />
              </div>
            </div>
            <motion.div
              key={`${tradeCount}-${accountSize}-${mistakeRate}-${frequency}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-muted-foreground/60 block">Time saved / month</span>
                    <span className="text-[10px] text-muted-foreground/40">from review & analysis</span>
                  </div>
                  <motion.span
                    key={timeSaved}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-lg font-semibold text-[#00D4AA]"
                  >
                    ~{timeSaved}h
                  </motion.span>
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-muted-foreground/60 block">Consistency improvement</span>
                    <span className="text-[10px] text-muted-foreground/40">estimated after 3 months</span>
                  </div>
                  <motion.span
                    key={consistencyImprovement}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-lg font-semibold text-[#8b5cf6]"
                  >
                    +{Math.round(consistencyImprovement)}%
                  </motion.span>
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-muted-foreground/60 block">Journal efficiency</span>
                    <span className="text-[10px] text-muted-foreground/40">vs manual journaling</span>
                  </div>
                  <motion.span
                    key={journalEfficiency}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-lg font-semibold text-[#3b82f6]"
                  >
                    +{Math.round(journalEfficiency)}%
                  </motion.span>
                </div>
              </div>
              <p className="text-[9px] text-muted-foreground/30 text-center pt-1">
                Estimates based on aggregated user data. Individual results vary.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 mb-14"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
            Feature Comparison
          </span>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-[11px] min-w-[500px]">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="text-left py-2.5 pr-4 text-muted-foreground/40 font-mono uppercase tracking-[0.08em] sticky left-0 bg-[#0C0C0F] z-10">
                    Feature
                  </th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground/40 font-mono uppercase tracking-[0.08em]">Starter</th>
                  <th className="text-center py-2.5 px-3 text-[#00D4AA]/60 font-mono uppercase tracking-[0.08em] bg-[#00D4AA]/[0.02]">Professional</th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground/40 font-mono uppercase tracking-[0.08em]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((cat) => (
                  <motion.tr key={cat.category}>
                    <td colSpan={4} className="pt-4 pb-1">
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                        className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors"
                      >
                        <motion.span
                          animate={{ rotate: expandedCategory === cat.category ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▸
                        </motion.span>
                        {cat.category}
                      </button>
                    </td>
                  </motion.tr>
                )).concat(
                  comparisonData.flatMap((cat) =>
                    expandedCategory === null || expandedCategory === cat.category
                      ? cat.items.map((item, i) => (
                          <motion.tr
                            key={item.feature}
                            initial={{ opacity: 0, x: -4 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: i * 0.02 }}
                            className="group hover:bg-white/[0.01] transition-colors"
                          >
                            <td className="py-1.5 pr-4 text-foreground/60 group-hover:text-foreground/80 transition-colors sticky left-0 bg-[#0C0C0F]">
                              <span className="text-[11px]">{item.feature}</span>
                            </td>
                            <td className="text-center py-1.5 px-3">
                              {item.starter === true ? <span className="inline-flex"><CheckIcon /></span> : item.starter === false ? <DashIcon /> : <span className="text-foreground/60 text-[10px]">{item.starter}</span>}
                            </td>
                            <td className="text-center py-1.5 px-3 bg-[#00D4AA]/[0.02]">
                              {item.pro === true ? <span className="inline-flex"><CheckIcon /></span> : item.pro === false ? <DashIcon /> : <span className="text-foreground/60 text-[10px]">{item.pro}</span>}
                            </td>
                            <td className="text-center py-1.5 px-3">
                              {item.enterprise === true ? <span className="inline-flex"><CheckIcon /></span> : item.enterprise === false ? <DashIcon /> : <span className="text-foreground/60 text-[10px]">{item.enterprise}</span>}
                            </td>
                          </motion.tr>
                        ))
                      : []
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
            <div className="space-y-4">
              {filteredFaq.length === 0 && (
                <p className="text-[12px] text-muted-foreground/40 text-center py-4">No matching questions found.</p>
              )}
              {filteredFaq.map((cat) => (
                <div key={cat.category}>
                  <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-muted-foreground/30 block mb-2">
                    {cat.category}
                  </span>
                  <div className="space-y-1.5">
                    {cat.items.map((item) => (
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
