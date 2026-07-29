"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { getAiAnalysis } from "@/lib/backtesting/mock-backtesting";
import { useBacktestingStore } from "@/lib/backtesting/store";

export function AiAnalysis() {
  const { selectedStrategyId } = useBacktestingStore();

  const analysis = useMemo(() => {
    if (!selectedStrategyId) return null;
    return getAiAnalysis(selectedStrategyId);
  }, [selectedStrategyId]);

  if (!analysis) {
    return (
      <Card>
        <CardContent className="flex h-[200px] items-center justify-center">
          <p className="text-xs text-muted-foreground">Select a strategy to see AI analysis</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">AI Strategy Analysis</CardTitle>
          <Badge variant={analysis.overallScore >= 80 ? "success" : analysis.overallScore >= 60 ? "warning" : "destructive"} className="text-[10px]">
            Score: {analysis.overallScore}/100
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Progress value={analysis.overallScore} className="h-2"
            indicatorClassName={analysis.overallScore >= 80 ? "bg-success" : analysis.overallScore >= 60 ? "bg-warning" : "bg-error"} />
        </div>

        <Section title="Strengths">
          <p className="text-xs text-muted-foreground leading-relaxed">{analysis.strength}</p>
        </Section>

        <Separator />

        <Section title="Weaknesses">
          <div className="space-y-1">
            {analysis.weaknesses.map((w, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-error text-[10px] mt-0.5">⚠</span>
                <span className="text-xs text-muted-foreground">{w}</span>
              </div>
            ))}
          </div>
        </Section>

        <Separator />

        <Section title="Risk Review">
          <p className="text-xs text-muted-foreground leading-relaxed">{analysis.riskReview}</p>
        </Section>

        <Separator />

        <div className="grid grid-cols-2 gap-3">
          <Section title="Market Suitability">
            <div className="space-y-1">
              {analysis.marketSuitability.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">{m}</span>
                </div>
              ))}
            </div>
          </Section>

          <div className="space-y-3">
            <Section title="Best Session">
              <p className="text-xs font-medium text-foreground">{analysis.bestSession}</p>
            </Section>
            <Section title="Best Pair">
              <p className="text-xs font-medium text-foreground">{analysis.bestPair}</p>
            </Section>
          </div>
        </div>

        <Separator />

        <Section title="Optimization Suggestions">
          <div className="space-y-1">
            {analysis.optimizationSuggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg bg-primary/5 p-2">
                <span className="text-primary text-[10px] mt-0.5">💡</span>
                <span className="text-xs text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </Section>
      </CardContent>
    </Card>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}
