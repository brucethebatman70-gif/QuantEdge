import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth/session";

const protectedRoutes = ["/journal", "/analytics", "/replay", "/backtesting", "/coach", "/playbooks", "/reports", "/import", "/goals", "/settings"];
const publicRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verification-sent", "/verification-success", "/verify-email"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));
  const isRootRoute = path === "/";

  const sessionCookie = req.cookies.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  if ((isProtectedRoute || isRootRoute) && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.ico$).*)"],
};
