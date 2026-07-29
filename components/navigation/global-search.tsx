"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { NAV_ITEMS } from "./nav-types";
import { useCommandStore } from "./command-store";
import { useNavigationStore } from "./navigation-store";
import { useRouter } from "next/navigation";

interface GlobalSearchProps {
  collapsed?: boolean;
}

export function GlobalSearch({ collapsed }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setSearchOpen, addRecentPage } = useNavigationStore();

  const results = query.trim()
    ? NAV_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelect = (href: string, label: string, icon: string) => {
    addRecentPage({ href, label, icon });
    router.push(href);
    setQuery("");
    setFocused(false);
    setSearchOpen(false);
  };

  if (collapsed) {
    return (
      <div className="px-2 pb-1">
        <button
          onClick={() => useCommandStore.getState().setOpen(true)}
          className="flex h-10 w-10 items-center justify-center mx-auto rounded-xl hover:bg-white/[0.04] transition-colors"
        >
          <Icons.Search className="w-4 h-4 opacity-60" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative px-3 pb-1">
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 h-9 transition-all duration-150",
          focused
            ? "border-primary/40 bg-white/[0.04] shadow-[0_0_0_1px_rgba(0,212,170,0.15)]"
            : "border-transparent bg-white/[0.03] hover:bg-white/[0.05]"
        )}
      >
        <Icons.Search className="w-3.5 h-3.5 shrink-0 opacity-40" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search..."
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/30"
        />
        <kbd className="shrink-0 rounded-md border border-border/30 px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground/30">
          ⌘K
        </kbd>
      </div>

      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.div
            className="absolute left-3 right-3 top-full mt-1 z-50 overflow-hidden rounded-xl border border-border/50 bg-popover shadow-lg"
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <div className="p-1">
              {results.map((item) => {
                const Icon = Icons[item.icon as keyof typeof Icons] || Icons.LayoutDashboard;
                return (
                  <button
                    key={item.id}
                    onMouseDown={() => handleSelect(item.href, item.label, item.icon)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-white/[0.06]"
                  >
                    <div className="shrink-0 flex items-center justify-center w-4 h-4">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="text-[9px] text-muted-foreground/40">{item.shortcut}</kbd>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
