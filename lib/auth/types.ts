export type TradingExperience = "beginner" | "intermediate" | "advanced" | "professional";
export type Market = "forex" | "crypto" | "indices" | "stocks" | "futures" | "options" | "commodities";
export type TradingStyle = "scalping" | "day-trading" | "swing" | "position-trading" | "algorithmic";
export type Broker = "mt4" | "mt5" | "tradingview" | "ctrader" | "matchtrader" | "dxtrade" | "other";
export type CoachingStyle = "strict" | "balanced" | "supportive";
export type FocusArea = "risk" | "psychology" | "execution" | "consistency" | "discipline";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  emailVerified: boolean;
}

export interface OnboardingData {
  step: number;
  completed: boolean;
  experience?: TradingExperience;
  markets?: Market[];
  tradingStyle?: TradingStyle;
  broker?: Broker;
  accountCurrency?: string;
  startingBalance?: number;
  riskPercent?: number;
  preferredRR?: number;
  monthlyProfitGoal?: number;
  maxDrawdown?: number;
  dailyRiskLimit?: number;
  weeklyGoal?: number;
  coachingStyle?: CoachingStyle;
  focusAreas?: FocusArea[];
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  createdAt: string;
  isCurrent: boolean;
  isTrusted: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingData: OnboardingData;
  sessions: Session[];
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  logoutEverywhere: () => Promise<void>;
  updateOnboarding: (data: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  setUser: (user: User) => void;
  resetPassword: (email: string) => Promise<void>;
  setNewPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  trustDevice: (sessionId: string) => void;
  removeSession: (sessionId: string) => void;
  clearOnboarding: () => void;
}