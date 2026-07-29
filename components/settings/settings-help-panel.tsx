"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useSettingsStore } from "@/lib/settings/store";

const TIPS = [
  { icon: <Icons.Sparkles className="h-3.5 w-3.5 text-primary" />, title: "Quick Tip", desc: "Use ⌘K to quickly search and navigate between settings sections." },
  { icon: <Icons.Brain className="h-3.5 w-3.5 text-success" />, title: "AI Coach", desc: "Enable Smart Suggestions in AI Preferences to get proactive trading insights." },
  { icon: <Icons.Shield className="h-3.5 w-3.5 text-warning" />, title: "Security", desc: "Enable 2FA to add an extra layer of protection to your account." },
  { icon: <Icons.Keyboard className="h-3.5 w-3.5 text-accent" />, title: "Productivity", desc: "Customize keyboard shortcuts to match your trading workflow." },
];

const LINKS = [
  { label: "Documentation", icon: <Icons.BookOpen className="h-3.5 w-3.5" /> },
  { label: "Video Tutorials", icon: <Icons.PlayCircle className="h-3.5 w-3.5" /> },
  { label: "Support", icon: <Icons.HelpCircle className="h-3.5 w-3.5" /> },
  { label: "Community", icon: <Icons.MessageSquare className="h-3.5 w-3.5" /> },
];

export function SettingsHelpPanel() {
  const { showHelpPanel, toggleHelpPanel } = useSettingsStore();

  if (!showHelpPanel) {
    return (
      <div className="w-10 border-l border-border flex items-start justify-center pt-4">
        <Button variant="ghost" size="icon-xs" onClick={toggleHelpPanel} title="Show Help">
          <Icons.PanelRightOpen className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 240, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className="w-60 border-l border-border overflow-y-auto shrink-0"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-xs font-semibold text-foreground">Help</h3>
        <Button variant="ghost" size="icon-xs" onClick={toggleHelpPanel}>
          <Icons.X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="p-3 space-y-3">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Quick Tips</p>
        {TIPS.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-lg border border-border p-3 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-center gap-1.5 mb-1">{tip.icon}<span className="text-[10px] font-medium text-foreground">{tip.title}</span></div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">{tip.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-3 border-t border-border space-y-1">
        {LINKS.map((link) => (
          <button key={link.label} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors">
            {link.icon}{link.label}
          </button>
        ))}
      </div>
    </motion.aside>
  );
}
