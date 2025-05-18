import express, { Request, Response } from "express";
import { createServer } from "http";
import { config } from "./config";
import logger from "./utils/logger";
import { contextManager } from "./services/contextManager";
import { MCPRequest, MCPResponse } from "./types/mcp";

const app = express();
app.use(express.json());

const httpServer = createServer(app);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// MCP HTTP endpoints
app.post("/mcp", async (req: Request, res: Response) => {
  const request = req.body as MCPRequest;
  const response = await contextManager.handleRequest(request);
  res.json(response);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  contextManager.destroy();
  httpServer.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

// Start the server
httpServer.listen(config.port, () => {
  logger.info(`MCP Server running on port ${config.port}`);
  logger.info(`Environment: ${config.environment}`);
});
