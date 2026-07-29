"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { usePlaybookStore } from "@/lib/playbooks/store";

export function PlaybookHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { setFilter, filter } = usePlaybookStore();

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icons.FileText className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Playbook Center</h1>
            <p className="text-xs text-muted-foreground">Build repeatable trading systems.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {searchOpen ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            className="relative"
          >
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Search playbooks..."
              value={filter.search}
              onChange={(e) => setFilter({ search: e.target.value })}
              onBlur={() => { if (!filter.search) setSearchOpen(false); }}
              onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
              className="w-full pl-9 h-9 text-sm"
            />
          </motion.div>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
            <Icons.Search className="h-4 w-4" />
          </Button>
        )}

        <Button variant="ghost" size="sm">
          <Icons.Download className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button variant="ghost" size="sm">
          <Icons.Upload className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="ghost" size="sm">
          <Icons.FileText className="mr-2 h-4 w-4" />
          Templates
        </Button>
        <Button size="sm">
          <Icons.Plus className="mr-2 h-4 w-4" />
          New Playbook
        </Button>
      </div>
    </div>
  );
}
