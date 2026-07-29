import { describe, it, expect } from "vitest";
import { formatCurrency, formatNumber, formatDate, generateId } from "@/lib/utils";
import { cn } from "@/lib/cn";

describe("formatCurrency", () => {
  it("formats positive numbers", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });
  it("formats negative numbers", () => {
    expect(formatCurrency(-500)).toBe("-$500.00");
  });
  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });
});

describe("formatNumber", () => {
  it("formats with commas", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });
  it("handles decimals", () => {
    expect(formatNumber(1234.56)).toBe("1,234.56");
  });
});

describe("formatDate", () => {
  it("formats ISO date string", () => {
    const result = formatDate("2026-07-29T12:00:00.000Z");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });
});

describe("generateId", () => {
  it("generates a string", () => {
    expect(typeof generateId()).toBe("string");
  });
  it("generates unique values", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });
  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });
  it("resolves Tailwind conflicts", () => {
    expect(cn("px-4", "px-2")).toBe("px-2");
  });
});
