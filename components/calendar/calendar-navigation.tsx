"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useCalendarStore, formatMonthLabel } from "@/lib/calendar/store";
import { VIEW_LABELS, type CalendarViewType } from "@/lib/calendar/types";

const VIEWS: CalendarViewType[] = ["day", "week", "month", "quarter", "year", "agenda", "timeline"];

export function CalendarNavigation() {
  const { view, setView, currentDate, goNext, goPrev, goToToday } = useCalendarStore();

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); action(); }
  };

  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-border bg-muted/20">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={goToToday} aria-label="Go to today">Today</Button>
        <div className="flex items-center" role="group" aria-label="Date navigation">
          <Button variant="ghost" size="icon" onClick={goPrev} aria-label="Previous">
            <Icons.ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goNext} aria-label="Next">
            <Icons.ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm font-semibold text-foreground ml-1" aria-live="polite" aria-atomic="true">
          {formatMonthLabel(currentDate.getFullYear(), currentDate.getMonth())}
        </span>
      </div>

      <div className="flex items-center bg-muted rounded-lg p-0.5" role="tablist" aria-label="Calendar view selection">
        {VIEWS.map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            aria-label={`${VIEW_LABELS[v]} view`}
            tabIndex={view === v ? 0 : -1}
            onClick={() => setView(v)}
            onKeyDown={(e) => handleKeyDown(e, () => setView(v))}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              view === v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {VIEW_LABELS[v]}
          </button>
        ))}
      </div>
    </div>
  );
}
