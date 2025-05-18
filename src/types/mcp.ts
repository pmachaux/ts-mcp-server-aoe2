export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Context {
  id: string;
  messages: Message[];
  model: string;
  metadata: {
    created: number;
    lastUpdated: number;
    tokenCount: number;
  };
}

export interface MCPRequest {
  type: "create" | "update" | "query" | "delete";
  contextId?: string;
  message?: Message;
  model?: string;
  metadata?: Record<string, unknown>;
}

export interface MCPResponse {
  success: boolean;
  error?: string;
  context?: Context;
  contexts?: Context[];
}

export interface ModelConfig {
  name: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}
