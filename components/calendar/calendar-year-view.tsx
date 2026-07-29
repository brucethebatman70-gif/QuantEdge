"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCalendarStore, getDaysInMonth, getFirstDayOfMonth } from "@/lib/calendar/store";
import { formatCurrency } from "@/lib/utils";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function CalendarYearView() {
  const { currentDate, days, selectDate, selectedDate } = useCalendarStore();
  const year = currentDate.getFullYear();

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, m) => {
      const totalDays = getDaysInMonth(year, m);
      const firstDay = getFirstDayOfMonth(year, m);
      const firstDayMonday = firstDay === 0 ? 6 : firstDay - 1;
      const monthDays = Array.from({ length: totalDays }, (_, i) => i + 1);
      const monthPnl = days
        .filter((d) => d.date.startsWith(`${year}-${String(m + 1).padStart(2, "0")}`))
        .reduce((s, d) => s + d.pnl, 0);
      return { monthIndex: m, label: MONTH_LABELS[m], totalDays, firstDay: firstDayMonday, monthDays, monthPnl };
    });
  }, [year, days]);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">{year}</h3>
        <div className="grid grid-cols-4 gap-4">
          {months.map((month, mi) => (
            <motion.div
              key={month.monthIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mi * 0.04 }}
              className="space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">{month.label}</span>
                <span className={`text-[9px] font-medium ${month.monthPnl >= 0 ? "text-success" : "text-error"}`}>
                  {formatCurrency(month.monthPnl)}
                </span>
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {["M", "T", "W", "T", "F", "S", "S"].map((wd, i) => (
                  <div key={i} className="text-[7px] text-muted-foreground text-center">{wd}</div>
                ))}
                {Array.from({ length: month.firstDay }, (_, i) => (
                  <div key={`e-${i}`} />
                ))}
                {month.monthDays.map((day) => {
                  const dateStr = `${year}-${String(month.monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayData = days.find((d) => d.date === dateStr);
                  const isToday = dateStr === todayStr;
                  const isSelected = dateStr === selectedDate;
                  return (
                    <div
                      key={day}
                      onClick={() => selectDate(dateStr)}
                      className={`text-center text-[8px] py-0.5 rounded cursor-pointer transition-colors ${
                        isSelected ? "bg-primary/10 ring-1 ring-primary" : isToday ? "bg-primary/20 text-primary font-medium" : "hover:bg-muted/30"
                      } ${dayData?.trades ? (dayData.pnl >= 0 ? "text-success" : "text-error") : "text-foreground"}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
