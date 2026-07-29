import type { CopilotConversation, CopilotTemplate, CopilotSuggestion, AiInsightMetric, Folder } from "./types";

function hoursAgo(n: number) {
  const d = new Date(); d.setHours(d.getHours() - n); return d.toISOString();
}
function daysAgo(n: number) {
  const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString();
}

export const mockConversations: CopilotConversation[] = [
  {
    id: "conv_1",
    title: "Today's Performance Review",
    pinned: true,
    folder: "performance",
    tags: ["review", "daily"],
    createdAt: daysAgo(0),
    updatedAt: hoursAgo(2),
    messages: [
      { id: "m1", role: "assistant", content: "Good morning! I've analyzed your pre-market preparation. Your overnight session review was thorough. Let's go through today's game plan.", timestamp: hoursAgo(6), metadata: { type: "analysis" } },
      { id: "m2", role: "user", content: "How did my morning setups look?", timestamp: hoursAgo(5) },
      { id: "m3", role: "assistant", content: "## Morning Setup Analysis\n\nYour **breakout detection** was sharp today. I flagged **3 high-probability setups** before market open:\n\n| Setup | Quality | Entry | Status |\n|-------|---------|-------|--------|\n| NVDA Breakout | 92% | $142.30 | ⚠️ Early exit |\n| AAPL Flag | 87% | $245.80 | ✅ Hit target |\n| TSLA Reversal | 78% | $268.50 | ✅ Hit target |\n\n```python\n# Pattern: Morning bias aligned with volume profile\nconfidence = (\n  premarket_volume * 0.4 +\n  vwap_deviation * 0.3 +\n  overnight_gap * 0.3\n)\n```\n\n> **Insight**: Your highest-conviction setups occur when pre-market volume exceeds 120% of 20-day average. Today qualified.", timestamp: hoursAgo(4), metadata: { type: "analysis", sources: ["Dashboard", "Analytics"], score: 92 } },
      { id: "m4", role: "user", content: "What did I do wrong on NVDA?", timestamp: hoursAgo(3) },
      { id: "m5", role: "assistant", content: "## NVDA Trade Review\n\n**Exit was premature.** You closed at $139.80 (loss) when price hit your stop, but the setup was still valid.\n\n### Root Cause\n- **Emotional trigger**: You were down on SPY position and closed early to 'protect' remaining P&L\n- **Pattern**: This is your 3rd premature exit this week\n\n### Recommendation\n```\nAdjust stop-loss methodology:\n- Current: Fixed $ stop\n- Recommended: ATR-based trailing stop (2.5x ATR)\n```\n\n> **💡 Tip**: When you feel the urge to close early, step away for 60 seconds. Review your pre-written trade plan before acting.", timestamp: hoursAgo(2), metadata: { type: "review", sources: ["Journal", "Trades"], score: 65 } },
    ],
  },
  {
    id: "conv_2",
    title: "Weekly Risk Analysis",
    pinned: true,
    folder: "risk",
    tags: ["risk", "weekly"],
    createdAt: daysAgo(3),
    updatedAt: hoursAgo(12),
    messages: [
      { id: "m2_1", role: "assistant", content: "I've completed your **weekly risk audit**. Here's what I found:\n\n| Metric | This Week | Last Week | Change |\n|--------|-----------|-----------|--------|\n| Max Drawdown | 3.2% | 5.8% | ✅ Improving |\n| Avg Risk/Trade | 0.8% | 1.2% | ✅ Improving |\n| Win Rate | 62% | 68% | ⚠️ Declining |\n| R:R Ratio | 2.1:1 | 2.4:1 | ⚠️ Declining |\n\nYour **risk management is improving**, but win rate is declining due to taking lower-probability setups in afternoon sessions.", timestamp: daysAgo(2), metadata: { type: "analysis", sources: ["Analytics", "Trades"], score: 78 } },
    ],
  },
  {
    id: "conv_3",
    title: "Psychology Coaching Session",
    pinned: false,
    folder: "psychology",
    tags: ["psychology", "coaching"],
    createdAt: daysAgo(5),
    updatedAt: daysAgo(4),
    messages: [
      { id: "m3_1", role: "assistant", content: "I've been tracking your psychological patterns. Let's discuss **revenge trading triggers**.", timestamp: daysAgo(4), metadata: { type: "analysis", score: 72 } },
      { id: "m3_2", role: "user", content: "I keep revenge trading after losses", timestamp: daysAgo(4) },
      { id: "m3_3", role: "assistant", content: "## Revenge Trading Analysis\n\nI detected **4 instances** in the past 2 weeks:\n\n### Pattern Recognition\n1. Loss > 2% → Immediate re-entry within 15 minutes\n2. Re-entry size: **2.5x normal** position size\n3. Win rate on re-entries: **18%**\n\n### Intervention Plan\n```\n1. After any loss > 1%, enforce 30-minute cooldown\n2. Reduce position size to 50% for next 3 trades\n3. Journal the emotional state before each entry\n```\n\nYour journal shows you're aware of this pattern. That's the first step. Let's build the discipline to break it.", timestamp: daysAgo(4), metadata: { type: "review", sources: ["Journal", "Trades", "Goals"], score: 58 } },
    ],
  },
  {
    id: "conv_4",
    title: "Strategy Comparison",
    pinned: false,
    folder: "strategy",
    tags: ["strategy", "backtest"],
    createdAt: daysAgo(7),
    updatedAt: daysAgo(6),
    messages: [
      { id: "m4_1", role: "assistant", content: "## Strategy Performance Matrix\n\n| Strategy | Win Rate | Avg P&L | Sharpe | Trades |\n|----------|----------|---------|--------|--------|\n| Breakout | 72% | +$420 | 2.14 | 85 |\n| Pullback | 68% | +$310 | 1.76 | 62 |\n| Momentum | 65% | +$280 | 1.45 | 73 |\n| Reversal | 58% | -$85 | 0.89 | 48 |\n\n**Breakout** remains your strongest strategy. Consider allocating 60% of capital to breakout setups.", timestamp: daysAgo(6), metadata: { type: "analysis", sources: ["Analytics", "Backtesting"], score: 88 } },
    ],
  },
  {
    id: "conv_5",
    title: "Monthly Goal Progress",
    pinned: false,
    folder: "performance",
    tags: ["goals", "monthly"],
    createdAt: daysAgo(10),
    updatedAt: daysAgo(8),
    messages: [
      { id: "m5_1", role: "assistant", content: "## July Goals Progress\n\n| Goal | Progress | Status |\n|------|----------|--------|\n| $15k Monthly P&L | **83%** ($12,450/$15,000) | ✅ On track |\n| 200 Trades | **78%** (156/200) | ⚠️ Behind |\n| Max DD < 8% | **4.2%** | ✅ Excellent |\n| Journal Rate | **82%** | 📈 Improving |\n\nYour consistency score improved 12 points this month. Keep the momentum.", timestamp: daysAgo(8), metadata: { type: "analysis", sources: ["Goals", "Journal"], score: 82 } },
    ],
  },
  {
    id: "conv_6",
    title: "Improvement Plan Generator",
    pinned: false,
    folder: undefined,
    tags: ["plan", "coaching"],
    createdAt: daysAgo(12),
    updatedAt: daysAgo(11),
    messages: [
      { id: "m6_1", role: "user", content: "Generate an improvement plan based on my last 30 days", timestamp: daysAgo(11) },
      { id: "m6_2", role: "assistant", content: "## 30-Day Improvement Plan\n\nBased on analysis of your last 180 trades across 30 days:\n\n### Priority 1: Afternoon Trading 🎯\n- **Issue**: Win rate drops from 74% (first 2 hours) to 58% (afternoon)\n- **Action**: Implement midday break (11:30 AM - 1:00 PM)\n- **Metric**: Afternoon win rate > 65% within 2 weeks\n\n### Priority 2: Revenge Trading ⚡\n- **Issue**: 4 instances in 2 weeks, avg loss $320\n- **Action**: 30-min cooldown after any loss >1%\n- **Metric**: Zero revenge trades next 7 days\n\n### Priority 3: Journal Consistency 📓\n- **Issue**: 82% journal rate (target: 100%)\n- **Action**: Set reminder after every trade\n- **Metric**: 100% journal rate this week\n\n### Weekly Routine\n| Day | Focus | Duration |\n|-----|-------|----------|\n| Sun | Backtest new setups | 2h |\n| Mon-Fri | Morning prep + evening review | 30m each |\n| Sat | Replay review of week's best/worst trades | 1h |", timestamp: daysAgo(11), metadata: { type: "suggestion", sources: ["Analytics", "Journal", "Trades", "Goals"], score: 75 } },
    ],
  },
];

