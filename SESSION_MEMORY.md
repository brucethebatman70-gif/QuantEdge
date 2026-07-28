# QuantEdge — Session Memory

## Session Date
July 28, 2026

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
| Route | File | Notes |
|-------|------|-------|
| `/` | `app/(dashboard)/page.tsx` | Dashboard with SVG charts |
| `/login` | `app/(auth)/login/page.tsx` | Framer Motion animated |
| `/register` | `app/(auth)/register/page.tsx` | Registration form |
| `/journal` | `app/(dashboard)/journal/page.tsx` | Table with search/tabs |
| `/analytics` | `app/(dashboard)/analytics/page.tsx` | 4-tab analytics |
| `/replay` | `app/(dashboard)/replay/page.tsx` | Playback controls |
| `/backtesting` | `app/(dashboard)/backtesting/page.tsx` | 3-tab backtesting |
| `/coach` | `app/(dashboard)/coach/page.tsx` | Interactive AI chat |
| `/playbooks` | `app/(dashboard)/playbooks/page.tsx` | Strategy cards |
| `/reports` | `app/(dashboard)/reports/page.tsx` | Report list |
| `/goals` | `app/(dashboard)/goals/page.tsx` | Progress bars |
| `/settings` | `app/(dashboard)/settings/page.tsx` | Preferences |

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

## Build Status (Session End)
- ✅ Build: 0 errors, 0 warnings (14 static routes)
- ✅ TypeScript: 0 errors
- ✅ Lint: 0 errors, 0 warnings
- ✅ All 14 routes compile
- ✅ Git initialized at `C:\Users\abdul\QuantEdge`
- ✅ Production config applied (next.config.ts, vercel.json, .env.example)
- ✅ Ready for GitHub push + Vercel deploy

## Session 2 Changes (July 28, 2026)
1. **Fixed corrupted favicon.ico** — replaced with `app/icon.svg` (Next.js 16 native SVG favicon support)
2. **Fixed lint errors** — replaced `Math.random()` with deterministic `((i * 137 + 50) % 2000)` in dashboard equity curve
3. **Removed 12+ unused imports/variables** across dashboard, analytics, backtesting, coach, journal pages
4. **Optimized `next.config.ts`** — added `removeConsole`, `experimental.optimizePackageImports` (14 packages)
5. **Created `vercel.json`** — security headers, static asset caching, SPA rewrites
6. **Created `.env.example`** — documented all future env vars (auth, DB, AI)
7. **Updated `.gitignore`** — added IDE files, OS files, log files, preserved `.env.example`
8. **Ran `git init`** — repository ready for first commit

## Known Limitations / Future Work
1. **Auth**: No real authentication — login/register are UI-only with mock delays
2. **API Routes**: No backend API yet — all data is client-side mock data
3. **Database**: No database integration — replace `mock-data.ts` with real API calls
4. **WebSocket**: No real-time data — replay, real-time prices need WS integration
5. **Chart Library**: Current SVG charts are hand-coded — swap to Recharts for production
6. **Tests**: No test suite — add Vitest + Playwright
7. **PWA**: Not configured — add manifest, service worker
8. **Multi-language**: Only English — add i18n
9. **Analytics**: No tracking — add PostHog or Plausible
10. **CI/CD**: No pipeline — add GitHub Actions
11. **Social preview**: Need `app/opengraph-image.png` for rich link previews

## How to Continue in a New Session
1. Read this SESSION_MEMORY.md file
2. Run `npm install` to restore dependencies
3. Run `npm run dev` to start the server
4. Check `config/brand.ts` for the centralized branding config
5. Check `lib/mock-data.ts` for the data layer
6. Check `components/ui/` for all available UI components
7. Each page is in `app/(dashboard)/[feature]/page.tsx`
8. Run `npm run build` && `npx eslint . --ext .ts,.tsx` before committing
9. To deploy: push to GitHub, import in Vercel (settings auto-detected from `vercel.json`)
