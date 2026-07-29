import { NextResponse } from "next/server";
import { mockStrategies } from "@/lib/backtesting/mock-backtesting";

export async function GET() {
  return NextResponse.json({ strategies: mockStrategies });
}
