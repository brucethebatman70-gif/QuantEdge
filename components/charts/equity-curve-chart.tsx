"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { chartGridProps, chartAxisProps } from "./chart-defs";
import { ChartGradients } from "./chart-defs";
import { ChartTooltipContent } from "./chart-tooltip";
import { chartDefaults } from "@/lib/chart-theme";

interface DataPoint {
  date: string;
  equity: number;
  balance?: number;
  drawdown?: number;
  volume?: number;
}

interface EquityCurveChartProps {
  data: DataPoint[];
  height?: number;
  showVolume?: boolean;
  showDrawdown?: boolean;
  showBalance?: boolean;
  gradientId?: string;
  animated?: boolean;
}

export function EquityCurveChart({
  data,
  height = 300,
  showVolume,
  showDrawdown,
  showBalance,
  gradientId = "eq",
  animated = true,
}: EquityCurveChartProps) {
  const startEquity = data[0]?.equity ?? 0;
  const endEquity = data[data.length - 1]?.equity ?? 0;
  const isPositive = endEquity >= startEquity;
  const areaGradient = isPositive ? `${gradientId}-equity-up` : `${gradientId}-equity-down`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={chartDefaults.margin}>
        <ChartGradients id={gradientId} />
        <CartesianGrid {...chartGridProps} />
        <XAxis dataKey="date" {...chartAxisProps} minTickGap={40} />
        <YAxis
          yAxisId="equity"
          orientation="right"
          domain={["auto", "auto"]}
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`}
          {...chartAxisProps}
        />
        {showVolume && (
          <YAxis
            yAxisId="volume"
            orientation="left"
            domain={[0, "auto"]}
            tickFormatter={() => ""}
            width={0}
          />
        )}

        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            const rows = payload.map((p) => ({
              label: String(p.name ?? ""),
              value: typeof p.value === "number"
                ? `$${p.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                : String(p.value),
              color: p.color,
            }));
            return <ChartTooltipContent rows={rows} timestamp={label} />;
          }}
          cursor={false}
        />

        {showVolume && (
          <Bar
            yAxisId="volume"
            dataKey="volume"
            fill={`url(#${gradientId}-volume)`}
            opacity={0.5}
            isAnimationActive={animated}
            animationDuration={800}
            animationEasing="ease-out"
          />
        )}

        {showBalance && (
          <Line
            yAxisId="equity"
            type="monotone"
            dataKey="balance"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
            dot={false}
            isAnimationActive={animated}
            animationDuration={600}
            animationEasing="ease-out"
          />
        )}

        {showDrawdown && (
          <Area
            yAxisId="equity"
            type="monotone"
            dataKey="drawdown"
            fill={`url(#${gradientId}-equity-down)`}
            stroke="rgba(239,68,68,0.4)"
            strokeWidth={1}
            dot={false}
            isAnimationActive={animated}
            animationDuration={700}
            animationEasing="ease-out"
          />
        )}

        <defs>
          <filter id={`${gradientId}-glow-filter`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Line
          yAxisId="equity"
          type="monotone"
          dataKey="equity"
          stroke="#00D4AA"
          strokeWidth={2}
          dot={false}
          filter={`url(#${gradientId}-glow-filter)`}
          isAnimationActive={animated}
          animationDuration={1000}
          animationEasing="ease-out"
        />

        {animated && (
          <Area
            yAxisId="equity"
            type="monotone"
            dataKey="equity"
            fill={`url(#${areaGradient})`}
            stroke="none"
            dot={false}
            isAnimationActive={animated}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
