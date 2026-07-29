"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useCommandStore } from "./command-store";
import { searchItems, highlightMatch, parseNaturalLanguage, suggestForNLQuery } from "./search-engine";
import type { SearchableItem } from "./search-engine";
import { CommandVoice } from "./command-voice";
import { useRouter } from "next/navigation";

const PLACEHOLDER_ROTATION = [
  "Search trades, pages, actions...",
  "Analyze my recent trades...",
  "Show my BTC trades...",
  "Generate monthly report...",
  "Open AI Copilot...",
  "Find my best setups...",
  "Review psychology...",
  "Create new trade...",
];

const FILTER_CHIPS = [
  { id: "pages", label: "Pages", icon: "LayoutDashboard" },
  { id: "trades", label: "Trades", icon: "TrendingUp" },
  { id: "journal", label: "Journal", icon: "BookOpen" },
  { id: "actions", label: "Actions", icon: "Zap" },
  { id: "ai", label: "AI", icon: "Brain" },
];

function getSectionOrder(section: string): number {
  const order: Record<string, number> = {
    "Favorites": 0,
    "Recent": 1,
    "Pages": 2,
    "Quick Actions": 3,
    "Trades": 4,
    "Journal": 5,
    "AI Suggestions": 6,
  };
  return order[section] ?? 99;
}

function ResultRow({
  item,
  isSelected,
  query,
  onSelect,
  onPreview,
  isFavorite,
  onToggleFavorite,
}: {
  item: SearchableItem;
  isSelected: boolean;
  query: string;
  onSelect: () => void;
  onPreview: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const Icon = Icons[item.icon as keyof typeof Icons] || Icons.Command;
  const highlight = highlightMatch(item.label, query);

  return (
    <button
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm transition-all duration-100",
        isSelected ? "bg-white/[0.08] scale-[1.01]" : "hover:bg-white/[0.04]"
      )}
      onMouseDown={(e) => { e.preventDefault(); onSelect(); }}
      onMouseEnter={onPreview}
      style={{ transformOrigin: "left" }}
    >
      <div className={cn(
        "shrink-0 flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-150",
        isSelected ? "bg-primary/15 text-primary" : "bg-white/[0.04] text-muted-foreground/60 group-hover:bg-white/[0.06]"
      )}>
        <Icon className="w-3.5 h-3.5" />
      </div>

      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          {highlight ? (
            <span className="text-[13px] font-medium">
              <span>{highlight.before}</span>
              <mark className="bg-primary/20 text-foreground rounded-sm px-0.5">{highlight.match}</mark>
              <span>{highlight.after}</span>
            </span>
          ) : (
            <span className="text-[13px] font-medium">{item.label}</span>
          )}
          {item.shortcut && (
            <kbd className="shrink-0 rounded border border-border/30 px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground/40">
              {item.shortcut}
            </kbd>
          )}
        </div>
        {item.description && (
          <p className="text-[10px] text-muted-foreground/50 truncate mt-0.5">{item.description}</p>
        )}
      </div>

      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.preventDefault(); onToggleFavorite(); }}
        className={cn(
          "shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-150 p-1 rounded-md",
          isFavorite ? "opacity-100 text-warning" : "hover:bg-white/[0.06] text-muted-foreground/30"
        )}
      >
        <Icons.Star className={cn("w-3 h-3", isFavorite && "fill-warning")} />
      </button>
    </button>
  );
}

