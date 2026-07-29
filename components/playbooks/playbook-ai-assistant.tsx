"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/lib/icons";
import { usePlaybookStore } from "@/lib/playbooks/store";
import type { AiAnalysis } from "@/lib/playbooks/types";

export function PlaybookAiAssistant() {
  const { selectedId, playbooks, analyzePlaybook } = usePlaybookStore();
  const [showQuestions, setShowQuestions] = useState(false);
  const playbook = selectedId ? playbooks.find((p) => p.id === selectedId) : null;

  const analysis: AiAnalysis | null = useMemo(() => {
    if (!selectedId) return null;
    return analyzePlaybook(selectedId);
  }, [selectedId, playbooks]);

  if (!playbook || !analysis) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
        <Icons.Bot className="h-8 w-8 mb-2 opacity-20" />
        <p className="text-xs text-center">Select a playbook to analyze</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Icons.Bot className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">AI Analysis</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Completeness Score</span>
            <span className="font-medium text-foreground">{analysis.confidenceScore}%</span>
          </div>
          <Progress value={analysis.confidenceScore} className="h-1.5" />
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-foreground leading-relaxed">{analysis.summary}</p>
        </div>

        {analysis.suggestions.length > 0 && (
          <Section icon={Icons.Lightbulb} label="Suggestions" color="text-warning">
            {analysis.suggestions.map((s, i) => (
              <ListItem key={i}>{s}</ListItem>
            ))}
          </Section>
        )}

        {analysis.weaknesses.length > 0 && (
          <Section icon={Icons.AlertTriangle} label="Weaknesses" color="text-error">
            {analysis.weaknesses.map((w, i) => (
              <ListItem key={i}>{w}</ListItem>
            ))}
          </Section>
        )}

        {analysis.missingRules.length > 0 && (
          <Section icon={Icons.XCircle} label="Missing Rules" color="text-warning">
            {analysis.missingRules.map((r, i) => (
              <ListItem key={i}>{r}</ListItem>
            ))}
          </Section>
        )}

        <div>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setShowQuestions(!showQuestions)}
            className="text-xs"
          >
            <Icons.HelpCircle className="mr-1 h-3 w-3" />
            Review Questions
            <Icons.ChevronDown className={`ml-1 h-3 w-3 transition-transform ${showQuestions ? "rotate-180" : ""}`} />
          </Button>
          {showQuestions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-2 space-y-1.5"
            >
              {analysis.reviewQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/30 mt-1.5 shrink-0" />
                  {q}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

function Section({ icon: Icon, label, color, children }: { icon: React.ElementType; label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        {label}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-xs text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-primary/40 mt-1.5 shrink-0" />
      {children}
    </div>
  );
}
