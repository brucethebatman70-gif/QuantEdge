# QuantEdge — Session Memory

## Session Date
July 29, 2026

## Assistant
opencode (deepseek-v4-flash-free)

## Project Summary
Built an enterprise-grade AI Trading Operating System called **QuantEdge** from scratch using Next.js 16.2.12 (App Router) with React 19, Tailwind CSS v4, TypeScript 5, and 20+ premium libraries.

## Architecture Decisions

### Branding Architecture
- **Centralized single-source-of-truth**: `config/brand.ts` contains ALL branding — name, colors, typography, navigation, SEO, email templates, links, metrics.
- **Never hardcode anything**: Every component reads from `brand` config. To rebrand, edit ONLY `config/brand.ts`.
- **Icon registry**: `lib/icons.tsx` maps string names to Lucide icon components, so `brand.navigation` can reference icons by name.

### Folder Structure
- **Route groups**: `(dashboard)/` for authenticated routes, `(auth)/` for public auth pages.
- **Feature-based organization**: Each dashboard feature (journal, analytics, replay, etc.) has its own folder with `page.tsx`.
- **Shared components** in `components/ui/` (base primitives) and `components/layout/` (app shell).

### Design System
- **Tailwind CSS v4** with `@theme inline` directives for design tokens.
- **CSS custom properties** for dynamic theming (light/dark mode via class toggle).
- **Glass morphism** via `.glass` and `.glass-strong` utility classes with backdrop-blur.
- **Custom scrollbars** styled via CSS (thin, themed).
- **Fonts**: Inter (sans) + JetBrains Mono (mono) via Next.js font optimization.

### UI Components (16 total)
Built on **Radix UI** primitives with consistent styling:
- `button.tsx` — 6 variants (default, destructive, outline, secondary, ghost, link, premium), 7 sizes
- `card.tsx` — Header, Title, Description, Content, Footer
- `badge.tsx` — 6 variants with color-coded states
- `dialog.tsx` — Modal with overlay, header, footer, close button
- `dropdown-menu.tsx` — Full Radix dropdown with all sub-components
- `tabs.tsx` — Radix tabs with animated indicator
- `select.tsx` — Custom select with scroll buttons
- `tooltip.tsx`, `popover.tsx`, `progress.tsx`, `switch.tsx`, `avatar.tsx`, `separator.tsx`, `scroll-area.tsx`, `skeleton.tsx`, `input.tsx`, `label.tsx`

### Layout
- **Sidebar**: Collapsible (240px ↔ 60px), shows tooltips when collapsed, keyboard shortcut hints, Radix Tooltip for collapsed state, brand navigation from config.
- **Navbar**: Sticky with backdrop-blur, theme toggle, notification bell, user avatar dropdown.
- **DashboardLayout**: Composes Sidebar + Navbar + main content area.

### Pages (12 routes)
| Route | File | Module |
|-------|------|--------|
| `/` | `app/(dashboard)/page.tsx` | Dashboard (SVG charts, KPI summary) |
| `/login` | `app/(auth)/login/page.tsx` | Auth (Framer Motion animated) |
| `/register` | `app/(auth)/register/page.tsx` | Auth (registration form) |
| `/journal` | `app/(dashboard)/journal/page.tsx` | Trade Journal (table + calendar) |
| `/analytics` | `app/(dashboard)/analytics/page.tsx` | Analytics & Intelligence Center (4 tabs) |
| `/replay` | `app/(dashboard)/replay/page.tsx` | Trade Replay Center (chart + timeline) |
| `/backtesting` | `app/(dashboard)/backtesting/page.tsx` | Backtesting Center (5 tabs) |
| `/coach` | `app/(dashboard)/coach/page.tsx` | AI Trading Coach (interactive chat) |
| `/playbooks` | `app/(dashboard)/playbooks/page.tsx` | Playbooks (strategy cards) |
| `/reports` | `app/(dashboard)/reports/page.tsx` | Reports (report list) |
| `/goals` | `app/(dashboard)/goals/page.tsx` | Goals (progress tracking) |
| `/settings` | `app/(dashboard)/settings/page.tsx` | Settings (preferences) |

