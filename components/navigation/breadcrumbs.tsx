"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { NAV_ITEMS, NAV_SECTIONS } from "./nav-types";
import Link from "next/link";

export function Breadcrumbs() {
  const pathname = usePathname();
  const currentItem = NAV_ITEMS.find((item) => item.href === pathname);

  if (!currentItem) return null;

  const Icon = Icons[currentItem.icon as keyof typeof Icons] || Icons.LayoutDashboard;
  const section = NAV_SECTIONS.find((s) => s.id === currentItem.section.id);
  const SectionIcon = section ? Icons[section.icon as keyof typeof Icons] : null;

  return (
    <motion.nav
      className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Link href="/" className="hover:text-foreground/60 transition-colors">
        QuantEdge
      </Link>

      {section && (
        <>
          <Icons.ChevronRight className="w-3 h-3 opacity-30" />
          <span className="flex items-center gap-1">
            {SectionIcon && <SectionIcon className="w-3 h-3" />}
            {section.label}
          </span>
        </>
      )}

      <Icons.ChevronRight className="w-3 h-3 opacity-30" />

      <span className={cn("flex items-center gap-1 text-foreground/80 font-medium")}>
        {Icon && <Icon className="w-3 h-3" />}
        {currentItem.label}
      </span>
    </motion.nav>
  );
}
