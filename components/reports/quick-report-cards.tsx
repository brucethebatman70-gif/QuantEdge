"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { useReportsStore } from "@/lib/reports/store";
import { REPORT_TYPE_SHORT, type ReportType } from "@/lib/reports/types";

const CARD_CONFIG: { type: ReportType; icon: keyof typeof CARD_ICONS; color: string }[] = [
  { type: "daily", icon: "Clock", color: "from-blue-500/20 to-blue-600/10" },
  { type: "weekly", icon: "Calendar", color: "from-emerald-500/20 to-emerald-600/10" },
  { type: "monthly", icon: "BarChart3", color: "from-violet-500/20 to-violet-600/10" },
  { type: "quarterly", icon: "Layers", color: "from-amber-500/20 to-amber-600/10" },
  { type: "yearly", icon: "Award", color: "from-rose-500/20 to-rose-600/10" },
  { type: "custom", icon: "Sliders", color: "from-cyan-500/20 to-cyan-600/10" },
];

const CARD_ICONS = {
  Clock: Icons.Clock, Calendar: Icons.Calendar, BarChart3: Icons.BarChart3,
  Layers: Icons.Layers, Award: Icons.Award, Sliders: Icons.Sliders,
};

export function QuickReportCards() {
  const { generateReport, templates } = useReportsStore();

  return (
    <div className="px-6 py-4 shrink-0">
      <div className="grid grid-cols-6 gap-3">
        {CARD_CONFIG.map((cfg, i) => {
          const Icon = CARD_ICONS[cfg.icon];
          return (
            <motion.button
              key={cfg.type}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => generateReport(cfg.type, templates[0]?.id ?? "")}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-3.5 text-left hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cfg.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center mb-2 group-hover:bg-background/50 transition-colors">
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
                <p className="text-xs font-semibold text-foreground">{REPORT_TYPE_SHORT[cfg.type]}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Generate report</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
