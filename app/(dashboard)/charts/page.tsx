"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ChartContainer } from "@/components/charts/chart-container";
import { EquityCurveChart } from "@/components/charts/equity-curve-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { Crosshair } from "@/components/charts/crosshair";
import { InteractiveLegend } from "@/components/charts/interactive-legend";
import { Sparkline } from "@/components/charts/sparkline";
import { chartDefaults } from "@/lib/chart-theme";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const equityCurveData = Array.from({ length: 120 }, (_, i) => {
  const base = 105000;
  const value = base + Math.sin(i / 12) * 8000 + i * 180 + (Math.sin(i * 0.7) * 3000) + (Math.random() - 0.5) * 2000;
  return {
    date: `Day ${i + 1}`,
    equity: Math.round(value),
    balance: Math.round(value * (1 + Math.sin(i / 20) * 0.02)),
    volume: Math.round((Math.sin(i / 5) + 1.5) * 50000 + Math.random() * 20000),
    drawdown: Math.min(0, -Math.round((Math.sin(i / 30) * 2 + 1) * 1000 + Math.random() * 500)),
  };
});

const monthlyPerf = [
  { label: "Jan", value: 5200 },
  { label: "Feb", value: -2800 },
  { label: "Mar", value: 7600 },
  { label: "Apr", value: 4100 },
  { label: "May", value: -1200 },
  { label: "Jun", value: 9200 },
  { label: "Jul", value: 6800 },
  { label: "Aug", value: 3400 },
  { label: "Sep", value: -4500 },
  { label: "Oct", value: 8100 },
  { label: "Nov", value: 5600 },
  { label: "Dec", value: 10200 },
];

const marketData = [
  { label: "Equities", value: 42500, color: "#00D4AA" },
  { label: "Forex", value: 18200, color: "#06E0FF" },
  { label: "Futures", value: -5400, color: "#ef4444" },
  { label: "Crypto", value: 32100, color: "#8b5cf6" },
  { label: "Options", value: 8900, color: "#f59e0b" },
  { label: "Bonds", value: -2100, color: "#ec4899" },
];

const strategyData = [
  { label: "Breakout", value: 35, color: "#00D4AA" },
  { label: "Pullback", value: 25, color: "#06E0FF" },
  { label: "Reversal", value: 15, color: "#f59e0b" },
  { label: "Momentum", value: 20, color: "#8b5cf6" },
  { label: "Scalp", value: 5, color: "#ec4899" },
];

const psychologyData = Array.from({ length: 30 }, (_, i) => ({
  label: `W${i + 1}`,
  confidence: Math.round(50 + Math.sin(i / 4) * 25 + Math.random() * 10),
  fear: Math.round(30 + Math.cos(i / 3) * 15 + Math.random() * 8),
  discipline: Math.round(60 + Math.sin(i / 5) * 20 + Math.random() * 10),
  patience: Math.round(55 + Math.cos(i / 6) * 18 + Math.random() * 8),
  greed: Math.round(25 + Math.sin(i / 7) * 12 + Math.random() * 6),
}));

const sparklineData = Array.from({ length: 30 }, (_, i) => ({
  value: 50 + Math.sin(i / 3) * 15 + (Math.random() - 0.5) * 20,
}));

const kpiSparklines = [
  { label: "Win Rate", value: "67.8%", data: Array.from({ length: 20 }, (_, i) => ({ value: 60 + Math.sin(i / 2) * 8 + Math.random() * 5 })), color: "#00D4AA" },
  { label: "Profit Factor", value: "2.84", data: Array.from({ length: 20 }, (_, i) => ({ value: 2 + Math.sin(i / 3) * 0.5 + Math.random() * 0.3 })), color: "#06E0FF" },
  { label: "Sharpe", value: "2.14", data: Array.from({ length: 20 }, (_, i) => ({ value: 1.5 + Math.sin(i / 4) * 0.4 + Math.random() * 0.2 })), color: "#8b5cf6" },
  { label: "Avg Win", value: "$1,845", data: Array.from({ length: 20 }, (_, i) => ({ value: 1500 + Math.sin(i / 2.5) * 300 + Math.random() * 200 })), color: "#10b981" },
];

