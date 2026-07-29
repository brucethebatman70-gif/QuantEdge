import { NextResponse } from "next/server";

const mockSessions = [
  { id: "sess_1", device: "Windows Desktop", browser: "Chrome 126", location: "New York, US", ip: "192.168.1.1", lastActive: new Date().toISOString(), createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), isCurrent: true, isTrusted: true },
  { id: "sess_2", device: "iPhone 15 Pro", browser: "Safari", location: "New York, US", ip: "192.168.1.2", lastActive: new Date(Date.now() - 86400000 * 2).toISOString(), createdAt: new Date(Date.now() - 86400000 * 14).toISOString(), isCurrent: false, isTrusted: false },
];

export async function GET() {
  return NextResponse.json({ sessions: mockSessions });
}
