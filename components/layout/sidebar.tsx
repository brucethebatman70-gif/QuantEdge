"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { brand } from "@/config/brand";
import { Icons } from "@/lib/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { easings } from "@/lib/motion";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "glass-sidebar fixed left-3 top-3 z-30 flex h-[calc(100vh-24px)] flex-col rounded-2xl",
        collapsed ? "w-[56px]" : "w-[220px]"
      )}
      style={{ transition: `width 0.35s ${easings.enter.join(",")}` }}
    >
      <div className="flex h-14 items-center gap-2 px-3 pt-1">
        <motion.div
          className="flex h-7 w-7 items-center justify-center shrink-0"
          whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 25 } }}
        >
          <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
            <path d="M16 1L2 13L8 21L16 11L24 21L30 13L16 1Z" fill="#00D4AA"/>
            <path d="M8 21L2 13L8 31L16 21L16 11L8 21Z" fill="#06E0FF"/>
            <path d="M24 21L30 13L24 31L16 21L16 11L24 21Z" fill="#00D4AA" opacity="0.7"/>
          </svg>
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.25, ease: easings.enter } }}
              exit={{ opacity: 0, x: -8, transition: { duration: 0.15, ease: easings.exit } }}
              className="text-sm font-semibold truncate flex-1"
            >
              {brand.name}
            </motion.span>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon-xs"
          className="shrink-0 opacity-60 hover:opacity-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <Icons.ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <Icons.ChevronLeft className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      <Separator className="mx-3 w-auto opacity-30" />

      <ScrollArea className="flex-1 py-2">
        <nav className="flex flex-col gap-0.5 px-2">
          {brand.navigation.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            const isActive = pathname === item.href;

            if (collapsed) {
              return (
                <TooltipProvider key={item.href}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className="relative flex h-9 w-full items-center justify-center rounded-xl"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-xl bg-white/10"
                            transition={{ duration: 0.3, ease: easings.enter }}
                          />
                        )}
                        <motion.div
                          className="relative z-10"
                          whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {Icon && <Icon className={cn("h-4 w-4", isActive ? "opacity-100" : "opacity-50")} />}
                        </motion.div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-2 glass-tooltip">
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <kbd className="rounded border border-border bg-muted/30 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {item.shortcut}
                        </kbd>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex h-9 items-center gap-3 rounded-xl px-3 text-sm font-medium"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-white/10"
                    transition={{ duration: 0.3, ease: easings.enter }}
                  />
                )}
                <motion.div
                  className="relative z-10 flex items-center gap-3 w-full"
                  whileHover={{ x: 2, transition: { duration: 0.2, ease: easings.hover } }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                    whileTap={{ scale: 0.95 }}
                    className={cn("shrink-0", isActive ? "opacity-100" : "opacity-50 group-hover:opacity-80")}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </motion.div>
                  <span className={cn("flex-1 truncate", isActive ? "opacity-100" : "opacity-60")}>
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <kbd className="hidden rounded border border-border/30 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60 group-hover:inline-flex">
                      {item.shortcut}
                    </kbd>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator className="mx-3 w-auto opacity-30" />

      <div className="p-3">
        <motion.div
          className={cn(
            "flex items-center gap-3 rounded-xl p-2 transition-colors",
            collapsed ? "justify-center" : ""
          )}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          <motion.div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary"
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 25 } }}
          >
            A
          </motion.div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.25, ease: easings.enter } }}
              exit={{ opacity: 0, x: -4, transition: { duration: 0.15, ease: easings.exit } }}
              className="flex-1 min-w-0"
            >
              <p className="text-xs font-medium truncate opacity-80">Demo Account</p>
              <p className="text-[10px] text-muted-foreground/60">$124,532.00</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </aside>
  );
}
