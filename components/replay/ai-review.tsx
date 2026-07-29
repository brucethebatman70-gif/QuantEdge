"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { getAiReviewForTrade } from "@/lib/replay/mock-replay";
import { mockReplayTrades } from "@/lib/replay/mock-replay";

export function AiReview({ tradeId }: { tradeId: string }) {
  const review = useMemo(() => getAiReviewForTrade(tradeId), [tradeId]);
  const trade = useMemo(() => mockReplayTrades.find((t) => t.id === tradeId), [tradeId]);

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Execution Score</span>
          <span className={cn(
            "text-lg font-bold",
            review.executionScore >= 70 ? "text-success" : review.executionScore >= 40 ? "text-warning" : "text-error"
          )}>
            {review.executionScore}/100
          </span>
        </div>
        <Progress
          value={review.executionScore}
          className="mt-1.5 h-1.5"
          indicatorClassName={review.executionScore >= 70 ? "bg-success" : review.executionScore >= 40 ? "bg-warning" : "bg-error"}
        />
      </div>

      <Separator />

      <Section label="Entry Analysis">
        <p className="text-xs text-muted-foreground leading-relaxed">{review.entryAnalysis}</p>
      </Section>

      <Separator />

      <Section label="Exit Analysis">
        <p className="text-xs text-muted-foreground leading-relaxed">{review.exitAnalysis}</p>
      </Section>

      <Separator />

      <Section label="Risk Review">
        <p className="text-xs text-muted-foreground leading-relaxed">{review.riskReview}</p>
      </Section>

      {review.ruleViolations.length > 0 && (
        <>
          <Separator />
          <Section label="Rule Violations">
            <div className="space-y-1">
              {review.ruleViolations.map((v, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md bg-error/5 p-2">
                  <span className="mt-0.5 text-error text-[10px]">⚠</span>
                  <div className="flex-1">
                    <p className="text-[11px] text-error">{v.rule}</p>
                    <Badge variant={v.severity === "high" ? "destructive" : v.severity === "medium" ? "warning" : "secondary"} className="text-[8px] px-1 mt-0.5">
                      {v.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      <Separator />

      <Section label="Emotional Notes">
        <p className="text-xs text-muted-foreground leading-relaxed">{review.emotionalNotes}</p>
      </Section>

      <Separator />

      <Section label="Improvement Suggestions">
        <div className="space-y-1">
          {review.improvements.map((imp, i) => (
            <div key={i} className="flex items-start gap-2 rounded-md bg-primary/5 p-2">
              <span className="mt-0.5 text-primary text-[10px]">💡</span>
              <p className="text-[11px] text-foreground">{imp}</p>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <div className="flex items-center justify-between rounded-lg border border-border/50 p-2.5">
        <span className="text-[10px] font-medium text-muted-foreground">Confidence Rating</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-3 w-2 rounded-sm transition-colors",
                i < review.confidenceRating ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}
