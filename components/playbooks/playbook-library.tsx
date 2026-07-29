"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/lib/icons";
import { usePlaybookStore, filterPlaybooks } from "@/lib/playbooks/store";
import { RISK_PROFILES, DIFFICULTIES } from "@/lib/playbooks/types";

export function PlaybookLibrary() {
  const store = usePlaybookStore();
  const { playbooks, filter, sidebarCategory, setSelectedPlaybook, toggleFavorite } = store;
  const filtered = filterPlaybooks(playbooks, filter, sidebarCategory);

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case "beginner": return "text-success";
      case "intermediate": return "text-warning";
      case "advanced": return "text-error";
      case "expert": return "text-error";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <Icons.FileText className="h-12 w-12 mb-4 opacity-20" />
          <p className="text-sm font-medium">No playbooks found</p>
          <p className="text-xs mt-1">Create a new playbook or adjust your filters</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((pb, i) => (
            <motion.div
              key={pb.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card
                className="group cursor-pointer hover:border-primary/30 transition-colors h-full"
                onClick={() => setSelectedPlaybook(pb.id)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                      {pb.category}
                    </Badge>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(pb.id); }}
                      className={`transition-colors ${pb.isFavorite ? "text-warning" : "text-muted-foreground opacity-0 group-hover:opacity-100"}`}
                    >
                      <Icons.Star className={`h-4 w-4 ${pb.isFavorite ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground leading-tight">{pb.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{pb.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {pb.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                    {pb.tags.length > 3 && (
                      <Badge variant="outline" className="text-[10px]">
                        +{pb.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className={`${getDifficultyColor(pb.difficulty)} font-medium`}>
                      {DIFFICULTIES.find((d) => d.value === pb.difficulty)?.label}
                    </span>
                    <span className={`${RISK_PROFILES.find((r) => r.value === pb.riskProfile)?.color}`}>
                      {RISK_PROFILES.find((r) => r.value === pb.riskProfile)?.label} Risk
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-border">
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant={pb.winRate >= 65 ? "success" : "warning"} className="text-[10px]">
                        {pb.winRate}% WR
                      </Badge>
                      <span className="text-muted-foreground">{pb.totalTrades} trades</span>
                    </div>
                    <span className="text-xs font-medium text-primary">
                      {pb.expectedRR}:1 R
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
