"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface LoadingOverlayProps {
  show: boolean;
  message?: string;
  blur?: boolean;
}

export function LoadingOverlay({
  show,
  message,
  blur = true,
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(
            "absolute inset-0 z-50 flex items-center justify-center",
            blur && "backdrop-blur-sm"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/40"
                  animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            {message && (
              <span className="text-[11px] text-muted-foreground/60">{message}</span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
