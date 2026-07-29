export const spacing = {
  px: "1px",
  0.5: "4px",
  1: "8px",
  1.5: "12px",
  2: "16px",
  2.5: "20px",
  3: "24px",
  4: "32px",
  5: "40px",
  6: "48px",
  7: "64px",
  8: "80px",
  9: "96px",
  10: "128px",
  11: "160px",
  12: "192px",
} as const;

export const radii = {
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  full: "9999px",
} as const;

export const colors = {
  primary: "#00D4AA",
  accent: "#06E0FF",
  ai: "#8b5cf6",
  analytics: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  crimson: "#dc2626",
  amber: "#d97706",
  "emerald-deep": "#059669",
} as const;

export const typography = {
  display: { size: "3.5rem", lineHeight: "1.05", letterSpacing: "-0.03em" },
  hero: { size: "2.5rem", lineHeight: "1.1", letterSpacing: "-0.025em" },
  heading: { size: "1.5rem", lineHeight: "1.2", letterSpacing: "-0.02em" },
  subheading: { size: "1.125rem", lineHeight: "1.3", letterSpacing: "-0.01em" },
  body: { size: "0.9375rem", lineHeight: "1.6" },
  caption: { size: "0.8125rem", lineHeight: "1.5" },
  small: { size: "0.75rem", lineHeight: "1.4" },
  tiny: { size: "0.6875rem", lineHeight: "1.3" },
  label: { size: "0.6875rem", letterSpacing: "0.06em" },
} as const;

export const easings = {
  premium: [0.16, 1, 0.3, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
} as const;

export const durations = {
  instant: 100,
  fast: 200,
  normal: 350,
  slow: 500,
  deliberate: 700,
} as const;
