"use client";

import { motion, AnimatePresence, Reorder } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useNavigationStore } from "./navigation-store";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";

interface FavoritesListProps {
  collapsed?: boolean;
}

export function FavoritesList({ collapsed }: FavoritesListProps) {
  const { favorites, removeFavorite, reorderFavorites, addRecentPage } = useNavigationStore();
  const pathname = usePathname();

  if (favorites.length === 0) return null;

  if (collapsed) {
    return (
      <div className="px-2 space-y-0.5">
        <p className="px-1 pb-1 text-[8px] font-semibold uppercase tracking-widest text-muted-foreground/30 text-center">★</p>
        {favorites.slice(0, 3).map((fav) => {
          const Icon = Icons[fav.icon as keyof typeof Icons] || Icons.LayoutDashboard;
          const isActive = pathname === fav.href;
          return (
            <TooltipProvider key={fav.id} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={fav.href}
                    className="relative flex h-10 w-10 items-center justify-center mx-auto rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "opacity-50")} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{fav.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    );
  }

  return (
    <div className="px-3">
      <div className="flex items-center justify-between px-1 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">Favorites</span>
      </div>
      <Reorder.Group
        axis="y"
        values={favorites}
        onReorder={reorderFavorites}
        className="space-y-0.5"
      >
        <AnimatePresence mode="popLayout">
          {favorites.map((fav) => {
            const Icon = Icons[fav.icon as keyof typeof Icons] || Icons.LayoutDashboard;
            const isActive = pathname === fav.href;
            return (
              <Reorder.Item
                key={fav.id}
                value={fav}
                as="div"
                className="group relative"
              >
                <Link
                  href={fav.href}
                  onClick={() => addRecentPage({ href: fav.href, label: fav.label, icon: fav.icon })}
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-3 h-9 text-[13px] font-medium transition-colors",
                    isActive ? "bg-white/[0.08] text-foreground" : "text-muted-foreground/70 hover:text-foreground hover:bg-white/[0.03]"
                  )}
                >
                  <div className="shrink-0 flex items-center justify-center w-4 h-4">
                    <Icon className={cn("w-4 h-4", isActive && "text-primary")} />
                  </div>
                  <span className="flex-1 truncate">{fav.label}</span>
                  <button
                    onClick={(e) => { e.preventDefault(); removeFavorite(fav.id); }}
                    className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Icons.X className="w-3 h-3" />
                  </button>
                </Link>
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
