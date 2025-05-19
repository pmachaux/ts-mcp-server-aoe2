import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Logger } from "winston";

// Create server instance
export const getMcpServer = (logger: Logger) => {
  const server = new McpServer({
    name: "aoe2-assistant",
    version: "1.0.0",
    capabilities: {
      resources: {},
      tools: {},
    },
  });
  // Register weather tools
  server.tool(
    "aoe2-query",
    "Prepare questions with context about aoe2",
    {
      question: z.string().describe("The question to ask the AoE2 assistant"),
    },
    async ({ question }) => {
      logger.info(`Received question: ${question}`);
      return {
        content: [
          {
            type: "text",
            text: "Hello, how can I help you with Age of Empires 2?",
          },
        ],
      };
    }
  );
  return server;
};
