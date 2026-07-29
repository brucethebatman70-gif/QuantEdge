export type NavSectionId =
  | "profile" | "workspace" | "appearance" | "notifications" | "broker-connections"
  | "ai-preferences" | "security" | "privacy" | "api-keys" | "integrations"
  | "billing" | "keyboard-shortcuts" | "about";

export type ThemeMode = "dark" | "light" | "system";

export type AccentColor = "indigo" | "emerald" | "amber" | "rose" | "cyan" | "violet";

export type SidebarStyle = "default" | "compact" | "icon-only";

export type AnimationLevel = "full" | "reduced" | "none";

export type BorderRadius = "sm" | "md" | "lg" | "xl";

export interface ProfileSettings {
  displayName: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  timezone: string;
  language: string;
  tradingExperience: "beginner" | "intermediate" | "advanced" | "pro";
  bio: string;
}

export interface WorkspaceSettings {
  defaultDashboard: string;
  defaultAccount: string;
  defaultBroker: string;
  defaultTimeframe: string;
  defaultCurrency: string;
  measurementUnits: "pips" | "points" | "ticks";
}

export interface AppearanceSettings {
  theme: ThemeMode;
  accentColor: AccentColor;
  sidebarStyle: SidebarStyle;
  glassIntensity: number;
  compactMode: boolean;
  borderRadius: BorderRadius;
  typographyScale: number;
  animationLevel: AnimationLevel;
}

export interface NotificationSettings {
  desktop: boolean;
  email: boolean;
  mobile: boolean;
  tradeAlerts: boolean;
  goalAlerts: boolean;
  aiAlerts: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

export interface BrokerConnection {
  id: string;
  platform: string;
  label: string;
  status: "connected" | "disconnected" | "error";
  accountId: string;
  lastSync?: string;
}

export interface AiPreferences {
  preferredModel: "gpt-4" | "claude-3" | "gpt-3.5" | "gemini";
  responseStyle: "concise" | "balanced" | "detailed";
  coachingStyle: "mentor" | "analyst" | "teacher";
  riskProfile: "conservative" | "moderate" | "aggressive";
  memory: boolean;
  voiceMode: boolean;
  smartSuggestions: boolean;
}

export interface SecuritySettings {
  password: string;
  twoFactorEnabled: boolean;
  trustedDevices: { id: string; name: string; lastUsed: string }[];
  recoveryCodes: string[];
}

export interface PrivacySettings {
  analyticsSharing: boolean;
  dataExport: boolean;
}

export interface ApiKey {
  id: string;
  provider: string;
  label: string;
  status: "active" | "inactive" | "error";
  usage: number;
  createdAt: string;
}

export interface Integration {
  id: string;
  name: string;
  status: "connected" | "disconnected";
  connectedAt?: string;
}

export interface BillingInfo {
  plan: "free" | "starter" | "pro" | "enterprise";
  status: "active" | "past_due" | "canceled";
  nextBilling: string;
  usage: number;
  usageLimit: number;
}

export interface KeyboardShortcut {
  id: string;
  label: string;
  keys: string;
  category: string;
}

export interface SettingsState {
  activeNav: NavSectionId;
  profile: ProfileSettings;
  workspace: WorkspaceSettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  brokerConnections: BrokerConnection[];
  aiPreferences: AiPreferences;
  security: SecuritySettings;
  privacy: PrivacySettings;
  apiKeys: ApiKey[];
  integrations: Integration[];
  billing: BillingInfo;
  keyboardShortcuts: KeyboardShortcut[];
  showHelpPanel: boolean;
}

export const NAV_ITEMS: { id: NavSectionId; label: string; icon: string }[] = [
  { id: "profile", label: "Profile", icon: "User" },
  { id: "workspace", label: "Workspace", icon: "LayoutDashboard" },
  { id: "appearance", label: "Appearance", icon: "Sun" },
  { id: "notifications", label: "Notifications", icon: "Bell" },
  { id: "broker-connections", label: "Broker Connections", icon: "Globe" },
  { id: "ai-preferences", label: "AI Preferences", icon: "Brain" },
  { id: "security", label: "Security", icon: "Shield" },
  { id: "privacy", label: "Privacy", icon: "Lock" },
  { id: "api-keys", label: "API Keys", icon: "KeyRound" },
  { id: "integrations", label: "Integrations", icon: "Puzzle" },
  { id: "billing", label: "Billing", icon: "CreditCard" },
  { id: "keyboard-shortcuts", label: "Keyboard Shortcuts", icon: "Keyboard" },
  { id: "about", label: "About", icon: "Info" },
];

export const COUNTRY_OPTIONS = [
  "United States", "Canada", "United Kingdom", "Germany", "France",
  "Australia", "Japan", "Singapore", "Switzerland", "UAE", "India", "Brazil",
];

export const TIMEZONE_OPTIONS = [
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Europe/London", "Europe/Berlin", "Europe/Paris", "Asia/Dubai",
  "Asia/Singapore", "Asia/Tokyo", "Asia/Kolkata", "Australia/Sydney",
];

export const LANGUAGE_OPTIONS = [
  "English", "Spanish", "French", "German", "Chinese", "Japanese", "Arabic",
];

export const ACCENT_COLORS: { id: AccentColor; label: string; value: string }[] = [
  { id: "indigo", label: "Indigo", value: "#6366f1" },
  { id: "emerald", label: "Emerald", value: "#10b981" },
  { id: "amber", label: "Amber", value: "#f59e0b" },
  { id: "rose", label: "Rose", value: "#f43f5e" },
  { id: "cyan", label: "Cyan", value: "#06b6d4" },
  { id: "violet", label: "Violet", value: "#8b5cf6" },
];
