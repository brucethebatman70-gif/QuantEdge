"use client";

import { motion } from "framer-motion";
import { useCalendarStore } from "@/lib/calendar/store";
import { CalendarEventCard, CalendarEmptyState } from "./calendar-event-card";
import { formatCurrency } from "@/lib/utils";

export function CalendarDayView() {
  const { currentDate, events, days } = useCalendarStore();
  const dateStr = currentDate.toISOString().split("T")[0];
  const dayData = days.find((d) => d.date === dateStr);
  const dayEvents = events.filter((e) => e.start.startsWith(dateStr))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const allDayEvents = dayEvents.filter((e) => e.allDay);
  const timedEvents = dayEvents.filter((e) => !e.allDay);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-lg font-semibold text-foreground">
            {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </h2>
          {dayData && (
            <div className="flex items-center gap-4 mt-2">
              <div className={`text-sm font-semibold ${dayData.pnl >= 0 ? "text-success" : "text-error"}`}>
                {dayData.pnl >= 0 ? "+" : ""}{formatCurrency(dayData.pnl)}
              </div>
              <div className="text-xs text-muted-foreground">{dayData.trades} trades</div>
              {dayData.wins > 0 && (
                <div className="text-xs text-muted-foreground">
                  {Math.round((dayData.wins / Math.max(dayData.trades, 1)) * 100)}% win rate
                </div>
              )}
              <div className="text-xs text-muted-foreground">{dayData.journalEntries} journal entries</div>
            </div>
          )}
        </motion.div>

        {allDayEvents.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">All Day</h3>
            <div className="space-y-1">
              {allDayEvents.map((ev) => (
                <CalendarEventCard key={ev.id} event={ev} compact />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Timeline</h3>
          {timedEvents.length === 0 ? (
            <CalendarEmptyState />
          ) : (
            <div className="space-y-3">
              {timedEvents.map((ev) => (
                <div key={ev.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="text-[10px] text-muted-foreground w-12 text-right">
                      {new Date(ev.start).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="w-px flex-1 bg-border mt-1" />
                  </div>
                  <div className="flex-1 pb-3">
                    <CalendarEventCard event={ev} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
