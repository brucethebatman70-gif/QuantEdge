import type { Candle, ReplayEvent, ReplayTrade, AiReview, Annotation } from "./types";

const rng = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
};

function generateCandles(basePrice: number, count: number, volatility: number, trend: number, seed: number): Candle[] {
  const rand = rng(seed);
  const candles: Candle[] = [];
  let price = basePrice;
  const start = new Date("2026-07-28T09:30:00");
  for (let i = 0; i < count; i++) {
    const t = new Date(start);
    t.setMinutes(t.getMinutes() + i * 5);
    const change = (rand() - 0.5) * volatility + trend;
    const open = price;
    const close = +(open + change).toFixed(2);
    const high = +(Math.max(open, close) + rand() * volatility * 0.3).toFixed(2);
    const low = +(Math.min(open, close) - rand() * volatility * 0.3).toFixed(2);
    const volume = Math.round(100000 + rand() * 900000);
    candles.push({ time: t.toISOString(), open, high, low, close, volume });
    price = close;
  }
  return candles;
}

const trade1Candles = generateCandles(245.00, 78, 1.5, 0.08, 100);
const trade1Events: ReplayEvent[] = [
  { id: "e1", type: "entry", time: trade1Candles[2].time, price: 245.80, label: "Entry @ 245.80", description: "Long entry on flag breakout above resistance" },
  { id: "e2", type: "stop_loss", time: trade1Candles[3].time, price: 243.00, label: "SL @ 243.00", description: "Initial stop loss at 1.1% risk" },
  { id: "e3", type: "take_profit", time: trade1Candles[15].time, price: 252.00, label: "TP @ 252.00", description: "Initial take profit at 2.5% gain" },
  { id: "e4", type: "sl_modify", time: trade1Candles[30].time, price: 248.50, label: "SL → 248.50 (breakeven)", description: "Moved SL to breakeven after price action confirmed" },
  { id: "e5", type: "tp_modify", time: trade1Candles[45].time, price: 255.00, label: "TP → 255.00", description: "Extended TP on strong momentum" },
  { id: "e6", type: "exit", time: trade1Candles[72].time, price: 253.40, label: "Exit @ 253.40", description: "Full exit — price approaching resistance, RSI divergence" },
  { id: "e7", type: "journal", time: trade1Candles[72].time, price: 253.40, label: "Journal entry created", description: "Noted: Trust the pattern, plan worked perfectly" },
  { id: "e8", type: "ai_comment", time: trade1Candles[40].time, price: 250.20, label: "AI: Strong trend confirmed", description: "Volume expanding, above VWAP, bullish engulfing pattern" },
];

const trade2Candles = generateCandles(268.00, 52, 1.8, -0.1, 200);
const trade2Events: ReplayEvent[] = [
  { id: "f1", type: "entry", time: trade2Candles[3].time, price: 268.50, label: "Entry @ 268.50", description: "Short entry at resistance rejection" },
  { id: "f2", type: "stop_loss", time: trade2Candles[4].time, price: 270.50, label: "SL @ 270.50", description: "Tight stop above resistance" },
  { id: "f3", type: "take_profit", time: trade2Candles[4].time, price: 264.00, label: "TP @ 264.00", description: "Target at previous support" },
  { id: "f4", type: "exit", time: trade2Candles[48].time, price: 264.20, label: "Exit @ 264.20", description: "Profit target nearly hit, closed at resistance" },
  { id: "f5", type: "ai_comment", time: trade2Candles[20].time, price: 266.00, label: "AI: Short momentum fading", description: "Selling volume decreasing, consider partial close" },
];

