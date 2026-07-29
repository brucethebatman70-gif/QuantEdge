"use client";

import { useCallback, useRef, useState } from "react";

interface ChartBrushProps {
  dataLength: number;
  startIndex: number;
  endIndex: number;
  onChange: (start: number, end: number) => void;
  height?: number;
}

export function ChartBrush({
  dataLength,
  startIndex,
  endIndex,
  onChange,
  height = 32,
}: ChartBrushProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"left" | "right" | "handle" | null>(null);

  const handleWidth = 6;
  const leftPct = (startIndex / dataLength) * 100;
  const rightPct = ((dataLength - endIndex) / dataLength) * 100;

  return (
    <div className="relative w-full" style={{ height }}>
      <div
        ref={trackRef}
        className="w-full h-full rounded-full bg-white/[0.04] border border-white/[0.06]"
      >
        <div
          className="absolute top-0 h-full"
          style={{
            left: `${leftPct}%`,
            right: `${rightPct}%`,
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
            <div
              className="absolute left-0 top-0 h-full w-1.5 cursor-ew-resize rounded-l-full bg-white/20 hover:bg-white/30 transition-colors active:bg-[#00D4AA]"
              onMouseDown={(e) => {
                e.stopPropagation();
                setDragging("left");
              }}
            />
            <div
              className="absolute right-0 top-0 h-full w-1.5 cursor-ew-resize rounded-r-full bg-white/20 hover:bg-white/30 transition-colors active:bg-[#00D4AA]"
              onMouseDown={(e) => {
                e.stopPropagation();
                setDragging("right");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
