import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/dal";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const goals = await prisma.goal.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ goals });
  } catch {
    return NextResponse.json({ goals: [] });
  }
}
