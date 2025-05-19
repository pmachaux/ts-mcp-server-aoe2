import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Logger } from "winston";
import { getToolUnitStatsLookup } from "./tools/unit-stats-lookup.js";
import { getToolBuildOrderSuggestion } from "./tools/build-order-suggestion.js";

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

  getToolUnitStatsLookup(server, logger);
  getToolBuildOrderSuggestion(server, logger);
  return server;
};
