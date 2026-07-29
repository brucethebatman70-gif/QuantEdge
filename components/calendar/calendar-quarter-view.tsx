"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCalendarStore, getDaysInMonth, getFirstDayOfMonth } from "@/lib/calendar/store";
import { formatCurrency } from "@/lib/utils";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function CalendarQuarterView() {
  const { currentDate, days, selectDate, selectedDate } = useCalendarStore();
  const year = currentDate.getFullYear();
  const quarter = Math.floor(currentDate.getMonth() / 3);
  const startMonth = quarter * 3;

  const months = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => {
      const m = startMonth + i;
      const totalDays = getDaysInMonth(year, m);
      const firstDay = getFirstDayOfMonth(year, m);
      const firstDayMonday = firstDay === 0 ? 6 : firstDay - 1;
      return { monthIndex: m, label: MONTH_LABELS[m], totalDays, firstDay: firstDayMonday };
    });
  }, [year, startMonth]);

  const getDayData = (m: number, day: number) => {
    const dateStr = `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return days.find((d) => d.date === dateStr);
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Q{quarter + 1} {year}
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {months.map((month, mi) => (
            <motion.div key={month.monthIndex} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: mi * 0.1 }}>
              <div className="text-sm font-semibold text-foreground mb-2">{month.label}</div>
              <div className="grid grid-cols-7 gap-px mb-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((wd, i) => (
                  <div key={i} className="text-[9px] text-muted-foreground text-center py-1">{wd}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px">
                {Array.from({ length: month.firstDay }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: month.totalDays }, (_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${String(month.monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayData = getDayData(month.monthIndex, day);
                  const isToday = dateStr === todayStr;
                  const isSelected = dateStr === selectedDate;
                  return (
                    <div
                      key={day}
                      onClick={() => selectDate(dateStr)}
                      className={`aspect-square flex flex-col items-center justify-center rounded cursor-pointer transition-colors text-[10px] ${
                        isSelected ? "bg-primary/10 ring-1 ring-primary" : isToday ? "bg-primary/20" : "hover:bg-muted/30"
                      }`}
                    >
                      <span className={`font-medium ${isToday ? "text-primary" : "text-foreground"}`}>{day}</span>
                      {dayData && dayData.trades > 0 && (
                        <span className={`text-[7px] font-medium ${dayData.pnl >= 0 ? "text-success" : "text-error"}`}>
                          {formatCurrency(dayData.pnl)}
                        </span>
                      )}
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
