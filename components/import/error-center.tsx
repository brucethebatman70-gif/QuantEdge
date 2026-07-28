"use client";

import { Icons } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ValidationIssue } from "@/lib/import/types";

interface ErrorCenterProps {
  message: string;
  details?: ValidationIssue[];
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function ErrorCenter({ message, details, onRetry, onDismiss }: ErrorCenterProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error/10 mb-4">
        <Icons.AlertTriangle className="h-8 w-8 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-error mb-2">Import Failed</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">{message}</p>

      {details && details.length > 0 && (
        <Card className="w-full max-w-md mb-6">
          <CardContent className="p-0">
            <ScrollArea className="max-h-[200px]">
              <div className="divide-y divide-border/50">
                {details.slice(0, 10).map((issue) => (
                  <div key={issue.id} className="flex items-start gap-3 p-3 text-sm">
                    <Icons.XCircle className="h-4 w-4 text-error mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium">{issue.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{issue.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        {onRetry && (
          <Button onClick={onRetry}>
            <Icons.RefreshCw className="mr-1.5 h-4 w-4" /> Retry Import
          </Button>
        )}
        {onDismiss && (
          <Button variant="outline" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
      </div>
    </div>
  );
}
