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
│       ├── reports/          # Reports Center (builder, schedule, export, AI summary, history)
│       ├── goals/            # Goals & Performance Center (goals, habits, achievements, AI coach, discipline)
│       └── settings/         # Settings Center (profile, workspace, appearance, security, billing, 13 sections)
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
| `/goals` | Goals & Performance Center |
| `/settings` | Settings |

## Settings Center

| Module | Description |
|--------|-------------|
| **Profile** | Avatar, display name, email, phone, country, timezone, language, trading experience, bio |
| **Workspace** | Default dashboard, account, broker, timeframe, currency, measurement units |
| **Appearance** | Dark/Light/System theme, 6 accent colors, sidebar style, glass intensity, compact mode, border radius, typography scale, animation level |
| **Notifications** | 3 delivery channels (desktop, email, mobile), 3 alert types (trade, goal, AI), 2 report subscriptions |
| **Broker Connections** | MT4/MT5/TradingView/cTrader connections with status badges, reconnect/disconnect actions |
| **AI Preferences** | Model picker (GPT-4, Claude 3, GPT-3.5, Gemini), response/coaching/risk styles, memory, voice mode, smart suggestions |
| **Security** | Password, 2FA toggle, active sessions list, recovery codes |
| **Privacy** | Analytics sharing, data export, danger zone with account deletion |
| **API Keys** | OpenAI/Anthropic/Google AI keys with usage bars and status |
| **Integrations** | Discord, Slack, Telegram, Google Drive with connect/disconnect toggles |
| **Billing** | Current plan card, usage bar, invoices/payment buttons |
| **Keyboard Shortcuts** | Grouped shortcut list (global, trading, journal, replay, analytics, navigation) |
| **About** | App info, version, legal links |
| **Help Panel** | Collapsible right sidebar with quick tips, documentation, video tutorials, support, community links |
| **Data layer** | `lib/settings/` — types, vanilla Proxy store with 25+ settings across 13 sections |

## Reports Center

| Module | Description |
|--------|-------------|
| **Report Builder** | Template-based builder with 6 report types (daily → yearly + custom), 16 configurable sections, 8 chart types, custom branding, date range picker, and saveable templates |
| **Quick Report Cards** | 6 animated glass cards for one-click report generation by type |
| **Report History** | Filtered/sortable history with search, status badges, quick actions (Download, Share, Delete), and chart type indicators |
| **Report Preview** | Full report details with metrics grid, sections list, chart thumbnails, tags, file size, and download |
| **Scheduled Reports** | CRUD for schedules with daily/weekly/monthly/quarterly/yearly frequency, toggle active/paused, delete |
| **Export Center** | Format picker (PDF, CSV, Excel, JSON) with format descriptions and recent export jobs with processing states |
| **AI Executive Summary** | 7-section AI-generated analysis (Performance, Strengths, Weaknesses, Recommendations, Risk Warnings, Next Week Focus, Monthly Action Plan) with expandable cards and score bars |
| **Data layer** | `lib/reports/` — types, mock data (8 reports, 4 templates, 4 schedules, 6 exports), vanilla Proxy store |

## Goals & Performance Center

| Module | Description |
|--------|-------------|
| **Goal Tracking** | 20 goals across 7 categories (profit, consistency, risk, psychology, education, habit, strategy) and 6 types (daily → yearly + custom) with milestones, tags, and habit links |
| **Habit Tracker** | 8 trading habits with 30-day boolean grid, toggle buttons, streak counters, and category grouping |
| **Achievements** | 7 achievements with 4 rarity tiers (common → legendary), progress bars, unlock dates |
| **Discipline Dashboard** | 4 live metrics (rule compliance, risk discipline, journal completion, review completion) with color-coded progress bars and overall score |
| **AI Coach** | 7 insight types (weekly/monthly review, habit analysis, weakness, strength, suggestion, motivation) with score bars and expandable descriptions |
| **KPIs** | 9 performance KPIs with animated progress bars and color-coded thresholds |
| **Create Goal** | Tabbed dialog with 4 templates, type/category pickers, title, description, target, deadline |
| **Smart Filtering** | Status filters (All/Active/Completed/Missed) + category chips + search |

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
