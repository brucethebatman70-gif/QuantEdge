import { NextResponse } from "next/server";

const reports = [
  { name: "Monthly Performance Report", period: "June 2026", type: "Performance", status: "generated" },
  { name: "Quarterly Tax Report", period: "Q2 2026", type: "Tax", status: "pending" },
  { name: "Strategy Comparison", period: "H1 2026", type: "Analysis", status: "generated" },
  { name: "Risk Assessment", period: "Current", type: "Risk", status: "draft" },
];

export async function GET() {
  return NextResponse.json({ reports });
}
