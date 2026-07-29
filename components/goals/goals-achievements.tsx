"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/lib/icons";
import { useGoalsStore } from "@/lib/goals/store";
import { ACHIEVEMENT_RARITY_COLORS } from "@/lib/goals/types";

const ACHIEVEMENT_ICONS: Record<string, React.ElementType> = {
  Award: Icons.Award, Flame: Icons.Flame, Crown: Icons.Crown, Shield: Icons.Shield,
  BookOpen: Icons.BookOpen, PlayCircle: Icons.PlayCircle, Layers: Icons.Layers,
};

export function GoalsAchievements() {
  const { achievements } = useGoalsStore();

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-3.5 border-b border-border">
        <h3 className="text-xs font-semibold text-foreground">Achievements</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {achievements.filter((a) => a.unlocked).length} of {achievements.length} unlocked
        </p>
      </div>
      <div className="p-3.5 grid gap-2">
        {achievements.map((ach, i) => {
          const Icon = ACHIEVEMENT_ICONS[ach.icon] || Icons.Award;
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                ach.unlocked ? "bg-success/5 border-success/20" : ACHIEVEMENT_RARITY_COLORS[ach.rarity] + " bg-muted/20"
              }`}
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                ach.unlocked ? "bg-success/10" : "bg-muted"
              }`}>
                <Icon className={`h-4 w-4 ${ach.unlocked ? "text-success" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-semibold ${ach.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                    {ach.title}
                  </span>
                  <span className={`text-[8px] uppercase px-1 py-0.5 rounded ${
                    ach.rarity === "legendary" ? "bg-success/10 text-success" :
                    ach.rarity === "epic" ? "bg-warning/10 text-warning" :
                    ach.rarity === "rare" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>{ach.rarity}</span>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">{ach.description}</p>
                {!ach.unlocked && (
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={ach.progress} className="h-1 flex-1" />
                    <span className="text-[9px] text-muted-foreground">{ach.progress}%</span>
                  </div>
                )}
              </div>
              {ach.unlocked && (
                <span className="text-[9px] text-success shrink-0">
                  {ach.unlockedAt ? new Date(ach.unlockedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Unlocked"}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
