"use client";

import { useMemo } from "react";
import { useCalendarStore, getWeekDays } from "@/lib/calendar/store";
import { CalendarEventCard } from "./calendar-event-card";
import { formatCurrency } from "@/lib/utils";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 7);

export function CalendarWeekView() {
  const { currentDate, days, events, selectDate } = useCalendarStore();
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid grid-cols-8 gap-px bg-border/50 rounded-lg overflow-hidden">
        <div className="bg-card" />
        {weekDays.map((d) => {
          const dateStr = d.toISOString().split("T")[0];
          const dayData = days.find((dd) => dd.date === dateStr);
          const isToday = dateStr === todayStr;
          return (
            <div key={dateStr} className="bg-card p-2 text-center" onClick={() => selectDate(dateStr)}>
              <div className="text-[10px] text-muted-foreground">{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div className={`text-sm font-semibold mt-0.5 h-7 w-7 flex items-center justify-center rounded-full mx-auto ${isToday ? "bg-primary text-white" : "text-foreground"}`}>
                {d.getDate()}
              </div>
              {dayData && dayData.trades > 0 && (
                <div className={`text-[10px] font-medium mt-1 ${dayData.pnl >= 0 ? "text-success" : "text-error"}`}>
                  {formatCurrency(dayData.pnl)}
                </div>
              )}
            </div>
          );
        })}

        {HOURS.map((hour) => (
          <div key={hour} className="contents">
            <div className="bg-card p-1 text-[10px] text-muted-foreground text-right pr-2 border-t border-border" style={{ height: 48 }}>
              {hour > 12 ? `${hour - 12}pm` : `${hour}am`}
            </div>
            {weekDays.map((d) => {
              const dateStr = d.toISOString().split("T")[0];
              const hourEvents = events.filter((e) => {
                const eventHour = new Date(e.start).getHours();
                return e.start.startsWith(dateStr) && eventHour === hour;
              });
              return (
                <div key={`${dateStr}-${hour}`} className="bg-card border-t border-border p-0.5" style={{ height: 48 }}>
                  {hourEvents.slice(0, 2).map((ev) => (
                    <CalendarEventCard key={ev.id} event={ev} compact />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
