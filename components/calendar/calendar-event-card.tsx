"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { type CalendarEvent, EVENT_TYPE_CONFIG } from "@/lib/calendar/types";
import { useCalendarStore } from "@/lib/calendar/store";
import { formatCurrency } from "@/lib/utils";

interface Props {
  event: CalendarEvent;
  compact?: boolean;
  mini?: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp: Icons.TrendingUp, TrendingDown: Icons.TrendingDown, ArrowRight: Icons.ArrowRight,
  Shield: Icons.Shield, Target: Icons.Target, BookOpen: Icons.BookOpen, PlayCircle: Icons.PlayCircle,
  FlaskConical: Icons.FlaskConical, FileText: Icons.FileText, Radio: Icons.Radio, DollarSign: Icons.DollarSign,
  StickyNote: Icons.StickyNote, CheckCircle2: Icons.CheckCircle2, Bot: Icons.Bot, Brain: Icons.Brain,
  Waves: Icons.Waves, RefreshCw: Icons.RefreshCw,
};

export function CalendarEventCard({ event, compact, mini }: Props) {
  const { selectEvent, selectedEventId } = useCalendarStore();
  const config = EVENT_TYPE_CONFIG[event.type];
  const Icon = ICON_MAP[config.icon] || Icons.Calendar;
  const isSelected = selectedEventId === event.id;

  if (mini) {
    return (
      <div className="flex items-center gap-1 px-1 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity" style={{ backgroundColor: config.color + "20" }} title={event.title}>
        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: config.color }} />
        <span className="text-[9px] text-foreground truncate">{event.title}</span>
      </div>
    );
  }

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => selectEvent(event.id)}
        className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-all ${
          isSelected ? "ring-1 ring-primary bg-primary/5" : "hover:bg-muted/50"
        }`}
        style={{ borderLeft: `2px solid ${config.color}` }}
      >
        <Icon className="h-3 w-3 shrink-0" style={{ color: config.color }} />
        <span className="text-[11px] text-foreground truncate flex-1">{event.title}</span>
        {event.pnl !== undefined && (
          <span className={`text-[10px] font-medium ${event.pnl >= 0 ? "text-success" : "text-error"}`}>
            {formatCurrency(event.pnl)}
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => selectEvent(event.id)}
      className={`rounded-lg border p-3 cursor-pointer transition-all ${
        isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: config.color + "15" }}>
          <Icon className="h-4 w-4" style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">{config.label}</span>
            {event.impact && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                event.impact === "high" ? "bg-error/10 text-error" : event.impact === "medium" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
              }`}>
                {event.impact}
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-foreground mt-0.5">{event.title}</p>
          {event.description && <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>}
          {event.pnl !== undefined && (
            <p className={`text-xs font-medium mt-1 ${event.pnl >= 0 ? "text-success" : "text-error"}`}>
              {event.pnl >= 0 ? "+" : ""}{formatCurrency(event.pnl)}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1.5">
            {event.symbol && <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{event.symbol}</span>}
            {event.direction && <span className={`text-[10px] font-medium ${event.direction === "long" ? "text-success" : "text-error"}`}>{event.direction.toUpperCase()}</span>}
            {event.tags?.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] text-muted-foreground">#{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            {event.tradeId && <span className="text-[10px] text-primary cursor-pointer hover:underline">View Trade →</span>}
            {event.journalId && <span className="text-[10px] text-primary cursor-pointer hover:underline">Open Journal →</span>}
            {event.replayId && <span className="text-[10px] text-primary cursor-pointer hover:underline">Replay →</span>}
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">
          {new Date(event.start).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
}

export function CalendarEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
      <Icons.Calendar className="h-12 w-12 mb-4 opacity-20" />
      <p className="text-sm font-medium">No events</p>
      <p className="text-xs mt-1">Adjust your filters or create a new event</p>
    </div>
  );
}