export const mockTemplates: CopilotTemplate[] = [
  { id: "t1", name: "Trade Review", description: "Deep analysis of a specific trade", prompt: "Review my trade on SYMBOL. Analyze entry, exit, and psychology.", icon: "Search", category: "analysis" },
  { id: "t2", name: "Daily Performance", description: "Complete daily performance breakdown", prompt: "Give me a full breakdown of today's trading performance including win rate, P&L, and key metrics.", icon: "Activity", category: "review" },
  { id: "t3", name: "Risk Audit", description: "Comprehensive risk management check", prompt: "Run a risk audit on my account. Check drawdown, position sizing, and risk management.", icon: "Shield", category: "risk" },
  { id: "t4", name: "Psychology Check", description: "Analyze emotional trading patterns", prompt: "Analyze my recent trades for emotional patterns. Where am I trading emotionally?", icon: "Brain", category: "psychology" },
  { id: "t5", name: "Strategy Analysis", description: "Compare strategy performance", prompt: "Compare my trading strategies by win rate, P&L, and Sharpe ratio.", icon: "BarChart3", category: "strategy" },
  { id: "t6", name: "Goal Review", description: "Check goal progress", prompt: "How am I tracking against my trading goals this month?", icon: "Target", category: "review" },
  { id: "t7", name: "Weekly Report", description: "Generate weekly performance report", prompt: "Create a comprehensive weekly trading report for this week.", icon: "FileText", category: "review" },
  { id: "t8", name: "Mistake Detector", description: "Find repeated mistakes", prompt: "Analyze my last 50 trades and identify any repeated mistakes or patterns.", icon: "AlertTriangle", category: "analysis" },
];

