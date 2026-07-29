import { NextResponse } from "next/server";
import { mockBacktestResults, mockOptimizationRuns } from "@/lib/backtesting/mock-backtesting";

export async function GET() {
  return NextResponse.json({ results: mockBacktestResults, optimizations: mockOptimizationRuns });
}
