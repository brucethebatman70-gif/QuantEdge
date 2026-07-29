"use client";

import { Rectangle } from "recharts";

export function ChartGradients({ id = "chart" }) {
  return (
    <defs>
      <linearGradient id={`${id}-equity-up`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.25} />
        <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
      </linearGradient>
      <linearGradient id={`${id}-equity-down`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
      </linearGradient>
      <linearGradient id={`${id}-volume`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#06E0FF" stopOpacity={0.15} />
        <stop offset="100%" stopColor="#06E0FF" stopOpacity={0} />
      </linearGradient>
      <linearGradient id={`${id}-profit`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
      </linearGradient>
      <linearGradient id={`${id}-loss`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.12} />
        <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
      </linearGradient>
      <linearGradient id={`${id}-bar-profit`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
      </linearGradient>
      <linearGradient id={`${id}-bar-loss`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id={`${id}-line-glow`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#00D4AA" stopOpacity={0} />
        <stop offset="50%" stopColor="#00D4AA" stopOpacity={0.3} />
        <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
      </linearGradient>
      <filter id={`${id}-glow`}>
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export const chartGridProps = {
  strokeDasharray: "3 3",
  stroke: "rgba(255,255,255,0.06)",
  strokeWidth: 1,
  vertical: false,
};

export const chartAxisProps = {
  tick: { fontSize: 10, fill: "rgba(255,255,255,0.2)", fontFamily: "JetBrains Mono, monospace" },
  axisLine: { stroke: "rgba(255,255,255,0.06)" },
  tickLine: false,
};

function BarShape({ id, isPositive, ...props }: { id: string; isPositive: boolean; [key: string]: unknown }) {
  const { x, y, width, height } = props as { x: number; y: number; width: number; height: number };
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={`url(#${id}-${isPositive ? "bar-profit" : "bar-loss"})`}
      radius={[4, 4, 0, 0]}
      style={{ filter: `drop-shadow(0 2px 4px ${isPositive ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.15)"})` }}
    />
  );
}

export const chartBarProps = (id: string, isPositive: boolean) => ({
  shape: <BarShape id={id} isPositive={isPositive} />,
});
