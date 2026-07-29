"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import type { CopilotMessage } from "@/lib/copilot/types";
import { formatTime } from "@/lib/utils";

const TYPE_BORDERS: Record<string, string> = {
  analysis: "border-l-primary/40",
  review: "border-l-accent/40",
  insight: "border-l-info/40",
  suggestion: "border-l-warning/40",
  warning: "border-l-error/40",
  success: "border-l-success/40",
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  analysis: Icons.BarChart3,
  review: Icons.FileText,
  insight: Icons.Lightbulb,
  suggestion: Icons.Sparkles,
  warning: Icons.AlertTriangle,
  success: Icons.CheckCircle2,
};

interface MessageBubbleProps {
  message: CopilotMessage;
  index: number;
}

export function MessageBubble({ message, index }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const metaType = message.metadata?.type;
  const borderClass = metaType ? TYPE_BORDERS[metaType] || "border-l-border" : "border-l-border";
  const TypeIcon = metaType ? TYPE_ICONS[metaType] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mt-1">
          <Icons.Bot className="h-3.5 w-3.5 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary/10 text-foreground rounded-tr-sm"
            : cn("bg-card border border-border/50 shadow-sm rounded-tl-sm", borderClass)
        )}
      >
        {!isUser && metaType && TypeIcon && (
          <div className="flex items-center gap-1.5 mb-2">
            <TypeIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {metaType}
            </span>
            {message.metadata?.score && (
              <span className={cn(
                "text-[10px] font-bold ml-auto",
                message.metadata.score >= 80 ? "text-success" : message.metadata.score >= 60 ? "text-warning" : "text-error"
              )}>
                {message.metadata.score}/100
              </span>
            )}
          </div>
        )}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <RenderContent content={message.content} />
        </div>
        {message.metadata?.sources && message.metadata.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-border/50">
            {message.metadata.sources.map((src) => (
              <span key={src} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[9px] text-muted-foreground">
                <Icons.Database className="h-2.5 w-2.5" />
                {src}
              </span>
            ))}
          </div>
        )}
        <div className="mt-1.5 text-[10px] text-muted-foreground/60 text-right">
          {formatTime(message.timestamp)}
        </div>
      </div>
      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary mt-1">
          <Icons.User className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  );
}

function RenderContent({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```|^> .*$|## .*$|### .*$|\|.*\|.*\|)/m);

  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const code = part.slice(3, -3);
      const [firstLine, ...rest] = code.split("\n");
      const lang = firstLine.trim();
      const codeContent = rest.join("\n").trim();
      return (
        <div key={i} className="relative my-3 rounded-lg bg-muted/50 border border-border/50 overflow-hidden">
          {lang && (
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/50 bg-muted/30">
              <span className="text-[10px] text-muted-foreground font-mono">{lang}</span>
              <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">Copy</button>
            </div>
          )}
          <pre className="p-3 text-xs leading-relaxed font-mono overflow-x-auto">
            <code>{codeContent}</code>
          </pre>
        </div>
      );
    }

    if (part.startsWith("> ")) {
      return (
        <blockquote key={i} className="border-l-2 border-primary/30 pl-3 py-1 my-2 text-xs text-muted-foreground italic">
          {part.slice(2)}
        </blockquote>
      );
    }

    if (part.startsWith("## ") || part.startsWith("### ")) {
      const level = part.startsWith("### ") ? "h3" : "h2";
      const text = part.replace(/^#{2,3} /, "");
      const Tag = level;
      return <Tag key={i} className={cn("text-foreground font-semibold mt-4 mb-2", level === "h2" ? "text-sm" : "text-xs")}>{text}</Tag>;
    }

    if (part.includes("|") && part.includes("---")) {
      return <TableRenderer key={i} content={part} />;
    }

    if (part.includes("|") && part.trim().startsWith("|")) {
      return <TableRenderer key={i} content={part} />;
    }

    const segments = part.split(/(\*\*.*?\*\*|`.*?`)/g);
    return (
      <p key={i} className="text-xs leading-relaxed text-foreground/90 mb-2 last:mb-0">
        {segments.map((seg, j) => {
          if (seg.startsWith("**") && seg.endsWith("**")) {
            return <strong key={j} className="font-semibold text-foreground">{seg.slice(2, -2)}</strong>;
          }
          if (seg.startsWith("`") && seg.endsWith("`")) {
            return <code key={j} className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono text-primary">{seg.slice(1, -1)}</code>;
          }
          return seg;
        })}
      </p>
    );
  });
}

function TableRenderer({ content }: { content: string }) {
  const lines = content.trim().split("\n").filter((l) => l.trim());
  if (lines.length < 2) return null;

  const headers = lines[0].split("|").filter((s) => s.trim()).map((s) => s.trim());
  const rows = lines.slice(2).map((line) => line.split("|").filter((s) => s.trim()).map((s) => s.trim()));

  return (
    <div className="my-3 overflow-x-auto rounded-lg border border-border/50">
      <table className="w-full text-[11px]">
        <thead>
          <tr className="bg-muted/50">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-medium text-foreground border-b border-border/50">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={cn("border-b border-border/30 last:border-0", i % 2 === 0 ? "bg-background" : "bg-muted/20")}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-muted-foreground">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
