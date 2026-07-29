"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useCalendarStore } from "@/lib/calendar/store";
import { CalendarEventCard, CalendarEmptyState } from "./calendar-event-card";
import { formatCurrency } from "@/lib/utils";
import { EVENT_TYPE_CONFIG } from "@/lib/calendar/types";

export function CalendarAgendaView() {
  const { days, selectDate } = useCalendarStore();

  const grouped = useMemo(() => {
    const activeDays = days
      .filter((d) => d.events.length > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return activeDays.map((day) => ({
      ...day,
      dayEvents: day.events.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()),
    }));
  }, [days]);

  if (grouped.length === 0) return <div className="flex-1 flex items-center justify-center"><CalendarEmptyState /></div>;

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {grouped.map((day) => (
          <motion.div key={day.date} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => selectDate(day.date)}
            >
              <div>
                <span className="text-sm font-semibold text-foreground">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px]">{day.events.length} events</Badge>
                  {day.trades > 0 && (
                    <>
                      <Badge variant="secondary" className="text-[10px]">{day.trades} trades</Badge>
                      <span className={`text-[10px] font-medium ${day.pnl >= 0 ? "text-success" : "text-error"}`}>
                        {formatCurrency(day.pnl)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {[...new Set(day.events.map((e) => e.type))].slice(0, 3).map((type) => (
                  <div key={type} className="h-2 w-2 rounded-full" style={{ backgroundColor: EVENT_TYPE_CONFIG[type]?.color }} />
                ))}
              </div>
            </div>
            <div className="mt-2 space-y-2 pl-4">
              {day.dayEvents.slice(0, 4).map((ev) => (
                <CalendarEventCard key={ev.id} event={ev} compact />
              ))}
              {day.dayEvents.length > 4 && (
                <p className="text-xs text-muted-foreground pl-3">+{day.dayEvents.length - 4} more events</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
