"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateTime } from "@/lib/utils";
import type { ImportHistoryItem } from "@/lib/import/types";
import { useState } from "react";

interface ImportHistoryProps {
  items: ImportHistoryItem[];
  onDelete: (id: string) => void;
  onReimport: (id: string) => void;
}

export function ImportHistory({ items, onDelete, onReimport }: ImportHistoryProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const statusBadge = (status: string) => {
    switch (status) {
      case "success": return <Badge variant="success" className="text-[9px] px-1.5">Success</Badge>;
      case "partial": return <Badge variant="warning" className="text-[9px] px-1.5">Partial</Badge>;
      case "failed": return <Badge variant="destructive" className="text-[9px] px-1.5">Failed</Badge>;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Import History</CardTitle>
        <Badge variant="secondary" className="text-[10px]">{items.length} imports</Badge>
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icons.Clock className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No import history yet</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[300px]">
            <div className="divide-y divide-border/50">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted shrink-0">
                    <Icons.Database className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{item.source}</p>
                      {statusBadge(item.status)}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {formatDateTime(item.date)} · {item.importedTrades} imported · {item.failedTrades} failed · {item.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon-xs" onClick={() => onReimport(item.id)} aria-label="Re-import">
                      <Icons.RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                    {confirmDelete === item.id ? (
                      <div className="flex gap-1">
                        <Button variant="destructive" size="icon-xs" onClick={() => { onDelete(item.id); setConfirmDelete(null); }} aria-label="Confirm delete">
                          <Icons.Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-xs" onClick={() => setConfirmDelete(null)} aria-label="Cancel delete">
                          <Icons.X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="icon-xs" onClick={() => setConfirmDelete(item.id)} aria-label="Delete">
                        <Icons.Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
