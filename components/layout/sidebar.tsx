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
import { springs, duration, easings } from "@/lib/motion";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-full flex-col border-r bg-sidebar text-sidebar-foreground",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
      style={{ transition: `width ${duration.normal}s ${easings.enter.join(",")}` }}
    >
      <div className="flex h-14 items-center gap-2 px-3">
        <motion.div
          className="flex h-8 w-8 items-center justify-center"
          whileHover={{ scale: 1.05, transition: springs.micro }}
        >
          <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
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
              className="text-sm font-semibold truncate"
            >
              {brand.name}
            </motion.span>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon-sm"
          className="ml-auto shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <Icons.ChevronRight className="h-4 w-4" />
          ) : (
            <Icons.ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1 py-2">
        <nav className="flex flex-col gap-1 px-2">
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
                        className={cn(
                          "flex h-9 w-full items-center justify-center rounded-lg relative",
                          isActive
                            ? "text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/60"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-lg bg-sidebar-accent"
                            transition={{ duration: 0.3, ease: easings.enter }}
                          />
                        )}
                        <motion.div
                          className="relative z-10"
                          whileHover={{ scale: 1.1, transition: springs.micro }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                        </motion.div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
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
                className="group relative flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-sidebar-accent"
                    transition={{ duration: 0.3, ease: easings.enter }}
                  />
                )}
                <motion.div
                  className="relative z-10 flex items-center gap-3 w-full"
                  whileHover={{ x: 3, transition: { duration: 0.2, ease: easings.hover } }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, transition: springs.micro }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive
                        ? "text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/60 group-hover:text-sidebar-accent-foreground"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </motion.div>
                  <motion.span
                    className={cn(
                      "flex-1 truncate",
                      isActive
                        ? "text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/60 group-hover:text-sidebar-accent-foreground"
                    )}
                  >
                    {item.label}
                  </motion.span>
                  {item.shortcut && (
                    <kbd className="hidden rounded border border-sidebar-border bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium text-sidebar-foreground/40 group-hover:inline-flex">
                      {item.shortcut}
                    </kbd>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-2">
        <motion.div
          className={cn(
            "flex items-center gap-3 rounded-lg p-2",
            collapsed ? "justify-center" : ""
          )}
          whileHover={{ backgroundColor: "var(--sidebar-accent)", transition: { duration: 0.2 } }}
        >
          <motion.div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium"
            whileHover={{ scale: 1.05, transition: springs.micro }}
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
              <p className="text-xs font-medium truncate">Demo Account</p>
              <p className="text-[10px] text-muted-foreground">$124,532.00</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </aside>
  );
}
