import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("Demo1234!", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@quantedge.com" },
    update: {},
    create: { id: "user_1", email: "demo@quantedge.com", firstName: "Demo", lastName: "User", password, emailVerified: true },
  });

  await prisma.journalEntry.createMany({
    data: [
      { userId: user.id, date: new Date(Date.now()), title: "AAPL Earnings Momentum Play", content: "Strong earnings breakout trade with disciplined execution.", status: "published", tags: JSON.stringify(["Breakout", "Earnings", "Tech"]), session: "morning", marketConditions: "Risk-on, tech leading", emotion: "confident", energyLevel: 8, confidence: 7, discipline: 8, psychologyNotes: "Felt good about this trade from the start.", triggers: JSON.stringify(["Earnings gap", "Volume spike"]), planFollowed: true, entryTiming: 4, exitTiming: 3, riskManagement: 4, lessonLearned: "Trusting the pattern paid off.", aiSummary: "Strong earnings momentum trade.", aiScore: 82 },
      { userId: user.id, date: new Date(Date.now()), title: "TSLA Short - Resistance Rejection", content: "Triple top rejection at $270.", status: "published", tags: JSON.stringify(["Reversal", "Resistance", "Short"]), session: "morning", marketConditions: "Mixed, low vol", emotion: "patient", energyLevel: 7, confidence: 6, discipline: 7, psychologyNotes: "Waited for confirmation.", triggers: JSON.stringify(["Triple top", "RSI divergence"]), planFollowed: true, entryTiming: 5, exitTiming: 3, riskManagement: 4, lessonLearned: "Multiple confirmations increase probability.", aiSummary: "Well-executed reversal.", aiScore: 88 },
      { userId: user.id, date: new Date(Date.now() - 86400000), title: "NVDA FOMO - Lessons Learned", content: "Chased a breakout and got stopped out.", status: "published", tags: JSON.stringify(["Mistake", "FOMO", "Lesson"]), session: "afternoon", marketConditions: "Low volume, choppy", emotion: "fomo", energyLevel: 9, confidence: 3, discipline: 2, psychologyNotes: "Boredom led to revenge trading.", triggers: JSON.stringify(["Missing moves", "Slow morning"]), planFollowed: false, entryTiming: 1, exitTiming: 2, riskManagement: 1, mistake: "chased", mistakeNote: "Chased breakout with market order.", lessonLearned: "Boredom is the enemy of discipline.", aiSummary: "FOMO impulse trade.", aiScore: 25 },
      { userId: user.id, date: new Date(Date.now() - 86400000 * 2), title: "MSFT Pullback Setup", content: "Textbook 50EMA bounce.", status: "published", tags: JSON.stringify(["Pullback", "Swing", "Tech"]), session: "morning", marketConditions: "Bullish, above avg volume", emotion: "calm", energyLevel: 7, confidence: 7, discipline: 8, psychologyNotes: "Preparation made execution easy.", triggers: JSON.stringify(["EMA support", "Volume drying up"]), planFollowed: true, entryTiming: 5, exitTiming: 4, riskManagement: 4, lessonLearned: "Night-before prep is essential.", aiSummary: "Textbook swing trade.", aiScore: 90 },
      { userId: user.id, date: new Date(Date.now() - 86400000 * 3), title: "SPY Gap Fill - Range Extension", content: "CPI gap-down recovery.", status: "published", tags: JSON.stringify(["Gap Fill", "SPY", "Morning"]), session: "morning", marketConditions: "CPI gap, recovery buying", emotion: "calm", energyLevel: 8, confidence: 7, discipline: 9, psychologyNotes: "Opening range showed the direction.", triggers: JSON.stringify(["CPI gap", "Opening range breakout"]), planFollowed: true, entryTiming: 5, exitTiming: 4, riskManagement: 4, lessonLearned: "Don't overthink gap-fills.", aiSummary: "Excellent gap-fill trade.", aiScore: 87 },
    ],
  });

  await prisma.goal.createMany({
    data: [
      { userId: user.id, title: "Daily Win Rate > 60%", target: 60, current: 67.8, unit: "percent", category: "performance", status: "active" },
      { userId: user.id, title: "Max 3 Trades Per Day", target: 3, current: 2.4, unit: "trades", category: "discipline", status: "active" },
      { userId: user.id, title: "No Revenge Trades", target: 30, current: 12, unit: "days", category: "psychology", status: "active" },
      { userId: user.id, title: "Profit Target $5,000", target: 5000, current: 3850, unit: "usd", category: "performance", status: "active" },
    ],
  });

  await prisma.playbook.createMany({
    data: [
      { userId: user.id, name: "Opening Range Breakout", description: "Trade the breakout of the first 5-minute range", setup: "Opening Range", direction: "long", entryRules: JSON.stringify(["Price breaks above OR high", "Volume > 1.5x avg"]), exitRules: JSON.stringify(["Target: 2x range", "Stop: below OR low"]), tags: JSON.stringify(["Scalp", "Morning", "High Probability"]), winRate: 73, totalTrades: 45, pnl: 8420, status: "active" },
      { userId: user.id, name: "20EMA Pullback", description: "Buy the first pullback to 20EMA in an uptrend", setup: "Pullback", direction: "long", entryRules: JSON.stringify(["Trend identified on daily", "Price touches 20EMA", "Volume declining"]), exitRules: JSON.stringify(["Trailing stop 2x ATR", "Scale out 50% at 1:2"]), tags: JSON.stringify(["Swing", "Trend", "EMAs"]), winRate: 68, totalTrades: 32, pnl: 12400, status: "active" },
      { userId: user.id, name: "Gap Fill", description: "Trade the gap fill after economic news", setup: "Gap", direction: "long", entryRules: JSON.stringify(["Gap > 0.5%", "First 5m candle green"]), exitRules: JSON.stringify(["Fill 100% of gap", "Stop below gap low"]), tags: JSON.stringify(["Gap", "News", "Reversal"]), winRate: 71, totalTrades: 28, pnl: 5600, status: "active" },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
