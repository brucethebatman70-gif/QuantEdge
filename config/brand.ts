export const brand = {
  name: "QuantEdge",
  shortName: "QE",
  tagline: "AI-Powered Trading Operating System",
  description: "Institutional-grade trading workspace combining journaling, analytics, replay, backtesting, and AI-powered coaching.",
  company: "QuantEdge Technologies",
  legal: "QuantEdge Technologies Inc.",
  copyright: `© ${new Date().getFullYear()} QuantEdge Technologies. All rights reserved.`,

  logo: {
    icon: "/images/logo-icon.svg",
    full: "/images/logo-full.svg",
    favicon: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
    ogImage: "/images/og-image.png",
  },

  theme: {
    color: {
      primary: {
        DEFAULT: "#6366f1",
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
        950: "#1e1b4b",
      },
      accent: {
        DEFAULT: "#06b6d4",
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344",
      },
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },

    surface: {
      light: {
        background: "#ffffff",
        foreground: "#09090b",
        muted: "#f4f4f5",
        mutedForeground: "#71717a",
        card: "#ffffff",
        cardForeground: "#09090b",
        popover: "#ffffff",
        popoverForeground: "#09090b",
        border: "#e4e4e7",
        input: "#e4e4e7",
        sidebar: "#fafafa",
        sidebarForeground: "#27272a",
        sidebarBorder: "#e4e4e7",
        sidebarAccent: "#f4f4f5",
        sidebarAccentForeground: "#09090b",
      },
      dark: {
        background: "#0c0c0f",
        foreground: "#fafafa",
        muted: "#18181b",
        mutedForeground: "#a1a1aa",
        card: "#141417",
        cardForeground: "#fafafa",
        popover: "#141417",
        popoverForeground: "#fafafa",
        border: "#27272a",
        input: "#27272a",
        sidebar: "#0c0c0f",
        sidebarForeground: "#d4d4d8",
        sidebarBorder: "#1f1f23",
        sidebarAccent: "#18181b",
        sidebarAccentForeground: "#fafafa",
      },
    },

    glass: {
      light: "rgba(255, 255, 255, 0.7)",
      dark: "rgba(12, 12, 15, 0.7)",
      border: "rgba(255, 255, 255, 0.1)",
      highlight: "rgba(255, 255, 255, 0.05)",
    },
  },

  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
    letterSpacing: {
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
    },
  },

  animation: {
    duration: {
      fast: "150ms",
      normal: "250ms",
      slow: "350ms",
      slower: "500ms",
    },
    easing: {
      default: "cubic-bezier(0.16, 1, 0.3, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  seo: {
    title: "QuantEdge — AI-Powered Trading Operating System",
    description: "Institutional-grade trading workspace combining journaling, analytics, replay, backtesting, and AI-powered coaching.",
    keywords: "trading, journal, analytics, backtesting, AI trading, stock market, forex, crypto, trading platform",
    ogImage: "/images/og-image.png",
    twitterHandle: "@quantedge",
  },

  email: {
    from: "QuantEdge <hello@quantedge.io>",
    support: "support@quantedge.io",
    templates: {
      welcome: {
        subject: "Welcome to QuantEdge",
        preview: "Start your trading journey",
      },
      resetPassword: {
        subject: "Reset your QuantEdge password",
        preview: "Password reset request",
      },
      verifyEmail: {
        subject: "Verify your QuantEdge email",
        preview: "Email verification",
      },
    },
  },

  links: {
    website: "https://quantedge.io",
    app: "https://app.quantedge.io",
    docs: "https://docs.quantedge.io",
    status: "https://status.quantedge.io",
    twitter: "https://x.com/quantedge",
    github: "https://github.com/quantedge",
    discord: "https://discord.gg/quantedge",
  },

  navigation: [
    { label: "Dashboard", href: "/", icon: "LayoutDashboard", shortcut: "G D" },
    { label: "Journal", href: "/journal", icon: "BookOpen", shortcut: "G J" },
    { label: "Analytics", href: "/analytics", icon: "BarChart3", shortcut: "G A" },
    { label: "Replay", href: "/replay", icon: "PlayCircle", shortcut: "G R" },
    { label: "Backtesting", href: "/backtesting", icon: "FlaskConical", shortcut: "G B" },
    { label: "AI Coach", href: "/coach", icon: "Bot", shortcut: "G C" },
    { label: "Playbooks", href: "/playbooks", icon: "FileText", shortcut: "G P" },
    { label: "Reports", href: "/reports", icon: "PieChart", shortcut: "G R" },
    { label: "Goals", href: "/goals", icon: "Target", shortcut: "G G" },
    { label: "Settings", href: "/settings", icon: "Settings", shortcut: "G S" },
  ],

  metrics: {
    currency: "USD",
    locale: "en-US",
    timezone: "America/New_York",
    marketOpen: "09:30",
    marketClose: "16:00",
  },
} as const;

export type Brand = typeof brand;