export const mockSuggestions: CopilotSuggestion[] = [
  { id: "s1", text: "Review today's performance", icon: "Activity", category: "analysis" },
  { id: "s2", text: "Analyze my risk management", icon: "Shield", category: "risk" },
  { id: "s3", text: "Find repeated mistakes", icon: "AlertTriangle", category: "analysis" },
  { id: "s4", text: "Compare this month vs last month", icon: "BarChart3", category: "review" },
  { id: "s5", text: "Check goal progress", icon: "Target", category: "review" },
  { id: "s6", text: "Why did I lose today?", icon: "TrendingDown", category: "psychology" },
  { id: "s7", text: "Generate improvement plan", icon: "Sparkles", category: "coaching" },
  { id: "s8", text: "Create a weekly report", icon: "FileText", category: "review" },
];

export const mockInsights: AiInsightMetric[] = [
  { label: "Execution Score", value: 84, max: 100, unit: "", icon: "Zap", color: "text-success", trend: "up" },
  { label: "Discipline Score", value: 72, max: 100, unit: "", icon: "Shield", color: "text-warning", trend: "stable" },
  { label: "Psychology Score", value: 68, max: 100, unit: "", icon: "Brain", color: "text-warning", trend: "up" },
  { label: "Risk Score", value: 88, max: 100, unit: "", icon: "AlertTriangle", color: "text-success", trend: "up" },
  { label: "Consistency Score", value: 76, max: 100, unit: "", icon: "Activity", color: "text-primary", trend: "down" },
  { label: "Trading Health", value: 78, max: 100, unit: "", icon: "Heart", color: "text-primary", trend: "up" },
];

export const mockFolders: Folder[] = [
  { id: "f_perf", name: "Performance", conversationIds: ["conv_1", "conv_5"] },
  { id: "f_risk", name: "Risk", conversationIds: ["conv_2"] },
  { id: "f_psych", name: "Psychology", conversationIds: ["conv_3"] },
  { id: "f_strat", name: "Strategy", conversationIds: ["conv_4"] },
];

