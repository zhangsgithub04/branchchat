export type Role = 'user' | 'model' | 'system';
export type AIProvider = 'gemini' | 'openai';

export interface Suggestion {
  label: string;
  prompt: string;
}

export interface NodeMetadata {
  depth: number;
  wordCount: number;
  charCount: number;
  sentiment?: 'positive' | 'neutral' | 'negative'; // Placeholder for potential future analysis
  interactionType: 'manual' | 'suggestion' | 'branch';
}

export interface MessageNode {
  id: string;
  role: Role;
  content: string;
  suggestions?: Suggestion[];
  parentId: string | null;
  children: string[];
  timestamp: number;
  metadata: NodeMetadata;
}

export interface LearningStyleAnalysis {
  activeReflective: number; // -1 (Reflective) to 1 (Active)
  sequentialGlobal: number; // -1 (Sequential) to 1 (Global)
  sensingIntuitive: number; // -1 (Sensing) to 1 (Intuitive)
  summary: string;
  traits: string[];
  backgroundDiagnosis: string;
  improvementSuggestions: string[];
}

export interface ConversationState {
  nodes: Record<string, MessageNode>;
  activeNodeId: string | null;
  rootId: string | null;
  analysis?: LearningStyleAnalysis;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface SessionSummary {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}
