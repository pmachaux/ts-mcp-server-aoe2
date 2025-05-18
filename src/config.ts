export const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
  // MCP specific settings
  maxContextSize: 4096, // Maximum context size in tokens
  maxHistoryLength: 50, // Maximum number of messages to keep in history
  contextTimeout: 3600, // Context timeout in seconds (1 hour)
  modelEndpoint: process.env.MODEL_ENDPOINT || "http://localhost:8000", // Default model endpoint
  supportedModels: ["gpt-3.5-turbo", "gpt-4"], // List of supported models
  defaultModel: "gpt-3.5-turbo",
} as const;
