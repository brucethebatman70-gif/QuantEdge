"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/lib/icons";
import type { PlaybookExample } from "@/lib/playbooks/types";
import { formatCurrency } from "@/lib/utils";

interface Props {
  examples: PlaybookExample[];
}

export function PlaybookExamples({ examples }: Props) {
  if (examples.length === 0) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icons.Image className="h-4 w-4 text-primary" />
          Examples
        </h3>
        <p className="text-xs text-muted-foreground italic">No examples added yet. Add winning and losing trades to validate this strategy.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <Icons.Image className="h-4 w-4 text-primary" />
        Examples ({examples.length})
      </h3>
      <div className="space-y-2">
        {examples.map((ex) => (
          <Card key={ex.id} className={`border-l-2 ${ex.type === "winning" ? "border-l-success" : "border-l-error"}`}>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={ex.type === "winning" ? "success" : "destructive"} className="text-[10px] uppercase">
                      {ex.type}
                    </Badge>
                    <span className="text-xs font-medium text-foreground">{ex.title}</span>
                  </div>
                  {ex.date && <span className="text-[10px] text-muted-foreground">{ex.date}</span>}
                </div>
                {ex.pnl !== undefined && (
                  <span className={`text-xs font-medium ${ex.pnl >= 0 ? "text-success" : "text-error"}`}>
                    {formatCurrency(ex.pnl)}
                  </span>
                )}
              </div>
              {ex.description && (
                <p className="text-xs text-muted-foreground">{ex.description}</p>
              )}
              <div className="flex items-center gap-1">
                {ex.replayLink && (
                  <Button variant="ghost" size="xs">
                    <Icons.PlayCircle className="mr-1 h-3 w-3" />
                    Replay
                  </Button>
                )}
                {ex.journalLink && (
                  <Button variant="ghost" size="xs">
                    <Icons.BookOpen className="mr-1 h-3 w-3" />
                    Journal
                  </Button>
                )}
                {ex.analyticsLink && (
                  <Button variant="ghost" size="xs">
                    <Icons.BarChart3 className="mr-1 h-3 w-3" />
                    Analytics
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
