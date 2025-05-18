import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import logger from "./utils/logger";

// Create server instance
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info("AoE2 Assistant MCP Server running on stdio");
}

main().catch((error) => {
  logger.error("Fatal error in main():", error);
  process.exit(1);
});
