import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/dal";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const entries = await prisma.journalEntry.findMany({ where: { userId: user.id }, orderBy: { date: "desc" } });
    const parsed = entries.map((e) => ({ ...e, tags: JSON.parse(e.tags), triggers: JSON.parse(e.triggers) }));
    return NextResponse.json({ entries: parsed });
  } catch {
    return NextResponse.json({ entries: [] });
  }
}
