"use client";

import { EmptyStateShell } from "@/components/empty-states/empty-state-shell";
import { SuccessIllustration } from "@/components/empty-states/illustrations";
import { Icons } from "@/lib/icons";
import { motion } from "framer-motion";

interface SuccessStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  metrics?: { label: string; value: string }[];
}

export function SuccessState({ title, description, action, secondaryAction, metrics }: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <EmptyStateShell
        illustration={
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <SuccessIllustration size={88} />
          </motion.div>
        }
        title={title}
        description={description}
        action={action && { ...action, variant: "primary" }}
        secondaryAction={secondaryAction}
      />
      {metrics && (
        <div className="flex items-center justify-center gap-6 mt-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <span className="text-lg font-bold tabular-nums text-success">{m.value}</span>
              <p className="text-[10px] text-muted-foreground/50 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function ImportSuccess({ count, onView }: { count: number; onView?: () => void }) {
  return (
    <SuccessState
      title="Trades imported successfully"
      description={`${count} trades have been processed and added to your workspace.`}
      action={{ label: "View Trades", onClick: onView }}
      metrics={[
        { label: "Trades Imported", value: String(count) },
        { label: "Duplicates Skipped", value: "0" },
        { label: "Time Elapsed", value: "12s" },
      ]}
    />
  );
}

export function GoalAchieved({ label, onNext }: { label: string; onNext?: () => void }) {
  return (
    <SuccessState
      title={`Goal achieved: ${label}`}
      description="You hit your target. Consistency builds champions — keep the momentum going."
      action={{ label: "Set Next Goal", onClick: onNext }}
    />
  );
}
