"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useCalendarStore } from "@/lib/calendar/store";
import { EVENT_TYPE_CONFIG } from "@/lib/calendar/types";
import { formatCurrency } from "@/lib/utils";

const TIMELINE_MONTHS = 6;

export function CalendarTimelineView() {
  const { currentDate, days, events } = useCalendarStore();

  const timelineDays = useMemo(() => {
    const start = new Date(currentDate);
    start.setMonth(start.getMonth() - Math.floor(TIMELINE_MONTHS / 2));
    const result = [];
    for (let i = 0; i < 30 * TIMELINE_MONTHS; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const dayData = days.find((dd) => dd.date === dateStr);
      const dayEvents = events.filter((e) => e.start.startsWith(dateStr));
      if (dayEvents.length > 0 || dayData?.trades) {
        result.push({ date: dateStr, events: dayEvents, pnl: dayData?.pnl || 0, trades: dayData?.trades || 0 });
      }
    }
    return result;
  }, [currentDate, days, events]);

  const maxPnl = Math.max(...timelineDays.map((d) => Math.abs(d.pnl)), 1);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto space-y-1">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Trading Timeline — Last {TIMELINE_MONTHS} Months</h3>
        <div className="relative">
          {timelineDays.map((day, i) => {
            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.003 }}
                className="flex items-start gap-4 py-2 group hover:bg-muted/30 rounded-lg px-2 transition-colors"
              >
                <div className="w-24 text-right shrink-0">
                  <div className="text-[10px] text-muted-foreground">
                    {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-20 shrink-0">
                  <div className={`h-1.5 rounded-full transition-all ${day.pnl >= 0 ? "bg-success" : "bg-error"}`}
                    style={{ width: `${Math.abs(day.pnl) / maxPnl * 100}%`, opacity: 0.6 + Math.abs(day.pnl) / maxPnl * 0.4 }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {day.events.length > 0 && (
                      <div className="flex gap-1">
                        {[...new Set(day.events.map((e) => e.type))].slice(0, 2).map((type) => (
                          <span key={type} className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: EVENT_TYPE_CONFIG[type]?.color }} />
                        ))}
                      </div>
                    )}
                    <span className={`text-[10px] font-medium ${day.pnl >= 0 ? "text-success" : "text-error"}`}>
                      {formatCurrency(day.pnl)}
                    </span>
                    {day.trades > 0 && <span className="text-[10px] text-muted-foreground">{day.trades} trades</span>}
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  {day.events.slice(0, 1).map((ev) => (
                    <Badge key={ev.id} variant="outline" className="text-[9px]">{ev.title.slice(0, 20)}</Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
