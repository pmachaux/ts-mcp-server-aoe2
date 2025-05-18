import { v4 as uuidv4 } from "uuid";
import { Context, Message, MCPRequest, MCPResponse } from "../types/mcp";
import { config } from "../config";
import logger from "../utils/logger";

class ContextManager {
  private contexts: Map<string, Context>;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    this.contexts = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Cleanup every minute
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [id, context] of this.contexts.entries()) {
      if (now - context.metadata.lastUpdated > config.contextTimeout * 1000) {
        this.contexts.delete(id);
        logger.info(`Cleaned up expired context: ${id}`);
      }
    }
  }

  async handleRequest(request: MCPRequest): Promise<MCPResponse> {
    try {
      switch (request.type) {
        case "create":
          return this.createContext(request);
        case "update":
          return this.updateContext(request);
        case "query":
          return this.queryContext(request);
        case "delete":
          return this.deleteContext(request);
        default:
          return { success: false, error: "Invalid request type" };
      }
    } catch (error) {
      logger.error("Error handling MCP request:", error);
      return { success: false, error: "Internal server error" };
    }
  }

  private createContext(request: MCPRequest): MCPResponse {
    if (!request.message) {
      return {
        success: false,
        error: "Message is required for context creation",
      };
    }

    const context: Context = {
      id: uuidv4(),
      messages: [request.message],
      model: request.model || config.defaultModel,
      metadata: {
        created: Date.now(),
        lastUpdated: Date.now(),
        tokenCount: 0, // TODO: Implement token counting
      },
    };

    this.contexts.set(context.id, context);
    logger.info(`Created new context: ${context.id}`);
    return { success: true, context };
  }

  private updateContext(request: MCPRequest): MCPResponse {
    if (!request.contextId || !request.message) {
      return {
        success: false,
        error: "Context ID and message are required for update",
      };
    }

    const context = this.contexts.get(request.contextId);
    if (!context) {
      return { success: false, error: "Context not found" };
    }

    context.messages.push(request.message);
    context.metadata.lastUpdated = Date.now();

    // Trim history if needed
    if (context.messages.length > config.maxHistoryLength) {
      context.messages = context.messages.slice(-config.maxHistoryLength);
    }

    this.contexts.set(context.id, context);
    logger.info(`Updated context: ${context.id}`);
    return { success: true, context };
  }

  private queryContext(request: MCPRequest): MCPResponse {
    if (!request.contextId) {
      return { success: false, error: "Context ID is required for query" };
    }

    const context = this.contexts.get(request.contextId);
    if (!context) {
      return { success: false, error: "Context not found" };
    }

    return { success: true, context };
  }

  private deleteContext(request: MCPRequest): MCPResponse {
    if (!request.contextId) {
      return { success: false, error: "Context ID is required for deletion" };
    }

    const deleted = this.contexts.delete(request.contextId);
    if (!deleted) {
      return { success: false, error: "Context not found" };
    }

    logger.info(`Deleted context: ${request.contextId}`);
    return { success: true };
  }

  // Cleanup resources
  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.contexts.clear();
  }
}

export const contextManager = new ContextManager();
