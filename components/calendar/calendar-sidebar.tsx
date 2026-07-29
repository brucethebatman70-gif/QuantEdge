"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";
import { useCalendarStore } from "@/lib/calendar/store";
import { CalendarEventCard } from "./calendar-event-card";
import { CalendarGoalRing } from "./calendar-goal-ring";
import { formatCurrency } from "@/lib/utils";
import { MOOD_COLORS, MOOD_LABELS, EVENT_TYPE_CONFIG } from "@/lib/calendar/types";

export function CalendarSidebar() {
  const { selectedDate, selectedEventId, days, events, sidebarOpen, setSidebarOpen } = useCalendarStore();

  if (!sidebarOpen) return null;

  const dayData = selectedDate ? days.find((d) => d.date === selectedDate) : null;
  const dayEvents = selectedDate
    ? events.filter((e) => e.start.startsWith(selectedDate)).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    : [];

  const selectedEvent = selectedEventId ? events.find((e) => e.id === selectedEventId) : null;

  const pnlBreakdown = dayEvents
    .filter((e) => e.pnl !== undefined)
    .reduce((acc, e) => {
      const type = e.type.startsWith("trade_") ? "trades" : "other";
      acc[type] = (acc[type] || 0) + (e.pnl || 0);
      return acc;
    }, {} as Record<string, number>);

  const typeBreakdown = dayEvents.reduce((acc, e) => {
    const type = e.type;
    if (!acc[type]) acc[type] = 0;
    acc[type]++;
    return acc;
  }, {} as Record<string, number>);

  const goalEvents = dayEvents.filter((e) => e.type === "goal");

  return (
    <div className="w-80 border-l border-border flex flex-col bg-card" role="complementary" aria-label="Day details">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground" id="sidebar-title">
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
            : "Day Details"}
        </h3>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
          <Icons.X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {selectedEvent ? (
            <CalendarEventCard event={selectedEvent} />
          ) : dayData ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <span className={`text-lg font-bold ${dayData.pnl >= 0 ? "text-success" : "text-error"}`}>
                    {dayData.pnl >= 0 ? "+" : ""}{formatCurrency(dayData.pnl)}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">P&L</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <span className="text-lg font-bold text-foreground">{dayData.trades}</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Trades</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <span className={`text-lg font-bold ${dayData.wins > 0 ? "text-success" : "text-muted-foreground"}`}>
                    {dayData.trades > 0 ? Math.round((dayData.wins / dayData.trades) * 100) : "-"}%
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Win Rate</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <span className="text-lg font-bold text-foreground">{dayData.journalEntries}</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Journal</p>
                </div>
              </div>

              {dayData.mood && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Mood:</span>
                  <span className={`font-medium ${MOOD_COLORS[dayData.mood]}`}>{MOOD_LABELS[dayData.mood]}</span>
                  <div className="flex items-center gap-1 ml-2">
                    <span className="text-muted-foreground">Energy:</span>
                    <span className="font-medium">{dayData.energy}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Discipline:</span>
                    <span className="font-medium">{dayData.discipline}/10</span>
                  </div>
                </div>
              )}

              {goalEvents.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Goals</h4>
                    <div className="flex gap-3">
                      {goalEvents.slice(0, 3).map((goal) => (
                        <CalendarGoalRing
                          key={goal.id}
                          current={goal.goalCurrent || 0}
                          target={goal.goalTarget || 1}
                          size={56}
                          strokeWidth={4}
                          label={goal.title.slice(0, 12)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {Object.keys(pnlBreakdown).length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">P&L Breakdown</h4>
                    {Object.entries(pnlBreakdown).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-foreground capitalize">{key}</span>
                        <span className={val >= 0 ? "text-success font-medium" : "text-error font-medium"}>
                          {formatCurrency(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Events ({dayEvents.length})</h4>
                <div className="space-y-2">
                  {dayEvents.map((ev) => (
                    <CalendarEventCard key={ev.id} event={ev} compact />
                  ))}
                  {dayEvents.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No events on this day</p>
                  )}
                </div>
              </div>

              {Object.keys(typeBreakdown).length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Activity</h4>
                    {Object.entries(typeBreakdown).map(([type, count]) => (
                      <div key={type} className="flex items-center gap-2 text-xs">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: EVENT_TYPE_CONFIG[type as keyof typeof EVENT_TYPE_CONFIG]?.color }} />
                        <span className="flex-1 text-foreground">{EVENT_TYPE_CONFIG[type as keyof typeof EVENT_TYPE_CONFIG]?.label || type}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <Icons.Calendar className="h-8 w-8 mb-2 opacity-20" />
              <p className="text-xs">Select a day to view details</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
