"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { useReportsStore } from "@/lib/reports/store";
import { REPORT_SECTION_LABELS, REPORT_TYPE_SHORT, type ReportSectionId } from "@/lib/reports/types";

const SECTION_GROUPS = [
  { label: "Performance", sections: ["performance_summary", "pnl", "win_rate", "profit_factor", "avg_rr"] as ReportSectionId[] },
  { label: "Risk", sections: ["drawdown", "risk_analysis", "sharpe_ratio", "consistency_score"] as ReportSectionId[] },
  { label: "Analysis", sections: ["strategy_performance", "market_performance", "trade_distribution"] as ReportSectionId[] },
  { label: "Summary", sections: ["psychology_summary", "goal_progress", "journal_summary", "replay_summary"] as ReportSectionId[] },
];

const CHART_TYPES = [
  { id: "equity_curve" as const, label: "Equity Curve", icon: "TrendingUp" },
  { id: "drawdown" as const, label: "Drawdown", icon: "TrendingDown" },
  { id: "pnl_distribution" as const, label: "PnL Distribution", icon: "BarChart3" },
  { id: "market_breakdown" as const, label: "Market Breakdown", icon: "PieChart" },
  { id: "strategy_breakdown" as const, label: "Strategy Breakdown", icon: "Layers" },
  { id: "risk_analysis" as const, label: "Risk Analysis", icon: "Shield" },
  { id: "calendar_heatmap" as const, label: "Calendar Heatmap", icon: "Calendar" },
  { id: "performance_timeline" as const, label: "Performance Timeline", icon: "Activity" },
];

const CHART_ICONS: Record<string, React.ElementType> = {
  TrendingUp: Icons.TrendingUp, TrendingDown: Icons.TrendingDown, BarChart3: Icons.BarChart3,
  PieChart: Icons.PieChart, Layers: Icons.Layers, Shield: Icons.Shield,
  Calendar: Icons.Calendar, Activity: Icons.Activity,
};

export function ReportBuilder() {
  const { templates, reports } = useReportsStore();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]?.id ?? "");
  const [enabledSections, setEnabledSections] = useState<Set<string>>(new Set(templates[0]?.sections.map((s) => s.id) ?? []));

  const toggleSection = (id: string) => {
    const next = new Set(enabledSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setEnabledSections(next);
  };

  const recentReports = reports.filter((r) => r.status === "ready").slice(0, 3);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.Sliders className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Report Builder</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Icons.Save className="mr-2 h-3 w-3" />Save Template
          </Button>
          <Button size="sm">
            <Icons.PlayCircle className="mr-2 h-3 w-3" />Generate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_240px] divide-x divide-border">
        <div className="p-4 space-y-5">
          <div>
            <label className="text-xs font-medium text-foreground mb-2 block">Template</label>
            <div className="flex gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTemplate(t.id); setEnabledSections(new Set(t.sections.map((s) => s.id))); }}
                  className={`px-3 py-2 rounded-lg border text-left transition-all flex-1 ${
                    selectedTemplate === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <p className="text-xs font-medium text-foreground">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-2 block">Sections</label>
            <div className="space-y-3">
              {SECTION_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{group.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.sections.map((sid) => {
                      const active = enabledSections.has(sid);
                      return (
                        <button
                          key={sid}
                          onClick={() => toggleSection(sid)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                            active ? "bg-primary/10 text-primary ring-1 ring-primary" : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {REPORT_SECTION_LABELS[sid]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-2 block">Charts</label>
            <div className="grid grid-cols-4 gap-2">
              {CHART_TYPES.map((ch) => {
                const Icon = CHART_ICONS[ch.icon] || Icons.BarChart3;
                const active = enabledSections.has(ch.id);
                return (
                  <button
                    key={ch.id}
                    onClick={() => toggleSection(ch.id)}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-lg border transition-all ${
                      active ? "border-primary/30 bg-primary/5" : "border-border hover:border-primary/20"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-foreground" />
                    <span className="text-[9px] text-muted-foreground text-center leading-tight">{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2">Date Range</h4>
            <div className="space-y-1.5">
              {["Last 7 Days", "Last 30 Days", "Last Quarter", "Custom"].map((label) => (
                <button key={label} className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2">Branding</h4>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">#6366f1</span>
            </div>
          </div>

          {recentReports.length > 0 && (
            <div className="border-t border-border pt-3">
              <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2">Recent</h4>
              <div className="space-y-1.5">
                {recentReports.map((r) => (
                  <div key={r.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-foreground truncate max-w-[140px]">{r.title}</p>
                      <p className="text-[9px] text-muted-foreground">{REPORT_TYPE_SHORT[r.type]} • {r.dateRange.start}</p>
                    </div>
                    <Badge variant="secondary" className="text-[8px]">{r.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