const trade3Candles = generateCandles(142.00, 42, 2.2, -0.15, 300);
const trade3Events: ReplayEvent[] = [
  { id: "g1", type: "entry", time: trade3Candles[4].time, price: 142.30, label: "Entry @ 142.30", description: "FOMO entry — broke resistance but weak volume" },
  { id: "g2", type: "stop_loss", time: trade3Candles[5].time, price: 140.00, label: "SL @ 140.00", description: "Below breakout level" },
  { id: "g3", type: "exit", time: trade3Candles[38].time, price: 139.80, label: "Exit @ 139.80", description: "Stop loss hit — learned: wait for confirmation" },
  { id: "g4", type: "journal", time: trade3Candles[38].time, price: 139.80, label: "Journal: FOMO entry", description: "Chased breakout without confirmation. Need patience." },
  { id: "g5", type: "ai_comment", time: trade3Candles[10].time, price: 141.50, label: "AI: False breakout detected", description: "Price rejected above resistance with bearish engulfing" },
];

const trade4Candles = generateCandles(468.00, 78, 1.0, 0.05, 400);
const trade4Events: ReplayEvent[] = [
  { id: "h1", type: "entry", time: trade4Candles[5].time, price: 468.20, label: "Entry @ 468.20", description: "Pullback to 20 EMA" },
  { id: "h2", type: "stop_loss", time: trade4Candles[6].time, price: 465.00, label: "SL @ 465.00", description: "Below swing low" },
  { id: "h3", type: "take_profit", time: trade4Candles[6].time, price: 474.00, label: "TP @ 474.00", description: "Previous resistance" },
  { id: "h4", type: "sl_modify", time: trade4Candles[35].time, price: 470.00, label: "SL → 470.00", description: "Trailed stop after strong move" },
  { id: "h5", type: "exit", time: trade4Candles[72].time, price: 472.10, label: "Exit @ 472.10", description: "Partial exit, remainder at close" },
  { id: "h6", type: "ai_comment", time: trade4Candles[30].time, price: 470.50, label: "AI: Trend healthy", description: "Above VWAP, rising volume, bullish" },
];

const trade5Candles = generateCandles(198.00, 60, 1.6, 0.12, 500);
const trade5Events: ReplayEvent[] = [
  { id: "i1", type: "entry", time: trade5Candles[4].time, price: 198.40, label: "Entry @ 198.40", description: "Ascending triangle breakout" },
  { id: "i2", type: "stop_loss", time: trade5Candles[5].time, price: 195.00, label: "SL @ 195.00", description: "Below triangle support" },
  { id: "i3", type: "take_profit", time: trade5Candles[5].time, price: 206.00, label: "TP @ 206.00", description: "Measured move target" },
  { id: "i4", type: "partial_exit", time: trade5Candles[30].time, price: 203.00, label: "Partial exit 50% @ 203.00", description: "Scalped half at resistance" },
  { id: "i5", type: "exit", time: trade5Candles[55].time, price: 205.60, label: "Exit @ 205.60", description: "Remainder at close" },
  { id: "i6", type: "ai_comment", time: trade5Candles[20].time, price: 201.00, label: "AI: Breakout confirmed", description: "Volume spike + RSI bullish" },
];

const trade6Candles = generateCandles(182.00, 36, 1.0, 0.02, 600);
const trade6Events: ReplayEvent[] = [
  { id: "j1", type: "entry", time: trade6Candles[3].time, price: 182.30, label: "Entry @ 182.30", description: "Short scalp at overbought RSI" },
  { id: "j2", type: "stop_loss", time: trade6Candles[4].time, price: 183.20, label: "SL @ 183.20", description: "Very tight scalp stop" },
  { id: "j3", type: "exit", time: trade6Candles[32].time, price: 183.10, label: "Exit @ 183.10", description: "Stop hit on volatility" },
  { id: "j4", type: "ai_comment", time: trade6Candles[10].time, price: 182.80, label: "AI: Momentum still strong", description: "No reversal confirmation yet" },
];

const trade7Candles = generateCandles(512.00, 80, 2.0, 0.18, 700);
const trade7Events: ReplayEvent[] = [
  { id: "k1", type: "entry", time: trade7Candles[2].time, price: 512.40, label: "Entry @ 512.40", description: "Post-earnings momentum entry" },
  { id: "k2", type: "stop_loss", time: trade7Candles[3].time, price: 505.00, label: "SL @ 505.00", description: "Below gap fill level" },
  { id: "k3", type: "take_profit", time: trade7Candles[3].time, price: 530.00, label: "TP @ 530.00", description: "Earnings gap target" },
  { id: "k4", type: "exit", time: trade7Candles[75].time, price: 528.80, label: "Exit @ 528.80", description: "Earnings momentum ran its course" },
  { id: "k5", type: "ai_comment", time: trade7Candles[30].time, price: 522.00, label: "AI: Post-earnings drift active", description: "Volume 3x average, high momentum" },
];

