"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer } from "@/components/charts/chart-container";
import { chartGridProps, chartAxisProps } from "@/components/charts/chart-defs";
import { chartDefaults } from "@/lib/chart-theme";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { formatDate } from "@/lib/utils";

const emotionColors: Record<string, string> = {
  confidence: "#10b981",
  fear: "#ef4444",
  greed: "#f59e0b",
  discipline: "#8b5cf6",
  patience: "#06b6d4",
};

const emotionLabels: Record<string, string> = {
  confidence: "Confidence",
  fear: "Fear",
  greed: "Greed",
  discipline: "Discipline",
  patience: "Patience",
};

export function PsychologyAnalytics() {
  const data = mockAnalyticsData.psychologyTrends.map((p) => ({
    ...p,
    date: formatDate(p.date),
  }));

  const latest = mockAnalyticsData.psychologyTrends[mockAnalyticsData.psychologyTrends.length - 1];

  return (
    <ChartContainer title="Psychology & Emotions" subtitle="30-week trader psychology trends" glow="ai" height={420}>
      <div className="mb-4 grid grid-cols-5 gap-2 px-3">
        {Object.entries(emotionLabels).map(([key, label]) => {
          const val = latest?.[key as keyof typeof latest] as number;
          return (
            <div key={key} className="rounded-lg border border-border/50 p-2 text-center">
              <div className="text-[10px] text-muted-foreground">{label}</div>
              <div className="mt-0.5 text-lg font-bold" style={{ color: emotionColors[key] }}>
                {val}/10
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[250px] px-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={chartDefaults.margin}>
            <CartesianGrid {...chartGridProps} />
            <XAxis dataKey="date" {...chartAxisProps} interval="preserveStartEnd" />
            <YAxis domain={[0, 10]} {...chartAxisProps} />
            <Tooltip
              contentStyle={{
                background: chartDefaults.tooltipBg,
                border: `1px solid ${chartDefaults.tooltipBorder}`,
                borderRadius: `${chartDefaults.tooltipRadius}px`,
                fontSize: "12px",
                backdropFilter: "blur(16px)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            {Object.entries(emotionColors).map(([key, color]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                name={emotionLabels[key]}
                dot={false}
                activeDot={{ r: 3, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