export const mockAiResponses: Record<string, string> = {
  default: "I've analyzed your recent trading data. Here's what I found:\n\n- Your **win rate** over the last 20 trades is 65%\n- Average R:R is **2.1:1**\n- Your best setup remains the **Breakout pattern** with 72% win rate\n\nWhat specific aspect would you like me to dive deeper into?",
  performance: "## Performance Summary\n\n| Metric | Value |\n|--------|-------|\n| Today's P&L | **+$2,340** |\n| Win Rate | **68%** (13/19) |\n| Avg Win | **+$380** |\n| Avg Loss | **-$145** |\n| Best Trade | AAPL +$760 |\n\n> 💡 Your morning sessions continue to outperform afternoon sessions. Consider adjusting your trading hours.",
  risk: "## Risk Analysis\n\nYour risk management metrics are **solid** this period:\n\n- **Drawdown**: 3.2% (target < 8%) ✅\n- **Avg Risk/Trade**: 0.8% (target < 1.5%) ✅\n- **Position Sizing**: Consistent ✅\n\n⚠️ **Watch out**: Your concentration risk is elevated. TSLA exposure is 28% of portfolio.",
  mistakes: "## Repeated Mistake Analysis\n\nBased on your last 50 trades, I found **3 patterns**:\n\n1. **Premature Exits** (7 occurrences)\n   - You close winning trades at +1.5% when the setup targets +3%\n   - Cost: **-$2,400 in missed gains**\n\n2. **Revenge Trading** (4 occurrences)\n   - After losses > 2%, you re-enter within 15 minutes\n   - Win rate on re-entries: **18%**\n\n3. **Overtrading on Mondays**\n   - Average 4 trades on Monday vs 2.5 on other days\n   - Monday win rate: **52%** vs 68% average\n\nShall I create an improvement plan to address these?",
  goals: "## Goal Progress\n\n| Goal | Progress | Status |\n|------|----------|--------|\n| $15k Monthly P&L | **$12,450 / $15,000 (83%)** | ✅ On track |\n| 200 Trades/Month | **156 / 200 (78%)** | ⚠️ Behind |\n| Max Drawdown < 8% | **4.2%** | ✅ Excellent |\n| Win Rate > 65% | **72%** | ✅ Exceeding |\n| Journal 100% | **82%** | 📈 Improving |\n\nYour **completion rate improved 12%** compared to last month.",
  weekly: "## Weekly Report\n\n**Period**: Monday - Friday\n\n### Headlines\n- **P&L**: +$4,280 (best day: Wednesday +$2,100)\n- **Win Rate**: 64% (18 wins / 10 losses)\n- **Best Setup**: Breakout (8/10 wins, 80% win rate)\n- **Worst Setup**: Reversal (2/6 wins, 33% win rate)\n\n### Monday 🟢\nTrades: 6 | P&L: +$890 | WR: 67%\n### Tuesday 🟢\nTrades: 4 | P&L: +$1,240 | WR: 75%\n### Wednesday 🟢\nTrades: 5 | P&L: +$2,100 | WR: 80%\n### Thursday 🔴\nTrades: 7 | P&L: -$430 | WR: 43%\n### Friday 🟡\nTrades: 6 | P&L: +$480 | WR: 50%\n\n**Actions for next week**:\n1. Reduce Monday trade count to max 3\n2. Skip Reversal setups on Thursday (historically worst day)\n3. Increase size on Breakout setups",
  compare: "## Month-over-Month Comparison\n\n| Metric | June | July | Change |\n|--------|------|------|--------|\n| P&L | +$7,200 | +$12,450 | **+73%** 🚀 |\n| Win Rate | 65% | 72% | **+7%** 📈 |\n| Avg Trade | +$189 | +$366 | **+94%** 🚀 |\n| Drawdown | 5.8% | 4.2% | **-28%** ✅ |\n| Trades | 38 | 34 | **-11%** |\n\n**Key Driver**: Reduced trade frequency + improved setup selection = significantly better results.\n\n> Your discipline improvement is directly correlated with better P&L. Keep it up.",
  plan: "## 30-Day Improvement Plan\n\n### Week 1: Foundation 🏗️\n- **Goal**: Achieve 70% journal completion\n- **Action**: Journal every trade within 5 minutes of closing\n- **Habit**: Morning analysis (10 min before open)\n\n### Week 2: Refinement 🔧\n- **Goal**: Reduce afternoon trades by 40%\n- **Action**: Implement midday trading break (11:30 AM - 1:00 PM)\n- **Habit**: Evening review (15 min after close)\n\n### Week 3: Discipline ⚡\n- **Goal**: Zero revenge trades\n- **Action**: Enforce 30-minute cooldown after any loss > 1%\n- **Habit**: Pre-trade checklist review\n\n### Week 4: Mastery 🎯\n- **Goal**: 75% weekly win rate\n- **Action**: Only trade top-3 setups (Breakout, Pullback, VWAP)\n- **Habit**: Sunday strategy review + backtest\n\n**Weekly Check-ins**: I'll monitor your progress and adjust the plan dynamically.",
};
