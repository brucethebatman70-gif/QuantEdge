"use client";

import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { chartGridProps, chartAxisProps } from "./chart-defs";
import { ChartTooltipContent } from "./chart-tooltip";
import { chartDefaults } from "@/lib/chart-theme";
import { useMemo } from "react";

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  height?: number;
  layout?: "vertical" | "horizontal";
  showGrid?: boolean;
  colorPositive?: string;
  colorNegative?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  animated?: boolean;
  maxBarSize?: number;
}

export function BarChart({
  data,
  height = 240,
  layout = "vertical",
  showGrid = true,
  colorPositive = "#10b981",
  colorNegative = "#ef4444",
  valuePrefix,
  valueSuffix,
  animated = true,
  maxBarSize = 32,
}: BarChartProps) {
  const maxVal = useMemo(() => Math.max(...data.map((d) => Math.abs(d.value))), [data]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={chartDefaults.margin}
        barCategoryGap="20%"
      >
        {showGrid && <CartesianGrid {...chartGridProps} />}
        {layout === "vertical" ? (
          <>
            <XAxis dataKey="label" {...chartAxisProps} />
            <YAxis
              tickFormatter={(v: number) => `${valuePrefix || ""}${v}${valueSuffix || ""}`}
              width={64}
              {...chartAxisProps}
            />
          </>
        ) : (
          <>
            <XAxis
              type="number"
              tickFormatter={(v: number) => `${valuePrefix || ""}${v}${valueSuffix || ""}`}
              {...chartAxisProps}
            />
            <YAxis type="category" dataKey="label" width={80} {...chartAxisProps} />
          </>
        )}

        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload;
            return (
              <ChartTooltipContent
                rows={[{
                  label: d.label,
                  value: `${valuePrefix || ""}${d.value}${valueSuffix || ""}`,
                  color: d.color || (d.value >= 0 ? colorPositive : colorNegative),
                }]}
              />
            );
          }}
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
        />

        <Bar
          dataKey="value"
          radius={[4, 4, 0, 0]}
          maxBarSize={maxBarSize}
          isAnimationActive={animated}
          animationDuration={600}
          animationEasing="ease-out"
        >
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.color || (entry.value >= 0 ? colorPositive : colorNegative)}
              style={{
                filter: `drop-shadow(0 2px 4px ${entry.value >= 0 ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.1)"})`,
              }}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
