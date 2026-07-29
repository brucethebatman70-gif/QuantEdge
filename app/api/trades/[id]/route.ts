import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/dal";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    const { id } = await params;
    const entry = await prisma.journalEntry.findFirst({ where: { id, userId: user.id } });
    if (!entry) return NextResponse.json({ error: "Trade not found" }, { status: 404 });
    return NextResponse.json({ trade: { ...entry, tags: JSON.parse(entry.tags), triggers: JSON.parse(entry.triggers) } });
  } catch {
    return NextResponse.json({ error: "Failed to fetch trade" }, { status: 500 });
  }
}
