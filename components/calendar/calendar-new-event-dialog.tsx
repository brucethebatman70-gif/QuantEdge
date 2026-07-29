"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/lib/icons";
import { type EventType, EVENT_TYPE_CONFIG } from "@/lib/calendar/types";

const EVENT_CATEGORIES: { label: string; types: EventType[] }[] = [
  {
    label: "Trades",
    types: ["trade_open", "trade_close", "trade_partial", "trade_sl_update", "trade_tp_update"],
  },
  {
    label: "Productivity",
    types: ["journal_entry", "replay_session", "backtest_run", "playbook_update", "ai_coaching", "study_session", "trading_break"],
  },
  {
    label: "Reviews & Goals",
    types: ["daily_review", "weekly_review", "monthly_review", "goal"],
  },
  {
    label: "Personal",
    types: ["personal_note", "earnings", "economic_high", "economic_medium", "economic_low"],
  },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CalendarNewEventDialog({ open, onOpenChange }: Props) {
  const [selectedType, setSelectedType] = useState<EventType>("personal_note");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("09:00");

  const config = EVENT_TYPE_CONFIG[selectedType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription>Add an event to your trading calendar</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="Trades" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              {EVENT_CATEGORIES.map((cat) => (
                <TabsTrigger key={cat.label} value={cat.label} className="text-[10px]">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {EVENT_CATEGORIES.map((cat) => (
              <TabsContent key={cat.label} value={cat.label} className="mt-3">
                <div className="grid grid-cols-2 gap-2">
                  {cat.types.map((type) => {
                    const cfg = EVENT_TYPE_CONFIG[type];
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${
                          isSelected ? "ring-1 ring-primary bg-primary/5" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="h-5 w-5 rounded flex items-center justify-center" style={{ backgroundColor: cfg.color + "20" }}>
                          <Icons.Calendar className="h-3 w-3" style={{ color: cfg.color }} />
                        </div>
                        <span className="text-foreground">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="event-title">Title</Label>
              <Input
                id="event-title"
                placeholder={config ? `${config.label} title...` : "Event title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="event-desc">Description</Label>
              <Input
                id="event-desc"
                placeholder="Optional description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="event-date">Date</Label>
                <Input id="event-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="event-time">Time</Label>
                <Input id="event-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!title.trim()}>
              <Icons.Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
