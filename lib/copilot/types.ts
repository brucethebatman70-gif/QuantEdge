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

export interface Folder {
  id: string;
  name: string;
  conversationIds: string[];
}

export interface CopilotState {
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
