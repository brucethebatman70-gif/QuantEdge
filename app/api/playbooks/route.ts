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
