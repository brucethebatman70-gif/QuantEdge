"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { usePlaybookStore } from "@/lib/playbooks/store";
import { PLAYBOOK_CATEGORIES, type PlaybookCategory } from "@/lib/playbooks/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap: Icons.Zap,
  TrendingUp: Icons.TrendingUp,
  Layers: Icons.Layers,
  Brain: Icons.Brain,
  Droplets: Icons.Droplets,
  ArrowUpRight: Icons.ArrowUpRight,
  LineChart: Icons.LineChart,
  Repeat: Icons.Repeat,
  Radio: Icons.Radio,
  Wrench: Icons.Wrench,
  Star: Icons.Star,
  Archive: Icons.Archive,
};

export function PlaybookSidebar() {
  const { sidebarCategory, setSidebarCategory, playbooks } = usePlaybookStore();

  const getCount = (category: PlaybookCategory | "all") => {
    if (category === "all") return playbooks.filter((p) => !p.isArchived).length;
    if (category === "favorites") return playbooks.filter((p) => p.isFavorite && !p.isArchived).length;
    if (category === "archived") return playbooks.filter((p) => p.isArchived).length;
    return playbooks.filter((p) => p.category === category && !p.isArchived).length;
  };

  return (
    <div className="w-56 border-r border-border flex flex-col h-full bg-sidebar">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icons.FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-sidebar-foreground">Categories</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        <button
          onClick={() => setSidebarCategory("all")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            sidebarCategory === "all"
              ? "bg-primary/10 text-primary font-medium"
              : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          }`}
        >
          <Icons.List className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">All Playbooks</span>
          <span className="text-xs text-muted-foreground">{getCount("all")}</span>
        </button>

        <div className="h-px bg-border my-2" />

        {PLAYBOOK_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Icons.FileText;
          const count = getCount(cat.value);
          const isActive = sidebarCategory === cat.value;

          return (
            <motion.button
              key={cat.value}
              onClick={() => setSidebarCategory(cat.value)}
              whileHover={{ x: 2 }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{cat.label}</span>
              {count > 0 && (
                <span className="text-xs text-muted-foreground">{count}</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
