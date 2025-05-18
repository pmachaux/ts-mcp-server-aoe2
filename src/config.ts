export const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
  // MCP specific settings
  maxPlayers: 8,
  gameTimeout: 3600, // 1 hour in seconds
  heartbeatInterval: 5000, // 5 seconds
} as const;
