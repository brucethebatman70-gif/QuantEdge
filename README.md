# QuantEdge — AI-Powered Trading Operating System

An institutional-grade AI Trading Operating System combining trading journal, advanced analytics, replay system, backtesting, AI trading coach, playbooks, reports, goals, performance tracking, risk management, and a professional trading workspace.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.2.12 (App Router, Turbopack) |
| **Runtime** | React 19.2.4, TypeScript 5 |
| **Styling** | Tailwind CSS v4, CSS custom properties |
| **Animation** | Framer Motion 12 |
| **Icons** | Lucide React |
| **UI Primitives** | Radix UI (12 primitives) |
| **State** | Zustand 5 |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Tables** | TanStack Table |
| **Toasts** | Sonner |
| **Theme** | next-themes |

## Project Structure

```
my-app/
├── config/
│   └── brand.ts              # Centralized branding (single source of truth)
├── lib/
│   ├── cn.ts                 # Tailwind class merge utility
│   ├── utils.ts              # Formatters (currency, percent, date, etc.)
│   ├── types.ts              # TypeScript type definitions
│   ├── icons.tsx             # Icon registry mapped to Lucide
│   └── mock-data.ts          # Realistic example trading data
├── hooks/
│   ├── use-mounted.ts        # SSR-safe mounted check
│   ├── use-mobile.ts         # Responsive breakpoint hook
│   └── use-keyboard.ts       # Keyboard shortcut handler
├── providers/
│   ├── app-provider.tsx      # Root provider (theme + toasts)
│   └── theme-provider.tsx    # next-themes wrapper
├── components/
│   ├── ui/                   # 16 base UI components (Button, Card, Dialog, etc.)
│   ├── layout/
│   │   ├── sidebar.tsx       # Collapsible sidebar with tooltips
│   │   ├── navbar.tsx        # Top nav with theme toggle, notifications, user menu
│   │   └── dashboard-layout.tsx  # Main layout composer
│   └── dashboard/            # Dashboard-specific components
├── app/
│   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   ├── page.tsx              # → redirects to /
│   ├── (auth)/
│   │   ├── login/page.tsx    # Animated login with social auth
│   │   └── register/page.tsx # Registration form
│   └── (dashboard)/
│       ├── page.tsx          # Dashboard (stats, equity curve, recent trades)
│       ├── journal/          # Trading journal with search & filters
│       ├── analytics/        # Multi-tab analytics (overview, performance, setups, symbols)
│       ├── replay/           # Trade replay with playback controls
│       ├── backtesting/      # Strategy backtesting with optimizer
│       ├── coach/            # AI chat + insight cards
│       ├── playbooks/        # Documented trading strategies
│       ├── reports/          # Report generation
│       ├── goals/            # Goal tracking with progress bars
│       └── settings/         # App settings
└── public/
    └── images/               # Logo assets
```

## Branding Architecture

**Everything is configurable from a single file.** Edit `config/brand.ts` to change:

- Application name, short name, tagline
- Company name, legal info, copyright
- Logo paths, favicon, OG image
- Theme colors (primary, accent, surface, glass effects)
- Typography (font families, sizes, weights, line heights)
- Animation durations and easing curves
- SEO metadata, keywords, social handles
- Email templates (welcome, reset password, verification)
- Navigation structure, labels, icons, keyboard shortcuts
- Regional settings (currency, locale, timezone, market hours)

```ts
// Changing the brand requires editing ONLY this file:
import { brand } from "@/config/brand";

brand.name          // "QuantEdge"
brand.shortName     // "QE"
brand.theme.color.primary.DEFAULT  // "#6366f1"
brand.navigation   // Array of sidebar nav items
```

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev        # → http://localhost:3000

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Routes

| Route | Page |
|-------|------|
| `/` | Dashboard |
| `/login` | Login (with social auth) |
| `/register` | Registration |
| `/journal` | Trading Journal |
| `/analytics` | Analytics & Performance |
| `/replay` | Trade Replay |
| `/backtesting` | Backtesting Engine |
| `/coach` | AI Trading Coach |
| `/playbooks` | Strategy Playbooks |
| `/reports` | Reports |
| `/goals` | Goals & Tracking |
| `/settings` | Settings |

## Design Features

- **Dark/Light mode** with smooth transitions
- **Glass morphism** effects on modals and overlays
- **120 FPS animations** via Framer Motion (ease-spring)
- **Collapsible sidebar** with tooltips and keyboard shortcuts
- **Responsive** — desktop to mobile
- **Accessible** — ARIA labels, keyboard navigation, focus management
- **SVG charts** — inline data visualizations (equity curve, bar charts, donut charts)
- **Custom scrollbars** consistent across the app
- **Premium typography** — Inter + JetBrains Mono

## License

Private — QuantEdge Technologies Inc.
