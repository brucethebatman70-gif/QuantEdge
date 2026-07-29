"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import type { NavItem as NavItemType, NavSection } from "./nav-types";
import { NavItem } from "./nav-item";

interface SectionGroupProps {
  section: NavSection;
  items: NavItemType[];
  collapsed?: boolean;
  defaultOpen?: boolean;
}

export function SectionGroup({ section, items, collapsed, defaultOpen = true }: SectionGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const SectionIcon = Icons[section.icon as keyof typeof Icons];

  if (collapsed) {
    return (
      <div className="space-y-0.5">
        {items.map((item) => (
          <NavItem key={item.id} item={item} collapsed />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "group flex w-full items-center gap-2 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest",
          "text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-150"
        )}
      >
        {SectionIcon && (
          <SectionIcon className="w-3 h-3 opacity-40 group-hover:opacity-70 transition-opacity" />
        )}
        <span className="flex-1 text-left">{section.label}</span>
        <motion.div
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icons.ChevronDown className="w-2.5 h-2.5 opacity-30 group-hover:opacity-60 transition-opacity" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {items.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
