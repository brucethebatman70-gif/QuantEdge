"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { useGoalsStore } from "@/lib/goals/store";
import { GoalsCreateDialog } from "./goals-create-dialog";

export function GoalsHeader() {
  const { search, setSearch } = useGoalsStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icons.Target className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Goals & Performance</h1>
            <p className="text-xs text-muted-foreground">Measure discipline. Improve consistency. Achieve long-term success.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search goals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onBlur={() => { if (!search) setSearchOpen(false); }}
                onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
                className="w-full pl-9 h-9 text-sm"
                aria-label="Search goals"
              />
            </motion.div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search goals">
              <Icons.Search className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm"><Icons.Copy className="mr-2 h-4 w-4" />Templates</Button>
          <Button variant="ghost" size="sm"><Icons.Download className="mr-2 h-4 w-4" />Export</Button>
          <Button variant="ghost" size="sm"><Icons.Clock className="mr-2 h-4 w-4" />Review Progress</Button>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Icons.Plus className="mr-2 h-4 w-4" />Create Goal
          </Button>
        </div>
      </div>
      <GoalsCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
