"use client";

import { Line, ResponsiveContainer, Area, ComposedChart } from "recharts";

interface SparklineProps {
  data: { value: number }[];
  color?: string;
  height?: number;
  width?: number | string;
  showArea?: boolean;
}

export function Sparkline({
  data,
  color = "#00D4AA",
  height = 48,
  width = "100%",
  showArea = true,
}: SparklineProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <ComposedChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showArea && (
          <Area
            type="monotone"
            dataKey="value"
            fill={`url(#spark-${color.replace("#", "")})`}
            stroke="none"
            isAnimationActive={false}
          />
        )}
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
