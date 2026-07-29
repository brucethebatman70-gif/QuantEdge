"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { NavBadge } from "./nav-badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { NavItem as NavItemType } from "./nav-types";
import { useNavigationStore } from "./navigation-store";

interface NavItemProps {
  item: NavItemType;
  collapsed?: boolean;
  onNavigate?: () => void;
}

export function NavItem({ item, collapsed, onNavigate }: NavItemProps) {
  const pathname = usePathname();
  const Icon = Icons[item.icon as keyof typeof Icons] || Icons.LayoutDashboard;
  const isActive = pathname === item.href;
  const { addRecentPage } = useNavigationStore();

  const handleClick = () => {
    addRecentPage({ href: item.href, label: item.label, icon: item.icon });
    onNavigate?.();
  };

  const content = (
    <Link
      href={item.href}
      onClick={handleClick}
      className="group relative block"
    >
      <motion.div
        className={cn(
          "relative flex items-center rounded-xl transition-colors",
          collapsed ? "h-10 w-10 justify-center mx-auto" : "h-9 px-3 mx-1.5",
          isActive
            ? "bg-white/[0.08] text-foreground"
            : "text-muted-foreground/70 hover:text-foreground hover:bg-white/[0.03]"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        {isActive && (
          <>
            <motion.div
              layoutId="nav-active-bg"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/[0.07] to-transparent"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <motion.div
              layoutId="nav-active-indicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </>
        )}

        <div className={cn("relative flex items-center w-full", collapsed ? "justify-center" : "gap-3")}>
          <motion.div
            className={cn(
              "shrink-0 flex items-center justify-center",
              collapsed ? "w-5 h-5" : "w-4 h-4"
            )}
            whileHover={{ rotate: collapsed ? 0 : 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {Icon && (
              <Icon
                className={cn(
                  collapsed ? "w-5 h-5" : "w-4 h-4",
                  isActive ? "text-primary" : "opacity-60 group-hover:opacity-90",
                  isActive && collapsed && "text-primary"
                )}
              />
            )}
          </motion.div>

          {!collapsed && (
            <>
              <motion.span
                className={cn(
                  "flex-1 text-[13px] font-medium truncate",
                  isActive ? "text-foreground" : "text-muted-foreground/80 group-hover:text-foreground"
                )}
                layout
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>

              {item.shortcut && (
                <motion.kbd
                  className="hidden group-hover:inline-flex items-center rounded-md border border-border/30 bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground/50"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                >
                  {item.shortcut}
                </motion.kbd>
              )}

              {item.badge && <NavBadge badge={item.badge} />}
            </>
          )}

          {collapsed && item.badge && <NavBadge badge={item.badge} collapsed />}
        </div>
      </motion.div>
    </Link>
  );

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2 glass-tooltip">
            <span className="text-xs font-medium">{item.label}</span>
            {item.shortcut && (
              <kbd className="rounded border border-border bg-muted/30 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                {item.shortcut}
              </kbd>
            )}
            {item.badge && (
              <NavBadge badge={item.badge} />
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
