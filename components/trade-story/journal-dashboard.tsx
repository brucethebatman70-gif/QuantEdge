"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useJournalStore } from "@/lib/journal/store";
import { ACHIEVEMENTS } from "./story-types";

function StatCard({ icon, label, value, change, color }: { icon: string; label: string; value: string; change?: string; color?: string }) {
  const Icon = Icons[icon as keyof typeof Icons] || Icons.HelpCircle;
  return (
    <div className="rounded-xl border border-white/[0.06] p-3.5 bg-white/[0.02] hover:bg-white/[0.03] transition-all">
      <div className="flex items-center gap-3">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", color ? `${color}/10` : "bg-white/[0.04]")}>
          <Icon className={cn("w-4 h-4", color || "text-muted-foreground/60")} />
        </div>
        <div>
          <p className="text-[18px] font-bold text-foreground/90">{value}</p>
          <p className="text-[10px] text-muted-foreground/50">{label}</p>
        </div>
      </div>
      {change && (
        <div className="mt-2 flex items-center gap-1">
          <Icons.TrendingUp className="w-3 h-3 text-success" />
          <span className="text-[9px] text-success/70">{change}</span>
        </div>
      )}
    </div>
  );
}

function StreakBadge({ days }: { days: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-warning/10 to-error/5 border border-warning/10">
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icons.Flame className="w-5 h-5 text-warning" />
      </motion.div>
      <div>
        <span className="text-sm font-bold text-warning">{days}</span>
        <span className="text-[10px] text-warning/60 ml-1">day streak</span>
      </div>
    </div>
  );
}

function RecentEntry({ entry, onClick }: { entry: { id: string; title: string; date: string; emotion?: string }; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-all text-left group"
    >
      <div className="w-2 h-2 rounded-full bg-primary/50 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-foreground/80 truncate">{entry.title || "Untitled"}</p>
        <p className="text-[10px] text-muted-foreground/40">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
      </div>
      {entry.emotion && <span className="text-sm shrink-0">{entry.emotion}</span>}
      <Icons.ChevronRight className="w-3 h-3 text-muted-foreground/20 group-hover:text-muted-foreground/50 transition-all" />
    </button>
  );
}

