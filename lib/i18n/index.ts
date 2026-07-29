import { en } from "./en";

const translations = { en };

export function t(path: string): string {
  const keys = path.split(".");
  let value: unknown = en;
  for (const key of keys) {
    if (typeof value !== "object" || value === null) return path;
    value = (value as Record<string, unknown>)[key];
  }
  return typeof value === "string" ? value : path;
}
