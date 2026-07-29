"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";

const WORKSPACES = [
  { id: "personal", label: "Personal", color: "#00D4AA", initials: "P" },
  { id: "trading", label: "Demo Trading", color: "#06E0FF", initials: "D" },
  { id: "analytics", label: "Analytics Lab", color: "#8b5cf6", initials: "A" },
];

interface WorkspaceSwitcherProps {
  collapsed?: boolean;
}

export function WorkspaceSwitcher({ collapsed }: WorkspaceSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(WORKSPACES[1]);

  if (collapsed) {
    return (
      <div className="px-2 pt-2">
        <button
          onClick={() => setOpen(!open)}
          className="relative flex h-10 w-10 items-center justify-center mx-auto rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors"
        >
          <span className="text-xs font-bold text-primary">{active.initials}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative px-3 pt-2.5">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 transition-all duration-150",
          "hover:bg-white/[0.04]"
        )}
      >
        <motion.div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${active.color}18` }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="text-[10px] font-bold" style={{ color: active.color }}>
            {active.initials}
          </span>
        </motion.div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-medium truncate opacity-80">{active.label}</p>
          <p className="text-[9px] text-muted-foreground/50 truncate">{brand.name}</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icons.ChevronDown className="w-3 h-3 opacity-30 group-hover:opacity-60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-3 right-3 top-full mt-1 z-50 overflow-hidden rounded-xl border border-border/50 bg-popover shadow-lg"
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-1">
              {WORKSPACES.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => { setActive(ws); setOpen(false); }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition-colors",
                    ws.id === active.id ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                  )}
                >
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-lg shrink-0"
                    style={{ backgroundColor: `${ws.color}18` }}
                  >
                    <span className="text-[9px] font-bold" style={{ color: ws.color }}>{ws.initials}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{ws.label}</p>
                  </div>
                  {ws.id === active.id && (
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: ws.color }}
                      layoutId="ws-check"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
