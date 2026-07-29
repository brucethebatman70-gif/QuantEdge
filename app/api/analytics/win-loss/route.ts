import { NextResponse } from "next/server";
import { mockAnalyticsData } from "@/lib/analytics/mock-analytics";

export async function GET() {
  return NextResponse.json({ calendarData: mockAnalyticsData.calendarData, sessionPerformance: mockAnalyticsData.sessionPerformance });
}
