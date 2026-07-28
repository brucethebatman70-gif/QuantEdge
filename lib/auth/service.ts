import type { User, Session } from "./types";
import { generateId, wait } from "@/lib/utils";

const mockUser: User = {
  id: "user_1",
  email: "demo@quantedge.com",
  firstName: "Demo",
  lastName: "User",
  createdAt: new Date().toISOString(),
  emailVerified: true,
};

const mockSessions: Session[] = [
  { id: "sess_1", device: "Windows Desktop", browser: "Chrome 126", location: "New York, US", ip: "192.168.1.1", lastActive: new Date().toISOString(), createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), isCurrent: true, isTrusted: true },
  { id: "sess_2", device: "iPhone 15 Pro", browser: "Safari", location: "New York, US", ip: "192.168.1.2", lastActive: new Date(Date.now() - 86400000 * 2).toISOString(), createdAt: new Date(Date.now() - 86400000 * 14).toISOString(), isCurrent: false, isTrusted: false },
  { id: "sess_3", device: "MacBook Pro", browser: "Firefox 128", location: "Boston, US", ip: "10.0.0.1", lastActive: new Date(Date.now() - 86400000 * 5).toISOString(), createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), isCurrent: false, isTrusted: true },
];

export async function loginUser(email: string, password: string, rememberMe: boolean): Promise<{ user: User; session: Session }> {
  await wait(1200);
  if (!email || !password) throw new Error("Invalid credentials");
  return { user: { ...mockUser, email }, session: { ...mockSessions[0], isCurrent: true } };
}

export async function registerUser(data: { firstName: string; lastName: string; email: string; password: string }): Promise<{ user: User }> {
  await wait(1500);
  return { user: { ...mockUser, firstName: data.firstName, lastName: data.lastName, email: data.email, emailVerified: false } };
}

export async function sendResetLink(email: string): Promise<void> {
  await wait(1000);
  if (!email) throw new Error("Email is required");
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await wait(1200);
  if (!token || !password) throw new Error("Invalid token or password");
}

export async function verifyEmailToken(token: string): Promise<void> {
  await wait(1500);
  if (!token) throw new Error("Invalid verification token");
}

export async function resendVerificationEmail(): Promise<void> {
  await wait(1000);
}

export async function fetchSessions(): Promise<Session[]> {
  await wait(500);
  return mockSessions;
}

export async function logoutAllSessions(): Promise<void> {
  await wait(800);
}