"use client";

import { useEffect, useState } from "react";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { CalendarNavigation } from "@/components/calendar/calendar-navigation";
import { CalendarMonthView } from "@/components/calendar/calendar-month-view";
import { CalendarWeekView } from "@/components/calendar/calendar-week-view";
import { CalendarDayView } from "@/components/calendar/calendar-day-view";
import { CalendarAgendaView } from "@/components/calendar/calendar-agenda-view";
import { CalendarTimelineView } from "@/components/calendar/calendar-timeline-view";
import { CalendarQuarterView } from "@/components/calendar/calendar-quarter-view";
import { CalendarYearView } from "@/components/calendar/calendar-year-view";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";
import { CalendarHeatmap } from "@/components/calendar/calendar-heatmap";
import { CalendarAiInsights } from "@/components/calendar/calendar-ai-insights";
import { CalendarSkeleton, CalendarSidebarSkeleton } from "@/components/calendar/calendar-skeleton";
import { useCalendarStore } from "@/lib/calendar/store";

export default function CalendarPage() {
  const { view, sidebarOpen } = useCalendarStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <CalendarHeader />
        <CalendarNavigation />
        <div className="flex-1 flex overflow-hidden">
          <CalendarSkeleton />
          {sidebarOpen && <CalendarSidebarSkeleton />}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <CalendarHeader />
      <CalendarNavigation />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {view === "month" && <CalendarMonthView />}
          {view === "week" && <CalendarWeekView />}
          {view === "day" && <CalendarDayView />}
          {view === "quarter" && <CalendarQuarterView />}
          {view === "year" && <CalendarYearView />}
          {view === "agenda" && <CalendarAgendaView />}
          {view === "timeline" && <CalendarTimelineView />}
          <CalendarHeatmap />
          <CalendarAiInsights />
        </div>
        <CalendarSidebar />
      </div>
    </div>
  );
}
