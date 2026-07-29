import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/dal";

export async function GET() {
  try {
    const session = await getCurrentUser();
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, email: true, firstName: true, lastName: true, emailVerified: true, createdAt: true },
    });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