### Data Layer
- `lib/mock-data.ts` — Realistic example data: 10 trades (9 closed, 1 open), equity curve (60 points), 6 goals, 6 playbooks, 5 backtest strategies, monthly P&L, win/loss by day, symbol performance, AI insights, setup performance, setup analysis.

### Color Palette
- **Primary**: Indigo (#6366f1 → #818cf8 dark)
- **Accent**: Cyan (#06b6d4 → #22d3ee dark)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Info**: Blue (#3b82f6)
- **Light surface**: White, zinc-50 borders
- **Dark surface**: Near-black (#0c0c0f), zinc-800 borders

### Performance
- Turbopack for dev + production builds
- Images optimized via Next.js Image component
- Fonts loaded with `display: swap`
- All static pages prerendered
- No client-side data fetching (all mock data is local)

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation via `useKeyboard` hook
- Focus management with Radix UI
- Reduced motion via Tailwind/class toggles
- Semantic HTML throughout

## Installed Dependencies

### Production
- `next@16.2.12`, `react@19.2.4`, `react-dom@19.2.4`
- `framer-motion@^12.10.2` — Animation library
- `lucide-react@^0.511.0` — Icon library
- `@radix-ui/*` (12 packages) — Accessible UI primitives
- `class-variance-authority@^0.7.1` — Variant management
- `clsx@^2.1.1`, `tailwind-merge@^3.2.0` — Class utilities
- `zustand@^5.0.5` — State management
- `sonner@^2.0.3` — Toasts
- `recharts@^2.15.3` — Charts (installed for future use)
- `@tanstack/react-table` — Tables (installed for future use)
- `react-hook-form@^7.56.0`, `@hookform/resolvers`, `zod@^3.24.4` — Forms
- `next-themes@^0.4.6` — Theme switching
- `date-fns@^4.1.0` — Date utilities
- `vaul@^1.1.2` — Drawer component
- `cmdk@^1.1.1` — Command palette
- `embla-carousel-react@^8.6.0` — Carousel

### Dev
- `typescript@^5`, `@types/node`, `@types/react`, `@types/react-dom`
- `tailwindcss@^4`, `@tailwindcss/postcss`
- `eslint@^9`, `eslint-config-next@16.2.12`

## Build Status (Current)
- ✅ Build: 0 errors, 0 warnings (22 static routes)
- ✅ TypeScript: 0 errors
- ✅ Lint: 0 errors, 0 warnings
- ✅ Git initialized at `C:\Users\abdul\QuantEdge`
- ✅ Production config applied (next.config.ts, vercel.json, .env.example)

## Session 2 (July 28, 2026)
1. Fixed corrupted favicon.ico — replaced with `app/icon.svg` (Next.js 16 native SVG favicon support)
2. Fixed lint errors — replaced `Math.random()` with deterministic `((i * 137 + 50) % 2000)` in dashboard equity curve
3. Removed 12+ unused imports/variables across dashboard, analytics, backtesting, coach, journal pages
4. Optimized `next.config.ts` — added `removeConsole`, `experimental.optimizePackageImports` (14 packages)
5. Created `vercel.json` — security headers, static asset caching, SPA rewrites
6. Created `.env.example` — documented all future env vars (auth, DB, AI)
7. Updated `.gitignore` — added IDE files, OS files, log files, preserved `.env.example`
8. Ran `git init` — repository ready for first commit

## Session 3 — Trade Journal Module (July 29, 2026)
1. **Created `lib/journal/types.ts`** — 8 interfaces (Trade, JournalEntry, JournalStats, JournalStoreState, etc.)
2. **Created `lib/journal/mock-journal.ts`** — 30 trades (W/L split), 12 months of statistics, streak data, 100+ journal entries
3. **Created `lib/journal/store.ts`** — Vanilla Proxy store with trade selection, search, filter, view mode, and pagination
4. **Created `components/journal/`** — 6 components:
   - `journal-header.tsx` — Stats bar (win rate, P&L, streak, expectancy) with monthly/yearly selectors
   - `journal-table.tsx` — Search, 6 filter pills (All/Won/Lost/Open/Scratched/Be targets), sortable columns, pagination
   - `journal-calendar.tsx` — Monthly calendar heatmap with green/red day tiles, win rate per day, week headers, navigation
   - `journal-metrics.tsx` — Recharts combo chart (bar P&L + line win rate) with 12-month toggle and performance KPIs
   - `journal-detail.tsx` — Slide-over panel with trade metadata, journal entries, tags, session info
   - `journal-tags.tsx` — Tag cloud with category badges, tag usage ranking
5. **Replaced `app/(dashboard)/journal/page.tsx`** — Full layout with sidebar (calendar + metrics), main (table + header), and detail panel
6. **Build**: 0 errors (3 initial TS fixes: recharts typing, unused import, import path)

## Session 4 — Analytics & Intelligence Center (July 29, 2026)
1. **Created `lib/analytics/types.ts`** — 10 interfaces (AnalyticsFilter, SymbolPerformance, WinLossByDay, SetupAnalysis, AIInsight, Pattern, ComparisonItem, etc.)
2. **Created `lib/analytics/mock-analytics.ts`** — 12 months of daily stats, 8 symbols with monthly P&L, 6 AI insight categories (patterns, anomalies, comparisons), 8 setup types, 120 win/loss day entries
3. **Created `lib/analytics/store.ts`** — Vanilla Proxy store with activeTab, dateRange, and symbol filter
4. **Created `components/analytics/`** — 5 components:
   - `analytics-header.tsx` — Date range selector (30/60/90/YTD/All), 3 KPI chips (Best Day, Worst Day, Avg Day), symbol filter
   - `performance-chart.tsx` — Recharts combo chart (AreaChart for P&L + BarChart for volume), symbol-based monthly view
   - `win-loss-analysis.tsx` — Win rate by day-of-week bar chart + win/loss ratio by session time heatmap
   - `setup-analysis.tsx` — Setup performance leaderboard, frequency donut chart, trade distribution by outcome
   - `ai-insights.tsx` — 3-column insight card grid with severity badges, animated icons, actionable metrics
5. **Replaced `app/(dashboard)/analytics/page.tsx`** — 4-tab layout (Performance, Win/Loss, Setups, AI Insights)
6. **Build**: 0 errors

## Session 5 — Trade Replay Center (July 29, 2026)
1. **Created `lib/replay/types.ts`** — 8 interfaces (ReplayTrade, ChartBar, Event, Annotation, Screenshot, ReplayStoreState, etc.)
2. **Created `lib/replay/mock-replay.ts`** — 5 replay trades with 80+ candlestick bars each, 70+ timestamped events, 10 annotations, 6 screenshots
3. **Created `lib/replay/store.ts`** — Vanilla Proxy store with playback state, speed, compare mode, active annotation/screenshot
4. **Created `components/replay/`** — 7 components:
   - `replay-header.tsx` — Trade selector chips (P&L badges), speed control (1x–100x), play/pause/step, progress slider
   - `replay-chart.tsx` — Canvas candlestick chart with moving average overlay, volume bars, entry/exit markers, buy/sell signals array, auto-scroll
   - `event-timeline.tsx` — Chronological event list with directional badges, P&L deltas, buy/sell signal tags, auto-scroll on play
   - `trade-panel.tsx` — Trade metadata card (direction, entries, exits, P&L, R:R, duration, fees, tags, notes), signal details
   - `compare-mode.tsx` — Side-by-side trade comparison toggle with two-select dropdown
   - `annotations.tsx` — Annotation list with color-coded categories, add/edit/delete, category breakdown
   - `screenshot-gallery.tsx` — Thumbnail grid with lightbox overlay, category badges, download
5. **Replaced `app/(dashboard)/replay/page.tsx`** — Full layout with chart + event timeline + right sidebar
6. **Build**: 0 errors

## Session 6 — Backtesting Center (July 29, 2026)
1. **Created `lib/backtesting/types.ts`** — 12 interfaces (BacktestConfig, EntryRule, ExitRule, BacktestStrategy, BacktestResult, SimulatedTrade, OptimizationRun, AiStrategyAnalysis, BacktestStoreState, plus enums)
2. **Created `lib/backtesting/mock-backtesting.ts`** — 8 strategies (EMA Crossover, Breakout Scanner, Mean Reversion, Momentum Pullback, VWAP Strategy, Gap Fill, ICT Killzone, Scalp Momentum) with full configs, entry/exit rules, backtest results (13 KPIs), equity curves (60 points), simulated trade logs (30 trades each), 2 optimization runs, 2 detailed AI analyses
3. **Created `lib/backtesting/store.ts`** — BacktestStoreState with activeTab, selectedStrategyId, selectedResultId, compareIds
4. **Created `components/backtesting/`** — 7 components:
   - `backtesting-header.tsx` — 5 action buttons (New Backtest, Save Config, Run Test, Compare, Export)
   - `strategy-library.tsx` — 4-column responsive grid with search, filter pills (All/Favorites/Templates), per-card KPI display (Win Rate, P&L, Trades, Sharpe, Max DD, PF), Run/Delete actions
   - `strategy-config.tsx` — 2-column config panel with 10 config fields (market, broker, timeframe, execution model, balance, risk %, commission, spread, slippage, leverage) + entry/exit rules cards
   - `results-dashboard.tsx` — Strategy selector chips, 13 KPI cards grid, performance chart toggle (P&L comparison bar / equity curve area), full comparison datatable (all 8 strategies)
   - `trade-log.tsx` — Sortable/filterable simulated trade table with search, direction filter (All/Long/Short), P&L coloring, exit reason badges (TP/SL/Trailing/Time/Manual)
   - `optimization-panel.tsx` — Parameter optimization with run comparison, configurable parameter grid, best/worst configuration highlights, bar chart of all runs
   - `ai-analysis.tsx` — Strategy strength/weakness/risk review with overall score (Progress bar), market suitability tags, session/pair recommendations, optimization suggestions
5. **Replaced `app/(dashboard)/backtesting/page.tsx`** — 5-tab layout (Strategy Library, Configuration, Results + Trade Log, Optimizer, AI Analysis)
6. **Build**: 0 errors (fixed narrowing comparison TS error in results-dashboard.tsx)

## Known Limitations / Future Work
1. **Auth**: No real authentication — login/register are UI-only with mock delays
2. **API Routes**: No backend API yet — all data is client-side mock data
3. **Database**: No database integration — replace all `mock-*.ts` files with real API calls
4. **WebSocket**: No real-time data — replay, real-time prices need WS integration
5. **Tests**: No test suite — add Vitest + Playwright
6. **PWA**: Not configured — add manifest, service worker
7. **Multi-language**: Only English — add i18n
8. **Analytics**: No tracking — add PostHog or Plausible
9. **CI/CD**: No pipeline — add GitHub Actions
10. **Social preview**: Need `app/opengraph-image.png` for rich link previews

## How to Continue in a New Session
1. Read this SESSION_MEMORY.md and AGENTS.md
2. Run `npm install` to restore dependencies
3. Run `npm run dev` to start the server
4. Check `config/brand.ts` for the centralized branding config
5. Check `lib/mock-data.ts` and `lib/*/mock-*.ts` for the data layer
6. Check `components/ui/` for all available UI components
7. Each page is in `app/(dashboard)/[feature]/page.tsx`
8. Run `npm run build` before committing
9. To deploy: push to GitHub, import in Vercel (settings auto-detected from `vercel.json`)