const trade8Candles = generateCandles(168.00, 44, 1.3, 0.06, 800);
const trade8Events: ReplayEvent[] = [
  { id: "l1", type: "entry", time: trade8Candles[3].time, price: 168.90, label: "Entry @ 168.90", description: "Channel break to upside" },
  { id: "l2", type: "stop_loss", time: trade8Candles[4].time, price: 167.00, label: "SL @ 167.00", description: "Below channel support" },
  { id: "l3", type: "take_profit", time: trade8Candles[4].time, price: 173.00, label: "TP @ 173.00", description: "Channel width projection" },
  { id: "l4", type: "exit", time: trade8Candles[40].time, price: 172.30, label: "Exit @ 172.30", description: "Near target, closed before reversal" },
  { id: "l5", type: "ai_comment", time: trade8Candles[15].time, price: 170.50, label: "AI: Channel hold confirmed", description: "Price respecting upper channel" },
];

const trade9Candles = generateCandles(556.00, 50, 0.8, 0.04, 900);
const trade9Events: ReplayEvent[] = [
  { id: "m1", type: "entry", time: trade9Candles[2].time, price: 556.20, label: "Entry @ 556.20", description: "VWAP hold long" },
  { id: "m2", type: "stop_loss", time: trade9Candles[3].time, price: 554.00, label: "SL @ 554.00", description: "Below VWAP" },
  { id: "m3", type: "take_profit", time: trade9Candles[3].time, price: 560.00, label: "TP @ 560.00", description: "Resistance target" },
  { id: "m4", type: "exit", time: trade9Candles[46].time, price: 559.80, label: "Exit @ 559.80", description: "Position too small for this conviction" },
  { id: "m5", type: "journal", time: trade9Candles[46].time, price: 559.80, label: "Journal: Size up next time", description: "High conviction setup, should have sized up" },
];

const mockAiReview: AiReview = {
  entryAnalysis: "Entry was well-timed on flag breakout with above-average volume. Price respected the resistance level before breaking through with momentum. RSI was at 58 — not overbought, leaving room for upside. The entry followed your pre-defined plan criteria. Score: 8/10.",
  exitAnalysis: "Exit triggered by RSI divergence on the 15-minute chart — correct decision. However, you left ~$1.60/share on the table. Consider using a trailing stop during strong trends to capture more. The partial exit strategy worked well, reducing risk while maintaining upside.",
  riskReview: "Risk was set at 1.1% of account — within your 1-2% rule. Stop loss was placed logically below the breakout level. Position sizing was appropriate at 100 shares. No risk rule violations detected.",
  executionScore: 87,
  ruleViolations: [],
  emotionalNotes: "Trader was confident and patient. Waited for confirmation before entry. Did not move stop loss emotionally. Good discipline.",
  improvements: ["Use trailing stop during strong trends", "Consider scaling out in thirds (50/30/20)", "Add RSI divergence to exit checklist"],
  confidenceRating: 8,
};

const mockAiReviewBad: AiReview = {
  entryAnalysis: "FOMO entry detected — price broke resistance but volume was declining. Entered 4 candles after the breakout, chasing price. RSI was 72 — overbought zone. This did not match your predefined entry criteria. Score: 3/10.",
  exitAnalysis: "Exit was forced by stop loss. The false breakout reversed sharply. If you had waited for a confirmed retest of the breakout level, you would have avoided this trade entirely.",
  riskReview: "Risk was appropriate at 1.6% of account. However, entering a low-probability setup wasted this risk. Consider reducing position size on low-confidence setups.",
  executionScore: 34,
  ruleViolations: [
    { rule: "Require volume confirmation on breakout", severity: "high" },
    { rule: "No entries above RSI 70", severity: "medium" },
    { rule: "Wait minimum 1 candle after breakout", severity: "medium" },
  ],
  emotionalNotes: "Trade followed 2 consecutive losses — likely revenge trading mentality. Emotion was marked as FOMO. The trader deviated from their playbook.",
  improvements: ["Never chase breakouts — wait for confirmation", "Take a 15-min break after 2 consecutive losses", "Set daily max loss limit to prevent revenge trading"],
  confidenceRating: 2,
};

