"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingSidebar } from "@/components/navigation/floating-sidebar";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Navbar } from "./navbar";
import { pageTransition } from "@/lib/motion";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <FloatingSidebar />
      <div className="flex flex-1 flex-col pr-3 pb-3 pt-0 min-w-0">
        <Navbar title={title} />
        <main className="flex-1 overflow-auto">
          <div className="px-5 pt-2 pb-1">
            <Breadcrumbs />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="p-5 pt-3"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
