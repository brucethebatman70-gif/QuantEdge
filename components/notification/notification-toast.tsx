"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";
import { useNotificationStore } from "./notification-store";
import type { NotificationType, Toast } from "./notification-types";
import { NOTIFICATION_PRIORITY } from "./notification-types";

const TYPE_META: Record<NotificationType, { icon: keyof typeof Icons; color: string }> = {
  success: { icon: "CheckCircle2", color: "text-success" },
  information: { icon: "Info", color: "text-info" },
  warning: { icon: "AlertTriangle", color: "text-warning" },
  critical: { icon: "AlertCircle", color: "text-error" },
  ai_insight: { icon: "Brain", color: "text-primary" },
  market_alert: { icon: "TrendingUp", color: "text-accent" },
  trade_alert: { icon: "DollarSign", color: "text-success" },
  risk_alert: { icon: "Shield", color: "text-error" },
  psychology_alert: { icon: "Heart", color: "text-warning" },
  goal_achievement: { icon: "Trophy", color: "text-primary" },
  import_status: { icon: "Upload", color: "text-info" },
  system_update: { icon: "RefreshCw", color: "text-muted-foreground" },
};

function ToastProgress({ duration }: { duration: number }) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [duration]);
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
      style={{ background: "var(--primary)" }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.1, ease: "linear" }}
    />
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const meta = TYPE_META[toast.type];
  const Icon = Icons[meta.icon];
  const priority = NOTIFICATION_PRIORITY[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.95, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 60, scale: 0.95, filter: "blur(4px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
      className={cn(
        "relative overflow-hidden rounded-xl border px-4 py-3 min-w-[320px] max-w-[400px]",
        "shadow-[0_4px_16px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.06)]",
        priority === "critical" && "shadow-[0_4px_16px_rgba(239,68,68,0.15),0_12px_32px_rgba(239,68,68,0.1)]",
      )}
      style={{
        background: "var(--glass-surface)",
        backdropFilter: "blur(32px) saturate(2)",
        WebkitBackdropFilter: "blur(32px) saturate(2)",
        border: `1px solid var(--glass-border)`,
        borderTop: `1px solid var(--glass-highlight)`,
      }}
    >
      {/* Critical glow */}
      {priority === "critical" && (
        <div className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(239,68,68,0.06) 0%, transparent 50%)",
          }}
        />
      )}

      <div className="relative flex items-start gap-3">
        <div className={cn("shrink-0 w-7 h-7 rounded-lg flex items-center justify-center", meta.color.replace("text-", "bg-").replace("success", "success/10").replace("info", "info/10").replace("warning", "warning/10").replace("error", "error/10").replace("primary", "primary/10").replace("accent", "accent/10").replace("muted-foreground", "muted/20"))}>
          <Icon className={cn("w-3.5 h-3.5", meta.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-foreground leading-tight">{toast.title}</p>
          {toast.description && (
            <p className="text-[12px] text-muted-foreground/60 mt-0.5 leading-relaxed">{toast.description}</p>
          )}
          {toast.actions && toast.actions.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {toast.actions.map((action, ai) => (
                <button
                  key={ai}
                  onClick={() => { action.handler(); onDismiss(toast.id); }}
                  className="px-2 py-1 rounded-lg text-[11px] font-medium bg-white/[0.06] hover:bg-white/[0.1] text-foreground/70 hover:text-foreground transition-all"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 p-0.5 rounded-md text-muted-foreground/30 hover:text-muted-foreground/70 hover:bg-white/[0.04] transition-all"
        >
          <Icons.X className="w-3 h-3" />
        </button>
      </div>
      <ToastProgress duration={toast.duration} />
    </motion.div>
  );
}

export function ToastContainer() {
  const { toasts, dismissToast } = useNotificationStore();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
