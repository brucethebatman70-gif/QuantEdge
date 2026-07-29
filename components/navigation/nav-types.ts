export type SidebarMode = "expanded" | "collapsed" | "auto";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  shortcut?: string;
  badge?: NavBadge;
  section: NavSection;
}

export interface NavSection {
  id: string;
  label: string;
  icon?: string;
}

export interface NavBadge {
  type: "new" | "beta" | "live" | "ai" | "updates" | "unread";
  count?: number;
}

export interface FavoriteItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  order: number;
}

export interface RecentPage {
  href: string;
  label: string;
  icon: string;
  visitedAt: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: "insight" | "alert" | "update" | "achievement";
  read: boolean;
  createdAt: number;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: "workspace", label: "Workspace", icon: "Layers" },
  { id: "trading", label: "Trading", icon: "TrendingUp" },
  { id: "analytics", label: "Analytics", icon: "BarChart3" },
  { id: "ai", label: "AI", icon: "Brain" },
  { id: "reports", label: "Reports", icon: "FileText" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", shortcut: "G D", section: { id: "workspace", label: "Workspace" } },
  { id: "journal", label: "Journal", href: "/journal", icon: "BookOpen", shortcut: "G J", section: { id: "trading", label: "Trading" } },
  { id: "import", label: "Import", href: "/import", icon: "Upload", shortcut: "G I", section: { id: "trading", label: "Trading" } },
  { id: "playbooks", label: "Playbooks", href: "/playbooks", icon: "FileText", shortcut: "G P", section: { id: "trading", label: "Trading" } },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: "BarChart3", shortcut: "G A", badge: { type: "live" }, section: { id: "analytics", label: "Analytics" } },
  { id: "charts", label: "Charts Hub", href: "/charts", icon: "LineChart", shortcut: "G H", section: { id: "analytics", label: "Analytics" } },
  { id: "calendar", label: "Calendar", href: "/calendar", icon: "Calendar", section: { id: "analytics", label: "Analytics" } },
  { id: "replay", label: "Replay", href: "/replay", icon: "PlayCircle", shortcut: "G R", section: { id: "analytics", label: "Analytics" } },
  { id: "backtesting", label: "Backtesting", href: "/backtesting", icon: "FlaskConical", shortcut: "G B", badge: { type: "beta" }, section: { id: "analytics", label: "Analytics" } },
  { id: "copilot", label: "AI Copilot", href: "/copilot", icon: "Bot", shortcut: "G C", badge: { type: "ai" }, section: { id: "ai", label: "AI" } },
  { id: "goals", label: "Goals", href: "/goals", icon: "Target", shortcut: "G G", section: { id: "ai", label: "AI" } },
  { id: "coach", label: "AI Coach", href: "/coach", icon: "Brain", shortcut: "G T", badge: { type: "new" }, section: { id: "ai", label: "AI" } },
  { id: "reports", label: "Reports", href: "/reports", icon: "PieChart", shortcut: "G R", section: { id: "reports", label: "Reports" } },
  { id: "settings", label: "Settings", href: "/settings", icon: "Settings", shortcut: "G S", section: { id: "settings", label: "Settings" } },
];
