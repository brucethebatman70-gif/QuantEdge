"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useTheme } from "@/lib/theme-store";
import { useMounted } from "@/hooks/use-mounted";
import { useCommandStore } from "./command-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface UserProfileProps {
  collapsed?: boolean;
}

export function UserProfile({ collapsed }: UserProfileProps) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { setOpen: setPaletteOpen } = useCommandStore();

  const menuItems = [
    { icon: "User", label: "Profile", shortcut: "" },
    { icon: "Settings", label: "Settings", shortcut: "G S" },
    { icon: "Keyboard", label: "Shortcuts", shortcut: "Ctrl+K", action: () => setPaletteOpen(true) },
    { icon: "HelpCircle", label: "Help & Support", shortcut: "" },
  ];

  if (collapsed) {
    return (
      <div className="p-2 space-y-1">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-10 items-center justify-center mx-auto rounded-xl hover:bg-white/[0.04] transition-colors"
              >
                {mounted ? (
                  theme === "dark" ? <Icons.Sun className="w-4 h-4 opacity-60" /> : <Icons.Moon className="w-4 h-4 opacity-60" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-muted" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span className="text-xs">{theme === "dark" ? "Light" : "Dark"} mode</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center mx-auto rounded-xl hover:bg-white/[0.04] transition-colors"
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[9px]">AD</AvatarFallback>
                </Avatar>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span className="text-xs">Demo User</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="relative px-3 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-all duration-150",
          "hover:bg-white/[0.04]"
        )}
      >
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className="text-[9px]">AD</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-medium truncate opacity-80">Demo User</p>
          <p className="text-[9px] text-muted-foreground/50 truncate">Free Plan</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icons.ChevronDown className="w-3 h-3 opacity-30 group-hover:opacity-60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-3 right-3 bottom-full mb-1 z-50 overflow-hidden rounded-xl border border-border/50 bg-popover shadow-lg"
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-1">
              <div className="px-2 py-1.5 mb-1">
                <p className="text-xs font-medium">Demo User</p>
                <p className="text-[10px] text-muted-foreground">demo@quantedge.com</p>
              </div>

              <div className="h-px bg-border/50 mx-1" />

              {menuItems.map((item) => {
                const Icon = Icons[item.icon as keyof typeof Icons];
                return (
                  <button
                    key={item.label}
                    onClick={() => { item.action?.(); setOpen(false); }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-white/[0.04]"
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 opacity-60" />}
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="text-[9px] text-muted-foreground/40">{item.shortcut}</kbd>
                    )}
                  </button>
                );
              })}

              <div className="h-px bg-border/50 mx-1" />

              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-[10px] text-muted-foreground/60">Theme</span>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] hover:bg-white/[0.04] transition-colors"
                >
                  {mounted && (theme === "dark" ? <Icons.Sun className="w-3 h-3" /> : <Icons.Moon className="w-3 h-3" />)}
                  <span>{theme === "dark" ? "Light" : "Dark"}</span>
                </button>
              </div>

              <div className="h-px bg-border/50 mx-1" />

              <button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-error/80 hover:bg-error/[0.06] transition-colors">
                <Icons.LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
