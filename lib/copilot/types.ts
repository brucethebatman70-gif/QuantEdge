export interface CopilotMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  metadata?: {
    sources?: string[];
    actions?: string[];
    score?: number;
    type?: "analysis" | "review" | "insight" | "suggestion" | "warning" | "success" | "error";
    confidence?: "low" | "medium" | "high" | "very-high";
    reasoning?: string;
  };
}

export interface CopilotConversation {
  id: string;
  title: string;
  messages: CopilotMessage[];
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  folder?: string;
  tags: string[];
}

export interface CopilotTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
  category: string;
}

export interface CopilotSuggestion {
  id: string;
  text: string;
  icon: string;
  category: string;
}

export interface AiInsightMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
  icon: string;
  color: string;
  trend: "up" | "down" | "stable";
}

export interface AiHomeWidget {
  id: string;
  type: "summary" | "performance" | "confidence" | "risk" | "streak" | "market" | "actions" | "events";
  title: string;
  priority: number;
}

export interface AiProactiveAlert {
  id: string;
  type: "warning" | "tip" | "insight" | "celebration";
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
}

export interface AiMemoryProfile {
  tradingStyle: string;
  preferredAssets: string[];
  riskPercent: number;
  sessions: string[];
  favoriteSetups: string[];
  goals: { label: string; progress: number }[];
  learningProgress: string[];
  knownInfo: string[];
}

export interface TradeReviewResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  riskAnalysis: string;
  psychologyAnalysis: string;
  executionScore: number;
  disciplineScore: number;
  overallGrade: string;
  improvementPlan: string[];
}

export interface EmotionProfile {
  dominant: string;
  confidence: number;
  discipline: number;
  patience: number;
  fear: number;
  greed: number;
  trend: "improving" | "stable" | "declining";
  insights: string[];
}

export interface MarketIntel {
  bias: "bullish" | "bearish" | "neutral";
  probability: number;
  keyLevels: { level: string; type: string }[];
  newsImpact: string;
  sessionAnalysis: string;
  volatility: "low" | "medium" | "high";
}

export interface Folder {
  id: string;
  name: string;
  conversationIds: string[];
}

export interface CopilotState {
  view: "home" | "chat";
  conversations: CopilotConversation[];
  activeConversationId: string | null;
  isStreaming: boolean;
  searchQuery: string;
  selectedFolder: string | null;
  showPinnedOnly: boolean;
  insights: AiInsightMetric[];
  suggestions: CopilotSuggestion[];
  templates: CopilotTemplate[];
  folders: Folder[];
  contextPanel: "insights" | "suggestions" | "templates" | null;
  proactiveAlerts: AiProactiveAlert[];
  memory: AiMemoryProfile;
  activePanel: "chat" | "review" | "emotion" | "risk" | "market" | null;
}

export const AI_INSIGHT_ICONS: Record<string, React.ElementType | undefined> = {};
export const SUGGESTION_ACTIONS: Record<string, string> = {};

export const COPILOT_CATEGORIES = [
  "all",
  "analysis",
  "review",
  "coaching",
  "risk",
  "strategy",
  "psychology",
] as const;
