import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";

const DEMO_EMAIL = "demo@quantedge.com";
const DEMO_PASSWORD = "Demo1234!";

async function ensureDemoUser() {
  const existing = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });
  if (existing) return existing;
  const password = await bcrypt.hash(DEMO_PASSWORD, 12);
  return prisma.user.create({
    data: { id: "user_1", email: DEMO_EMAIL, firstName: "Demo", lastName: "User", password, emailVerified: true },
  });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    let user;
    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch {
      user = null;
    }

    if (!user) {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        try {
          user = await ensureDemoUser();
        } catch {
          const fallbackPassword = await bcrypt.hash(DEMO_PASSWORD, 12);
          user = { id: "user_1", email: DEMO_EMAIL, firstName: "Demo", lastName: "User", password: fallbackPassword, emailVerified: true, createdAt: new Date().toISOString() };
        }
      } else {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    await createSession({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      emailVerified: user.emailVerified,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
        createdAt: typeof user.createdAt === "string" ? user.createdAt : user.createdAt.toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
