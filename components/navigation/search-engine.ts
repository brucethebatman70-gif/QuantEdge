"use client";

import { mockTrades } from "@/lib/mock-data";
import { mockJournalEntries } from "@/lib/journal/mock-journal";
import { NAV_ITEMS } from "./nav-types";

export interface SearchableItem {
  id: string;
  label: string;
  description?: string;
  icon: string;
  section: string;
  href?: string;
  shortcut?: string;
  keywords: string[];
  metadata?: Record<string, string | number>;
  action?: () => void;
}

function buildIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];

  items.push(...NAV_ITEMS.map((n) => ({
    id: `nav-${n.id}`,
    label: n.label,
    icon: n.icon,
    section: "Pages",
    href: n.href,
    shortcut: n.shortcut,
    keywords: [n.label, n.id, n.section.label, ...(n.badge ? [n.badge.type] : [])],
  })));

  items.push(
    { id: "quick-trade", label: "Create New Trade", icon: "Plus", section: "Quick Actions", href: "/journal", keywords: ["trade", "new", "create", "add", "entry"] },
    { id: "quick-import", label: "Import CSV", icon: "Upload", section: "Quick Actions", href: "/import", keywords: ["csv", "import", "file", "upload", "broker"] },
    { id: "quick-ai", label: "Open AI Copilot", icon: "Bot", section: "Quick Actions", href: "/copilot", keywords: ["ai", "copilot", "analyze", "insight"] },
    { id: "quick-report", label: "Generate Report", icon: "PieChart", section: "Quick Actions", href: "/reports", keywords: ["report", "generate", "pdf", "export"] },
    { id: "quick-journal", label: "Quick Journal Entry", icon: "Edit3", section: "Quick Actions", href: "/journal", keywords: ["journal", "note", "entry", "write"] },
    { id: "quick-connect", label: "Connect Broker", icon: "Link", section: "Quick Actions", href: "/settings?tab=broker", keywords: ["broker", "connect", "api", "sync"] },
    { id: "quick-theme", label: "Toggle Theme", icon: "Sun", section: "Quick Actions", keywords: ["theme", "dark", "light", "mode"], action: () => { document.documentElement.classList.toggle("dark"); } },
    { id: "quick-analysis", label: "Start AI Analysis", icon: "Brain", section: "Quick Actions", href: "/copilot", keywords: ["analysis", "ai", "insight", "scan"] },
    { id: "quick-export", label: "Export Journal", icon: "Download", section: "Quick Actions", keywords: ["export", "journal", "backup", "csv"] },
  );

  mockTrades.forEach((t) => {
    items.push({
      id: `trade-${t.id}`,
      label: `${t.symbol} ${t.direction === "long" ? "▲" : "▼"} ${t.status}`,
      description: `${t.setup} | ${new Date(t.entryDate).toLocaleDateString()} | ${t.pnl ? `${t.pnl >= 0 ? "+" : ""}$${t.pnl}` : "Open"}`,
      icon: t.direction === "long" ? "TrendingUp" : "TrendingDown",
      section: "Trades",
      href: `/journal?trade=${t.id}`,
      keywords: [t.symbol, t.setup, t.direction, t.status, ...t.tags, t.emotion, ...(t.mistake ? [t.mistake] : [])],
      metadata: { pnl: t.pnl ?? 0, quantity: t.quantity },
    });
  });

  mockJournalEntries.slice(0, 50).forEach((j) => {
    items.push({
      id: `journal-${j.id}`,
      label: j.title || "Journal Entry",
      description: j.content ? j.content.slice(0, 80) + "..." : new Date(j.createdAt).toLocaleDateString(),
      icon: "BookOpen",
      section: "Journal",
      href: `/journal?id=${j.id}`,
      keywords: [j.title, j.content || "", j.session || "", ...j.tags],
      metadata: { date: j.createdAt },
    });
  });

  return items;
}

export const searchIndex = buildIndex();

export function highlightMatch(text: string, query: string): { before: string; match: string; after: string } | null {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return null;
  return {
    before: text.slice(0, idx),
    match: text.slice(idx, idx + query.length),
    after: text.slice(idx + query.length),
  };
}

