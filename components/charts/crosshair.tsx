"use client";

import { useCallback, useState, useRef } from "react";

interface CrosshairPoint {
  x: number;
  y: number;
  value?: number;
  label?: string;
}

interface CrosshairProps {
  enabled?: boolean;
  color?: string;
  onPointChange?: (point: CrosshairPoint | null) => void;
  children: (bind: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
  }) => React.ReactNode;
}

export function Crosshair({
  enabled = true,
  color = "rgba(255,255,255,0.12)",
  onPointChange,
  children,
}: CrosshairProps) {
  const [point, setPoint] = useState<CrosshairPoint | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const p = { x, y };
      setPoint(p);
      onPointChange?.(p);
    },
    [enabled, onPointChange]
  );

  const handleMouseLeave = useCallback(() => {
    setPoint(null);
    onPointChange?.(null);
  }, [onPointChange]);

  return (
    <div
      ref={ref}
      className="relative"
      style={{ width: "100%", height: "100%" }}
    >
      {children({
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onMouseEnter: () => {},
      })}
      {enabled && point && (
        <>
          <div
            className="absolute top-0 pointer-events-none"
            style={{
              left: point.x,
              width: 1,
              height: "100%",
              background: color,
              transition: "left 0.05s ease",
            }}
          />
          <div
            className="absolute left-0 pointer-events-none"
            style={{
              top: point.y,
              height: 1,
              width: "100%",
              background: color,
              transition: "top 0.05s ease",
            }}
          />
        </>
      )}
    </div>
  );
}
