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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-full flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center gap-2 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-xs font-bold text-primary-foreground">
            {brand.shortName}
          </span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
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
                          "flex h-9 w-full items-center justify-center rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
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
                className={cn(
                  "group flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                <span className="flex-1 truncate">{item.label}</span>
                {item.shortcut && (
                  <kbd className="hidden rounded border border-sidebar-border bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium text-sidebar-foreground/40 group-hover:inline-flex">
                    {item.shortcut}
                  </kbd>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-2">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-2",
            collapsed ? "justify-center" : ""
          )}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">Demo Account</p>
              <p className="text-[10px] text-muted-foreground">$124,532.00</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