function PreviewPanel({ item }: { item: SearchableItem | null }) {
  if (!item) return null;

  return (
    <motion.div
      className="w-64 border-l border-border/50 p-4 flex flex-col gap-3"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          {(() => {
            const Icon = Icons[item.icon as keyof typeof Icons] || Icons.Command;
            return <Icon className="w-4 h-4 text-primary" />;
          })()}
        </div>
        <div>
          <p className="text-xs font-medium">{item.label}</p>
          <p className="text-[9px] text-muted-foreground/50">{item.section}</p>
        </div>
      </div>

      {item.description && (
        <div className="rounded-lg bg-white/[0.03] p-2.5">
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed">{item.description}</p>
        </div>
      )}

      {item.metadata && Object.keys(item.metadata).length > 0 && (
        <div className="space-y-1">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/30">Details</p>
          {Object.entries(item.metadata).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground/50 capitalize">{key}</span>
              <span className="font-medium tabular-nums">{String(val)}</span>
            </div>
          ))}
        </div>
      )}

      {item.href && (
        <div className="mt-auto pt-2 border-t border-border/30">
          <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/40">
            <Icons.ArrowRight className="w-3 h-3" />
            <span>Navigate to page</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function CommandPalette() {
  const store = useCommandStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { open, setOpen, query, setQuery, selectedIndex, setSelectedIndex, history, addHistory } = store;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "/" && !open && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setActiveFilter(null);
    }
  }, [open]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_ROTATION.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.querySelector("[data-selected='true']");
      selected?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  const rawResults = useMemo(() => {
    if (!query.trim()) return [];
    return searchItems(query);
  }, [query]);

  const results = useMemo(() => {
    if (activeFilter) {
      const filterMap: Record<string, string[]> = {
        pages: ["Pages"],
        trades: ["Trades"],
        journal: ["Journal"],
        actions: ["Quick Actions"],
        ai: ["AI Suggestions"],
      };
      const allowed = filterMap[activeFilter] || [];
      return rawResults.filter((r) => allowed.includes(r.section));
    }
    return rawResults;
  }, [rawResults, activeFilter]);

  const nlQuery = useMemo(() => {
    if (!query.trim() || results.length > 0) return null;
    return parseNaturalLanguage(query);
  }, [query, results]);

  const groupedResults = useMemo(() => {
    const groups = new Map<string, SearchableItem[]>();

    if (query.trim() && results.length === 0 && nlQuery) {
      const suggestions = suggestForNLQuery(nlQuery);
      if (suggestions.length > 0) {
        groups.set("AI Suggestions", suggestions);
      }
    }

    results.forEach((item) => {
      if (!groups.has(item.section)) groups.set(item.section, []);
      groups.get(item.section)!.push(item);
    });

    return Array.from(groups.entries())
      .sort(([a], [b]) => getSectionOrder(a) - getSectionOrder(b));
  }, [results, query, nlQuery]);

  const flatResults = useMemo(() => {
    return groupedResults.flatMap(([, items]) => items);
  }, [groupedResults]);

  useEffect(() => {
    if (selectedIndex >= flatResults.length && flatResults.length > 0) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, flatResults, setSelectedIndex]);

  const execute = useCallback(
    (item: SearchableItem) => {
      if (query.trim()) addHistory(query);
      if (item.href) {
        router.push(item.href);
      }
      item.action?.();
      setOpen(false);
    },
    [query, addHistory, router, setOpen]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(Math.max(selectedIndex - 1, 0));
    } else if (e.key === "Enter" && flatResults[selectedIndex]) {
      e.preventDefault();
      execute(flatResults[selectedIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const getItemIndex = (item: SearchableItem) => flatResults.indexOf(item);

  return (
    <>
      <CommandVoice
        open={store.voiceOpen}
        onResult={(text) => { setQuery(text); store.setVoiceOpen(false); }}
        onClose={() => store.setVoiceOpen(false)}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

            <motion.div
              className="relative w-full max-w-2xl rounded-2xl border border-border/50 bg-popover shadow-2xl overflow-hidden flex"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Main column */}
              <div className="flex-1 min-w-0">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50">
                  <Icons.Search className="w-4 h-4 opacity-40 shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={PLACEHOLDER_ROTATION[placeholderIndex]}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/30 transition-all"
                    spellCheck={false}
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={flatResults.length > 0}
                    aria-label="Search commands"
                  />
                  <button
                    onClick={() => store.setVoiceOpen(true)}
                    className="shrink-0 p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors opacity-40 hover:opacity-80"
                  >
                    <Icons.Mic className="w-3.5 h-3.5" />
                  </button>
                  <kbd className="shrink-0 rounded-md border border-border/30 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground/40">
                    ESC
                  </kbd>
                </div>

                {/* Filter chips */}
                {query.trim().length === 0 && (
                  <div className="flex items-center gap-1.5 px-4 pt-2.5 pb-1 overflow-x-auto">
                    {FILTER_CHIPS.map((chip) => {
                      const ChipIcon = Icons[chip.icon as keyof typeof Icons];
                      return (
                        <button
                          key={chip.id}
                          onClick={() => setActiveFilter(activeFilter === chip.id ? null : chip.id)}
                          className={cn(
                            "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all duration-150",
                            activeFilter === chip.id
                              ? "bg-primary/15 text-primary border border-primary/20"
                              : "bg-white/[0.04] text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.06] border border-transparent"
                          )}
                        >
                          {ChipIcon && <ChipIcon className="w-3 h-3" />}
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Recent searches */}
                {query.trim().length === 0 && history.length > 0 && !activeFilter && (
                  <div className="px-2 pt-2">
                    <div className="flex items-center justify-between px-2 py-1">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/30">Recent</span>
                      <button
                        onClick={() => store.clearHistory()}
                        className="text-[9px] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-0.5">
                      {history.slice(0, 5).map((h, i) => (
                        <button
                          key={h.id}
                          onClick={() => setQuery(h.query)}
                          className="flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-[12px] transition-colors hover:bg-white/[0.04]"
                        >
                          <Icons.Clock className="w-3 h-3 opacity-40 shrink-0" />
                          <span className="flex-1 text-left text-muted-foreground/70">{h.query}</span>
                          <Icons.ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-40" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {query.trim().length > 0 && flatResults.length === 0 && !nlQuery && (
                  <div className="flex flex-col items-center py-10 gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center">
                      <Icons.Search className="w-6 h-6 opacity-30" />
                    </div>
                    <p className="text-xs text-muted-foreground/50">No results for "{query}"</p>
                    <p className="text-[10px] text-muted-foreground/30">Try different keywords or use AI search</p>
                  </div>
                )}

                {/* Results */}
                {flatResults.length > 0 && (
                  <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2 space-y-2" role="listbox">
                    {groupedResults.map(([section, items]) => (
                      <div key={section}>
                        <div className="flex items-center gap-2 px-2 py-1">
                          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/30">
                            {section}
                          </span>
                          <div className="flex-1 h-px bg-border/20" />
                          <span className="text-[8px] text-muted-foreground/20 tabular-nums">{items.length}</span>
                        </div>
                        {items.map((item) => {
                          const idx = getItemIndex(item);
                          const isSelected = idx === selectedIndex;
                          return (
                            <div key={item.id} data-selected={isSelected ? "true" : undefined}>
                              <ResultRow
                                item={item}
                                isSelected={isSelected}
                                query={query}
                                onSelect={() => execute(item)}
                                onPreview={() => store.setPreviewItem(isSelected ? item.id : null)}
                                isFavorite={store.isFavorite(item.id)}
                                onToggleFavorite={() => {
                                  if (store.isFavorite(item.id)) store.removeFavorite(item.id);
                                  else store.addFavorite({ id: item.id, label: item.label, icon: item.icon, href: item.href });
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center gap-3 px-4 py-2 border-t border-border/50 bg-white/[0.02]">
                  <div className="flex items-center gap-1.5">
                    <kbd className="rounded border border-border/30 px-1 py-0.5 text-[8px] leading-none">↑↓</kbd>
                    <span className="text-[9px] text-muted-foreground/40">Navigate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="rounded border border-border/30 px-1 py-0.5 text-[8px] leading-none">↵</kbd>
                    <span className="text-[9px] text-muted-foreground/40">Open</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="rounded border border-border/30 px-1 py-0.5 text-[8px] leading-none">⌘K</kbd>
                    <span className="text-[9px] text-muted-foreground/40">Toggle</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <kbd className="rounded border border-border/30 px-1 py-0.5 text-[8px] leading-none">/</kbd>
                    <span className="text-[9px] text-muted-foreground/40">Quick search</span>
                  </div>
                </div>
              </div>

              {/* Preview panel */}
              <AnimatePresence>
                {store.previewItem && (
                  <PreviewPanel
                    item={flatResults.find((r) => r.id === store.previewItem) || null}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
