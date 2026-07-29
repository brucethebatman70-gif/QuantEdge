"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";
import { NAV_ITEMS } from "@/lib/settings/types";

const NAV_ICONS: Record<string, React.ElementType> = {
  User: Icons.User, LayoutDashboard: Icons.LayoutDashboard, Sun: Icons.Sun,
  Bell: Icons.Bell, Globe: Icons.Globe, Brain: Icons.Brain, Shield: Icons.Shield,
  Lock: Icons.Lock, KeyRound: Icons.KeyRound, Puzzle: Icons.Puzzle,
  CreditCard: Icons.CreditCard, Keyboard: Icons.Keyboard, Info: Icons.Info,
};

export function SettingsNav() {
  const { activeNav, setActiveNav } = useSettingsStore();

  return (
    <nav className="w-56 border-r border-border shrink-0 overflow-y-auto p-3 space-y-1">
      {NAV_ITEMS.map((item, i) => {
        const Icon = NAV_ICONS[item.icon] || Icons.Settings;
        const active = activeNav === item.id;
        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            onClick={() => setActiveNav(item.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all ${
              active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </motion.button>
        );
      })}
    </nav>
  );
}
