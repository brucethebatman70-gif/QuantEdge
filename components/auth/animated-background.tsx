"use client";

import { useMemo } from "react";

export function AnimatedBackground() {
  const circles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 10 + (i * 17) % 100,
      y: 15 + (i * 23) % 85,
      size: 200 + i * 80,
      delay: i * 0.8,
      duration: 12 + i * 2,
      opacity: 0.03 + i * 0.01,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {circles.map((c) => (
        <div
          key={c.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            opacity: c.opacity,
            animation: `float-${c.id} ${c.duration}s ease-in-out infinite`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
      <style>{`
        ${circles.map((c) => `
          @keyframes float-${c.id} {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(${20 - c.id * 3}px, ${-15 - c.id * 2}px) scale(1.05); }
            50% { transform: translate(${-10 + c.id * 4}px, ${10 + c.id * 2}px) scale(0.95); }
            75% { transform: translate(${15 - c.id * 2}px, ${-5 - c.id * 3}px) scale(1.02); }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}