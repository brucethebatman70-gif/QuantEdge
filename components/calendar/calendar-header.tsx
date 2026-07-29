"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { useCalendarStore } from "@/lib/calendar/store";
import { CalendarNewEventDialog } from "./calendar-new-event-dialog";
import { CalendarSyncDialog } from "./calendar-sync-dialog";

export function CalendarHeader() {
  const { filters, setFilters } = useCalendarStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icons.Calendar className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Trading Calendar</h1>
            <p className="text-xs text-muted-foreground">Visualize your complete trading journey.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {searchOpen ? (
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 240, opacity: 1 }} className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search date, pair, strategy, tag..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                onBlur={() => { if (!filters.search) setSearchOpen(false); }}
                onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
                className="w-full pl-9 h-9 text-sm"
                aria-label="Search calendar events"
              />
            </motion.div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search events">
              <Icons.Search className="h-4 w-4" />
            </Button>
          )}

          <Button variant="ghost" size="sm" onClick={() => setSyncOpen(true)} aria-label="Sync calendar">
            <Icons.RefreshCw className="mr-2 h-4 w-4" />
            Sync
          </Button>
          <Button variant="ghost" size="sm" aria-label="Import events">
            <Icons.Download className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="ghost" size="sm" aria-label="Export events">
            <Icons.Upload className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="ghost" size="sm" aria-label="Calendar settings">
            <Icons.Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => setNewEventOpen(true)} aria-label="Create new event">
            <Icons.Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>
      <CalendarNewEventDialog open={newEventOpen} onOpenChange={setNewEventOpen} />
      <CalendarSyncDialog open={syncOpen} onOpenChange={setSyncOpen} />
    </>
  );
}
