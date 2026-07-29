"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useNavigationStore } from "./navigation-store";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface RecentPagesProps {
  collapsed?: boolean;
}

export function RecentPages({ collapsed }: RecentPagesProps) {
  const { recentPages, clearRecent, addRecentPage } = useNavigationStore();
  const pathname = usePathname();

  if (recentPages.length === 0) return null;

  if (collapsed) {
    return (
      <div className="px-2 space-y-0.5">
        <p className="px-1 pb-1 text-[8px] font-semibold uppercase tracking-widest text-muted-foreground/30 text-center">R</p>
        {recentPages.slice(0, 2).map((page) => {
          const Icon = Icons[page.icon as keyof typeof Icons] || Icons.LayoutDashboard;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="relative flex h-10 w-10 items-center justify-center mx-auto rounded-xl hover:bg-white/[0.04] transition-colors"
            >
              <Icon className={cn("w-4 h-4", pathname === page.href ? "text-primary" : "opacity-50")} />
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="px-3">
      <div className="flex items-center justify-between px-1 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">Recent</span>
        <button
          onClick={clearRecent}
          className="text-[9px] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="space-y-0.5">
        <AnimatePresence mode="popLayout">
          {recentPages.map((page) => {
            const Icon = Icons[page.icon as keyof typeof Icons] || Icons.LayoutDashboard;
            const isActive = pathname === page.href;
            return (
              <motion.div
                key={page.href}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={page.href}
                  onClick={() => addRecentPage({ href: page.href, label: page.label, icon: page.icon })}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 h-8 text-[12px] transition-colors",
                    isActive ? "text-foreground bg-white/[0.06]" : "text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.03]"
                  )}
                >
                  <div className="shrink-0 flex items-center justify-center w-3.5 h-3.5">
                    <Icon className={cn("w-3.5 h-3.5", isActive && "text-primary")} />
                  </div>
                  <span className="flex-1 truncate">{page.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