const legendItems = [
  { id: "equity", label: "Equity", color: "#00D4AA", active: true },
  { id: "balance", label: "Balance", color: "rgba(255,255,255,0.3)", active: false },
  { id: "volume", label: "Volume", color: "#06E0FF", active: false },
];

export default function ChartsPage() {
  const [legendState, setLegendState] = useState(legendItems);
  const [showVolume, setShowVolume] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const handleLegendToggle = (id: string) => {
    setLegendState((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
    if (id === "volume") setShowVolume((v) => !v);
    if (id === "balance") setShowBalance((b) => !b);
  };

  return (
    <DashboardLayout title="Charts Hub">
      <div className="space-y-6">
        <Stagger interval={0.04}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpiSparklines.map((kpi) => (
              <StaggerItem key={kpi.label}>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground/60">{kpi.label}</span>
                    <span className="text-sm font-bold tabular-nums opacity-90">{kpi.value}</span>
                  </div>
                  <Sparkline data={kpi.data} color={kpi.color} height={36} />
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <div className="grid gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <ChartContainer
              title="Equity Curve"
              subtitle="Portfolio equity with volume & balance overlay"
              glow="success"
              height={400}
              rightAction={
                <InteractiveLegend
                  items={legendState}
                  onToggle={handleLegendToggle}
                  size="sm"
                />
              }
            >
              <EquityCurveChart
                data={equityCurveData}
                height={340}
                showVolume={showVolume}
                showBalance={showBalance}
                showDrawdown={false}
                gradientId="hub-eq"
              />
            </ChartContainer>
          </ScrollReveal>

          <ScrollReveal>
            <ChartContainer title="Crosshair Demo" subtitle="Hover to see TradingView-style guides" glow="analytics" height={400}>
              <Crosshair>
                {() => (
                  <EquityCurveChart
                    data={equityCurveData.slice(0, 60)}
                    height={340}
                    gradientId="hub-cr"
                  />
                )}
              </Crosshair>
            </ChartContainer>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <ChartContainer
            title="Monthly P&L"
            subtitle="Profit & Loss by month — 12 month view"
            glow="analytics"
            height={320}
          >
            <BarChart data={monthlyPerf} height={260} maxBarSize={40} valuePrefix="$" />
          </ChartContainer>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          <ScrollReveal>
            <ChartContainer title="P&L by Market" subtitle="Sector breakdown" glow="default" height={320}>
              <BarChart data={marketData} height={260} layout="horizontal" valuePrefix="$" />
            </ChartContainer>
          </ScrollReveal>

          <ScrollReveal>
            <ChartContainer title="Strategy Distribution" subtitle="Allocation by strategy type" glow="ai" height={320}>
              <DonutChart
                data={strategyData}
                height={280}
                innerRadius={60}
                outerRadius={90}
                centerValue="100%"
                centerLabel="Strategies"
              />
            </ChartContainer>
          </ScrollReveal>

          <ScrollReveal>
            <ChartContainer title="Psychology Trends" subtitle="30-week trader psychology" glow="warning" height={320}>
              <DonutChart
                data={psychologyData.slice(0, 5).map((d, i) => ({
                  label: d.label,
                  value: d.confidence,
                  color: ["#00D4AA", "#06E0FF", "#8b5cf6", "#f59e0b", "#ec4899"][i],
                }))}
                height={280}
                innerRadius={55}
                outerRadius={85}
                centerValue="72%"
                centerLabel="Confidence"
              />
            </ChartContainer>
          </ScrollReveal>
        </div>
      </div>
    </DashboardLayout>
  );
}
