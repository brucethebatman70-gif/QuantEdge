"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/lib/icons";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { mockTrades } from "@/lib/mock-data";

export default function JournalPage() {
  const [search, setSearch] = useState("");

  const filtered = mockTrades.filter(t =>
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Trading Journal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Track and analyze every trade
          </p>
          <Button size="sm">
            <Icons.Plus className="mr-2 h-4 w-4" />
            New Trade
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({mockTrades.length})</TabsTrigger>
            <TabsTrigger value="longs">Longs</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Trade History</CardTitle>
                  <div className="relative w-64">
                    <Icons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search symbols..."
                      className="pl-9"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-3 text-left font-medium text-muted-foreground">Symbol</th>
                        <th className="pb-3 text-left font-medium text-muted-foreground">Dir</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Entry</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Exit</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Qty</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">P&L</th>
                        <th className="pb-3 text-left font-medium text-muted-foreground">Setup</th>
                        <th className="pb-3 text-left font-medium text-muted-foreground">Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((trade) => (
                        <tr key={trade.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                          <td className="py-3 font-medium">{trade.symbol}</td>
                          <td className="py-3">
                            <Badge variant={trade.direction === "long" ? "success" : "destructive"} className="text-[10px]">
                              {trade.direction.toUpperCase().slice(0, 1)}
                            </Badge>
                          </td>
                          <td className="py-3 text-right font-mono text-xs">${trade.entryPrice.toFixed(2)}</td>
                          <td className="py-3 text-right font-mono text-xs">
                            {trade.exitPrice ? `$${trade.exitPrice.toFixed(2)}` : "—"}
                          </td>
                          <td className="py-3 text-right">{trade.quantity}</td>
                          <td className={`py-3 text-right font-medium ${(trade.pnl ?? 0) >= 0 ? "text-success" : "text-error"}`}>
                            {trade.pnl !== null ? formatCurrency(trade.pnl) : "—"}
                            {trade.pnlPercent !== null && (
                              <span className="ml-1 text-xs opacity-70">{formatPercent(trade.pnlPercent)}</span>
                            )}
                          </td>
                          <td className="py-3 text-muted-foreground">{trade.setup}</td>
                          <td className="py-3">
                            <div className="flex gap-1">
                              {trade.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-[10px]">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="longs" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {mockTrades.filter(t => t.direction === "long").map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
                          <Icons.TrendingUp className="h-4 w-4 text-success" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{trade.symbol}</p>
                          <p className="text-xs text-muted-foreground">{trade.setup}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${(trade.pnl ?? 0) >= 0 ? "text-success" : "text-error"}`}>
                          {trade.pnl !== null ? formatCurrency(trade.pnl) : "—"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shorts" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {mockTrades.filter(t => t.direction === "short").map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-error/10">
                          <Icons.TrendingDown className="h-4 w-4 text-error" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{trade.symbol}</p>
                          <p className="text-xs text-muted-foreground">{trade.setup}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${(trade.pnl ?? 0) >= 0 ? "text-success" : "text-error"}`}>
                          {trade.pnl !== null ? formatCurrency(trade.pnl) : "—"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="open" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {mockTrades.filter(t => t.status === "open").map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                          <Icons.Clock className="h-4 w-4 text-warning" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{trade.symbol}</p>
                          <p className="text-xs text-muted-foreground">Entry: ${trade.entryPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      <Badge variant="warning">Open</Badge>
                    </div>
                  ))}
                  {mockTrades.filter(t => t.status === "open").length === 0 && (
                    <p className="text-sm text-muted-foreground py-8 text-center">No open positions</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
