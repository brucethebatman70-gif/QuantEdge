"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";

const SYNC_SOURCES = [
  { id: "google" as const, label: "Google Calendar", icon: Icons.Calendar, color: "text-primary", description: "Sync with your Google Calendar" },
  { id: "apple" as const, label: "Apple Calendar", icon: Icons.Calendar, color: "text-primary", description: "Sync with iCloud Calendar" },
  { id: "outlook" as const, label: "Outlook Calendar", icon: Icons.Calendar, color: "text-sky-500", description: "Sync with Microsoft 365" },
  { id: "ics" as const, label: "ICS File Export", icon: Icons.Download, color: "text-muted-foreground", description: "Export as .ics file" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CalendarSyncDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sync Calendar</DialogTitle>
          <DialogDescription>Connect your trading calendar to external calendars</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          {SYNC_SOURCES.map((source) => {
            const Icon = source.icon;
            return (
              <button
                key={source.id}
                onClick={() => {
                  if (source.id === "ics") {
                    const link = document.createElement("a");
                    link.href = "data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0AEND:VCALENDAR";
                    link.download = "quantedge-calendar.ics";
                    link.click();
                  }
                  onOpenChange(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
              >
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                  <Icon className={`h-4 w-4 ${source.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{source.label}</p>
                  <p className="text-xs text-muted-foreground">{source.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0">
                  {source.id === "ics" ? "Export" : "Connect"}
                </Button>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
