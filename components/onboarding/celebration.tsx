"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: "circle" | "line" | "dot";
  delay: number;
  duration: number;
}

const COLORS = ["#00D4AA", "#06E0FF", "#8b5cf6", "#f59e0b", "#10b981", "#ec4899"];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    rotation: Math.random() * 360,
    scale: 0.3 + Math.random() * 0.7,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: (["circle", "line", "dot"] as const)[Math.floor(Math.random() * 3)],
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 2,
  }));
}

export function Confetti({ active = false, count = 40 }: { active?: boolean; count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      setParticles(generateParticles(count));
      const timer = setTimeout(() => setParticles([]), 4000);
      return () => clearTimeout(timer);
    }
    setParticles([]);
  }, [active, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: 0, scale: 0, opacity: 1 }}
            animate={{ y: "110vh", rotate: p.rotation + 360, scale: p.scale, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, delay: p.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute"
            style={{
              width: p.shape === "line" ? 6 : 4,
              height: p.shape === "line" ? 2 : 4,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "dot" ? "50%" : 0,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}60`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function CelebrationOverlay({
  show,
  title,
  subtitle,
  onComplete,
}: {
  show: boolean;
  title: string;
  subtitle?: string;
  onComplete?: () => void;
}) {
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    if (show) {
      setConfettiActive(true);
      const timer = setTimeout(() => {
        setConfettiActive(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <>
      <Confetti active={confettiActive} />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="glass px-8 py-6 rounded-2xl text-center max-w-sm">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 mx-auto mb-4"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-bold opacity-90">{title}</h3>
              {subtitle && <p className="text-sm text-muted-foreground/60 mt-1">{subtitle}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
