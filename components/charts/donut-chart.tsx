"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { chartDefaults } from "@/lib/chart-theme";
import { useMemo } from "react";

interface DonutData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutData[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  centerLabel?: string;
  centerValue?: string;
  animated?: boolean;
}

export function DonutChart({
  data,
  height = 240,
  innerRadius = 65,
  outerRadius = 85,
  centerLabel,
  centerValue,
  animated = true,
}: DonutChartProps) {
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            isAnimationActive={animated}
            animationDuration={800}
            animationEasing="ease-out"
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.color}
                style={{
                  filter: `drop-shadow(0 0 6px ${entry.color}40)`,
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && (
            <span className="text-2xl font-bold tabular-nums opacity-90">{centerValue}</span>
          )}
          {centerLabel && (
            <span className="text-[10px] text-muted-foreground/50 mt-0.5 uppercase tracking-wider">
              {centerLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