export function searchItems(query: string): SearchableItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored = searchIndex
    .map((item) => {
      let score = 0;
      const searchable = [item.label, ...item.keywords].map((k) => k.toLowerCase());

      if (q === "everything") return { item, score: 0 };

      for (const term of searchable) {
        if (term === q) { score += 100; break; }
        if (term.startsWith(q)) { score += 50; break; }
        if (term.includes(q)) { score += 20; break; }
      }

      const words = q.split(/\s+/);
      const matchCount = words.filter((w) => searchable.some((s) => s.includes(w))).length;
      score += matchCount * 5;

      if (score > 0 && item.description) {
        if (item.description.toLowerCase().includes(q)) score += 5;
      }

      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((s) => s.item).slice(0, 30);
}

export interface NLQuery {
  type: "show" | "find" | "analyze" | "open" | "create" | "generate";
  target?: string;
  symbol?: string;
  timeframe?: string;
  status?: string;
  filter?: string;
}

const NL_PATTERNS: { regex: RegExp; type: NLQuery["type"] }[] = [
  { regex: /^(show|find|list|get)\s/i, type: "show" },
  { regex: /^(analyze|review|scan)\s/i, type: "analyze" },
  { regex: /^(open|go\sto|navigate)\s/i, type: "open" },
  { regex: /^(create|new|add)\s/i, type: "create" },
  { regex: /^(generate|make|build)\s/i, type: "generate" },
];

export function parseNaturalLanguage(query: string): NLQuery | null {
  const q = query.trim().toLowerCase();
  if (q.length < 3) return null;

  for (const { regex, type } of NL_PATTERNS) {
    const match = q.match(regex);
    if (match) break;
  }

  const result: NLQuery = { type: "show" };
  if (q.includes("trade") || q.includes("trades")) result.target = "trades";
  else if (q.includes("journal") || q.includes("entry")) result.target = "journal";
  else if (q.includes("report")) result.target = "reports";
  else if (q.includes("setting")) result.target = "settings";
  else if (q.includes("goal")) result.target = "goals";
  else if (q.includes("backtest")) result.target = "backtesting";

  const symbols = ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN", "GOOGL", "META", "AMD", "SPY", "BTC", "ETH", "EURUSD"];
  for (const s of symbols) {
    if (q.includes(s.toLowerCase())) {
      result.symbol = s;
      break;
    }
  }

  if (q.includes("win") || q.includes("profit")) result.filter = "win";
  else if (q.includes("loss") || q.includes("losing")) result.filter = "loss";
  else if (q.includes("overtrad")) result.filter = "overtrading";
  else if (q.includes("psycholog") || q.includes("mistake") || q.includes("emotion")) result.filter = "psychology";

  if (q.includes("week") || q.includes("weekly")) result.timeframe = "weekly";
  else if (q.includes("month") || q.includes("monthly")) result.timeframe = "monthly";
  else if (q.includes("year") || q.includes("yearly")) result.timeframe = "yearly";
  else if (q.includes("today") || q.includes("yesterday")) result.timeframe = q.includes("yesterday") ? "yesterday" : "today";

  if (q.includes("show") || q.includes("find") || q.includes("list")) result.type = "show";
  else if (q.includes("analyze") || q.includes("review")) result.type = "analyze";
  else if (q.includes("open") || q.includes("go to")) result.type = "open";
  else if (q.includes("create") || q.includes("new") || q.includes("add")) result.type = "create";
  else if (q.includes("generate") || q.includes("make")) result.type = "generate";

  return result;
}

export function suggestForNLQuery(nl: NLQuery): SearchableItem[] {
  const suggestions: SearchableItem[] = [];

  if (nl.type === "show" && nl.target === "trades") {
    const filtered = searchIndex.filter((i) => i.section === "Trades");
    if (nl.filter === "win") return filtered.filter((i) => (i.metadata?.pnl as number) > 0);
    if (nl.filter === "loss") return filtered.filter((i) => (i.metadata?.pnl as number) < 0);
    return filtered.slice(0, 5);
  }

  if (nl.type === "analyze") {
    suggestions.push({
      id: "ai-analyze",
      label: `AI Analysis: ${nl.symbol ? nl.symbol + " " : ""}${nl.timeframe ? nl.timeframe + " " : ""}${nl.filter || "trades"}`,
      icon: "Brain", section: "AI Suggestions", href: "/copilot",
      keywords: [nl.target || "", nl.symbol || "", nl.filter || ""],
    });
  }

  if (nl.type === "create" && nl.target === "trades") {
    suggestions.push({
      id: "create-trade", label: `Create New Trade${nl.symbol ? ` (${nl.symbol})` : ""}`,
      icon: "Plus", section: "Quick Actions", href: "/journal",
      keywords: ["create", "trade", nl.symbol || ""],
    });
  }

  if (nl.type === "generate") {
    suggestions.push({
      id: "generate-report", label: `Generate ${nl.timeframe || ""} Report`,
      icon: "PieChart", section: "Quick Actions", href: "/reports",
      keywords: ["report", "generate", nl.timeframe || ""],
    });
  }

  if (nl.type === "open") {
    const target = searchIndex.find((i) => i.label.toLowerCase().includes(nl.target || ""));
    if (target) suggestions.push(target);
  }

  suggestions.push({
    id: "nl-fallback",
    label: `"${nl.target || "trades"}" — View in Analytics`,
    icon: "BarChart3", section: "AI Suggestions", href: "/analytics",
    keywords: [nl.target || ""],
  });

  return suggestions.slice(0, 5);
}