function CalendarHeatmap() {
  const days = useMemo(() => {
    const result = [];
    const today = new Date();
    for (let i = 41; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const day = d.getDay();
      if (day === 0 || day === 6) continue;
      const r = Math.random();
      result.push({
        date: d,
        value: r < 0.2 ? 0 : r < 0.4 ? 1 : r < 0.6 ? 2 : 3,
      });
    }
    return result;
  }, []);

  const colorMap = ["bg-white/[0.02]", "bg-success/15", "bg-success/30", "bg-success/50"];

  return (
    <div className="space-y-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Trading Activity</span>
      <div className="flex flex-wrap gap-[3px]">
        {days.map((d, i) => (
          <div
            key={i}
            className={cn("w-3 h-3 rounded-[3px] transition-colors", colorMap[d.value])}
            title={d.date.toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
}

function EmotionTimeline({ entries }: { entries: { date: string; emotion: string | null }[] }) {
  const emotions = entries.slice(-10);

  const emojiMap: Record<string, string> = {
    confident: "😎", calm: "😌", neutral: "😐",
    anxious: "😰", fomo: "😵", greedy: "💰",
    fearful: "😨", frustrated: "😠", hopeful: "🙏",
    patient: "🧐", aggressive: "🔥", impatient: "⏳",
    bored: "😒",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Emotion Timeline</span>
        <span className="text-[9px] text-muted-foreground/30">Last 10 entries</span>
      </div>
      <div className="flex items-end gap-2 h-10">
        {emotions.map((e, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <span className="text-sm">{emojiMap[e.emotion || ""] || "😐"}</span>
            <div className={cn(
              "w-full h-1 rounded-full",
              e.emotion && ["confident", "calm", "patient"].includes(e.emotion) ? "bg-success/40" :
              e.emotion && ["anxious", "fomo", "fearful", "frustrated", "aggressive", "impatient"].includes(e.emotion) ? "bg-error/40" :
              "bg-muted-foreground/20"
            )} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function JournalDashboard({ onOpenJournal, onOpenTrades }: { onOpenJournal: () => void; onOpenTrades: () => void }) {
  const entries = useJournalStore((s) => s.entries);
  const setSelected = useJournalStore((s) => s.setSelected);
  const createNewEntry = useJournalStore((s) => s.createNewEntry);

  const stats = useMemo(() => {
    const published = entries.filter((e) => e.status === "published");
    const withMistake = entries.filter((e) => e.execution.mistake);
    const avgScore = entries.reduce((s, e) => s + (e.aiScore ?? 0), 0) / Math.max(entries.length, 1);
    return {
      total: entries.length,
      published: published.length,
      mistakeRate: entries.length > 0 ? Math.round((withMistake.length / entries.length) * 100) : 0,
      avgScore: Math.round(avgScore),
      streak: 6,
      thisWeek: published.filter((e) => {
        const d = new Date(e.date);
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 86400000);
        return d >= weekAgo;
      }).length,
    };
  }, [entries]);

  const recentEntries = useMemo(() =>
    [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5),
    [entries]
  );

  const achievements = useMemo(() => ACHIEVEMENTS.filter((a) => a.unlocked).slice(0, 4), []);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-5 space-y-5">
        {/* Welcome + Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground/90">Journal Dashboard</h1>
            <p className="text-xs text-muted-foreground/50 mt-0.5">Track your trading journey and improve every day</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={createNewEntry}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all"
            >
              <Icons.Plus className="w-4 h-4" /> New Entry
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard icon="BookOpen" label="Total Entries" value={String(stats.total)} change="+3 this week" color="text-primary" />
          <StatCard icon="Brain" label="Avg AI Score" value={String(stats.avgScore)} color="text-accent" />
          <StatCard icon="AlertTriangle" label="Mistake Rate" value={`${stats.mistakeRate}%`} color="text-warning" />
          <StatCard icon="TrendingUp" label="This Week" value={String(stats.thisWeek)} color="text-success" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Streak + Recent */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <StreakBadge days={stats.streak} />
              <div className="flex-1 rounded-xl border border-white/[0.06] p-3 bg-white/[0.02]">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Consistency Score</span>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                  <span className="text-xs font-bold text-primary">78%</span>
                </div>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="rounded-xl border border-white/[0.06] p-3 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Recent Entries</span>
                <button onClick={onOpenJournal} className="text-[10px] text-muted-foreground/40 hover:text-foreground/70 transition-colors">View all</button>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {recentEntries.map((entry) => (
                  <RecentEntry
                    key={entry.id}
                    entry={{ id: entry.id, title: entry.title, date: entry.date, emotion: entry.psychology.emotion || undefined }}
                    onClick={() => { setSelected(entry.id); onOpenJournal(); }}
                  />
                ))}
              </div>
            </div>

            {/* Calendar */}
            <CalendarHeatmap />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Emotion Timeline */}
            <div className="rounded-xl border border-white/[0.06] p-3 bg-white/[0.02]">
              <EmotionTimeline entries={entries.map((e) => ({ date: e.date, emotion: e.psychology.emotion }))} />
            </div>

            {/* Achievements */}
            <div className="rounded-xl border border-white/[0.06] p-3 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">Achievements</span>
                <span className="text-[9px] text-muted-foreground/30">{achievements.length}/{ACHIEVEMENTS.length}</span>
              </div>
              <div className="space-y-1.5">
                {achievements.map((a) => {
                  const Icon = Icons[a.icon as keyof typeof Icons] || Icons.Trophy;
                  return (
                    <div key={a.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-white/[0.02]">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-foreground/70 truncate">{a.label}</p>
                        <p className="text-[9px] text-muted-foreground/40">{a.unlockedAt ? new Date(a.unlockedAt).toLocaleDateString() : ""}</p>
                      </div>
                      <Icons.Check className="w-3 h-3 text-success" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-white/[0.06] p-3 bg-white/[0.02] space-y-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40 block mb-1">Quick Actions</span>
              <button onClick={createNewEntry} className="flex w-full items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white/[0.03] text-[11px] text-foreground/60 hover:text-foreground/80 transition-all">
                <Icons.Edit3 className="w-3.5 h-3.5" /> New Journal Entry
              </button>
              <button onClick={onOpenTrades} className="flex w-full items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white/[0.03] text-[11px] text-foreground/60 hover:text-foreground/80 transition-all">
                <Icons.Table className="w-3.5 h-3.5" /> View Trades
              </button>
              <button className="flex w-full items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white/[0.03] text-[11px] text-foreground/60 hover:text-foreground/80 transition-all">
                <Icons.Brain className="w-3.5 h-3.5" /> AI Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