export const mockReplayTrades: ReplayTrade[] = [
  {
    id: "1", symbol: "AAPL", direction: "long", entryDate: "2026-07-28T09:32:00", exitDate: "2026-07-28T15:45:00",
    entryPrice: 245.80, exitPrice: 253.40, stopLoss: 243.00, takeProfit: 255.00, quantity: 100,
    pnl: 760, pnlPercent: 3.09, fees: 12.50, tags: ["Breakout", "Earnings"], setup: "Flag Pattern",
    emotion: "Confident", mistake: null, lesson: "Trust the pattern", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "Breakout",
    riskPercent: 1.1, rMultiple: 2.5, duration: "6h 13m",
    candles: trade1Candles, events: trade1Events, notes: "Perfect execution. Flag pattern breakout with volume confirmed.", screenshots: ["chart-entry.png", "chart-exit.png"], annotations: [],
  },
  {
    id: "2", symbol: "TSLA", direction: "short", entryDate: "2026-07-28T10:15:00", exitDate: "2026-07-28T14:30:00",
    entryPrice: 268.50, exitPrice: 264.20, stopLoss: 270.50, takeProfit: 264.00, quantity: 50,
    pnl: 215, pnlPercent: 1.60, fees: 8.75, tags: ["Reversal"], setup: "Resistance Reject",
    emotion: "Patient", mistake: null, lesson: "Resistance holds", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "Reversal",
    riskPercent: 0.7, rMultiple: 2.1, duration: "4h 15m",
    candles: trade2Candles, events: trade2Events, notes: "Clean short at resistance. Tight risk management.", screenshots: ["chart-short-entry.png"], annotations: [],
  },
  {
    id: "3", symbol: "NVDA", direction: "long", entryDate: "2026-07-28T11:00:00", exitDate: "2026-07-28T13:20:00",
    entryPrice: 142.30, exitPrice: 139.80, stopLoss: 140.00, takeProfit: 146.00, quantity: 75,
    pnl: -187.50, pnlPercent: -1.76, fees: 6.25, tags: ["Momentum"], setup: "Breakout",
    emotion: "FOMO", mistake: "Chased breakout", lesson: "Wait for confirmation", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "Momentum",
    riskPercent: 1.6, rMultiple: -1.3, duration: "2h 20m",
    candles: trade3Candles, events: trade3Events, notes: "FOMO entry. Chased the breakout without confirmation. Need to wait.", screenshots: ["chart-fomo.png"], annotations: [],
  },
  {
    id: "4", symbol: "MSFT", direction: "long", entryDate: "2026-07-27T09:45:00", exitDate: "2026-07-27T16:00:00",
    entryPrice: 468.20, exitPrice: 472.10, stopLoss: 465.00, takeProfit: 474.00, quantity: 40,
    pnl: 156, pnlPercent: 0.83, fees: 7.50, tags: ["Swing"], setup: "Pullback",
    emotion: "Neutral", mistake: null, lesson: "Patience pays", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "Pullback",
    riskPercent: 0.9, rMultiple: 1.1, duration: "6h 15m",
    candles: trade4Candles, events: trade4Events, notes: "Solid pullback trade. EMA held as support.", screenshots: ["chart-pullback.png"], annotations: [],
  },
  {
    id: "5", symbol: "AMZN", direction: "long", entryDate: "2026-07-27T10:30:00", exitDate: "2026-07-27T15:15:00",
    entryPrice: 198.40, exitPrice: 205.60, stopLoss: 195.00, takeProfit: 206.00, quantity: 60,
    pnl: 432, pnlPercent: 3.63, fees: 9.00, tags: ["Breakout"], setup: "Ascending Triangle",
    emotion: "Aggressive", mistake: "Added too late", lesson: "Scale in earlier", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "Breakout",
    riskPercent: 1.3, rMultiple: 2.8, duration: "4h 45m",
    candles: trade5Candles, events: trade5Events, notes: "Good triangle breakout. Should have added more at the pullback.", screenshots: ["chart-triangle.png"], annotations: [],
  },
  {
    id: "6", symbol: "GOOGL", direction: "short", entryDate: "2026-07-26T13:00:00", exitDate: "2026-07-26T15:45:00",
    entryPrice: 182.30, exitPrice: 183.10, stopLoss: 183.20, takeProfit: 181.00, quantity: 80,
    pnl: -64, pnlPercent: -0.44, fees: 5.50, tags: ["Scalp"], setup: "Overbought",
    emotion: "Impatient", mistake: "Early entry", lesson: "Wait for confirmation candle", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "Scalp",
    riskPercent: 0.5, rMultiple: -0.8, duration: "2h 45m",
    candles: trade6Candles, events: trade6Events, notes: "Entered too early. Should have waited for the confirmation candle.", screenshots: [], annotations: [],
  },
  {
    id: "7", symbol: "META", direction: "long", entryDate: "2026-07-25T09:30:00", exitDate: "2026-07-25T16:00:00",
    entryPrice: 512.40, exitPrice: 528.80, stopLoss: 505.00, takeProfit: 530.00, quantity: 30,
    pnl: 492, pnlPercent: 3.20, fees: 11.25, tags: ["Earnings"], setup: "Post-Earnings Drift",
    emotion: "Confident", mistake: null, lesson: "Earnings momentum is real", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "Earnings",
    riskPercent: 1.4, rMultiple: 2.3, duration: "6h 30m",
    candles: trade7Candles, events: trade7Events, notes: "Earnings gap play worked perfectly. Momentum carried through the day.", screenshots: ["chart-earnings.png", "chart-earnings-exit.png"], annotations: [],
  },
  {
    id: "8", symbol: "AMD", direction: "long", entryDate: "2026-07-24T11:15:00", exitDate: "2026-07-24T14:50:00",
    entryPrice: 168.90, exitPrice: 172.30, stopLoss: 167.00, takeProfit: 173.00, quantity: 55,
    pnl: 187, pnlPercent: 2.01, fees: 6.75, tags: ["Momentum"], setup: "Channel Break",
    emotion: "Calm", mistake: null, lesson: "Ride the trend", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "Momentum",
    riskPercent: 1.0, rMultiple: 2.0, duration: "3h 35m",
    candles: trade8Candles, events: trade8Events, notes: "Channel break trade. Clean entry and exit.", screenshots: ["chart-channel.png"], annotations: [],
  },
  {
    id: "9", symbol: "SPY", direction: "long", entryDate: "2026-07-23T09:45:00", exitDate: "2026-07-23T15:30:00",
    entryPrice: 556.20, exitPrice: 559.80, stopLoss: 554.00, takeProfit: 560.00, quantity: 100,
    pnl: 360, pnlPercent: 0.65, fees: 8.00, tags: ["Index", "Swing"], setup: "VWAP Hold",
    emotion: "Bored", mistake: "Position too small", lesson: "Size up on high conviction", status: "closed",
    market: "Stocks", broker: "Interactive Brokers", session: "New York", strategy: "VWAP",
    riskPercent: 0.6, rMultiple: 2.0, duration: "5h 45m",
    candles: trade9Candles, events: trade9Events, notes: "High conviction VWAP hold trade. Should have sized up significantly.", screenshots: ["chart-vwap.png"], annotations: [],
  },
];

export function getAiReviewForTrade(tradeId: string): AiReview {
  const badTradeIds = ["3", "6"];
  return badTradeIds.includes(tradeId) ? mockAiReviewBad : mockAiReview;
}
