import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema, forgotPasswordSchema } from "@/lib/auth/schemas";

describe("loginSchema", () => {
  it("validates correct input", () => {
    const result = loginSchema.safeParse({ email: "test@example.com", password: "password123", rememberMe: true });
    expect(result.success).toBe(true);
  });
  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({ email: "not-an-email", password: "password123", rememberMe: false });
    expect(result.success).toBe(false);
  });
  it("rejects short password", () => {
    const result = loginSchema.safeParse({ email: "test@example.com", password: "short", rememberMe: false });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("validates correct input", () => {
    const result = registerSchema.safeParse({
      firstName: "John", lastName: "Doe", email: "john@example.com",
      password: "StrongPass1", confirmPassword: "StrongPass1", acceptTerms: true,
    });
    expect(result.success).toBe(true);
  });
  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      firstName: "John", lastName: "Doe", email: "john@example.com",
      password: "StrongPass1", confirmPassword: "Different1", acceptTerms: true,
    });
    expect(result.success).toBe(false);
  });
  it("rejects unaccepted terms", () => {
    const result = registerSchema.safeParse({
      firstName: "John", lastName: "Doe", email: "john@example.com",
      password: "StrongPass1", confirmPassword: "StrongPass1", acceptTerms: false,
    });
    expect(result.success).toBe(false);
  });
});

describe("forgotPasswordSchema", () => {
  it("validates email", () => {
    expect(forgotPasswordSchema.safeParse({ email: "test@example.com" }).success).toBe(true);
    expect(forgotPasswordSchema.safeParse({ email: "bad" }).success).toBe(false);
  });
});
