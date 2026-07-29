/* ── Centralized Chart Theme ── */

export const chartColors = {
  primary: "#00D4AA",
  accent: "#06E0FF",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  purple: "#8b5cf6",
  pink: "#ec4899",
  orange: "#f97316",
  cyan: "#06b6d4",
  grid: "rgba(255,255,255,0.06)",
  axis: "rgba(255,255,255,0.15)",
  tooltip: "rgba(12,12,15,0.85)",
  glow: "rgba(0,212,170,0.15)",
};

export const chartGradients = {
  equityUp: { from: "rgba(0,212,170,0.25)", to: "rgba(0,212,170,0)" },
  equityDown: { from: "rgba(239,68,68,0.15)", to: "rgba(239,68,68,0)" },
  volume: { from: "rgba(6,224,255,0.15)", to: "rgba(6,224,255,0)" },
  profit: { from: "rgba(16,185,129,0.2)", to: "rgba(16,185,129,0)" },
  loss: { from: "rgba(239,68,68,0.12)", to: "rgba(239,68,68,0)" },
};

export const chartAnimation = {
  grid: 0.3,
  axis: 0.4,
  line: 0.8,
  area: 0.6,
  bar: 0.5,
  pie: 0.6,
  markers: 0.3,
  labels: 0.5,
  legend: 0.4,
  tooltip: 0.15,
  crosshair: 0.1,
};

export const chartEasing = "cubic-bezier(0.22,1,0.36,1)";

export const chartDefaults = {
  margin: { top: 16, right: 16, bottom: 16, left: 16 },
  gridOpacity: 0.3,
  tickFontSize: 10,
  labelFontSize: 11,
  lineStrokeWidth: 2,
  areaOpacity: 0.3,
  barRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 },
  barMaxBarSize: 32,
  tooltipBg: "hsla(0,0%,4%,0.85)",
  tooltipBorder: "rgba(255,255,255,0.08)",
  tooltipRadius: 12,
};

export function gradientId(id: string, theme: "light" | "dark" = "dark") {
  return `${id}-${theme}`;
}
