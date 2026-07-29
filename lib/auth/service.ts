import type { User, Session } from "./types";

const BASE = "/api/auth";

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: "include", ...options });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function loginUser(email: string, password: string, _rememberMe: boolean): Promise<{ user: User; session: Session }> {
  const data = await fetchApi<{ user: User }>(`${BASE}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  return { user: data.user, session: { id: "sess_1", device: "Windows Desktop", browser: "Chrome 126", location: "New York, US", ip: "192.168.1.1", lastActive: new Date().toISOString(), createdAt: new Date().toISOString(), isCurrent: true, isTrusted: true } };
}

export async function registerUser(data: { firstName: string; lastName: string; email: string; password: string }): Promise<{ user: User }> {
  return fetchApi(`${BASE}/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
}

export async function logoutAllSessions(): Promise<void> {
  await fetchApi(`${BASE}/logout`, { method: "POST" });
}

export async function sendResetLink(email: string): Promise<void> {
  await fetchApi(`${BASE}/send-reset-link`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await fetchApi(`${BASE}/reset-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
}

export async function verifyEmailToken(token: string): Promise<void> {
  await fetchApi(`${BASE}/verify-email`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
}

export async function resendVerificationEmail(): Promise<void> {
  await fetchApi(`${BASE}/resend-verification`, { method: "POST" });
}

export async function fetchSessions(): Promise<Session[]> {
  const data = await fetchApi<{ sessions: Session[] }>(`${BASE}/sessions`);
  return data.sessions;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const data = await fetchApi<{ user: User }>(`${BASE}/me`);
    return data.user;
  } catch {
    return null;
  }
}
