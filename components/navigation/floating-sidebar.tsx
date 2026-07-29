"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { brand } from "@/config/brand";
import { Icons } from "@/lib/icons";
import { useNavigationStore } from "./navigation-store";
import { NAV_ITEMS, NAV_SECTIONS } from "./nav-types";
import { SectionGroup } from "./section-group";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { FavoritesList } from "./favorites-list";
import { RecentPages } from "./recent-pages";
import { GlobalSearch } from "./global-search";
import { NotificationBadge, NotificationCenter, useNotificationStore } from "@/components/notification";
import { UserProfile } from "./user-profile";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FloatingSidebar() {
  const { mode, setMode, hovered, setHovered } = useNavigationStore();
  const notif = useNotificationStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isExpanded = mode === "expanded" || (mode === "collapsed" && hovered);

  return (
    <>
      <motion.aside
        data-tour="sidebar"
        className="fixed left-3 top-3 z-30 flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "var(--glass-surface)",
          backdropFilter: "blur(32px) saturate(1.8)",
          WebkitBackdropFilter: "blur(32px) saturate(1.8)",
          border: "1px solid var(--glass-border)",
          borderTop: "1px solid var(--glass-highlight)",
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.02),
            0 8px 16px rgba(0,0,0,0.04),
            0 24px 48px rgba(0,0,0,0.06),
            0 40px 80px rgba(0,0,0,0.04)
          `,
        }}
        animate={{
          width: isExpanded ? 220 : 56,
          height: "calc(100vh - 24px)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => mode === "collapsed" && setHovered(true)}
        onMouseLeave={() => { setHovered(false); }}
      >
        {/* Logo + Collapse */}
        <div className={cn("flex items-center shrink-0", isExpanded ? "h-14 gap-2 px-3 pt-1" : "h-12 justify-center pt-0.5")}>
          <motion.div
            className="flex h-7 w-7 items-center justify-center shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
              <path d="M16 1L2 13L8 21L16 11L24 21L30 13L16 1Z" fill="#00D4AA"/>
              <path d="M8 21L2 13L8 31L16 21L16 11L8 21Z" fill="#06E0FF"/>
              <path d="M24 21L30 13L24 31L16 21L16 11L24 21Z" fill="#00D4AA" opacity="0.7"/>
            </svg>
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm font-semibold truncate flex-1"
              >
                {brand.name}
              </motion.span>
            )}
          </AnimatePresence>
          {isExpanded && (
            <button
              onClick={() => setMode("collapsed")}
              className="shrink-0 opacity-30 hover:opacity-80 transition-opacity"
            >
              <Icons.ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
          {!isExpanded && (
            <button
              onClick={() => setMode("expanded")}
              className="shrink-0 opacity-30 hover:opacity-80 transition-opacity absolute -right-0.5 top-1/2 -translate-y-1/2"
            >
              <Icons.ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="mx-3 h-px bg-border/30 shrink-0" />

        {/* Workspace Switcher */}
        <div className="shrink-0">
          <WorkspaceSwitcher collapsed={!isExpanded} />
        </div>

        {/* Divider */}
        <div className="mx-3 h-px bg-border/20 shrink-0" />

        {/* Search */}
        <div className="shrink-0 pt-1">
          <GlobalSearch collapsed={!isExpanded} />
        </div>

        {/* Scrollable Nav Area */}
        <ScrollArea className="flex-1 py-1">
          {/* Favorites */}
          <FavoritesList collapsed={!isExpanded} />

          {isExpanded && <div className="mx-3 h-px bg-border/10 my-1" />}

          {/* Recent Pages */}
          <RecentPages collapsed={!isExpanded} />

          {isExpanded && <div className="mx-3 h-px bg-border/10 my-1" />}

          {/* Section Groups */}
          <nav className="space-y-1">
            {NAV_SECTIONS.map((section) => {
              const items = NAV_ITEMS.filter((item) => item.section.id === section.id);
              if (items.length === 0) return null;
              return (
                <SectionGroup
                  key={section.id}
                  section={section}
                  items={items}
                  collapsed={!isExpanded}
                />
              );
            })}
          </nav>
        </ScrollArea>

        {/* Divider */}
        <div className="mx-3 h-px bg-border/30 shrink-0" />

        {/* Notifications */}
        <div className="shrink-0 pt-0.5 pb-0.5">
          <NotificationBadge collapsed={!isExpanded} onClick={() => notif.toggleCenter()} />
        </div>

        {/* Divider */}
        {isExpanded && <div className="mx-3 h-px bg-border/20 shrink-0" />}

        {/* User Profile */}
        <div className="shrink-0">
          <UserProfile collapsed={!isExpanded} />
        </div>
      </motion.aside>

      {/* Spacer for layout when collapsed */}
      <div style={{ width: isExpanded ? 244 : 80, flexShrink: 0 }} />

      {/* Notification Center */}
      <AnimatePresence>
        {notif.centerOpen && (
          <NotificationCenter onClose={() => notif.setCenterOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
