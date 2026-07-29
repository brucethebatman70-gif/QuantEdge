"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";

const tools = [
  { id: "arrow", label: "Arrow", icon: "ArrowUpRight" },
  { id: "circle", label: "Circle", icon: "Target" },
  { id: "text", label: "Text", icon: "Type" },
  { id: "highlight", label: "Highlight", icon: "Sparkles" },
  { id: "line", label: "Line", icon: "TrendingUp" },
] as const;

const colors = ["#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#6366f1", "#ec4899", "#ffffff"];

export function Annotations() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState("#ef4444");
  const [annotations, setAnnotations] = useState<{ id: string; text: string }[]>([]);
  const [noteText, setNoteText] = useState("");

  const addNote = () => {
    if (!noteText.trim()) return;
    setAnnotations([...annotations, { id: Date.now().toString(), text: noteText.trim() }]);
    setNoteText("");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Annotations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-1">
          {tools.map((tool) => {
            const Icon = Icons[tool.icon as keyof typeof Icons] || Icons.Sparkles;
            return (
              <Button
                key={tool.id}
                variant={activeTool === tool.id ? "default" : "outline"}
                size="icon-xs"
                onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                title={tool.label}
              >
                <Icon className="h-3 w-3" />
              </Button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setActiveColor(c)}
              className={cn(
                "h-5 w-5 rounded-full border-2 transition-all",
                activeColor === c ? "border-foreground scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex gap-1.5">
          <Input
            placeholder="Add note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            className="h-7 text-xs"
          />
          <Button variant="secondary" size="xs" onClick={addNote}>
            <Icons.Plus className="h-3 w-3" />
          </Button>
        </div>

        {annotations.length > 0 && (
          <div className="space-y-1">
            {annotations.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-md bg-muted/50 px-2 py-1.5">
                <span className="text-xs">{a.text}</span>
                <button
                  onClick={() => setAnnotations(annotations.filter((x) => x.id !== a.id))}
                  className="text-muted-foreground hover:text-error"
                >
                  <Icons.X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {!activeTool && annotations.length === 0 && (
          <p className="text-center text-[10px] text-muted-foreground">Select a tool to draw on the chart</p>
        )}
      </CardContent>
    </Card>
  );
}
