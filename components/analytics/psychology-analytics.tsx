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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";
import { formatDate } from "@/lib/utils";

const emotionColors: Record<string, string> = {
  confidence: "#10b981",
  fear: "#ef4444",
  greed: "#f59e0b",
  discipline: "#6366f1",
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
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Psychology & Emotions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-5 gap-2">
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
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} interval="preserveStartEnd" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
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
                  activeDot={{ r: 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
