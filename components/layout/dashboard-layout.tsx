"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { pageTransition } from "@/lib/motion";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-[240px]">
        <Navbar title={title} />
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
