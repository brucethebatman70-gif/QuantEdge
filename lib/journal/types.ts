export type Emotion =
  | "confident" | "neutral" | "anxious" | "fomo"
  | "greedy" | "fearful" | "bored" | "frustrated"
  | "hopeful" | "calm" | "aggressive" | "impatient" | "patient";

export type MistakeType =
  | "fomo" | "early_entry" | "late_exit" | "oversized"
  | "no_stop" | "chased" | "revenge" | "overtrading"
  | "missed_setup" | "deviation";

export type SessionType = "morning" | "afternoon" | "overnight";
export type JournalStatus = "draft" | "published";

export interface JournalPsychology {
  emotion: Emotion | null;
  energyLevel: number;
  confidence: number;
  discipline: number;
  notes: string;
  triggers: string[];
}

export interface JournalExecution {
  planFollowed: boolean;
  entryTiming: number;
  exitTiming: number;
  riskManagement: number;
  mistake: MistakeType | null;
  mistakeNote: string;
  lessonLearned: string;
}

export interface JournalScreenshot {
  id: string;
  url: string;
  caption: string;
  type: "chart" | "order" | "note" | "other";
  uploadedAt: string;
}

export interface JournalVoiceNote {
  id: string;
  duration: number;
  transcript: string;
  recordedAt: string;
}

export interface JournalTemplate {
  id: string;
  name: string;
  description: string;
  setup: string;
  sections: {
    notes: string;
    psychology: Partial<JournalPsychology>;
    execution: Partial<JournalExecution>;
  };
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  status: JournalStatus;
  tags: string[];
  session: SessionType;
  marketConditions: string;
  psychology: JournalPsychology;
  execution: JournalExecution;
  screenshots: JournalScreenshot[];
  voiceNotes: JournalVoiceNote[];
  linkedTrades: string[];
  linkedReplays: string[];
  createdAt: string;
  updatedAt: string;
  templateId: string | null;
  aiSummary: string | null;
  aiScore: number | null;
}

export interface JournalFilter {
  dateRange: [string, string] | null;
  tags: string[];
  emotions: Emotion[];
  status: JournalStatus | "all";
  session: SessionType | "all";
  search: string;
}

export type SortOrder = "newest" | "oldest";
