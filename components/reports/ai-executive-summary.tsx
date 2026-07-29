"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { useReportsStore } from "@/lib/reports/store";

function ScoreBar({ score }: { score?: number }) {
  if (score === undefined) return null;
  const color = score >= 70 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-error";
  const textColor = score >= 70 ? "text-success" : score >= 50 ? "text-warning" : "text-error";
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <Progress value={score} className="h-1 flex-1" indicatorClassName={color} />
      <span className={`text-[10px] font-bold ${textColor}`}>{score}%</span>
    </div>
  );
}

const TYPE_STYLES: Record<string, string> = {
  positive: "border-success/20 bg-success/5",
  negative: "border-error/20 bg-error/5",
  neutral: "border-border bg-muted/20",
  warning: "border-warning/20 bg-warning/5",
};
const TYPE_ICONS: Record<string, React.ReactNode> = {
  positive: <Icons.CheckCircle2 className="h-3 w-3 text-success" />,
  negative: <Icons.XCircle className="h-3 w-3 text-error" />,
  warning: <Icons.AlertTriangle className="h-3 w-3 text-warning" />,
  neutral: <Icons.Info className="h-3 w-3 text-muted-foreground" />,
};
const TYPE_BADGE: Record<string, "default" | "secondary" | "success" | "warning" | "destructive"> = {
  positive: "success", negative: "destructive", warning: "warning", neutral: "default",
};

export function AiExecutiveSummary() {
  const { reports } = useReportsStore();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const reportWithAI = reports.find((r) => r.aiSummary);
  if (!reportWithAI?.aiSummary) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <Icons.Sparkles className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">Generate a report with AI summary to see insights here.</p>
      </div>
    );
  }

  const ai = reportWithAI.aiSummary;
  const sections = [
    { title: "Performance Summary", key: "perf", icon: <Icons.TrendingUp className="h-4 w-4" />, data: ai.performanceSummary },
    { title: "Strengths", key: "strengths", icon: <Icons.CheckCircle2 className="h-4 w-4 text-success" />, data: ai.strengths, multi: true },
    { title: "Weaknesses", key: "weaknesses", icon: <Icons.XCircle className="h-4 w-4 text-error" />, data: ai.weaknesses, multi: true },
    { title: "Recommendations", key: "recs", icon: <Icons.Lightbulb className="h-4 w-4 text-accent" />, data: ai.recommendations, multi: true },
    { title: "Risk Warnings", key: "risk", icon: <Icons.AlertTriangle className="h-4 w-4 text-warning" />, data: ai.riskWarnings, multi: true },
    { title: "Next Week Focus", key: "focus", icon: <Icons.Target className="h-4 w-4" />, data: ai.nextWeekFocus },
    { title: "Monthly Action Plan", key: "plan", icon: <Icons.ListChecks className="h-4 w-4 text-primary" />, data: ai.monthlyActionPlan, multi: true },
  ];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Executive Summary</h3>
        </div>
        <Badge variant="secondary" className="text-[9px]">Auto-generated</Badge>
      </div>
      <ScrollArea className="h-[500px]">
        <div className="p-4 space-y-4">
          {sections.map((sec) => (
            <div key={sec.key}>
              <div className="flex items-center gap-2 mb-2">
                {sec.icon}
                <h4 className="text-xs font-semibold text-foreground">{sec.title}</h4>
              </div>
              {sec.multi ? (
                <div className="space-y-2">
                  {(sec.data as typeof ai.strengths).map((item, i) => {
                    const isOpen = expanded[`${sec.key}_${i}`];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={`rounded-lg border p-3 ${TYPE_STYLES[item.type] || "border-border bg-muted/20"}`}
                      >
                        <button
                          onClick={() => setExpanded((e) => ({ ...e, [`${sec.key}_${i}`]: !isOpen }))}
                          className="w-full text-left flex items-start justify-between gap-2"
                        >
                          <div className="flex items-center gap-1.5">
                            {TYPE_ICONS[item.type] || null}
                            <span className="text-[11px] font-medium text-foreground">{item.title}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Badge variant={TYPE_BADGE[item.type]} className="text-[9px]">{item.score ?? "—"}</Badge>
                            <Icons.ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="text-[11px] text-muted-foreground mt-2 leading-relaxed"
                            >
                              {item.content}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <ScoreBar score={item.score} />
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className={`rounded-lg border p-3 ${TYPE_STYLES[(sec.data as typeof ai.performanceSummary).type] || "border-border bg-muted/20"}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    {TYPE_ICONS[(sec.data as typeof ai.performanceSummary).type] || null}
                    <span className="text-[11px] font-medium text-foreground">{(sec.data as typeof ai.performanceSummary).title}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{(sec.data as typeof ai.performanceSummary).content}</p>
                  <ScoreBar score={(sec.data as typeof ai.performanceSummary).score} />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
