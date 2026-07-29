import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/dal";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const playbooks = await prisma.playbook.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
    const parsed = playbooks.map((p) => ({ ...p, entryRules: JSON.parse(p.entryRules), exitRules: JSON.parse(p.exitRules), tags: JSON.parse(p.tags) }));
    return NextResponse.json({ playbooks: parsed });
  } catch {
    return NextResponse.json({ playbooks: [] });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const playbook = await prisma.playbook.create({
      data: {
        userId: user.id,
        name: body.name || "Untitled Playbook",
        description: body.description || "",
        setup: body.setup || "",
        direction: body.direction || "long",
        entryRules: JSON.stringify(body.entryRules || []),
        exitRules: JSON.stringify(body.exitRules || []),
        tags: JSON.stringify(body.tags || []),
        winRate: body.winRate || 0,
        totalTrades: body.totalTrades || 0,
        pnl: body.pnl || 0,
        status: body.status || "active",
      },
    });
    return NextResponse.json({ playbook }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create playbook" }, { status: 500 });
  }
}
