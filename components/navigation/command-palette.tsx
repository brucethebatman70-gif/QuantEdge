"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { NAV_ITEMS } from "./nav-types";
import { useNavigationStore } from "./navigation-store";
import { useRouter } from "next/navigation";

interface Command {
  id: string;
  label: string;
  icon: string;
  section: string;
  href?: string;
  shortcut?: string;
  action?: () => void;
}

const COMMANDS: Command[] = [
  { id: "new-trade", label: "New Trade", icon: "Plus", section: "Actions", action: () => {} },
  { id: "import-csv", label: "Import CSV", icon: "Upload", section: "Actions", href: "/import" },
  { id: "ai-analyze", label: "Open AI Copilot", icon: "Bot", section: "Actions", href: "/copilot" },
  { id: "generate-report", label: "Generate Report", icon: "PieChart", section: "Actions", href: "/reports" },
  { id: "quick-journal", label: "Quick Journal Entry", icon: "Edit3", section: "Actions" },
  ...NAV_ITEMS.map((item) => ({
    id: `nav-${item.id}`,
    label: `Go to ${item.label}`,
    icon: item.icon,
    section: "Navigation" as const,
    href: item.href,
    shortcut: item.shortcut,
  })),
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, addRecentPage } = useNavigationStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query.trim()
    ? COMMANDS.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.id.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  const execute = useCallback(
    (cmd: Command) => {
      if (cmd.href) {
        addRecentPage({ href: cmd.href, label: cmd.label, icon: cmd.icon });
        router.push(cmd.href);
      }
      cmd.action?.();
      setCommandPaletteOpen(false);
      setQuery("");
    },
    [router, addRecentPage, setCommandPaletteOpen]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
        setQuery("");
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      execute(filtered[selectedIndex]);
    } else if (e.key === "Escape") {
      setCommandPaletteOpen(false);
      setQuery("");
    }
  };

  const groups = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.section]) acc[cmd.section] = [];
    acc[cmd.section].push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)} />

          <motion.div
            className="relative w-full max-w-lg rounded-2xl border border-border/50 bg-popover shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
              <Icons.Search className="w-4 h-4 opacity-40 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, actions, and more..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/30"
              />
              <kbd className="shrink-0 rounded-md border border-border/30 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground/40">
                ESC
              </kbd>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="flex flex-col items-center py-8 gap-2">
                  <Icons.Search className="w-8 h-8 opacity-20" />
                  <p className="text-xs text-muted-foreground/50">No results found</p>
                </div>
              )}

              {Object.entries(groups).map(([section, cmds]) => (
                <div key={section} className="mb-1">
                  <p className="px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/30">
                    {section}
                  </p>
                  {cmds.map((cmd, i) => {
                    const globalIdx = filtered.indexOf(cmd);
                    const Icon = Icons[cmd.icon as keyof typeof Icons] || Icons.Command;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => execute(cmd)}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                          globalIdx === selectedIndex ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                        )}
                      >
                        <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-white/[0.04]">
                          <Icon className="w-3.5 h-3.5 opacity-70" />
                        </div>
                        <span className="flex-1 text-left text-[13px]">{cmd.label}</span>
                        {cmd.shortcut && (
                          <kbd className="text-[9px] text-muted-foreground/40">{cmd.shortcut}</kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 px-4 py-2 border-t border-border/50 bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <kbd className="rounded border border-border/30 px-1 py-0.5 text-[9px]">↑↓</kbd>
                <span className="text-[9px] text-muted-foreground/40">Navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="rounded border border-border/30 px-1 py-0.5 text-[9px]">↵</kbd>
                <span className="text-[9px] text-muted-foreground/40">Open</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="rounded border border-border/30 px-1 py-0.5 text-[9px]">Esc</kbd>
                <span className="text-[9px] text-muted-foreground/40">Close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
