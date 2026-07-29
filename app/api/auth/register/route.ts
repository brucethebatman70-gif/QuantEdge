import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, firstName, lastName, password: hashedPassword },
    });
    await createSession({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, emailVerified: user.emailVerified });
    return NextResponse.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, emailVerified: user.emailVerified, createdAt: user.createdAt.toISOString() } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
