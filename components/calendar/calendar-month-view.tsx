"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCalendarStore, getDaysInMonth, getFirstDayOfMonth } from "@/lib/calendar/store";
import { CalendarEventCard } from "./calendar-event-card";
import { formatCurrency } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarMonthView() {
  const { currentDate, days, selectDate, selectedDate, events } = useCalendarStore();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { weeks } = useMemo(() => {
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const firstDayMonday = firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday=0 to Monday=0 based
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = [];

    for (let i = 0; i < firstDayMonday; i++) week.push(null);
    for (let d = 1; d <= totalDays; d++) {
      week.push(d);
      if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length > 0) { while (week.length < 7) week.push(null); weeks.push(week); }

    return { totalDays, firstDay: firstDayMonday, weeks };
  }, [year, month]);

  const getDayData = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return days.find((d) => d.date === dateStr);
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.start.startsWith(dateStr));
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="grid grid-cols-7 gap-px mb-1">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-[11px] font-medium text-muted-foreground text-center py-2">
            {wd}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 gap-px bg-border/50 rounded-lg overflow-hidden">
        {weeks.flat().map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} className="bg-card min-h-[100px] p-1" />;

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayData = getDayData(day);
          const dayEvents = getEventsForDay(day);
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;

          return (
            <motion.div
              key={dateStr}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.005 }}
              onClick={() => selectDate(dateStr)}
              className={`min-h-[100px] p-1.5 cursor-pointer transition-colors ${
                isSelected ? "bg-primary/5 ring-1 ring-primary" : "bg-card hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium h-6 w-6 flex items-center justify-center rounded-full ${
                  isToday ? "bg-primary text-white" : "text-foreground"
                }`}>
                  {day}
                </span>
                {dayData && dayData.trades > 0 && (
                  <span className={`text-[10px] font-medium ${dayData.pnl >= 0 ? "text-success" : "text-error"}`}>
                    {formatCurrency(dayData.pnl)}
                  </span>
                )}
              </div>

              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((ev) => (
                  <CalendarEventCard key={ev.id} event={ev} mini />
                ))}
                {dayEvents.length > 3 && (
                  <span className="text-[9px] text-muted-foreground">+{dayEvents.length - 3} more</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
